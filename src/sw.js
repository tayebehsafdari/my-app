console.log('self: ', self);

import {precacheAndRoute, matchPrecache} from 'workbox-precaching';
import {ExpirationPlugin} from 'workbox-expiration';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {registerRoute, setCatchHandler} from 'workbox-routing';
import {
    StaleWhileRevalidate,
    NetworkFirst,
    CacheFirst,
    NetworkOnly,
    CacheOnly
} from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', event => {
    console.log('install event', event);
});

self.addEventListener('activate', event => {
    console.log('activate event', event);
});

self.addEventListener('fetch', event => {
    console.log('fetch event', event);
});

// Cache Google Fonts
/* registerRoute(
    ({url, sameOrigin, request, event}) => {
        console.log('url: ', url);
        console.log('sameOrigin: ', sameOrigin);
        console.log('request: ', request);
        console.log('event: ', event);
        return url.origin === 'https://fonts.googleapis.com' ||
            url.origin === 'https://fonts.gstatic.com';
    },
    new StaleWhileRevalidate({
        cacheName: 'google-fonts',
        plugins: [
            new ExpirationPlugin({maxEntries: 20})
        ]
    })
); */

// Cache page navigations (html) with a Network First strategy
/* registerRoute(
    ({request}) => request.mode === 'navigate',
    new NetworkFirst({
        cacheName: 'pages',
        plugins: [
            new CacheableResponsePlugin({statuses: [200]})
        ]
    })
); */

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
/* registerRoute(
    ({request}) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    new StaleWhileRevalidate({
        cacheName: 'assets',
        plugins: [
            new CacheableResponsePlugin({statuses: [200]})
        ]
    })
); */

// Cache Images
/* registerRoute(
    ({request}) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
            })
        ]
    })
); */

setCatchHandler(async ({event}) => {
    if (event.request.destination === 'document') {
        return matchPrecache('/offline.html');
    }
    return Response.error();
});