/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

importScripts(
  "precache-manifest.c41f431f4bb5126cb3cb18cdeba5db33.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^https:\/\/api.codamit.com\//, new workbox.strategies.NetworkFirst({ "cacheName":"api-cache","fetchOptions":{"mode":"cors"}, plugins: [] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/www.dropbox.com\//, new workbox.strategies.CacheFirst({ "cacheName":"image-cache", plugins: [] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts.googleapis.com\//, new workbox.strategies.CacheFirst({ "cacheName":"font-cache", plugins: [] }), 'GET');
