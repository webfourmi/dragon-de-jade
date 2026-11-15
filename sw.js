const VERSION='0.8.1';
const NOTES="Enquête : compteur d'écailles de Lóng, phrase cachée de la boîte, carnet d'indices avec questions ouvertes, scènes de déduction (épisodes 1 et 2), réactions qui font varier la confiance et variantes de scènes.";
const CACHE='dragonjade-'+VERSION;
const HANZI_CACHE='hanzi-assets-v1';
const HANZI_LIB='https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.2/dist/hanzi-writer.min.js';
const isHanziAsset=u=>u.origin==='https://cdn.jsdelivr.net'&&/^\/npm\/hanzi-writer(-data)?@/.test(u.pathname);
const CORE=['./','./index.html','./style.css?v=0.8.1','./app.js?v=0.8.1','./hsk1-reference.js?v=0.8.1','./hsk1-plan.js?v=0.8.1','./episode2.js?v=0.8.1','./writing.js?v=0.8.1','./quiz.js?v=0.8.1','./enquete.js?v=0.8.1','./manifest.webmanifest'];
const OPTIONAL=['./assets/dragon-icon.svg','./assets/cover.webp','./assets/dialogue-v026.webp','./assets/prologue-dragon-de-jade.webp','./assets/heros.webp','./assets/mei.webp','./assets/maitre-chen.webp','./assets/long.webp','./assets/heros-garcon.webp','./assets/icon.png','./assets/icon512.png','./assets/place-v026.webp','./assets/journal-v026.webp','./assets/writing-v026.webp','./assets/atlas-v026.webp'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 await Promise.all(CORE.map(async path=>{const response=await fetch(new Request(path,{cache:'reload'}));if(!response.ok)throw Error('Core asset '+path+' HTTP '+response.status);await cache.put(path,response)}));
 await Promise.allSettled(OPTIONAL.map(async path=>{const response=await fetch(new Request(path,{cache:'reload'}));if(response.ok)await cache.put(path,response)}));
 try{const hc=await caches.open(HANZI_CACHE);if(!(await hc.match(HANZI_LIB))){const r=await fetch(new Request(HANZI_LIB,{mode:'cors'}));if(r.ok)await hc.put(HANZI_LIB,r)}}catch{}
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith('dragonjade-')&&key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim();
})()));
self.addEventListener('message',event=>{
 if(event.data?.type==='GET_VERSION')event.ports[0]?.postMessage({version:VERSION,notes:NOTES});
 if(event.data?.type==='SKIP_WAITING')self.skipWaiting();
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method==='GET'&&isHanziAsset(new URL(req.url))){event.respondWith((async()=>{const hc=await caches.open(HANZI_CACHE);const hit=await hc.match(req);if(hit)return hit;try{const r=await fetch(req);if(r.ok)await hc.put(req,r.clone());return r}catch{return Response.error()}})());return}
 if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 const url=new URL(req.url);
 if(url.pathname.endsWith('/version.json')||url.pathname.endsWith('/sw.js')){event.respondWith(fetch(req,{cache:'no-store'}));return}
 if(req.mode==='navigate'){
  event.respondWith((async()=>{try{const response=await fetch(req,{cache:'no-store'});if(response.ok){const cache=await caches.open(CACHE);await cache.put('./index.html',response.clone())}return response}catch{return (await caches.match('./index.html'))||Response.error()}})());return;
 }
 event.respondWith((async()=>{const cache=await caches.open(CACHE);const match=await cache.match(req);if(match)return match;try{const response=await fetch(req);if(response.ok)await cache.put(req,response.clone());return response}catch{return Response.error()}})());
});
