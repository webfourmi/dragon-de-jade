const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const read=f=>fs.readFileSync(f,'utf8');
const ctx=vm.createContext({esc:s=>s});
for(const f of ['hsk1-reference.js','hsk1-plan.js','episode2.js','episode3.js','episode4.js','episode5.js','episode6.js','episode7.js','episode8.js','episode9.js','episode10.js'])vm.runInContext(read(f),ctx,{filename:f});
const app=read('app.js');
const first=JSON.parse(app.match(/const vocab=(\[.*?\]);/)[1]);
ctx.vocab=[...first,...[2,3,4,5,6,7,8,9,10].flatMap(n=>vm.runInContext('EPISODE'+n+'_VOCAB',ctx))];
vm.runInContext(read('speech.js'),ctx,{filename:'speech.js'});
const call=(fn,...a)=>vm.runInContext(fn+'('+a.map(x=>JSON.stringify(x)).join(',')+')',ctx);
const match=(h,t)=>call('speechMatch',h,t);
const level=(h,t)=>match(h,t).level;

// Chiffres, ponctuation, espaces, 儿 et homophones sans enjeu
for(const [h,t] of [['3点','三点'],['三 点。','三点'],['36','三十六'],['103','一百零三'],['1000','一千'],['365','三百六十五'],['12点','十二点'],['10','十'],['2点','两点'],['二点','两点'],['她三岁','他三岁'],['一点','一点儿'],['哪里','哪儿'],['这儿','这里'],['再见','在见'],['３６','三十六']])
  assert.equal(level(h,t),'exact',h+' ~ '+t);
// Particules d'appui et phrases d'appui
assert.equal(level('你好啊','你好'),'variant');
assert.equal(level('你好吗','你好'),'variant');
assert.equal(level('你认识她','你认识她吗'),'variant');
assert.equal(level('我说你好','你好'),'contains');
// Homophones à même ton : acceptés ; ton différent : refusé avec conseil
assert.equal(level('五','午'),'homophone');
for(const [h,t] of [['买','卖'],['卖东西','买东西'],['是','十']]){assert.equal(level(h,t),'tone');assert.equal(match(h,t).ok,false)}
// Pas de faux positifs
for(const [h,t] of [['大学生','大学'],['谢谢你','谢谢'],['你好','再见'],['xiexie','谢谢'],['','你好'],['你好',''],['三点','四点'],['九月十五号','五月九号'],['三十六','三十八']])
  assert.equal(match(h,t).ok,false,h+' ~ '+t);
// Toutes les alternatives du moteur sont essayées
let best=call('speechMatchAny',['三十八','36','三十六点'],['三十六']);
assert.equal(best.ok,true);assert.equal(best.heard,'36');
best=call('speechMatchAny',['买'],['卖']);assert.equal(best.level,'tone');assert.equal(best.ok,false);assert.equal(best.target,'卖');

// Pinyin : les 300 entrées HSK 1 sont lues, et tous les caractères ont une lecture
const R=vm.runInContext('HSK1_REFERENCE',ctx);
const chars=new Set();
for(const [w,py] of R){
  const cs=Array.from(w.replace(/\d+$/,'')).filter(c=>/[\u3400-\u9fff]/.test(c));cs.forEach(c=>chars.add(c));
  const ok=py.split('/').some(v=>{let s=vm.runInContext('pySplit('+JSON.stringify(v)+')',ctx);if((!s||s.length!==cs.length)&&w.endsWith('儿'))s=vm.runInContext('pySplit('+JSON.stringify(v)+',true)',ctx);return s&&s.length===cs.length});
  assert(ok,'pinyin non aligné : '+w+' ['+py+']');
}
const map=vm.runInContext('(()=>{const m=speechPinyinMap();const o={};for(const k in m)o[k]=[...m[k]];return o})()',ctx);
for(const c of chars)assert(map[c],'caractère sans lecture : '+c);

// Chaque phrase du jeu se reconnaît elle-même, même sans ponctuation
const turnsAndLines=[];
for(const n of [3,4,5,6,7,8,9,10]){vm.runInContext('EPISODE'+n+'_SCENES',ctx).forEach(s=>turnsAndLines.push(s.zh));vm.runInContext('EPISODE'+n+'_TURNS',ctx).flat().forEach(t=>turnsAndLines.push(t.zh))}
for(const line of turnsAndLines){assert.equal(level(line,line),'exact',line);assert.equal(level(line.replace(/[，。？！]/g,''),line),'exact',line)}

// Mots différents du vocabulaire : seules les équivalences voulues sont acceptées
const words=vm.runInContext('vocab',ctx).map(v=>v[0]);
const accepted=[];
for(const a of words)for(const b of words)if(a<b&&(match(a,b).ok||match(b,a).ok))accepted.push(a+'~'+b);
const expectedPairs=[['二','两'],['他们','她们'],['他','她'],['哪儿','哪里'],['那儿','那里'],['钱','前'],['这儿','这里']].map(p=>[...p].sort().join('~'));
assert.deepEqual(accepted.sort(),expectedPairs.sort(),'équivalences acceptées entre mots du vocabulaire');

// Le jeu utilise bien cette comparaison
assert(app.includes('speechMatchAny(alts,speechSceneTargets(scene))'),'speechAccepted utilise la comparaison tolérante');
assert(app.includes('speechAccepted(alts,sceneIndex)'),'validate envoie toutes les alternatives');
assert.equal(app.split('r.maxAlternatives=5').length-1,2,'cinq alternatives dans les deux exercices');
assert.equal(app.split('r.onspeechend=()=>{try{r.stop()}catch{}}').length-1,2,'arrêt à la fin de la parole');
assert(!app.includes("normalize(t)===normalize(target)"),'plus de comparaison stricte dans l’exercice de prononciation');
console.log('PASS: comparaison vocale tolérante (chiffres, particules, homophones, tons, alternatives, pinyin des 300 mots HSK 1)');
