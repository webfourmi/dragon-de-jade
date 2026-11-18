/* Décors des scènes du Livre I. Le premier lieu est celui du bandeau. */
const PLACE_ART = {
  "rue-des-lanternes": { city: "Pékin", name: "La rue des Lanternes", alt: "Les maisons basses du hutong et leurs lanternes rouges au pied de la tour du Tambour." },
  "boutique-de-chen": { city: "Pékin", name: "La boutique de Maître Chen", alt: "Un comptoir de bois, un registre et des étagères de porcelaines dans la boutique de l’antiquaire." },
  "archives-de-chen": { city: "Pékin", name: "Les archives de l’arrière-boutique", alt: "Une lampe éclaire un registre ouvert, devant un mur de petits tiroirs en bois." },
  "etal-des-cartes": { city: "Pékin", name: "L’étal du marchand de cartes", alt: "Des plans du quartier et des livres d’occasion s’étalent sous un auvent dans le hutong." },
  "maison-trente-six": { city: "Pékin", name: "La devanture du numéro 36", alt: "Une lanterne verte est suspendue près de la porte close de la maison de thé." },
  "maison-de-the": { city: "Pékin", name: "La maison de thé du numéro 36", alt: "Derrière le rideau de bambou, des tasses attendent près de la table qui donne sur la rue." },
  "marche-antiquites": { city: "Pékin", name: "Le marché aux antiquités", alt: "Une allée d’étals sous des toiles abrite des porcelaines, des livres et des objets anciens." },
  "rue-des-boutiques": { city: "Pékin", name: "La rue des boutiques", alt: "Les commerces du quartier se serrent le long de la rue qui contourne le marché." },
  "librairie-du-marche": { city: "Pékin", name: "La librairie près du marché", alt: "De hauts rayonnages et des piles de livres entourent le comptoir de la petite librairie." },
  "etal-du-marchand": { city: "Pékin", name: "L’étal du marchand de jade", alt: "Des galets verts, des bols et des sceaux couvrent la table du dernier étal du marché." },
  "hall-de-gare": { city: "Pékin", name: "Le hall de la gare", alt: "Une grande carte murale, des sièges et des guichets occupent le hall clair de la gare." },
  "quai-du-train": { city: "Pékin", name: "Le quai du train pour Tianjin", alt: "Une rame blanche attend sous la longue marquise du quai extérieur." },
  "cour-de-lecole": { city: "Tianjin", name: "La cour de l’ancienne école", alt: "Au-delà du portail de fer, la cour dessert un bâtiment de briques grises à deux étages." },
  "salle-de-classe": { city: "Tianjin", name: "L’ancienne salle de classe", alt: "De vieux pupitres de bois font face au tableau noir de la salle de quartier." },
  "palier-de-la-voisine": { city: "Tianjin", name: "Le palier de la voisine", alt: "Un escalier et sa rampe de bois longent la fenêtre du palier qui mène aux combles." },
  "imprimerie": { city: "Tianjin", name: "L’imprimerie du quartier", alt: "La devanture poussiéreuse laisse entrevoir une ancienne presse et ses casiers." },
  "salon-de-la-voisine": { city: "Tianjin", name: "Le salon de la voisine", alt: "Un vieux téléviseur diffuse un film en noir et blanc dans un petit salon habité." },
  "cinema-du-quartier": { city: "Tianjin", name: "Le cinéma du quartier", alt: "Les fauteuils d’une petite salle de cinéma se tournent vers un écran de film en noir et blanc.", memory: true },
  "chambre-sous-les-combles": { city: "Tianjin", name: "La chambre sous les combles", alt: "Sous les poutres, un lit, un coffre et un bureau reçoivent la lumière d’une lucarne pluvieuse." }
};

const SCENE_PLACES = [
  // Épisode 1
  ["rue-des-lanternes","boutique-de-chen"], ["boutique-de-chen"], ["boutique-de-chen"], ["boutique-de-chen"], ["boutique-de-chen"], ["boutique-de-chen"],
  // Épisode 2
  ["archives-de-chen"], ["archives-de-chen"], ["archives-de-chen"], ["archives-de-chen"], ["archives-de-chen"], ["archives-de-chen"],
  // Épisode 3
  ["archives-de-chen"], ["archives-de-chen"], ["archives-de-chen"], ["archives-de-chen"], ["archives-de-chen"], ["etal-des-cartes"],
  // Épisode 4
  ["boutique-de-chen"], ["boutique-de-chen"], ["boutique-de-chen"], ["boutique-de-chen"], ["boutique-de-chen"], ["maison-trente-six"],
  // Épisode 5
  ["maison-de-the"], ["maison-de-the"], ["maison-de-the"], ["maison-de-the"], ["maison-de-the"], ["maison-de-the"],
  // Épisode 6
  ["marche-antiquites"], ["rue-des-boutiques","librairie-du-marche"], ["etal-du-marchand"], ["etal-du-marchand"], ["etal-du-marchand"], ["etal-du-marchand"],
  // Épisode 7
  ["archives-de-chen"], ["archives-de-chen"], ["hall-de-gare"], ["hall-de-gare"], ["hall-de-gare","quai-du-train"], ["quai-du-train"],
  // Épisode 8
  ["cour-de-lecole"], ["cour-de-lecole"], ["salle-de-classe"], ["cour-de-lecole"], ["salle-de-classe"], ["salle-de-classe"],
  // Épisode 9
  ["salle-de-classe"], ["salle-de-classe"], ["palier-de-la-voisine"], ["imprimerie"], ["salon-de-la-voisine","cinema-du-quartier"], ["palier-de-la-voisine"],
  // Épisode 10
  ["palier-de-la-voisine","chambre-sous-les-combles"], ["chambre-sous-les-combles"], ["chambre-sous-les-combles"], ["chambre-sous-les-combles"], ["chambre-sous-les-combles"], ["chambre-sous-les-combles"]
];

function placeImagePath(id) {
  return 'assets/lieux/' + id + '.webp';
}

function placeCaption(place) {
  return place.memory ? place.city + ' · Souvenir de la voisine' : place.city;
}

function scenePlaceBanner(sceneIndex) {
  const id = SCENE_PLACES[sceneIndex]?.[0];
  const place = PLACE_ART[id];
  if (!place) return '<header class="hero location-banner"><h1>Les Chroniques du Dragon de Jade</h1></header>';
  return `<header class="scene-place">
    <a href="${placeImagePath(id)}" onclick="return openPlaceArt(event, '${id}')" aria-label="Agrandir l’aquarelle · ${esc(place.name)}">
      <img src="${placeImagePath(id)}" alt="${esc(place.alt)}" decoding="async">
      <span class="place-expand" aria-hidden="true">⤢</span>
    </a>
    <div class="scene-place-caption"><span>${esc(placeCaption(place))}</span><h1>${esc(place.name)}</h1></div>
  </header>`;
}

function placeCard(id) {
  const place = PLACE_ART[id];
  return `<a class="place-card" href="${placeImagePath(id)}" onclick="return openPlaceArt(event, '${id}')" aria-label="Agrandir · ${esc(place.name)} · ${esc(placeCaption(place))}">
    <img src="${placeImagePath(id)}" alt="${esc(place.alt)}" loading="lazy" decoding="async">
    <span><small>${esc(placeCaption(place))}</small><strong>${esc(place.name)}</strong></span>
  </a>`;
}

function secondaryScenePlaces(sceneIndex) {
  const secondary = SCENE_PLACES[sceneIndex]?.slice(1) || [];
  return secondary.length ? '<div class="scene-secondary-places">' + secondary.map(placeCard).join('') + '</div>' : '';
}

function visitedPlaceGallery(visitedScenes, episode, search) {
  const visited = new Set(visitedScenes);
  const places = new Set();
  SCENE_PLACES.forEach((ids, index) => {
    if (visited.has(index) && (episode === 'all' || String(episodeOfScene(index)) === episode)) {
      ids.forEach(id => places.add(id));
    }
  });
  const matches = [...places].filter(id => {
    const place = PLACE_ART[id];
    return atlasMatches(place.name + ' ' + placeCaption(place), search);
  });
  if (!matches.length) return '<p class="muted">' + (places.size ? 'Aucun lieu ne correspond à cette recherche.' : 'Les aquarelles apparaissent après chaque scène terminée ou passée.') + '</p>';
  return '<div class="place-gallery">' + matches.map(placeCard).join('') + '</div>';
}

function openPlaceArt(event, id) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return true;
  const place = PLACE_ART[id];
  const dialog = document.createElement('dialog');
  if (!place || typeof dialog.showModal !== 'function') return true;
  const trigger = event.currentTarget;
  dialog.className = 'place-viewer';
  dialog.setAttribute('aria-labelledby', 'place-viewer-title');
  dialog.innerHTML = `<figure>
    <div class="place-viewer-bar"><figcaption id="place-viewer-title"><small>${esc(placeCaption(place))}</small><strong>${esc(place.name)}</strong></figcaption>
    <button type="button" autofocus>Fermer</button></div>
    <img src="${placeImagePath(id)}" alt="${esc(place.alt)}">
  </figure>`;
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    dialog.remove();
    if (trigger.isConnected) trigger.focus({preventScroll:true});
  }, {once:true});
  document.body.appendChild(dialog);
  dialog.showModal();
  return false;
}
