class PREPTrackerApp {
    constructor() {
        this.APP_VERSION = '1.0.10';
        this.currentView = 'profile';
        this.currentAge = '12weeks';
        this.puppyProfile = null;
        this.clickTimeout = null;
        this.updateAvailable = false;
        this.newWorker = null;
        
        this.trainingAreas = [
            {
                id: 'toileting',
                name: 'Toileting Routine',
                icon: '🚽',
                class: 'toileting',
                milestones: {
                    '12weeks': 'I know my toileting area and ask to use it.',
                    'juvenile': 'I am clean in the house and overnight with management. I show no interest in eating my own or other dog\'s faeces.',
                    'adolescent': 'I reliably respond to the \'busy, busy\' cue and consistently use my toileting area at home. I show no interest in eating dogs faeces.',
                    '12months': 'I am clean in the house and comfortable relieving at my home. I have a predictable routine where I do not toilet when on lead without indicating or when asked to so by the handler. I am comfortable relieving myself on different surfaces. I am not interested in eating dog faeces.'
                }
            },
            {
                id: 'play',
                name: 'Learning to Play',
                icon: '🧸',
                class: 'play',
                milestones: {
                    '12weeks': 'I generally understand what is mine and what is yours.',
                    'juvenile': 'I am learning to play with toys without mouthing or jumping up and I have begun to swap items when asked.',
                    'adolescent': 'I reliably swap items when asked. I play with toys without mouthing.',
                    '12months': 'I consistently play without mouthing and I will swap my toys for another object when asked.'
                }
            },
            {
                id: 'greeting',
                name: 'Greeting People',
                icon: '👋',
                class: 'greeting',
                milestones: {
                    '12weeks': 'I am settling well in the company of people I know.',
                    'juvenile': 'I have calmly met a range of unfamiliar people including children.',
                    'adolescent': 'I greet people, including children, without jumping up on most occasions.',
                    '12months': 'I greet people without jumping up on the majority of occasions. After greeting I consistently settle in the presence of visitors, with occasional reinforcement or management.'
                }
            },
            {
                id: 'manners',
                name: 'Learning Manners',
                icon: '🎯',
                class: 'manners',
                milestones: {
                    '12weeks': 'I know my name. I understand how to sit when using a lure. I am learning to take food politely.',
                    'juvenile': 'I have started to introduce the word \'sit\' and \'down\' when the behaviour is reliable, using a lure as required.',
                    'adolescent': 'I respond to the word sit, down, stand without a lure, in most situations. I consistently take food politely.',
                    '12months': 'I respond to my name, \'sit\', \'down\', and \'stand\' when asked.'
                }
            },
            {
                id: 'transport',
                name: 'Travel and Transport',
                icon: '🚗',
                class: 'transport',
                milestones: {
                    '12weeks': 'I am comfortable on a car journey up to 15 mins. I am keen to approach the car.',
                    'juvenile': 'I do not attempt to jump out of a car when the door is opened and continue to build up the duration of journeys.',
                    'adolescent': 'I am comfortable on car journeys of up to 30 mins. I have had the opportunity to experience public transport (e.g. buses, trains).',
                    '12months': 'I am comfortable to get in the car and travel for up to 45 mins. I have had opportunities to get used to public transport. I am relaxed and comfortable travelling on one form of public transport.'
                }
            },
            {
                id: 'walking',
                name: 'Walking on a Lead',
                icon: '🚶',
                class: 'walking',
                milestones: {
                    '12weeks': 'I am comfortable having my collar and lead put on and taken off and do not back away. I have started to learn to walk on the lead at home.',
                    'juvenile': 'I am walking for longer distances at home and in the garden on lead. I have started going on short walks in quiet areas.',
                    'adolescent': 'I am walking on lead in lots of different places and can manage my excitement around distractions most of the time. I continue moving with my handler unless indicating a need to toilet.',
                    '12months': 'I am walking on lead in lots of different places and can manage my excitement around distractions most of the time. I require less input to stay focused and continue moving with my handler unless indicating a need to toilet.'
                }
            },
            {
                id: 'recall',
                name: 'Recall and Off Lead Exercise',
                icon: '📞',
                class: 'recall',
                milestones: {
                    '12weeks': 'I know my name.',
                    'juvenile': 'I know the recall cue and I will come to you in the house and garden when utilised at least 90% of the time.',
                    'adolescent': 'I reliably return to you in response to recall cue when off lead in an area with few distractions.',
                    '12months': 'I have demonstrated the ability to consistently recall at a safe speed, making contact with a hand touch out to the side of the handler and without jumping up. I may require encouragement in higher distraction areas. I will remain with handler until released. I will recall away from other dogs in most situations, with reinforcement.'
                }
            },
            {
                id: 'handling',
                name: 'Handling, Grooming and Equipment',
                icon: '✂️',
                class: 'handling',
                milestones: {
                    '12weeks': 'I am happy to be gently lifted, carried and touched all over my body. I am being introduced to equipment without backing away.',
                    'juvenile': 'I am happy for you to check my eyes, ears and feet. I enjoy short grooming sessions with a brush. I have visited the vets.',
                    'adolescent': 'I am happy for a full body check including by the vet. I remain comfortable standing for grooming sessions up to 10 minutes and being towel dried.',
                    '12months': 'I am comfortable entering and having a full body check at the vets. I remain still and comfortable being groomed. I am comfortable wearing Guide Dogs equipment.'
                }
            },
            {
                id: 'outing',
                name: 'Being Out and About',
                icon: '🌍',
                class: 'outing',
                milestones: {
                    '12weeks': 'I am relaxed interacting with any other animals that live in my home. I have experienced a range of sights and sounds at home.',
                    'juvenile': 'I happily interact with any other animals at home. I can move away from distractions with help from my handler. I am comfortable around loud noises.',
                    'adolescent': 'I politely interact with other dogs when on and off lead and can be lured away from interactions. I can pass people and animals with encouragement from my handler.',
                    '12months': 'I can walk past food, people (including joggers), bikes, dogs or other animals, while on a lead, without avoiding or lunging in most situations. I politely interact with other dogs when on lead when given the opportunity and will move away when asked. I am comfortable in lots of different places and with sights and sounds of daily life.'
                }
            },
            {
                id: 'social',
                name: 'Social Behaviours and Settling on a Lead',
                icon: '🤝',
                class: 'social',
                milestones: {
                    '12weeks': 'I have a routine and I am comfortable settling overnight. I am building my confidence being on my own for short periods in the day with items that help me do so. I am being introduced to tools to help me settle.',
                    'juvenile': 'I am learning how to settle on lead in appropriate environments. I continue to be comfortable settling overnight on my own. I can entertain myself whilst my handler completes daily tasks. I can be left for short periods in the daytime.',
                    'adolescent': 'I am practising self settling quietly for longer periods in more places with less help. I am being left for longer periods of time regularly on my own at home with less restrictions without getting into mischief.',
                    '12months': 'I am comfortable settling quietly in familiar social situations with minimal input. I am calm and self-controlled around food, only chewing and playing with items I\'ve been given, and not jumping up or stealing items. I have demonstrated I am able to be left alone, for periods of 1 to 3 hours without the need for a closed crate.'
                }
            }
        ];

        this.supportingDocuments = [
            { id: 'mouthing', name: 'Mouthing', icon: '🦷' },
            { id: 'whistle', name: 'Whistle Association', icon: '🎵' },
            { id: 'traffic', name: 'Observing Traffic', icon: '🚗' },
            { id: 'harness', name: 'T-Touch Harness', icon: '🦮' },
            { id: 'adolescence', name: 'Adolescence', icon: '🌱' },
            { id: 'stairs', name: 'Stairs and Steps', icon: '🪜' }
        ];

        this.init();
    }

    async init() {
        try {
            // Register service worker and handle updates
            await this.registerServiceWorker();
            
            // Check version compatibility
            this.checkVersionCompatibility();
            
            // Initialize storage
            await window.storage.init();
            
            // Load puppy profile
            this.puppyProfile = await window.storage.getProfile();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize views
            await this.initializeViews();
            
            // Hide loading screen
            this.hideLoadingScreen();
            
            // Show appropriate initial view
            if (this.puppyProfile) {
                this.showView('progress');
                this.updatePuppyInfo();
            } else {
                this.showView('profile');
            }
            
        } catch (error) {
            console.error('App initialization failed:', error);
            this.showToast('Failed to initialize app: ' + error.message, 'error');
            this.hideLoadingScreen();
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const app = document.getElementById('app');
        
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            app.style.display = 'block';
        }, 300);
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('menuBtn').addEventListener('click', this.toggleMenu.bind(this));
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.showView(view);
            });
        });

        // Profile form
        document.getElementById('profileForm').addEventListener('submit', this.handleProfileSave.bind(this));

        // Age selector
        document.querySelectorAll('.age-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectAge(e.currentTarget.dataset.age);
            });
        });

        // Modal
        document.getElementById('closeModal').addEventListener('click', this.closeModal.bind(this));
        document.getElementById('cancelActivity').addEventListener('click', this.closeModal.bind(this));
        document.getElementById('saveActivity').addEventListener('click', this.saveActivity.bind(this));

        // Tools
        document.getElementById('backupBtn').addEventListener('click', this.exportData.bind(this));
        document.getElementById('restoreBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
        document.getElementById('fileInput').addEventListener('change', this.importData.bind(this));
        document.getElementById('resetBtn').addEventListener('click', this.resetData.bind(this));
        
        // Debug tool (temporary)
        if (document.getElementById('debugBtn')) {
            document.getElementById('debugBtn').addEventListener('click', this.debugActivities.bind(this));
        }

        // Close modal on outside click
        document.getElementById('activityModal').addEventListener('click', (e) => {
            if (e.target.id === 'activityModal') {
                this.closeModal();
            }
        });
    }

    async initializeViews() {
        // Initialize progress grid
        await this.renderProgressGrid();
        
        // Initialize supporting documents
        await this.renderSupportingDocuments();
        
        // Load profile data if exists
        if (this.puppyProfile) {
            this.populateProfileForm();
        }
    }

    showView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

        // Show selected view
        document.querySelectorAll('.view').forEach(view => {
            view.style.display = 'none';
        });
        document.getElementById(`${viewName}View`).style.display = 'block';

        this.currentView = viewName;

        // Refresh data for specific views
        if (viewName === 'progress') {
            this.renderProgressGrid();
        } else if (viewName === 'supporting') {
            this.renderSupportingDocuments();
        }
    }

    selectAge(age) {
        this.currentAge = age;
        
        // Update age buttons
        document.querySelectorAll('.age-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const ageBtn = document.querySelector(`[data-age="${age}"]`);
        if (ageBtn) {
            ageBtn.classList.add('active');
        }
        
        // Update all areas without re-rendering (preserves scroll position)
        this.updateAllAreasForAge(age);
    }

    async updateAllAreasForAge(selectedAge) {
        // Update each training area's content and radio buttons
        for (const area of this.trainingAreas) {
            const slider = document.querySelector(`input.progress-range[data-area="${area.id}"]`);
            if (slider) {
                const areaElement = slider.closest('.training-area');
                if (areaElement) {
                    // Update radio buttons for this area
                    const areaRadios = areaElement.querySelectorAll(`input[name="age-${area.id}"]`);
                    areaRadios.forEach(radio => {
                        radio.checked = radio.value === selectedAge;
                    });
                    
                    await this.updateAreaContent(areaElement, area, selectedAge);
                }
            }
        }
    }

    async updateAreaContent(element, area, selectedAge) {
        // Update milestone text
        const milestoneText = element.querySelector('.milestone-text');
        if (milestoneText) {
            milestoneText.textContent = area.milestones[selectedAge];
        }
        
        // Load and update progress for this age
        const progress = await window.storage.getProgress(area.id, selectedAge);
        const slider = element.querySelector('.progress-range');
        const sliderValue = element.querySelector('.slider-value');
        
        if (slider && sliderValue) {
            const progressValue = progress?.value || 0;
            slider.value = progressValue;
            sliderValue.textContent = `${progressValue}%`;
            slider.dataset.age = selectedAge;
        }
        
        // Update action buttons data attributes
        const actionButtons = element.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.dataset.age = selectedAge;
        });
    }

    async handleAreaAgeChange(element, area, selectedAge) {
        // Update milestone text for this specific area
        const milestoneText = element.querySelector('.milestone-text');
        milestoneText.textContent = area.milestones[selectedAge];
        
        // Load progress for this age
        const progress = await window.storage.getProgress(area.id, selectedAge);
        const slider = element.querySelector('.progress-range');
        const sliderValue = element.querySelector('.slider-value');
        
        if (slider && sliderValue) {
            const progressValue = progress?.value || 0;
            slider.value = progressValue;
            sliderValue.textContent = `${progressValue}%`;
            slider.dataset.age = selectedAge;
        }
        
        // Update action buttons data attributes
        const actionButtons = element.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.dataset.age = selectedAge;
        });
    }

    async renderProgressGrid() {
        const grid = document.getElementById('progressGrid');
        grid.innerHTML = '';

        for (const area of this.trainingAreas) {
            const progress = await window.storage.getProgress(area.id, this.currentAge);
            const milestone = area.milestones[this.currentAge];

            const areaElement = document.createElement('div');
            areaElement.className = 'training-area';
            areaElement.innerHTML = `
                <div class="training-header ${area.class}">
                    <span class="training-icon">${area.icon}</span>
                    ${area.name}
                    <button class="complete-elearning" title="Complete e-learning">📁</button>
                </div>
                <div class="training-content">
                    <div class="area-age-selector">
                        <input type="radio" id="age-${area.id}-12weeks" name="age-${area.id}" value="12weeks" ${this.currentAge === '12weeks' ? 'checked' : ''}>
                        <label for="age-${area.id}-12weeks">12 wks</label>
                        
                        <input type="radio" id="age-${area.id}-juvenile" name="age-${area.id}" value="juvenile" ${this.currentAge === 'juvenile' ? 'checked' : ''}>
                        <label for="age-${area.id}-juvenile">6 mnths</label>
                        
                        <input type="radio" id="age-${area.id}-adolescent" name="age-${area.id}" value="adolescent" ${this.currentAge === 'adolescent' ? 'checked' : ''}>
                        <label for="age-${area.id}-adolescent">9 mnths</label>
                        
                        <input type="radio" id="age-${area.id}-12months" name="age-${area.id}" value="12months" ${this.currentAge === '12months' ? 'checked' : ''}>
                        <label for="age-${area.id}-12months">12 mnths</label>
                    </div>
                    <div class="milestone-text">${milestone}</div>
                    <div class="progress-slider">
                        <label class="slider-label">Progress: <span class="slider-value">${progress?.value || 0}%</span></label>
                        <input type="range" 
                               class="progress-range" 
                               min="0" 
                               max="100" 
                               step="5"
                               value="${progress?.value || 0}" 
                               data-area="${area.id}" 
                               data-age="${this.currentAge}">
                        <div class="slider-markers">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                    </div>
                    <div class="training-actions">
                        <button class="action-btn log-btn" data-area="${area.id}" data-age="${this.currentAge}">
                            📝 Log
                        </button>
                        <button class="action-btn training-btn" data-area="${area.id}" data-age="${this.currentAge}">
                            🎯 Training
                        </button>
                    </div>
                </div>
                <div class="progress-accordion" data-area="${area.id}" data-age="${this.currentAge}" style="display: none;">
                    <div class="accordion-content">
                        <div class="progress-log-section">
                            <h4>Progress Log</h4>
                            <div class="existing-entries" id="entries-${area.id}-${this.currentAge}">
                                <!-- Existing entries will be loaded here -->
                            </div>
                            <div class="progress-log-form" style="display: none;">
                                <div class="form-group">
                                    <label for="logDate-${area.id}">Date</label>
                                    <input type="date" id="logDate-${area.id}" class="log-date">
                                </div>
                                <div class="form-group">
                                    <label for="logNotes-${area.id}">Notes</label>
                                    <textarea id="logNotes-${area.id}" class="log-notes" rows="4" placeholder="Add training notes, observations, or progress details..."></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="logVideo-${area.id}">Video (Optional)</label>
                                    <div class="video-upload-section">
                                        <input type="file" id="logVideo-${area.id}" class="log-video" accept="video/*" style="display: none;">
                                        <button type="button" class="video-upload-btn secondary-btn">
                                            📹 Choose Video
                                        </button>
                                        <div class="video-preview" style="display: none;">
                                            <div class="video-info">
                                                <span class="video-file-name"></span>
                                                <button type="button" class="remove-video-btn">&times;</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="logStatus-${area.id}">Progress Status</label>
                                    <select id="logStatus-${area.id}" class="log-status">
                                        <option value="working">Working on it</option>
                                        <option value="proficient">Proficient</option>
                                    </select>
                                </div>
                                <div class="form-actions">
                                    <button type="button" class="secondary-btn cancel-log-btn">Cancel</button>
                                    <button type="button" class="primary-btn save-log-btn">Save</button>
                                </div>
                            </div>
                            <button class="primary-btn add-entry-btn">Add New Entry</button>
                        </div>
                    </div>
                </div>
            `;

            // Add click handlers
            this.addProgressButtonHandlers(areaElement, area);
            
            grid.appendChild(areaElement);
        }
        
        // Ensure radio buttons are properly checked after rendering
        setTimeout(() => {
            this.trainingAreas.forEach(area => {
                document.querySelectorAll(`input[name="age-${area.id}"]`).forEach(radio => {
                    radio.checked = radio.value === this.currentAge;
                });
            });
        }, 0);
    }

    addProgressButtonHandlers(element, area) {
        const slider = element.querySelector('.progress-range');
        const sliderValue = element.querySelector('.slider-value');
        
        // Handle age radio button changes (sync all areas when one is clicked)
        const ageRadios = element.querySelectorAll(`input[name="age-${area.id}"]`);
        ageRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.selectAge(e.target.value);
                }
            });
        });
        
        // Handle slider changes
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            sliderValue.textContent = `${value}%`;
        });
        
        slider.addEventListener('change', (e) => {
            this.handleProgressChange(e, area);
        });

        // Progress Log button - toggle accordion
        const logBtn = element.querySelector('.log-btn');
        logBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleProgressAccordion(element, area);
        });
        
        // Training Activities button
        const trainingBtn = element.querySelector('.training-btn');
        trainingBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleTrainingActivitiesClick(area, this.currentAge);
        });

        // E-learning button
        const elearningBtn = element.querySelector('.complete-elearning');
        elearningBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showToast(`Opening e-learning for ${area.name}`, 'info');
        });

        // Accordion handlers
        this.addAccordionHandlers(element, area);
    }

    async toggleProgressAccordion(element, area) {
        const accordion = element.querySelector('.progress-accordion');
        const isVisible = accordion.style.display !== 'none';
        
        // Close all other accordions
        document.querySelectorAll('.progress-accordion').forEach(acc => {
            if (acc !== accordion) {
                acc.style.display = 'none';
                const form = acc.querySelector('.progress-log-form');
                if (form) form.style.display = 'none';
            }
        });
        
        if (isVisible) {
            // Close this accordion
            accordion.style.display = 'none';
        } else {
            // Open this accordion and load existing entries
            accordion.style.display = 'block';
            await this.loadExistingEntries(accordion, area);
        }
    }

    async loadExistingEntries(accordion, area) {
        const entriesContainer = accordion.querySelector('.existing-entries');
        const addEntryBtn = accordion.querySelector('.add-entry-btn');
        
        try {
            const activities = await window.storage.getActivities(area.id, this.currentAge);
            
            if (activities && activities.length > 0) {
                entriesContainer.innerHTML = `
                    <div class="activities-list">
                        ${activities.map(activity => `
                            <div class="activity-entry">
                                <div class="activity-date">${activity.date}</div>
                                <div class="activity-notes">${activity.notes}</div>
                                ${activity.video ? `
                                    <div class="activity-video">
                                        <span class="video-icon">📹</span>
                                        <span class="video-name">${activity.video.name}</span>
                                        <span class="video-size">(${Math.round(activity.video.size / 1024 / 1024 * 100) / 100} MB)</span>
                                    </div>
                                ` : ''}
                                <div class="activity-status status-${activity.status}">${activity.status === 'working' ? 'Working on it' : 'Proficient'}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                entriesContainer.innerHTML = `
                    <div style="text-align: center; padding: var(--spacing-lg); color: var(--text-secondary);">
                        No progress entries yet for ${area.name}
                    </div>
                `;
            }
        } catch (error) {
            console.error('Failed to load existing entries:', error);
            entriesContainer.innerHTML = `
                <div style="text-align: center; padding: var(--spacing-lg); color: var(--error-color);">
                    Failed to load existing entries
                </div>
            `;
        }
    }

    addAccordionHandlers(element, area) {
        const accordion = element.querySelector('.progress-accordion');
        const addEntryBtn = accordion.querySelector('.add-entry-btn');
        const form = accordion.querySelector('.progress-log-form');
        const cancelBtn = accordion.querySelector('.cancel-log-btn');
        const saveBtn = accordion.querySelector('.save-log-btn');
        const videoUploadBtn = accordion.querySelector('.video-upload-btn');
        const videoInput = accordion.querySelector('.log-video');
        const videoPreview = accordion.querySelector('.video-preview');
        const videoFileName = accordion.querySelector('.video-file-name');
        const removeVideoBtn = accordion.querySelector('.remove-video-btn');

        // Add new entry button
        addEntryBtn.addEventListener('click', () => {
            this.showProgressForm(element, area);
        });

        // Cancel button
        cancelBtn.addEventListener('click', () => {
            this.hideProgressForm(element);
        });

        // Save button
        saveBtn.addEventListener('click', () => {
            this.saveProgressEntry(element, area);
        });

        // Video upload handlers
        videoUploadBtn.addEventListener('click', () => {
            videoInput.click();
        });

        videoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                videoFileName.textContent = file.name;
                videoPreview.style.display = 'block';
                videoUploadBtn.textContent = '📹 Change Video';
            }
        });

        removeVideoBtn.addEventListener('click', () => {
            videoInput.value = '';
            videoPreview.style.display = 'none';
            videoUploadBtn.textContent = '📹 Choose Video';
        });
    }

    showProgressForm(element, area) {
        const form = element.querySelector('.progress-log-form');
        const addBtn = element.querySelector('.add-entry-btn');
        const dateInput = element.querySelector('.log-date');
        const notesInput = element.querySelector('.log-notes');
        const statusSelect = element.querySelector('.log-status');

        // Show form and hide add button
        form.style.display = 'block';
        addBtn.style.display = 'none';

        // Set default values
        dateInput.value = new Date().toISOString().split('T')[0];
        notesInput.value = '';
        statusSelect.value = 'working';

        // Focus on notes input
        setTimeout(() => notesInput.focus(), 100);
    }

    hideProgressForm(element) {
        const form = element.querySelector('.progress-log-form');
        const addBtn = element.querySelector('.add-entry-btn');
        const videoInput = element.querySelector('.log-video');
        const videoPreview = element.querySelector('.video-preview');
        const videoUploadBtn = element.querySelector('.video-upload-btn');

        // Hide form and show add button
        form.style.display = 'none';
        addBtn.style.display = 'block';

        // Reset video upload
        videoInput.value = '';
        videoPreview.style.display = 'none';
        videoUploadBtn.textContent = '📹 Choose Video';
    }

    async saveProgressEntry(element, area) {
        const dateInput = element.querySelector('.log-date');
        const notesInput = element.querySelector('.log-notes');
        const statusSelect = element.querySelector('.log-status');
        const videoInput = element.querySelector('.log-video');

        const date = dateInput.value;
        const notes = notesInput.value.trim();
        const status = statusSelect.value;

        if (!date || !notes) {
            this.showToast('Please fill in date and notes', 'error');
            return;
        }

        try {
            const activityData = {
                trainingArea: area.id,
                ageRange: this.currentAge,
                date,
                notes,
                status
            };

            // Handle video upload if present
            if (videoInput && videoInput.files && videoInput.files[0]) {
                const videoFile = videoInput.files[0];
                activityData.video = {
                    name: videoFile.name,
                    size: videoFile.size,
                    type: videoFile.type,
                    lastModified: videoFile.lastModified
                };
                this.showToast('Video noted (in production, this would upload to server)', 'info');
            }

            await window.storage.saveActivity(activityData);
            await window.storage.saveProgress(area.id, this.currentAge, status);

            // Refresh the accordion entries
            const accordion = element.querySelector('.progress-accordion');
            await this.loadExistingEntries(accordion, area);

            // Hide form and show success message
            this.hideProgressForm(element);
            this.showToast('Progress entry saved successfully', 'success');

            // Update the progress slider value in this specific element
            const progressSlider = element.querySelector('.progress-range');
            const sliderValue = element.querySelector('.slider-value');
            if (progressSlider && sliderValue && typeof status === 'string') {
                // Convert status to percentage for display
                const progressValue = status === 'proficient' ? 100 : 50;
                progressSlider.value = progressValue;
                sliderValue.textContent = `${progressValue}%`;
            }

        } catch (error) {
            console.error('Failed to save progress entry:', error);
            this.showToast('Failed to save progress entry', 'error');
        }
    }

    async handleProgressChange(e, area) {
        const value = parseInt(e.target.value);
        
        try {
            await window.storage.saveProgress(area.id, this.currentAge, { value });
            this.showToast(`${area.name} progress updated to ${value}%`, 'success');
        } catch (error) {
            console.error('Failed to save progress:', error);
            this.showToast('Failed to save progress', 'error');
        }
    }
    
    async handleSingleClick(area, ageRange) {
        // Open progress log modal (show existing or create new)
        try {
            console.log('Single click - looking for activities with area:', area.id, 'ageRange:', ageRange);
            const activities = await window.storage.getActivities(area.id, ageRange);
            console.log('Single click - found activities:', activities);
            this.showProgressLogModal(area, ageRange, activities);
        } catch (error) {
            console.error('Failed to load progress log:', error);
            this.showToast('Failed to load progress log', 'error');
        }
    }

    async handleTrainingActivitiesClick(area, ageRange) {
        try {
            // Show training activities for this area
            const activities = await this.loadTrainingActivities(area.id, ageRange);
            this.showTrainingActivitiesModal(area, ageRange, activities);
        } catch (error) {
            console.error('Failed to load training activities:', error);
            this.showToast('Failed to load training activities', 'error');
        }
    }
    
    showProgressLogModal(area, ageRange, activities) {
        const modal = document.getElementById('activityModal');
        const title = document.getElementById('modalTitle');
        const modalBody = document.querySelector('.modal-body');
        const modalFooter = document.querySelector('.modal-footer');
        
        title.textContent = `${area.name} - Progress Log`;
        
        const hasActivities = activities && activities.length > 0;
        
        modalBody.innerHTML = `
            <div class="progress-log">
                ${hasActivities ? `
                    <h4>Existing Progress Entries</h4>
                    <div class="activities-list">
                        ${activities.map(activity => `
                            <div class="activity-entry">
                                <div class="activity-date">${activity.date}</div>
                                <div class="activity-notes">${activity.notes}</div>
                                ${activity.video ? `
                                    <div class="activity-video">
                                        <span class="video-icon">📹</span>
                                        <span class="video-name">${activity.video.name}</span>
                                        <span class="video-size">(${Math.round(activity.video.size / 1024 / 1024 * 100) / 100} MB)</span>
                                    </div>
                                ` : ''}
                                <div class="activity-status status-${activity.status}">${activity.status === 'working' ? 'Working on it' : 'Proficient'}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="text-align: center; margin-top: var(--spacing-lg);">
                        <button id="addNewProgressBtn" class="primary-btn">Add New Progress Entry</button>
                    </div>
                ` : `
                    <div style="text-align: center; padding: var(--spacing-xl);">
                        <p style="color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
                            No progress entries yet for ${area.name}
                        </p>
                        <button id="addFirstProgressBtn" class="primary-btn">Add Your First Progress Entry</button>
                    </div>
                `}
            </div>
        `;
        
        // Show footer with close button
        modalFooter.innerHTML = `
            <button id="closeProgressLog" class="secondary-btn">Close</button>
        `;
        modalFooter.style.display = 'flex';
        
        // Store current context
        modal.dataset.area = area.id;
        modal.dataset.age = ageRange;
        
        // Add event listeners
        const addNewBtn = document.getElementById('addNewProgressBtn');
        const addFirstBtn = document.getElementById('addFirstProgressBtn');
        const closeBtn = document.getElementById('closeProgressLog');
        
        if (addNewBtn) {
            addNewBtn.addEventListener('click', () => {
                this.openActivityModal(area, ageRange, 'progress-log');
            });
        }
        
        if (addFirstBtn) {
            addFirstBtn.addEventListener('click', () => {
                this.openActivityModal(area, ageRange, 'progress-log');
            });
        }
        
        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        modal.style.display = 'flex';
    }

    openActivityModal(area, ageRange, context = 'training-activity') {
        const modal = document.getElementById('activityModal');
        const title = document.getElementById('modalTitle');
        const modalBody = document.querySelector('.modal-body');
        const modalFooter = document.querySelector('.modal-footer');
        
        title.textContent = `${area.name} - Training Activity`;
        
        // Restore original modal content
        modalBody.innerHTML = `
            <div class="activity-details">
                <div class="form-group">
                    <label for="activityDate">Date</label>
                    <input type="date" id="activityDate">
                </div>
                <div class="form-group">
                    <label for="activityNotes">Notes</label>
                    <textarea id="activityNotes" rows="4" placeholder="Add training notes, observations, or progress details..."></textarea>
                </div>
                <div class="form-group">
                    <label for="activityVideo">Video (Optional)</label>
                    <div class="video-upload-section">
                        <input type="file" id="activityVideo" accept="video/*" style="display: none;">
                        <button type="button" id="videoUploadBtn" class="secondary-btn">
                            📹 Choose Video
                        </button>
                        <div id="videoPreview" class="video-preview" style="display: none;">
                            <div class="video-info">
                                <span id="videoFileName"></span>
                                <button type="button" id="removeVideo" class="remove-video-btn">&times;</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="activityStatus">Progress Status</label>
                    <select id="activityStatus">
                        <option value="working">Working on it</option>
                        <option value="proficient">Proficient</option>
                    </select>
                </div>
            </div>
        `;
        
        // Restore footer with Save/Cancel buttons
        modalFooter.innerHTML = `
            <button id="cancelActivity" class="secondary-btn">Cancel</button>
            <button id="saveActivity" class="primary-btn">Save</button>
        `;
        
        const dateInput = document.getElementById('activityDate');
        const notesInput = document.getElementById('activityNotes');
        const statusSelect = document.getElementById('activityStatus');
        const videoInput = document.getElementById('activityVideo');
        const videoUploadBtn = document.getElementById('videoUploadBtn');
        const videoPreview = document.getElementById('videoPreview');
        const videoFileName = document.getElementById('videoFileName');
        const removeVideoBtn = document.getElementById('removeVideo');
        
        dateInput.value = new Date().toISOString().split('T')[0];
        notesInput.value = '';
        statusSelect.value = 'working';
        
        // Video upload handlers
        videoUploadBtn.addEventListener('click', () => {
            videoInput.click();
        });
        
        videoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                videoFileName.textContent = file.name;
                videoPreview.style.display = 'block';
                videoUploadBtn.textContent = '📹 Change Video';
            }
        });
        
        removeVideoBtn.addEventListener('click', () => {
            videoInput.value = '';
            videoPreview.style.display = 'none';
            videoUploadBtn.textContent = '📹 Choose Video';
        });
        
        // Add event listeners for the footer buttons
        document.getElementById('cancelActivity').addEventListener('click', this.closeModal.bind(this));
        document.getElementById('saveActivity').addEventListener('click', this.saveActivity.bind(this));
        
        // Store current context
        modal.dataset.area = area.id;
        modal.dataset.age = ageRange;
        modal.dataset.context = context;
        
        // Show footer buttons for activity entry
        modalFooter.style.display = 'flex';
        modal.style.display = 'flex';
        notesInput.focus();
    }

    closeModal() {
        document.getElementById('activityModal').style.display = 'none';
    }

    async saveActivity() {
        const modal = document.getElementById('activityModal');
        const area = modal.dataset.area;
        const age = modal.dataset.age;
        const context = modal.dataset.context;
        const date = document.getElementById('activityDate').value;
        const notes = document.getElementById('activityNotes').value;
        const status = document.getElementById('activityStatus').value;
        const videoInput = document.getElementById('activityVideo');
        
        if (!date || !notes.trim()) {
            this.showToast('Please fill in date and notes', 'error');
            return;
        }
        
        try {
            const activityData = {
                trainingArea: area,
                ageRange: age,
                date,
                notes: notes.trim(),
                status
            };
            
            // Handle video upload if present
            if (videoInput && videoInput.files && videoInput.files[0]) {
                const videoFile = videoInput.files[0];
                
                // Store video metadata (in a real app, you'd upload to a server)
                activityData.video = {
                    name: videoFile.name,
                    size: videoFile.size,
                    type: videoFile.type,
                    lastModified: videoFile.lastModified
                };
                
                // For demo purposes, we'll just store the file reference
                // In production, you would upload to a server and store the URL
                this.showToast('Video noted (in production, this would upload to server)', 'info');
            }
            
            console.log('About to save activity data:', activityData);
            await window.storage.saveActivity(activityData);
            console.log('Activity saved successfully');
            
            // Update progress status
            await window.storage.saveProgress(area, age, status);
            
            // Refresh the progress grid
            await this.renderProgressGrid();
            
            this.closeModal();
            this.showToast('Training activity saved successfully', 'success');
            
            // If we came from progress log modal, return to it with updated data
            if (context === 'progress-log') {
                setTimeout(async () => {
                    console.log('Returning to progress log for area:', area, 'age:', age);
                    const areaObj = this.trainingAreas.find(a => a.id === area);
                    console.log('Found area object:', areaObj);
                    if (areaObj) {
                        const activities = await window.storage.getActivities(area, age);
                        console.log('Retrieved activities:', activities);
                        this.showProgressLogModal(areaObj, age, activities);
                    }
                }, 100);
            }
            
        } catch (error) {
            console.error('Failed to save activity:', error);
            this.showToast('Failed to save activity', 'error');
        }
    }

    async renderSupportingDocuments() {
        const grid = document.querySelector('.documents-grid');
        if (!grid) return;
        
        // Clear existing content
        grid.innerHTML = '';
        
        for (const doc of this.supportingDocuments) {
            const progress = await window.storage.getDocumentProgress(doc.id);
            
            const card = document.createElement('div');
            card.className = 'document-card';
            card.innerHTML = `
                <div class="document-icon">${doc.icon}</div>
                <h3>${doc.name}</h3>
                <p>${this.getDocumentDescription(doc.id)}</p>
                <div class="document-progress">
                    <div class="progress-slider">
                        <label class="slider-label">Progress: <span class="slider-value">${progress?.value || 0}%</span></label>
                        <input type="range" 
                               class="progress-range" 
                               min="0" 
                               max="100" 
                               step="5"
                               value="${progress?.value || 0}" 
                               data-doc="${doc.id}">
                        <div class="slider-markers">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Add slider handlers
            const slider = card.querySelector('.progress-range');
            const sliderValue = card.querySelector('.slider-value');
            
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                sliderValue.textContent = `${value}%`;
            });
            
            slider.addEventListener('change', async (e) => {
                const value = parseInt(e.target.value);
                const docId = e.target.dataset.doc;
                
                try {
                    await window.storage.saveDocumentProgress(docId, { value });
                    this.showToast(`${doc.name} progress updated to ${value}%`, 'success');
                } catch (error) {
                    console.error('Failed to save document progress:', error);
                    this.showToast('Failed to save progress', 'error');
                }
            });
            
            grid.appendChild(card);
        }
    }

    getDocumentDescription(docId) {
        const descriptions = {
            mouthing: 'Tips to understand and manage mouthing behaviour',
            whistle: 'How to form an association between whistle and food',
            traffic: 'Introduce sights and sounds of traffic safely',
            harness: 'Fitting, maintaining, and working with harness',
            adolescence: 'Managing adolescent behaviours and expectations',
            stairs: 'Safely navigate stairs and steps with your puppy'
        };
        return descriptions[docId] || '';
    }

    async handleProfileSave(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const profile = {
            name: document.getElementById('puppyNameInput').value.trim(),
            computerNumber: document.getElementById('computerNumber').value.trim(),
            dateOfBirth: document.getElementById('dateOfBirth').value,
            breed: document.getElementById('breed').value
        };
        
        if (!profile.name || !profile.dateOfBirth) {
            this.showToast('Please fill in required fields', 'error');
            return;
        }
        
        try {
            await window.storage.saveProfile(profile);
            this.puppyProfile = profile;
            this.updatePuppyInfo();
            this.showToast('Profile saved successfully', 'success');
            
            // Switch to progress view
            setTimeout(() => {
                this.showView('progress');
            }, 1000);
            
        } catch (error) {
            console.error('Failed to save profile:', error);
            this.showToast('Failed to save profile', 'error');
        }
    }

    populateProfileForm() {
        if (!this.puppyProfile) return;
        
        document.getElementById('puppyNameInput').value = this.puppyProfile.name || '';
        document.getElementById('computerNumber').value = this.puppyProfile.computerNumber || '';
        document.getElementById('dateOfBirth').value = this.puppyProfile.dateOfBirth || '';
        document.getElementById('breed').value = this.puppyProfile.breed || '';
    }

    updatePuppyInfo() {
        const puppyInfo = document.getElementById('puppyInfo');
        const puppyName = document.getElementById('puppyName');
        const puppyAge = document.getElementById('puppyAge');
        
        if (this.puppyProfile) {
            puppyName.textContent = this.puppyProfile.name;
            puppyAge.textContent = window.storage.formatAge(this.puppyProfile.dateOfBirth);
            puppyInfo.style.display = 'block';
            
            // Update current age based on puppy's actual age
            this.currentAge = window.storage.calculateAge(this.puppyProfile.dateOfBirth);
            this.selectAge(this.currentAge);
        } else {
            puppyInfo.style.display = 'none';
        }
    }

    toggleMenu() {
        // Mobile menu functionality if needed
        console.log('Menu toggled');
    }

    async exportData() {
        try {
            const data = await window.storage.exportData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `prep-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showToast('Data exported successfully', 'success');
            
        } catch (error) {
            console.error('Export failed:', error);
            this.showToast('Export failed: ' + error.message, 'error');
        }
    }

    async importData(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            if (confirm('This will replace all current data. Continue?')) {
                await window.storage.importData(data);
                
                // Reload profile and refresh views
                this.puppyProfile = await window.storage.getProfile();
                this.updatePuppyInfo();
                await this.renderProgressGrid();
                await this.renderSupportingDocuments();
                
                this.showToast('Data imported successfully', 'success');
            }
            
        } catch (error) {
            console.error('Import failed:', error);
            this.showToast('Import failed: ' + error.message, 'error');
        }
        
        e.target.value = '';
    }

    async resetData() {
        if (confirm('This will permanently delete all data. This cannot be undone. Continue?')) {
            try {
                await window.storage.clearAllData();
                this.puppyProfile = null;
                this.updatePuppyInfo();
                await this.renderProgressGrid();
                await this.renderSupportingDocuments();
                this.showView('profile');
                
                this.showToast('All data has been reset', 'success');
                
            } catch (error) {
                console.error('Reset failed:', error);
                this.showToast('Reset failed: ' + error.message, 'error');
            }
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    async loadTrainingActivities(areaId, ageRange) {
        // Load initial training activities from JSON file
        try {
            const response = await fetch('./data/initial-training-activities.json');
            const data = await response.json();
            
            // Filter activities for this area and age range
            const areaActivities = data.trainingActivities[areaId] || [];
            return areaActivities.filter(activity => 
                activity.ageRange === ageRange || 
                activity.ageRange === 'all' ||
                this.isAgeRangeCompatible(activity.ageRange, ageRange)
            );
        } catch (error) {
            console.error('Failed to load training activities:', error);
            return [];
        }
    }
    
    isAgeRangeCompatible(activityAge, currentAge) {
        const ageOrder = ['12weeks', 'juvenile', 'adolescent', '12months'];
        const activityIndex = ageOrder.indexOf(activityAge);
        const currentIndex = ageOrder.indexOf(currentAge);
        
        // Show activities from current age and earlier
        return activityIndex <= currentIndex;
    }
    
    showTrainingActivitiesModal(area, ageRange, activities) {
        const modal = document.getElementById('activityModal');
        const title = document.getElementById('modalTitle');
        const modalBody = document.querySelector('.modal-body');
        const modalFooter = document.querySelector('.modal-footer');
        
        title.textContent = `${area.name} - Training Activities`;
        
        modalBody.innerHTML = `
            <div class="training-activities">
                <h4>Structured Training Activities</h4>
                ${activities.length > 0 ? `
                    <div class="activities-list">
                        ${activities.map(activity => `
                            <div class="training-activity-card">
                                <div class="activity-header">
                                    <h5>${activity.title}</h5>
                                    <span class="activity-age">${activity.ageRange}</span>
                                </div>
                                <div class="activity-description">${activity.description}</div>
                                <div class="activity-category">${activity.category}</div>
                                <div class="activity-instructions">
                                    <h6>Instructions:</h6>
                                    <ul>
                                        ${activity.instructions.map(instruction => 
                                            `<li>${instruction}</li>`
                                        ).join('')}
                                    </ul>
                                </div>
                                ${activity.goals ? `
                                    <div class="activity-goals">
                                        <h6>Goals:</h6>
                                        <ul>
                                            ${activity.goals.map(goal => `<li>${goal}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                ${activity.safety ? `
                                    <div class="activity-safety">
                                        <strong>⚠️ Safety:</strong> ${activity.safety}
                                    </div>
                                ` : ''}
                                <button class="use-activity-btn" data-activity-id="${activity.id}">
                                    Use This Activity
                                </button>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="no-activities">
                        <p>No structured training activities available for this age range yet.</p>
                        <p>Check back as your puppy develops, or add your own activities.</p>
                    </div>
                `}
                <div class="add-custom-activity">
                    <button id="addCustomActivityBtn" class="primary-btn">
                        ➕ Add Custom Training Activity
                    </button>
                </div>
            </div>
        `;
        
        // Setup event listeners
        const useActivityBtns = modalBody.querySelectorAll('.use-activity-btn');
        useActivityBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const activityId = e.target.dataset.activityId;
                const activity = activities.find(a => a.id === activityId);
                this.useTrainingActivity(area, ageRange, activity);
            });
        });
        
        const addCustomBtn = document.getElementById('addCustomActivityBtn');
        addCustomBtn.addEventListener('click', () => {
            this.openActivityModal(area, ageRange, 'training-activities');
        });
        
        // Setup footer
        modalFooter.innerHTML = `
            <button id="closeTrainingActivities" class="secondary-btn">Close</button>
        `;
        modalFooter.style.display = 'flex';
        
        document.getElementById('closeTrainingActivities').addEventListener('click', () => {
            this.closeModal();
        });
        
        modal.style.display = 'flex';
    }
    
    useTrainingActivity(area, ageRange, activity) {
        // Pre-populate activity modal with training activity details
        this.openActivityModal(area, ageRange, 'training-activities');
        
        // Pre-fill with activity information
        setTimeout(() => {
            const notesInput = document.getElementById('activityNotes');
            if (notesInput) {
                const activityText = `${activity.title}\n\n${activity.description}\n\nInstructions:\n${activity.instructions.map(i => `• ${i}`).join('\n')}${activity.goals ? `\n\nGoals:\n${activity.goals.map(g => `• ${g}`).join('\n')}` : ''}`;
                notesInput.value = activityText;
            }
        }, 100);
    }

    async debugActivities() {
        try {
            const allActivities = await window.storage.getAllActivities();
            console.log('All stored activities:', allActivities);
            alert(`Found ${allActivities.length} activities. Check console for details.`);
        } catch (error) {
            console.error('Debug failed:', error);
            alert('Debug failed: ' + error.message);
        }
    }

    // PWA Service Worker and Update Management
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered successfully:', registration);

                // Handle service worker updates
                this.handleServiceWorkerUpdates(registration);

                // Listen for updates
                registration.addEventListener('updatefound', () => {
                    console.log('New service worker found, installing...');
                    const newWorker = registration.installing;
                    this.newWorker = newWorker;

                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('New service worker installed, update available');
                            this.updateAvailable = true;
                            this.showUpdateNotification();
                        }
                    });
                });

                // Check for immediate updates
                registration.update();

            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }

    handleServiceWorkerUpdates(registration) {
        // Handle immediate updates if service worker changed
        if (registration.waiting) {
            this.updateAvailable = true;
            this.newWorker = registration.waiting;
            this.showUpdateNotification();
        }

        // Listen for service worker messages
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'VERSION_MISMATCH') {
                console.log('Version mismatch detected by service worker');
                this.showVersionMismatchNotification();
            }
        });

        // Handle controller change (when new SW takes control)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Service worker controller changed, reloading...');
            window.location.reload();
        });
    }

    showUpdateNotification() {
        // Create update notification banner
        const existingBanner = document.getElementById('updateBanner');
        if (existingBanner) {
            existingBanner.remove();
        }

        const banner = document.createElement('div');
        banner.id = 'updateBanner';
        banner.innerHTML = `
            <div class="update-banner">
                <div class="update-content">
                    <span class="update-icon">🔄</span>
                    <div class="update-text">
                        <strong>Update Available</strong>
                        <p>A new version of PrepTracker is ready. Update now to get the latest features and improvements.</p>
                    </div>
                    <div class="update-actions">
                        <button id="updateNowBtn" class="primary-btn">Update Now</button>
                        <button id="updateLaterBtn" class="secondary-btn">Later</button>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .update-banner {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: var(--primary-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
                color: white;
                padding: 1rem;
                z-index: 1000;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            .update-content {
                display: flex;
                align-items: center;
                gap: 1rem;
                max-width: 1200px;
                margin: 0 auto;
            }
            .update-icon {
                font-size: 1.5rem;
                animation: spin 2s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .update-text {
                flex: 1;
            }
            .update-text strong {
                display: block;
                margin-bottom: 0.25rem;
            }
            .update-text p {
                margin: 0;
                opacity: 0.9;
                font-size: 0.9rem;
            }
            .update-actions {
                display: flex;
                gap: 0.5rem;
            }
            .update-actions button {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
            }
            .update-actions .primary-btn {
                background: white;
                color: var(--primary-color, #667eea);
            }
            .update-actions .secondary-btn {
                background: transparent;
                color: white;
                border: 1px solid rgba(255,255,255,0.3);
            }
            .update-actions button:hover {
                transform: translateY(-1px);
            }
            body.has-update-banner {
                padding-top: 80px;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(banner);
        document.body.classList.add('has-update-banner');

        // Add event listeners
        document.getElementById('updateNowBtn').addEventListener('click', () => {
            this.applyUpdate();
        });

        document.getElementById('updateLaterBtn').addEventListener('click', () => {
            this.dismissUpdateNotification();
        });

        console.log('Update notification shown');
    }

    showVersionMismatchNotification() {
        this.showToast('App version updated! Please refresh to use the latest version.', 'info');
        
        // Auto-refresh after a delay if user doesn't interact
        setTimeout(() => {
            if (this.updateAvailable) {
                console.log('Auto-refreshing due to version mismatch...');
                window.location.reload();
            }
        }, 10000);
    }

    applyUpdate() {
        if (this.newWorker) {
            console.log('Applying service worker update...');
            this.showToast('Updating app...', 'info');
            
            // Tell the new service worker to skip waiting and take control
            this.newWorker.postMessage({ type: 'SKIP_WAITING' });
        } else {
            // Fallback: force reload
            console.log('Force reloading for update...');
            window.location.reload();
        }
    }

    dismissUpdateNotification() {
        const banner = document.getElementById('updateBanner');
        if (banner) {
            banner.remove();
            document.body.classList.remove('has-update-banner');
        }
        
        // Show update later
        setTimeout(() => {
            if (this.updateAvailable) {
                this.showUpdateNotification();
            }
        }, 300000); // Show again in 5 minutes
    }

    // Version compatibility check
    checkVersionCompatibility() {
        const storedVersion = localStorage.getItem('app_version');
        if (storedVersion && storedVersion !== this.APP_VERSION) {
            console.log(`Version changed from ${storedVersion} to ${this.APP_VERSION}`);
            this.showToast('App updated! Some features may have been improved.', 'info');
        }
        localStorage.setItem('app_version', this.APP_VERSION);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PREPTrackerApp();
});