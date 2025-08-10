class StorageService {
    constructor() {
        this.dbName = 'PREPTracker';
        this.dbVersion = 1;
        this.db = null;
        this.isIndexedDBAvailable = this.checkIndexedDBSupport();
        
        this.stores = {
            profile: 'puppyProfile',
            progress: 'trainingProgress',
            activities: 'trainingActivities',
            documents: 'supportingDocuments'
        };
    }

    checkIndexedDBSupport() {
        return 'indexedDB' in window && 
               'IDBTransaction' in window && 
               'IDBKeyRange' in window;
    }

    async init() {
        if (!this.isIndexedDBAvailable) {
            console.warn('IndexedDB not available, using localStorage fallback');
            return this.initLocalStorageFallback();
        }

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => {
                console.error('IndexedDB failed to open, falling back to localStorage');
                this.isIndexedDBAvailable = false;
                this.initLocalStorageFallback().then(resolve).catch(reject);
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('IndexedDB initialized successfully');
                resolve(true);
            };
            
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                this.createObjectStores();
            };
        });
    }

    createObjectStores() {
        // Puppy Profile store
        if (!this.db.objectStoreNames.contains(this.stores.profile)) {
            const profileStore = this.db.createObjectStore(this.stores.profile, {
                keyPath: 'id'
            });
            profileStore.createIndex('name', 'name', { unique: false });
        }

        // Training Progress store
        if (!this.db.objectStoreNames.contains(this.stores.progress)) {
            const progressStore = this.db.createObjectStore(this.stores.progress, {
                keyPath: 'id'
            });
            progressStore.createIndex('trainingArea', 'trainingArea', { unique: false });
            progressStore.createIndex('ageRange', 'ageRange', { unique: false });
        }

        // Training Activities store
        if (!this.db.objectStoreNames.contains(this.stores.activities)) {
            const activitiesStore = this.db.createObjectStore(this.stores.activities, {
                keyPath: 'id'
            });
            activitiesStore.createIndex('trainingArea', 'trainingArea', { unique: false });
            activitiesStore.createIndex('date', 'date', { unique: false });
        }

        // Supporting Documents store
        if (!this.db.objectStoreNames.contains(this.stores.documents)) {
            const documentsStore = this.db.createObjectStore(this.stores.documents, {
                keyPath: 'id'
            });
            documentsStore.createIndex('documentType', 'documentType', { unique: false });
        }
    }

    initLocalStorageFallback() {
        console.log('Using localStorage fallback mode');
        if (!localStorage.getItem('PREPTracker_initialized')) {
            localStorage.setItem('PREPTracker_initialized', 'true');
            localStorage.setItem('PREPTracker_profile', JSON.stringify([]));
            localStorage.setItem('PREPTracker_progress', JSON.stringify([]));
            localStorage.setItem('PREPTracker_activities', JSON.stringify([]));
            localStorage.setItem('PREPTracker_documents', JSON.stringify([]));
        }
        return Promise.resolve(true);
    }

    async saveProfile(profileData) {
        const profile = {
            id: 'main',
            ...profileData,
            updatedAt: new Date().toISOString()
        };

        if (this.isIndexedDBAvailable && this.db) {
            return this.saveToIndexedDB(this.stores.profile, profile);
        } else {
            return this.saveToLocalStorage(this.stores.profile, profile);
        }
    }

    async getProfile() {
        if (this.isIndexedDBAvailable && this.db) {
            return this.getFromIndexedDB(this.stores.profile, 'main');
        } else {
            return this.getFromLocalStorage(this.stores.profile, 'main');
        }
    }

    async saveProgress(trainingArea, ageRange, progressData) {
        const progressId = `${trainingArea}_${ageRange}`;
        const progress = {
            id: progressId,
            trainingArea,
            ageRange,
            ...(typeof progressData === 'object' ? progressData : { status: progressData }),
            updatedAt: new Date().toISOString()
        };

        if (this.isIndexedDBAvailable && this.db) {
            return this.saveToIndexedDB(this.stores.progress, progress);
        } else {
            return this.saveToLocalStorage(this.stores.progress, progress);
        }
    }

    async getProgress(trainingArea, ageRange) {
        const progressId = `${trainingArea}_${ageRange}`;
        
        if (this.isIndexedDBAvailable && this.db) {
            return this.getFromIndexedDB(this.stores.progress, progressId);
        } else {
            return this.getFromLocalStorage(this.stores.progress, progressId);
        }
    }

    async getAllProgress() {
        if (this.isIndexedDBAvailable && this.db) {
            return this.getAllFromIndexedDB(this.stores.progress);
        } else {
            return this.getAllFromLocalStorage(this.stores.progress);
        }
    }

    async saveActivity(activityData) {
        const activity = {
            id: Date.now().toString(),
            ...activityData,
            createdAt: new Date().toISOString()
        };

        if (this.isIndexedDBAvailable && this.db) {
            return this.saveToIndexedDB(this.stores.activities, activity);
        } else {
            return this.saveToLocalStorage(this.stores.activities, activity);
        }
    }

    async getActivities(trainingArea, ageRange) {
        if (this.isIndexedDBAvailable && this.db) {
            return this.getActivitiesFromIndexedDB(trainingArea, ageRange);
        } else {
            return this.getActivitiesFromLocalStorage(trainingArea, ageRange);
        }
    }
    
    async getAllActivities() {
        if (this.isIndexedDBAvailable && this.db) {
            return this.getAllFromIndexedDB(this.stores.activities);
        } else {
            return this.getAllFromLocalStorage(this.stores.activities);
        }
    }

    async saveDocumentProgress(documentType, progressData) {
        const document = {
            id: documentType,
            documentType,
            ...(typeof progressData === 'object' ? progressData : { status: progressData }),
            updatedAt: new Date().toISOString()
        };

        if (this.isIndexedDBAvailable && this.db) {
            return this.saveToIndexedDB(this.stores.documents, document);
        } else {
            return this.saveToLocalStorage(this.stores.documents, document);
        }
    }

    async getDocumentProgress(documentType) {
        if (this.isIndexedDBAvailable && this.db) {
            return this.getFromIndexedDB(this.stores.documents, documentType);
        } else {
            return this.getFromLocalStorage(this.stores.documents, documentType);
        }
    }

    // IndexedDB Operations
    async saveToIndexedDB(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(data);
            request.onerror = () => reject(new Error(`Failed to save to ${storeName}`));
        });
    }

    async getFromIndexedDB(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(new Error(`Failed to get from ${storeName}`));
        });
    }

    async getAllFromIndexedDB(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(new Error(`Failed to get all from ${storeName}`));
        });
    }

    async getActivitiesFromIndexedDB(trainingArea, ageRange) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.stores.activities], 'readonly');
            const store = transaction.objectStore(this.stores.activities);
            const request = store.getAll();

            request.onsuccess = () => {
                const activities = request.result || [];
                const filtered = activities.filter(activity => 
                    activity.trainingArea === trainingArea && 
                    activity.ageRange === ageRange
                );
                resolve(filtered.sort((a, b) => new Date(b.date) - new Date(a.date)));
            };
            request.onerror = () => reject(new Error('Failed to get activities'));
        });
    }

    // LocalStorage Operations
    saveToLocalStorage(storeName, data) {
        try {
            const key = `PREPTracker_${storeName}`;
            const existingData = JSON.parse(localStorage.getItem(key) || '[]');
            
            const index = existingData.findIndex(item => item.id === data.id);
            if (index >= 0) {
                existingData[index] = data;
            } else {
                existingData.push(data);
            }
            
            localStorage.setItem(key, JSON.stringify(existingData));
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(new Error(`LocalStorage save failed: ${error.message}`));
        }
    }

    getFromLocalStorage(storeName, id) {
        try {
            const key = `PREPTracker_${storeName}`;
            const data = JSON.parse(localStorage.getItem(key) || '[]');
            const item = data.find(item => item.id === id);
            return Promise.resolve(item);
        } catch (error) {
            return Promise.reject(new Error(`LocalStorage get failed: ${error.message}`));
        }
    }

    getAllFromLocalStorage(storeName) {
        try {
            const key = `PREPTracker_${storeName}`;
            const data = JSON.parse(localStorage.getItem(key) || '[]');
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(new Error(`LocalStorage getAll failed: ${error.message}`));
        }
    }

    getActivitiesFromLocalStorage(trainingArea, ageRange) {
        try {
            const key = `PREPTracker_${this.stores.activities}`;
            const activities = JSON.parse(localStorage.getItem(key) || '[]');
            const filtered = activities.filter(activity => 
                activity.trainingArea === trainingArea && 
                activity.ageRange === ageRange
            );
            return Promise.resolve(filtered.sort((a, b) => new Date(b.date) - new Date(a.date)));
        } catch (error) {
            return Promise.reject(new Error(`LocalStorage activities get failed: ${error.message}`));
        }
    }

    // Backup and Restore
    async exportData() {
        try {
            const exportData = {
                version: this.dbVersion,
                timestamp: new Date().toISOString(),
                data: {}
            };

            if (this.isIndexedDBAvailable && this.db) {
                for (const [key, storeName] of Object.entries(this.stores)) {
                    exportData.data[key] = await this.getAllFromIndexedDB(storeName);
                }
            } else {
                for (const [key, storeName] of Object.entries(this.stores)) {
                    exportData.data[key] = await this.getAllFromLocalStorage(storeName);
                }
            }

            return exportData;
        } catch (error) {
            throw new Error(`Export failed: ${error.message}`);
        }
    }

    async importData(importData) {
        try {
            if (!importData.data || !importData.version) {
                throw new Error('Invalid backup file format');
            }

            for (const [key, storeName] of Object.entries(this.stores)) {
                const storeData = importData.data[key] || [];
                
                if (this.isIndexedDBAvailable && this.db) {
                    // Clear existing data
                    await this.clearIndexedDBStore(storeName);
                    
                    // Import new data
                    for (const item of storeData) {
                        await this.saveToIndexedDB(storeName, item);
                    }
                } else {
                    // Clear and import for localStorage
                    const key = `PREPTracker_${storeName}`;
                    localStorage.setItem(key, JSON.stringify(storeData));
                }
            }

            return true;
        } catch (error) {
            throw new Error(`Import failed: ${error.message}`);
        }
    }

    async clearIndexedDBStore(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(new Error(`Failed to clear ${storeName}`));
        });
    }

    async clearAllData() {
        try {
            if (this.isIndexedDBAvailable && this.db) {
                for (const storeName of Object.values(this.stores)) {
                    await this.clearIndexedDBStore(storeName);
                }
            } else {
                for (const storeName of Object.values(this.stores)) {
                    const key = `PREPTracker_${storeName}`;
                    localStorage.removeItem(key);
                }
            }
            return true;
        } catch (error) {
            throw new Error(`Clear data failed: ${error.message}`);
        }
    }

    // Utility methods
    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        const ageMs = today - birth;
        const ageWeeks = Math.floor(ageMs / (1000 * 60 * 60 * 24 * 7));
        
        if (ageWeeks < 16) return '12weeks';
        if (ageWeeks < 24) return 'juvenile';
        if (ageWeeks < 40) return 'adolescent';
        return '12months';
    }

    formatAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        const ageMs = today - birth;
        const ageWeeks = Math.floor(ageMs / (1000 * 60 * 60 * 24 * 7));
        const ageMonths = Math.floor(ageWeeks / 4);
        
        if (ageWeeks < 8) return `${ageWeeks} weeks old`;
        if (ageMonths < 12) return `${ageMonths} months old`;
        return `${Math.floor(ageMonths / 12)} years, ${ageMonths % 12} months old`;
    }
}

// Global storage instance
window.storage = new StorageService();