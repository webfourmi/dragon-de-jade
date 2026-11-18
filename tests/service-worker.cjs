const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('sw.js','utf8'),origin='https://example.test',base=origin+'/dragon-de-jade/';
function setup(fail=''){
 const stores=new Map(),listeners={},network=[];let offline=false,skipped=false,claimed=false;
 const key=p=>new URL(typeof p==='string'?p:p.url,base).href;
 const caches={async open(name){if(!stores.has(name))stores.set(name,new Map());const m=stores.get(name);return {async put(p,r){m.set(key(p),r.clone())},async match(p){return m.get(key(p))?.clone()}}},async keys(){return [...stores.keys()]},async delete(name){return stores.delete(name)},async match(p){for(const m of stores.values())if(m.has(key(p)))return m.get(key(p)).clone()}};
 const fetch=async(input,options)=>{const url=key(input);network.push({url,options});if(offline)throw Error('offline');const u=new URL(url);if(u.origin!==origin)return new Response('test library');const rel=u.pathname.slice('/dragon-de-jade/'.length)||'index.html';if(rel===fail||!fs.existsSync(rel))return new Response('',{status:404});return new Response(fs.readFileSync(rel))};
 const self={location:{origin},addEventListener:(n,f)=>listeners[n]=f,async skipWaiting(){skipped=true},clients:{async claim(){claimed=true}}};
 class LocalRequest extends Request{constructor(p,o){super(new URL(p,base),o)}}
 vm.runInNewContext(source,{self,caches,fetch,Request:LocalRequest,Response,URL});
 return {stores,caches,listeners,network,get skipped(){return skipped},get claimed(){return claimed},setOffline:v=>offline=v,async event(n){let result;listeners[n]({waitUntil:p=>result=p});return result},async request(path,mode='cors'){let result;listeners.fetch({request:{url:key(path),method:'GET',mode},respondWith:p=>result=p});return result}};
}
(async()=>{
 const sw=setup(),version=JSON.parse(fs.readFileSync('version.json','utf8')).version;
 await sw.caches.open('dragonjade-old');await sw.caches.open('unrelated-cache');
 await sw.event('install');assert(sw.skipped);
 const current=sw.stores.get('dragonjade-'+version);assert(current.size>60);
 for(const f of ['index.html','episode5.js','episode6.js','episode7.js','episode8.js','episode9.js','episode10.js','enquete.js'])assert([...current.keys()].some(k=>new URL(k).pathname.endsWith('/'+f)),f);
 let release;sw.listeners.message({data:{type:'GET_VERSION'},ports:[{postMessage:r=>release=r}]});assert.equal(release.version,version);assert(release.notes);
 await sw.event('activate');assert(sw.claimed);assert(!sw.stores.has('dragonjade-old'));assert(sw.stores.has('unrelated-cache'));assert(sw.stores.has('hanzi-assets-v1'));
 sw.setOffline(true);
 assert((await (await sw.request('lieux.js?v='+version)).text()).includes('SCENE_PLACES'));
 for(const file of ['livres.js','jeux.js']) assert.equal(await (await sw.request(file+'?v='+version)).text(),fs.readFileSync(file,'utf8'));
 for(const file of fs.readdirSync('assets/lieux')){
  const path='assets/lieux/'+file;
  const bytes=Buffer.from(await (await sw.request(path)).arrayBuffer());
  assert.equal(bytes.toString('ascii',8,12),'WEBP',file);
  assert.deepEqual(bytes,fs.readFileSync(path),'offline place: '+file);
 }
 const fullImage=await sw.request('assets/lieux/rue-des-lanternes.webp','navigate');
 assert.equal(Buffer.from(await fullImage.arrayBuffer()).toString('ascii',8,12),'WEBP');
 assert((await (await sw.request('episode6.js?v='+version)).text()).includes('EPISODE6_SCENES'));
 assert((await (await sw.request('episode7.js?v='+version)).text()).includes('EPISODE7_SCENES'));
 assert((await (await sw.request('episode8.js?v='+version)).text()).includes('EPISODE8_SCENES'));
 for(const ep of [9,10])assert((await (await sw.request('episode'+ep+'.js?v='+version)).text()).includes('EPISODE'+ep+'_SCENES'));
 assert((await (await sw.request('', 'navigate')).text()).includes('app.js?v='+version));
 assert.equal(await (await sw.request('https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.2/dist/hanzi-writer.min.js')).text(),'test library');
 sw.setOffline(false);await sw.request('version.json');assert.equal(sw.network.at(-1).options.cache,'no-store');
 const broken=setup('app.js');await assert.rejects(broken.event('install'));assert(!broken.skipped);
 console.log('PASS: service-worker install, core files, version message, cache activation, offline navigation/scripts/Hanzi library and failed-update protection');
})().catch(e=>{console.error(e);process.exitCode=1});
