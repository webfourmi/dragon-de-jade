/* Test de vocabulaire : plusieurs types d'exercices, distracteurs proches, reprise des erreurs.
   Remplace startQuiz / showQuiz / answerQuiz (les variables quizItems, quizIndex, quizScore,
   quizAnswered, quizChoice, quizTheme, quizCount restent déclarées dans app.js). */
const QUIZ_KINDS=['zh-fr','fr-zh','pinyin','listen'];
const QUIZ_LABELS={'zh-fr':'Chinois → français','fr-zh':'Français → chinois','pinyin':'Prononciation et tons','listen':'Écoute'};
const QUIZ_QUESTIONS={'zh-fr':'Quelle est la traduction ?','fr-zh':'Comment l’écrit-on en chinois ?','pinyin':'Quelle est la bonne prononciation (tons) ?','listen':'Qu’as-tu entendu ? Choisis la traduction.'};
let quizMode='mix',quizMissed=[];

const TONE_MARKS={a:'āáǎà',e:'ēéěè',i:'īíǐì',o:'ōóǒò',u:'ūúǔù','ü':'ǖǘǚǜ'};
const TONE_LOOKUP=(()=>{const m={};Object.keys(TONE_MARKS).forEach(v=>Array.from(TONE_MARKS[v]).forEach((ch,i)=>{m[ch]={v,tone:i}}));return m})();
const HAS_TONE=/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/;

/* Variantes d'un pinyin où un seul ton change : c'est le piège classique. */
function toneVariants(py){
  const chars=Array.from(String(py).normalize('NFC')),out=new Set();
  chars.forEach((ch,idx)=>{const info=TONE_LOOKUP[ch];if(!info)return;
    for(let t=0;t<4;t++){if(t===info.tone)continue;const c=chars.slice();c[idx]=Array.from(TONE_MARKS[info.v])[t];out.add(c.join(''))}});
  return shuffleWords([...out]);
}

/* Plus deux mots se ressemblent (thème, épisode, caractère commun, longueur), plus ils sont de bons pièges. */
function quizSimilarity(a,b){
  let s=0;const ta=wordThemes[a[0]];
  if(ta&&ta===wordThemes[b[0]])s+=3;
  const ea=episodeOfWord(a[0]);if(ea&&ea===episodeOfWord(b[0]))s+=2;
  if(Array.from(a[0]).some(ch=>b[0].includes(ch)))s+=2;
  if(Array.from(a[0]).length===Array.from(b[0]).length)s+=1;
  return s+Math.random()*2;
}

function quizDistractors(v,labelOf,count){
  const seen=new Set([labelOf(v)]),out=[];
  const learned=learnedWords().filter(w=>w[0]!==v[0]),known=new Set(learned.map(w=>w[0]));
  const rest=vocab.filter(w=>w[0]!==v[0]&&!known.has(w[0]));
  const ranked=learned.map(w=>[quizSimilarity(v,w),w]).sort((x,y)=>y[0]-x[0]).map(x=>x[1]);
  for(const w of [...ranked,...shuffleWords(rest)]){
    const l=labelOf(w);if(!l||seen.has(l))continue;
    seen.add(l);out.push(l);if(out.length>=count)break;
  }
  return out;
}

function buildQuizItem(v,kind){
  if(kind==='pinyin'&&!HAS_TONE.test(String(v[1]).normalize('NFC')))kind='zh-fr';/* ton neutre : pas d'exercice de tons */
  const labelOf={'zh-fr':w=>w[2],'fr-zh':w=>w[0],'pinyin':w=>w[1],'listen':w=>w[2]}[kind];
  let wrong;
  if(kind==='pinyin'){
    wrong=toneVariants(v[1]).slice(0,3);
    if(wrong.length<3)wrong=wrong.concat(quizDistractors(v,labelOf,3-wrong.length));
  }else wrong=quizDistractors(v,labelOf,3);
  const correct=labelOf(v);
  return{word:v[0],kind,correct,choices:shuffleWords([correct,...wrong])};
}

function quizKindsAvailable(){
  const voice=!!(window.speechSynthesis&&window.SpeechSynthesisUtterance&&mandarinVoice());
  return voice?QUIZ_KINDS:QUIZ_KINDS.filter(k=>k!=='listen');
}

function startQuiz(words){
  const pool=Array.isArray(words)?words:learnedWords().filter(v=>quizTheme==='all'||(quizTheme==='selection'?state.reviewSelected.includes(v[0]):wordThemes[v[0]]===quizTheme));
  if(!pool.length){alert('Aucun mot appris pour ce thème.');return}
  if(quizMode==='listen'&&!quizKindsAvailable().includes('listen')){alert('Aucune voix mandarin détectée sur cet appareil : l’exercice d’écoute est indisponible. Touche « Aide voix » dans l’en-tête pour la configurer.');return}
  const n=Array.isArray(words)?words.length:quizCount,kinds=quizKindsAvailable();
  let list=[];while(list.length<n)list.push(...shuffleWords(pool));
  quizItems=list.slice(0,n).map(v=>buildQuizItem(v,quizMode==='mix'?kinds[Math.floor(Math.random()*kinds.length)]:quizMode));
  quizIndex=0;quizScore=0;quizAnswered=false;quizChoice=-1;quizMissed=[];showQuiz();
}

function quizRetryMissed(){
  const words=vocab.filter(v=>quizMissed.includes(v[0]));
  if(words.length)startQuiz(words);
}

function showQuiz(){
  const item=quizItems[quizIndex];
  let el=document.getElementById('quiz-overlay');
  if(!el){el=document.createElement('div');el.id='quiz-overlay';el.className='profile-overlay';document.body.appendChild(el)}
  const close="document.getElementById('quiz-overlay').remove()";
  if(!item){
    const missed=vocab.filter(v=>quizMissed.includes(v[0]));
    el.innerHTML='<section class="profile-sheet revision-sheet"><h2>Résultat du test</h2><p class="revision-word">'+quizScore+' / '+quizItems.length+'</p>'
      +(missed.length?'<p>À revoir :</p><ul class="quiz-missed">'+missed.map(v=>'<li><span class="zh">'+esc(v[0])+'</span> '+esc(v[1])+' · '+esc(v[2])+'</li>').join('')+'</ul><button class="primary" onclick="quizRetryMissed()">Rejouer mes erreurs</button>':'<p>🎉 Sans faute !</p>')
      +'<button onclick="'+close+'">Retour au carnet</button></section>';
    return;
  }
  const v=vocab.find(w=>w[0]===item.word)||[item.word,'',''];
  const correctIndex=item.choices.indexOf(item.correct);
  const prompt={
    'zh-fr':'<p class="han revision-word">'+esc(item.word)+'</p><button onclick="speak(quizItems[quizIndex].word)">🔊 Écouter</button>',
    'fr-zh':'<p class="revision-answer">'+esc(v[2])+'</p>',
    'pinyin':'<p class="han revision-word">'+esc(item.word)+'</p><button onclick="speak(quizItems[quizIndex].word)">🔊 Écouter</button>',
    'listen':'<button class="primary quiz-listen" onclick="speak(quizItems[quizIndex].word)">🔊 Écouter</button>'
  }[item.kind];
  const zh=item.kind==='fr-zh'?' zh':'';
  const buttons=item.choices.map((c,i)=>{
    const cls=quizAnswered?(i===correctIndex?'ok':(i===quizChoice?'ko':'')):'';
    return '<button class="'+cls+zh+'" '+(quizAnswered?'disabled':'')+' onclick="answerQuiz('+i+')">'+esc(c)+'</button>';
  }).join('');
  const reveal=quizAnswered
    ?'<p>'+(quizChoice===correctIndex?'✓ Bonne réponse !':'✗ Réponse : '+esc(item.correct))+'</p>'
      +'<p class="small muted"><span class="zh">'+esc(v[0])+'</span> · '+esc(v[1])+' · '+esc(v[2])+'</p>'
      +'<button class="primary" onclick="quizIndex++;quizAnswered=false;quizChoice=-1;showQuiz()">'+(quizIndex===quizItems.length-1?'Voir le résultat':'Question suivante →')+'</button>'
    :'';
  el.innerHTML='<section class="profile-sheet revision-sheet" role="dialog" aria-modal="true"><button class="profile-close" onclick="'+close+'">✕</button>'
    +'<h2>Question '+(quizIndex+1)+' / '+quizItems.length+'</h2><p class="small muted">'+esc(QUIZ_LABELS[item.kind])+'</p>'
    +prompt+'<p>'+esc(QUIZ_QUESTIONS[item.kind])+'</p><div class="quiz-choices">'+buttons+'</div>'+reveal+'</section>';
  if(item.kind==='listen'&&!quizAnswered)setTimeout(()=>speak(item.word),250);
}

function answerQuiz(i){
  if(quizAnswered)return;
  const item=quizItems[quizIndex],ok=item.choices[i]===item.correct;
  quizChoice=i;quizAnswered=true;
  if(ok)quizScore++;else if(!quizMissed.includes(item.word))quizMissed.push(item.word);
  rateWord(item.word,ok);
  showQuiz();
}
