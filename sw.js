//Stores the Service Worker cache and
//offline capabilities

var MyCache ='wittr-static-v5';

//Install Event Listener with promise 
self.addEventListener('install', function(event){
 event.waitUntil(
     caches.open(MyCache).then(function(cache){
         // cache all pages
         return cache.addAll([
           '/',
           '/css',
           '/data',
           '/img',
           '/js',
           '/index.html',
           '/restaurant.html',


         ])
         
     })

 );


});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					return cacheName.startsWith('wittr-') &&
                    cacheName != MyCache;
				})
				.map(function (cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});


self.addEventListener('fetch', function(event) {

    console.log(event.request.url);
    
    event.respondWith(
    
    caches.match(event.request).then(function(response) {
    
    return response || fetch(event.request);
    
    })
    
    );
    
    });