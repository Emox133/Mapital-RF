const staticFilesCache = 'static-cache-v1'
const dynamicFilesCache = 'dynamic-cache-v1'

const staticAssets = [
    // 'http://localhost:3000/static/js/vendors~main.chunk.js'
    // './index.html'
    // './fallback.html',
    // './fallback.css',
    'https://mapital-backend.herokuapp.com/api/v1/circles',
    'https://mapital-backend.herokuapp.com/api/v1/markers'

]

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
                                cache.put(e.request.url, fetchRes.clone())
                                return fetchRes
                            })
                    })
            })
    )
})