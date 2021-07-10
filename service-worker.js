var CACHE = 'network-or-cache';

self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.');

    evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
        return fromCache(evt.request);
    }));
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/assets/css/maincss`,
        `/assets/js/main.js`,
        'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js'
      ]);
    });
  }

  function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {

        var timeoutId = setTimeout(reject, timeout);

        fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            fulfill(response);

        }, reject);
    });
  }

  function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
      return cache.match(request).then(function (matching) {
        return matching || Promise.reject('no-match');
      });
    });
  }
