const APP_VERSION = '1.0.7';
const CACHE_NAME = `prep-tracker-v${APP_VERSION}`;
const DB_NAME = 'PREPTracker';
const VERSION_STORAGE_KEY = 'prep_tracker_version';

const CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles/main.css',
  '/js/storage.js',
  '/js/app.js',
  '/icon-192.png',
  '/icon-512.png'
];

// Install event - cache resources and handle version checking
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Caching app resources');
          return cache.addAll(CACHE_URLS);
        })
        .catch((error) => {
          console.log('Cache installation failed:', error);
        }),
      checkAndHandleVersionChange()
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch((error) => {
        console.log('Fetch failed:', error);
        // Return offline page or fallback
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// Background sync for data backup
self.addEventListener('sync', (event) => {
  if (event.tag === 'backup-data') {
    event.waitUntil(performBackgroundSync());
  }
});

async function performBackgroundSync() {
  console.log('Performing background data sync');
  // Implement background sync logic if needed
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey || '1'
      },
      actions: [
        {
          action: 'explore',
          title: 'View Progress',
          icon: '/icon-192.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icon-192.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Install prompt handling
self.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
});

// Handle messages from the main app
self.addEventListener('message', (event) => {
  console.log('Service worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Service worker skipping waiting...');
    self.skipWaiting();
  }
});

// Version management functions
async function checkAndHandleVersionChange() {
  try {
    const storedVersion = await getStoredVersion();
    console.log('Current app version:', APP_VERSION);
    console.log('Stored version:', storedVersion);
    
    if (!storedVersion || storedVersion !== APP_VERSION) {
      console.log('Version change detected, recreating IndexedDB database...');
      await recreateIndexedDB();
      await setStoredVersion(APP_VERSION);
      console.log('Database recreated for version:', APP_VERSION);
    } else {
      console.log('Version unchanged, no database recreation needed');
    }
  } catch (error) {
    console.error('Version check failed:', error);
  }
}

async function getStoredVersion() {
  return new Promise((resolve) => {
    const request = indexedDB.open('__version_check__', 1);
    
    request.onerror = () => resolve(null);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('version')) {
        db.close();
        resolve(null);
        return;
      }
      
      const transaction = db.transaction(['version'], 'readonly');
      const store = transaction.objectStore('version');
      const getRequest = store.get(VERSION_STORAGE_KEY);
      
      getRequest.onsuccess = () => {
        db.close();
        resolve(getRequest.result?.version || null);
      };
      
      getRequest.onerror = () => {
        db.close();
        resolve(null);
      };
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('version')) {
        db.createObjectStore('version', { keyPath: 'key' });
      }
    };
  });
}

async function setStoredVersion(version) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('__version_check__', 1);
    
    request.onerror = () => reject(new Error('Failed to open version database'));
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['version'], 'readwrite');
      const store = transaction.objectStore('version');
      
      const putRequest = store.put({
        key: VERSION_STORAGE_KEY,
        version: version,
        timestamp: new Date().toISOString()
      });
      
      putRequest.onsuccess = () => {
        db.close();
        resolve();
      };
      
      putRequest.onerror = () => {
        db.close();
        reject(new Error('Failed to store version'));
      };
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('version')) {
        db.createObjectStore('version', { keyPath: 'key' });
      }
    };
  });
}

async function recreateIndexedDB() {
  return new Promise((resolve, reject) => {
    // Delete the existing database
    const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
    
    deleteRequest.onerror = () => {
      console.error('Failed to delete existing database');
      reject(new Error('Database deletion failed'));
    };
    
    deleteRequest.onsuccess = () => {
      console.log('Existing database deleted successfully');
      
      // Create a new empty database
      const openRequest = indexedDB.open(DB_NAME, 1);
      
      openRequest.onerror = () => {
        reject(new Error('Failed to create new database'));
      };
      
      openRequest.onsuccess = (event) => {
        const db = event.target.result;
        db.close();
        console.log('New empty database created');
        resolve();
      };
      
      openRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Recreate all object stores as defined in storage.js
        const stores = {
          puppyProfile: 'puppyProfile',
          trainingProgress: 'trainingProgress',
          trainingActivities: 'trainingActivities',
          supportingDocuments: 'supportingDocuments'
        };
        
        // Puppy Profile store
        if (!db.objectStoreNames.contains(stores.puppyProfile)) {
          const profileStore = db.createObjectStore(stores.puppyProfile, {
            keyPath: 'id'
          });
          profileStore.createIndex('name', 'name', { unique: false });
        }

        // Training Progress store
        if (!db.objectStoreNames.contains(stores.trainingProgress)) {
          const progressStore = db.createObjectStore(stores.trainingProgress, {
            keyPath: 'id'
          });
          progressStore.createIndex('trainingArea', 'trainingArea', { unique: false });
          progressStore.createIndex('ageRange', 'ageRange', { unique: false });
        }

        // Training Activities store
        if (!db.objectStoreNames.contains(stores.trainingActivities)) {
          const activitiesStore = db.createObjectStore(stores.trainingActivities, {
            keyPath: 'id'
          });
          activitiesStore.createIndex('trainingArea', 'trainingArea', { unique: false });
          activitiesStore.createIndex('date', 'date', { unique: false });
        }

        // Supporting Documents store
        if (!db.objectStoreNames.contains(stores.supportingDocuments)) {
          const documentsStore = db.createObjectStore(stores.supportingDocuments, {
            keyPath: 'id'
          });
          documentsStore.createIndex('documentType', 'documentType', { unique: false });
        }
        
        console.log('Database schema recreated with all object stores');
      };
    };
    
    deleteRequest.onblocked = () => {
      console.warn('Database deletion blocked - there may be open connections');
      // Try to proceed anyway
      setTimeout(() => resolve(), 1000);
    };
  });
}