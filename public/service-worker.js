const appVersion = "2.0.0";
const cacheName = `anniversary-${appVersion}`;

// Delete old cache data
self.addEventListener("activate", async function (e) {
  const cache = await caches.open(cacheName);
  const cacheKeys = await cache.keys();
  for (const key of cacheKeys) {
    await cache.delete(key);
  }
});
