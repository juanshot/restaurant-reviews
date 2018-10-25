const cacheName = 'restaurant-reviews';
//on install envent
self.addEventListener('install', (e) => {
  console.log('caching files');
  e.waitUntil(
    caches.open('cacheName').then((cache) => {
        return cache.addAll([
            '/',
            '/css/styles-large.css',
            '/css/styles-medium.css',
            '/css/styles-small.css',
            '/css/styles.css',
            '/css/restaurant/styles-large.css',
            '/css/restaurant/styles-medium.css',
            '/css/restaurant/styles-small.css',
            '/data/restaurants.json',
            '/img/1.jpg',
            '/img/2.jpg',
            '/img/3.jpg',
            '/img/4.jpg',
            '/img/5.jpg',
            '/img/7.jpg',
            '/img/8.jpg','/img/6.jpg',
            '/img/9.jpg',
            '/img/10.jpg',
        ])
    })
  );
});
// requesting data from cache
self.addEventListener('fetch', (ev) => {
    ev.respondWith(
      caches.match(ev.request)
        .then((response) => {
          if (response) {
          return response;
          }
          let fetchRequest = ev.request.clone();
          return fetch(fetchRequest).then(
              (response) => {
              if(!response || response.status !== 200) {
                return response;
              }
              let cacheResponse = response.clone();
              caches.open(cacheName)
                .then( (cache) => {
                  cache.put(ev.request, cacheResponse);
                });
              return response;
            }
          );
        })
      );
  });

// Removes cache after activating
self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => {
          return name != cacheName;
        }).map((name) => {
          return caches.delete(name);
        })
      );
    })
  );
});