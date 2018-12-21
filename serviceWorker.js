const cacheName = 'Aguarela v1',
    filesToCache = [
        '/',
        '/index.html',
        '/about.html',
        '/portfolio.html',
        '/services.html',
        '/css/main.css',
        '/css/fonts/Lato-Regular.ttf',
        '/css/fonts/Lato-Italic.ttf',
        '/css/fonts/Lato-Bold.ttf',
        '/scripts/script.js',
        '/scripts/libs/flickity.min.js',
        '/images/system/favicon-16x16.png',
        '/images/system/favicon-32x32.png',
        '/images/system/logoAguarela.png',
        '/images/system/logoAguarela.svg',
        '/images/aAmigaEsteticistaLogo.jpg',
        '/images/anuncioExterior.jpg',
        '/images/batisteAntes.jpg',
        '/images/batisteDepois.jpg',
        '/images/cartaoContacto.jpg',
        '/images/cartazMuseu.jpg',
        '/images/destaqueIG.jpg',
        '/images/destaqueIG2.jpg',
        '/images/destaqueIG3.jpg',
        '/images/destaqueIG4.jpg',
        '/images/doc.png',
        '/images/files.png',
        '/images/flyerAbertura.jpg',
        '/images/iceCreamRollAntes.jpg',
        '/images/iceCreamRollDepois.jpg',
        '/images/iceCreamRollLogo.jpg',
        '/images/instagram.png',
        '/images/kaffeehausAntes.jpg',
        '/images/kaffeehausDepois.jpg',
        '/images/kaffeehausLogo.png',
        '/images/light.png',
        '/images/museu.jpg',
        '/images/paginaPublicitariaTimeOut.jpg',
        '/images/passatempo.jpg',
        '/images/passatempo2.jpg',
        '/images/pencil.png',
        '/images/postal.jpg',
        '/images/postal2.jpg',
        '/images/poster.jpg',
        '/images/precario.jpg',
        '/images/profile.png'
    ];

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(cacheName).then(cache => cache.addAll(filesToCache))
    );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(oldCache => {
        if (oldCache !== cacheName) {
          return caches.delete(oldCache);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});