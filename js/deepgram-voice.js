/**
 * Deepgram WebSocket Voice-to-Text Integration
 * Provides real-time speech-to-text functionality for the PrepTracker PWA
 */

class DeepgramVoiceRecognition {
    constructor() {
        this.ws = null;
        this.mediaRecorder = null;
        this.audioContext = null;
        this.processor = null;
        this.isRecording = false;
        this.isConnected = false;
        this.apiKey = null;
        this.onTranscriptionCallback = null;
        this.onStatusChangeCallback = null;
        this.onErrorCallback = null;
        this.connectionAttempt = 0;
        
        // Configuration fallbacks in order of preference
        this.configOptions = [
            {
                sampleRate: 16000,
                encoding: 'linear16',
                channels: 1,
                language: 'en',
                model: 'nova-2',
                smart_format: true,
                interim_results: true,
                endpointing: 300,
                utterance_end_ms: 1000
            },
            {
                sampleRate: 16000,
                encoding: 'linear16',
                channels: 1,
                language: 'en-US',
                model: 'nova-2',
                smart_format: true,
                interim_results: true,
                endpointing: 300,
                utterance_end_ms: 1000
            },
            {
                sampleRate: 16000,
                encoding: 'linear16',
                channels: 1,
                language: 'en',
                model: 'base',
                smart_format: true,
                interim_results: true,
                endpointing: 300,
                utterance_end_ms: 1000
            },
            {
                sampleRate: 16000,
                encoding: 'linear16',
                channels: 1,
                language: 'en-US',
                model: 'base',
                smart_format: true,
                interim_results: true
            }
        ];
        
        // Start with the first configuration
        this.config = { ...this.configOptions[0] };

        // Interim text tracking
        this.lastFinalText = '';
        this.currentInterimText = '';
    }

    /**
     * Initialize the Deepgram voice recognition
     */
    async initialize(apiKey, options = {}) {
        this.apiKey = apiKey;
        this.config = { ...this.config, ...options };
        
        if (!this.apiKey) {
            throw new Error('Deepgram API key is required');
        }

        // Check for required browser APIs
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('MediaDevices API not supported in this browser');
        }

        if (!window.AudioContext && !window.webkitAudioContext) {
            throw new Error('Web Audio API not supported in this browser');
        }

        console.log('Deepgram Voice Recognition initialized successfully');
    }

    /**
     * Set callback functions
     */
    onTranscription(callback) {
        this.onTranscriptionCallback = callback;
    }

    onStatusChange(callback) {
        this.onStatusChangeCallback = callback;
    }

    onError(callback) {
        this.onErrorCallback = callback;
    }

    /**
     * Start voice recognition
     */
    async startRecording() {
        try {
            if (this.isRecording) {
                console.warn('Already recording');
                return;
            }

            this.updateStatus('connecting');
            
            // Get microphone access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: this.config.sampleRate,
                    channelCount: this.config.channels,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            // Setup Web Audio API
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext({
                sampleRate: this.config.sampleRate
            });

            const source = this.audioContext.createMediaStreamSource(stream);
            const bufferSize = 4096;
            
            // Create script processor (will be deprecated, but widely supported)
            this.processor = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
            
            // Connect WebSocket to Deepgram
            await this.connectToDeepgram();

            // Process audio data and send to Deepgram
            this.processor.onaudioprocess = (e) => {
                if (!this.isConnected || !this.ws) return;

                const inputBuffer = e.inputBuffer.getChannelData(0);
                
                // Convert Float32Array to Int16Array
                const pcmData = new Int16Array(inputBuffer.length);
                for (let i = 0; i < inputBuffer.length; i++) {
                    const sample = Math.max(-1, Math.min(1, inputBuffer[i]));
                    pcmData[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
                }

                // Send audio data to Deepgram
                if (this.ws.readyState === WebSocket.OPEN) {
                    this.ws.send(pcmData.buffer);
                }
            };

            // Connect audio nodes
            source.connect(this.processor);
            this.processor.connect(this.audioContext.destination);

            this.isRecording = true;
            this.updateStatus('listening');
            console.log('Deepgram recording started');

        } catch (error) {
            console.error('Failed to start recording:', error);
            this.handleError('Failed to start recording: ' + error.message);
        }
    }

    /**
     * Stop voice recognition
     */
    async stopRecording() {
        try {
            this.isRecording = false;
            this.updateStatus('stopping');

            // Close WebSocket connection
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({ type: 'CloseStream' }));
                this.ws.close();
            }

            // Clean up audio resources
            if (this.processor) {
                this.processor.disconnect();
                this.processor = null;
            }

            if (this.audioContext && this.audioContext.state !== 'closed') {
                await this.audioContext.close();
                this.audioContext = null;
            }

            this.isConnected = false;
            this.updateStatus('idle');
            console.log('Deepgram recording stopped');

        } catch (error) {
            console.error('Failed to stop recording:', error);
            this.handleError('Failed to stop recording: ' + error.message);
        }
    }

    /**
     * Connect to Deepgram WebSocket API with fallback configurations
     */
    async connectToDeepgram() {
        return new Promise((resolve, reject) => {
            this.attemptConnection(resolve, reject);
        });
    }
    
    /**
     * Attempt connection with current config, with fallback to next config on failure
     */
    attemptConnection(resolve, reject) {
        // Store resolve/reject for use in event handlers
        this.currentResolve = resolve;
        this.currentReject = reject;
        
        // Remove undefined values from config
        const cleanConfig = {};
        Object.keys(this.config).forEach(key => {
            if (this.config[key] !== undefined) {
                cleanConfig[key] = this.config[key];
            }
        });
        
        const queryParams = new URLSearchParams({
            encoding: cleanConfig.encoding,
            sample_rate: cleanConfig.sampleRate,
            channels: cleanConfig.channels,
            language: cleanConfig.language,
            model: cleanConfig.model,
            smart_format: cleanConfig.smart_format,
            interim_results: cleanConfig.interim_results,
            ...(cleanConfig.endpointing && { endpointing: cleanConfig.endpointing }),
            ...(cleanConfig.utterance_end_ms && { utterance_end_ms: cleanConfig.utterance_end_ms })
        });

        const wsUrl = `wss://api.deepgram.com/v1/listen?${queryParams.toString()}`;
        console.log(`🔗 [DEEPGRAM] Connection attempt ${this.connectionAttempt + 1}/${this.configOptions.length}`);
        console.log('🔗 [DEEPGRAM] WebSocket URL:', wsUrl);
        console.log('🔗 [DEEPGRAM] Config:', cleanConfig);
        
        this.ws = new WebSocket(wsUrl, ['token', this.apiKey]);

            this.ws.onopen = () => {
                console.log('✅ [DEEPGRAM] Connected to Deepgram WebSocket successfully');
                this.isConnected = true;
                if (this.currentResolve) {
                    this.currentResolve();
                    this.currentResolve = null;
                    this.currentReject = null;
                }
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.handleDeepgramResponse(data);
                } catch (error) {
                    console.error('Failed to parse Deepgram response:', error);
                }
            };

            this.ws.onerror = (error) => {
                console.error('🚨 [DEEPGRAM] WebSocket error:', error);
                this.isConnected = false;
                if (this.currentReject) {
                    this.currentReject(new Error('WebSocket connection failed'));
                    this.currentResolve = null;
                    this.currentReject = null;
                }
            };

            this.ws.onclose = (event) => {
                console.log('🔌 [DEEPGRAM] WebSocket closed. Code:', event.code, 'Reason:', event.reason);
                
                // Check if we should try a fallback configuration
                const shouldRetry = (event.code === 1003 || event.code === 4008 || event.code === 4009) && 
                                   this.connectionAttempt < this.configOptions.length - 1;
                
                if (shouldRetry) {
                    console.log('🔄 [DEEPGRAM] Trying fallback configuration...');
                    this.connectionAttempt++;
                    this.config = { ...this.configOptions[this.connectionAttempt] };
                    
                    setTimeout(() => {
                        this.attemptConnection(this.currentResolve, this.currentReject);
                    }, 1000);
                    return;
                }
                
                // Log specific error codes and reject with stored reference
                if (this.currentReject) {
                    if (event.code === 1003) {
                        console.error('🚨 [DEEPGRAM] Error 1003: Unsupported data or invalid parameters');
                        this.currentReject(new Error('Invalid parameters sent to Deepgram API. All fallback configurations failed.'));
                    } else if (event.code === 1008) {
                        console.error('🚨 [DEEPGRAM] Error 1008: Policy violation');
                        this.currentReject(new Error('API request violated policy. Check API key and usage.'));
                    } else if (event.code === 4001) {
                        console.error('🚨 [DEEPGRAM] Error 4001: Invalid API key');
                        this.currentReject(new Error('Invalid Deepgram API key.'));
                    } else if (event.code === 4008) {
                        console.error('🚨 [DEEPGRAM] Error 4008: Invalid language');
                        this.currentReject(new Error('Language not supported. All language fallbacks failed.'));
                    } else if (event.code === 4009) {
                        console.error('🚨 [DEEPGRAM] Error 4009: Invalid model');
                        this.currentReject(new Error('Model not supported. All model fallbacks failed.'));
                    } else {
                        this.currentReject(new Error('WebSocket connection failed with code: ' + event.code));
                    }
                    this.currentResolve = null;
                    this.currentReject = null;
                }
                
                this.isConnected = false;
            };

            // Connection timeout
            setTimeout(() => {
                if (!this.isConnected && this.currentReject) {
                    this.currentReject(new Error('Connection timeout'));
                    this.currentResolve = null;
                    this.currentReject = null;
                }
            }, 10000);
        });
    }
    
    /**
     * Reset connection attempt counter
     */
    resetConnectionAttempts() {
        this.connectionAttempt = 0;
        this.config = { ...this.configOptions[0] };
    }

    /**
     * Handle Deepgram WebSocket responses
     */
    handleDeepgramResponse(data) {
        if (data.type === 'Results') {
            const alternatives = data.channel?.alternatives;
            if (alternatives && alternatives.length > 0) {
                const transcript = alternatives[0].transcript;
                const confidence = alternatives[0].confidence;
                const isFinal = data.is_final;

                if (transcript.trim()) {
                    if (isFinal) {
                        // Final transcript - append to the editor
                        this.lastFinalText += (this.lastFinalText ? ' ' : '') + transcript;
                        this.currentInterimText = '';
                        
                        if (this.onTranscriptionCallback) {
                            this.onTranscriptionCallback({
                                text: transcript,
                                confidence: confidence,
                                isFinal: true,
                                fullText: this.lastFinalText
                            });
                        }
                    } else {
                        // Interim results - show preview
                        this.currentInterimText = transcript;
                        
                        if (this.onTranscriptionCallback) {
                            this.onTranscriptionCallback({
                                text: transcript,
                                confidence: confidence,
                                isFinal: false,
                                fullText: this.lastFinalText + (this.lastFinalText && transcript ? ' ' : '') + transcript
                            });
                        }
                    }
                }
            }
        } else if (data.type === 'Metadata') {
            console.log('Deepgram metadata:', data);
        } else if (data.type === 'SpeechStarted') {
            this.updateStatus('listening');
            console.log('Speech detected');
        } else if (data.type === 'UtteranceEnd') {
            console.log('Utterance ended');
        }
    }

    /**
     * Clear accumulated text (useful for starting fresh)
     */
    clearText() {
        this.lastFinalText = '';
        this.currentInterimText = '';
    }

    /**
     * Update status
     */
    updateStatus(status) {
        if (this.onStatusChangeCallback) {
            this.onStatusChangeCallback(status);
        }
    }

    /**
     * Handle errors
     */
    handleError(errorMessage) {
        this.isRecording = false;
        this.isConnected = false;
        this.updateStatus('error');
        
        if (this.onErrorCallback) {
            this.onErrorCallback(errorMessage);
        }
    }

    /**
     * Check if currently recording
     */
    getIsRecording() {
        return this.isRecording;
    }

    /**
     * Check if connected to Deepgram
     */
    getIsConnected() {
        return this.isConnected;
    }

    /**
     * Get the current full text (final + interim)
     */
    getCurrentText() {
        const fullText = this.lastFinalText + 
                        (this.lastFinalText && this.currentInterimText ? ' ' : '') + 
                        this.currentInterimText;
        return fullText;
    }

    /**
     * Get just the final text (committed)
     */
    getFinalText() {
        return this.lastFinalText;
    }
}

// Export for use in the main app
window.DeepgramVoiceRecognition = DeepgramVoiceRecognition;
