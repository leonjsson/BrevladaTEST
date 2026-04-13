const CACHE = 'brevlada-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'Brevlådan', body: 'Du har fått post!' };
  e.waitUntil(
    self.registration.showNotification(data.title || 'Brevlådan', {
      body: data.body || 'Du har fått post!',
      icon: '/icon.svg',
      badge: '/icon.svg',
      vibrate: [200, 100, 200]
    })
  );
});
