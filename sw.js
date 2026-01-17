// Improved Service Worker - v1.0
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

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((err) => {
        console.warn('sw install: cache addAll failed', err);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.map(name => {
        if (name !== CACHE_NAME) return caches.delete(name);
      }))
    )
  );
  self.clients.claim();
});

function isSameOrigin(request) {
  try {
    return new URL(request.url).origin === self.location.origin;
  } catch (e) {
    return false;
  }
}

self.addEventListener('fetch', (event) => {
  // Only handle GET
  if (event.request.method !== 'GET') return;

  // Navigation requests: network-first, fallback to cached index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Optionally update cached index.html for offline fallback
          if (networkResponse && networkResponse.ok) {
            const clone = networkResponse.clone();
            event.waitUntil(
              caches.open(CACHE_NAME).then(cache => cache.put('/index.html', clone)).catch(()=>{})
            );
          }
          return networkResponse;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Other GET requests: cache-first, then network; only cache same-origin successful responses
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(networkResponse => {
        if (!networkResponse) return networkResponse;

        // Cache only same-origin and successful responses (or opaque if desired)
        if ((networkResponse.ok || networkResponse.type === 'opaque') && isSameOrigin(event.request)) {
          const copy = networkResponse.clone();
          event.waitUntil(
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(()=>{})
          );
        }
        return networkResponse;
      }).catch(() => {
        // On failure, provide an offline fallback
        return caches.match('/index.html');
      });
    })
  );
});