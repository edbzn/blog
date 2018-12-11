// Every time code is changed we need to update this string to reinstall the service worker.
var PRECACHE = "precache-v2";
var RUNTIME = "runtime";

// A list of resources we always want to be cached.
var PRECACHE_URLS = [
  "index.html",
  "./", // Alias for index.html
  "assets/css/bulma.min.css",
  "assets/css/atom.css",
  "assets/images/portrait.jpg",
  "bundle.js",
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting()),
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", event => {
  var currentCaches = [PRECACHE, RUNTIME];

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        cacheNames.filter(cacheName => !currentCaches.includes(cacheName)),
      )
      .then(cachesToDelete =>
        Promise.all(
          cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener("fetch", event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache =>
          fetch(event.request).then(response =>
            // Put a copy of the response in the runtime cache.
            cache.put(event.request, response.clone()).then(() => response),
          ),
        );
      }),
    );
  }
});
