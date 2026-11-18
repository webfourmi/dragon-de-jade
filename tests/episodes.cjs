const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const read=f=>fs.readFileSync(f,'utf8');
const ctx=vm.createContext({});
for(const f of ['hsk1-plan.js','episode2.js','episode3.js','episode4.js','episode5.js','episode6.js','episode7.js','episode8.js','episode9.js','episode10.js','episodes.js','enquete.js'])vm.runInContext(read(f),ctx,{filename:f});
const run=c=>vm.runInContext(c,ctx);
const app=read('app.js');
const first=JSON.parse(app.match(/const vocab=(\[.*?\]);/)[1]);
const eps={2:{S:run('EPISODE2_SCENES'),V:run('EPISODE2_VOCAB')},3:{S:run('EPISODE3_SCENES'),V:run('EPISODE3_VOCAB'),T:run('EPISODE3_TURNS')},4:{S:run('EPISODE4_SCENES'),V:run('EPISODE4_VOCAB'),T:run('EPISODE4_TURNS')},5:{S:run('EPISODE5_SCENES'),V:run('EPISODE5_VOCAB'),T:run('EPISODE5_TURNS')},6:{S:run('EPISODE6_SCENES'),V:run('EPISODE6_VOCAB'),T:run('EPISODE6_TURNS')},7:{S:run('EPISODE7_SCENES'),V:run('EPISODE7_VOCAB'),T:run('EPISODE7_TURNS')},8:{S:run('EPISODE8_SCENES'),V:run('EPISODE8_VOCAB'),T:run('EPISODE8_TURNS')},9:{S:run('EPISODE9_SCENES'),V:run('EPISODE9_VOCAB'),T:run('EPISODE9_TURNS')},10:{S:run('EPISODE10_SCENES'),V:run('EPISODE10_VOCAB'),T:run('EPISODE10_TURNS')}};
const plan=run('HSK1_EPISODE_WORDS').map(l=>l.map(w=>w.replace(/\d/g,'')));
const keys=['title','speaker','text','zh','py','fr','question','options','words','reward','info','grammar'];
const cjk=/[\u3400-\u9fff]/g;
// Vocabulaire : aucun doublon, tout le plan HSK 1 de l'épisode est couvert.
const all=[...first,...eps[2].V,...eps[3].V,...eps[4].V,...eps[5].V,...eps[6].V,...eps[7].V,...eps[8].V,...eps[9].V,...eps[10].V].map(v=>v[0]);
assert.equal(new Set(all).size,all.length,'mot en double dans le vocabulaire');
const allInfos=[];
for(const n of [3,4,5,6,7,8,9,10]){
  const {S,V,T}=eps[n];
  assert.equal(S.length,6,'épisode '+n+' : 6 scènes');
  assert.equal(T.length,6,'épisode '+n+' : 6 dialogues');
  assert.deepEqual([...V.map(v=>v[0])].sort(),[...plan[n-1]].sort(),'épisode '+n+' : vocabulaire = plan HSK 1');
  for(const v of V){assert.equal(v.length,3);assert(v[1]&&v[2],'pinyin et sens de '+v[0])}
  const used=S.flatMap(s=>s.words);
  assert.deepEqual([...used].sort(),[...V.map(v=>v[0])].sort(),'épisode '+n+' : chaque mot est enseigné dans exactement une scène');
  S.forEach((s,i)=>{
    for(const k of keys)assert(k in s,'épisode '+n+' scène '+(i+1)+' : champ '+k);
    assert.equal(s.options.filter(o=>o[1]).length,1,'épisode '+n+' scène '+(i+1)+' : une seule bonne réponse');
    assert(s.options.length===3&&s.options[0][1],'trois choix, bonne réponse en premier (comme les autres épisodes)');
    assert(Number.isInteger(s.reward)&&s.reward>0);
    allInfos.push(s.info);
    assert(['Maître Chen','Mei','Lóng'].includes(s.speaker),'le narrateur d’une scène a un portrait');
    // Pédagogie : les phrases chinoises n'emploient que des caractères déjà vus (épisodes précédents + mots de la scène et des scènes précédentes).
    const known=new Set([...first,...eps[2].V].flatMap(v=>[...v[0].matchAll(cjk)].map(m=>m[0])));
    for(let e=3;e<n;e++)eps[e].V.forEach(v=>[...v[0].matchAll(cjk)].forEach(m=>known.add(m[0])));
    S.slice(0,i+1).forEach(x=>x.words.forEach(w=>[...w.matchAll(cjk)].forEach(m=>known.add(m[0]))));
    const lines=[s.zh,...T[i].map(t=>t.zh)];
    for(const line of lines)for(const m of line.matchAll(cjk))assert(known.has(m[0]),'épisode '+n+' scène '+(i+1)+' : caractère pas encore appris '+m[0]+' dans « '+line+' »');
    T[i].forEach(t=>assert(['Maître Chen','Mei','Lóng','Vous',...Object.keys(run('EXTRA_SPEAKERS'))].includes(t.speaker)&&t.zh&&t.fr));
  });
}
assert.equal(new Set(allInfos).size,allInfos.length,'encadrés culturels uniques');
// Enquête : indices, questions et déductions cohérents avec les scènes.
const clues=run('EQ_CLUES'),ded=run('EQ_DEDUCTIONS'),qs=run('EQ_QUESTIONS'),reacts=run('EQ_REACTIONS'),vars=run('EQ_VARIANTS');
const ids=new Set(clues.map(c=>c.id));
assert.equal(ids.size,clues.length,'identifiants d’indices uniques');
for(let i=12;i<60;i++)assert(clues.some(c=>c.scene===i),'au moins un indice pour la scène '+(i+1));
for(const c of clues)assert(c.scene===null||(c.scene>=0&&c.scene<60),c.id);
for(const [a,b] of run('EQ_LINKS'))assert(ids.has(a)&&ids.has(b),'lien entre indices connus : '+a+' / '+b);
for(const q of qs){q.evidence.forEach(id=>assert(ids.has(id),q.id+' → '+id));if(q.conclusion)assert(ids.has(q.conclusion))}
for(const [ep,d] of Object.entries(ded)){
  const limit=Number(ep)*6,byId=Object.fromEntries(clues.map(c=>[c.id,c]));
  assert(d.pick.need.every(id=>d.pick.pool.includes(id)),'déduction '+ep+' : need ⊂ pool');
  for(const id of d.pick.pool)assert(byId[id]&&byId[id].scene!==null&&byId[id].scene<limit,'déduction '+ep+' : indice '+id+' disponible à ce stade');
  assert.equal(byId[d.conclusion].ded,Number(ep));
  assert.equal(d.vocab.options.filter(o=>o[1]).length,1);
}
for(const [i,r] of Object.entries(reacts)){assert(i>=0&&i<60);assert.equal(r.options.length,2);r.options.forEach(o=>assert(Object.keys(o.fx).every(k=>['chen','mei','long'].includes(k))&&o.res))}
for(const k of Object.keys(vars))assert(k>=0&&k<60);
console.log('PASS: épisodes 3 à 10 (vocabulaire = plan HSK 1, caractères déjà appris, une bonne réponse, encadrés uniques) et enquête cohérente');
