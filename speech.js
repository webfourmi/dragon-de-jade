/* Reconnaissance vocale : comparaison tolérante entre ce que le navigateur a entendu et la réponse attendue.
   Le navigateur renvoie des caractères, jamais des tons : on les retrouve ici à partir du pinyin du jeu.
   Niveaux d'une comparaison :
     exact      mêmes caractères après normalisation (chiffres, ponctuation, 儿, homophones sans enjeu)
     variant    seule une particule d'appui diffère (你好 / 你好吗)
     contains   la bonne réponse est dans une courte phrase d'appui (我说你好)
     homophone  caractères différents mais même prononciation, tons compris (他 / 她)
     tone       mêmes syllabes mais un ton diffère (买 / 卖) : refusé, avec un conseil
     none       rien de commun
   Les alternatives du moteur sont toutes essayées (speechMatchAny). */

let speechAlternatives=[];

const SPEECH_PUNCT=/[\s.,!?。，！？、:：;；'’"“”«»()（）\[\]【】《》「」…~·\-—–_]/g;
/* Caractères que le moteur confond sans que cela change la prononciation ni le sens pour un débutant. */
const SPEECH_HOMOPHONES={'她':'他','它':'他','嘛':'吗','得':'的','地':'的','再':'在','作':'做','两':'二'};
const SPEECH_ERHUA=[['一点儿','一点'],['哪儿','哪里'],['那儿','那里'],['这儿','这里'],['面条儿','面条']];
const SPEECH_FILL='嗯呃哦啊呀吧呢吗嘛';
const SPEECH_CARRIERS=['我说','我读','我念','说','读','念'];
const SPEECH_RANK={exact:5,variant:4,homophone:3,contains:3,tone:1,none:0};

function speechNumToChinese(n){
  const d='零一二三四五六七八九';
  if(n<10)return d[n];
  if(n>=100000)return String(n).split('').map(x=>d[x]).join('');
  const units=['','十','百','千','万'],s=String(n);let out='',zero=false;
  for(let i=0;i<s.length;i++){
    const v=+s[i],u=units[s.length-1-i];
    if(v===0){zero=true;continue}
    if(zero){out+='零';zero=false}
    if(!(v===1&&u==='十'&&i===0))out+=d[v];
    out+=u;
  }
  return out;
}
/* Forme canonique : ce qui ne change ni les mots ni la prononciation est gommé. */
function speechCanon(text){
  let t=String(text).normalize('NFKC').toLowerCase().replace(SPEECH_PUNCT,'');
  t=t.replace(/\d+/g,m=>speechNumToChinese(Number(m)));
  for(const [a,b] of SPEECH_ERHUA)t=t.split(a).join(b);
  t=t.replace(/^一十/,'十');
  return Array.from(t).map(c=>SPEECH_HOMOPHONES[c]||c).join('');
}
function speechStripFill(s){return s.replace(new RegExp('^['+SPEECH_FILL+']+|['+SPEECH_FILL+']+$','g'),'')}

/* ---- Pinyin : lecture des caractères à partir des données du jeu ---- */
const PY_TONES={};
[['aāáǎà'],['eēéěè'],['iīíǐì'],['oōóǒò'],['uūúǔù'],['vǖǘǚǜ']].forEach(([s])=>Array.from(s).slice(1).forEach((c,i)=>{PY_TONES[c]=[s[0],i+1]}));
const PY_RE=new RegExp('^(?:(?:zh|ch|sh|[bpmfdtnlgkhjqxrzcsyw])?(?:iang|iong|uang|ueng|ang|eng|ing|ong|ian|iao|uai|uan|van|vn|ia|ie|iu|ua|uo|ui|un|ue|ve|ai|ei|ao|ou|an|en|in|er|a|o|e|i|u|v))');
function pyPrepare(py){
  let bases='';const tones=[];
  for(const ch of String(py).normalize('NFC').toLowerCase()){
    if(/['’\-\s]/.test(ch))continue;
    const m=PY_TONES[ch];
    if(m){bases+=m[0];tones.push(m[1])}else{bases+=ch==='ü'?'v':ch;tones.push(0)}
  }
  return {bases,tones};
}
function pySplit(py,erhua){
  let {bases,tones}=pyPrepare(py);const out=[];let i=0,tail=false;
  if(erhua&&bases.length>1&&bases.endsWith('r')){bases=bases.slice(0,-1);tones=tones.slice(0,-1);tail=true}
  while(i<bases.length){
    if(bases.slice(i)==='r'){out.push({base:'r',tone:0});break}
    const m=PY_RE.exec(bases.slice(i));
    if(!m||!m[0].length)return null;
    out.push({base:m[0],tone:Math.max(0,...tones.slice(i,i+m[0].length))});
    i+=m[0].length;
  }
  if(tail)out.push({base:'r',tone:0});
  return out;
}
let speechPyCache=null,speechPyKey='';
/* Associe à chaque caractère connu ses lectures possibles ('ni3', 'hao3'…). Reconstruit si le vocabulaire change. */
function speechPinyinMap(){
  const entries=[];
  if(typeof vocab!=='undefined')vocab.forEach(v=>entries.push([v[0],v[1]]));
  if(typeof HSK1_REFERENCE!=='undefined')HSK1_REFERENCE.forEach(r=>entries.push([r[0],r[1]]));
  const key=entries.length+':'+(typeof vocab!=='undefined'?vocab.length:0);
  if(speechPyCache&&speechPyKey===key)return speechPyCache;
  const map={},add=(c,r)=>{(map[c]=map[c]||new Set()).add(r)};
  for(const [word,py] of entries){
    const chars=Array.from(word.replace(/\d+$/,'')).filter(c=>/[\u3400-\u9fff]/.test(c));
    for(const variant of String(py).split('/')){
      let syl=pySplit(variant);
      if((!syl||syl.length!==chars.length)&&word.endsWith('儿'))syl=pySplit(variant,true);
      if(!syl||syl.length!==chars.length)continue;
      chars.forEach((c,i)=>add(c,syl[i].base==='r'?'r0':syl[i].base+syl[i].tone));
    }
  }
  add('儿','er2');
  speechPyCache=map;speechPyKey=key;return map;
}
/* 'homophone' : toutes les syllabes concordent, tons compris (ton neutre compatible avec tous) ; 'tone' : syllabes sans les tons ; null sinon. */
function speechPinyinCompare(h,t){
  const A=Array.from(h),B=Array.from(t);
  if(A.length!==B.length)return null;
  const map=speechPinyinMap();let toned=true;
  for(let i=0;i<A.length;i++){
    if(A[i]===B[i])continue;
    const ra=map[A[i]],rb=map[B[i]];
    if(!ra||!rb)return null;
    let base=false,ok=false;
    for(const a of ra)for(const b of rb){
      if(a.slice(0,-1)!==b.slice(0,-1))continue;
      base=true;
      const ta=+a.slice(-1),tb=+b.slice(-1);
      if(ta===tb||ta===0||tb===0)ok=true;
    }
    if(!base)return null;
    if(!ok)toned=false;
  }
  return toned?'homophone':'tone';
}

/* ---- Comparaison ---- */
function speechMatch(heard,target){
  const h=speechCanon(heard),t=speechCanon(target);
  if(!h||!t)return {ok:false,level:'none'};
  if(h===t)return {ok:true,level:'exact'};
  const hs=speechStripFill(h),ts=speechStripFill(t);
  if(hs&&hs===ts)return {ok:true,level:'variant'};
  if(ts.length>=2)for(const c of SPEECH_CARRIERS)
    if(hs.startsWith(c)&&speechStripFill(hs.slice(c.length))===ts)return {ok:true,level:'contains'};
  const p=speechPinyinCompare(hs||h,ts||t);
  if(p==='homophone')return {ok:true,level:'homophone'};
  if(p==='tone')return {ok:false,level:'tone'};
  return {ok:false,level:'none'};
}
/* Essaie toutes les alternatives contre toutes les réponses acceptables et garde le meilleur résultat. */
function speechMatchAny(alternatives,targets){
  let best={ok:false,level:'none',heard:'',target:''};
  for(const h of alternatives)if(h)for(const t of targets){
    const m=speechMatch(h,t);m.heard=h;m.target=t;
    if(SPEECH_RANK[m.level]>SPEECH_RANK[best.level])best=m;
  }
  if(!best.heard&&alternatives[0])best.heard=alternatives[0];
  return best;
}

/* ---- Messages ---- */
function speechLevelNote(m){
  return ({variant:' (particule finale ignorée)',contains:' (ta phrase contenait la bonne réponse)',homophone:' (même prononciation que « '+m.target+' »)'})[m.level]||'';
}
function speechSceneTargets(i){return scenes[i].options.filter(o=>o[1]).map(o=>heroAnswer(o[0]))}
function speechExtra(alts,i){
  if(!alts||!alts[0])return '';
  const m=speechMatchAny(alts,speechSceneTargets(i)),others=alts.slice(1,4).filter(x=>x&&x!==alts[0]);
  let out='';
  if(others.length)out+=' · autres lectures : '+others.map(esc).join(' / ');
  if(m.level==='tone')out+=' · Presque ! Les syllabes sont bonnes, mais un ton diffère de « '+esc(m.target)+' ». Écoute le modèle et réessaie';
  return out;
}
function speechSuccessNote(alts,i){
  const m=speechMatchAny(alts,speechSceneTargets(i));
  return 'Texte reconnu accepté'+speechLevelNote(m)+' ; le navigateur n’évalue pas les tons.';
}
