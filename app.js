const APP_VERSION='0.16.0';
const KEY='dragonjade-v02';const base={scene:0,xp:0,choice:{},completed:[],words:[],chars:[],discoveries:[],name:'Esmée',class:'Exploratrice',attempts:{},skipped:[],activity:{},speechSuccess:0,writingSessions:0,wordDates:{},reviewSelected:[],reviewSchedule:{},introSeen:false,heroPortrait:'heros'};let state;try{state={...base,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{state={...base}}state.attempts=state.attempts||{};state.skipped=state.skipped||[];state.activity=state.activity||{};state.speechSuccess=state.speechSuccess||0;state.writingSessions=state.writingSessions||0;state.wordDates=state.wordDates||{};state.reviewSelected=state.reviewSelected||[];state.reviewSchedule=state.reviewSchedule||{};state.heroPortrait=['heros','heros-garcon'].includes(state.heroPortrait)?state.heroPortrait:'heros';let tab='aventure',speechText='',micStatus='',selected='',showPinyin=true,showTranslation=true,drawChar='你',guide=true,strokes=[],currentStroke=null,strokeStep=0,canvasMode='trace';
const scenes=[
  {
    "title": "La rue des Lanternes",
    "speaker": "Maître Chen",
    "text": "Tu arrives à Pékin après avoir reçu en France une lettre signée Maître Chen. Dans une boutique d’un hutong près de la tour du Tambour, le vieil antiquaire reconnaît aussitôt le dragon gravé sur ton pendentif. Il s'incline et te salue : « 你好 ! » Tu réponds, encore hésitant. Chen ferme discrètement les volets : « Nous devons parler. »",
    "zh": "你好！您好！",
    "py": "Nǐ hǎo! Nín hǎo!",
    "fr": "Bonjour ! Bonjour (respectueux) !",
    "question": "Comment réponds-tu poliment à Maître Chen ?",
    "options": [
      [
        "你好！",
        true
      ],
      [
        "再见！",
        false
      ],
      [
        "谢谢！",
        false
      ]
    ],
    "words": [
      "你好",
      "你",
      "好",
      "您"
    ],
    "reward": 10,
    "info": "Les hutongs sont les ruelles traditionnelles de Pékin. Beaucoup longent les murs des siheyuan, des maisons organisées autour d'une cour. En les parcourant, on découvre un Pékin résidentiel très différent des grandes avenues.",
    "grammar": "你好 est une salutation. 您好 (nín hǎo) est plus respectueux. Écoute la différence entre nǐ (3e ton) et nín (2e ton)."
  },
  {
    "title": "Le nom sur l’enveloppe",
    "speaker": "Maître Chen",
    "text": "Chen déplie ta lettre et compare le sceau à la gravure du jade. « 你叫什么名字？ » demande-t-il. Quand tu te présentes, il ouvre un vieux registre : ton nom y figure, d’une encre bien plus fraîche que celle des lignes voisines. « Je n’ai jamais écrit ce nom », murmure-t-il. Il n’a fait que suivre une enveloppe anonyme, arrivée avec ton adresse et ce sceau. Qui a préparé ta venue ?",
    "zh": "你叫什么名字？我叫 Esmée。",
    "py": "Nǐ jiào shénme míngzi? Wǒ jiào Esmée.",
    "fr": "Comment t'appelles-tu ? Je m'appelle Esmée.",
    "question": "Quelle phrase permet de donner ton nom ?",
    "options": [
      [
        "我叫 Esmée。",
        true
      ],
      [
        "你是谁？",
        false
      ],
      [
        "再见。",
        false
      ]
    ],
    "words": [
      "我",
      "叫",
      "名字",
      "什么"
    ],
    "reward": 15,
    "info": "Les portes des anciennes maisons à cour intérieure cachent souvent la vie de la famille derrière un mur d'enceinte. Dans un siheyuan, les pièces s'ouvrent vers une cour commune, lieu de rencontre et de vie quotidienne.",
    "grammar": "我叫 + prénom : « Je m’appelle… ». 你叫什么名字？ : « Comment t’appelles-tu ? » Le nom du personnage est automatiquement remplacé par le tien."
  },
  {
    "title": "La gardienne du seuil",
    "speaker": "Mei",
    "text": "Un bruit de pas interrompt Chen. Mei, la messagère, entre avec une photographie ancienne. Elle voit ton jade et pâlit : « 这是谁？ » demande-t-elle en montrant un homme sur le cliché. Chen répond : « 这是陈先生 », son grand-père, qui gardait avant lui les archives de la famille de Mei. Depuis des mois, elle cherche la personne qui a effacé leurs noms.",
    "zh": "这是谁？这是陈先生。",
    "py": "Zhè shì shéi? Zhè shì Chén xiānsheng.",
    "fr": "Qui est-ce ? C'est monsieur Chen.",
    "question": "Comment Mei peut-elle désigner monsieur Chen ?",
    "options": [
      [
        "这位先生。",
        true
      ],
      [
        "谢谢人。",
        false
      ],
      [
        "我叫人。",
        false
      ]
    ],
    "words": [
      "谁",
      "是",
      "人",
      "先生"
    ],
    "reward": 15,
    "info": "La tour du Tambour et la tour de la Cloche, à Pékin, annonçaient autrefois les heures de la ville avec leurs tambours et leur cloche. Elles dominent encore les ruelles des hutongs voisins.",
    "grammar": "谁 = « qui ? » ; 是 = « être ». La phrase 他是谁？ utilise un pronom que tu retrouveras plus tard. On peut aussi dire 这是谁？ : « Qui est-ce ? »."
  },
  {
    "title": "Le pacte de jade",
    "speaker": "Maître Chen",
    "text": "Mei tend la main vers ton pendentif pour le comparer au dessin du registre. Tu le retires d’instinct. « 对不起 », souffle-t-elle. Tu réponds « 没关系 ». Chen s’avance avec précaution : « 请问… », puis te demande si tu l’autorises à approcher ta pièce d’une boîte de laque verrouillée, héritée de son grand-père. Tu acceptes. La serrure n’a pas de clé, seulement un creux, exactement de la forme de ton jade.",
    "zh": "对不起。没关系。请问。",
    "py": "Duìbuqǐ. Méi guānxi. Qǐngwèn.",
    "fr": "Pardon. Ce n'est pas grave. Excusez-moi, une question…",
    "question": "Que répond-on à quelqu’un qui dit « 对不起 » ?",
    "options": [
      [
        "没关系。",
        true
      ],
      [
        "再见。",
        false
      ],
      [
        "你叫什么名字？",
        false
      ]
    ],
    "words": [
      "对不起",
      "没关系",
      "请",
      "请问"
    ],
    "reward": 15,
    "info": "Dans la culture chinoise, le jade est depuis très longtemps associé à la pureté et à la vertu. On le sculpte en pendentifs, en disques ou en objets rituels, et on le transmet parfois de génération en génération.",
    "grammar": "请 + verbe : « s’il vous plaît… ». 请问 : « Excusez-moi, puis-je demander… ? ». 对不起 : « pardon » ; 没关系 : « ce n’est pas grave »."
  },
  {
    "title": "Les témoins du dragon",
    "speaker": "Mei",
    "text": "Chen glisse ton pendentif dans le creux. Une lueur verte traverse la pièce et une minuscule créature apparaît, éblouie : Lóng s’écrie « 大家好 ! ». Sur le couvercle, une inscription a été grattée ; il ne reste lisible que son premier signe, « 这 », « ceci ». Le dragon le reconnaît et se met à parler français, la langue que ton jade a entendue ces dernières décennies. Il explique qu’une autre écaille a été cachée parmi les archives de la famille disparue, et que chaque mot appris lui rendra un peu de mémoire.",
    "zh": "大家好！这是龙。",
    "py": "Dàjiā hǎo! Zhè shì Lóng.",
    "fr": "Bonjour à tous ! Voici Lóng.",
    "question": "Que signifie « 大家好 » ?",
    "options": [
      [
        "Bonjour à tous !",
        true
      ],
      [
        "Au revoir à tous !",
        false
      ],
      [
        "Quel est ton nom ?",
        false
      ]
    ],
    "words": [
      "大家",
      "女士",
      "吗",
      "这"
    ],
    "reward": 15,
    "info": "Les dragons de jade ne sont pas une invention du jeu : des sculptures en jade représentant des dragons existent depuis le Néolithique chinois. La culture de Hongshan a laissé de remarquables dragons au corps enroulé. Lóng, lui, appartient à notre fiction.",
    "grammar": "大家好 ! signifie « Bonjour à tous ! ». 这 = « ceci ». 你好吗？ veut dire « Comment vas-tu ? ». 女士 est un titre de politesse."
  },
  {
    "title": "La première écaille",
    "speaker": "Lóng",
    "text": "Avant de partir chercher les archives, tu remercies Mei : « 谢谢 ». Elle répond « 不客气 ». Chen te tend une carte et te dit « 再见 ». Sur le dos de Lóng, une première écaille s’allume d’un vert plus vif : un mot appris, un souvenir retrouvé. Il murmure « 认识 », le mot qui lui rappelle une rencontre oubliée. La carte désigne un ancien registre de familles ; une photographie y porte le même symbole que ton jade.",
    "zh": "谢谢！不客气！再见！",
    "py": "Xièxie! Bú kèqi! Zàijiàn!",
    "fr": "Merci ! De rien ! Au revoir !",
    "question": "Comment remercies-tu Mei avant de partir ?",
    "options": [
      [
        "谢谢！",
        true
      ],
      [
        "没关系！",
        false
      ],
      [
        "请问！",
        false
      ]
    ],
    "words": [
      "谢谢",
      "再见",
      "不客气",
      "认识"
    ],
    "reward": 30,
    "info": "Dans les traditions chinoises, le dragon est notamment associé à la pluie et à l'eau. Des représentations anciennes témoignent de ce lien avec les rites demandant de bonnes récoltes. Notre carte enchantée s'inspire de cet imaginaire, sans être une légende traditionnelle précise.",
    "grammar": "谢谢 → 不客气 : « merci » → « de rien ». 再见 signifie « au revoir ». 认识 peut servir à dire « ravi de faire votre connaissance » dans une phrase plus longue."
  }
];
scenes.push(...EPISODE2_SCENES,...EPISODE3_SCENES,...EPISODE4_SCENES,...EPISODE5_SCENES,...EPISODE6_SCENES,...EPISODE7_SCENES,...EPISODE8_SCENES,...EPISODE9_SCENES,...EPISODE10_SCENES);
const SCENE_DIALOGUE_TURNS=[[{"speaker":"Maître Chen","zh":"你好！","fr":"Bonjour !"},{"speaker":"Vous","zh":"您好！","fr":"Bonjour (formule respectueuse) !"}],[{"speaker":"Maître Chen","zh":"你叫什么名字？","fr":"Comment t'appelles-tu ?"},{"speaker":"Vous","zh":"我叫 Esmée。","fr":"Je m'appelle Esmée."}],[{"speaker":"Mei","zh":"这是谁？","fr":"Qui est-ce ?"},{"speaker":"Maître Chen","zh":"这是陈先生。","fr":"C'est monsieur Chen."}],[{"speaker":"Mei","zh":"对不起。","fr":"Pardon."},{"speaker":"Vous","zh":"没关系。","fr":"Ce n'est pas grave."},{"speaker":"Maître Chen","zh":"请问。","fr":"Excusez-moi, puis-je demander…"}],[{"speaker":"Lóng","zh":"大家好！","fr":"Bonjour à tous !"},{"speaker":"Maître Chen","zh":"这是龙。","fr":"Voici Lóng."}],[{"speaker":"Vous","zh":"谢谢！","fr":"Merci !"},{"speaker":"Mei","zh":"不客气！","fr":"De rien !"},{"speaker":"Maître Chen","zh":"再见！","fr":"Au revoir !"}],[{"speaker":"Maître Chen","zh":"这是爸爸和妈妈。","fr":"Voici le père et la mère."}],[{"speaker":"Mei","zh":"这是我的哥哥和姐姐。","fr":"Voici mon grand frère et ma grande sœur."}],[{"speaker":"Lóng","zh":"他是谁？","fr":"Qui est-il ?"},{"speaker":"Mei","zh":"她是谁？","fr":"Qui est-elle ?"}],[{"speaker":"Maître Chen","zh":"他们是孩子。","fr":"Ce sont des enfants."}],[{"speaker":"Mei","zh":"他是男朋友。","fr":"Il est le petit ami."},{"speaker":"Maître Chen","zh":"她是女朋友。","fr":"Elle est la petite amie."}],[{"speaker":"Lóng","zh":"她几岁？","fr":"Quel âge a-t-elle ?"}]];
SCENE_DIALOGUE_TURNS.push(...EPISODE3_TURNS,...EPISODE4_TURNS,...EPISODE5_TURNS,...EPISODE6_TURNS,...EPISODE7_TURNS,...EPISODE8_TURNS,...EPISODE9_TURNS,...EPISODE10_TURNS);
function sceneTurns(i,s){return SCENE_DIALOGUE_TURNS[i]||[{speaker:s.speaker,zh:s.zh,fr:s.fr}]}
function renderDialogueTurn(t,j){const speakerName=t.speaker==='Vous'?state.name:t.speaker;const extra=typeof EXTRA_SPEAKERS!=='undefined'&&EXTRA_SPEAKERS[t.speaker];const side=extra?'guest':t.speaker==='Lóng'?'dragon':t.speaker==='Mei'?'messenger':t.speaker==='Vous'?'player':'master';const avatar=extra?extra.avatar:side==='dragon'?'🐉':side==='messenger'?'👩🏻':side==='player'?'🧭':'👴🏻';const portrait=side==='dragon'?'long':side==='messenger'?'mei':side==='player'?state.heroPortrait:'maitre-chen';return `<div class="character-stage"><div class="character-portrait ${side}" aria-hidden="true">${extra?'':`<img class="character-avatar portrait-watercolor" src="assets/${portrait}.webp" alt="" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'inline\'">`}<span class="portrait-fallback" style="display:${extra?'inline':'none'}">${avatar}</span><span class="character-caption">${esc(speakerName)}</span></div><div class="character-speech"><div class="label">${esc(speakerName)} parle <button class="turn-audio" onclick="speakSceneTurn(${j})" aria-label="Écouter ${esc(speakerName)}">🔊</button></div><div class="han han-dialogue" lang="zh-CN">${chineseText(heroText(t.zh))}</div>${showTranslation?`<p class="translation">${esc(heroText(t.fr))}</p>`:''}</div></div>`}

const vocab=[["你好","nǐ hǎo","bonjour"],["你","nǐ","tu, toi"],["好","hǎo","bien, bon"],["您","nín","vous (poli)"],["我","wǒ","je, moi"],["叫","jiào","s’appeler"],["名字","míngzi","nom"],["什么","shénme","quoi, quel"],["谁","shéi/shuí","qui"],["是","shì","être"],["人","rén","personne"],["先生","xiānsheng","monsieur"],["对不起","duìbuqǐ","pardon, désolé"],["没关系","méi guānxi","ce n’est pas grave"],["请","qǐng","s’il vous plaît"],["请问","qǐngwèn","excusez-moi, puis-je demander"],["大家","dàjiā","tout le monde"],["这","zhè","ce, ceci"],["谢谢","xièxie","merci"],["再见","zàijiàn","au revoir"],["不客气","bú kèqi","de rien"],["认识","rènshi","connaître, faire connaissance"],["吗","ma","particule interrogative"],["女士","nǚshì","madame"]];
vocab.push(...EPISODE2_VOCAB,...EPISODE3_VOCAB,...EPISODE4_VOCAB,...EPISODE5_VOCAB,...EPISODE6_VOCAB,...EPISODE7_VOCAB,...EPISODE8_VOCAB,...EPISODE9_VOCAB,...EPISODE10_VOCAB);
const books=[['I','L’Éveil du Dragon de Jade','Pékin, Tianjin, Xi’an','HSK 1 · objectif 300 mots'],['II','Les Montagnes des Brumes','Guilin, Yunnan','HSK 2'],['III','Les Secrets de la Route de la Soie','Xi’an, Dunhuang','HSK 3'],['IV','Les Ombres de la Cité interdite','Pékin','HSK 4'],['V','Le Manuscrit des Mille Poèmes','Hangzhou, Suzhou','HSK 5'],['VI','Le Dernier Souffle du Dragon','Shanghai','HSK 6']];
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));function save(){try{state.savedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(state));return true}catch(e){console.warn('Sauvegarde impossible',e);return false}}
function saveStatus(){if(!state.savedAt)return 'Aucune sauvegarde automatique encore créée';const d=new Date(state.savedAt);return 'Sauvegarde locale : '+(Number.isNaN(d.getTime())?'disponible':d.toLocaleString('fr-FR'))}
function exportSave(){save();const blob=new Blob([JSON.stringify({format:'dragon-de-jade-save',version:1,progress:state},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='dragon-de-jade-sauvegarde.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function importSave(input){const file=input.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(data.format!=='dragon-de-jade-save'||!data.progress||!Array.isArray(data.progress.completed)||typeof data.progress.xp!=='number')throw Error('Format invalide');if(!confirm('Remplacer la progression actuelle par cette sauvegarde ?'))return;stopGameMic();resetSceneInput();jadeGame=null;openBookEpisode=0;bookSection='parcours';state={...base,...data.progress};restoreBookProgress();save();tab='aventure';selected='';speechText='';speechAlternatives=[];render();alert('Sauvegarde restaurée.')}catch(e){alert('Ce fichier ne contient pas une sauvegarde Dragon de Jade valide.')}};reader.readAsText(file)}
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
function speak(s){playMandarinTurns([{speaker:'Vous',zh:String(s)}])}
function playMandarinTurns(turns){
 const synth=window.speechSynthesis;
 if(!synth||!window.SpeechSynthesisUtterance){audioMessage('Synthèse vocale indisponible dans ce navigateur.');return}
 const request=++audioRequest;clearTimeout(audioTimer);
 try{synth.cancel()}catch(e){}
 const styles={'Maître Chen':{rate:.82,pitch:.9},'Mei':{rate:.87,pitch:1.08},'Lóng':{rate:.9,pitch:1.12},'Vous':{rate:.85,pitch:1},'La patronne':{rate:.85,pitch:1.05},'Le vendeur':{rate:.95,pitch:.95},'Monsieur Wu':{rate:.8,pitch:.85},'La guichetière':{rate:.9,pitch:1.1},'Le gardien':{rate:.8,pitch:.9},'La voisine':{rate:.85,pitch:1.05}};
 let index=0,started=false;
 function playNext(){
  if(request!==audioRequest)return;
  if(index>=turns.length){activeUtterance=null;clearTimeout(audioTimer);audioMessage('Écoute terminée.');return}
  const turn=turns[index++],style=styles[turn.speaker]||styles['Vous'];
  const u=new SpeechSynthesisUtterance(heroText(turn.zh));
  const voice=mandarinVoice();u.lang='zh-CN';if(voice)u.voice=voice;
  u.rate=style.rate;u.pitch=style.pitch;activeUtterance=u;
  u.onstart=()=>{if(request===audioRequest){started=true;clearTimeout(audioTimer);audioMessage('🔊 '+turn.speaker+' · '+index+'/'+turns.length)}};
  u.onend=()=>{if(request===audioRequest)playNext()};
  u.onerror=e=>{if(request===audioRequest){clearTimeout(audioTimer);activeUtterance=null;audioMessage('Lecture impossible ('+(e.error||'erreur vocale')+'). Essaie dans Chrome ou ouvre Aide voix.')}};
  try{synth.speak(u);synth.resume()}catch(e){audioMessage('Erreur de synthèse vocale : '+e.message);return}
  audioTimer=setTimeout(()=>{if(request===audioRequest&&!started){audioMessage('La lecture tarde à démarrer. Vérifie la voix mandarin dans Aide voix.')}},7000);
 }
 audioMessage('Préparation de la lecture…');playNext();
}
let activeRecognition=null,answerFeedback='';
function stopRecognition(){activeRecognition?.stop()}
function recognizedFrench(phrase){
 const clean=speechCanon(phrase);
 if(!clean)return '';
 if(['我叫','我是','我的名字叫','我名字叫'].some(prefix=>clean.startsWith(normalize(prefix))))return 'Je m’appelle…';
 const turns=scenes.flatMap((scene,i)=>sceneTurns(i,scene));
 const turn=turns.find(t=>speechCanon(heroText(t.zh))===clean);
 if(turn)return heroText(turn.fr);
 const entry=vocab.find(v=>speechCanon(v[0])===clean);
 if(entry)return entry[2];
 const scene=scenes.find(sc=>speechCanon(heroText(sc.zh))===clean);
 return scene?heroText(scene.fr):'';
}
function recognize(){
if(activeRecognition)return;
if(!window.isSecureContext){micStatus='Ouvre le jeu depuis son adresse HTTPS pour utiliser le micro.';render();return}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR){micStatus='Reconnaissance vocale indisponible ici. Essaie Chrome sur Android ou utilise le clavier.';render();return}
window.speechSynthesis?.cancel();
const r=new SR();activeRecognition=r;r.lang='zh-CN';r.interimResults=true;r.maxAlternatives=5;r.onspeechend=()=>{try{r.stop()}catch{}};
micStatus='Autorise le microphone si ton navigateur le demande, puis parle en mandarin.';render();
r.onstart=()=>{micStatus='Micro actif : parle en mandarin, puis fais une pause.';render()};
r.onsoundstart=()=>{micStatus='Son détecté. Parle en mandarin, puis fais une pause.';render()};
r.onnomatch=()=>{micStatus='Du son a été reçu, mais aucune phrase reconnue. Essaie une phrase courte comme nǐ hǎo.';render()};
r.onresult=e=>{const result=e.results[e.resultIndex??0];if(!result?.[0])return;
if(!result.isFinal){micStatus='Transcription provisoire : '+result[0].transcript+' — continue ou fais une pause.';render();return}
selected='';speechAlternatives=Array.from(result).map(x=>x.transcript.trim()).filter(Boolean);speechText=speechAlternatives[0]||'';answerFeedback='';const french=recognizedFrench(speechText);micStatus='Phrase reconnue : '+speechText+(speechAlternatives.length>1?' (autres lectures : '+speechAlternatives.slice(1,4).join(' / ')+')':'')+(french?' · Traduction : '+french:' · Traduction non disponible pour cette transcription.')+'. Appuie sur « Valider ma réponse ».';render()};
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
function localDay(d=new Date()){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function recordLesson(){const day=localDay();state.activity[day]=(state.activity[day]||0)+1}
function openProfile(){let old=document.getElementById('profile-overlay');if(old)old.remove();const days=Object.keys(state.activity).sort().reverse(),today=localDay(),total=Object.values(state.activity).reduce((a,b)=>a+b,0),week=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-i);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}).reduce((n,k)=>n+(state.activity[k]||0),0);
const count=state.completed.length,skips=state.skipped.length,writing=state.chars.length;
const el=document.createElement('div');el.id='profile-overlay';el.className='profile-overlay';el.innerHTML=`<section class="profile-sheet" role="dialog" aria-modal="true" aria-labelledby="profile-title"><button class="profile-close" onclick="closeProfile()" aria-label="Fermer">✕</button><div class="profile-heading"><img src="assets/dragon-icon.svg" alt=""><div><div class="label">Carnet de l'aventurière</div><h2 id="profile-title">Fiche de personnage</h2></div></div><label for="hero-name">Nom du personnage</label><div class="profile-name"><input id="hero-name" maxlength="36" value="${esc(state.name)}" aria-label="Nom du personnage"><button onclick="saveProfileName()">Enregistrer</button></div><p class="small muted">${esc(state.class)} · Niveau RPG ${1+Math.floor(state.xp/100)}</p><div class="profile-character"><div class="profile-portrait hero-profile-portrait" role="img" aria-label="Portrait du personnage" style="background-image:url('assets/${state.heroPortrait}.webp')"></div><div class="profile-character-info"><div class="hero-avatar-choices"><strong>Choisir mon portrait</strong><div class="hero-avatar-options"><button type="button" class="${state.heroPortrait==='heros'?'active':''}" onclick="chooseHeroPortrait('heros')" aria-pressed="${state.heroPortrait==='heros'}"><img src="assets/heros.webp" alt="" onerror="this.style.display='none'">Fille</button><button type="button" class="${state.heroPortrait==='heros-garcon'?'active':''}" onclick="chooseHeroPortrait('heros-garcon')" aria-pressed="${state.heroPortrait==='heros-garcon'}"><img src="assets/heros-garcon.webp" alt="" onerror="this.style.display='none'">Garçon</button></div></div><div class="profile-rank">Apprenti du Dragon de Jade</div><div class="profile-xp-track"><span style="width:${state.xp%100}%"></span></div><small>${state.xp%100} / 100 XP avant le prochain niveau</small></div></div><div class="profile-stats"><div><strong>${state.xp}</strong><small>XP gagnés</small></div><div><strong>${count}</strong><small>Défis réussis</small></div><div><strong>${skips}</strong><small>Défis passés</small></div><div><strong>${state.words.length}</strong><small>Mots découverts</small></div></div><h3>Apprentissage</h3><div class="profile-metrics"><p>🎧 Réponses orales réussies : <strong>${state.speechSuccess}</strong></p><p>🖌️ Caractères travaillés : <strong>${writing}</strong></p><p>✍️ Séances de calligraphie : <strong>${state.writingSessions}</strong></p><p>📖 Scènes parcourues : <strong>${count+skips} / ${scenes.length}</strong></p></div><h3>Activité quotidienne</h3><div class="profile-stats"><div><strong>${state.activity[today]||0}</strong><small>Aujourd'hui</small></div><div><strong>${week}</strong><small>7 derniers jours</small></div><div><strong>${total}</strong><small>Leçons suivies*</small></div></div><div class="profile-history">${days.slice(0,14).map(d=>`<div><span>${esc(d)}</span><strong>${state.activity[d]} leçon(s)</strong></div>`).join('')||'<p>Aucune leçon datée pour le moment.</p>'}</div><p class="small muted">* Une leçon correspond ici à une scène terminée, réussie ou passée. Le suivi quotidien commence avec cette mise à jour ; les anciennes scènes ne peuvent pas être datées rétroactivement.</p><button onclick="closeProfile()">Retour à l'aventure</button></section>`;document.body.appendChild(el);el.addEventListener('click',e=>{if(e.target===el)closeProfile()})}
function closeProfile(){document.getElementById('profile-overlay')?.remove()}
function chooseHeroPortrait(value){if(!['heros','heros-garcon'].includes(value))return;state.heroPortrait=value;save();openProfile();render()}
function saveProfileName(){const v=document.getElementById('hero-name')?.value.trim();if(!v){alert('Choisis un nom pour ton personnage.');return}state.name=v.slice(0,36);save();closeProfile();render()}
function header(){return `<header class="top"><div class="brand"><button class="avatar-trigger" onclick="openProfile()" aria-label="Ouvrir la fiche du personnage"><img class="brand-icon" src="assets/dragon-icon.svg" alt="Dragon de jade"></button><div><strong>Dragon de Jade</strong> <button class="intro-link" onclick="openIntro()" title="Relire le prologue">📜 Histoire</button><br><small>V${APP_VERSION} · ${esc(state.name)}, ${esc(state.class)}</small></div></div><div><span class="pill">${state.xp} XP</span><button onclick="checkUpdate()" style="display:block;margin-top:6px;padding:5px 9px;font-size:12px">Mises à jour</button><button onclick="voiceHelp()" style="display:block;margin-top:6px;padding:5px 9px;font-size:12px">Aide voix</button></div></header>`}function nav(){return `<nav class="nav">${[['aventure','📜','Aventure'],['enquete','🔎','Enquête'],['carnet','📖','Carnet'],['calligraphie','🖌️','Écriture'],['atlas','🗺️','Atlas'],['campagne','🐉','Livres']].map(([id,icon,name])=>`<button class="${tab===id?'active':''}" onclick="switchTab('${id}')"><span style="font-size:21px">${icon}</span>${name}</button>`).join('')}</nav>`}
function speakScene(example=false){const i=activeSceneIndex();if(example){speak(heroText(scenes[i].options[0][0]));return}playSceneDialogue(sceneTurns(i,scenes[i]))}
function speakSceneTurn(j){const i=activeSceneIndex(),t=sceneTurns(i,scenes[i])[j];if(t)playSceneDialogue([t])}
function playSceneDialogue(turns){playMandarinTurns(turns)}
function heroText(value){return String(value).replace(/Esmée|Esmee|Edmee|Edmée/gi,()=>state.name)}
function heroAnswer(value){return heroText(value)}
function spokenNameMatch(value){
 const t=normalize(value),name=normalize(state.name);
 // The hero's personal name is not a Mandarin vocabulary item.
 // Accept a correctly spoken self-introduction even if Chinese ASR
 // transliterates the French name into Hanzi or leaves it out.
 return ['我叫','我是','我的名字叫','我名字叫'].some(prefix=>{
  const p=normalize(prefix);
  if(!t.startsWith(p))return false;
  const rest=t.slice(p.length);
  return rest===''||rest===name||rest.length>0;
 });
}
function restartEpisodeOne(){replayEpisode(1)}
let replayMenuOpen=false;
function toggleReplayMenu(){replayMenuOpen=!replayMenuOpen;render()}

const SEAL_TEST=[
{type:'lecture',prompt:'Que signifie 你好 ?',choices:['Bonjour','Merci','Au revoir'],correct:0,zh:'你好'},
{type:'lecture',prompt:'Quel caractère signifie « moi » ?',choices:['你','我','好'],correct:1,zh:'我'},
{type:'lecture',prompt:'Que signifie 请问 ?',choices:['S’il vous plaît, une question…','Au revoir','Je m’appelle…'],correct:0,zh:'请问'},
{type:'lecture',prompt:'Que signifie 对不起 ?',choices:['Merci','Pardon','Bonjour'],correct:1,zh:'对不起'},
{type:'écoute',prompt:'Écoute sans regarder le chinois. Quelle expression entends-tu ?',choices:['Merci','Au revoir','Bonjour'],correct:0,zh:'谢谢'},
{type:'écoute',prompt:'Quelle expression entends-tu ?',choices:['Pardon','De rien','Quel est ton nom ?'],correct:1,zh:'不客气'},
{type:'écoute',prompt:'Que dit Maître Chen ?',choices:['Je m’appelle…','Comment t’appelles-tu ?','Qui est-ce ?'],correct:1,zh:'你叫什么名字'},
{type:'écoute',prompt:'Quelle expression entends-tu ?',choices:['Au revoir','Bonjour','Pardon'],correct:0,zh:'再见'},
{type:'oral',prompt:'Présente-toi en mandarin.',zh:'我叫 Esmée',sample:'我叫 Esmée'},
{type:'oral',prompt:'Salue Maître Chen.',zh:'你好',sample:'你好'},
{type:'oral',prompt:'Remercie Mei.',zh:'谢谢',sample:'谢谢'},
{type:'oral',prompt:'Dis au revoir.',zh:'再见',sample:'再见'}];
let sealIndex=0,sealResults=[],sealReveal=false;
function sealStart(){sealIndex=0;sealResults=[];sealReveal=false;sealRender()}
function sealClose(){document.getElementById('seal-overlay')?.remove()}
function sealAnswer(index){const q=SEAL_TEST[sealIndex];sealResults.push({type:q.type,ok:index===q.correct});sealIndex++;sealReveal=false;sealRender()}
function sealOral(known){sealResults.push({type:'oral',ok:known});sealIndex++;sealReveal=false;sealRender()}
function sealFinish(){const parts=['lecture','écoute','oral'].map(type=>({type,score:sealResults.filter(x=>x.type===type&&x.ok).length,total:sealResults.filter(x=>x.type===type).length}));const result={date:new Date().toISOString(),parts,score:sealResults.filter(x=>x.ok).length,total:sealResults.length};state.sealAttempts=state.sealAttempts||[];state.sealAttempts.push(result);save();return result}
function sealRender(){let el=document.getElementById('seal-overlay');if(!el){el=document.createElement('div');el.id='seal-overlay';el.className='profile-overlay';document.body.appendChild(el)}const q=SEAL_TEST[sealIndex];if(!q){const result=sealFinish();el.innerHTML='<section class="profile-sheet revision-sheet" role="dialog" aria-modal="true"><button class="profile-close" onclick="sealClose()">✕</button><h2>🐉 Le premier sceau</h2><p><strong>'+result.score+' / '+result.total+'</strong> réponses validées</p>'+result.parts.map(p=>'<p>'+({lecture:'Lecture',écoute:'Écoute',oral:'Expression orale'}[p.type])+': '+p.score+' / '+p.total+'</p>').join('')+'<p class="small muted">Résultat sauvegardé séparément des XP. La partie orale est une autoévaluation, pas une mesure des tons.</p><button class="primary" onclick="sealClose();render()">Terminer</button></section>';return}
const choices=q.type==='oral'?(sealReveal?'<p class="han">'+chineseText(q.sample)+'</p><div class="controls"><button onclick="sealOral(false)">À retravailler</button><button class="primary" onclick="sealOral(true)">J’ai réussi</button></div>':'<button class="primary" onclick="sealReveal=true;sealRender()">Afficher le modèle et m’autoévaluer</button>'):'<div class="choices seal-choices">'+q.choices.map((v,i)=>'<button class="'+(hasChinese(v)?'han-choice':'')+'" onclick="sealAnswer('+i+')">'+esc(v)+'</button>').join('')+'</div>';
el.innerHTML='<section class="profile-sheet revision-sheet" role="dialog" aria-modal="true"><button class="profile-close" onclick="sealClose()">✕</button><div class="label">Le premier sceau · '+(sealIndex+1)+' / '+SEAL_TEST.length+'</div><h2>'+({lecture:'Compréhension écrite',écoute:'Compréhension orale',oral:'Expression orale'}[q.type])+'</h2><p>'+esc(q.prompt)+'</p>'+(q.type==='écoute'?'<button class="primary" onclick="speak(SEAL_TEST[sealIndex].zh)">🔊 Écouter</button>':q.type==='oral'?'<button onclick="speak(heroText(SEAL_TEST[sealIndex].zh))">🔊 Écouter le modèle</button>':'')+choices+'<p class="small muted">'+(q.type==='oral'?'Prononce la phrase avant de révéler le modèle. La reconnaissance automatique ne permet pas de noter les tons de façon fiable.':q.type==='écoute'?'Le texte chinois reste masqué pendant la question.':'Lis attentivement avant de choisir.')+'</p></section>'}
function chineseText(text){const str=heroText(text),words=[...vocab].sort((a,b)=>b[0].length-a[0].length);let out='',i=0;while(i<str.length){const v=words.find(x=>str.startsWith(x[0],i));if(v){out+='<button type="button" class="han-token" onclick="this.classList.toggle(&quot;revealed&quot;)"><span>'+esc(v[0])+'</span><small>'+esc(v[1])+'</small></button>';i+=v[0].length}else{out+=esc(str[i]);i++}}return out}
function hasChinese(text){return /[\u3400-\u9fff]/.test(text)}
let introOverride=false;
function introPage(){return `<div class="hero location-banner"><h1>Les Chroniques du Dragon de Jade</h1></div><main class="page intro-page"><div class="label">Prologue · De la France à Pékin</div><h2>La lettre venue de Chine</h2><figure class="prologue-comic"><img src="assets/prologue-dragon-de-jade.webp" alt="Planche de bande dessinée : un jade familial retrouvé en France, une lettre de Maître Chen, le voyage à Pékin, puis la rencontre de Mei et du dragon Lóng." loading="eager"><figcaption>Le début de l'aventure, de la France aux hutongs de Pékin. Agrandis l'image pour lire les cases.</figcaption></figure><p>Tout commence chez toi, en France. Dans une boîte de souvenirs familiaux, tu retrouves une petite pièce de jade vert, enveloppée dans un papier couvert de caractères chinois. Tu ignores son origine.</p><p>Le lendemain, une lettre arrive de Pékin. Elle porte le même symbole que ton jade : un dragon enroulé autour d'une écaille. Son auteur, Maître Chen, un antiquaire installé dans un hutong près de la tour du Tambour, affirme connaître l'histoire de cet objet. Il te demande de venir le rencontrer, mais ajoute : « Ne confie le jade à personne. »</p><p>Pourquoi cet inconnu connaît-il un objet conservé dans ta famille ? Comment a-t-il retrouvé ton adresse ? Et que signifie l'inscription au dos ? Tu pars pour Pékin avec la pièce et la lettre.</p><h3>Une enquête commence</h3><p>Sur place, Chen t'apprend que le Dragon de Jade protégeait autrefois les mots et les souvenirs. Ses écailles dispersées renferment des fragments de mémoire. Lóng, un petit dragon, en a oublié une partie.</p><p>Mei, une jeune messagère, cherche quant à elle des membres de sa famille disparus des archives. Le même symbole figure sur leurs documents. Les deux mystères semblent liés.</p><div class="paper"><h3>Ta mission</h3><p>Retrouve l'origine du jade, rassemble les écailles et aide Mei. Pour déchiffrer les indices, tu apprendras à lire, écouter et parler le mandarin. À Pékin, le mandarin est la langue commune. Le parler local possède aussi ses particularités.</p><p>Tu incarnes ${esc(state.name)}.</p><button class="primary" onclick="state.introSeen=true;introOverride=false;save();render()">Entrer dans la rue des Lanternes →</button></div></main>`}
function openIntro(){resetSceneInput();stopGameMic();delete state.sceneReplay;state.introSeen=false;introOverride=true;tab='aventure';save();render()}
function adventure(){if(state.sceneReplay)return adventureScene(activeSceneIndex(),state.sceneReplay);if(introOverride||(!state.introSeen&&state.scene===0))return introPage();const dd=deductionPage();if(dd)return dd;const eb=episodeBoundaryPage();if(eb)return eb;if(state.scene>=scenes.length)return `${scenePlaceBanner(scenes.length-1)}<main class="page"><div class="label">Livre I · Épisodes 1 à ${Math.floor(scenes.length/6)} terminés</div>${episodeReplayMenu()}<h2>🐉 Le premier sceau du Dragon de Jade</h2><p>Maître Chen t’attend pour un bilan de lecture, d’écoute et d’expression orale.</p><div class="paper"><h3>Épreuve finale · 12 questions</h3><p>4 questions écrites, 4 écoutes et 4 réponses orales à autoévaluer. Aucun XP supplémentaire.</p><button class="primary" onclick="sealStart()">Commencer l’épreuve</button></div><div class="paper"><h3>Mes résultats</h3>${(state.sealAttempts||[]).slice(-5).reverse().map(a=>`<p>${esc(new Date(a.date).toLocaleDateString('fr-FR'))} · ${a.score}/${a.total}</p>`).join('')||'<p>Pas encore d’épreuve réalisée.</p>'}</div><button onclick="restartEpisodeOne()">↻ Rejouer les scènes</button></main>`;return adventureScene(activeSceneIndex());}
function adventureScene(i,replay=null){
 const s=scenes[i],done=state.completed.includes(i),skipped=state.skipped.includes(i);
 const attempts=replay ? replay.attempts : state.attempts[i]||0;
 const options=(replay ? replay.order : s.options.map((_,j)=>j)).map(j=>[s.options[j][0],j]);
 return `${scenePlaceBanner(i)}<main class="page"><div class="label">Livre I · Épisode ${episodeOfScene(i)} · Scène ${i%6+1}/6</div><h2>${esc(s.title)}</h2>${replay ? replaySceneHeader(replay) : episodeReplayMenu()}<div class="progress"><span style="width:${((state.completed.filter(n=>episodeOfScene(n)===episodeOfScene(i)).length+state.skipped.filter(n=>episodeOfScene(n)===episodeOfScene(i)).length)/6)*100}%"></span></div>${scalesBar()}<p class="narration">${esc(heroText(s.text))}</p>${sceneVariant(i)}${secondaryScenePlaces(i)}<section class="character-dialogue" aria-label="Dialogue entre les personnages">${sceneTurns(i,s).map(renderDialogueTurn).join('')}</section><div class="controls dialogue-controls"><button onclick="speakScene()">🔊 Écouter</button><button onclick="document.querySelectorAll('.han-token').forEach(el=>el.classList.toggle('revealed'))">Afficher / masquer le pinyin</button><button onclick="showTranslation=!showTranslation;render()">${showTranslation?'Masquer':'Afficher'} traduction</button></div><p class="audio-status small muted" role="status" aria-live="polite"></p><div class="paper"><div class="label">Défi de dialogue · ${Math.min(attempts,3)}/3 essais utilisés</div><h3>${esc(heroText(s.question))}</h3><div class="choices">${options.map(([a,j])=>`<button class="${selected===String(j)?'selected':''} ${hasChinese(a)?'han-choice':''}" ${replay?.result?'disabled':''} onclick="selectAnswer('${j}')">${esc(heroAnswer(a))}</button>`).join('')}</div><div class="rule"></div>${s.options.every(([a])=>!hasChinese(a))?'<p class="small muted">Choisis la réponse en français ci-dessus. Pas de microphone pour cet exercice.</p>':`<strong>🎙️ Répondre en mandarin</strong><div class="controls"><button onclick="${activeRecognition?'stopRecognition()':'recognize()'}">${activeRecognition?'⏹ Arrêter':'🎤 Parler'}</button><button onclick="speakScene(true)">🔊 Écouter un exemple</button></div><p class="audio-status small muted" role="status" aria-live="polite"></p><input type="text" id="answer" placeholder="Réponse orale transcrite ou texte chinois" value="${esc(speechText)}" oninput="speechText=this.value;speechAlternatives=[]"><p class="small muted">${esc(micStatus||'Touche Parler et autorise le micro. Ta voix est transcrite en texte ; le jeu ne sauvegarde aucun fichier audio. Le service vocal du navigateur peut traiter ta voix en ligne. Les tons ne sont pas évalués.')}</p>`}${replay ? replaySceneResult(replay) : !done&&!skipped?`<button class="primary" onclick="validate()">Valider ma réponse</button>`:`<div class="toast">${skipped?'Défi passé · 0 XP':'✓ Défi terminé · '+s.reward+' XP obtenus'}</div><button class="primary" onclick="nextScene()">${i===scenes.length-1?'Voir le bilan':i%6===5?'Terminer l’épisode '+episodeOfScene(i)+' →':'Scène suivante →'}</button>`}<div id="feedback" role="status" aria-live="polite">${answerFeedback}</div></div>${replay?'':reactionBlock(i,done||skipped)}<div class="paper"><div class="label">📖 Comprendre la langue</div><p>${esc(s.grammar||"")}</p></div><div class="paper"><div class="label">Découverte · Culture et géographie</div><p>${esc(heroText(s.info))}</p></div></main>`}
function normalize(s){return String(s).normalize('NFKC').replace(/[\\s.,!?。，！？、:：;；'’"“”]/g,'').toLowerCase()}
function speechAccepted(answer,scene){const alts=[].concat(answer);return speechMatchAny(alts,speechSceneTargets(scene)).ok||(scene===1&&alts.some(spokenNameMatch))}
function learnSceneWords(s) {
  s.words.forEach(w=>{if(!state.words.includes(w))state.words.push(w);if(!state.wordDates[w])state.wordDates[w]=localDay()});
}
function validate(){
 const sceneIndex=activeSceneIndex(),s=scenes[sceneIndex],replay=state.sceneReplay;
 if(replay?.result)return;
 if(!replay&&(state.completed.includes(sceneIndex)||state.skipped.includes(sceneIndex))){nextScene();return}
 const input=$('#answer'),a=(input?.value??speechText).trim(),idx=Number(selected);
 // Keep all recognition alternatives until the player explicitly edits the answer.
 const spoken=Boolean(a && speechAlternatives.length && a===speechAlternatives[0]);
 const alts=spoken?speechAlternatives:[a];
 const good=(selected!==''&&s.options[idx]?.[1])||Boolean(a&&speechAccepted(alts,sceneIndex));
 if(replay){concludeReplayAnswer(good,spoken,alts,sceneIndex);return}
 const f=$('#feedback');
 if(!good){
  state.attempts[sceneIndex]=Math.min(3,(state.attempts[sceneIndex]||0)+1);
  const attempts=state.attempts[sceneIndex],remaining=3-attempts;
  if(remaining===0){
   state.skipped.push(sceneIndex);eqSceneDone(sceneIndex);recordLesson();
   if(!state.discoveries.includes(s.info))state.discoveries.push(s.info);
   save();
   answerFeedback='<div class="warning">Trois essais effectués. Maître Chen t’encourage à poursuivre ton voyage. Aucun XP pour ce défi, mais tu pourras revoir cette expression dans ton carnet.</div><button class="primary" onclick="nextScene()">Continuer l’aventure →</button>';
  }else{
   save();
   answerFeedback='<div class="warning">Réponse entendue : <strong>'+esc(a||'(aucune transcription)')+'</strong>'+speechExtra(alts,sceneIndex)+'. Il te reste '+remaining+' essai'+(remaining>1?'s':'')+'. Réécoute le modèle ou choisis une réponse écrite.</div>';
  }
  if(f)f.innerHTML=answerFeedback;
  return;
 }
 state.completed.push(sceneIndex);eqSceneDone(sceneIndex);state.xp+=s.reward;recordLesson();if(spoken)state.speechSuccess++;
 learnSceneWords(s);
 if(!state.discoveries.includes(s.info))state.discoveries.push(s.info);
 save();
 answerFeedback='<div class="toast">✓ Réponse validée ! +'+s.reward+' XP. '+(spoken?speechSuccessNote(alts,sceneIndex):'')+'</div><button class="primary" onclick="nextScene()">Continuer →</button>';
 if(f)f.innerHTML=answerFeedback;
 micStatus='Réponse validée !';
}
function nextScene(){
 if(state.sceneReplay){advanceSceneReplay();return}
 resetSceneInput();
 state.scene=Math.min(state.scene+1,scenes.length);
 save();render();
}
function selectAnswer(i){
 if(state.sceneReplay?.result)return;
 selected=i;speechText='';speechAlternatives=[];answerFeedback='';render();
 const option=scenes[activeSceneIndex()].options[Number(i)]?.[0];
 if(option&&hasChinese(option))speak(heroText(option));
}
let quizTheme='all',quizCount=10,quizItems=[],quizIndex=0,quizScore=0,quizAnswered=false,quizChoice=-1,writingSearch='',writingTest=false,writingTestIndex=0,writingReveal=false;
let speakingMode='all',speakingCount=10,speakingItems=[],speakingIndex=0,speakingScore=0,speakingAttempts=0,speakingRecognition=null,speakingFinished=false;
let carnetEpisode='1',writingEpisode='1',atlasEpisode='all',atlasSearch='';
let carnetPanel='none',writingPanel='none',writingTestMode='all',writingTestCount=10,writingTestItems=[],writingSelected=Array.isArray(state.writingSelected)?state.writingSelected:[];
let carnetSearch='',carnetLesson='all',carnetTheme='all',carnetSort='lesson',revisionIndex=0,revisionReveal=false;
const wordThemes={'爸爸':'Famille','妈妈':'Famille','哥哥':'Famille','弟弟':'Famille','姐姐':'Famille','妹妹':'Famille','儿子':'Famille','女儿':'Famille','家':'Famille','家人':'Famille','孩子':'Famille','朋友':'Relations','男':'Identité','女':'Identité','男朋友':'Relations','女朋友':'Relations','他':'Pronoms','她':'Pronoms','他们':'Pronoms','她们':'Pronoms','我们':'Pronoms','你们':'Pronoms','们':'Grammaire','岁':'Âge','吗':'Grammaire','女士':'Politesse','您':'Politesse','什么':'Questions','谁':'Questions','是':'Grammaire','人':'Présentation','先生':'Politesse','对不起':'Politesse','没关系':'Politesse','请':'Politesse','请问':'Politesse','大家':'Salutations','我们':'Présentation','你们':'Présentation','这':'Grammaire','再见':'Politesse','不客气':'Politesse','认识':'Présentation','你':'Présentation','好':'Salutations','你好':'Salutations','我':'Présentation','叫':'Présentation','名字':'Présentation','我叫':'Présentation','谢谢':'Politesse','龙':'Aventure','喝':'Thé','茶':'Thé','吗':'Grammaire'};Object.assign(wordThemes,EPISODE3_THEMES,EPISODE4_THEMES,EPISODE5_THEMES,EPISODE6_THEMES,EPISODE7_THEMES,EPISODE8_THEMES,EPISODE9_THEMES,EPISODE10_THEMES);
function episodeOfScene(index){return Math.floor(index/6)+1}
function episodeOfWord(word){const lesson=wordLesson(word);return lesson===null?null:episodeOfScene(lesson-1)}
function unlockedEpisodes(){return [...new Set(scenes.map((sc,i)=>episodeOfScene(i)).filter(ep=>scenes.some((sc,i)=>episodeOfScene(i)===ep&&(state.completed.includes(i)||state.skipped.includes(i)))))]}
function episodeSelectOptions(current,all=false,episodes=unlockedEpisodes()){return (all?'<option value="all" '+(current==='all'?'selected':'')+'>Tous les épisodes débloqués</option>':'')+episodes.map(ep=>'<option value="'+ep+'" '+(current===String(ep)?'selected':'')+'>Livre I · Épisode '+ep+'</option>').join('')}
function episodeOfDiscovery(text){const i=scenes.findIndex(sc=>sc.info===text);return i<0?null:episodeOfScene(i)}
function reviewDay(){return localDay()}
function reviewDue(word){const entry=state.reviewSchedule[word];return !entry||!entry.next||entry.next<=reviewDay()}
function dueWords(){return learnedWords().filter(v=>reviewDue(v[0]))}
function rateWord(word,known){const prev=state.reviewSchedule[word]||{interval:0,successes:0,failures:0};const successes=known?prev.successes+1:0;const interval=known?(successes===1?1:successes===2?3:successes===3?7:Math.min(90,Math.round((prev.interval||7)*1.8))):0;const d=new Date();d.setDate(d.getDate()+interval);state.reviewSchedule[word]={interval,successes,failures:(prev.failures||0)+(known?0:1),next:localDay(d),last:reviewDay()};save()}
let dueSession=[],dueIndex=0,dueReveal=false,dueCorrect=0;
function startDueReview(){dueSession=shuffleWords(dueWords().map(v=>v[0]));dueIndex=0;dueReveal=false;dueCorrect=0;if(!dueSession.length){alert('Aucun mot à réviser aujourd’hui.');return}showDueReview()}
function closeDueReview(){document.getElementById('due-overlay')?.remove()}
function rateDueReview(known){rateWord(dueSession[dueIndex],known);if(known)dueCorrect++;dueIndex++;dueReveal=false;showDueReview()}
function showDueReview(){let el=document.getElementById('due-overlay');if(!el){el=document.createElement('div');el.id='due-overlay';el.className='profile-overlay';document.body.appendChild(el)}const word=dueSession[dueIndex];if(!word){el.innerHTML='<section class="profile-sheet revision-sheet"><h2>Révision terminée</h2><p>'+dueCorrect+' / '+dueSession.length+' mots reconnus</p><p>Les prochaines révisions ont été programmées.</p><button onclick="closeDueReview();render()">Retour au carnet</button></section>';return}const v=vocab.find(v=>v[0]===word);el.innerHTML='<section class="profile-sheet revision-sheet" role="dialog" aria-modal="true"><button class="profile-close" onclick="closeDueReview()">✕</button><h2>Révision du jour '+(dueIndex+1)+' / '+dueSession.length+'</h2><p class="han revision-word">'+esc(word)+'</p><button onclick="speak(dueSession[dueIndex])">🔊 Écouter</button>'+(dueReveal?'<p><strong>'+esc(v[1])+'</strong> · '+esc(v[2])+'</p><div class="controls"><button onclick="rateDueReview(false)">À revoir</button><button class="primary" onclick="rateDueReview(true)">Je savais ✓</button></div>':'<p>Retrouve la prononciation et le sens.</p><button class="primary" onclick="dueReveal=true;showDueReview()">Révéler la réponse</button>')+'<p class="small muted">Révision espacée : demain, 3 jours, 7 jours puis davantage si le mot est connu.</p></section>'}
function wordLesson(word){const i=scenes.findIndex(sc=>sc.words.includes(word));return i<0?null:i+1}
function wordDate(word){if(state.wordDates[word])return state.wordDates[word];const source=state.words.find(w=>w===word||w.includes(word));return source?state.wordDates[source]||'':''}
function learnedWords(){return vocab.filter(v=>state.words.some(w=>w===v[0]||w.includes(v[0])))}
function filteredWords(){const q=carnetSearch.trim().toLocaleLowerCase('fr');let arr=learnedWords().filter(v=>(carnetEpisode==='all'||String(episodeOfWord(v[0]))===carnetEpisode)&&(!q||v.join(' ').toLocaleLowerCase('fr').includes(q))&&(carnetLesson==='all'||String(wordLesson(v[0]))===carnetLesson)&&(carnetTheme==='all'||wordThemes[v[0]]===carnetTheme));
arr.sort((a,b)=>carnetSort==='date'?wordDate(b[0]).localeCompare(wordDate(a[0]))||a[0].localeCompare(b[0]):carnetSort==='theme'?(wordThemes[a[0]]||'').localeCompare(wordThemes[b[0]]||'')||a[0].localeCompare(b[0]):(wordLesson(a[0])||99)-(wordLesson(b[0])||99)||a[0].localeCompare(b[0]));return arr}
function carnet(){const arr=filteredWords(),selected=state.reviewSelected.filter(w=>learnedWords().some(v=>v[0]===w));return `<div class="section-banner journal-banner"><h1>Carnet de ${esc(state.name)}</h1></div><main class="page"><h2>Répertoire de mots</h2><section class="paper"><h3>📅 Révisions du jour</h3><p><strong>${dueWords().length}</strong> mot(s) à revoir sur ${learnedWords().length} appris.</p><button class="primary" onclick="startDueReview()" ${dueWords().length?'':'disabled'}>Commencer ma révision</button><p class="small muted">Les mots nouvellement appris sont proposés dès leur première révision. Indique « Je savais » ou « À revoir » pour adapter leur fréquence.</p></section><div class="paper"><strong>Niveau RPG ${1+Math.floor(state.xp/100)}</strong><p>${state.xp} XP · ${learnedWords().length} mots et expressions répertoriés</p><div class="progress"><span style="width:${state.xp%100}%"></span></div></div><div class="controls notebook-actions"><button onclick="carnetPanel=carnetPanel==='search'?'none':'search';render()">🔎 Recherche</button><button onclick="carnetPanel=carnetPanel==='test'?'none':'test';render()">🎯 Test</button><button onclick="carnetPanel=carnetPanel==='speak'?'none':'speak';render()">🎙️ Parler</button></div><section class="paper" ${carnetPanel==='search'?'':'hidden'}><h3>Rechercher et classer</h3><input type="search" id="word-search" placeholder="Chinois, pinyin ou français…" value="${esc(carnetSearch)}" oninput="carnetSearch=this.value;renderWordList()" aria-label="Rechercher un mot"><div class="carnet-filters"><label>Leçon<select onchange="carnetLesson=this.value;renderWordList()"><option value="all">Toutes</option>${scenes.map((sc,i)=>`<option value="${i+1}" ${carnetLesson===String(i+1)?'selected':''}>Leçon ${i+1} · ${esc(sc.title)}</option>`).join('')}</select></label><label>Thème<select onchange="carnetTheme=this.value;renderWordList()"><option value="all">Tous</option>${[...new Set(Object.values(wordThemes))].sort().map(t=>`<option value="${esc(t)}" ${carnetTheme===t?'selected':''}>${esc(t)}</option>`).join('')}</select></label><label>Trier par<select onchange="carnetSort=this.value;renderWordList()"><option value="lesson" ${carnetSort==='lesson'?'selected':''}>Leçon</option><option value="theme" ${carnetSort==='theme'?'selected':''}>Thème</option><option value="date" ${carnetSort==='date'?'selected':''}>Date d’apprentissage (récent d’abord)</option></select></label></div><p class="small muted">Les dates sont enregistrées pour les nouveaux apprentissages. Les anciens mots restent accessibles sans date rétroactive.</p></section><div class="paper" ${carnetPanel==='speak'?'':'hidden'}><h3>S’entraîner à parler</h3><div class="carnet-filters"><label>Mode<select onchange="speakingMode=this.value"><option value="all">Aléatoire · tous les thèmes</option><option value="selection">Ma sélection de révision</option>${[...new Set(Object.values(wordThemes))].sort().map(t=>`<option value="${esc(t)}">${esc(t)}</option>`).join('')}</select></label><label>Questions<select onchange="speakingCount=Number(this.value)"><option value="10">10 questions</option><option value="20">20 questions</option></select></label></div><button class="primary" onclick="startSpeakingPractice()">🎙️ Commencer</button><p class="small muted">Le micro vérifie les mots reconnus en mandarin. Il ne mesure pas la précision des tons.</p></div><div class="paper" ${carnetPanel==='test'?'':'hidden'}><h3>Test de vocabulaire</h3><div class="carnet-filters"><label>Thème<select onchange="quizTheme=this.value"><option value="all">Aléatoire, tous les thèmes</option><option value="selection" ${quizTheme==='selection'?'selected':''}>Ma sélection de révision</option>${[...new Set(Object.values(wordThemes))].sort().map(t=>`<option value="${esc(t)}" ${quizTheme===t?'selected':''}>${esc(t)}</option>`).join('')}</select></label><label>Exercice<select onchange="quizMode=this.value">${[['mix','Varié (recommandé)'],...Object.entries(QUIZ_LABELS)].map(([k,t])=>`<option value="${k}" ${quizMode===k?'selected':''}>${t}</option>`).join('')}</select></label><label>Questions<select onchange="quizCount=Number(this.value)"><option value="10" ${quizCount===10?'selected':''}>10 questions</option><option value="20" ${quizCount===20?'selected':''}>20 questions</option></select></label></div><button class="primary" onclick="startQuiz()">Commencer le test</button><p class="small muted">Si peu de mots ont été appris, certains pourront revenir pendant le test.</p></div><div class="paper"><h3>Ma sélection de révision</h3><p><strong id="revision-count">${selected.length}</strong> mot(s) sélectionné(s)</p><div class="controls"><button onclick="startRevision()" ${selected.length?'':'disabled'}>🎯 Tester ma sélection</button><button onclick="selectVisibleWords()">Cocher les mots affichés</button><button onclick="clearReview()">Effacer la sélection</button></div></div><label class="episode-filter">Afficher les mots de <select onchange="carnetEpisode=this.value;renderWordList()">${episodeSelectOptions(carnetEpisode,true)}</select></label><h3>Vocabulaire rencontré <small id="word-count">(${arr.length})</small></h3><div id="word-list">${wordCards(arr)}</div><div class="paper"><h3>Ma sauvegarde de partie</h3><p>${esc(saveStatus())}</p><p class="small muted">La progression et la sélection de révision sont conservées sur cet appareil. Exporte une sauvegarde pour les transférer.</p><div class="controls"><button onclick="exportSave()">💾 Télécharger ma sauvegarde</button><label class="button" style="display:inline-block;padding:10px;border:1px solid #aaa;border-radius:8px;cursor:pointer">📂 Restaurer une sauvegarde<input type="file" accept=".json,application/json" style="display:none" onchange="importSave(this)"></label></div><div class="rule"></div><h3>Progression HSK</h3><p>Le référentiel HSK sert de cadre pédagogique. Cette démo n’attribue pas encore de niveau officiel.</p></div></main>`}
const VOCAB_PICTOGRAMS={'你好':'👋','好':'👍','你':'👤','您':'🙇','我':'🧍','叫':'💬','名字':'🏷️','什么':'❓','谁':'❔','是':'✔️','人':'🧑','先生':'👨','对不起':'🙏','没关系':'🤝','请':'🙌','请问':'🙋','大家':'👥','这':'👉','谢谢':'🎁','再见':'👋','不客气':'🤲','认识':'🤝','爸爸':'👨','妈妈':'👩','哥哥':'👦','姐姐':'👧','弟弟':'🧒','妹妹':'👧','家':'🏠','孩子':'🧒','男':'👨','女':'👩','朋友':'🤝','男朋友':'💑','女朋友':'💑','他':'👨','她':'👩','他们':'👥','几':'🔢','岁':'🎂','的':'🔗','有':'📦','没有':'🚫','和':'➕','一':'1️⃣','二':'2️⃣','三':'3️⃣','四':'4️⃣','五':'5️⃣','六':'6️⃣','七':'7️⃣','八':'8️⃣','九':'9️⃣','十':'🔟','零':'0️⃣','百':'💯','千':'🔢','个':'🧩','多少':'🧮','多':'➕','少':'➖','两':'✌️','半':'🌗','一半':'🌓','一点儿':'🤏','一些':'🧺','块':'🪙','元':'💴','钱':'💰','今天':'📅','明天':'🌅','昨天':'⏪','今年':'🗓️','明年':'⏩','去年':'⏪','年':'🗓️','月':'🌙','日':'☀️','号':'🔖','星期':'📆','星期日':'🛌','星期天':'🛌','早上':'🌄','上午':'⛅','中午':'🌞','下午':'🌇','晚上':'🌃','白天':'🏙️','点':'🕒','分':'⏱️','分钟':'⏲️','小时':'⌛','时候':'⏳','时间':'🕰️','现在':'📍','天':'🌤️','晚':'🌙','早':'🌅','茶':'🍵','水':'💧','喝':'🥤','吃':'🍽️','饭':'🍚','米饭':'🍚','面包':'🍞','包子':'🥟','饺子':'🥟','面条儿':'🍜','鸡蛋':'🥚','牛奶':'🥛','水果':'🍇','苹果':'🍎','菜':'🥬','好吃':'😋','早饭':'🌄','午饭':'🌞','晚饭':'🌃','饭店':'🏨','杯子':'☕','做饭':'🍳','要':'🤲','喜欢':'❤️','口':'👄','买':'🛒','卖':'🧾','店':'🏪','商店':'🏬','超市':'🛍️','书店':'📚','东西':'📦','贵':'💎','便宜':'🏷️','找':'🔍','给':'📤','哪':'🤷','哪个':'👆','那个':'👈','这个':'👉','这些':'🔹','那些':'🔸','哪些':'❓','些':'🔸','本':'📒','件':'👕','衣服':'👕','新':'✨','那':'👈'};
function vocabPictogram(v){return VOCAB_PICTOGRAMS[v[0]]||(/bonjour|salut/i.test(v[2])?'👋':/famille/i.test(v[2])?'🏠':/âge|an\b/i.test(v[2])?'🎂':'🖼️')}
const VOCAB_WATERCOLORS={"你好": {"src": "assets/vocabulary/ni-hao-v1.jpg", "alt": "Aquarelle pédagogique pour 你好."}, "你": {"src": "assets/vocabulary/ni-v1.jpg", "alt": "Aquarelle pédagogique pour 你."}, "好": {"src": "assets/vocabulary/hao-v1.jpg", "alt": "Aquarelle pédagogique pour 好."}, "您": {"src": "assets/vocabulary/nin-v1.jpg", "alt": "Aquarelle pédagogique pour 您."}, "我": {"src": "assets/vocabulary/wo-v1.jpg", "alt": "Aquarelle pédagogique pour 我."}, "叫": {"src": "assets/vocabulary/jiao-v1.jpg", "alt": "Aquarelle pédagogique pour 叫."}, "名字": {"src": "assets/vocabulary/mingzi-v1.jpg", "alt": "Aquarelle pédagogique pour 名字."}, "什么": {"src": "assets/vocabulary/shenme-v1.jpg", "alt": "Aquarelle pédagogique pour 什么."}, "谁": {"src": "assets/vocabulary/shei-v1.jpg", "alt": "Aquarelle pédagogique pour 谁."}, "是": {"src": "assets/vocabulary/shi-v1.jpg", "alt": "Aquarelle pédagogique pour 是."}, "人": {"src": "assets/vocabulary/ren-clear-v1.jpg", "alt": "Aquarelle pédagogique pour 人."}, "先生": {"src": "assets/vocabulary/xiansheng-clear-v1.jpg", "alt": "Aquarelle pédagogique pour 先生."}, "对不起": {"src": "assets/vocabulary/duibuqi-v1.jpg", "alt": "Aquarelle pédagogique pour 对不起."}, "没关系": {"src": "assets/vocabulary/mei-guanxi-v1.jpg", "alt": "Aquarelle pédagogique pour 没关系."}, "请": {"src": "assets/vocabulary/qing-v1.jpg", "alt": "Aquarelle pédagogique pour 请."}, "请问": {"src": "assets/vocabulary/qingwen-v1.jpg", "alt": "Aquarelle pédagogique pour 请问."}, "大家": {"src": "assets/vocabulary/dajia-v1.jpg", "alt": "Aquarelle pédagogique pour 大家."}, "这": {"src": "assets/vocabulary/zhe-v1.jpg", "alt": "Aquarelle pédagogique pour 这."}, "谢谢": {"src": "assets/vocabulary/xiexie-v1.jpg", "alt": "Aquarelle pédagogique pour 谢谢."}, "再见": {"src": "assets/vocabulary/zaijian-v1.jpg", "alt": "Aquarelle pédagogique pour 再见."}, "不客气": {"src": "assets/vocabulary/bu-keqi-v1.jpg", "alt": "Aquarelle pédagogique pour 不客气."}, "认识": {"src": "assets/vocabulary/renshi-v1.jpg", "alt": "Aquarelle pédagogique pour 认识."}, "吗": {"src": "assets/vocabulary/ma-v1.jpg", "alt": "Aquarelle pédagogique pour 吗."}, "女士": {"src": "assets/vocabulary/nvshi-v1.jpg", "alt": "Aquarelle pédagogique pour 女士."}, "爸爸": {"src": "assets/vocabulary/baba-v1.jpg", "alt": "Aquarelle pédagogique pour 爸爸."}, "妈妈": {"src": "assets/vocabulary/mama-v1.jpg", "alt": "Aquarelle pédagogique pour 妈妈."}, "哥哥": {"src": "assets/vocabulary/gege-v1.jpg", "alt": "Aquarelle pédagogique pour 哥哥."}, "弟弟": {"src": "assets/vocabulary/didi-v1.jpg", "alt": "Aquarelle pédagogique pour 弟弟."}, "姐姐": {"src": "assets/vocabulary/jiejie-v1.jpg", "alt": "Aquarelle pédagogique pour 姐姐."}, "妹妹": {"src": "assets/vocabulary/meimei-v1.jpg", "alt": "Aquarelle pédagogique pour 妹妹."}, "儿子": {"src": "assets/vocabulary/erzi-v1.jpg", "alt": "Aquarelle pédagogique pour 儿子."}, "女儿": {"src": "assets/vocabulary/nver-v1.jpg", "alt": "Aquarelle pédagogique pour 女儿."}, "家": {"src": "assets/vocabulary/jia-v1.jpg", "alt": "Aquarelle pédagogique pour 家."}, "家人": {"src": "assets/vocabulary/jiaren-v1.jpg", "alt": "Aquarelle pédagogique pour 家人."}, "孩子": {"src": "assets/vocabulary/haizi-v1.jpg", "alt": "Aquarelle pédagogique pour 孩子."}, "朋友": {"src": "assets/vocabulary/pengyou-v1.jpg", "alt": "Aquarelle pédagogique pour 朋友."}, "男": {"src": "assets/vocabulary/nan-v1.jpg", "alt": "Aquarelle pédagogique pour 男."}, "女": {"src": "assets/vocabulary/nv-v1.jpg", "alt": "Aquarelle pédagogique pour 女."}, "男朋友": {"src": "assets/vocabulary/nan-pengyou-v1.jpg", "alt": "Aquarelle pédagogique pour 男朋友."}, "女朋友": {"src": "assets/vocabulary/nv-pengyou-v1.jpg", "alt": "Aquarelle pédagogique pour 女朋友."}, "他": {"src": "assets/vocabulary/ta-male-v1.jpg", "alt": "Aquarelle pédagogique pour 他."}, "她": {"src": "assets/vocabulary/ta-female-v1.jpg", "alt": "Aquarelle pédagogique pour 她."}, "他们": {"src": "assets/vocabulary/tamen-mixed-v1.jpg", "alt": "Aquarelle pédagogique pour 他们."}, "她们": {"src": "assets/vocabulary/tamen-female-v1.jpg", "alt": "Aquarelle pédagogique pour 她们."}, "我们": {"src": "assets/vocabulary/women-v1.jpg", "alt": "Aquarelle pédagogique pour 我们."}, "你们": {"src": "assets/vocabulary/nimen-v1.jpg", "alt": "Aquarelle pédagogique pour 你们."}, "们": {"src": "assets/vocabulary/men-v1.jpg", "alt": "Aquarelle pédagogique pour 们."}, "岁": {"src": "assets/vocabulary/sui-v1.jpg", "alt": "Aquarelle pédagogique pour 岁."}, "一": {"src": "assets/vocabulary/hsk1-ep03-01.jpg", "alt": "Aquarelle pédagogique pour 一."}, "二": {"src": "assets/vocabulary/hsk1-ep03-02.jpg", "alt": "Aquarelle pédagogique pour 二."}, "三": {"src": "assets/vocabulary/hsk1-ep03-03.jpg", "alt": "Aquarelle pédagogique pour 三."}, "四": {"src": "assets/vocabulary/hsk1-ep03-04.jpg", "alt": "Aquarelle pédagogique pour 四."}, "五": {"src": "assets/vocabulary/hsk1-ep03-05.jpg", "alt": "Aquarelle pédagogique pour 五."}, "六": {"src": "assets/vocabulary/hsk1-ep03-06.jpg", "alt": "Aquarelle pédagogique pour 六."}, "七": {"src": "assets/vocabulary/hsk1-ep03-07.jpg", "alt": "Aquarelle pédagogique pour 七."}, "八": {"src": "assets/vocabulary/hsk1-ep03-08.jpg", "alt": "Aquarelle pédagogique pour 八."}, "九": {"src": "assets/vocabulary/hsk1-ep03-09.jpg", "alt": "Aquarelle pédagogique pour 九."}, "十": {"src": "assets/vocabulary/hsk1-ep03-10.jpg", "alt": "Aquarelle pédagogique pour 十."}, "零": {"src": "assets/vocabulary/hsk1-ep03-11.jpg", "alt": "Aquarelle pédagogique pour 零."}, "百": {"src": "assets/vocabulary/hsk1-ep03-12.jpg", "alt": "Aquarelle pédagogique pour 百."}, "千": {"src": "assets/vocabulary/hsk1-ep03-13.jpg", "alt": "Aquarelle pédagogique pour 千."}, "个": {"src": "assets/vocabulary/hsk1-ep03-14.jpg", "alt": "Aquarelle pédagogique pour 个."}, "几": {"src": "assets/vocabulary/hsk1-ep03-15.jpg", "alt": "Aquarelle pédagogique pour 几."}, "多少": {"src": "assets/vocabulary/hsk1-ep03-16.jpg", "alt": "Aquarelle pédagogique pour 多少."}, "多": {"src": "assets/vocabulary/hsk1-ep03-17.jpg", "alt": "Aquarelle pédagogique pour 多."}, "少": {"src": "assets/vocabulary/hsk1-ep03-18.jpg", "alt": "Aquarelle pédagogique pour 少."}, "两": {"src": "assets/vocabulary/hsk1-ep03-19.jpg", "alt": "Aquarelle pédagogique pour 两."}, "半": {"src": "assets/vocabulary/hsk1-ep03-20.jpg", "alt": "Aquarelle pédagogique pour 半."}, "一半": {"src": "assets/vocabulary/hsk1-ep03-21.jpg", "alt": "Aquarelle pédagogique pour 一半."}, "一点儿": {"src": "assets/vocabulary/hsk1-ep03-22.jpg", "alt": "Aquarelle pédagogique pour 一点儿."}, "一些": {"src": "assets/vocabulary/hsk1-ep03-23.jpg", "alt": "Aquarelle pédagogique pour 一些."}, "块": {"src": "assets/vocabulary/hsk1-ep03-24.jpg", "alt": "Aquarelle pédagogique pour 块."}, "元": {"src": "assets/vocabulary/hsk1-ep03-25.jpg", "alt": "Aquarelle pédagogique pour 元."}, "钱": {"src": "assets/vocabulary/hsk1-ep03-26.jpg", "alt": "Aquarelle pédagogique pour 钱."}, "今天": {"src": "assets/vocabulary/hsk1-ep04-01.jpg", "alt": "Aquarelle pédagogique pour 今天."}, "明天": {"src": "assets/vocabulary/hsk1-ep04-02.jpg", "alt": "Aquarelle pédagogique pour 明天."}, "昨天": {"src": "assets/vocabulary/hsk1-ep04-03.jpg", "alt": "Aquarelle pédagogique pour 昨天."}, "今年": {"src": "assets/vocabulary/hsk1-ep04-04.jpg", "alt": "Aquarelle pédagogique pour 今年."}, "明年": {"src": "assets/vocabulary/hsk1-ep04-05.jpg", "alt": "Aquarelle pédagogique pour 明年."}, "去年": {"src": "assets/vocabulary/hsk1-ep04-06.jpg", "alt": "Aquarelle pédagogique pour 去年."}, "年": {"src": "assets/vocabulary/hsk1-ep04-07.jpg", "alt": "Aquarelle pédagogique pour 年."}, "月": {"src": "assets/vocabulary/hsk1-ep04-08.jpg", "alt": "Aquarelle pédagogique pour 月."}, "日": {"src": "assets/vocabulary/hsk1-ep04-09.jpg", "alt": "Aquarelle pédagogique pour 日."}, "号": {"src": "assets/vocabulary/hsk1-ep04-10.jpg", "alt": "Aquarelle pédagogique pour 号."}, "星期": {"src": "assets/vocabulary/hsk1-ep04-11.jpg", "alt": "Aquarelle pédagogique pour 星期."}, "星期日": {"src": "assets/vocabulary/hsk1-ep04-12.jpg", "alt": "Aquarelle pédagogique pour 星期日."}, "星期天": {"src": "assets/vocabulary/hsk1-ep04-13.jpg", "alt": "Aquarelle pédagogique pour 星期天."}, "早上": {"src": "assets/vocabulary/hsk1-ep04-14.jpg", "alt": "Aquarelle pédagogique pour 早上."}, "上午": {"src": "assets/vocabulary/hsk1-ep04-15.jpg", "alt": "Aquarelle pédagogique pour 上午."}, "中午": {"src": "assets/vocabulary/hsk1-ep04-16.jpg", "alt": "Aquarelle pédagogique pour 中午."}, "下午": {"src": "assets/vocabulary/hsk1-ep04-17.jpg", "alt": "Aquarelle pédagogique pour 下午."}, "晚上": {"src": "assets/vocabulary/hsk1-ep04-18.jpg", "alt": "Aquarelle pédagogique pour 晚上."}, "白天": {"src": "assets/vocabulary/hsk1-ep04-19.jpg", "alt": "Aquarelle pédagogique pour 白天."}, "点": {"src": "assets/vocabulary/hsk1-ep04-20.jpg", "alt": "Aquarelle pédagogique pour 点."}, "分": {"src": "assets/vocabulary/hsk1-ep04-21.jpg", "alt": "Aquarelle pédagogique pour 分."}, "分钟": {"src": "assets/vocabulary/hsk1-ep04-22.jpg", "alt": "Aquarelle pédagogique pour 分钟."}, "小时": {"src": "assets/vocabulary/hsk1-ep04-23.jpg", "alt": "Aquarelle pédagogique pour 小时."}, "时候": {"src": "assets/vocabulary/hsk1-ep04-24.jpg", "alt": "Aquarelle pédagogique pour 时候."}, "时间": {"src": "assets/vocabulary/hsk1-ep04-25.jpg", "alt": "Aquarelle pédagogique pour 时间."}, "现在": {"src": "assets/vocabulary/hsk1-ep04-26.jpg", "alt": "Aquarelle pédagogique pour 现在."}, "天": {"src": "assets/vocabulary/hsk1-ep04-27.jpg", "alt": "Aquarelle pédagogique pour 天."}, "晚": {"src": "assets/vocabulary/hsk1-ep04-28.jpg", "alt": "Aquarelle pédagogique pour 晚."}, "早": {"src": "assets/vocabulary/hsk1-ep04-29.jpg", "alt": "Aquarelle pédagogique pour 早."}, "茶": {"src": "assets/vocabulary/hsk1-ep05-01.jpg", "alt": "Aquarelle pédagogique pour 茶."}, "水": {"src": "assets/vocabulary/hsk1-ep05-02.jpg", "alt": "Aquarelle pédagogique pour 水."}, "喝": {"src": "assets/vocabulary/hsk1-ep05-03.jpg", "alt": "Aquarelle pédagogique pour 喝."}, "吃": {"src": "assets/vocabulary/hsk1-ep05-04.jpg", "alt": "Aquarelle pédagogique pour 吃."}, "饭": {"src": "assets/vocabulary/hsk1-ep05-05.jpg", "alt": "Aquarelle pédagogique pour 饭."}, "米饭": {"src": "assets/vocabulary/hsk1-ep05-06.jpg", "alt": "Aquarelle pédagogique pour 米饭."}, "面包": {"src": "assets/vocabulary/hsk1-ep05-07.jpg", "alt": "Aquarelle pédagogique pour 面包."}, "包子": {"src": "assets/vocabulary/hsk1-ep05-08.jpg", "alt": "Aquarelle pédagogique pour 包子."}, "饺子": {"src": "assets/vocabulary/hsk1-ep05-09.jpg", "alt": "Aquarelle pédagogique pour 饺子."}, "面条儿": {"src": "assets/vocabulary/hsk1-ep05-10.jpg", "alt": "Aquarelle pédagogique pour 面条儿."}, "鸡蛋": {"src": "assets/vocabulary/hsk1-ep05-11.jpg", "alt": "Aquarelle pédagogique pour 鸡蛋."}, "牛奶": {"src": "assets/vocabulary/hsk1-ep05-12.jpg", "alt": "Aquarelle pédagogique pour 牛奶."}, "水果": {"src": "assets/vocabulary/hsk1-ep05-13.jpg", "alt": "Aquarelle pédagogique pour 水果."}, "苹果": {"src": "assets/vocabulary/hsk1-ep05-14.jpg", "alt": "Aquarelle pédagogique pour 苹果."}, "菜": {"src": "assets/vocabulary/hsk1-ep05-15.jpg", "alt": "Aquarelle pédagogique pour 菜."}, "好吃": {"src": "assets/vocabulary/hsk1-ep05-16.jpg", "alt": "Aquarelle pédagogique pour 好吃."}, "早饭": {"src": "assets/vocabulary/hsk1-ep05-17.jpg", "alt": "Aquarelle pédagogique pour 早饭."}, "午饭": {"src": "assets/vocabulary/hsk1-ep05-18.jpg", "alt": "Aquarelle pédagogique pour 午饭."}, "晚饭": {"src": "assets/vocabulary/hsk1-ep05-19.jpg", "alt": "Aquarelle pédagogique pour 晚饭."}, "饭店": {"src": "assets/vocabulary/hsk1-ep05-20.jpg", "alt": "Aquarelle pédagogique pour 饭店."}, "杯子": {"src": "assets/vocabulary/hsk1-ep05-21.jpg", "alt": "Aquarelle pédagogique pour 杯子."}, "做饭": {"src": "assets/vocabulary/hsk1-ep05-22.jpg", "alt": "Aquarelle pédagogique pour 做饭."}, "要": {"src": "assets/vocabulary/hsk1-ep05-23.jpg", "alt": "Aquarelle pédagogique pour 要."}, "喜欢": {"src": "assets/vocabulary/hsk1-ep05-24.jpg", "alt": "Aquarelle pédagogique pour 喜欢."}, "口": {"src": "assets/vocabulary/hsk1-ep05-25.jpg", "alt": "Aquarelle pédagogique pour 口."}, "买": {"src": "assets/vocabulary/hsk1-ep06-01.jpg", "alt": "Aquarelle pédagogique pour 买."}, "卖": {"src": "assets/vocabulary/hsk1-ep06-02.jpg", "alt": "Aquarelle pédagogique pour 卖."}, "店": {"src": "assets/vocabulary/hsk1-ep06-03.jpg", "alt": "Aquarelle pédagogique pour 店."}, "商店": {"src": "assets/vocabulary/hsk1-ep06-04.jpg", "alt": "Aquarelle pédagogique pour 商店."}, "超市": {"src": "assets/vocabulary/hsk1-ep06-05.jpg", "alt": "Aquarelle pédagogique pour 超市."}, "书店": {"src": "assets/vocabulary/hsk1-ep06-06.jpg", "alt": "Aquarelle pédagogique pour 书店."}, "东西": {"src": "assets/vocabulary/hsk1-ep06-07.jpg", "alt": "Aquarelle pédagogique pour 东西."}, "贵": {"src": "assets/vocabulary/hsk1-ep06-08.jpg", "alt": "Aquarelle pédagogique pour 贵."}, "便宜": {"src": "assets/vocabulary/hsk1-ep06-09.jpg", "alt": "Aquarelle pédagogique pour 便宜."}, "找": {"src": "assets/vocabulary/hsk1-ep06-10.jpg", "alt": "Aquarelle pédagogique pour 找."}, "给": {"src": "assets/vocabulary/hsk1-ep06-11.jpg", "alt": "Aquarelle pédagogique pour 给."}, "有": {"src": "assets/vocabulary/hsk1-ep06-12.jpg", "alt": "Aquarelle pédagogique pour 有."}, "没有": {"src": "assets/vocabulary/hsk1-ep06-13.jpg", "alt": "Aquarelle pédagogique pour 没有."}, "哪": {"src": "assets/vocabulary/hsk1-ep06-14.jpg", "alt": "Aquarelle pédagogique pour 哪."}, "哪个": {"src": "assets/vocabulary/hsk1-ep06-15.jpg", "alt": "Aquarelle pédagogique pour 哪个."}, "那个": {"src": "assets/vocabulary/hsk1-ep06-16.jpg", "alt": "Aquarelle pédagogique pour 那个."}, "这个": {"src": "assets/vocabulary/hsk1-ep06-17.jpg", "alt": "Aquarelle pédagogique pour 这个."}, "这些": {"src": "assets/vocabulary/hsk1-ep06-18.jpg", "alt": "Aquarelle pédagogique pour 这些."}, "那些": {"src": "assets/vocabulary/hsk1-ep06-19.jpg", "alt": "Aquarelle pédagogique pour 那些."}, "哪些": {"src": "assets/vocabulary/hsk1-ep06-20.jpg", "alt": "Aquarelle pédagogique pour 哪些."}, "些": {"src": "assets/vocabulary/hsk1-ep06-21.jpg", "alt": "Aquarelle pédagogique pour 些."}, "本": {"src": "assets/vocabulary/hsk1-ep06-22.jpg", "alt": "Aquarelle pédagogique pour 本."}, "件": {"src": "assets/vocabulary/hsk1-ep06-23.jpg", "alt": "Aquarelle pédagogique pour 件."}, "衣服": {"src": "assets/vocabulary/hsk1-ep06-24.jpg", "alt": "Aquarelle pédagogique pour 衣服."}, "新": {"src": "assets/vocabulary/hsk1-ep06-25.jpg", "alt": "Aquarelle pédagogique pour 新."}, "那": {"src": "assets/vocabulary/hsk1-ep06-26.jpg", "alt": "Aquarelle pédagogique pour 那."}, "中国": {"src": "assets/vocabulary/hsk1-ep07-01.jpg", "alt": "Aquarelle pédagogique pour 中国."}, "国": {"src": "assets/vocabulary/hsk1-ep07-02.jpg", "alt": "Aquarelle pédagogique pour 国."}, "哪里": {"src": "assets/vocabulary/hsk1-ep07-03.jpg", "alt": "Aquarelle pédagogique pour 哪里."}, "哪儿": {"src": "assets/vocabulary/hsk1-ep07-04.jpg", "alt": "Aquarelle pédagogique pour 哪儿."}, "那里": {"src": "assets/vocabulary/hsk1-ep07-05.jpg", "alt": "Aquarelle pédagogique pour 那里."}, "那儿": {"src": "assets/vocabulary/hsk1-ep07-06.jpg", "alt": "Aquarelle pédagogique pour 那儿."}, "这里": {"src": "assets/vocabulary/hsk1-ep07-07.jpg", "alt": "Aquarelle pédagogique pour 这里."}, "这儿": {"src": "assets/vocabulary/hsk1-ep07-08.jpg", "alt": "Aquarelle pédagogique pour 这儿."}, "那边": {"src": "assets/vocabulary/hsk1-ep07-09.jpg", "alt": "Aquarelle pédagogique pour 那边."}, "这边": {"src": "assets/vocabulary/hsk1-ep07-10.jpg", "alt": "Aquarelle pédagogique pour 这边."}, "边": {"src": "assets/vocabulary/hsk1-ep07-11.jpg", "alt": "Aquarelle pédagogique pour 边."}, "外": {"src": "assets/vocabulary/hsk1-ep07-12.jpg", "alt": "Aquarelle pédagogique pour 外."}, "外边": {"src": "assets/vocabulary/hsk1-ep07-13.jpg", "alt": "Aquarelle pédagogique pour 外边."}, "里": {"src": "assets/vocabulary/hsk1-ep07-14.jpg", "alt": "Aquarelle pédagogique pour 里."}, "前": {"src": "assets/vocabulary/hsk1-ep07-15.jpg", "alt": "Aquarelle pédagogique pour 前."}, "后": {"src": "assets/vocabulary/hsk1-ep07-16.jpg", "alt": "Aquarelle pédagogique pour 后."}, "上": {"src": "assets/vocabulary/hsk1-ep07-17.jpg", "alt": "Aquarelle pédagogique pour 上."}, "下": {"src": "assets/vocabulary/hsk1-ep07-18.jpg", "alt": "Aquarelle pédagogique pour 下."}, "去": {"src": "assets/vocabulary/hsk1-ep07-19.jpg", "alt": "Aquarelle pédagogique pour 去."}, "来": {"src": "assets/vocabulary/hsk1-ep07-20.jpg", "alt": "Aquarelle pédagogique pour 来."}, "回": {"src": "assets/vocabulary/hsk1-ep07-21.jpg", "alt": "Aquarelle pédagogique pour 回."}, "到": {"src": "assets/vocabulary/hsk1-ep07-22.jpg", "alt": "Aquarelle pédagogique pour 到."}, "车": {"src": "assets/vocabulary/hsk1-ep07-23.jpg", "alt": "Aquarelle pédagogique pour 车."}, "出租车": {"src": "assets/vocabulary/hsk1-ep07-24.jpg", "alt": "Aquarelle pédagogique pour 出租车."}, "飞机": {"src": "assets/vocabulary/hsk1-ep07-25.jpg", "alt": "Aquarelle pédagogique pour 飞机."}, "火车": {"src": "assets/vocabulary/hsk1-ep07-26.jpg", "alt": "Aquarelle pédagogique pour 火车."}, "在": {"src": "assets/vocabulary/hsk1-ep07-27.jpg", "alt": "Aquarelle pédagogique pour 在."}, "大学": {"src": "assets/vocabulary/hsk1-ep08-01.jpg", "alt": "Aquarelle pédagogique pour 大学."}, "大学生": {"src": "assets/vocabulary/hsk1-ep08-02.jpg", "alt": "Aquarelle pédagogique pour 大学生."}, "学校": {"src": "assets/vocabulary/hsk1-ep08-03.jpg", "alt": "Aquarelle pédagogique pour 学校."}, "小学": {"src": "assets/vocabulary/hsk1-ep08-04.jpg", "alt": "Aquarelle pédagogique pour 小学."}, "小学生": {"src": "assets/vocabulary/hsk1-ep08-05.jpg", "alt": "Aquarelle pédagogique pour 小学生."}, "中学": {"src": "assets/vocabulary/hsk1-ep08-06.jpg", "alt": "Aquarelle pédagogique pour 中学."}, "中学生": {"src": "assets/vocabulary/hsk1-ep08-07.jpg", "alt": "Aquarelle pédagogique pour 中学生."}, "学生": {"src": "assets/vocabulary/hsk1-ep08-08.jpg", "alt": "Aquarelle pédagogique pour 学生."}, "同学": {"src": "assets/vocabulary/hsk1-ep08-09.jpg", "alt": "Aquarelle pédagogique pour 同学."}, "老师": {"src": "assets/vocabulary/hsk1-ep08-10.jpg", "alt": "Aquarelle pédagogique pour 老师."}, "课": {"src": "assets/vocabulary/hsk1-ep08-11.jpg", "alt": "Aquarelle pédagogique pour 课."}, "上课": {"src": "assets/vocabulary/hsk1-ep08-12.jpg", "alt": "Aquarelle pédagogique pour 上课."}, "下课": {"src": "assets/vocabulary/hsk1-ep08-13.jpg", "alt": "Aquarelle pédagogique pour 下课."}, "上学": {"src": "assets/vocabulary/hsk1-ep08-14.jpg", "alt": "Aquarelle pédagogique pour 上学."}, "学": {"src": "assets/vocabulary/hsk1-ep08-15.jpg", "alt": "Aquarelle pédagogique pour 学."}, "学习": {"src": "assets/vocabulary/hsk1-ep08-16.jpg", "alt": "Aquarelle pédagogique pour 学习."}, "汉语": {"src": "assets/vocabulary/hsk1-ep08-17.jpg", "alt": "Aquarelle pédagogique pour 汉语."}, "汉字": {"src": "assets/vocabulary/hsk1-ep08-18.jpg", "alt": "Aquarelle pédagogique pour 汉字."}, "中文": {"src": "assets/vocabulary/hsk1-ep08-19.jpg", "alt": "Aquarelle pédagogique pour 中文."}, "字": {"src": "assets/vocabulary/hsk1-ep08-20.jpg", "alt": "Aquarelle pédagogique pour 字."}, "读": {"src": "assets/vocabulary/hsk1-ep08-21.jpg", "alt": "Aquarelle pédagogique pour 读."}, "读书": {"src": "assets/vocabulary/hsk1-ep08-22.jpg", "alt": "Aquarelle pédagogique pour 读书."}, "书": {"src": "assets/vocabulary/hsk1-ep08-23.jpg", "alt": "Aquarelle pédagogique pour 书."}, "写": {"src": "assets/vocabulary/hsk1-ep08-24.jpg", "alt": "Aquarelle pédagogique pour 写."}, "问题": {"src": "assets/vocabulary/hsk1-ep08-25.jpg", "alt": "Aquarelle pédagogique pour 问题."}, "起床": {"src": "assets/vocabulary/hsk1-ep09-01.jpg", "alt": "Aquarelle pédagogique pour 起床."}, "睡觉": {"src": "assets/vocabulary/hsk1-ep09-02.jpg", "alt": "Aquarelle pédagogique pour 睡觉."}, "睡": {"src": "assets/vocabulary/hsk1-ep09-03.jpg", "alt": "Aquarelle pédagogique pour 睡."}, "休息": {"src": "assets/vocabulary/hsk1-ep09-04.jpg", "alt": "Aquarelle pédagogique pour 休息."}, "上班": {"src": "assets/vocabulary/hsk1-ep09-05.jpg", "alt": "Aquarelle pédagogique pour 上班."}, "下班": {"src": "assets/vocabulary/hsk1-ep09-06.jpg", "alt": "Aquarelle pédagogique pour 下班."}, "工作": {"src": "assets/vocabulary/hsk1-ep09-07.jpg", "alt": "Aquarelle pédagogique pour 工作."}, "公司": {"src": "assets/vocabulary/hsk1-ep09-08.jpg", "alt": "Aquarelle pédagogique pour 公司."}, "电脑": {"src": "assets/vocabulary/hsk1-ep09-09.jpg", "alt": "Aquarelle pédagogique pour 电脑."}, "手机": {"src": "assets/vocabulary/hsk1-ep09-10.jpg", "alt": "Aquarelle pédagogique pour 手机."}, "电话": {"src": "assets/vocabulary/hsk1-ep09-11.jpg", "alt": "Aquarelle pédagogique pour 电话."}, "打电话": {"src": "assets/vocabulary/hsk1-ep09-12.jpg", "alt": "Aquarelle pédagogique pour 打电话."}, "电视": {"src": "assets/vocabulary/hsk1-ep09-13.jpg", "alt": "Aquarelle pédagogique pour 电视."}, "电影": {"src": "assets/vocabulary/hsk1-ep09-14.jpg", "alt": "Aquarelle pédagogique pour 电影."}, "电影院": {"src": "assets/vocabulary/hsk1-ep09-15.jpg", "alt": "Aquarelle pédagogique pour 电影院."}, "看": {"src": "assets/vocabulary/hsk1-ep09-16.jpg", "alt": "Aquarelle pédagogique pour 看."}, "听": {"src": "assets/vocabulary/hsk1-ep09-17.jpg", "alt": "Aquarelle pédagogique pour 听."}, "说": {"src": "assets/vocabulary/hsk1-ep09-18.jpg", "alt": "Aquarelle pédagogique pour 说."}, "说话": {"src": "assets/vocabulary/hsk1-ep09-19.jpg", "alt": "Aquarelle pédagogique pour 说话."}, "唱": {"src": "assets/vocabulary/hsk1-ep09-20.jpg", "alt": "Aquarelle pédagogique pour 唱."}, "歌": {"src": "assets/vocabulary/hsk1-ep09-21.jpg", "alt": "Aquarelle pédagogique pour 歌."}, "玩": {"src": "assets/vocabulary/hsk1-ep09-22.jpg", "alt": "Aquarelle pédagogique pour 玩."}, "大": {"src": "assets/vocabulary/hsk1-ep10-01.jpg", "alt": "Aquarelle pédagogique pour 大."}, "小": {"src": "assets/vocabulary/hsk1-ep10-02.jpg", "alt": "Aquarelle pédagogique pour 小."}, "漂亮": {"src": "assets/vocabulary/hsk1-ep10-03.jpg", "alt": "Aquarelle pédagogique pour 漂亮."}, "好看": {"src": "assets/vocabulary/hsk1-ep10-04.jpg", "alt": "Aquarelle pédagogique pour 好看."}, "好听": {"src": "assets/vocabulary/hsk1-ep10-05.jpg", "alt": "Aquarelle pédagogique pour 好听."}, "好玩儿": {"src": "assets/vocabulary/hsk1-ep10-06.jpg", "alt": "Aquarelle pédagogique pour 好玩儿."}, "高兴": {"src": "assets/vocabulary/hsk1-ep10-07.jpg", "alt": "Aquarelle pédagogique pour 高兴."}, "忙": {"src": "assets/vocabulary/hsk1-ep10-08.jpg", "alt": "Aquarelle pédagogique pour 忙."}, "很": {"src": "assets/vocabulary/hsk1-ep10-09.jpg", "alt": "Aquarelle pédagogique pour 很."}, "非常": {"src": "assets/vocabulary/hsk1-ep10-10.jpg", "alt": "Aquarelle pédagogique pour 非常."}, "太": {"src": "assets/vocabulary/hsk1-ep10-11.jpg", "alt": "Aquarelle pédagogique pour 太."}, "真": {"src": "assets/vocabulary/hsk1-ep10-12.jpg", "alt": "Aquarelle pédagogique pour 真."}, "冷": {"src": "assets/vocabulary/hsk1-ep10-13.jpg", "alt": "Aquarelle pédagogique pour 冷."}, "热": {"src": "assets/vocabulary/hsk1-ep10-14.jpg", "alt": "Aquarelle pédagogique pour 热."}, "天气": {"src": "assets/vocabulary/hsk1-ep10-15.jpg", "alt": "Aquarelle pédagogique pour 天气."}, "下雨": {"src": "assets/vocabulary/hsk1-ep10-16.jpg", "alt": "Aquarelle pédagogique pour 下雨."}, "雨": {"src": "assets/vocabulary/hsk1-ep10-17.jpg", "alt": "Aquarelle pédagogique pour 雨."}, "雪": {"src": "assets/vocabulary/hsk1-ep10-18.jpg", "alt": "Aquarelle pédagogique pour 雪."}, "爱": {"src": "assets/vocabulary/hsk1-ep10-19.jpg", "alt": "Aquarelle pédagogique pour 爱."}, "觉得": {"src": "assets/vocabulary/hsk1-ep10-20.jpg", "alt": "Aquarelle pédagogique pour 觉得."}, "想": {"src": "assets/vocabulary/hsk1-ep10-21.jpg", "alt": "Aquarelle pédagogique pour 想."}, "可以": {"src": "assets/vocabulary/hsk1-ep10-22.jpg", "alt": "Aquarelle pédagogique pour 可以."}, "会": {"src": "assets/vocabulary/hsk1-ep10-23.jpg", "alt": "Aquarelle pédagogique pour 会."}, "病": {"src": "assets/vocabulary/hsk1-ep11-01.jpg", "alt": "Aquarelle pédagogique pour 病."}, "生病": {"src": "assets/vocabulary/hsk1-ep11-02.jpg", "alt": "Aquarelle pédagogique pour 生病."}, "看病": {"src": "assets/vocabulary/hsk1-ep11-03.jpg", "alt": "Aquarelle pédagogique pour 看病."}, "医生": {"src": "assets/vocabulary/hsk1-ep11-04.jpg", "alt": "Aquarelle pédagogique pour 医生."}, "医院": {"src": "assets/vocabulary/hsk1-ep11-05.jpg", "alt": "Aquarelle pédagogique pour 医院."}, "没事": {"src": "assets/vocabulary/hsk1-ep11-06.jpg", "alt": "Aquarelle pédagogique pour 没事."}, "不要": {"src": "assets/vocabulary/hsk1-ep11-07.jpg", "alt": "Aquarelle pédagogique pour 不要."}, "不": {"src": "assets/vocabulary/hsk1-ep11-08.jpg", "alt": "Aquarelle pédagogique pour 不."}, "能": {"src": "assets/vocabulary/hsk1-ep11-09.jpg", "alt": "Aquarelle pédagogique pour 能."}, "知道": {"src": "assets/vocabulary/hsk1-ep11-10.jpg", "alt": "Aquarelle pédagogique pour 知道."}, "怎么": {"src": "assets/vocabulary/hsk1-ep11-11.jpg", "alt": "Aquarelle pédagogique pour 怎么."}, "怎么样": {"src": "assets/vocabulary/hsk1-ep11-12.jpg", "alt": "Aquarelle pédagogique pour 怎么样."}, "问": {"src": "assets/vocabulary/hsk1-ep11-13.jpg", "alt": "Aquarelle pédagogique pour 问."}, "喂": {"src": "assets/vocabulary/hsk1-ep11-14.jpg", "alt": "Aquarelle pédagogique pour 喂."}, "对": {"src": "assets/vocabulary/hsk1-ep11-15.jpg", "alt": "Aquarelle pédagogique pour 对."}, "也": {"src": "assets/vocabulary/hsk1-ep11-16.jpg", "alt": "Aquarelle pédagogique pour 也."}, "都": {"src": "assets/vocabulary/hsk1-ep11-17.jpg", "alt": "Aquarelle pédagogique pour 都."}, "还": {"src": "assets/vocabulary/hsk1-ep11-18.jpg", "alt": "Aquarelle pédagogique pour 还."}, "和": {"src": "assets/vocabulary/hsk1-ep11-19.jpg", "alt": "Aquarelle pédagogique pour 和."}, "吧": {"src": "assets/vocabulary/hsk1-ep11-20.jpg", "alt": "Aquarelle pédagogique pour 吧."}, "呢": {"src": "assets/vocabulary/hsk1-ep11-21.jpg", "alt": "Aquarelle pédagogique pour 呢."}, "了": {"src": "assets/vocabulary/hsk1-ep11-22.jpg", "alt": "Aquarelle pédagogique pour 了."}, "的": {"src": "assets/vocabulary/hsk1-ep11-23.jpg", "alt": "Aquarelle pédagogique pour 的."}, "事": {"src": "assets/vocabulary/hsk1-ep11-24.jpg", "alt": "Aquarelle pédagogique pour 事."}, "开": {"src": "assets/vocabulary/hsk1-ep12-01.jpg", "alt": "Aquarelle pédagogique pour 开."}, "开车": {"src": "assets/vocabulary/hsk1-ep12-02.jpg", "alt": "Aquarelle pédagogique pour 开车."}, "见": {"src": "assets/vocabulary/hsk1-ep12-03.jpg", "alt": "Aquarelle pédagogique pour 见."}, "看见": {"src": "assets/vocabulary/hsk1-ep12-04.jpg", "alt": "Aquarelle pédagogique pour 看见."}, "听见": {"src": "assets/vocabulary/hsk1-ep12-05.jpg", "alt": "Aquarelle pédagogique pour 听见."}, "坐": {"src": "assets/vocabulary/hsk1-ep12-06.jpg", "alt": "Aquarelle pédagogique pour 坐."}, "住": {"src": "assets/vocabulary/hsk1-ep12-07.jpg", "alt": "Aquarelle pédagogique pour 住."}, "椅子": {"src": "assets/vocabulary/hsk1-ep12-08.jpg", "alt": "Aquarelle pédagogique pour 椅子."}, "桌子": {"src": "assets/vocabulary/hsk1-ep12-09.jpg", "alt": "Aquarelle pédagogique pour 桌子."}, "狗": {"src": "assets/vocabulary/hsk1-ep12-10.jpg", "alt": "Aquarelle pédagogique pour 狗."}, "猫": {"src": "assets/vocabulary/hsk1-ep12-11.jpg", "alt": "Aquarelle pédagogique pour 猫."}, "它": {"src": "assets/vocabulary/hsk1-ep12-12.jpg", "alt": "Aquarelle pédagogique pour 它."}, "它们": {"src": "assets/vocabulary/hsk1-ep12-13.jpg", "alt": "Aquarelle pédagogique pour 它们."}, "小朋友": {"src": "assets/vocabulary/hsk1-ep12-14.jpg", "alt": "Aquarelle pédagogique pour 小朋友."}, "有的": {"src": "assets/vocabulary/hsk1-ep12-15.jpg", "alt": "Aquarelle pédagogique pour 有的."}, "有些": {"src": "assets/vocabulary/hsk1-ep12-16.jpg", "alt": "Aquarelle pédagogique pour 有些."}, "有点儿": {"src": "assets/vocabulary/hsk1-ep12-17.jpg", "alt": "Aquarelle pédagogique pour 有点儿."}, "一下": {"src": "assets/vocabulary/hsk1-ep12-18.jpg", "alt": "Aquarelle pédagogique pour 一下."}, "正在": {"src": "assets/vocabulary/hsk1-ep12-19.jpg", "alt": "Aquarelle pédagogique pour 正在."}, "做": {"src": "assets/vocabulary/hsk1-ep12-20.jpg", "alt": "Aquarelle pédagogique pour 做."}, "穿": {"src": "assets/vocabulary/hsk1-ep12-21.jpg", "alt": "Aquarelle pédagogique pour 穿."}, "只": {"src": "assets/vocabulary/hsk1-ep12-22.jpg", "alt": "Aquarelle pédagogique pour 只."}, "第": {"src": "assets/vocabulary/hsk1-ep12-23.jpg", "alt": "Aquarelle pédagogique pour 第."}, "房间": {"src": "assets/vocabulary/hsk1-ep12-24.jpg", "alt": "Aquarelle pédagogique pour 房间."}, "再": {"src": "assets/vocabulary/hsk1-ep12-25.jpg", "alt": "Aquarelle pédagogique pour 再."}};
function vocabIllustration(v){const art=VOCAB_WATERCOLORS[v[0]];const fallback='<span class="word-pictogram" role="img" aria-label="Illustration : '+esc(v[2])+'">'+vocabPictogram(v)+'</span>';if(!art)return fallback;return '<span class="word-art"><img class="word-watercolor" src="'+art.src+'" alt="'+esc(art.alt)+'" width="96" height="96" loading="lazy" decoding="async" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden class="word-art-fallback" role="img" aria-label="Illustration : '+esc(v[2])+'">'+vocabPictogram(v)+'</span></span>';}
function wordCards(arr){return arr.map(v=>`<div class="paper word-entry">${vocabIllustration(v)}<label class="word-check"><input type="checkbox" ${state.reviewSelected.includes(v[0])?'checked':''} onchange="toggleReview('${v[0]}',this.checked)" aria-label="Réviser ${esc(v[0])}"><span class="han">${esc(v[0])}</span></label><div class="word-detail"><strong>${esc(v[1])}</strong> · ${esc(v[2])}<div class="small muted">Leçon ${wordLesson(v[0])||'—'} · ${esc(wordThemes[v[0]]||'Autre')} · ${esc(wordDate(v[0])||'Date non enregistrée')}</div></div><button onclick="speak('${v[0]}')" aria-label="Écouter ${esc(v[0])}">🔊</button></div>`).join('')||'<p>Aucun mot ne correspond aux filtres, ou aucun mot appris pour le moment.</p>'}
function renderWordList(){const el=document.getElementById('word-list');if(el)el.innerHTML=wordCards(filteredWords());const c=document.getElementById('word-count');if(c)c.textContent='('+filteredWords().length+')'}
function toggleReview(word,checked){if(checked&&!state.reviewSelected.includes(word))state.reviewSelected.push(word);if(!checked)state.reviewSelected=state.reviewSelected.filter(w=>w!==word);save();const el=document.getElementById('revision-count');if(el)el.textContent=state.reviewSelected.length;const btn=document.querySelector('[onclick="startRevision()"]');if(btn)btn.disabled=!state.reviewSelected.length}
function selectVisibleWords(){filteredWords().forEach(v=>{if(!state.reviewSelected.includes(v[0]))state.reviewSelected.push(v[0])});save();render()}
function clearReview(){state.reviewSelected=[];save();render()}
function shuffleWords(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function speakingPool(){return learnedWords().filter(v=>speakingMode==='all'||(speakingMode==='selection'?state.reviewSelected.includes(v[0]):wordThemes[v[0]]===speakingMode))}
function startSpeakingPractice(){const pool=speakingPool();if(!pool.length){alert('Aucun mot disponible dans ce groupe.');return}speakingItems=[];while(speakingItems.length<speakingCount)speakingItems.push(...shuffleWords(pool));speakingItems=speakingItems.slice(0,speakingCount);speakingIndex=0;speakingScore=0;speakingAttempts=0;speakingFinished=false;showSpeakingPractice()}
function stopSpeakingPractice(){if(speakingRecognition){const r=speakingRecognition;speakingRecognition=null;r.abort()}document.getElementById('speaking-overlay')?.remove()}
function nextSpeakingPractice(){if(speakingRecognition){const r=speakingRecognition;speakingRecognition=null;r.abort()}speakingIndex++;speakingAttempts=0;speakingFinished=false;showSpeakingPractice()}
function showSpeakingPractice(message){let el=document.getElementById('speaking-overlay');if(!el){el=document.createElement('div');el.id='speaking-overlay';el.className='profile-overlay';document.body.appendChild(el)}const v=speakingItems[speakingIndex];if(!v){el.innerHTML='<section class="profile-sheet revision-sheet"><h2>Bilan oral</h2><p>'+speakingScore+' / '+speakingItems.length+' mots reconnus</p><p>La reconnaissance ne vérifie pas précisément les tons.</p><button onclick="stopSpeakingPractice()">Retour au carnet</button></section>';return}el.innerHTML='<section class="profile-sheet revision-sheet" role="dialog" aria-modal="true"><button class="profile-close" onclick="stopSpeakingPractice()">✕</button><h2>Prononciation '+(speakingIndex+1)+' / '+speakingItems.length+'</h2><p class="han revision-word">'+esc(v[0])+'</p><p>'+esc(v[1])+' · '+esc(v[2])+'</p><button onclick="speak(speakingItems[speakingIndex][0])">🔊 Écouter</button><div class="controls"><button class="primary" onclick="listenSpeakingPractice()" '+(speakingRecognition||speakingFinished?'disabled':'')+'>🎙️ Prononcer</button><button onclick="nextSpeakingPractice()">Suivant →</button></div><p role="status">'+esc(message||'Écoute le modèle, puis prononce le mot.')+'</p><p class="small muted">3 essais maximum ; la transcription ne garantit pas la justesse des tons.</p></section>'}
function listenSpeakingPractice(){if(speakingRecognition||speakingFinished)return;const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!window.isSecureContext||!SR){showSpeakingPractice('Reconnaissance indisponible : utilise Chrome sur HTTPS.');return}window.speechSynthesis?.cancel();const r=new SR();speakingRecognition=r;r.lang='zh-CN';r.interimResults=true;r.maxAlternatives=5;r.onspeechend=()=>{try{r.stop()}catch{}};showSpeakingPractice('Micro actif : prononce le mot, puis attends.');r.onresult=e=>{if(speakingRecognition!==r)return;const res=e.results[e.results.length-1];if(!res)return;if(!res.isFinal){showSpeakingPractice('Je t’entends : '+(res[0]?.transcript||'…'));return}const alternatives=Array.from(res).map(x=>x.transcript.trim()).filter(Boolean);const target=speakingItems[speakingIndex][0];const best=speechMatchAny(alternatives,[target]),good=best.ok;speakingRecognition=null;speakingAttempts++;if(good){speakingScore++;speakingFinished=true}else if(speakingAttempts>=3)speakingFinished=true;showSpeakingPractice('Reconnu : '+alternatives.join(' / ')+(good?' ✓ Correct !'+speechLevelNote(best):best.level==='tone'?' · Presque ! Les syllabes sont bonnes mais un ton diffère. Réessaie ('+speakingAttempts+'/3).':speakingFinished?' · Trois essais terminés. Passe au suivant.':' · Réessaie ('+speakingAttempts+'/3).'))};r.onerror=e=>{if(speakingRecognition!==r)return;speakingRecognition=null;showSpeakingPractice('Micro : '+e.error+'. Vérifie les autorisations et réessaie.')};r.onend=()=>{if(speakingRecognition===r){speakingRecognition=null;showSpeakingPractice('Aucun mot reconnu. Tu peux réessayer.')}};try{r.start()}catch(e){speakingRecognition=null;showSpeakingPractice('Impossible de démarrer le micro : '+e.message)}}
function startRevision(){revisionIndex=0;revisionReveal=false;showRevision()}
function showRevision(){const words=state.reviewSelected.filter(w=>learnedWords().some(v=>v[0]===w));if(!words.length){alert('Sélectionne des mots dans le carnet.');return}const word=words[revisionIndex%words.length],v=vocab.find(v=>v[0]===word);let el=document.getElementById('revision-overlay');if(!el){el=document.createElement('div');el.id='revision-overlay';el.className='profile-overlay';document.body.appendChild(el)}el.innerHTML=`<section class="profile-sheet revision-sheet" role="dialog" aria-modal="true"><button class="profile-close" onclick="document.getElementById('revision-overlay').remove()" aria-label="Fermer">✕</button><h2>Révision · ${revisionIndex%words.length+1}/${words.length}</h2><p class="han revision-word">${esc(word)}</p><button onclick="speak('${word}')">🔊 Écouter</button>${revisionReveal?`<p class="revision-answer"><strong>${esc(v[1])}</strong> · ${esc(v[2])}</p>`:'<p>Retrouve le sens et la prononciation avant de révéler la réponse.</p>'}<div class="controls"><button onclick="revisionReveal=true;showRevision()">Voir la réponse</button><button class="primary" onclick="revisionIndex++;revisionReveal=false;showRevision()">Mot suivant →</button></div><p class="small muted">Entraînement libre, sans XP. Les mots restent cochés pour une prochaine révision.</p></section>`}
const charData={'你':['nǐ','tu, toi',7,['丿','丨','丿','㇖','亅','丿','㇏']],'好':['hǎo','bon, bien',6,['𡿨','丿','一','㇇','亅','一']],'我':['wǒ','je, moi',7,['丿','一','亅','㇀','㇂','丿','丶']],'龙':['lóng','dragon',5,['一','丿','乚','丿','丶']]};const writingDetails={"你":["nǐ","tu, toi",7,"亻","Écrire 亻 à gauche, puis 尔."],"好":["hǎo","bon, bien",6,"女","Écrire 女 à gauche, puis 子."],"我":["wǒ","je, moi",7,"戈","Observer les traits croisés et le crochet."],"叫":["jiào","s’appeler, appeler",5,"口","Écrire 口 à gauche, puis 丩."],"名":["míng","nom",6,"口","Écrire 夕 en haut, puis 口."],"字":["zì","caractère écrit",6,"子","Écrire 宀 en haut, puis 子."],"谢":["xiè","remercier",12,"讠","Écrire 讠 à gauche, puis 射."],"龙":["lóng","dragon",5,"龙","Forme traditionnelle : 龍."],"喝":["hē","boire",12,"口","Écrire 口 à gauche, puis 曷."],"茶":["chá","thé",9,"艹","Écrire 艹 en haut, puis les éléments inférieurs."],"吗":["ma","particule interrogative",6,"口","Écrire 口 à gauche, puis 马."]};
function writingDetail(c){return writingDetails[c]||['','Sens à documenter',null,'','Guide à compléter']}
function writingCharacters(){return [...new Set(learnedWords().flatMap(v=>[...v[0]]).filter(c=>/[\u3400-\u9fff]/.test(c)))]}
function writingMatches(c){return (writingEpisode==='all'||learnedWords().some(v=>String(episodeOfWord(v[0]))===writingEpisode&&v[0].includes(c)))&&(!writingSearch||c.includes(writingSearch)||vocab.some(v=>v[0].includes(c)&&v.join(' ').toLowerCase().includes(writingSearch.toLowerCase())))}
function writingTheme(c){const v=learnedWords().find(v=>v[0].includes(c));return v?wordThemes[v[0]]||'Autre':'Autre'}
function toggleWritingSelection(c,checked){if(checked&&!writingSelected.includes(c))writingSelected.push(c);if(!checked)writingSelected=writingSelected.filter(x=>x!==c);state.writingSelected=writingSelected;save();render()}
function startWritingTest(){const pool=writingCharacters().filter(c=>writingTestMode==='all'||(writingTestMode==='selection'?writingSelected.includes(c):writingTheme(c)===writingTestMode));if(!pool.length){alert('Aucun caractère disponible dans cette sélection.');return}writingTestItems=[];while(writingTestItems.length<writingTestCount)writingTestItems.push(...shuffleWords(pool));writingTestItems=writingTestItems.slice(0,writingTestCount);writingTest=true;writingTestIndex=0;writingTestResults=[];writingReveal=false;drawChar=writingTestItems[0];strokes=[];render()}
function nextWritingTest(){if(!writingTestResults[writingTestIndex])writingTestResults[writingTestIndex]={character:drawChar,mastered:false,skipped:true};writingTestIndex++;if(writingTestIndex>=writingTestItems.length){writingTest=false;const passed=writingTestResults.filter(x=>x?.mastered).length;alert('Test terminé : '+passed+' / '+writingTestItems.length+' caractères réussis sans aide. Les caractères passés ou aidés ne comptent pas comme maîtrisés.');render();return}drawChar=writingTestItems[writingTestIndex];writingReveal=false;strokes=[];render()}
function calligraphy(){let learned=writingCharacters(),matches=learned.filter(c=>writingMatches(c)),d=charData[drawChar]||null;let detail=writingDetail(drawChar);if(!learned.length)return `<div class="art-banner writing-banner"><h1>Atelier de calligraphie</h1></div><main class="page"><div class="paper">Les caractères apparaîtront ici après tes premières leçons réussies.</div></main>`;if(!learned.includes(drawChar)&&learned.length){drawChar=learned[0];d=charData[drawChar]||null;detail=writingDetail(drawChar)}return `<div class="art-banner writing-banner"><span>L’encre et le jade</span><h1>Atelier de calligraphie</h1></div><main class="page"><h2>Le geste du pinceau</h2><p>Les caractères se débloquent au fil des leçons réussies.</p><div class="controls notebook-actions"><button onclick="writingPanel=writingPanel==='search'?'none':'search';render()">🔎 Recherche</button><button onclick="writingPanel=writingPanel==='test'?'none':'test';render()">🎯 Test</button></div><div class="paper" ${writingPanel==='search'?'':'hidden'}><input type="search" placeholder="Rechercher caractère, pinyin ou sens" value="${esc(writingSearch)}" onchange="writingSearch=this.value;render()"></div><div class="paper" ${writingPanel==='test'?'':'hidden'}><h3>Test d’écriture</h3><div class="carnet-filters"><label>Mode<select onchange="writingTestMode=this.value"><option value="all">Aléatoire · tous les thèmes</option><option value="selection" ${writingTestMode==='selection'?'selected':''}>Ma sélection</option>${[...new Set(learned.map(writingTheme))].sort().map(t=>`<option value="${esc(t)}" ${writingTestMode===t?'selected':''}>${esc(t)}</option>`).join('')}</select></label><label>Questions<select onchange="writingTestCount=Number(this.value)"><option value="10" ${writingTestCount===10?'selected':''}>10 questions</option><option value="20" ${writingTestCount===20?'selected':''}>20 questions</option></select></label></div><p class="small muted">Coche les caractères ci-dessous pour « Ma sélection ». Les caractères peuvent revenir si le groupe est petit.</p><button class="primary" onclick="startWritingTest()">Commencer le test</button></div><label class="episode-filter">Afficher les caractères de <select onchange="writingEpisode=this.value;render()">${episodeSelectOptions(writingEpisode,true)}</select></label><div class="charrow writing-choices">${matches.map(c=>`<div class="writing-choice"><input type="checkbox" ${writingSelected.includes(c)?'checked':''} onchange="toggleWritingSelection('${c}',this.checked)" aria-label="Réviser ${c}"><button class="${c===drawChar?'active':''}" onclick="chooseChar('${c}')">${c}${writingBadge(c)}</button></div>`).join('')}</div>${writingStudio()}</main>`}
function initCanvas(){let c=$('#drawing');if(!c)return;let ctx=c.getContext('2d');ctx.strokeStyle='#272722';ctx.lineWidth=11;ctx.lineCap='round';ctx.lineJoin='round';function redraw(){ctx.clearRect(0,0,c.width,c.height);ctx.strokeStyle='#272722';ctx.lineWidth=11;ctx.lineCap='round';ctx.lineJoin='round';strokes.forEach(points=>{if(!points.length)return;ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);points.forEach(p=>ctx.lineTo(p.x,p.y));ctx.stroke()})}redraw();function p(e){let r=c.getBoundingClientRect();return{x:(e.clientX-r.left)*c.width/r.width,y:(e.clientY-r.top)*c.height/r.height}}c.onpointerdown=e=>{e.preventDefault();c.setPointerCapture(e.pointerId);currentStroke=[p(e)];strokes.push(currentStroke);redraw()};c.onpointermove=e=>{if(!currentStroke)return;currentStroke.push(p(e));redraw()};c.onpointerup=c.onpointercancel=()=>{currentStroke=null};function clear(){strokes=[];redraw()}window.clearDrawing=clear;window.undoStroke=()=>{strokes.pop();redraw()}}
function chooseChar(c){if(!writingCharacters().includes(c))return;writingTest=false;drawChar=c;strokes=[];strokeStep=0;render()}function finishWriting(){if(!strokes.length){$('#writefeedback').textContent='Trace au moins un trait pour enregistrer ton essai.';return}if(!state.chars.includes(drawChar))state.chars.push(drawChar);state.writingSessions++;save();$('#writefeedback').textContent='Essai enregistré dans ta progression. La vérification calligraphique automatique sera ajoutée ultérieurement.'}
function atlasMatches(text, query) {
  const fold = value => value.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return fold(text).includes(fold(query.trim()));
}

function atlasDiscoveries() {
  return state.discoveries.filter(text => {
    const episode = episodeOfDiscovery(text);
    return episode !== null && (atlasEpisode === 'all' || String(episode) === atlasEpisode) && atlasMatches(text, atlasSearch);
  });
}

function atlas() {
  const visited = eqState().clueScenes.filter(i => Number.isInteger(i) && i >= 0 && i < scenes.length);
  const episodes = [...new Set(visited.map(episodeOfScene))].sort((a,b) => a-b);
  const discoveryCount = state.discoveries.filter(text => episodeOfDiscovery(text) !== null).length;
  return `<div class="section-banner atlas-banner"><h1>Atlas de ${esc(state.name)}</h1></div>
    <main class="page"><h2>Terres et découvertes</h2>
    <div class="controls notebook-actions"><button onclick="document.getElementById('atlas-search-box').hidden=!document.getElementById('atlas-search-box').hidden">🔎 Recherche</button></div>
    <div class="paper" id="atlas-search-box" ${atlasSearch ? '' : 'hidden'}><input type="search" aria-label="Rechercher dans l’Atlas" placeholder="Un lieu, une ville, une découverte…" value="${esc(atlasSearch)}" oninput="atlasSearch=this.value;renderAtlasDiscoveries()"></div>
    <label class="episode-filter">Épisode <select onchange="atlasEpisode=this.value;renderAtlasDiscoveries()">${episodeSelectOptions(atlasEpisode,true,episodes)}</select></label>
    <section><h3>Lieux de l’aventure</h3><div id="atlas-places">${visitedPlaceGallery(visited,atlasEpisode,atlasSearch)}</div></section>
    <section><h3>Découvertes culturelles débloquées (${discoveryCount})</h3><div id="atlas-discoveries">${atlasDiscoveryCards(atlasDiscoveries())}</div></section>
    <div class="paper"><h3>Première escale · Pékin (北京)</h3><p>Pékin, capitale de la Chine, se situe dans le nord du pays. L’aventure débute dans un hutong près de la tour du Tambour.</p><p>🌏 Coordonnées approximatives : 39,9° N · 116,4° E</p><a href="https://www.openstreetmap.org/#map=10/39.9/116.4" target="_blank" rel="noopener">Ouvrir la carte réelle ↗</a></div>
    <div class="paper"><h3>Repères géographiques</h3><p>Pékin · hutongs · tour du Tambour · maisons à cour intérieure. Hong Kong pourra faire l’objet d’un épisode ultérieur.</p></div></main>`;
}
function atlasDiscoveryCards(items){return items.map(t=>`<div class="paper">${esc(heroText(t))}</div>`).join('')||'<p>Aucune découverte dans cet épisode ou cette recherche.</p>'}
function renderAtlasDiscoveries() {
  const discoveries = document.getElementById('atlas-discoveries');
  const places = document.getElementById('atlas-places');
  if (discoveries) discoveries.innerHTML = atlasDiscoveryCards(atlasDiscoveries());
  if (places) places.innerHTML = visitedPlaceGallery(eqState().clueScenes, atlasEpisode, atlasSearch);
}
const HSK1_SET=new Set(HSK1_REFERENCE.map(v=>v[0]));
let hskEpisode='all',hskSearch='';
function hsk1Coverage(){const available=new Set(vocab.map(v=>v[0]));const learned=new Set(learnedWords().map(v=>v[0]));return {available:HSK1_REFERENCE.filter(v=>available.has(v[0])).length,learned:HSK1_REFERENCE.filter(v=>learned.has(v[0])).length,extras:vocab.filter(v=>!HSK1_SET.has(v[0])).map(v=>v[0])}}
function hsk1Episode(word,index){return HSK1_EPISODE_MAP[word]||null}
function hsk1Rows(){const q=hskSearch.toLocaleLowerCase('fr').trim();return HSK1_REFERENCE.map((v,i)=>({v,i,ep:hsk1Episode(v[0],i)})).filter(x=>(hskEpisode==='all'||String(x.ep)===hskEpisode)&&(!q||x.v.join(' ').toLocaleLowerCase('fr').includes(q)))}
function hsk1Cards(){const known=new Set(learnedWords().map(v=>v[0]));const available=new Set(vocab.map(v=>v[0]));return hsk1Rows().map(x=>'<div class="paper word-entry"><span class="han">'+esc(x.v[0])+'</span><div class="word-detail"><strong>'+esc(x.v[1])+'</strong><div class="small muted">Épisode '+x.ep+' · '+(known.has(x.v[0])?'✓ appris':available.has(x.v[0])?'Présent dans le carnet, pas encore appris':'À intégrer dans une future leçon')+'</div></div></div>').join('')||'<p>Aucun mot correspondant.</p>'}
function renderHSK1(){const el=document.getElementById('hsk1-rows');if(el)el.innerHTML=hsk1Cards();const count=document.getElementById('hsk1-count');if(count)count.textContent=hsk1Rows().length}
function campagne(){
 if(bookSection==='jeux' && jadeGame)return gamePage();
 const book=books[0];
 const overview=`<div class="book-cover"><span>Livre ${book[0]} · ${book[3]}</span><h1>${esc(book[1])}</h1></div>
   <div class="book-sections" aria-label="Rubriques de l’onglet Livres">
   <button aria-pressed="${bookSection==='parcours'}" onclick="selectBookSection('parcours')">Épisodes et scènes</button>
   <button aria-pressed="${bookSection==='jeux'}" onclick="selectBookSection('jeux')">Jeux de révision</button></div>`;
 if(bookSection==='jeux')return `<main class="page book-page">${overview}${gameMenu()}</main>`;
 const stats=hsk1Coverage();
 const later=books.slice(1).map(b=>`<div><small>Livre ${b[0]} · ${b[3]}</small><h3>${esc(b[1])}</h3><p>${esc(b[2])}</p></div>`).join('');
 return `<main class="page book-page">${overview}${bookJourney()}<details class="paper book-reference"><summary>Les livres à venir</summary><p>Le Livre I prévoit douze épisodes. Les livres suivants sont en préparation.</p>${later}</details><details class="paper book-reference"><summary>Référentiel HSK 1 · programme 2025</summary><p><strong>300 mots officiels</strong> · ${stats.available} déjà présents dans le vocabulaire de l’application · ${stats.learned} appris · ${300-stats.available} à intégrer.</p><div class="progress"><span style="width:${Math.min(100,stats.available/300*100)}%"></span></div><p class="small muted">Source : ChineseTest, HSK 3.0, programme publié en novembre 2025. Le catalogue est un inventaire, pas un déblocage anticipé des mots. Les 300 mots sont désormais répartis par thème, sans doublon, sur 12 épisodes. La progression narrative existante sera harmonisée lors de la rédaction des nouvelles leçons.</p><p>${stats.extras.length} entrées de l’application ne correspondent pas exactement à une entrée du référentiel HSK 1 ; elles restent utiles à l’aventure et ne sont pas comptées dans les 300.</p><label class="episode-filter">Programme par épisode<select onchange="hskEpisode=this.value;renderHSK1()"><option value="all">Tous les épisodes</option>${Array.from({length:12},(_,i)=>`<option value="${i+1}" ${hskEpisode===String(i+1)?'selected':''}>Épisode ${i+1}</option>`).join('')}</select></label><input type="search" placeholder="Rechercher un mot ou son pinyin" value="${esc(hskSearch)}" oninput="hskSearch=this.value;renderHSK1()"><h3>Inventaire officiel <small id="hsk1-count">(${hsk1Rows().length})</small></h3><div id="hsk1-rows">${hsk1Cards()}</div></details></main>`;
}
function render(){const body={aventure:adventure,enquete,carnet,calligraphie:calligraphy,atlas,campagne}[tab]();$('#app').innerHTML=header()+body+nav();if(tab==='calligraphie')initWriting()}
function switchTab(t){
 if(tab!==t){
  stopAdventureMic();stopGameMic();stopJadeAudio();
  if(jadeGame?.kind==='envoy')jadeGame.message='';
 }
 tab=t;selected='';render();window.scrollTo(0,0);
}
restoreBookProgress();
render();
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
 const box=updateBox();box.textContent='V'+APP_VERSION+' · Vérification de la version publiée…';
 try{
  const response=await fetch('./version.json?check='+Date.now(),{cache:'no-store'});
  if(!response.ok)throw Error('HTTP '+response.status);
  const remote=await response.json();
  const published=String(remote.version||'');
  if(!published)throw Error('Version manquante');
  if(published===APP_VERSION){
   box.innerHTML='<p>Version '+esc(APP_VERSION)+' installée et à jour.</p><button onclick="closeUpdate()">Fermer</button>';return;
  }
  box.innerHTML='<strong>Version '+esc(published)+' disponible</strong><p>'+esc(remote.notes||'Des améliorations sont disponibles.')+'</p><p>Ta progression locale sera conservée. Si la nouvelle version ne s’affiche pas immédiatement, rouvre le jeu.</p><button class="primary" onclick="refreshGame()">Installer la mise à jour</button><button onclick="closeUpdate()">Plus tard</button>';
 }catch(e){
  box.innerHTML='<p>Impossible de vérifier la version publiée ('+esc(e.message)+'). Vérifie Internet et réessaie.</p><button onclick="closeUpdate()">Fermer</button>';
 }
}
async function refreshGame(){
 save();const box=updateBox();box.textContent='Mise à jour en cours…';
 try{
  if('serviceWorker'in navigator){const reg=updateRegistration||await navigator.serviceWorker.getRegistration();if(reg)await reg.update()}
 }catch(e){console.warn('Mise à jour du service worker',e)}
 window.location.replace('./index.html?refresh='+Date.now());
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

