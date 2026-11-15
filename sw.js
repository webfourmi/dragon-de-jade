const VERSION='0.10.0';
const NOTES="Épisodes 5 et 6 (thé et nourriture ; marché et achats) : la maison de thé du 三十六, Monsieur Wu et la deuxième écaille. Nouveaux personnages secondaires, indices, réactions et déductions.";
const CACHE='dragonjade-'+VERSION;
const HANZI_CACHE='hanzi-assets-v1';
const HANZI_LIB='https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.2/dist/hanzi-writer.min.js';
const isHanziAsset=u=>u.origin==='https://cdn.jsdelivr.net'&&/^\/npm\/hanzi-writer(-data)?@/.test(u.pathname);
const CORE=['./','./index.html','./style.css?v=0.10.0','./app.js?v=0.10.0','./hsk1-reference.js?v=0.10.0','./hsk1-plan.js?v=0.10.0','./episode2.js?v=0.10.0','./episode3.js?v=0.10.0','./episode4.js?v=0.10.0','./episode5.js?v=0.10.0','./episode6.js?v=0.10.0','./writing.js?v=0.10.0','./quiz.js?v=0.10.0','./episodes.js?v=0.10.0','./enquete.js?v=0.10.0','./manifest.webmanifest'];
const OPTIONAL=['./assets/dragon-icon.svg','./assets/cover.webp','./assets/dialogue-v026.webp','./assets/prologue-dragon-de-jade.webp','./assets/heros.webp','./assets/mei.webp','./assets/maitre-chen.webp','./assets/long.webp','./assets/heros-garcon.webp','./assets/icon.png','./assets/icon512.png','./assets/place-v026.webp','./assets/journal-v026.webp','./assets/writing-v026.webp','./assets/atlas-v026.webp'].concat(['./assets/vocabulary/baba-v1.jpg','./assets/vocabulary/bu-keqi-v1.jpg','./assets/vocabulary/dajia-v1.jpg','./assets/vocabulary/didi-v1.jpg','./assets/vocabulary/duibuqi-v1.jpg','./assets/vocabulary/erzi-v1.jpg','./assets/vocabulary/gege-v1.jpg','./assets/vocabulary/haizi-v1.jpg','./assets/vocabulary/hao-v1.jpg','./assets/vocabulary/jia-v1.jpg','./assets/vocabulary/jiao-v1.jpg','./assets/vocabulary/jiaren-v1.jpg','./assets/vocabulary/jiejie-v1.jpg','./assets/vocabulary/ma-v1.jpg','./assets/vocabulary/mama-v1.jpg','./assets/vocabulary/mei-guanxi-v1.jpg','./assets/vocabulary/meimei-v1.jpg','./assets/vocabulary/men-v1.jpg','./assets/vocabulary/mingzi-v1.jpg','./assets/vocabulary/nan-pengyou-v1.jpg','./assets/vocabulary/nan-v1.jpg','./assets/vocabulary/ni-hao-v1.jpg','./assets/vocabulary/ni-v1.jpg','./assets/vocabulary/nimen-v1.jpg','./assets/vocabulary/nin-v1.jpg','./assets/vocabulary/nv-pengyou-v1.jpg','./assets/vocabulary/nv-v1.jpg','./assets/vocabulary/nver-v1.jpg','./assets/vocabulary/nvshi-v1.jpg','./assets/vocabulary/pengyou-v1.jpg','./assets/vocabulary/qing-v1.jpg','./assets/vocabulary/qingwen-v1.jpg','./assets/vocabulary/ren-clear-v1.jpg','./assets/vocabulary/renshi-v1.jpg','./assets/vocabulary/shei-v1.jpg','./assets/vocabulary/shenme-v1.jpg','./assets/vocabulary/shi-v1.jpg','./assets/vocabulary/sui-v1.jpg','./assets/vocabulary/ta-female-v1.jpg','./assets/vocabulary/ta-male-v1.jpg','./assets/vocabulary/tamen-female-v1.jpg','./assets/vocabulary/tamen-mixed-v1.jpg','./assets/vocabulary/wo-v1.jpg','./assets/vocabulary/women-v1.jpg','./assets/vocabulary/xiansheng-clear-v1.jpg','./assets/vocabulary/xiexie-v1.jpg','./assets/vocabulary/zaijian-v1.jpg','./assets/vocabulary/zhe-v1.jpg']);
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
