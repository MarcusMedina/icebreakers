/* Icebreakers service worker.
   Strategi: förcacha appskalet vid installation, svara cache-först, uppdatera i bakgrunden.
   Höj VERSION vid varje ändring av filerna nedan så att gamla cachar rensas.
   Kontrollera listan med: node tools/check-locales.js */
const VERSION = 'icebreakers-v2';
const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/style.css',
  'js/i18n.js',
  'js/cards.js',
  'js/app.js',
  'js/sw-register.js',
  'i18n/sv.js',
  'i18n/en.js',
  'fonts/figtree-latin-500-normal.woff2',
  'fonts/figtree-latin-700-normal.woff2',
  'fonts/lilita-one-latin-400-normal.woff2',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      const refresh = fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      if (hit) { e.waitUntil(refresh); return hit; }
      return refresh.then(res => res || (req.mode === 'navigate' ? caches.match('index.html') : Response.error()));
    })
  );
});
