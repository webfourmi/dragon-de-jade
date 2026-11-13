const VERSION='0.2.8';
const NOTES='Sauvegarde RPG : export et restauration de partie ; validation des réponses orales en mandarin avec variantes acceptées.';
const CACHE='dragonjade-'+VERSION;
const ASSETS=['./','./index.html','./style.css?v=0.2.8','./app.js?v=0.2.8','./manifest.webmanifest','./assets/cover.png','./assets/icon.png','./assets/icon512.png','./assets/place-v026.jpg','./assets/dialogue-v026.jpg','./assets/journal-v026.jpg','./assets/writing-v026.jpg','./assets/atlas-v026.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(async cache=>{for(const path of ASSETS){const response=await fetch(new Request(path,{cache:'reload'}));if(!response.ok)throw new Error('Asset unavailable: '+path);await cache.put(path,response)}})));
self.addEventListener('message',e=>{if(e.data?.type==='GET_VERSION')e.ports[0]?.postMessage({version:VERSION,notes:NOTES});if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('dragonjade-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(e.request))||fetch(e.request)))});
