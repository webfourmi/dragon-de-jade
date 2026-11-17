/* Parcours des épisodes : démarrage d'un épisode et écran de fin d'épisode, pour tous les épisodes du Livre I.
   Pour ajouter l'épisode N+1 : ses scènes (episodeN.js), puis une entrée dans EP_END[N] et EP_NEXT[N+1] ci-dessous. */
const EP_END={
 1:{title:'Le premier sceau du Dragon de Jade',text:'Tu peux passer l’épreuve de lecture, d’écoute et d’oral avant de poursuivre l’enquête.'},
 2:{title:'Des noms retrouvés',text:'Une enfant a été ajoutée aux archives, et ton jade porte peut-être sa trace. Tu peux passer l’épreuve avant de poursuivre l’enquête.'},
 3:{title:'Le compte des écailles',text:'Une adresse, une maison de thé, une fillette de trois ans : les nombres ont parlé. Ce soir, quelque chose a glissé sous le rideau de la boutique.'},
 4:{title:'Un rendez-vous manqué',text:'Trois heures sont passées sans visiteur, mais une lanterne verte vous observe. La piste mène à la maison de thé du 三十六.'},
 5:{title:'Une tasse pour celui qui reviendra',text:'La patronne a ouvert sa maison de thé, sa mémoire et une tasse réservée depuis des années. Un homme tout de noir cherche, lui aussi, une écaille du Dragon de Jade : au marché.'},
 6:{title:'La deuxième écaille',text:'Le bouton de la veste d’enfant brille comme l’écaille de Lóng, et Monsieur Wu a payé cher un leurre. Dans les carnets achetés au marché, un plan au crayon porte une croix.'},
 7:{title:'Le train de Tianjin',text:'Le train quitte la gare, avec Monsieur Wu à bord. À Tianjin, une croix brille sur un plan au crayon.'}
};
const EP_NEXT={
 2:{title:'Les noms derrière le jade',text:'Une famille disparue, des portraits effacés et 24 nouveaux mots pour poursuivre l’aventure.'},
 3:{title:'Le compte des écailles',text:'Trois traits grattés, une adresse effacée et 26 nouveaux mots : les nombres et les quantités.'},
 4:{title:'Un rendez-vous dans l’ombre',text:'Un message sans signature fixe un rendez-vous : 29 nouveaux mots pour dire le jour, la date et l’heure.'},
 5:{title:'Une tasse pour celui qui reviendra',text:'Une maison de thé, une tasse réservée et 25 nouveaux mots : le thé, la nourriture et les repas.'},
 6:{title:'Le marché aux antiquités',text:'Un étal, un collectionneur et 26 nouveaux mots : acheter, vendre, marchander.'},
 7:{title:'Le train de Tianjin',text:'Un plan au crayon, un horaire noté au dos et 27 nouveaux mots : lieux, directions et transports.'},
 8:{title:'L’école de la croix',text:'Une école fermée, un cahier sans titre et 25 nouveaux mots : l’école, la langue et l’écriture.'}
};

/* Personnages secondaires qui parlent dans certains dialogues : pas de portrait, un avatar. */
const EXTRA_SPEAKERS={'La patronne':{avatar:'👵🏻'},'Le vendeur':{avatar:'🧔🏻'},'Monsieur Wu':{avatar:'🧐'},'La guichetière':{avatar:'👩🏻‍💼'},'Le gardien':{avatar:'👴🏽'}};

function epStarted(ep){
  if(ep<=1)return true;
  if(ep===2)return !!state.episode2Started;
  return (state.epStarted||[]).includes(ep);
}
function epMarkStarted(ep){
  if(ep===2){state.episode2Started=true;return}
  state.epStarted=state.epStarted||[];
  if(!state.epStarted.includes(ep))state.epStarted.push(ep);
}
function startEpisode(ep){epMarkStarted(ep);save();render();window.scrollTo(0,0)}

/* Écran affiché quand on arrive au début d'un épisode non commencé (fin de l'épisode précédent). */
function episodeBoundaryPage(){
  const sc=state.scene;
  if(sc<6||sc>=scenes.length||sc%6!==0)return '';
  const ep=sc/6,next=EP_NEXT[ep+1],end=EP_END[ep];
  if(epStarted(ep+1)||!next||!end)return '';
  const seal=ep<=2?'<div class="paper"><button class="primary" onclick="sealStart()">Passer l’épreuve du premier sceau</button><p class="small muted">12 questions, résultats enregistrés sans XP.</p></div>':'';
  return '<div class="hero location-banner"><h1>Les Chroniques du Dragon de Jade</h1></div><main class="page"><div class="label">Livre I · Épisode '+ep+' terminé</div>'+episodeReplayMenu()
    +'<h2>🐉 '+esc(end.title)+'</h2><p>'+esc(end.text)+'</p>'+seal
    +'<div class="paper"><h3>Épisode '+(ep+1)+' · '+esc(next.title)+'</h3><p>'+esc(next.text)+'</p><button class="primary" onclick="startEpisode('+(ep+1)+')">Commencer l’épisode '+(ep+1)+' →</button></div></main>';
}
