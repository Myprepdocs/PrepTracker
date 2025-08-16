// Netlify Function to securely provide Deepgram API key to client
exports.handler = async (event, context) => {
    console.log('🔑 [NETLIFY FUNCTION] get-deepgram-key called');
    
    try {
        // Get API key from Netlify environment variables
        const apiKey = process.env.DEEPGRAM_API_KEY;
        
        if (!apiKey) {
            console.error('🔑 [NETLIFY FUNCTION] DEEPGRAM_API_KEY not found in environment variables');
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    error: 'API key not configured',
                    message: 'DEEPGRAM_API_KEY environment variable is not set'
                })
            };
        }
        
        console.log('🔑 [NETLIFY FUNCTION] API key found, returning to client');
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({ 
                apiKey: apiKey,
                source: 'netlify-function'
            })
        };
        
    } catch (error) {
        console.error('🔑 [NETLIFY FUNCTION] Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message 
            })
        };
    }
};
