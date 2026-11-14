/* Hanzi Writer guided calligraphy, additive module. */
const HZ_URL=c=>'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/'+encodeURIComponent(c)+'.json';
let hzWriter=null,hzDone=0,hzTotal=0,hzErrors=0,hzHints=0,hzFinished=false,writeMode='trace',writingTestResults=[],hzSession=0;
function hzAvailable(){return typeof HanziWriter!=='undefined'}
function hzStats(){return state.writingStats||(state.writingStats={})}
function writingBadge(c){let x=hzStats()[c];return x&&x.mastered?'<small class="wbadge" title="Réussi sans aide">★</small>':x&&x.trained?'<small class="wbadge">✓</small>':''}
function writingInfo(c){let d=writingDetails[c];if(d)return d[0]+' · '+d[1];let v=vocab.find(v=>v[0]===c);return v?v[1]+' · '+v[2]:''}
function writingStudio(){
 let c=drawChar,mode=writingTest?'memory':writeMode,stats=hzStats()[c]||{};
 if(!hzAvailable())return '<div class="paper"><p>Vérification des traits indisponible hors connexion avant le premier chargement. Dessin libre disponible.</p><div class="drawing-wrap"><canvas id="drawing" width="660" height="660"></canvas></div><div class="controls"><button onclick="clearDrawing()">Effacer</button><button onclick="undoStroke()">Annuler</button></div><p id="writefeedback">Entraînement libre, non évalué.</p>'+(writingTest?'<button onclick="nextWritingTest()">Passer ce caractère</button>':'<button onclick="finishWriting()">Enregistrer l’entraînement</button>')+'</div>';
 return '<div class="paper writing-studio"><div class="han" style="text-align:center">'+(writingTest?'？':esc(c))+'</div><p style="text-align:center">'+(writingTest?'Question '+(writingTestIndex+1)+' / '+writingTestItems.length:esc(writingInfo(c)))+'</p>'+(writingTest?'':'<div class="write-modes">'+[['watch','▶ Voir'],['trace','✍️ Guidé'],['memory','🧠 Mémoire']].map(x=>'<button class="'+(mode===x[0]?'active':'')+'" onclick="setWriteMode(\''+x[0]+'\')">'+x[1]+'</button>').join('')+'</div>')+'<div id="hanzi-target" class="hanzi-target"></div><div id="stroke-dots" class="stroke-dots"></div><p id="writefeedback" aria-live="polite">Trace les traits dans l’ordre.</p><div class="controls"><button onclick="initWriting()">↻ Recommencer</button>'+(mode==='watch'?'':'<button onclick="writingHint()">💡 Indice</button>')+'</div>'+(writingTest?'<button onclick="writingReveal=true;render()">Voir le modèle</button><button class="primary" onclick="nextWritingTest()">Caractère suivant →</button>':'')+'<p class="small muted">'+(stats.mastered||0)+' sans faute · '+(stats.trained||0)+' avec aide ou erreurs</p><button onclick="preloadHanzi()">⬇️ Télécharger les caractères hors ligne</button><p id="hz-preload" class="small muted"></p></div>';
}
function setWriteMode(m){if(!['watch','trace','memory'].includes(m))return;writeMode=m;render()}
function hzFeedback(s){let e=document.getElementById('writefeedback');if(e)e.textContent=s}
function hzDots(){let e=document.getElementById('stroke-dots');if(e)e.textContent=hzTotal?hzDone+' / '+hzTotal+' traits':''}
function initWriting(){
 if(!hzAvailable()){initCanvas();return}
 let e=document.getElementById('hanzi-target');if(!e)return;
 const session=++hzSession;try{hzWriter?.cancelQuiz()}catch(_){}
 hzFinished=false;hzDone=0;hzTotal=0;hzErrors=0;hzHints=0;
 let mode=writingTest?(writingReveal?'watch':'memory'):writeMode;
 let side=Math.max(200,Math.min(330,e.parentElement.clientWidth-18));e.style.width=e.style.height=side+'px';
 hzWriter=HanziWriter.create(e,drawChar,{width:side,height:side,padding:14,showOutline:mode!=='memory',showCharacter:mode==='watch',strokeColor:'#272722',outlineColor:'#d9cdb2',drawingColor:'#1d5149',highlightColor:'#2a6856',onLoadCharDataSuccess:d=>{if(session!==hzSession)return;hzTotal=d.strokes.length;hzDots()},onLoadCharDataError:()=>{if(session!==hzSession)return;hzFeedback('Données de traits indisponibles : connecte-toi ou télécharge les caractères.')} });
 if(mode==='watch'){hzWriter.animateCharacter({onComplete:()=>hzFeedback('Animation terminée. Passe en mode Guidé.')});return}
 hzWriter.quiz({leniency:1.2,showHintAfterMisses:mode==='trace'?2:3,onCorrectStroke:d=>{if(session!==hzSession)return;hzDone=d.strokeNum+1;hzDots()},onMistake:d=>{if(session!==hzSession)return;hzErrors=d.totalMistakes;hzFeedback('Réessaie le trait '+(d.strokeNum+1)+' · '+hzErrors+' erreur(s).')},onComplete:d=>{if(session===hzSession)hzComplete(d.totalMistakes)}});
}
function writingHint(){if(!hzWriter||hzFinished)return;try{hzWriter.highlightStroke(hzDone);hzHints++;hzFeedback('Indice utilisé pour le trait '+(hzDone+1))}catch(_){}}
function hzComplete(errors){
 if(hzFinished)return;hzFinished=true;let c=drawChar,n=(errors||0)+hzHints+(writingTest&&writingReveal?1:0),s=hzStats()[c]||{trained:0,mastered:0};
 s.trained++;if(n===0)s.mastered++;s.lastMistakes=n;hzStats()[c]=s;
 if(!state.chars.includes(c))state.chars.push(c);state.writingSessions++;save();
 if(writingTest)writingTestResults[writingTestIndex]={character:c,mastered:n===0,mistakes:n};
 hzFeedback(n===0?'✓ '+c+' : réussi sans aide !':'✓ '+c+' terminé avec '+n+' erreur(s) ou indice(s). À retravailler.');
}
async function preloadHanzi(){
 let el=document.getElementById('hz-preload');if(!el)return;
 let chars=[...new Set([...vocab.map(v=>v[0])].join('').split('').filter(c=>/[\u3400-\u9fff]/.test(c)))];
 if(!navigator.serviceWorker?.controller){el.textContent='Recharge la page avant le téléchargement.';return}
 let ok=0,failed=0;for(let c of chars){try{let r=await fetch(HZ_URL(c));if(r.ok)ok++;else failed++}catch(_){failed++}if((ok+failed)%10===0)el.textContent=(ok+failed)+' / '+chars.length}
 el.textContent=ok+' caractères téléchargés'+(failed?' · '+failed+' échec(s)':'');
}
