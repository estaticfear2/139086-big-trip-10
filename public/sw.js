const CACHE_PREFIX = `big-trip-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          `/`,
          `/index.html`,
          `/bundle.js`,
          `/css/style.css`,
          `/fonts/montserrat-bold.woff2`,
          `/fonts/montserrat-extrabold.woff2`,
          `/fonts/montserrat-medium.woff2`,
          `/fonts/montserrat-regular.woff2`,
          `/fonts/montserrat-semibold.woff2`,
          `/img/header-bg.png`,
          `/img/header-bg@2x.png`,
          `/img/logo.png`,
          `/img/icons/bus.png`,
          `/img/icons/check-in.png`,
          `/img/icons/drive.png`,
          `/img/icons/flight.png`,
          `/img/icons/restaurant.png`,
          `/img/icons/ship.png`,
          `/img/icons/sightseeing.png`,
          `/img/icons/taxi.png`,
          `/img/icons/train.png`,
          `/img/icons/transport.png`,
          `/img/icons/trip.png`          
        ]);
      })
  );
});

//self.addEventListener(`activate`, (evt) => {
//  evt.waitUntil(
//    caches.keys()
//      .then((keys) => Promise.all(
//        keys.map((key) => {
//          if (key.indexOf(CACHE_PREFIX) === 0 && key === CACHE_NAME) {
//            return caches.delete(key);
//          }
//          
//          return null;
//        })
//        .filter((key) => key !== null)
//      ))
//  );
//});

const fetchHandler = (evt) => {
  const {request} = evt;
  
  evt.respondWith(
    caches.match(request)
      .then((cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse;
        }
        
        return fetch(request)
          .then((response) => {
            return response;
          });
      })
  );
};

self.addEventListener(`fetch`, fetchHandler);