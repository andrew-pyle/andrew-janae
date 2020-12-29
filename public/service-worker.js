const appVersion = "2.0.0";
const cacheName = `anniversary-${appVersion}`;

// Cache all resources requested by `/`. Trick to cache all resources for
// offline-first
const appShell = ["/"];

/**
 * Caches the App Shell
 * @param {string} cacheName name of this version's cache
 * @param {string[]} appShell list of app static resources
 * @returns {Promise<void>}
 */
async function cacheAppShell(cacheName, appShell) {
  const cache = await caches.open(cacheName);
  return await cache.addAll(appShell);
}

/**
 * Deletes all service worker caches for this domain except the one passed
 * as parameter `currentCacheName`
 * @param {string} currentCacheName name of old service worker caches for this domain
 * @param {Promise<void>}
 */
async function clearOldCaches(currentCacheName) {
  const cacheNames = await caches.keys();
  const nonCurrentCacheNames = cacheNames.filter(
    (name) => name !== currentCacheName
  );
  return Promise.all(nonCurrentCacheNames.map((name) => caches.delete(name)));
}

/**
 * Serve offline-first, but get a resource from the network if no match is found
 * in the cache
 * @param {Request} request request for resource
 * @returns {Promise<Response>}
 */
async function fetchFromCacheWithNetworkFallback(request) {
  const response = await caches.match(request);
  return response || fetch(request);
}

// New Service Worker is installed
self.addEventListener("install", (event) => {
  event.waitUntil(cacheAppShell(cacheName, appShell));
});

// New Service Worker take over control
self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches(cacheName));
});

// Serve resources offline-first, but serve from the network if there is no
// cache match
self.addEventListener("fetch", (event) => {
  event.respondWith(fetchFromCacheWithNetworkFallback(event.request));
});
