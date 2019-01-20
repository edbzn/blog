// Every time code is changed we need to update this string to reinstall the service worker.
var PRECACHE = "precache-v3";
var APICACHE = "apicache-v1";
var RUNTIME = "runtime";

// A list of resources we always want to be cached.
var PRECACHE_URLS = [
  "index.html",
  "./", // Alias for index.html
  "assets/css/bulma.min.css",
  "assets/css/atom.css",
  "assets/images/portrait.jpg",
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
  var currentCaches = [PRECACHE, RUNTIME, APICACHE];

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

// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener("fetch", event => {
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

// Always go to the network & update a cache as we go
self.addEventListener("fetch", function(event) {
  if (event.request.url.startsWith("https://api.codamit.com/") && event.request.method === 'GET') {
    event.respondWith(
      caches.open(APICACHE).then(function(cache) {
        return fetch(event.request, { mode: "cors" }).then(
          function(response) {
            cache.put(event.request, response.clone());

            return response;
          },
        );
      }),
    );
  }
});
