const APP_VERSION='0.2.9';
const KEY='dragonjade-v02';const base={scene:0,xp:0,choice:{},completed:[],words:[],chars:[],discoveries:[],name:'Esmée',class:'Exploratrice'};let state;try{state={...base,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{state={...base}}let tab='aventure',speechText='',micStatus='',selected='',showPinyin=true,showTranslation=true,drawChar='你',guide=true,strokes=[],currentStroke=null,strokeStep=0,canvasMode='trace';
const scenes=[
{title:'La rue des Lanternes',speaker:'Narratrice',text:'La pluie vient de cesser sur Sheung Wan. Une lettre mystérieuse conduit Esmée jusqu’à une boutique d’antiquités. Un vieil homme lève les yeux.',zh:'你好！',py:'Nǐ hǎo!',fr:'Bonjour !',question:'Que signifie la salutation de Maître Chen ?',options:[['Bonjour !',true],['Merci !',false],['Au revoir !',false]],words:['你好'],reward:10,info:'Sheung Wan est un quartier historique de Hong Kong. On y trouve des rues commerçantes, des temples et des boutiques traditionnelles.'},
{title:'Quel est ton nom ?',speaker:'Maître Chen',text:'Chen incline la tête. « Je dois connaître le nom de celle qui cherche le Dragon de Jade. »',zh:'你叫什么名字？',py:'Nǐ jiào shénme míngzi?',fr:'Comment t’appelles-tu ?',question:'Réponds en mandarin : « Je m’appelle Esmée. »',options:[['我叫 Esmée。',true],['我很好。',false],['谢谢。',false]],words:['我','叫','名字'],reward:15,info:'À Hong Kong, le cantonais est largement utilisé au quotidien. Notre aventure enseigne le mandarin standard, en présentant aussi des particularités locales.'},
{title:'Le médaillon de jade',speaker:'Lóng',text:'Une boîte s’entrouvre. Un petit dragon vert apparaît dans un éclat de lumière. « Esmée, tu dois apprendre à écrire mon nom ! »',zh:'龙',py:'Lóng',fr:'Dragon',question:'Quel caractère signifie « dragon » en chinois simplifié ?',options:[['龙',true],['人',false],['山',false]],words:['龙'],reward:15,info:'龙 est le caractère simplifié de « dragon » ; la forme traditionnelle 龍 reste utilisée à Hong Kong. Les dragons chinois sont des figures culturelles aux significations multiples.'},
{title:'Le thé des secrets',speaker:'Maître Chen',text:'Chen verse du thé dans deux petites tasses. Il observe Esmée et lui pose une question.',zh:'你喝茶吗？',py:'Nǐ hē chá ma?',fr:'Bois-tu du thé ?',question:'Comment répondre « Je bois du thé » ?',options:[['我喝茶。',true],['我叫茶。',false],['谢谢你。',false]],words:['喝','茶','吗'],reward:15,info:'Le thé occupe une place importante dans de nombreuses traditions chinoises. Les pratiques varient selon les régions et les époques.'},
{title:'La messagère sous la pluie',speaker:'Mei',text:'Une jeune messagère entre, le manteau encore humide. Elle remet un billet à Chen, puis se tourne vers Esmée.',zh:'谢谢你！',py:'Xièxie nǐ!',fr:'Merci à toi !',question:'Quelle est la bonne traduction ?',options:[['Merci à toi !',true],['Bonjour à toi !',false],['Comment vas-tu ?',false]],words:['谢谢','你'],reward:15,info:'Macao et Hong Kong sont deux régions administratives spéciales chinoises. Leur histoire et leurs langues reflètent des trajectoires distinctes.'},
{title:'La première écaille',speaker:'Lóng',text:'Le médaillon brille. « Tu connais désormais les mots de l’accueil. Pour ouvrir le sceau, retrouve la bonne expression ! »',zh:'你好，我叫 Esmée。',py:'Nǐ hǎo, wǒ jiào Esmée.',fr:'Bonjour, je m’appelle Esmée.',question:'Quelle expression permet de te présenter ?',options:[['我叫 Esmée。',true],['你喝茶吗？',false],['谢谢你。',false]],words:['我叫'],reward:30,info:'La Chine présente une très grande diversité géographique : littoraux, plaines, plateaux, déserts et chaînes de montagnes. La campagne explorera ces paysages.'}
];
const vocab=[['你','nǐ','tu, toi'],['好','hǎo','bon, bien'],['我','wǒ','je, moi'],['叫','jiào','s’appeler'],['名字','míngzi','nom'],['谢谢','xièxie','merci'],['龙','lóng','dragon'],['喝','hē','boire'],['茶','chá','thé'],['吗','ma','particule interrogative'],['你好','nǐ hǎo','bonjour'],['我叫','wǒ jiào','je m’appelle']];
const books=[['I','L’Éveil du Dragon de Jade','Hong Kong, Macao, Canton','HSK 1'],['II','Les Montagnes des Brumes','Guilin, Yunnan','HSK 2'],['III','Les Secrets de la Route de la Soie','Xi’an, Dunhuang','HSK 3'],['IV','Les Ombres de la Cité interdite','Pékin','HSK 4'],['V','Le Manuscrit des Mille Poèmes','Hangzhou, Suzhou','HSK 5'],['VI','Le Dernier Souffle du Dragon','Shanghai','HSK 6']];
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));function save(){try{state.savedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(state));return true}catch(e){console.warn('Sauvegarde impossible',e);return false}}
function saveStatus(){if(!state.savedAt)return 'Aucune sauvegarde automatique encore créée';const d=new Date(state.savedAt);return 'Sauvegarde locale : '+(Number.isNaN(d.getTime())?'disponible':d.toLocaleString('fr-FR'))}
function exportSave(){save();const blob=new Blob([JSON.stringify({format:'dragon-de-jade-save',version:1,progress:state},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='dragon-de-jade-sauvegarde.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function importSave(input){const file=input.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(data.format!=='dragon-de-jade-save'||!data.progress||!Array.isArray(data.progress.completed)||typeof data.progress.xp!=='number')throw Error('Format invalide');if(!confirm('Remplacer la progression actuelle par cette sauvegarde ?'))return;state={...base,...data.progress};save();tab='aventure';selected='';speechText='';render();alert('Sauvegarde restaurée.')}catch(e){alert('Ce fichier ne contient pas une sauvegarde Dragon de Jade valide.')}};reader.readAsText(file)}
let audioRequest=0,audioTimer=null,activeUtterance=null;
function audioMessage(message){document.querySelectorAll('.audio-status').forEach(el=>{el.textContent=message})}
function mandarinVoice(){
const voices=window.speechSynthesis.getVoices();
const tag=v=>String(v.lang).replace(/_/g,'-').toLowerCase();
return voices.find(v=>/^(zh|cmn)(-hans)?-(cn|sg)(-|$)/.test(tag(v)))||
voices.find(v=>/^(cmn)(-|$)/.test(tag(v)))||
voices.find(v=>/^(zh)(-hant)?-tw(-|$)/.test(tag(v)))||
voices.find(v=>/^(zh|zh-hans|zh-hant)$/.test(tag(v)));
}
function voiceHelp(){
const voices=window.speechSynthesis?.getVoices()||[];
const languages=[...new Set(voices.map(v=>v.lang))].join(', ')||'aucune';
const installed=window.matchMedia?.('(display-mode: standalone)').matches;
const box=updateBox();
box.innerHTML='<strong>Aide voix · V'+APP_VERSION+'</strong><p>Mode : '+(installed?'application installée':'navigateur')+'</p><p>Langues vocales proposées : '+esc(languages)+'</p><p>Mandarin détecté : '+(window.speechSynthesis&&mandarinVoice()?'oui':'non')+'</p><p>Reconnaissance vocale : '+((window.SpeechRecognition||window.webkitSpeechRecognition)?'présente':'absente')+'</p><p>Sur Android : Paramètres → recherche « Synthèse vocale » → moteur vocal → données vocales → chinois (mandarin). Les noms varient selon le téléphone. Ferme ensuite le jeu et rouvre-le.</p><p>Si le micro est actif sans transcription, vérifie Internet. En attendant, ouvre le jeu directement dans Chrome, où la voix fonctionne sur ton appareil.</p><button onclick="closeUpdate()">Fermer</button>';
}
function speak(s){
const synth=window.speechSynthesis;
if(!synth){audioMessage('La lecture vocale est indisponible dans ce navigateur.');return}
const request=++audioRequest;clearTimeout(audioTimer);synth.cancel();
function play(voice){
if(request!==audioRequest)return;
const u=new SpeechSynthesisUtterance(s);activeUtterance=u;u.lang=voice.lang;u.voice=voice;u.rate=.83;
u.onstart=()=>{if(request===audioRequest){clearTimeout(audioTimer);audioMessage('Lecture en mandarin…')}};
u.onend=()=>{if(request===audioRequest){clearTimeout(audioTimer);audioMessage('Écouter à nouveau pour répéter.');activeUtterance=null}};
u.onerror=e=>{if(request===audioRequest){clearTimeout(audioTimer);audioMessage('Lecture impossible. Vérifie la voix mandarin et le volume, puis réessaie.');activeUtterance=null}};
audioMessage('Préparation de la voix mandarin…');synth.resume();synth.speak(u);
audioTimer=setTimeout(()=>{if(request===audioRequest)audioMessage('La voix ne démarre pas. Vérifie le volume et installe une voix chinois (mandarin) dans les réglages vocaux de ton appareil.');},8000);
}
const voice=mandarinVoice();if(voice){play(voice);return}
audioMessage('Recherche d’une voix mandarin…');
const loaded=()=>{if(request!==audioRequest){synth.removeEventListener('voiceschanged',loaded);return}const v=mandarinVoice();if(v){cleanup();play(v)}};
function cleanup(){synth.removeEventListener('voiceschanged',loaded);clearTimeout(audioTimer)}
synth.addEventListener('voiceschanged',loaded);
audioTimer=setTimeout(()=>{cleanup();if(request===audioRequest)audioMessage('Aucune voix mandarin exposée par cette application. Touche « Aide voix » en haut pour voir les langues disponibles et les réglages Android.');},2000);
}
let activeRecognition=null,answerFeedback='';
function stopRecognition(){activeRecognition?.stop()}
function recognize(){
if(activeRecognition)return;
if(!window.isSecureContext){micStatus='Ouvre le jeu depuis son adresse HTTPS pour utiliser le micro.';render();return}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR){micStatus='Reconnaissance vocale indisponible ici. Essaie Chrome sur Android ou utilise le clavier.';render();return}
window.speechSynthesis?.cancel();
const r=new SR();activeRecognition=r;r.lang='zh-CN';r.interimResults=true;r.maxAlternatives=3;
micStatus='Autorise le microphone si ton navigateur le demande, puis parle en mandarin.';render();
r.onstart=()=>{micStatus='Micro actif : parle en mandarin, puis fais une pause.';render()};
r.onsoundstart=()=>{micStatus='Son détecté. Parle en mandarin, puis fais une pause.';render()};
r.onnomatch=()=>{micStatus='Du son a été reçu, mais aucune phrase reconnue. Essaie une phrase courte comme nǐ hǎo.';render()};
r.onresult=e=>{const result=e.results[e.resultIndex??0];if(!result?.[0])return;
if(!result.isFinal){micStatus='Transcription provisoire : '+result[0].transcript+' — continue ou fais une pause.';render();return}
selected='';speechText=result[0].transcript.trim();answerFeedback='';micStatus='Phrase reconnue : '+speechText+'. Appuie sur « Valider ma réponse ».';render()};
r.onerror=e=>{const errors={
'not-allowed':'Accès au micro refusé. Dans les réglages du site de ton navigateur, autorise le microphone, puis réessaie.',
'service-not-allowed':'Le service vocal est bloqué par le navigateur. Vérifie ses autorisations ou utilise le clavier.',
'audio-capture':'Micro introuvable ou occupé. Ferme les autres applications qui utilisent le micro.',
'network':'Vérifie ta connexion Internet et réessaie.',
'no-speech':'Aucune voix détectée. Rapproche-toi du micro et réessaie.',
'language-not-supported':'La reconnaissance du mandarin est indisponible sur cet appareil.',
'aborted':'Écoute arrêtée. Tu peux réessayer.'};
micStatus=errors[e.error]||'Reconnaissance indisponible ('+e.error+'). Utilise le clavier.';render()};
r.onend=()=>{activeRecognition=null;if(micStatus.startsWith('Micro actif')||micStatus.startsWith('Autorise le microphone')||micStatus.startsWith('Son détecté')||micStatus.startsWith('Transcription provisoire'))micStatus='Écoute terminée sans transcription finale. Vérifie Internet, essaie nǐ hǎo ou ouvre le jeu dans Chrome.';render()};
try{r.start()}catch{activeRecognition=null;micStatus='Impossible de démarrer le micro. Vérifie son autorisation dans les réglages du site.';render()}
}
function header(){return `<header class="top"><div class="brand"><img class="brand-icon" src="assets/icon.png" alt=""><div><strong>Dragon de Jade</strong><br><small>V${APP_VERSION} · Esmée, exploratrice</small></div></div><div><span class="pill">${state.xp} XP</span><button onclick="checkUpdate()" style="display:block;margin-top:6px;padding:5px 9px;font-size:12px">Mises à jour</button><button onclick="voiceHelp()" style="display:block;margin-top:6px;padding:5px 9px;font-size:12px">Aide voix</button></div></header>`}function nav(){return `<nav class="nav">${[['aventure','📜','Aventure'],['carnet','📖','Carnet'],['calligraphie','🖌️','Écriture'],['atlas','🗺️','Atlas'],['campagne','🐉','Livres']].map(([id,icon,name])=>`<button class="${tab===id?'active':''}" onclick="switchTab('${id}')"><span style="font-size:21px">${icon}</span>${name}</button>`).join('')}</nav>`}
function adventure(){let i=Math.min(state.scene,scenes.length-1),s=scenes[i],done=state.completed.includes(i);const speaker=s.speaker==='Narratrice'?'Maître Chen':s.speaker;const side=speaker==='Lóng'?'dragon':speaker==='Mei'?'messenger':'master';return `<div class="hero location-banner"><h1>Les Chroniques du Dragon de Jade</h1></div><main class="page"><div class="label">Livre I · Épisode 1 · Scène ${i+1}/6</div><h2>${esc(s.title)}</h2><div class="progress"><span style="width:${(state.completed.length/6)*100}%"></span></div><p class="narration">${esc(s.text)}</p><section class="comic-panel ${side}" aria-label="Dialogue illustré"><div class="speech-bubble"><div class="label">${esc(speaker)}</div><div class="han" lang="zh-CN">${esc(s.zh)}</div>${showPinyin?`<div class="pinyin">${esc(s.py)}</div>`:''}${showTranslation?`<p class="translation">${esc(s.fr)}</p>`:''}</div><img class="dialogue-art" src="assets/dialogue-v026.jpg" alt="Esmée rencontre Maître Chen, le petit dragon Lóng et la messagère Mei dans la boutique d’antiquités."></section><div class="controls dialogue-controls"><button onclick="speak('${s.zh}')">🔊 Écouter</button><button onclick="showPinyin=!showPinyin;render()">${showPinyin?'Masquer':'Afficher'} pinyin</button><button onclick="showTranslation=!showTranslation;render()">${showTranslation?'Masquer':'Afficher'} traduction</button></div><p class="audio-status small muted" role="status" aria-live="polite"></p><div class="paper"><div class="label">Défi de dialogue</div><h3>${esc(s.question)}</h3><div class="choices">${s.options.map(([a,ok],j)=>`<button class="${selected===String(j)?'selected':''}" onclick="selectAnswer('${j}')">${esc(a)}</button>`).join('')}</div><div class="rule"></div><strong>🎙️ Répondre en mandarin</strong><div class="controls"><button onclick="${activeRecognition?'stopRecognition()':'recognize()'}">${activeRecognition?'⏹ Arrêter':'🎤 Parler'}</button><button onclick="speak('${['你好！','我叫 Esmée。','龙','我喝茶。','谢谢你！','我叫 Esmée。'][i]}')">🔊 Écouter un exemple</button></div><p class="audio-status small muted" role="status" aria-live="polite"></p><input type="text" id="answer" placeholder="Réponse orale transcrite ou texte chinois" value="${esc(speechText)}" oninput="speechText=this.value"><p class="small muted">${esc(micStatus||'Touche Parler et autorise le micro. Ta voix est transcrite en texte ; le jeu ne sauvegarde aucun fichier audio. Le service vocal du navigateur peut traiter ta voix en ligne. Les tons ne sont pas évalués.')}</p>${!done?`<button class="primary" onclick="validate()">Valider ma réponse</button>`:`<div class="toast">✓ Défi terminé · ${s.reward} XP obtenus</div><button class="primary" onclick="nextScene()">${i===5?'Voir le bilan':'Scène suivante →'}</button>`}<div id="feedback" role="status" aria-live="polite">${answerFeedback}</div></div><div class="paper"><div class="label">Découverte · Culture et géographie</div><p>${esc(s.info)}</p></div>${state.scene>=6?'<div class="toast">🏆 Épisode 1 terminé ! La première écaille de jade est à toi. Les autres épisodes sont en préparation.</div>':''}</main>`}
function normalize(s){return String(s).normalize('NFKC').replace(/[\\s.,!?。，！？、:：;；'’"“”]/g,'').toLowerCase()}
function speechAccepted(answer,scene){
 const text=normalize(answer).replace(/艾斯梅|埃斯梅|艾斯美|esmee|esmé|esme|esmee/g,'esmée');
 const patterns=[
  ['你好','您好','你们好'],
  ['我叫esmée','我是esmée','我的名字叫esmée','我名字叫esmée','我叫艾斯梅','我叫埃斯梅'],
  ['龙','龍','一条龙','这是龙'],
  ['我喝茶','我要喝茶','我喜欢喝茶','喝茶'],
  ['谢谢你','谢谢','非常感谢你','多谢你'],
  ['我叫esmée','我是esmée','我的名字叫esmée']
 ];
 return patterns[scene]?.some(p=>text===normalize(p))||false;
}
function validate(){
 const sceneIndex=Math.min(state.scene,scenes.length-1),s=scenes[sceneIndex];
 const input=$('#answer'),a=(input?.value||speechText||'').trim(),idx=Number(selected);
 const good=(selected!==''&&s.options[idx]?.[1])||Boolean(a&&(normalize(a)===normalize(s.options[0][0])||speechAccepted(a,sceneIndex)));
 const f=$('#feedback');
 if(!good){
  answerFeedback='<div class="warning">Réponse entendue : <strong>'+esc(a||'(aucune transcription)')+'</strong>. Cette phrase ne correspond pas encore à la réponse attendue. Écoute le modèle et réessaie, ou choisis la bonne réponse écrite.</div>';
  if(f)f.innerHTML=answerFeedback;
  return;
 }
 if(!state.completed.includes(sceneIndex)){
  state.completed.push(sceneIndex);state.xp+=s.reward;
  s.words.forEach(w=>{if(!state.words.includes(w))state.words.push(w)});
  if(!state.discoveries.includes(s.info))state.discoveries.push(s.info);
  save();
 }
 answerFeedback='<div class="toast">✓ Réponse validée ! +'+s.reward+' XP. '+(a?'Texte reconnu accepté ; les tons ne sont pas évalués.':'')+'</div><button class="primary" onclick="nextScene()">Continuer →</button>';
 if(f)f.innerHTML=answerFeedback;
 micStatus='Réponse validée !';
}
function nextScene(){answerFeedback='';if(state.scene<5)state.scene++;else state.scene=6;selected='';speechText='';micStatus='';save();render()}function selectAnswer(i){selected=i;answerFeedback='';render()}
function carnet(){return `<div class="section-banner journal-banner"><h1>Carnet d’Esmée</h1></div><main class="page"><h2>Les mots du voyage</h2><div class="paper"><strong>Niveau RPG ${1+Math.floor(state.xp/100)}</strong><p>${state.xp} XP · ${state.words.length} mots et expressions découverts</p><div class="progress"><span style="width:${state.xp%100}%"></span></div></div><h3>Vocabulaire rencontré</h3>${vocab.filter(v=>state.words.includes(v[0])||state.words.some(w=>w.includes(v[0]))).map(v=>`<div class="paper"><strong style="font-size:28px">${v[0]}</strong> · ${v[1]} · ${v[2]} <button onclick="speak('${v[0]}')">🔊</button></div>`).join('')||'<p>Les mots apparaîtront après tes premières quêtes.</p>'}<div class="paper"><h3>Ma sauvegarde de partie</h3><p>${esc(saveStatus())}</p><p class="small muted">La progression est sauvegardée automatiquement sur cet appareil. Pour conserver une copie ou changer de téléphone, exporte un fichier puis importe-le dans le jeu sur l'autre appareil.</p><div class="controls"><button onclick="exportSave()">💾 Télécharger ma sauvegarde</button><label class="button" style="display:inline-block;padding:10px;border:1px solid #aaa;border-radius:8px;cursor:pointer">📂 Restaurer une sauvegarde<input type="file" accept=".json,application/json" style="display:none" onchange="importSave(this)"></label></div><div class="rule"></div><h3>Progression HSK</h3><p>Le référentiel HSK sert de cadre pédagogique. Cette démo n’attribue pas encore de niveau officiel et ne prétend pas couvrir les listes certifiées.</p></div></main>`}
const charData={'你':['nǐ','tu, toi',7,['丿','丨','丿','㇖','亅','丿','㇏']],'好':['hǎo','bon, bien',6,['𡿨','丿','一','㇇','亅','一']],'我':['wǒ','je, moi',7,['丿','一','亅','㇀','㇂','丿','丶']],'龙':['lóng','dragon',5,['一','丿','乚','丿','丶']]};function calligraphy(){let d=charData[drawChar];return `<div class="art-banner writing-banner"><span>L’encre et le jade</span><h1>Atelier de calligraphie</h1></div><main class="page"><h2>Le geste du pinceau</h2><p>Trace au doigt ou au stylet. Observe le modèle et travaille trait par trait.</p><div class="charrow">${Object.keys(charData).map(c=>`<button class="${c===drawChar?'active':''}" onclick="chooseChar('${c}')">${c}</button>`).join('')}</div><div class="paper"><div class="han" style="text-align:center">${drawChar}</div><div style="text-align:center">${d[0]} · ${d[1]} · ${d[2]} traits</div><div class="steps">${d[3].map((t,i)=>`<span class="${i===strokeStep?'current':''}">${i+1}. ${t}</span>`).join('')}</div><p class="small muted">Guide de tracé : ${strokeStep+1}/${d[2]}. Les indications de forme et l’ordre exact devront être vérifiés avec une source calligraphique spécialisée avant l’évaluation automatique.</p><div class="drawing-wrap">${guide?`<div class="ghost">${drawChar}</div>`:''}<canvas id="drawing" width="660" height="660" aria-label="Zone de dessin tactile"></canvas></div><div class="controls"><button onclick="guide=!guide;render()">${guide?'Masquer':'Afficher'} modèle</button><button onclick="clearDrawing()">Effacer</button><button onclick="undoStroke()">Annuler trait</button><button onclick="strokeStep=(strokeStep+1)%charData[drawChar][2];render()">Trait suivant →</button></div><button class="primary" onclick="finishWriting()">Enregistrer mon entraînement</button><div id="writefeedback" class="small muted">Cette version enregistre le geste, mais ne valide pas automatiquement la forme ni l’ordre des traits.</div></div><div class="paper"><h3>Leçon culturelle</h3><p>Le caractère 你 contient le radical 亻, associé à la personne. Dans 你好, il est suivi de 好 : ensemble, les deux caractères forment une salutation courante.</p></div></main>`}
function initCanvas(){let c=$('#drawing');if(!c)return;let ctx=c.getContext('2d');ctx.strokeStyle='#272722';ctx.lineWidth=11;ctx.lineCap='round';ctx.lineJoin='round';function redraw(){ctx.clearRect(0,0,c.width,c.height);ctx.strokeStyle='#272722';ctx.lineWidth=11;ctx.lineCap='round';ctx.lineJoin='round';strokes.forEach(points=>{if(!points.length)return;ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);points.forEach(p=>ctx.lineTo(p.x,p.y));ctx.stroke()})}redraw();function p(e){let r=c.getBoundingClientRect();return{x:(e.clientX-r.left)*c.width/r.width,y:(e.clientY-r.top)*c.height/r.height}}c.onpointerdown=e=>{e.preventDefault();c.setPointerCapture(e.pointerId);currentStroke=[p(e)];strokes.push(currentStroke);redraw()};c.onpointermove=e=>{if(!currentStroke)return;currentStroke.push(p(e));redraw()};c.onpointerup=c.onpointercancel=()=>{currentStroke=null};function clear(){strokes=[];redraw()}window.clearDrawing=clear;window.undoStroke=()=>{strokes.pop();redraw()}}
function chooseChar(c){drawChar=c;strokes=[];strokeStep=0;render()}function finishWriting(){if(!strokes.length){$('#writefeedback').textContent='Trace au moins un trait pour enregistrer ton essai.';return}if(!state.chars.includes(drawChar))state.chars.push(drawChar);save();$('#writefeedback').textContent='Essai enregistré dans ta progression. La vérification calligraphique automatique sera ajoutée ultérieurement.'}
function atlas(){return `<div class="section-banner atlas-banner"><h1>Atlas d’Esmée</h1></div><main class="page"><h2>Terres et découvertes</h2><div class="paper"><h3>Première escale : Hong Kong</h3><p>Hong Kong se situe sur la côte sud de la Chine, près de l’estuaire de la rivière des Perles. Notre aventure débute dans le quartier de Sheung Wan.</p><p>🌏 Coordonnées approximatives : 22,3° N · 114,2° E</p><button onclick="window.open('https://www.openstreetmap.org/#map=10/22.30/114.17','_blank')">Ouvrir la carte réelle ↗</button></div><div class="paper"><h3>Repères géographiques</h3><p>Hong Kong · Macao · Canton (Guangzhou) · delta de la rivière des Perles.</p><p class="small muted">La carte détaillée interactive du jeu reste à développer.</p></div><h3>Découvertes débloquées</h3>${state.discoveries.map(t=>`<div class="paper">${esc(t)}</div>`).join('')||'<p>Explore l’épisode pour remplir ton atlas.</p>'}</main>`}
function campagne(){return `<main class="page"><div class="campaign-seal"><img src="assets/icon512.png" alt="Emblème du Dragon de Jade"><div><div class="label">Les Chroniques du Dragon de Jade</div><h2>La grande campagne</h2></div></div><p>Six livres prévus, douze chapitres par livre. Le premier épisode du Livre I est jouable dans cette démo.</p>${books.map((b,i)=>`<div class="paper"><div class="label">Livre ${b[0]} · ${b[3]}</div><h3>${b[1]}</h3><p>${b[2]}</p><span class="pill">${i===0?'Épisode 1 jouable':'À écrire'}</span></div>`).join('')}<div class="warning">La progression HSK devra être reliée aux listes officielles vérifiées avant la production complète.</div></main>`}
function render(){const body={aventure:adventure,carnet,calligraphie:calligraphy,atlas,campagne}[tab]();$('#app').innerHTML=header()+body+nav();if(tab==='calligraphie')initCanvas()}function switchTab(t){tab=t;selected='';render();window.scrollTo(0,0)}render();
let updateRegistration=null,acceptingUpdate=false;
function updateBox(){let box=document.getElementById('update-box');if(!box){box=document.createElement('aside');box.id='update-box';box.setAttribute('role','status');box.style.cssText='position:fixed;top:12px;left:50%;transform:translateX(-50%);width:min(94%,600px);z-index:50;background:#fffaf0;color:#24443a;border:2px solid #b79b65;border-radius:12px;padding:18px;box-shadow:0 8px 35px #0005';document.body.appendChild(box)}box.hidden=false;return box}
function closeUpdate(){document.getElementById('update-box').hidden=true}
function offerUpdate(){
const worker=updateRegistration?.waiting;if(!worker)return;
const channel=new MessageChannel();
channel.port1.onmessage=event=>{channel.port1.close();const release=event.data;if(release.version===APP_VERSION)return;
updateBox().innerHTML='<strong>Version '+esc(release.version)+' disponible</strong><p>'+esc(release.notes)+'</p><p>Ta progression est conservée. La page sera rechargée ; termine ton dessin avant de valider.</p><div class="controls"><button class="primary" onclick="acceptUpdate()">Valider la mise à jour</button><button onclick="closeUpdate()">Plus tard</button></div>'};
worker.postMessage({type:'GET_VERSION'},[channel.port2]);
}
async function checkUpdate(){
const box=updateBox();box.textContent='Version actuelle : '+APP_VERSION+'. Recherche de mise à jour…';
try{if(!updateRegistration){box.textContent='Les mises à jour ne sont pas disponibles dans ce navigateur.';return}
await updateRegistration.update();
if(updateRegistration.waiting){offerUpdate();return}
box.innerHTML='<p>Version actuelle : '+APP_VERSION+'. '+(updateRegistration.installing?'Une mise à jour se prépare. Elle te sera proposée dès qu’elle sera prête.':'Aucune mise à jour prête pour le moment.')+'</p><button onclick="closeUpdate()">Fermer</button>';
}catch{box.innerHTML='<p>Impossible de vérifier les mises à jour. Vérifie ta connexion et réessaie.</p><button onclick="closeUpdate()">Fermer</button>'}
}
function acceptUpdate(){if(!updateRegistration?.waiting)return;save();acceptingUpdate=true;updateBox().textContent='Installation de la mise à jour…';updateRegistration.waiting.postMessage({type:'SKIP_WAITING'})}
if('serviceWorker'in navigator){
navigator.serviceWorker.addEventListener('controllerchange',()=>{if(acceptingUpdate)window.location.reload()});
navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(reg=>{
updateRegistration=reg;
function watch(worker){if(!worker)return;worker.addEventListener('statechange',()=>{if(worker.state==='installed')offerUpdate()})}
watch(reg.installing);reg.addEventListener('updatefound',()=>watch(reg.installing));offerUpdate();
}).catch(()=>{});
}

