/* Première scène où chaque personnage est présenté, en comptant à partir de zéro. */
const NPCS = [
  { id: 'maitre-chen', name: 'Maître Chen', scene: 0, image: 'assets/maitre-chen.webp', side: 'master', avatar: '👴🏻',
    description: 'L’antiquaire du hutong de Pékin, qui reconnaît le dragon gravé sur ton jade.' },
  { id: 'expediteur-anonyme', name: 'L’expéditeur anonyme', scene: 1, archive: true,
    description: 'Une enveloppe au sceau du dragon a donné ton adresse à Maître Chen. L’identité de son expéditeur reste à découvrir.' },
  { id: 'mei', name: 'Mei', scene: 2, image: 'assets/mei.webp', side: 'messenger', avatar: '👩🏻',
    description: 'La jeune messagère qui cherche à retrouver les traces de sa famille dans les archives.' },
  { id: 'grand-pere-chen', name: 'Le grand-père de Chen', scene: 2, archive: true,
    description: 'Monsieur Chen (陈先生) gardait autrefois les archives de la famille de Mei. Son petit-fils le reconnaît sur le cliché.' },
  { id: 'long', name: 'Lóng', scene: 4, image: 'assets/long.webp', side: 'dragon', avatar: '🐉',
    description: 'Le petit dragon qui retrouve des fragments de sa mémoire à mesure que tu apprends le mandarin.' },
  { id: 'pere-de-mei', name: 'Le père de Mei', scene: 6, archive: true,
    description: 'Il pose devant une maison sur la photographie du registre. Son nom a été effacé.' },
  { id: 'mere-de-mei', name: 'La mère de Mei', scene: 6, archive: true,
    description: 'Mei la reconnaît sur la photographie de famille conservée dans le registre.' },
  { id: 'grand-frere', name: 'Le grand frère du registre', scene: 7, archive: true,
    description: 'Mei montre son grand frère en lisant les mentions au dos de la photographie.' },
  { id: 'grande-soeur', name: 'La grande sœur du registre', scene: 7, archive: true,
    description: 'Mei montre sa grande sœur en lisant les mentions au dos de la photographie.' },
  { id: 'petit-frere', name: 'Le petit frère du registre', scene: 7, archive: true,
    description: 'Le registre donne aussi le rang d’un petit frère. La dernière mention, celle d’une petite sœur, étonne Mei.' },
  { id: 'homme-du-registre', name: 'L’homme du registre', scene: 8, archive: true,
    description: 'Mei ignore qui est cet homme dont le nom a été recopié sur une autre page du registre.' },
  { id: 'femme-du-registre', name: 'La femme du registre', scene: 8, archive: true,
    description: 'Mei reconnaît cette femme sur le deuxième ensemble de portraits. Son nom reste un indice à éclaircir.' },
  { id: 'fils-et-fille', name: 'Les deux enfants de la liste', scene: 9, archive: true,
    description: 'La liste de départs mentionne un fils et une fille, accompagnés d’un ami de la famille.' },
  { id: 'jeune-femme-de-la-lettre', name: 'La jeune femme de la lettre', scene: 10, archive: true,
    description: 'Elle parle de son petit ami dans une lettre ancienne que Mei a gardée.' },
  { id: 'fillette-du-portrait', name: 'La fillette du portrait', scene: 16, archive: true,
    description: 'Le visage d’une enfant d’environ trois ans apparaît lorsque les deux moitiés de la page sont réunies.' },
  { id: 'libraire-des-plans', name: 'Le libraire des plans', scene: 17,
    description: 'Il vend des plans du hutong à son étal. L’un d’eux indique l’emplacement du numéro 36.' },
  { id: 'patronne', name: 'La patronne', scene: 24, avatar: '👵🏻',
    description: 'Elle tient la maison de thé du numéro 36 et accueille le groupe avec quatre tasses déjà prêtes.' },
  { id: 'libraire-du-marche', name: 'Le libraire près du marché', scene: 31,
    description: 'Ce vieil ami de Chen a entendu parler d’un panier d’affaires de famille vendu au marché aux antiquités.' },
  { id: 'vendeur', name: 'Le vendeur', scene: 33, avatar: '🧔🏻',
    description: 'Le marchand à casquette grise qui tient l’étal où le groupe négocie le prix d’un galet de jade.' },
  { id: 'monsieur-wu', name: 'Monsieur Wu', scene: 34, avatar: '🧐',
    description: 'L’homme au manteau noir que Chen connaît. Il offre huit cents kuai pour le galet du marché.' },
  { id: 'guichetiere', name: 'La guichetière', scene: 40, avatar: '👩🏻‍💼',
    description: 'À la gare de Pékin, elle oriente le groupe vers les quais du train pour Tianjin.' },
  { id: 'gardien', name: 'Le gardien', scene: 42, avatar: '👴🏽',
    description: 'Il surveille l’ancienne école de Tianjin. Sa veste rapiécée se remarque dès le portail.' },
  { id: 'instituteur', name: 'L’instituteur de Tianjin', scene: 43, archive: true, afterScene: true,
    description: 'Sur une photo de classe, Chen reconnaît l’homme au sourire timide qu’il a connu enfant.' },
  { id: 'anciens-camarades', name: 'Les anciens camarades', scene: 44, archive: true,
    description: 'Trois anciens élèves reviennent chaque année déposer des fleurs sur le pupitre du fond.' },
  { id: 'voisine', name: 'La voisine', scene: 49, avatar: '👵🏽',
    description: 'La voisine de l’instituteur décroche à Tianjin lorsque Mei compose le numéro trouvé dans le cahier.' }
];

const NPC_SPEAKERS = new Map(NPCS.filter(npc => npc.avatar).map(npc => [npc.name, npc]));

function npcImage(npc) {
  return npc.image || `assets/personnages/${npc.id}.webp`;
}

function npcSceneLabel(npc) {
  return `Épisode ${episodeOfScene(npc.scene)} · Scène ${npc.scene % 6 + 1}`;
}

function npcCard(npc, showDetails) {
  const source = npcImage(npc);
  const name = esc(npc.name);
  return `<li class="npc-card">
    <a href="${source}" onclick="return openNpcArt(event, '${npc.id}')" aria-label="Agrandir l’aquarelle · ${name}">
      <img src="${source}" alt="" width="768" height="768" loading="lazy" decoding="async">
      <strong>${name}</strong>
    </a>
    ${showDetails ? `<div class="npc-card-details"><small>${npcSceneLabel(npc)}</small><p>${esc(npc.description)}</p></div>` : ''}
  </li>`;
}

function openNpcArt(event, id) {
  const npc = NPCS.find(character => character.id === id);
  if (!npc) return true;
  return openWatercolor(event, {
    source: npcImage(npc), name: npc.name, caption: npcSceneLabel(npc), alt: 'Aquarelle · ' + npc.name
  });
}

function sceneNpcPortraits(index) {
  const characters = NPCS.filter(npc => npc.scene === index && !npc.avatar);
  if (!characters.length) return '';
  const visited = visitedBookScenes();
  const visible = characters.filter(npc => !npc.afterScene || visited.has(index));
  if (!visible.length) return '';
  return `<section class="scene-npc-portraits" aria-labelledby="scene-npc-title">
    <h3 id="scene-npc-title">Portraits de la scène</h3>
    <ul class="npc-grid">${visible.map(npc => npcCard(npc, false)).join('')}</ul>
  </section>`;
}

function bookCharacters() {
  const visited = visitedBookScenes();
  const unlocked = NPCS.filter(npc => visited.has(npc.scene));
  if (!unlocked.length) return `<section class="book-characters"><h2>Personnages</h2>
    <p>Les portraits se débloquent à mesure que tu parcours les scènes du Livre I.</p></section>`;
  return `<section class="book-characters"><h2>Personnages</h2>
    ${[[false, 'Rencontres'], [true, 'Archives et souvenirs']].map(([archive, title]) => {
      const characters = unlocked.filter(npc => Boolean(npc.archive) === archive);
      if (!characters.length) return '';
      return `<h3>${title}</h3><ul class="npc-grid">${characters.map(npc => npcCard(npc, true)).join('')}</ul>`;
    }).join('')}
  </section>`;
}
