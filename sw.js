const VERSION='0.6.1';
const NOTES='Correctifs calligraphie : tracés isolés entre caractères et notation juste après affichage du modèle.';
const CACHE='dragonjade-'+VERSION;
const CORE=['./','./index.html','./style.css?v=0.6.1','./app.js?v=0.6.1','./writing.js?v=0.6.1','./hsk1-reference.js?v=0.6.1','./hsk1-plan.js?v=0.6.1','./episode2.js?v=0.6.1','./manifest.webmanifest'];
const OPTIONAL=['./assets/dragon-icon.svg','./assets/cover.png','./assets/dialogue-v026.jpg','./assets/prologue-dragon-de-jade.webp','./assets/heros.webp','./assets/mei.webp','./assets/maitre-chen.webp','./assets/long.webp','./assets/heros-garcon.webp','./assets/icon.png','./assets/icon512.png','./assets/place-v026.jpg','./assets/journal-v026.jpg','./assets/writing-v026.jpg','./assets/atlas-v026.jpg'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 await Promise.all(CORE.map(async path=>{const response=await fetch(new Request(path,{cache:'reload'}));if(!response.ok)throw Error('Core asset '+path+' HTTP '+response.status);await cache.put(path,response)}));
 await Promise.allSettled(OPTIONAL.map(async path=>{const response=await fetch(new Request(path,{cache:'reload'}));if(response.ok)await cache.put(path,response)}));
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
 const req=event.request;if(req.method!=='GET')return;
 const remote=new URL(req.url);
 if(remote.origin!==self.location.origin){
  if(remote.hostname!=='cdn.jsdelivr.net'||!(/^\/npm\/(hanzi-writer@3\.7\.2\/dist\/hanzi-writer\.min\.js|hanzi-writer-data@2\.0\.1\/.+\.json)$/.test(remote.pathname)))return;
  event.respondWith((async()=>{const cache=await caches.open(CACHE);const saved=await cache.match(req);if(saved)return saved;try{const response=await fetch(req);if(response.ok)await cache.put(req,response.clone());return response}catch{return Response.error()}})());return;
 }
 const url=new URL(req.url);
 if(url.pathname.endsWith('/version.json')||url.pathname.endsWith('/sw.js')){event.respondWith(fetch(req,{cache:'no-store'}));return}
 if(req.mode==='navigate'){
  event.respondWith((async()=>{try{const response=await fetch(req,{cache:'no-store'});if(response.ok){const cache=await caches.open(CACHE);await cache.put('./index.html',response.clone())}return response}catch{return (await caches.match('./index.html'))||Response.error()}})());return;
 }
 event.respondWith((async()=>{const cache=await caches.open(CACHE);const match=await cache.match(req);if(match)return match;try{const response=await fetch(req);if(response.ok)await cache.put(req,response.clone());return response}catch{return Response.error()}})());
});
