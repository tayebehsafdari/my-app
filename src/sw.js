console.log('self: ', self);

import {precacheAndRoute, matchPrecache} from 'workbox-precaching';
import {ExpirationPlugin} from 'workbox-expiration';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {registerRoute, setCatchHandler} from 'workbox-routing';
import {BackgroundSyncPlugin, Queue} from 'workbox-background-sync';
import {
    StaleWhileRevalidate,
    NetworkFirst,
    CacheFirst,
    NetworkOnly,
    CacheOnly
} from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

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

/* const bgSyncPlugin = new BackgroundSyncPlugin('myQueueName', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
    /\/api\/.*\/*.json/,
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
); */

const queue = new Queue('myQueueName');

self.addEventListener('fetch', event => {
    console.log('fetch event', event);
    if (event.request.method !== 'POST') {
        return;
    }
    const bgSyncLogic = async () => {
        try {
            const response = await fetch(event.request.clone());
            return response;
        } catch (error) {
            await queue.pushRequest({request: event.request});
            return error;
        }
    };
    event.respondWith(bgSyncLogic());
});

self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const primaryKey = event.data.primaryKey;
    const action = event.action;
    console.log('notificationclick event', notification, primaryKey, action, clients);
});

self.addEventListener('push', event => {
    console.log('push event', event);
});

self.addEventListener('install', event => {
    console.log('install event', event);
});

self.addEventListener('activate', event => {
    console.log('activate event', event);
});

self.addEventListener('sync', event => {
    console.log('sync event', event);
});