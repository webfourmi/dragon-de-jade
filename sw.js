const VERSION='0.19.0';
const NOTES="Les personnages du Livre I ont leurs portraits à l’aquarelle. Retrouve-les dans les dialogues, les scènes et la galerie Livres → Personnages.";
const CACHE='dragonjade-'+VERSION;
const HANZI_CACHE='hanzi-assets-v1';
const HANZI_LIB='https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.2/dist/hanzi-writer.min.js';
const isHanziAsset=u=>u.origin==='https://cdn.jsdelivr.net'&&/^\/npm\/hanzi-writer(-data)?@/.test(u.pathname);
const CORE=['./','./index.html','./style.css?v=0.19.0','./app.js?v=0.19.0','./hsk1-reference.js?v=0.19.0','./hsk1-plan.js?v=0.19.0','./episode2.js?v=0.19.0','./episode3.js?v=0.19.0','./episode4.js?v=0.19.0','./episode5.js?v=0.19.0','./episode6.js?v=0.19.0','./episode7.js?v=0.19.0','./episode8.js?v=0.19.0','./episode9.js?v=0.19.0','./episode10.js?v=0.19.0','./writing.js?v=0.19.0','./quiz.js?v=0.19.0','./lieux.js?v=0.19.0','./personnages.js?v=0.19.0','./radicaux-data.js?v=0.19.0','./radicaux.js?v=0.19.0','./assets/radicaux/empreintes.svg','./livres.js?v=0.19.0','./jeux.js?v=0.19.0','./episodes.js?v=0.19.0','./speech.js?v=0.19.0','./enquete.js?v=0.19.0','./manifest.webmanifest'];
const OPTIONAL=['./assets/dragon-icon.svg','./assets/cover.webp','./assets/dialogue-v026.webp','./assets/prologue-dragon-de-jade.webp','./assets/heros.webp','./assets/mei.webp','./assets/maitre-chen.webp','./assets/long.webp','./assets/heros-garcon.webp','./assets/icon.png','./assets/icon512.png','./assets/place-v026.webp','./assets/journal-v026.webp','./assets/writing-v026.webp','./assets/atlas-v026.webp'].concat(['./assets/vocabulary/baba-v1.jpg','./assets/vocabulary/bu-keqi-v1.jpg','./assets/vocabulary/dajia-v1.jpg','./assets/vocabulary/didi-v1.jpg','./assets/vocabulary/duibuqi-v1.jpg','./assets/vocabulary/erzi-v1.jpg','./assets/vocabulary/gege-v1.jpg','./assets/vocabulary/haizi-v1.jpg','./assets/vocabulary/hao-v1.jpg','./assets/vocabulary/jia-v1.jpg','./assets/vocabulary/jiao-v1.jpg','./assets/vocabulary/jiaren-v1.jpg','./assets/vocabulary/jiejie-v1.jpg','./assets/vocabulary/ma-v1.jpg','./assets/vocabulary/mama-v1.jpg','./assets/vocabulary/mei-guanxi-v1.jpg','./assets/vocabulary/meimei-v1.jpg','./assets/vocabulary/men-v1.jpg','./assets/vocabulary/mingzi-v1.jpg','./assets/vocabulary/nan-pengyou-v1.jpg','./assets/vocabulary/nan-v1.jpg','./assets/vocabulary/ni-hao-v1.jpg','./assets/vocabulary/ni-v1.jpg','./assets/vocabulary/nimen-v1.jpg','./assets/vocabulary/nin-v1.jpg','./assets/vocabulary/nv-pengyou-v1.jpg','./assets/vocabulary/nv-v1.jpg','./assets/vocabulary/nver-v1.jpg','./assets/vocabulary/nvshi-v1.jpg','./assets/vocabulary/pengyou-v1.jpg','./assets/vocabulary/qing-v1.jpg','./assets/vocabulary/qingwen-v1.jpg','./assets/vocabulary/ren-clear-v1.jpg','./assets/vocabulary/renshi-v1.jpg','./assets/vocabulary/shei-v1.jpg','./assets/vocabulary/shenme-v1.jpg','./assets/vocabulary/shi-v1.jpg','./assets/vocabulary/sui-v1.jpg','./assets/vocabulary/ta-female-v1.jpg','./assets/vocabulary/ta-male-v1.jpg','./assets/vocabulary/tamen-female-v1.jpg','./assets/vocabulary/tamen-mixed-v1.jpg','./assets/vocabulary/wo-v1.jpg','./assets/vocabulary/women-v1.jpg','./assets/vocabulary/xiansheng-clear-v1.jpg','./assets/vocabulary/xiexie-v1.jpg','./assets/vocabulary/zaijian-v1.jpg','./assets/vocabulary/zhe-v1.jpg']).concat(['./assets/vocabulary/hsk1-ep03-01.jpg','./assets/vocabulary/hsk1-ep03-02.jpg','./assets/vocabulary/hsk1-ep03-03.jpg','./assets/vocabulary/hsk1-ep03-04.jpg','./assets/vocabulary/hsk1-ep03-05.jpg','./assets/vocabulary/hsk1-ep03-06.jpg','./assets/vocabulary/hsk1-ep03-07.jpg','./assets/vocabulary/hsk1-ep03-08.jpg','./assets/vocabulary/hsk1-ep03-09.jpg','./assets/vocabulary/hsk1-ep03-10.jpg','./assets/vocabulary/hsk1-ep03-11.jpg','./assets/vocabulary/hsk1-ep03-12.jpg','./assets/vocabulary/hsk1-ep03-13.jpg','./assets/vocabulary/hsk1-ep03-14.jpg','./assets/vocabulary/hsk1-ep03-15.jpg','./assets/vocabulary/hsk1-ep03-16.jpg','./assets/vocabulary/hsk1-ep03-17.jpg','./assets/vocabulary/hsk1-ep03-18.jpg','./assets/vocabulary/hsk1-ep03-19.jpg','./assets/vocabulary/hsk1-ep03-20.jpg','./assets/vocabulary/hsk1-ep03-21.jpg','./assets/vocabulary/hsk1-ep03-22.jpg','./assets/vocabulary/hsk1-ep03-23.jpg','./assets/vocabulary/hsk1-ep03-24.jpg','./assets/vocabulary/hsk1-ep03-25.jpg','./assets/vocabulary/hsk1-ep03-26.jpg','./assets/vocabulary/hsk1-ep04-01.jpg','./assets/vocabulary/hsk1-ep04-02.jpg','./assets/vocabulary/hsk1-ep04-03.jpg','./assets/vocabulary/hsk1-ep04-04.jpg','./assets/vocabulary/hsk1-ep04-05.jpg','./assets/vocabulary/hsk1-ep04-06.jpg','./assets/vocabulary/hsk1-ep04-07.jpg','./assets/vocabulary/hsk1-ep04-08.jpg','./assets/vocabulary/hsk1-ep04-09.jpg','./assets/vocabulary/hsk1-ep04-10.jpg','./assets/vocabulary/hsk1-ep04-11.jpg','./assets/vocabulary/hsk1-ep04-12.jpg','./assets/vocabulary/hsk1-ep04-13.jpg','./assets/vocabulary/hsk1-ep04-14.jpg','./assets/vocabulary/hsk1-ep04-15.jpg','./assets/vocabulary/hsk1-ep04-16.jpg','./assets/vocabulary/hsk1-ep04-17.jpg','./assets/vocabulary/hsk1-ep04-18.jpg','./assets/vocabulary/hsk1-ep04-19.jpg','./assets/vocabulary/hsk1-ep04-20.jpg','./assets/vocabulary/hsk1-ep04-21.jpg','./assets/vocabulary/hsk1-ep04-22.jpg','./assets/vocabulary/hsk1-ep04-23.jpg','./assets/vocabulary/hsk1-ep04-24.jpg','./assets/vocabulary/hsk1-ep04-25.jpg','./assets/vocabulary/hsk1-ep04-26.jpg','./assets/vocabulary/hsk1-ep04-27.jpg','./assets/vocabulary/hsk1-ep04-28.jpg','./assets/vocabulary/hsk1-ep04-29.jpg','./assets/vocabulary/hsk1-ep05-01.jpg','./assets/vocabulary/hsk1-ep05-02.jpg','./assets/vocabulary/hsk1-ep05-03.jpg','./assets/vocabulary/hsk1-ep05-04.jpg','./assets/vocabulary/hsk1-ep05-05.jpg','./assets/vocabulary/hsk1-ep05-06.jpg','./assets/vocabulary/hsk1-ep05-07.jpg','./assets/vocabulary/hsk1-ep05-08.jpg','./assets/vocabulary/hsk1-ep05-09.jpg','./assets/vocabulary/hsk1-ep05-10.jpg','./assets/vocabulary/hsk1-ep05-11.jpg','./assets/vocabulary/hsk1-ep05-12.jpg','./assets/vocabulary/hsk1-ep05-13.jpg','./assets/vocabulary/hsk1-ep05-14.jpg','./assets/vocabulary/hsk1-ep05-15.jpg','./assets/vocabulary/hsk1-ep05-16.jpg','./assets/vocabulary/hsk1-ep05-17.jpg','./assets/vocabulary/hsk1-ep05-18.jpg','./assets/vocabulary/hsk1-ep05-19.jpg','./assets/vocabulary/hsk1-ep05-20.jpg','./assets/vocabulary/hsk1-ep05-21.jpg','./assets/vocabulary/hsk1-ep05-22.jpg','./assets/vocabulary/hsk1-ep05-23.jpg','./assets/vocabulary/hsk1-ep05-24.jpg','./assets/vocabulary/hsk1-ep05-25.jpg','./assets/vocabulary/hsk1-ep06-01.jpg','./assets/vocabulary/hsk1-ep06-02.jpg','./assets/vocabulary/hsk1-ep06-03.jpg','./assets/vocabulary/hsk1-ep06-04.jpg','./assets/vocabulary/hsk1-ep06-05.jpg','./assets/vocabulary/hsk1-ep06-06.jpg','./assets/vocabulary/hsk1-ep06-07.jpg','./assets/vocabulary/hsk1-ep06-08.jpg','./assets/vocabulary/hsk1-ep06-09.jpg','./assets/vocabulary/hsk1-ep06-10.jpg','./assets/vocabulary/hsk1-ep06-11.jpg','./assets/vocabulary/hsk1-ep06-12.jpg','./assets/vocabulary/hsk1-ep06-13.jpg','./assets/vocabulary/hsk1-ep06-14.jpg','./assets/vocabulary/hsk1-ep06-15.jpg','./assets/vocabulary/hsk1-ep06-16.jpg','./assets/vocabulary/hsk1-ep06-17.jpg','./assets/vocabulary/hsk1-ep06-18.jpg','./assets/vocabulary/hsk1-ep06-19.jpg','./assets/vocabulary/hsk1-ep06-20.jpg','./assets/vocabulary/hsk1-ep06-21.jpg','./assets/vocabulary/hsk1-ep06-22.jpg','./assets/vocabulary/hsk1-ep06-23.jpg','./assets/vocabulary/hsk1-ep06-24.jpg','./assets/vocabulary/hsk1-ep06-25.jpg','./assets/vocabulary/hsk1-ep06-26.jpg']).concat(['./assets/vocabulary/hsk1-ep07-01.jpg','./assets/vocabulary/hsk1-ep07-02.jpg','./assets/vocabulary/hsk1-ep07-03.jpg','./assets/vocabulary/hsk1-ep07-04.jpg','./assets/vocabulary/hsk1-ep07-05.jpg','./assets/vocabulary/hsk1-ep07-06.jpg','./assets/vocabulary/hsk1-ep07-07.jpg','./assets/vocabulary/hsk1-ep07-08.jpg','./assets/vocabulary/hsk1-ep07-09.jpg','./assets/vocabulary/hsk1-ep07-10.jpg','./assets/vocabulary/hsk1-ep07-11.jpg','./assets/vocabulary/hsk1-ep07-12.jpg','./assets/vocabulary/hsk1-ep07-13.jpg','./assets/vocabulary/hsk1-ep07-14.jpg','./assets/vocabulary/hsk1-ep07-15.jpg','./assets/vocabulary/hsk1-ep07-16.jpg','./assets/vocabulary/hsk1-ep07-17.jpg','./assets/vocabulary/hsk1-ep07-18.jpg','./assets/vocabulary/hsk1-ep07-19.jpg','./assets/vocabulary/hsk1-ep07-20.jpg','./assets/vocabulary/hsk1-ep07-21.jpg','./assets/vocabulary/hsk1-ep07-22.jpg','./assets/vocabulary/hsk1-ep07-23.jpg','./assets/vocabulary/hsk1-ep07-24.jpg','./assets/vocabulary/hsk1-ep07-25.jpg','./assets/vocabulary/hsk1-ep07-26.jpg','./assets/vocabulary/hsk1-ep07-27.jpg','./assets/vocabulary/hsk1-ep08-01.jpg','./assets/vocabulary/hsk1-ep08-02.jpg','./assets/vocabulary/hsk1-ep08-03.jpg','./assets/vocabulary/hsk1-ep08-04.jpg','./assets/vocabulary/hsk1-ep08-05.jpg','./assets/vocabulary/hsk1-ep08-06.jpg','./assets/vocabulary/hsk1-ep08-07.jpg','./assets/vocabulary/hsk1-ep08-08.jpg','./assets/vocabulary/hsk1-ep08-09.jpg','./assets/vocabulary/hsk1-ep08-10.jpg','./assets/vocabulary/hsk1-ep08-11.jpg','./assets/vocabulary/hsk1-ep08-12.jpg','./assets/vocabulary/hsk1-ep08-13.jpg','./assets/vocabulary/hsk1-ep08-14.jpg','./assets/vocabulary/hsk1-ep08-15.jpg','./assets/vocabulary/hsk1-ep08-16.jpg','./assets/vocabulary/hsk1-ep08-17.jpg','./assets/vocabulary/hsk1-ep08-18.jpg','./assets/vocabulary/hsk1-ep08-19.jpg','./assets/vocabulary/hsk1-ep08-20.jpg','./assets/vocabulary/hsk1-ep08-21.jpg','./assets/vocabulary/hsk1-ep08-22.jpg','./assets/vocabulary/hsk1-ep08-23.jpg','./assets/vocabulary/hsk1-ep08-24.jpg','./assets/vocabulary/hsk1-ep08-25.jpg']).concat(['./assets/vocabulary/hsk1-ep09-01.jpg','./assets/vocabulary/hsk1-ep09-02.jpg','./assets/vocabulary/hsk1-ep09-03.jpg','./assets/vocabulary/hsk1-ep09-04.jpg','./assets/vocabulary/hsk1-ep09-05.jpg','./assets/vocabulary/hsk1-ep09-06.jpg','./assets/vocabulary/hsk1-ep09-07.jpg','./assets/vocabulary/hsk1-ep09-08.jpg','./assets/vocabulary/hsk1-ep09-09.jpg','./assets/vocabulary/hsk1-ep09-10.jpg','./assets/vocabulary/hsk1-ep09-11.jpg','./assets/vocabulary/hsk1-ep09-12.jpg','./assets/vocabulary/hsk1-ep09-13.jpg','./assets/vocabulary/hsk1-ep09-14.jpg','./assets/vocabulary/hsk1-ep09-15.jpg','./assets/vocabulary/hsk1-ep09-16.jpg','./assets/vocabulary/hsk1-ep09-17.jpg','./assets/vocabulary/hsk1-ep09-18.jpg','./assets/vocabulary/hsk1-ep09-19.jpg','./assets/vocabulary/hsk1-ep09-20.jpg','./assets/vocabulary/hsk1-ep09-21.jpg','./assets/vocabulary/hsk1-ep09-22.jpg','./assets/vocabulary/hsk1-ep10-01.jpg','./assets/vocabulary/hsk1-ep10-02.jpg','./assets/vocabulary/hsk1-ep10-03.jpg','./assets/vocabulary/hsk1-ep10-04.jpg','./assets/vocabulary/hsk1-ep10-05.jpg','./assets/vocabulary/hsk1-ep10-06.jpg','./assets/vocabulary/hsk1-ep10-07.jpg','./assets/vocabulary/hsk1-ep10-08.jpg','./assets/vocabulary/hsk1-ep10-09.jpg','./assets/vocabulary/hsk1-ep10-10.jpg','./assets/vocabulary/hsk1-ep10-11.jpg','./assets/vocabulary/hsk1-ep10-12.jpg','./assets/vocabulary/hsk1-ep10-13.jpg','./assets/vocabulary/hsk1-ep10-14.jpg','./assets/vocabulary/hsk1-ep10-15.jpg','./assets/vocabulary/hsk1-ep10-16.jpg','./assets/vocabulary/hsk1-ep10-17.jpg','./assets/vocabulary/hsk1-ep10-18.jpg','./assets/vocabulary/hsk1-ep10-19.jpg','./assets/vocabulary/hsk1-ep10-20.jpg','./assets/vocabulary/hsk1-ep10-21.jpg','./assets/vocabulary/hsk1-ep10-22.jpg','./assets/vocabulary/hsk1-ep10-23.jpg']);
const PLACE_IMAGES = [
  './assets/lieux/rue-des-lanternes.webp',
  './assets/lieux/boutique-de-chen.webp',
  './assets/lieux/archives-de-chen.webp',
  './assets/lieux/etal-des-cartes.webp',
  './assets/lieux/maison-trente-six.webp',
  './assets/lieux/maison-de-the.webp',
  './assets/lieux/marche-antiquites.webp',
  './assets/lieux/rue-des-boutiques.webp',
  './assets/lieux/librairie-du-marche.webp',
  './assets/lieux/etal-du-marchand.webp',
  './assets/lieux/hall-de-gare.webp',
  './assets/lieux/quai-du-train.webp',
  './assets/lieux/cour-de-lecole.webp',
  './assets/lieux/salle-de-classe.webp',
  './assets/lieux/palier-de-la-voisine.webp',
  './assets/lieux/imprimerie.webp',
  './assets/lieux/salon-de-la-voisine.webp',
  './assets/lieux/cinema-du-quartier.webp',
  './assets/lieux/chambre-sous-les-combles.webp'
];
const NPC_IMAGES = [
  './assets/personnages/anciens-camarades.webp',
  './assets/personnages/expediteur-anonyme.webp',
  './assets/personnages/femme-du-registre.webp',
  './assets/personnages/fillette-du-portrait.webp',
  './assets/personnages/fils-et-fille.webp',
  './assets/personnages/gardien.webp',
  './assets/personnages/grand-frere.webp',
  './assets/personnages/grand-pere-chen.webp',
  './assets/personnages/grande-soeur.webp',
  './assets/personnages/guichetiere.webp',
  './assets/personnages/homme-du-registre.webp',
  './assets/personnages/instituteur.webp',
  './assets/personnages/jeune-femme-de-la-lettre.webp',
  './assets/personnages/libraire-des-plans.webp',
  './assets/personnages/libraire-du-marche.webp',
  './assets/personnages/mere-de-mei.webp',
  './assets/personnages/monsieur-wu.webp',
  './assets/personnages/patronne.webp',
  './assets/personnages/pere-de-mei.webp',
  './assets/personnages/petit-frere.webp',
  './assets/personnages/vendeur.webp',
  './assets/personnages/voisine.webp'
];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 await Promise.all(CORE.map(async path=>{const response=await fetch(new Request(path,{cache:'reload'}));if(!response.ok)throw Error('Core asset '+path+' HTTP '+response.status);await cache.put(path,response)}));
 await Promise.allSettled([...OPTIONAL,...PLACE_IMAGES,...NPC_IMAGES].map(async path=>{const response=await fetch(new Request(path,{cache:'reload'}));if(response.ok)await cache.put(path,response)}));
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
 if(req.mode==='navigate' && (url.pathname.endsWith('/') || url.pathname.endsWith('/index.html'))){
  event.respondWith((async()=>{try{const response=await fetch(req,{cache:'no-store'});if(response.ok){const cache=await caches.open(CACHE);await cache.put('./index.html',response.clone())}return response}catch{return (await caches.match('./index.html'))||Response.error()}})());return;
 }
 event.respondWith((async()=>{const cache=await caches.open(CACHE);const match=await cache.match(req);if(match)return match;try{const response=await fetch(req);if(response.ok)await cache.put(req,response.clone());return response}catch{return Response.error()}})());
});
