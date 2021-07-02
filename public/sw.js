const staticFilesCache = 'static-cache-v1'
const dynamicFilesCache = 'dynamic-cache-v1'

const staticAssets = [
    './fallback.html',
    './fallback.css',
    'https://mapital-backend.herokuapp.com/api/v1/map-lg.png'
]

const deleteCacheAfter = (removalDate = 15) => {
    if(new Date().getDate() === removalDate || new Date().getDate() === removalDate * 2) {
        return true
    }
    return false
}

const limitCacheSize = (name, size = 15) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size && deleteCacheAfter()) {
                cache.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
}

// INSTALL SERVICE WORKER
self.addEventListener('install', e => {
    console.log('Service worker installed')
    e.waitUntil(
        caches.open(staticFilesCache)
            .then(cache => {
                console.log('Caching assets...')
                cache.addAll(staticAssets)
            })
    )
})

// CACHE VERSIONING // HARD CODED
// SERVICE WORKER ACTIVATE EVENT
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticFilesCache && key !== dynamicFilesCache)
                .map(key => caches.delete(key))
            )
        })
    )
})

// SERVICE WORKER FETCH EVENT
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(cachedRes => {
                return cachedRes || fetch(e.request)
                    .then(fetchRes => {
                        return caches.open(dynamicFilesCache)
                            .then(cache => {
                                limitCacheSize(dynamicFilesCache)
                                cache.put(e.request.url, fetchRes.clone())
                                return fetchRes
                            })
                    }).catch(() => caches.match('/fallback.html'))
            })
    )
})