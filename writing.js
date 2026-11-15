/* Atelier de calligraphie : tracé validé trait par trait.
   Bibliothèque : Hanzi Writer 3.7.2 (MIT), chargée depuis jsDelivr dans index.html.
   Données de traits : hanzi-writer-data 2.0.1 (Make Me a Hanzi, licence Arphic), chargées à la demande
   et mises en cache par sw.js pour le hors-ligne. */
const HZ_DATA_URL=c=>'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/'+encodeURIComponent(c)+'.json';
const HZ_CJK=/[\u3400-\u9fff]/;
let hzWriter=null,hzStrokes=0,hzDone=0,hzMistakes=0,hzHints=0,hzFinished=false,writeMode='trace';

function hzAvailable(){return typeof HanziWriter!=='undefined'}
function hzStats(){state.writingStats=state.writingStats||{};return state.writingStats}

/* Ce que l'on sait du caractère : pinyin et sens du caractère seul, sinon un mot qui le contient. */
function writingInfo(c){
  const d=typeof writingDetails!=='undefined'?writingDetails[c]:null;
  if(d)return{py:d[0],fr:d[1],tip:d[4]||'',ctx:null};
  const exact=vocab.find(v=>v[0]===c);
  if(exact)return{py:exact[1],fr:exact[2],tip:'',ctx:null};
  const w=vocab.find(v=>v[0].includes(c));
  return w?{py:'',fr:'',tip:'',ctx:{zh:w[0],py:w[1],fr:w[2]}}:{py:'',fr:'',tip:'',ctx:null};
}
function writingBadge(c){const s=hzStats()[c];if(!s||!s.ok)return'';return '<small class="wbadge" title="Tracé réussi sans erreur">'+(s.ok>=3?'★':'✓')+'</small>'}

function writingStudio(){
  const c=drawChar,info=writingInfo(c),testHidden=writingTest&&!writingReveal;
  if(!hzAvailable())return writingFallback(c,info,testHidden);
  const mode=writingTest?(writingReveal?'watch':'memory'):writeMode;
  const ctx=info.ctx?'<div>'+(testHidden?'':'<span class="han-inline">'+esc(info.ctx.zh)+'</span> ')+esc(info.ctx.py)+' · '+esc(info.ctx.fr)+'</div>':'';
  const own=info.py||info.fr?'<div>'+esc(info.py)+(info.py&&info.fr?' · ':'')+esc(info.fr)+'</div>':'';
  const modes=writingTest?'':'<div class="write-modes" role="group" aria-label="Mode d’écriture">'
    +[['watch','▶ Voir'],['trace','✍️ Guidé'],['memory','🧠 Mémoire']].map(m=>'<button class="'+(writeMode===m[0]?'active':'')+'" onclick="setWriteMode(\''+m[0]+'\')">'+m[1]+'</button>').join('')+'</div>';
  const modeHelp={watch:'Regarde l’ordre des traits, puis passe en mode guidé.',trace:'Trace chaque trait dans l’ordre sur le modèle pâle. Après 2 erreurs, le trait attendu s’éclaire.',memory:'Aucun modèle : écris le caractère de mémoire, trait par trait. Chaque erreur ou indice compte.'}[mode];
  return '<div class="paper writing-studio"><div class="han" style="text-align:center">'+(testHidden?'？':esc(c))+'</div>'
    +(writingTest?'<p class="small muted" style="text-align:center">Question '+(writingTestIndex+1)+' / '+writingTestItems.length+'</p>':'')
    +'<div class="small" style="text-align:center">'+own+ctx+'</div>'
    +(info.tip&&!testHidden?'<p class="small muted" style="text-align:center">'+esc(info.tip)+'</p>':'')
    +modes
    +'<div id="hanzi-target" class="hanzi-target" aria-label="Zone d’écriture"></div>'
    +'<div class="steps stroke-dots" id="stroke-dots"></div>'
    +'<div id="writefeedback" class="small muted" aria-live="polite">'+esc(modeHelp)+'</div>'
    +'<div class="controls">'
    +(mode==='watch'?'<button onclick="initWriting()">↻ Rejouer</button>':'<button onclick="initWriting()">↻ Recommencer</button><button onclick="writingHint()">💡 Indice</button>')
    +'</div>'
    +(writingTest?(writingReveal?'':'<button onclick="writingReveal=true;render()">Voir le modèle</button>')+'<button class="primary" onclick="nextWritingTest()">Caractère suivant →</button>':'')
    +'<p class="small muted">'+hzProgressLine(c)+'</p>'
    +'<div class="controls"><button onclick="preloadHanzi()">⬇️ Télécharger les caractères pour le hors-ligne</button></div>'
    +'<div id="hz-preload" class="small muted"></div></div>';
}

function hzProgressLine(c){const s=hzStats()[c];return s?'Tes essais sur '+esc(c)+' : '+(s.ok||0)+' sans erreur · '+(s.ko||0)+' avec erreurs.':'Pas encore d’essai validé sur '+esc(c)+'.'}

/* Repli si Hanzi Writer n'a pas pu être chargé (hors ligne dès la première visite) : ancien dessin libre. */
function writingFallback(c,info,testHidden){
  return '<div class="paper"><div class="han" style="text-align:center">'+(testHidden?'？':esc(c))+'</div>'
    +'<p class="small muted">La vérification des traits n’est pas disponible : la bibliothèque n’a pas pu être chargée. Connecte-toi une fois, puis recharge la page. En attendant, tu peux t’entraîner librement.</p>'
    +'<div class="drawing-wrap">'+(guide&&(!writingTest||writingReveal)?'<div class="ghost">'+esc(c)+'</div>':'')+'<canvas id="drawing" width="660" height="660" aria-label="Zone de dessin tactile"></canvas></div>'
    +'<div class="controls"><button onclick="guide=!guide;render()">'+(guide?'Masquer':'Afficher')+' modèle</button><button onclick="clearDrawing()">Effacer</button><button onclick="undoStroke()">Annuler trait</button></div>'
    +(writingTest?'<button onclick="writingReveal=true;render()">Voir le modèle</button><button class="primary" onclick="nextWritingTest()">Caractère suivant →</button>':'<button class="primary" onclick="finishWriting()">Enregistrer mon entraînement</button>')
    +'<div id="writefeedback" class="small muted"></div></div>';
}

function setWriteMode(m){writeMode=m;render()}
function hzFeedback(t){const el=document.getElementById('writefeedback');if(el)el.textContent=t}
function hzDots(){const el=document.getElementById('stroke-dots');if(!el)return;el.innerHTML=hzStrokes?Array.from({length:hzStrokes},(_,i)=>'<span class="'+(i<hzDone?'done':'')+'">'+(i+1)+'</span>').join(''):''}

function initWriting(){
  if(!hzAvailable()){initCanvas();return}
  const el=document.getElementById('hanzi-target');if(!el)return;
  try{if(hzWriter)hzWriter.cancelQuiz()}catch(e){}
  el.innerHTML='';hzDone=0;hzMistakes=0;hzHints=0;hzFinished=false;hzStrokes=0;hzDots();
  const mode=writingTest?(writingReveal?'watch':'memory'):writeMode;
  const side=Math.max(200,Math.floor(Math.min(340,(el.parentElement.clientWidth||340)-8)));
  el.style.width=el.style.height=side+'px';
  hzWriter=HanziWriter.create(el,drawChar,{
    width:side,height:side,padding:14,
    showOutline:mode!=='memory',showCharacter:mode==='watch',
    strokeColor:'#272722',outlineColor:'#d9cdb2',highlightColor:'#2a6856',drawingColor:'#1d5149',drawingWidth:9,
    strokeAnimationSpeed:1,delayBetweenStrokes:300,
    onLoadCharDataSuccess:data=>{hzStrokes=data&&data.strokes?data.strokes.length:0;hzDots()},
    onLoadCharDataError:()=>hzFeedback('Ce caractère n’est pas encore disponible hors ligne. Connecte-toi une fois, ou utilise « Télécharger les caractères ».')
  });
  if(mode==='watch'){
    hzWriter.animateCharacter({onComplete:()=>{hzDone=hzStrokes;hzDots();hzFeedback('Ordre des traits terminé. Passe en mode « Guidé » pour le tracer à ton tour.')}});
    return;
  }
  hzFeedback(mode==='trace'?'À toi : trace le premier trait.':'Écris de mémoire : premier trait.');
  hzWriter.quiz({
    leniency:1.2,showHintAfterMisses:mode==='trace'?2:3,highlightOnComplete:true,
    onCorrectStroke:d=>{hzDone=hzStrokes?hzStrokes-d.strokesRemaining:d.strokeNum+1;hzDots();hzFeedback('✓ Trait '+hzDone+(hzStrokes?' / '+hzStrokes:'')+(d.mistakesOnStroke?' (avec '+d.mistakesOnStroke+' erreur'+(d.mistakesOnStroke>1?'s':'')+')':''))},
    onMistake:d=>{hzMistakes=d.totalMistakes;hzFeedback('✗ Pas tout à fait pour le trait '+(d.strokeNum+1)+'. Réessaie. Erreurs : '+d.totalMistakes)},
    onComplete:s=>hzComplete(s.totalMistakes)
  });
}

function writingHint(){
  if(!hzWriter||hzFinished)return;
  try{hzWriter.highlightStroke(hzDone);hzHints++;hzFeedback('💡 Indice utilisé (il compte comme une erreur). Trait attendu : '+(hzDone+1))}catch(e){hzFeedback('Indice indisponible pour le moment.')}
}

function hzComplete(apiMistakes){
  if(hzFinished)return;hzFinished=true;
  const c=drawChar,total=(apiMistakes||0)+hzHints,stats=hzStats(),s=stats[c]||{ok:0,ko:0,mistakes:0};
  total===0?s.ok++:s.ko++;s.mistakes+=total;
  const day=localDay(),first=s.day!==day;s.day=day;stats[c]=s;
  if(!state.chars.includes(c))state.chars.push(c);
  state.writingSessions++;recordLesson();
  const gain=first?(total===0?3:1):0;state.xp+=gain;
  save();
  hzFeedback((total===0?'🎉 Parfait : '+c+' sans aucune erreur !':'Bien joué ! '+total+' erreur'+(total>1?'s':'')+' ou indice'+(total>1?'s':'')+'. Recommence pour le tracer sans faute.')+(gain?' +'+gain+' XP':''));
}

/* Précharge les données de traits de tous les caractères HSK 1 pour jouer hors ligne (via le cache de sw.js). */
async function preloadHanzi(){
  const out=document.getElementById('hz-preload');if(!out)return;
  const words=[...vocab.map(v=>v[0]),...(typeof HSK1_EPISODE_WORDS!=='undefined'?HSK1_EPISODE_WORDS.flat():[])];
  const chars=[...new Set(Array.from(words.join('')).filter(ch=>HZ_CJK.test(ch)))];
  if(!navigator.serviceWorker||!navigator.serviceWorker.controller){out.textContent='Recharge la page une fois (installation hors-ligne en cours), puis relance le téléchargement.';return}
  let done=0,fail=0;const queue=[...chars];
  out.textContent='Téléchargement… 0 / '+chars.length;
  async function worker(){while(queue.length){const c=queue.shift();try{const r=await fetch(HZ_DATA_URL(c));if(!r.ok)fail++}catch(e){fail++}done++;if(done%10===0||done===chars.length)out.textContent='Téléchargement… '+done+' / '+chars.length}}
  await Promise.all([worker(),worker(),worker(),worker()]);
  out.textContent=fail?('Terminé : '+(chars.length-fail)+' caractères prêts, '+fail+' à réessayer (connexion).'):'✓ '+chars.length+' caractères disponibles hors ligne.';
}
