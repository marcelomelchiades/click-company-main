var VERSION = '22';

const urlToChache = [
	'/static/js/bundle.js',
	'/static/js/main.chunk.js',
	'/static/js/1.chunk.js',
	'/static/js/0.chunk.js',
	'/favicon.ico',
];

this.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open(VERSION).then(cache => {
			return cache.addAll(urlToChache);
		}),
	);
});
this.addEventListener('fetch', function (e) {
	var tryInCachesFirst = caches.open(VERSION).then(cache => {
		return cache.match(e.request).then(response => {
			if (!response) {
				return handleNoCacheMatch(e);
			}
			fetchFromNetworkAndCache(e);
			return response;
		});
	});
	e.respondWith(tryInCachesFirst);
});
this.addEventListener('activate', function (e) {
	e.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(
				keys.map(key => {
					if (key !== VERSION) return caches.delete(key);
				}),
			);
		}),
	);
});

function fetchFromNetworkAndCache(e) {
	if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin')
		return;
	return fetch(e.request)
		.then(res => {
			if (!res.url) return res;
			if (new URL(res.url).origin !== location.origin) return res;
			return caches.open(VERSION).then(cache => {
				return res;
			});
		})
		.catch(err => console.error(e.request.url, err));
}

function handleNoCacheMatch(e) {
	return fetchFromNetworkAndCache(e);
}
