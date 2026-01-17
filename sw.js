// Service Worker - v1.0
const CACHE_NAME = 'tag-game-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/appmanifest.json',
  '/scripts/main.js',
  '/scripts/supportcheck.js',
  '/scripts/offlineclient.js',
  '/scripts/register-sw.js',
  '/scripts/c3runtime.js',
  '/js/analytics_ubg_v1_4.js',
  '/js/ubg235_client_v1_2.js',
  '/patch/js/poki-sdk.js',
  '/icons/icon-128.svg',
  '/icons/icon-256.svg',
  '/icons/icon-512.svg'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache).catch((error) => {
          console.warn('Cache addAll error:', error);
          // Don't fail on cache errors
        });
      })
      .catch((error) => {
        console.warn('Cache open error:', error);
      })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type === 'error') {
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
      .catch(() => {
        // Return offline page or cached response
        return caches.match('/index.html');
      })
  );
});
