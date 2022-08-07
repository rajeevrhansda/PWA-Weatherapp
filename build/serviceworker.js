const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

//  this means itself
const self = this;

//Install SW

// self means to itself the serviceworker
self.addEventListener("install", (event) => {
  //opne cache
  //add files to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

//Listen for request
self.addEventListener("fetch", (event) => {
  //what happen to request after we listen for them
  //event. when we notice a  fetch request
  event.respondWith(
    // any request api,image ect
    caches.match(event.request).then(() => {
      //fetch again for fresh data
      return (
        fetch(event.request)
          // if error or no internet
          .catch(() => caches.match("offline.html"))
      );
    })
  );
});

//Activate the SW
self.addEventListener("activate", (event) => {
  //create new cache and remove old one
  const cacheWhitelist = [];
  //all the things we want to keep
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        //loop through all cacheNames
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
