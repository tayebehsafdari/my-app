console.log("self: ", self);

// import {precacheAndRoute} from 'workbox-precaching';
//
// precacheAndRoute(self.__WB_MANIFEST);
//
// const OFFLINE_VERSION = 1;
// const cacheName = 'cache-v1';
// const precacheResources = [
//     '/',
//     '/public/css/index.html',
//     '/assets/css/',
//     '/assets/fonts/',
//     '/assets/images/',
//     '/assets/js/',
//     '/assets/scss/'
// ];
//
//
// self.addEventListener('install', event => {
//     console.log("install event", event);
//     event.waitUntil(async () => {
//         const cache = await caches.open(cacheName);
//         await cache.addAll(precacheResources);
//     });
// });
//
// self.addEventListener('activate', event => {
//     console.log("activate event", event);
// });
//
// self.addEventListener('fetch', event => {
//     console.log("fetch event", event);
//     event.respondWith(async () => {
//         const cachedResponse = await caches.match(event.request);
//         if (cachedResponse) {
//             return cachedResponse;
//         }
//         return await fetch(event.request);
//     });
// });