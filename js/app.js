class PREPTrackerApp {
    constructor() {
        this.APP_VERSION = window.testData ? 'TEST_VERSION' : '1.0.29';
        this.currentView = 'puppies';
        this.currentAge = '12weeks';
        this.currentPuppyId = null;
        this.puppyProfile = null;
        this.allProfiles = [];
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
                icon: '🪮',
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
            // Set version number in UI
            this.setVersionNumber();
            
            // Register service worker and handle updates
            await this.registerServiceWorker();
            
            // Check version compatibility
            this.checkVersionCompatibility();
            
            // Initialize storage
            await window.storage.init();
            
            // Initialize video storage
            await this.initVideoStorage();
            
            // Load all puppy profiles
            await this.loadAllProfiles();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize views
            await this.initializeViews();
            
            // Hide loading screen
            this.hideLoadingScreen();
            
            // Show appropriate initial view
            this.showView('dashboard');
            
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
        
        // Puppy management buttons
        document.getElementById('addPuppyBtn').addEventListener('click', () => {
            this.addNewPuppy();
        });

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
        document.getElementById('changelogBtn').addEventListener('click', async () => {
            const changelog = await getChangelog();
            if (changelog) {
                this.showChangelogModal(changelog);
            }
        });
        
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
        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        const menuBtn = document.getElementById('menuBtn');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
        
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
        if (viewName === 'puppies') {
            this.renderPuppyManagement();
        } else if (viewName === 'progress') {
            if (this.currentPuppyId) {
                this.renderProgressGrid();
            } else {
                this.showToast('Please select a puppy first', 'warning');
                this.showView('puppies');
            }
        } else if (viewName === 'dashboard') {
            if (this.currentPuppyId) {
                this.renderDashboard();
            } else {
                this.showToast('Please select a puppy first', 'warning');
                this.showView('puppies');
            }
        } else if (viewName === 'logs') {
            if (this.currentPuppyId) {
                this.renderLogsView();
            } else {
                this.showToast('Please select a puppy first', 'warning');
                this.showView('puppies');
            }
        } else if (viewName === 'supporting') {
            this.renderSupportingDocuments();
        }
    }

    async loadAllProfiles() {
        try {
            if (window.testData) {
                console.log("Using test data:", window.testData);
                console.log("Test data profiles:", window.testData.profiles);
                this.allProfiles = window.testData.profiles;
                this.currentPuppyId = window.testData.currentProfileId;

                // Populate storage with test data if it's not already there
                for (const profile of window.testData.profiles) {
                    await window.storage.saveProfile(profile, profile.id);
                }
                for (const key in window.testData.progress) {
                    const [pId, area, age] = key.split('_');
                    await window.storage.saveProgress(area, age, { value: window.testData.progress[key] }, pId);
                }
                for (const puppyId in window.testData.trainingLogs) {
                    for (const log of window.testData.trainingLogs[puppyId]) {
                        await window.storage.saveActivity(log, puppyId);
                    }
                }

                if (this.currentPuppyId) {
                    await this.selectPuppy(this.currentPuppyId);
                } else if (this.allProfiles.length > 0) {
                    await this.selectPuppy(this.allProfiles[0].id);
                }

            } else {
                this.allProfiles = await window.storage.getAllProfiles();
                
                // Get current puppy from localStorage or use first available
                const savedPuppyId = localStorage.getItem('currentPuppyId');
                if (savedPuppyId && this.allProfiles.find(p => p.id === savedPuppyId)) {
                    await this.selectPuppy(savedPuppyId);
                } else if (this.allProfiles.length > 0) {
                    await this.selectPuppy(this.allProfiles[0].id);
                }
            }
        } catch (error) {
            console.error('Failed to load profiles:', error);
            this.allProfiles = [];
        }
    }

    async selectPuppy(puppyId) {
        try {
            this.currentPuppyId = puppyId;
            this.puppyProfile = await window.storage.getProfile(puppyId);
            
            // Save selection to localStorage
            localStorage.setItem('currentPuppyId', puppyId);
            
            // Update UI
            this.updatePuppyInfo();
            this.renderPuppyManagement();
            
        } catch (error) {
            console.error('Failed to select puppy:', error);
            this.showToast('Failed to select puppy: ' + error.message, 'error');
        }
    }

    renderPuppyManagement() {
        console.log("renderPuppyManagement method called.");
        this.updateCurrentPuppyDisplay();
        this.updatePuppyList();
    }

    updateCurrentPuppyDisplay() {
        const currentPuppyDisplay = document.getElementById('currentPuppyDisplay');
        const addPuppyBtn = document.getElementById('addPuppyBtn');
        
        if (this.puppyProfile) {
            const age = window.storage.calculateAge(this.puppyProfile.dateOfBirth);
            const formattedDateOfBirth = this.formatDateOfBirth(this.puppyProfile.dateOfBirth);
            currentPuppyDisplay.innerHTML = `
                <div class="current-puppy-card">
                    <div class="current-puppy-info">
                        <h4>${this.puppyProfile.puppyName}</h4>
                        <p><strong>Age:</strong> ${age.text}</p>
                        <p><strong>Date of Birth:</strong> ${formattedDateOfBirth}</p>
                        <p><strong>Breed:</strong> ${this.puppyProfile.breed || 'Not specified'}</p>
                        <p><strong>Computer Number:</strong> ${this.puppyProfile.computerNumber || 'Not specified'}</p>
                    </div>
                </div>
                <div class="current-puppy-actions">
                    <button class="secondary-btn" onclick="app.editCurrentPuppy()">Edit Profile</button>
                    <button class="primary-btn" onclick="app.showView('progress')">View Progress</button>
                </div>
            `;
            addPuppyBtn.style.display = 'block';
        } else {
            currentPuppyDisplay.innerHTML = `
                <p>No puppy selected</p>
                <button id="addFirstPuppyBtn" class="primary-btn" onclick="app.showView('profile')">Add Your First Puppy</button>
            `;
            addPuppyBtn.style.display = 'none';
        }
    }

    updatePuppyList() {
        const puppyList = document.getElementById('puppyList');
        
        if (this.allProfiles.length === 0) {
            puppyList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1/-1;">No puppies added yet</p>';
            return;
        }
        
        puppyList.innerHTML = '';
        this.allProfiles.forEach(profile => {
            const age = window.storage.calculateAge(profile.dateOfBirth);
            const formattedDateOfBirth = this.formatDateOfBirth(profile.dateOfBirth);
            const isSelected = profile.id === this.currentPuppyId;
            
            const puppyCard = document.createElement('div');
            puppyCard.className = `puppy-card ${isSelected ? 'selected' : ''}`;
            puppyCard.innerHTML = `
                <div class="puppy-card-header">
                    <div class="puppy-card-info">
                        <h4>${profile.puppyName}</h4>
                        <p><strong>Age:</strong> ${age.text}</p>
                        <p><strong>Date of Birth:</strong> ${formattedDateOfBirth}</p>
                        <p><strong>Breed:</strong> ${profile.breed || 'Not specified'}</p>
                        <p><strong>Computer Number:</strong> ${profile.computerNumber || 'Not specified'}</p>
                    </div>
                    <span class="puppy-status ${isSelected ? 'current' : 'inactive'}">
                        ${isSelected ? 'Current' : 'Inactive'}
                    </span>
                </div>
                <div class="puppy-card-actions">
                    <button class="secondary-btn" onclick="app.editPuppy('${profile.id}')">Edit</button>
                    <button class="secondary-btn" onclick="app.deletePuppy('${profile.id}')">Delete</button>
                    ${!isSelected ? `<button class="primary-btn" onclick="app.selectPuppy('${profile.id}')">Select</button>` : ''}
                </div>
            `;
            
            puppyList.appendChild(puppyCard);
        });
    }

    // Puppy Management Methods
    addNewPuppy() {
        this.currentPuppyId = null;
        this.puppyProfile = null;
        this.showView('profile');
        this.clearProfileForm();
    }

    editCurrentPuppy() {
        if (this.puppyProfile) {
            this.editPuppy(this.puppyProfile.id);
        }
    }

    editPuppy(puppyId) {
        this.selectPuppy(puppyId);
        this.showView('profile');
        this.populateProfileForm();
    }

    async deletePuppy(puppyId) {
        if (this.allProfiles.length === 1) {
            this.showToast('Cannot delete the only puppy. Add another puppy first.', 'warning');
            return;
        }

        const puppy = this.allProfiles.find(p => p.id === puppyId);
        if (!puppy) return;

        const confirmed = confirm(`Are you sure you want to delete ${puppy.puppyName}? This will permanently remove all training data for this puppy.`);
        if (!confirmed) return;

        try {
            // Delete associated videos from IndexedDB
            await this.deleteAllVideosForPuppy(puppyId);
            
            // Delete the puppy profile
            await window.storage.deleteProfile(puppyId);

            // Remove from local array
            this.allProfiles = this.allProfiles.filter(p => p.id !== puppyId);

            // If this was the current puppy, select another one
            if (this.currentPuppyId === puppyId) {
                if (this.allProfiles.length > 0) {
                    await this.selectPuppy(this.allProfiles[0].id);
                } else {
                    this.currentPuppyId = null;
                    this.puppyProfile = null;
                    localStorage.removeItem('currentPuppyId');
                }
            }

            this.renderPuppyManagement();
            this.showToast(`${puppy.puppyName} has been deleted`, 'success');

        } catch (error) {
            console.error('Failed to delete puppy:', error);
            this.showToast('Failed to delete puppy: ' + error.message, 'error');
        }
    }

    clearProfileForm() {
        document.getElementById('puppyNameInput').value = '';
        document.getElementById('computerNumber').value = '';
        document.getElementById('dateOfBirth').value = '';
        document.getElementById('breed').value = '';
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
        const progress = await window.storage.getProgress(area.id, selectedAge, this.currentPuppyId);
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
        const progress = await window.storage.getProgress(area.id, selectedAge, this.currentPuppyId);
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
            const progress = await window.storage.getProgress(area.id, this.currentAge, this.currentPuppyId);
            const milestone = area.milestones[this.currentAge];

            const areaElement = document.createElement('div');
            areaElement.className = 'training-area';
            areaElement.innerHTML = `
                <div class="training-header ${area.class}">
                    <span class="training-icon">${area.icon}</span>
                    ${area.name}
                    <button class="complete-elearning" title="Complete e-learning">📁</button>
                </div>
                <div class="collapsible-content">
                    <div class="training-content">
                        <div class="area-age-selector">
                            <input type="radio" id="age-${area.id}-12weeks" name="age-${area.id}" value="12weeks" ${this.currentAge === '12weeks' ? 'checked' : ''}>
                            <label for="age-${area.id}-12weeks">3</label>
                            
                            <input type="radio" id="age-${area.id}-juvenile" name="age-${area.id}" value="juvenile" ${this.currentAge === 'juvenile' ? 'checked' : ''}>
                            <label for="age-${area.id}-juvenile">6</label>
                            
                            <input type="radio" id="age-${area.id}-adolescent" name="age-${area.id}" value="adolescent" ${this.currentAge === 'adolescent' ? 'checked' : ''}>
                            <label for="age-${area.id}-adolescent">9</label>
                            
                            <input type="radio" id="age-${area.id}-12months" name="age-${area.id}" value="12months" ${this.currentAge === '12months' ? 'checked' : ''}>
                            <label for="age-${area.id}-12months">12</label>
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
                        <div class="notes-bar" data-area="${area.id}" data-age="${this.currentAge}">
                            📝 Notes
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
                                        <label for="logNotes-${area.id}">Notes</label>
                                        <div id="logNotesEditor-${area.id}" class="log-notes-editor"></div>
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
                                    <div class="form-actions">
                                        <button type="button" class="secondary-btn cancel-log-btn">Cancel</button>
                                        <button type="button" class="primary-btn save-log-btn">Save</button>
                                    </div>
                                </div>
                                <button class="primary-btn add-entry-btn">Add New Entry</button>
                            </div>
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
        const header = element.querySelector('.training-header');

        // Accordion toggle for mobile
        header.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                element.classList.toggle('active');
            }
        });
        
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

        // Notes bar - redirect to central logging system
        const notesBar = element.querySelector('.notes-bar');
        notesBar.addEventListener('click', (e) => {
            e.stopPropagation();
            this.redirectToLogsWithFilter(area.id, this.currentAge);
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
            const activities = await window.storage.getActivities(area.id, this.currentAge, this.currentPuppyId);
            
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
        const notesEditor = element.querySelector(`#logNotesEditor-${area.id}`);

        // Show form and hide add button
        form.style.display = 'block';
        addBtn.style.display = 'none';

        // Initialize Quill editor
        this.quill = new Quill(notesEditor, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block']
                ]
            }
        });

        // Focus on notes input
        setTimeout(() => this.quill.focus(), 100);
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
        const videoInput = element.querySelector('.log-video');

        const date = new Date().toISOString().split('T')[0];
        const notes = this.quill.root.innerHTML;

        if (!notes.trim()) {
            this.showToast('Please fill in notes', 'error');
            return;
        }

        try {
            const activityData = {
                trainingArea: area.id,
                ageRange: this.currentAge,
                date,
                notes
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

            await window.storage.saveActivity(activityData, this.currentPuppyId);

            // Refresh the accordion entries
            const accordion = element.querySelector('.progress-accordion');
            await this.loadExistingEntries(accordion, area);

            // Hide form and show success message
            this.hideProgressForm(element);
            this.showToast('Progress entry saved successfully', 'success');

        } catch (error) {
            console.error('Failed to save progress entry:', error);
            this.showToast('Failed to save progress entry', 'error');
        }
    }

    async handleProgressChange(e, area) {
        const value = parseInt(e.target.value);
        
        try {
            await window.storage.saveProgress(area.id, this.currentAge, { value }, this.currentPuppyId);
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
                    <div id="activityNotesEditor"></div>
                </div>
            </div>
        `;
        
        // Restore footer with Save/Cancel buttons
        modalFooter.innerHTML = `
            <button id="cancelActivity" class="secondary-btn">Cancel</button>
            <button id="saveActivity" class="primary-btn">Save</button>
        `;
        
        const dateInput = document.getElementById('activityDate');
        const notesEditor = document.getElementById('activityNotesEditor');

        this.quill = new Quill(notesEditor, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block']
                ]
            }
        });
        
        dateInput.value = new Date().toISOString().split('T')[0];
        
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
        this.quill.focus();
    }

    closeModal() {
        document.getElementById('activityModal').style.display = 'none';
        if (this.quill) {
            this.quill = null;
        }
    }

    async saveActivity() {
        const modal = document.getElementById('activityModal');
        const area = modal.dataset.area;
        const age = modal.dataset.age;
        const context = modal.dataset.context;
        const date = document.getElementById('activityDate').value;
        const notes = this.quill.root.innerHTML;
        
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
                status: 'working' // Since we removed the status dropdown
            };
            
            await window.storage.saveActivity(activityData);
            
            // Refresh the progress grid
            await this.renderProgressGrid();
            
            this.closeModal();
            this.showToast('Training activity saved successfully', 'success');
            
            // If we came from progress log modal, return to it with updated data
            if (context === 'progress-log') {
                setTimeout(async () => {
                    const areaObj = this.trainingAreas.find(a => a.id === area);
                    if (areaObj) {
                        const activities = await window.storage.getActivities(area, age);
                        this.showProgressLogModal(areaObj, age, activities);
                    }
                }, 100);
            }
            
        } catch (error) {
            console.error('Failed to save activity:', error);
            this.showToast('Failed to save activity', 'error');
        }
    }

    async renderDashboard() {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        const puppySelectorBar = document.querySelector('.puppy-selector-bar');
        
        if (!dashboardGrid || !puppySelectorBar) return;
        
        // Clear existing content
        dashboardGrid.innerHTML = '';
        
        // Get current puppy's age info
        const ageInfo = window.storage.calculateAge(this.puppyProfile.dateOfBirth);
        const currentMilestone = ageInfo.key;
        
        // Calculate puppy's age progress through current milestone
        const milestoneProgress = this.calculateMilestoneProgress(this.puppyProfile.dateOfBirth);
        
        // Generate progress rings for the 10 behaviors in the current milestone
        for (const area of this.trainingAreas) {
            const progress = await window.storage.getProgress(area.id, currentMilestone, this.currentPuppyId);
            const progressValue = progress?.value || 0;
            
            // Calculate progress comment based on the requirements
            const comment = this.calculateProgressComment(progressValue, milestoneProgress);
            
            const ringCard = this.createProgressRingCard(area, progressValue, currentMilestone, comment);
            dashboardGrid.appendChild(ringCard);
        }
        
        // Render puppy selector bar
        await this.renderPuppySelectorBar();
    }
    
    calculateMilestoneProgress(dateOfBirth) {
        const today = new Date();
        const birth = new Date(dateOfBirth);
        const daysSinceBirth = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
        
        // Define milestone age ranges in days
        const milestones = {
            '12weeks': { start: 0, end: 112 }, // 0-16 weeks
            'juvenile': { start: 112, end: 168 }, // 16-24 weeks  
            'adolescent': { start: 168, end: 280 }, // 24-40 weeks
            '12months': { start: 280, end: 365 } // 40-52+ weeks
        };
        
        // Find current milestone
        let currentMilestone = '12months';
        for (const [key, range] of Object.entries(milestones)) {
            if (daysSinceBirth >= range.start && daysSinceBirth < range.end) {
                currentMilestone = key;
                break;
            }
        }
        
        const range = milestones[currentMilestone];
        const progressThroughMilestone = ((daysSinceBirth - range.start) / (range.end - range.start)) * 100;
        
        return Math.max(0, Math.min(100, progressThroughMilestone));
    }
    
    calculateProgressComment(behaviorProgress, milestoneProgress) {
        const difference = behaviorProgress - milestoneProgress;
        
        if (Math.abs(difference) <= 5) {
            return { text: 'On Track', class: 'on-track' };
        } else if (difference > 5) {
            return { text: 'Well ahead!', class: 'well-ahead' };
        } else {
            return { text: 'Review', class: 'review-progress' };
        }
    }
    
    createProgressRingCard(area, progressValue, milestone, comment) {
        const card = document.createElement('div');
        card.className = 'progress-ring-card';
        
        const circumference = 2 * Math.PI * 46; // radius = 46
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (progressValue / 100) * circumference;
        
        card.innerHTML = `
            <div class="behavior-info">
                <span class="behavior-icon">${area.icon}</span>
                <div class="behavior-name">${area.name}</div>
                <div class="behavior-milestone">${this.getMilestoneLabel(milestone)}</div>
            </div>
            
            <div class="progress-ring-container">
                <svg class="progress-ring" viewBox="0 0 120 120">
                    <circle class="progress-ring-bg" cx="60" cy="60" r="46"></circle>
                    <circle class="progress-ring-fill ${area.class}" 
                            cx="60" cy="60" r="46"
                            stroke-dasharray="${strokeDasharray}"
                            stroke-dashoffset="${strokeDashoffset}"></circle>
                </svg>
                <div class="progress-ring-text">${progressValue}%</div>
            </div>
            
            <div class="progress-comment-text ${comment.class}">${comment.text}</div>
            
            <div class="view-progress-bar" onclick="app.viewProgressFromDashboard('${area.id}', '${milestone}')">
                📊 Track Progress
            </div>
        `;
        
        return card;
    }
    
    viewProgressFromDashboard(areaId, milestone) {
        // Switch to progress view and scroll to the specific area
        this.showView('progress');
        
        // Set the age to the milestone and wait for the view to render
        setTimeout(() => {
            this.selectAge(milestone);
            
            // Scroll to the specific training area
            setTimeout(() => {
                const targetArea = document.querySelector(`[data-area="${areaId}"]`);
                if (targetArea) {
                    const trainingArea = targetArea.closest('.training-area');
                    if (trainingArea) {
                        // If on mobile, expand the training area first
                        if (window.innerWidth <= 768) {
                            trainingArea.classList.add('active');
                        }
                        
                        // Scroll into view after expanding
                        trainingArea.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                        
                        // Highlight the area briefly
                        trainingArea.style.transform = 'scale(1.02)';
                        trainingArea.style.boxShadow = 'var(--shadow-xl)';
                        trainingArea.style.borderColor = 'var(--primary-blue)';
                        
                        setTimeout(() => {
                            trainingArea.style.transform = '';
                            trainingArea.style.boxShadow = '';
                            trainingArea.style.borderColor = '';
                        }, 2000);
                    }
                }
            }, 500);
        }, 100);
    }
    
    getMilestoneLabel(milestone) {
        const labels = {
            '12weeks': '3 Months (12 Weeks)',
            'juvenile': '6 Months (Juvenile)',
            'adolescent': '9 Months (Adolescent)',
            '12months': '12+ Months'
        };
        return labels[milestone] || milestone;
    }
    
    async renderPuppySelectorBar() {
        const puppySelectorBar = document.querySelector('.puppy-selector-bar');
        if (!puppySelectorBar) return;
        
        puppySelectorBar.innerHTML = `
            <h3>Switch Puppy</h3>
            <div class="puppy-bars">
                ${this.allProfiles.map(profile => {
                    const age = window.storage.calculateAge(profile.dateOfBirth);
                    const isActive = profile.id === this.currentPuppyId;
                    return `
                        <div class="puppy-bar ${isActive ? 'active' : ''}" 
                             onclick="app.selectPuppyFromDashboard('${profile.id}')">
                            <div class="puppy-bar-name">${profile.puppyName}</div>
                            <div class="puppy-bar-age">${age.text}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    async selectPuppyFromDashboard(puppyId) {
        if (puppyId !== this.currentPuppyId) {
            await this.selectPuppy(puppyId);
            await this.renderDashboard();
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
        
        const profileData = {
            puppyName: document.getElementById('puppyNameInput').value.trim(),
            computerNumber: document.getElementById('computerNumber').value.trim(),
            dateOfBirth: document.getElementById('dateOfBirth').value,
            breed: document.getElementById('breed').value
        };
        
        if (!profileData.puppyName || !profileData.dateOfBirth) {
            this.showToast('Please fill in required fields', 'error');
            return;
        }
        
        try {
            // Check if we're editing an existing puppy or creating a new one
            const isEditing = this.currentPuppyId && this.puppyProfile;
            
            if (isEditing) {
                // Update existing puppy
                const updatedProfile = await window.storage.saveProfile(profileData, this.currentPuppyId);
                this.puppyProfile = updatedProfile;
                
                // Update the profile in our local array
                const index = this.allProfiles.findIndex(p => p.id === this.currentPuppyId);
                if (index !== -1) {
                    this.allProfiles[index] = updatedProfile;
                }
                
                this.showToast('Profile updated successfully', 'success');
            } else {
                // Create new puppy
                const newProfile = await window.storage.saveProfile(profileData);
                
                // Refresh the profiles array without changing current selection
                this.allProfiles = await window.storage.getAllProfiles();
                
                // Select the new puppy
                await this.selectPuppy(newProfile.id);
                
                this.showToast('New puppy added successfully', 'success');
            }
            
            setTimeout(() => {
                this.showView('puppies');
            }, 1000);
            
        } catch (error) {
            console.error('Failed to save profile:', error);
            this.showToast('Failed to save profile: ' + error.message, 'error');
        }
    }

    populateProfileForm() {
        if (!this.puppyProfile) return;
        
        document.getElementById('puppyNameInput').value = this.puppyProfile.puppyName || '';
        document.getElementById('computerNumber').value = this.puppyProfile.computerNumber || '';
        document.getElementById('dateOfBirth').value = this.puppyProfile.dateOfBirth || '';
        document.getElementById('breed').value = this.puppyProfile.breed || '';
    }

    updatePuppyInfo() {
        const puppyInfo = document.getElementById('puppyInfo');
        const puppyName = document.getElementById('puppyName');
        const puppyAge = document.getElementById('puppyAge');

        if (this.puppyProfile) {
            const age = window.storage.calculateAge(this.puppyProfile.dateOfBirth);
            puppyName.textContent = this.puppyProfile.puppyName;
            puppyAge.textContent = age.text;
            puppyInfo.style.display = 'block';

            // Update current age based on puppy's actual age
            this.currentAge = age.key;
            this.selectAge(this.currentAge);
        } else {
            puppyInfo.style.display = 'none';
        }
    }

    toggleMenu() {
        const navMenu = document.getElementById('navMenu');
        const menuBtn = document.getElementById('menuBtn');
        
        // Toggle menu visibility
        navMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
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

    formatDateOfBirth(dateString) {
        if (!dateString) return 'Not specified';
        
        try {
            const date = new Date(dateString);
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            return date.toLocaleDateString('en-US', options);
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString; // Return original string if formatting fails
        }
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
            } else if (event.data && event.data.type === 'SHOW_CHANGELOG') {
                console.log('Changelog received from service worker');
                this.showChangelogModal(event.data.changelog);
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

    showChangelogModal(changelog) {
        const modal = document.getElementById('changelogModal');
        const changelogList = document.getElementById('changelogList');
        changelogList.innerHTML = changelog.map(item => `<li>${item}</li>`).join('');
        modal.style.display = 'flex';

        const closeBtn = document.getElementById('closeChangelogModal');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        modal.onclick = (e) => {
            if (e.target.id === 'changelogModal') {
                modal.style.display = 'none';
            }
        };
    }

    // Redirect to central logging system with filters
    redirectToLogsWithFilter(behaviorId, milestone) {
        if (!this.currentPuppyId) {
            this.showToast('Please select a puppy first', 'warning');
            return;
        }

        // Switch to logs view
        this.showView('logs');
        
        // Apply filters after the view is rendered
        setTimeout(() => {
            document.getElementById('logBehaviorFilter').value = behaviorId;
            document.getElementById('logMilestoneFilter').value = milestone;
            this.applyLogFilters();
        }, 100);
        
        // Store context for new log modal
        this.pendingLogPrefill = {behavior: behaviorId, milestone};
    }

    // Central Logging System Methods
    async renderLogsView() {
        try {
            this.setupLogsEventListeners();
            await this.loadAndDisplayLogs();
        } catch (error) {
            console.error('Failed to render logs view:', error);
            this.showToast('Failed to load training logs', 'error');
        }
    }
    
    setupLogsEventListeners() {
        // Add new log entry button
        const addNewLogBtn = document.getElementById('addNewLogBtn');
        if (addNewLogBtn && !addNewLogBtn.hasAttribute('data-listener-added')) {
            addNewLogBtn.addEventListener('click', () => {
                this.showNewLogModal(this.pendingLogPrefill || {});
            });
            addNewLogBtn.setAttribute('data-listener-added', 'true');
        }
        
        // Filter controls
        const behaviorFilter = document.getElementById('logBehaviorFilter');
        const milestoneFilter = document.getElementById('logMilestoneFilter');
        const dateFilter = document.getElementById('logDateFilter');
        const clearFilters = document.getElementById('clearFilters');
        
        if (behaviorFilter && !behaviorFilter.hasAttribute('data-listener-added')) {
            behaviorFilter.addEventListener('change', () => this.applyLogFilters());
            behaviorFilter.setAttribute('data-listener-added', 'true');
        }
        
        if (milestoneFilter && !milestoneFilter.hasAttribute('data-listener-added')) {
            milestoneFilter.addEventListener('change', () => this.applyLogFilters());
            milestoneFilter.setAttribute('data-listener-added', 'true');
        }
        
        if (dateFilter && !dateFilter.hasAttribute('data-listener-added')) {
            dateFilter.addEventListener('change', () => this.applyLogFilters());
            dateFilter.setAttribute('data-listener-added', 'true');
        }
        
        if (clearFilters && !clearFilters.hasAttribute('data-listener-added')) {
            clearFilters.addEventListener('click', () => this.clearLogFilters());
            clearFilters.setAttribute('data-listener-added', 'true');
        }
    }
    
    async loadAndDisplayLogs(filters = {}) {
        try {
            const logs = await window.storage.getFilteredLogEntries(this.currentPuppyId, filters);
            this.displayLogs(logs);
            this.updateLogsStats(logs);
        } catch (error) {
            console.error('Failed to load logs:', error);
            this.showEmptyLogsMessage();
        }
    }
    
    displayLogs(logs) {
        const logsContent = document.getElementById('logsContent');
        
        if (!logs || logs.length === 0) {
            this.showEmptyLogsMessage();
            return;
        }
        
        logsContent.innerHTML = logs.map(log => this.createLogEntryHTML(log)).join('');
        
        // Add event listeners to log entry actions
        this.addLogEntryEventListeners();
    }
    
    createLogEntryHTML(log) {
        const behaviorInfo = this.trainingAreas.find(area => area.id === log.trainingArea) || 
                            { name: log.trainingArea, icon: '📝' };
        
        const milestoneLabels = {
            '12weeks': '3 Months (12 Weeks)',
            'juvenile': '6 Months (Juvenile)', 
            'adolescent': '9 Months (Adolescent)',
            '12months': '12+ Months'
        };
        
        const formattedDate = new Date(log.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
        });
        
        return `
            <div class="log-entry" data-log-id="${log.id}">
                <div class="log-entry-header">
                    <div class="log-entry-info">
                        <div class="log-entry-date">${formattedDate}</div>
                        <div class="log-entry-behavior">
                            <span class="behavior-icon">${behaviorInfo.icon}</span>
                            ${behaviorInfo.name}
                        </div>
                    </div>
                    <div class="log-entry-milestone">
                        ${milestoneLabels[log.ageRange] || log.ageRange}
                    </div>
                </div>
                
                <div class="log-entry-content">
                    <div class="log-entry-notes">${log.notes}</div>
                    ${log.video ? `
                        <div class="log-entry-video">
                            <span class="video-icon">📹</span>
                            <span class="video-name">${log.video.name}</span>
                            <span class="video-size">(${Math.round(log.video.size / 1024 / 1024 * 100) / 100} MB)</span>
                            <button class="video-play-btn" onclick="app.playVideo('${log.video.reference}', '${log.video.name}')" title="Play video">
                                ▶️ Play Video
                            </button>
                        </div>
                    ` : ''}
                </div>
                
                <div class="log-entry-actions">
                    <button class="secondary-btn edit-log-btn" data-log-id="${log.id}">Edit</button>
                    <button class="secondary-btn delete-log-btn" data-log-id="${log.id}">Delete</button>
                </div>
            </div>
        `;
    }
    
    addLogEntryEventListeners() {
        const editBtns = document.querySelectorAll('.edit-log-btn');
        const deleteBtns = document.querySelectorAll('.delete-log-btn');
        
        editBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const logId = e.target.dataset.logId;
                this.editLogEntry(logId);
            });
        });
        
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const logId = e.target.dataset.logId;
                this.deleteLogEntry(logId);
            });
        });
    }
    
    showEmptyLogsMessage() {
        const logsContent = document.getElementById('logsContent');
        logsContent.innerHTML = `
            <div class="empty-logs">
                <div class="empty-icon">📝</div>
                <h3>No Training Logs Yet</h3>
                <p>Start logging your puppy's training activities and progress to track their development.</p>
                <button class="primary-btn" onclick="app.showNewLogModal()">Add Your First Log Entry</button>
            </div>
        `;
    }
    
    updateLogsStats(logs) {
        // Calculate stats from logs
        const totalLogs = logs.length;
        const behaviorCounts = {};
        const milestoneCounts = {};
        
        logs.forEach(log => {
            behaviorCounts[log.trainingArea] = (behaviorCounts[log.trainingArea] || 0) + 1;
            milestoneCounts[log.ageRange] = (milestoneCounts[log.ageRange] || 0) + 1;
        });
        
        const mostActiveArea = Object.keys(behaviorCounts).reduce((a, b) => 
            behaviorCounts[a] > behaviorCounts[b] ? a : b, Object.keys(behaviorCounts)[0] || 'none');
        
        // Create or update stats display
        let statsDiv = document.querySelector('.logs-stats');
        if (!statsDiv) {
            statsDiv = document.createElement('div');
            statsDiv.className = 'logs-stats';
            const logsContent = document.getElementById('logsContent');
            logsContent.parentNode.insertBefore(statsDiv, logsContent);
        }
        
        const mostActiveAreaInfo = this.trainingAreas.find(area => area.id === mostActiveArea);
        
        statsDiv.innerHTML = `
            <div class="logs-stat">
                <div class="logs-stat-value">${totalLogs}</div>
                <div class="logs-stat-label">Total Entries</div>
            </div>
            <div class="logs-stat">
                <div class="logs-stat-value">${Object.keys(behaviorCounts).length}</div>
                <div class="logs-stat-label">Areas Covered</div>
            </div>
            <div class="logs-stat">
                <div class="logs-stat-value">${mostActiveAreaInfo ? mostActiveAreaInfo.name : 'None'}</div>
                <div class="logs-stat-label">Most Active Area</div>
            </div>
        `;
    }
    
    applyLogFilters() {
        const behaviorFilter = document.getElementById('logBehaviorFilter').value;
        const milestoneFilter = document.getElementById('logMilestoneFilter').value;
        const dateFilter = document.getElementById('logDateFilter').value;
        
        const filters = {};
        if (behaviorFilter && behaviorFilter !== 'all') filters.behavior = behaviorFilter;
        if (milestoneFilter && milestoneFilter !== 'all') filters.milestone = milestoneFilter;
        if (dateFilter) filters.date = dateFilter;
        
        this.loadAndDisplayLogs(filters);
        this.showActiveFilters(filters);
    }
    
    showActiveFilters(filters) {
        let activeFiltersDiv = document.querySelector('.active-filters');
        if (!activeFiltersDiv && Object.keys(filters).length > 0) {
            activeFiltersDiv = document.createElement('div');
            activeFiltersDiv.className = 'active-filters';
            const logsContent = document.getElementById('logsContent');
            logsContent.parentNode.insertBefore(activeFiltersDiv, logsContent);
        }
        
        if (Object.keys(filters).length === 0) {
            if (activeFiltersDiv) activeFiltersDiv.remove();
            return;
        }
        
        const filterChips = Object.entries(filters).map(([key, value]) => {
            let label = value;
            if (key === 'behavior') {
                const area = this.trainingAreas.find(a => a.id === value);
                label = area ? area.name : value;
            } else if (key === 'milestone') {
                const labels = {
                    '12weeks': '3 Months',
                    'juvenile': '6 Months', 
                    'adolescent': '9 Months',
                    '12months': '12+ Months'
                };
                label = labels[value] || value;
            }
            
            return `<div class="filter-chip">${label} <button onclick="app.removeFilter('${key}')">&times;</button></div>`;
        });
        
        activeFiltersDiv.innerHTML = filterChips.join('');
    }
    
    removeFilter(filterKey) {
        if (filterKey === 'behavior') {
            document.getElementById('logBehaviorFilter').value = 'all';
        } else if (filterKey === 'milestone') {
            document.getElementById('logMilestoneFilter').value = 'all';
        } else if (filterKey === 'date') {
            document.getElementById('logDateFilter').value = '';
        }
        this.applyLogFilters();
    }
    
    clearLogFilters() {
        document.getElementById('logBehaviorFilter').value = 'all';
        document.getElementById('logMilestoneFilter').value = 'all';
        document.getElementById('logDateFilter').value = '';
        this.loadAndDisplayLogs();
        
        const activeFiltersDiv = document.querySelector('.active-filters');
        if (activeFiltersDiv) activeFiltersDiv.remove();
    }
    
    // Global voice recognition instance
    initVoiceRecognition() {
        // Don't reinitialize if already exists
        if (this.voiceRecognition) {
            return;
        }
        
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            try {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                this.voiceRecognition = new SpeechRecognition();
                
                this.voiceRecognition.continuous = false;
                this.voiceRecognition.interimResults = false;
                this.voiceRecognition.lang = 'en-US';
                this.voiceRecognition.maxAlternatives = 1;
                
                this.voiceRecognition.onstart = () => {
                    console.log('Voice recognition started');
                    this.isRecognizing = true;
                    this.updateVoiceButtonState('listening');
                };
                
                this.voiceRecognition.onresult = (event) => {
                    console.log('Voice recognition result:', event.results);
                    if (event.results && event.results[0] && event.results[0][0]) {
                        const transcript = event.results[0][0].transcript;
                        console.log('Transcript:', transcript);
                        this.insertVoiceText(transcript);
                    }
                };
                
                this.voiceRecognition.onerror = (event) => {
                    console.error('Voice recognition error:', event.error);
                    this.isRecognizing = false;
                    this.updateVoiceButtonState('idle');
                    
                    let errorMessage = 'Voice recognition error';
                    switch(event.error) {
                        case 'not-allowed':
                            errorMessage = 'Microphone access denied. Please allow microphone access in browser settings.';
                            break;
                        case 'no-speech':
                            errorMessage = 'No speech detected. Please try again.';
                            break;
                        case 'audio-capture':
                            errorMessage = 'No microphone found or audio capture failed.';
                            break;
                        case 'network':
                            errorMessage = 'Network error occurred during voice recognition.';
                            break;
                        default:
                            errorMessage = `Voice recognition error: ${event.error}`;
                    }
                    this.showToast(errorMessage, 'error');
                };
                
                this.voiceRecognition.onend = () => {
                    console.log('Voice recognition ended');
                    this.isRecognizing = false;
                    this.updateVoiceButtonState('idle');
                };
                
                console.log('Voice recognition initialized successfully');
            } catch (error) {
                console.error('Failed to initialize voice recognition:', error);
                this.voiceRecognition = null;
            }
        } else {
            console.log('Voice recognition not supported in this browser');
        }
    }
    
    // Update voice button state
    updateVoiceButtonState(state) {
        const voiceBtn = document.getElementById('voiceInputBtn');
        const voiceStatus = document.getElementById('voiceStatus');
        
        if (!voiceBtn || !voiceStatus) return;
        
        voiceBtn.className = 'voice-input-btn';
        voiceStatus.className = 'voice-status';
        
        switch(state) {
            case 'listening':
                voiceBtn.classList.add('listening');
                voiceBtn.innerHTML = '⏹️';
                voiceStatus.textContent = 'Listening...';
                voiceStatus.classList.add('listening');
                break;
            case 'processing':
                voiceBtn.classList.add('processing');
                voiceBtn.innerHTML = '⏳';
                voiceStatus.textContent = 'Processing...';
                voiceStatus.classList.add('processing');
                break;
            default:
                voiceBtn.innerHTML = '🎤';
                voiceStatus.textContent = 'Click to record';
        }
    }
    
    // Insert voice text into Quill editor
    insertVoiceText(text) {
        if (this.logQuill || this.quill) {
            this.updateVoiceButtonState('processing');
            
            setTimeout(() => {
                const editor = this.logQuill || this.quill;
                const currentContent = editor.getText();
                const newText = currentContent.trim() ? ` ${text}` : text;
                
                editor.insertText(editor.getLength() - 1, newText);
                this.updateVoiceButtonState('idle');
            }, 500);
        }
    }
    
    // Toggle voice recording
    toggleVoiceRecording() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showToast('Voice recognition not supported in this browser', 'warning');
            return;
        }
        
        // Initialize if not already done
        if (!this.voiceRecognition) {
            this.initVoiceRecognition();
        }
        
        if (!this.voiceRecognition) {
            this.showToast('Failed to initialize voice recognition', 'error');
            return;
        }
        
        try {
            if (this.isRecognizing) {
                this.voiceRecognition.stop();
                this.isRecognizing = false;
                this.updateVoiceButtonState('idle');
            } else {
                this.voiceRecognition.start();
            }
        } catch (error) {
            console.error('Voice recognition error:', error);
            this.showToast('Voice recognition failed: ' + error.message, 'error');
            this.isRecognizing = false;
            this.updateVoiceButtonState('idle');
        }
    }

    showNewLogModal(prefill = {}, editingLogId = null) {
        const modal = document.getElementById('newLogModal');
        const title = document.getElementById('newLogTitle');
        
        // Set modal title based on whether we're editing or creating
        title.textContent = editingLogId ? 'Edit Training Log Entry' : 'Add New Training Log Entry';
        
        // Scroll modal to top
        modal.scrollTop = 0;
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) modalContent.scrollTop = 0;
        
        // Store editing state
        this.editingLogId = editingLogId;
        
        // Destroy existing Quill instance if it exists
        if (this.logQuill) {
            this.logQuill = null;
        }
        
        // Setup modal event listeners
        this.setupNewLogModalEventListeners();
        
        // Reset form
        document.getElementById('logEntryDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('logEntryBehavior').value = '';
        document.getElementById('logEntryMilestone').value = '';
        
        // Use pending prefill if available, otherwise use provided prefill
        const actualPrefill = this.pendingLogPrefill || prefill;
        
        // Apply prefill parameters
        if (actualPrefill.behavior) document.getElementById('logEntryBehavior').value = actualPrefill.behavior;
        if (actualPrefill.milestone) document.getElementById('logEntryMilestone').value = actualPrefill.milestone;
        if (actualPrefill.date) document.getElementById('logEntryDate').value = actualPrefill.date;
        
        // Clear pending prefill once consumed
        this.pendingLogPrefill = null;
        
        // Initialize Quill editor - clear container completely first
        const editorContainer = document.getElementById('logEntryNotesEditor');
        editorContainer.innerHTML = ''; // Clear any existing content
        
        // Create a fresh div for Quill
        const quillDiv = document.createElement('div');
        editorContainer.appendChild(quillDiv);
        
        this.logQuill = new Quill(quillDiv, {
            theme: 'snow',
            placeholder: 'Describe your training session...',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                ]
            }
        });
        
        // Initialize voice recognition
        this.initVoiceRecognition();
        
        // Reset video upload
        this.currentVideoFile = null;
        document.getElementById('logEntryVideo').value = '';
        document.getElementById('logVideoPreview').style.display = 'none';
        document.getElementById('logVideoUploadBtn').textContent = '📹 Choose Video File';
        
        // Apply video if editing and has video
        if (actualPrefill.video) {
            this.displayVideoPreview(actualPrefill.video, true);
        }
        
        modal.style.display = 'flex';
        
        // Apply notes content and focus after Quill is fully initialized
        // Use Quill's proper content setting method and ensure it's fully ready
        const setContentWhenReady = () => {
            if (this.logQuill && this.logQuill.root) {
                try {
                    if (actualPrefill.notes) {
                        // Use Quill's setContents method with HTML content
                        this.logQuill.clipboard.dangerouslyPasteHTML(actualPrefill.notes);
                    }
                    this.logQuill.focus();
                } catch (error) {
                    console.warn('Failed to set Quill content, retrying...', error);
                    // If it fails, try again after a longer delay
                    setTimeout(setContentWhenReady, 200);
                }
            } else {
                // Quill not ready yet, try again
                setTimeout(setContentWhenReady, 100);
            }
        };
        
        // Give Quill a moment to initialize, then set content
        setTimeout(setContentWhenReady, 150);
    }
    
    setupNewLogModalEventListeners() {
        // Close modal
        const closeBtn = document.getElementById('closeNewLogModal');
        const cancelBtn = document.getElementById('cancelLogEntry');
        
        if (closeBtn && !closeBtn.hasAttribute('data-listener-added')) {
            closeBtn.addEventListener('click', () => this.closeNewLogModal());
            closeBtn.setAttribute('data-listener-added', 'true');
        }
        
        if (cancelBtn && !cancelBtn.hasAttribute('data-listener-added')) {
            cancelBtn.addEventListener('click', () => this.closeNewLogModal());
            cancelBtn.setAttribute('data-listener-added', 'true');
        }
        
        // Save button
        const saveBtn = document.getElementById('saveLogEntry');
        if (saveBtn && !saveBtn.hasAttribute('data-listener-added')) {
            saveBtn.addEventListener('click', () => this.saveNewLogEntry());
            saveBtn.setAttribute('data-listener-added', 'true');
        }
        
        // Video upload
        const videoUploadBtn = document.getElementById('logVideoUploadBtn');
        const videoInput = document.getElementById('logEntryVideo');
        const removeVideoBtn = document.getElementById('removeLogVideoBtn');
        
        if (videoUploadBtn && !videoUploadBtn.hasAttribute('data-listener-added')) {
            videoUploadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                videoInput.click();
            });
            videoUploadBtn.setAttribute('data-listener-added', 'true');
        }
        
        if (videoInput && !videoInput.hasAttribute('data-listener-added')) {
            videoInput.addEventListener('change', (e) => this.handleLogVideoUpload(e));
            videoInput.setAttribute('data-listener-added', 'true');
        }
        
        if (removeVideoBtn && !removeVideoBtn.hasAttribute('data-listener-added')) {
            removeVideoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.removeLogVideo();
            });
            removeVideoBtn.setAttribute('data-listener-added', 'true');
        }
        
        // Voice input button
        const voiceInputBtn = document.getElementById('voiceInputBtn');
        if (voiceInputBtn && !voiceInputBtn.hasAttribute('data-listener-added')) {
            voiceInputBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleVoiceRecording();
            });
            voiceInputBtn.setAttribute('data-listener-added', 'true');
        }
        
        // Close modal on outside click
        const modal = document.getElementById('newLogModal');
        if (modal && !modal.hasAttribute('data-listener-added')) {
            modal.addEventListener('click', (e) => {
                if (e.target.id === 'newLogModal') {
                    this.closeNewLogModal();
                }
            });
            modal.setAttribute('data-listener-added', 'true');
        }
    }
    
    handleLogVideoUpload(e) {
        const file = e.target.files[0];
        if (file) {
            // Store the file reference for later use
            this.currentVideoFile = file;
            document.getElementById('logVideoFileName').textContent = file.name;
            document.getElementById('logVideoPreview').style.display = 'block';
            document.getElementById('logVideoUploadBtn').textContent = '📹 Change Video File';
        }
    }
    
    removeLogVideo() {
        this.currentVideoFile = null;
        document.getElementById('logEntryVideo').value = '';
        document.getElementById('logVideoPreview').style.display = 'none';
        document.getElementById('logVideoUploadBtn').textContent = '📹 Choose Video File';
    }
    
    displayVideoPreview(videoData, isExisting = false) {
        if (videoData) {
            document.getElementById('logVideoFileName').textContent = videoData.name;
            document.getElementById('logVideoPreview').style.display = 'block';
            document.getElementById('logVideoUploadBtn').textContent = '📹 Change Video File';
        }
    }
    
    closeNewLogModal() {
        document.getElementById('newLogModal').style.display = 'none';
        if (this.logQuill) {
            this.logQuill = null;
        }
    }
    
    async saveNewLogEntry() {
        const date = document.getElementById('logEntryDate').value;
        const behavior = document.getElementById('logEntryBehavior').value;
        const milestone = document.getElementById('logEntryMilestone').value;
        const notes = this.logQuill.root.innerHTML;
        const videoInput = document.getElementById('logEntryVideo');
        
        // Validation
        if (!date || !behavior || !milestone || !notes.trim()) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }
        
        try {
            const logData = {
                date,
                trainingArea: behavior,
                ageRange: milestone,
                notes
            };
            
            // Handle video if uploaded
            if (this.currentVideoFile) {
                const videoFile = this.currentVideoFile;
                // Create a unique reference to this video file
                const videoReference = `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                
                // Store the file persistently in IndexedDB
                try {
                    await this.storeVideoFile(videoReference, videoFile, this.currentPuppyId);
                    console.log('Video stored persistently:', videoReference);
                } catch (error) {
                    console.error('Failed to store video persistently:', error);
                    this.showToast('Failed to store video file', 'warning');
                }
                
                logData.video = {
                    reference: videoReference,
                    name: videoFile.name,
                    size: videoFile.size,
                    type: videoFile.type,
                    lastModified: videoFile.lastModified
                };
            }
            
            if (this.editingLogId) {
                // Update existing log entry
                await window.storage.updateLogEntry(this.editingLogId, logData, this.currentPuppyId);
                this.showToast('Training log entry updated successfully', 'success');
            } else {
                // Create new log entry
                await window.storage.saveLogEntry(logData, this.currentPuppyId);
                this.showToast('Training log entry saved successfully', 'success');
            }
            
            // Clear editing state
            this.editingLogId = null;
            
            this.closeNewLogModal();
            
            // Refresh the logs view
            await this.loadAndDisplayLogs();
            
        } catch (error) {
            console.error('Failed to save log entry:', error);
            this.showToast('Failed to save log entry', 'error');
        }
    }
    
    async editLogEntry(logId) {
        try {
            // Get the log entry from storage
            const logEntry = await window.storage.getLogEntry(logId, this.currentPuppyId);
            if (!logEntry) {
                this.showToast('Log entry not found', 'error');
                return;
            }
            
            // Open the modal with existing data pre-filled
            this.showNewLogModal({
                behavior: logEntry.trainingArea,
                milestone: logEntry.ageRange,
                date: logEntry.date,
                notes: logEntry.notes,
                video: logEntry.video
            }, logId);
            
        } catch (error) {
            console.error('Failed to load log entry for editing:', error);
            this.showToast('Failed to load log entry for editing', 'error');
        }
    }
    
    async deleteLogEntry(logId) {
        if (!confirm('Are you sure you want to delete this log entry? This action cannot be undone.')) {
            return;
        }
        
        try {
            await window.storage.deleteLogEntry(logId, this.currentPuppyId);
            this.showToast('Log entry deleted successfully', 'success');
            
            // Refresh the logs view
            await this.loadAndDisplayLogs();
            
        } catch (error) {
            console.error('Failed to delete log entry:', error);
            this.showToast('Failed to delete log entry', 'error');
        }
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

    setVersionNumber() {
        const versionElement = document.getElementById('appVersion');
        if (versionElement) {
            versionElement.textContent = `v${this.APP_VERSION}`;
        }
    }

    // Initialize persistent video storage using IndexedDB
    async initVideoStorage() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('PrepTrackerVideos', 1);
            
            request.onerror = () => {
                console.error('Failed to open video database:', request.error);
                reject(request.error);
            };
            
            request.onsuccess = () => {
                this.videoDB = request.result;
                console.log('Video database initialized successfully');
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('videos')) {
                    const videoStore = db.createObjectStore('videos', { keyPath: 'reference' });
                    videoStore.createIndex('puppyId', 'puppyId', { unique: false });
                    videoStore.createIndex('timestamp', 'timestamp', { unique: false });
                    console.log('Video object store created');
                }
            };
        });
    }

    // Store video file persistently
    async storeVideoFile(videoReference, videoFile, puppyId) {
        return new Promise((resolve, reject) => {
            if (!this.videoDB) {
                reject(new Error('Video database not initialized'));
                return;
            }

            const transaction = this.videoDB.transaction(['videos'], 'readwrite');
            const store = transaction.objectStore('videos');
            
            const videoData = {
                reference: videoReference,
                file: videoFile,
                puppyId: puppyId,
                timestamp: Date.now(),
                name: videoFile.name,
                size: videoFile.size,
                type: videoFile.type,
                lastModified: videoFile.lastModified
            };
            
            const request = store.put(videoData);
            
            request.onsuccess = () => {
                console.log('Video stored successfully:', videoReference);
                resolve();
            };
            
            request.onerror = () => {
                console.error('Failed to store video:', request.error);
                reject(request.error);
            };
        });
    }

    // Retrieve video file by reference
    async getVideoFile(videoReference) {
        return new Promise((resolve, reject) => {
            if (!this.videoDB) {
                reject(new Error('Video database not initialized'));
                return;
            }

            const transaction = this.videoDB.transaction(['videos'], 'readonly');
            const store = transaction.objectStore('videos');
            const request = store.get(videoReference);
            
            request.onsuccess = () => {
                if (request.result) {
                    resolve(request.result.file);
                } else {
                    reject(new Error('Video not found'));
                }
            };
            
            request.onerror = () => {
                console.error('Failed to retrieve video:', request.error);
                reject(request.error);
            };
        });
    }

    // Delete video file by reference
    async deleteVideoFile(videoReference) {
        return new Promise((resolve, reject) => {
            if (!this.videoDB) {
                reject(new Error('Video database not initialized'));
                return;
            }

            const transaction = this.videoDB.transaction(['videos'], 'readwrite');
            const store = transaction.objectStore('videos');
            const request = store.delete(videoReference);
            
            request.onsuccess = () => {
                console.log('Video deleted successfully:', videoReference);
                resolve();
            };
            
            request.onerror = () => {
                console.error('Failed to delete video:', request.error);
                reject(request.error);
            };
        });
    }

    // Get all videos for a specific puppy
    async getVideosForPuppy(puppyId) {
        return new Promise((resolve, reject) => {
            if (!this.videoDB) {
                reject(new Error('Video database not initialized'));
                return;
            }

            const transaction = this.videoDB.transaction(['videos'], 'readonly');
            const store = transaction.objectStore('videos');
            const index = store.index('puppyId');
            const request = index.getAll(puppyId);
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = () => {
                console.error('Failed to get videos for puppy:', request.error);
                reject(request.error);
            };
        });
    }

    // Delete all videos for a specific puppy
    async deleteAllVideosForPuppy(puppyId) {
        try {
            const videos = await this.getVideosForPuppy(puppyId);
            const deletePromises = videos.map(video => this.deleteVideoFile(video.reference));
            await Promise.all(deletePromises);
            console.log(`Deleted ${videos.length} videos for puppy ${puppyId}`);
        } catch (error) {
            console.error('Failed to delete videos for puppy:', error);
        }
    }

    // Play video from stored file reference
    async playVideo(videoReference, fileName) {
        try {
            const videoFile = await this.getVideoFile(videoReference);
            const videoURL = URL.createObjectURL(videoFile);

        // Create video modal
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-content">
                <div class="video-modal-header">
                    <h3>${fileName}</h3>
                    <button class="close-video-btn">&times;</button>
                </div>
                <div class="video-container">
                    <video controls autoplay preload="metadata">
                        <source src="${videoURL}" type="${videoFile.type}">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .video-modal-content {
                background: white;
                border-radius: 8px;
                max-width: 90vw;
                max-height: 90vh;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
            .video-modal-header {
                padding: 1rem;
                background: var(--primary-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .video-modal-header h3 {
                margin: 0;
                font-size: 1.1rem;
                max-width: 80%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .close-video-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            .close-video-btn:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            .video-container {
                padding: 0;
            }
            .video-container video {
                width: 100%;
                height: auto;
                max-height: 70vh;
                display: block;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Add event listeners
        const closeBtn = modal.querySelector('.close-video-btn');
        const video = modal.querySelector('video');

        const closeModal = () => {
            video.pause();
            URL.revokeObjectURL(videoURL);
            modal.remove();
            style.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Handle escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

            // Show modal
            document.body.appendChild(modal);

            // Clean up URL when video ends
            video.addEventListener('ended', () => {
                setTimeout(() => {
                    URL.revokeObjectURL(videoURL);
                }, 1000);
            });
        } catch (error) {
            console.error('Failed to load video:', error);
            this.showToast('Video file not found or failed to load', 'error');
        }
    }

    async getChangelog() {
        try {
            const response = await fetch('/changelog.json');
            if (!response.ok) {
                throw new Error('Failed to fetch changelog');
            }
            const changelog = await response.json();
            return changelog[this.APP_VERSION];
        } catch (error) {
            console.error('Failed to get changelog:', error);
            return null;
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PREPTrackerApp();
});