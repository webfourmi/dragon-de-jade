const VERSION='0.6.3';
const NOTES='Carnet entièrement illustré : 48 aquarelles pour les mots des deux épisodes. Progression et exercices conservés.';
const CACHE='dragonjade-'+VERSION;
const CORE=['./','./index.html','./style.css?v=0.6.3','./app.js?v=0.6.3','./writing.js?v=0.6.3','./hsk1-reference.js?v=0.6.3','./hsk1-plan.js?v=0.6.3','./episode2.js?v=0.6.3','./manifest.webmanifest'];
const OPTIONAL=["./assets/vocabulary/wo-v1.jpg","./assets/vocabulary/jiao-v1.jpg","./assets/vocabulary/mingzi-v1.jpg","./assets/vocabulary/shenme-v1.jpg","./assets/vocabulary/shei-v1.jpg","./assets/vocabulary/shi-v1.jpg","./assets/vocabulary/ren-clear-v1.jpg","./assets/vocabulary/xiansheng-clear-v1.jpg","./assets/vocabulary/duibuqi-v1.jpg","./assets/vocabulary/mei-guanxi-v1.jpg","./assets/vocabulary/qing-v1.jpg","./assets/vocabulary/qingwen-v1.jpg","./assets/vocabulary/dajia-v1.jpg","./assets/vocabulary/zhe-v1.jpg","./assets/vocabulary/xiexie-v1.jpg","./assets/vocabulary/zaijian-v1.jpg","./assets/vocabulary/bu-keqi-v1.jpg","./assets/vocabulary/renshi-v1.jpg","./assets/vocabulary/ma-v1.jpg","./assets/vocabulary/nvshi-v1.jpg","./assets/vocabulary/baba-v1.jpg","./assets/vocabulary/mama-v1.jpg","./assets/vocabulary/gege-v1.jpg","./assets/vocabulary/didi-v1.jpg","./assets/vocabulary/jiejie-v1.jpg","./assets/vocabulary/meimei-v1.jpg","./assets/vocabulary/erzi-v1.jpg","./assets/vocabulary/nver-v1.jpg","./assets/vocabulary/jia-v1.jpg","./assets/vocabulary/jiaren-v1.jpg","./assets/vocabulary/haizi-v1.jpg","./assets/vocabulary/pengyou-v1.jpg","./assets/vocabulary/nan-v1.jpg","./assets/vocabulary/nv-v1.jpg","./assets/vocabulary/nan-pengyou-v1.jpg","./assets/vocabulary/nv-pengyou-v1.jpg","./assets/vocabulary/ta-male-v1.jpg","./assets/vocabulary/ta-female-v1.jpg","./assets/vocabulary/tamen-mixed-v1.jpg","./assets/vocabulary/tamen-female-v1.jpg","./assets/vocabulary/women-v1.jpg","./assets/vocabulary/nimen-v1.jpg","./assets/vocabulary/men-v1.jpg","./assets/vocabulary/sui-v1.jpg",'./assets/vocabulary/ni-hao-v1.jpg','./assets/vocabulary/ni-v1.jpg','./assets/vocabulary/hao-v1.jpg','./assets/vocabulary/nin-v1.jpg','./assets/dragon-icon.svg','./assets/cover.png','./assets/dialogue-v026.jpg','./assets/prologue-dragon-de-jade.webp','./assets/heros.webp','./assets/mei.webp','./assets/maitre-chen.webp','./assets/long.webp','./assets/heros-garcon.webp','./assets/icon.png','./assets/icon512.png','./assets/place-v026.jpg','./assets/journal-v026.jpg','./assets/writing-v026.jpg','./assets/atlas-v026.jpg'];
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
