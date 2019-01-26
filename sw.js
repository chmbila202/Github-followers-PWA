var cacheName = 'pwa-cashe_02';
var dynamiccashe = 'pwa-data-cashe_01';
var filesToCache = [
  '/css/style.css',
  '/js/index.js',
  '/index.html',

  '/',
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('Services Worker Activated');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  console.log('Fetch Services', e.request.url);
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then(function (response) {
        return response || fetch(req);
      })
    );
  } else {
    e.respondWith(firstCheckNetwork(e.request));
  }

});

async function firstCheckNetwork(req) {
  const cache = await caches.open(dynamiccashe);
  try {

    const result = await fetch(req);
    cache.put(req, result.clone());
    return result;
  } catch (error) {
    return await caches.match(req);

  }
}


