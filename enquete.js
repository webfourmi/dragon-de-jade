/* Enquête du Livre I : écailles de Lóng, inscription de la boîte, carnet d'indices,
   scènes de déduction, réactions qui font varier la confiance et variantes de scènes.
   Toutes les données sont dans ce fichier ; app.js ne fait que l'appeler (voir README). */

/* ---------- Données ---------- */
const EQ_CLUES=[
 {id:'dragon',scene:0,title:'Le dragon sur ton jade',text:'Chen reconnaît aussitôt le dragon gravé sur ton pendentif : un dragon enroulé autour d’une écaille.'},
 {id:'nom',scene:1,title:'Ton nom, à l’encre fraîche',text:'Ton nom figure dans le registre de Chen, d’une encre bien plus fraîche que les lignes voisines. Chen affirme ne jamais l’avoir écrit.'},
 {id:'enveloppe',scene:1,title:'L’enveloppe anonyme',text:'Chen n’a fait que suivre une enveloppe anonyme, arrivée avec ton adresse et un sceau.'},
 {id:'photo',scene:2,title:'Le grand-père de Chen',text:'Sur la photographie, 陈先生 est le grand-père de Chen, gardien des archives de la famille de Mei.'},
 {id:'effaces',scene:2,title:'Des noms effacés',text:'Depuis des mois, Mei cherche la personne qui a effacé les noms de sa famille des registres.'},
 {id:'boite',scene:3,title:'La boîte de laque',text:'Une boîte héritée du grand-père de Chen : sa serrure n’a pas de clé, seulement un creux à la forme de ton jade.'},
 {id:'inscription',scene:4,title:'Une inscription grattée',text:'Le couvercle porte une phrase grattée dont seul le premier signe, 这, est lisible. Lóng dit que chaque mot appris lui rend de la mémoire.'},
 {id:'carte',scene:5,title:'La carte vers le registre',text:'Chen te remet une carte vers un ancien registre de familles. Une photographie y porte le même symbole que ton jade.'},
 {id:'verte',scene:6,title:'La marque verte',text:'Dans le registre, une marque verte remplace l’encre à l’endroit de la signature du père de Mei. Elle brille du même vert que l’écaille de Lóng.'},
 {id:'ajout',scene:7,title:'Un enfant ajouté ?',text:'Mei n’a jamais eu de petite sœur, pourtant un dernier nom figure à l’encre plus récente. Quelqu’un a-t-il ajouté un enfant aux archives ?'},
 {id:'main',scene:8,title:'Une autre main',text:'Les noms du portrait ont été recopiés d’une autre main, appliquée, qui connaissait l’écriture de la famille.'},
 {id:'ami',scene:9,title:'L’ami de la famille',text:'Une liste de départs mentionne un fils, une fille et un 朋友 (un ami de la famille). L’adresse au verso est presque illisible.'},
 {id:'amoureux',scene:10,title:'朋友 ou 男朋友 ?',text:'Une lettre parle d’un 男朋友 (petit ami). Sur la liste de départs, le même homme n’est noté que comme 朋友.'},
 {id:'sceau',scene:10,title:'Un sceau, trois courriers',text:'Le même sceau figure sur ton courrier venu de France, sur l’enveloppe anonyme de Chen et au bas de la lettre ancienne.'},
 {id:'age',scene:11,title:'Un âge gratté',text:'Sur la dernière fiche, la case de l’âge est grattée : il ne reste que trois traits horizontaux.'},
 {id:'d1',scene:null,ded:1,title:'Conclusion : un expéditeur inconnu',text:'Quelqu’un d’extérieur a glissé ton nom dans le registre et envoyé l’enveloppe. Son message, 请认识我, demande simplement qu’on fasse sa connaissance.'},
 {id:'d2',scene:null,ded:2,title:'Conclusion : l’ami était le petit ami',text:'L’« ami » de la liste de départs était le petit ami de la jeune femme, et c’est sans doute lui qui a envoyé le sceau jusqu’à toi.'}
];
const EQ_LINKS=[['enveloppe','sceau'],['nom','enveloppe'],['nom','ajout'],['effaces','verte'],['verte','dragon'],['effaces','main'],['ami','amoureux'],['sceau','amoureux'],['boite','inscription'],['age','ajout'],['photo','effaces']];
const EQ_QUESTIONS=[
 {id:'venue',title:'Qui a préparé ta venue ?',evidence:['nom','enveloppe','sceau'],conclusion:'d1'},
 {id:'noms',title:'Qui a effacé les noms de la famille ?',evidence:['photo','effaces','carte','verte','main']},
 {id:'enfant',title:'Qui est l’enfant ajouté aux archives ?',evidence:['ajout','age']},
 {id:'ami',title:'Qui est l’ami de la famille ?',evidence:['ami','amoureux','sceau'],conclusion:'d2'},
 {id:'boite',title:'Que dit la phrase grattée sur la boîte ?',evidence:['boite','inscription','dragon']}
];
const EQ_INSCRIPTION=['这','是','你','的','家'];

/* Réactions : un petit choix de ton après certaines scènes, qui fait varier la confiance (0 à 5). */
const EQ_REACTIONS={
 1:{prompt:'Chen avoue ne pas savoir qui a écrit ton nom. Comment réagis-tu ?',options:[
  {t:'Tu le crois et lui proposes ton aide.',fx:{chen:1},res:'Chen se détend : il n’a plus l’air de porter seul un secret.'},
  {t:'Tu exiges de voir tout le registre avant de te prononcer.',fx:{},res:'Chen acquiesce, mais ton regard méfiant ne lui a pas échappé.'}]},
 2:{prompt:'Mei pâlit en voyant ton jade. Que fais-tu ?',options:[
  {t:'Tu lui montres le jade sans hésiter.',fx:{mei:1},res:'Mei effleure à peine le dragon gravé, la gorge nouée : tu viens de lui donner un début de confiance.'},
  {t:'Tu serres le pendentif dans ta main.',fx:{chen:1},res:'Chen approuve d’un signe : un objet pareil ne se montre pas à tout le monde. Mei, elle, baisse les yeux.'}]},
 4:{prompt:'Lóng apparaît, éblouie par la lumière. Comment l’accueilles-tu ?',options:[
  {t:'Tu t’inclines pour le saluer.',fx:{long:1},res:'Lóng cligne des yeux : on ne l’avait pas salué ainsi depuis longtemps.'},
  {t:'Tu recules d’un pas, sur tes gardes.',fx:{chen:1},res:'Chen te rassure d’un geste. Lóng se réfugie derrière la boîte.'}]},
 7:{prompt:'Mei affirme n’avoir jamais eu de petite sœur. Que fais-tu ?',options:[
  {t:'Tu l’écoutes sans l’interrompre.',fx:{mei:1},res:'Mei raconte alors un souvenir d’enfance, comme si tu faisais déjà partie de la famille.'},
  {t:'Tu proposes d’examiner l’encre avec Lóng.',fx:{long:1},res:'Lóng s’approche de la page : sa petite patte verte tremble au-dessus du dernier nom.'}]},
 9:{prompt:'Une adresse presque illisible figure au verso. Quelle piste suis-tu ?',options:[
  {t:'Tu demandes à Chen de la relire chiffre par chiffre.',fx:{chen:1},res:'Chen sourit : la méthode lui rappelle celle de son grand-père.'},
  {t:'Tu suis l’intuition de Mei : l’ami a protégé les enfants.',fx:{mei:1},res:'Mei serre les poings, reconnaissante : personne n’avait pris son hypothèse au sérieux.'}]},
 10:{prompt:'Le sceau de la lettre est celui de ton courrier. Qui interroges-tu ?',options:[
  {t:'Chen : il connaît peut-être ce sceau.',fx:{chen:1},res:'Chen hésite, puis admet qu’il l’a déjà vu… sans pouvoir dire où.'},
  {t:'Lóng : ce sceau lui rappelle quelque chose.',fx:{long:1},res:'Lóng ferme les yeux ; une image floue de jardin et de rires remonte, puis s’évanouit.'}]}
};

/* Variantes de scène : une ligne en plus (ou en moins) selon la confiance accordée. */
const EQ_VARIANTS={
 8:t=>t.mei>=1?'Mei hésite, puis ajoute à voix basse qu’elle reconnaît le col de la veste de l’homme : celui d’un tailleur du quartier.':'Mei serre les lèvres : elle ne dira rien de plus pour l’instant.',
 9:t=>t.chen>=2?'À voix basse, Chen te confie que cette écriture appliquée lui rappelle celle des carnets de son grand-père.':'',
 11:t=>t.long>=1?'Lóng passe sa petite patte sur le grattage : sous la poussière, une écaille verte semble se dessiner.':''
};

/* Scènes de déduction : un petit problème de vocabulaire, puis un raisonnement à partir de tes indices. */
const EQ_DEDUCTIONS={
 1:{title:'Qui a préparé ta venue ?',
  intro:'Avant de quitter la boutique, tu rassembles ce que tu sais. Dans l’enveloppe anonyme, un seul message est glissé :',
  zh:'请认识我。',
  vocab:{q:'Que demande l’expéditeur ?',options:[['Qu’on fasse sa connaissance.',true],['Qu’on lui dise au revoir.',false],['Qu’on lui rende le jade.',false]]},
  pick:{prompt:'Quels deux indices prouvent que quelqu’un d’autre que Chen t’a fait venir ?',need:['nom','enveloppe'],pool:['nom','enveloppe','dragon','photo','boite'],hint:'Cherche ce qui montre que Chen n’a pas écrit ton nom, et d’où vient ton adresse.'},
  conclusion:'d1',reward:20,trust:{chen:1}},
 2:{title:'Pourquoi l’« ami » est-il resté dans l’ombre ?',
  intro:'La liste de départs ne parle que d’un 朋友, mais la lettre évoque un autre mot :',
  zh:'男朋友',
  vocab:{q:'Que signifie ce mot ?',options:[['petit ami',true],['ami d’enfance',false],['frère aîné',false]]},
  pick:{prompt:'Quels trois indices montrent que l’ami de la liste a pu t’envoyer le sceau ?',need:['ami','amoureux','sceau'],pool:['ami','amoureux','sceau','age','verte'],hint:'Compare ce que dit la liste, ce que dit la lettre et ce que montre le sceau.'},
  conclusion:'d2',reward:25,trust:{mei:1}}
};

let eqDedForce=0,eqDed=null;

/* ---------- État ---------- */
function eqInit(){
  state.trust=state.trust||{chen:0,mei:0,long:0};
  state.reactions=state.reactions||{};
  state.deduced=state.deduced||[];
  state.dedSkipped=state.dedSkipped||[];
  state.dedRewarded=state.dedRewarded||[];
  state.clueScenes=state.clueScenes||[];
  state.scalesLit=state.scalesLit||[];
  return state;
}
/* Appelée à chaque scène terminée ou passée : mémorise l'indice et rallume l'écaille de l'épisode si les 6 scènes sont faites. */
function eqMark(i){
  if(!state.clueScenes.includes(i))state.clueScenes.push(i);
  const ep=episodeOfScene(i),first=(ep-1)*6;
  if(first+6<=scenes.length&&!state.scalesLit.includes(ep)){
    for(let k=first;k<first+6;k++)if(!state.clueScenes.includes(k))return;
    state.scalesLit.push(ep);
  }
}
function eqSceneDone(i){eqInit();eqMark(i)}
function eqState(){
  eqInit();
  (state.completed||[]).concat(state.skipped||[]).forEach(eqMark);/* rattrape les parties déjà commencées */
  return state;
}
function eqDone(ep){return state.deduced.includes(ep)&&!state.dedSkipped.includes(ep)}
function eqUnlocked(){
  const st=eqState();
  return EQ_CLUES.filter(c=>c.scene!==null?st.clueScenes.includes(c.scene):eqDone(c.ded));
}
function eqClue(id){return EQ_CLUES.find(c=>c.id===id)}

/* ---------- Écailles et inscription ---------- */
function scalesBar(){
  const st=eqState(),n=st.scalesLit.length;
  return '<div class="scales" role="img" aria-label="Écailles de Lóng : '+n+' sur 12">'
    +Array.from({length:12},(_,k)=>'<span class="scale'+(st.scalesLit.includes(k+1)?' lit':'')+'">'+(k+1)+'</span>').join('')
    +'<small>'+n+' / 12 écailles</small></div>';
}
function eqInscription(){
  const st=eqState(),known=EQ_INSCRIPTION.filter(c=>st.words.includes(c)).length;
  return '<div class="inscription" lang="zh-CN" role="img" aria-label="Inscription de la boîte : '+known+' signes sur '+EQ_INSCRIPTION.length+' retrouvés">'
    +EQ_INSCRIPTION.map(c=>st.words.includes(c)?'<span class="ins on">'+esc(c)+'</span>':'<span class="ins">？</span>').join('')+'</div>'
    +'<p class="small muted">'+known+' signe'+(known>1?'s':'')+' sur '+EQ_INSCRIPTION.length+' retrouvé'+(known>1?'s':'')+'. Chaque signe réapparaît quand tu apprends le mot correspondant.'
    +(known<EQ_INSCRIPTION.length?' Il t’en manque encore un : la suite de l’enquête te l’apprendra.':'')+'</p>';
}

/* ---------- Réactions et variantes ---------- */
function reactionBlock(i,completed){
  const r=EQ_REACTIONS[i];if(!r||!completed)return '';
  const chosen=eqState().reactions[i];
  return '<div class="paper"><div class="label">Ta réaction · elle compte pour la confiance</div><h3>'+esc(r.prompt)+'</h3><div class="choices">'
    +r.options.map((o,j)=>'<button class="'+(chosen===j?'selected':'')+'" '+(chosen!==undefined?'disabled':'')+' onclick="eqReact('+i+','+j+')">'+esc(o.t)+'</button>').join('')+'</div>'
    +(chosen!==undefined?'<p class="narration variant">'+esc(r.options[chosen].res)+'</p>':'')+'</div>';
}
function eqReact(i,j){
  const st=eqState(),r=EQ_REACTIONS[i];
  if(!r||!r.options[j]||st.reactions[i]!==undefined)return;
  st.reactions[i]=j;
  const fx=r.options[j].fx;Object.keys(fx).forEach(k=>{st.trust[k]=Math.max(0,Math.min(5,(st.trust[k]||0)+fx[k]))});
  save();render();
}
function sceneVariant(i){
  const f=EQ_VARIANTS[i];if(!f)return '';
  const t=f(eqState().trust);
  return t?'<p class="narration variant">'+esc(t)+'</p>':'';
}

/* ---------- Scènes de déduction ---------- */
function eqPendingDeduction(){
  const st=eqState();
  if(eqDed&&eqDed.step==='done')return eqDed.ep;/* garde l'écran de réussite jusqu'à « Continuer » */
  if(eqDedForce&&!eqDone(eqDedForce))return eqDedForce;
  eqDedForce=0;
  if(state.scene===6&&!state.episode2Started&&!st.deduced.includes(1))return 1;
  if(scenes.length>=12&&state.scene>=scenes.length&&!st.deduced.includes(2))return 2;
  return 0;
}
function deductionPage(){
  const ep=eqPendingDeduction();if(!ep)return '';
  const d=EQ_DEDUCTIONS[ep];
  if(!eqDed||eqDed.ep!==ep)eqDed={ep,step:'vocab',picked:[],msg:'',order:shuffleWords(d.pick.pool)};
  const head='<div class="hero location-banner"><h1>Les Chroniques du Dragon de Jade</h1></div><main class="page"><div class="label">Scène de déduction · Épisode '+ep+'</div><h2>'+esc(d.title)+'</h2>';
  const skip='<button onclick="eqDedSkip()">Passer (0 XP)</button>';
  let body;
  if(eqDed.step==='vocab'){
    body='<p>'+esc(d.intro)+'</p><p class="han han-dialogue" lang="zh-CN">'+chineseText(d.zh)+'</p><div class="paper"><div class="label">Étape 1 sur 2 · Vocabulaire</div><h3>'+esc(d.vocab.q)+'</h3><div class="choices">'
      +d.vocab.options.map((o,j)=>'<button onclick="eqDedVocab('+j+')">'+esc(o[0])+'</button>').join('')+'</div>'
      +(eqDed.msg?'<div class="warning">'+esc(eqDed.msg)+'</div>':'')+'</div>'+skip;
  }else if(eqDed.step==='pick'){
    const st=eqState();
    body='<div class="paper"><div class="label">Étape 2 sur 2 · Raisonnement</div><h3>'+esc(d.pick.prompt)+'</h3><p class="small muted">Choisis '+d.pick.need.length+' indices de ton carnet.</p><div class="clue-picks">'
      +eqDed.order.filter(id=>eqUnlocked().some(c=>c.id===id)).map(id=>{const c=eqClue(id);return '<button class="clue-pick'+(eqDed.picked.includes(id)?' selected':'')+'" onclick="eqDedPick(\''+id+'\')"><strong>'+esc(c.title)+'</strong><span>'+esc(c.text)+'</span></button>'}).join('')
      +'</div><button class="primary" onclick="eqDedCheck()">Valider mon raisonnement</button>'
      +(eqDed.msg?'<div class="warning">'+esc(eqDed.msg)+'</div>':'')+'</div>'+skip;
  }else{
    const c=eqClue(d.conclusion);
    body='<div class="toast">✓ Déduction réussie'+(eqDed.gain?' · +'+eqDed.gain+' XP':'')+'</div><div class="paper"><div class="label">Nouvel indice dans ton carnet</div><h3>'+esc(c.title)+'</h3><p>'+esc(c.text)+'</p></div><button class="primary" onclick="eqDedFinish()">Continuer →</button>';
  }
  return head+body+'</main>';
}
function eqDedVocab(j){
  const d=EQ_DEDUCTIONS[eqDed.ep];
  if(d.vocab.options[j][1]){eqDed.step='pick';eqDed.msg=''}else eqDed.msg='Pas tout à fait. Relis le mot, aide-toi du carnet si besoin.';
  render();
}
function eqDedPick(id){
  const d=EQ_DEDUCTIONS[eqDed.ep],p=eqDed.picked,k=p.indexOf(id);
  if(k>=0)p.splice(k,1);else if(p.length<d.pick.need.length)p.push(id);
  eqDed.msg='';render();
}
function eqDedCheck(){
  const d=EQ_DEDUCTIONS[eqDed.ep],need=d.pick.need,p=eqDed.picked;
  if(p.length<need.length){eqDed.msg='Il te faut '+need.length+' indices.';render();return}
  const good=p.filter(id=>need.includes(id)).length;
  if(good<need.length){eqDed.msg='Tu as '+good+' bon'+(good>1?'s':'')+' indice'+(good>1?'s':'')+' sur '+need.length+'. '+d.pick.hint;render();return}
  const st=eqState(),ep=eqDed.ep;
  st.dedSkipped=st.dedSkipped.filter(e=>e!==ep);
  if(!st.deduced.includes(ep))st.deduced.push(ep);
  eqDed.gain=0;
  if(!st.dedRewarded.includes(ep)){
    st.dedRewarded.push(ep);state.xp+=d.reward;eqDed.gain=d.reward;
    Object.keys(d.trust).forEach(k=>{st.trust[k]=Math.max(0,Math.min(5,(st.trust[k]||0)+d.trust[k]))});
    recordLesson();
  }
  eqDed.step='done';save();render();
}
function eqDedSkip(){
  if(!confirm('Passer cette déduction ? Tu ne gagneras pas d’XP et l’indice de conclusion restera caché. Tu pourras la reprendre depuis l’onglet Enquête.'))return;
  const st=eqState(),ep=eqDed.ep;
  if(!st.deduced.includes(ep))st.deduced.push(ep);
  if(!st.dedSkipped.includes(ep))st.dedSkipped.push(ep);
  save();eqDedFinish();
}
function eqDedFinish(){eqDedForce=0;eqDed=null;render();window.scrollTo(0,0)}
function eqStartDeduction(ep){eqDedForce=ep;eqDed=null;tab='aventure';render();window.scrollTo(0,0)}

/* ---------- Onglet Enquête ---------- */
function eqBar(n){return '<span class="trust-bar" aria-label="'+n+' sur 5">'+'●'.repeat(n)+'○'.repeat(5-n)+'</span>'}
function enquete(){
  const st=eqState(),clues=eqUnlocked(),ids=new Set(clues.map(c=>c.id));
  const questions=EQ_QUESTIONS.filter(q=>q.evidence.some(id=>ids.has(id)));
  const pending=[1,2].filter(ep=>st.scalesLit.includes(ep)&&!eqDone(ep)&&EQ_DEDUCTIONS[ep]);
  return '<main class="page"><div class="label">Livre I · Enquête</div><h2>Le carnet d’enquête</h2>'
    +'<div class="paper"><h3>Les écailles de Lóng</h3>'+scalesBar()+'<p class="small muted">Chaque épisode terminé rallume une écaille et rend un souvenir à Lóng.</p></div>'
    +'<div class="paper"><h3>La phrase de la boîte</h3>'+eqInscription()+'</div>'
    +pending.map(ep=>'<div class="paper"><div class="label">Déduction à résoudre</div><h3>Épisode '+ep+' · '+esc(EQ_DEDUCTIONS[ep].title)+'</h3><button class="primary" onclick="eqStartDeduction('+ep+')">Résoudre →</button></div>').join('')
    +'<h3>Questions ouvertes</h3>'
    +(questions.map(q=>{
      const have=q.evidence.filter(id=>ids.has(id)),c=q.conclusion&&eqDone(eqClue(q.conclusion).ded)?eqClue(q.conclusion):null;
      return '<div class="paper"><div class="label">'+(c?'Piste confirmée':'Question ouverte')+'</div><h3>'+esc(q.title)+'</h3><p class="small muted">'+have.length+' indice'+(have.length>1?'s':'')+' sur '+q.evidence.length+' possibles à ce stade</p><ul>'+have.map(id=>'<li>'+esc(eqClue(id).title)+'</li>').join('')+'</ul>'+(c?'<p><strong>'+esc(c.text)+'</strong></p>':'')+'</div>';
    }).join('')||'<div class="paper"><p>Aucun indice pour l’instant. Avance dans l’aventure : chaque scène terminée ajoute des pièces au dossier.</p></div>')
    +'<h3>Indices ('+clues.length+')</h3>'
    +clues.map(c=>{
      const links=EQ_LINKS.filter(l=>l.includes(c.id)).map(l=>l[0]===c.id?l[1]:l[0]).filter(id=>ids.has(id));
      return '<article class="paper clue"><h4>'+esc(c.title)+'</h4><p>'+esc(c.text)+'</p>'+(links.length?'<p class="small muted">Lié à : '+links.map(id=>esc(eqClue(id).title)).join(' · ')+'</p>':'')+'</article>';
    }).join('')
    +'<div class="paper"><h3>Confiance</h3>'
    +[['chen','Maître Chen'],['mei','Mei'],['long','Lóng']].map(([k,n])=>'<p>'+esc(n)+' '+eqBar(st.trust[k]||0)+'</p>').join('')
    +'<p class="small muted">Tes réactions après certaines scènes font varier la confiance, et donc ce que les personnages te confient.</p></div></main>';
}
