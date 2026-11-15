# Les Chroniques du Dragon de Jade · V0.10

PWA statique, sans backend, pour apprendre le chinois en jouant. Le Livre I contient six épisodes de 6 scènes (salutations, famille, nombres, temps, thé et repas, marché), des dialogues en mandarin avec synthèse vocale du navigateur, un carnet de vocabulaire illustré à l'aquarelle, un quiz à quatre exercices, une calligraphie validée trait par trait et une enquête (indices, écailles de Lóng, déductions).

## Lancer localement

Depuis ce dossier : `python -m http.server 8000`, puis ouvrir http://localhost:8000. Pour utiliser le micro depuis un téléphone, déployer sur un domaine HTTPS (GitHub Pages convient). L'installation PWA exige un contexte sécurisé.

## Limites explicites

- La voix est générée par le navigateur et dépend des voix installées ; l'exercice d'écoute du quiz exige une voix mandarin.
- La reconnaissance vocale du navigateur n'est pas disponible partout. Elle compare des chaînes simples, sans évaluer les tons.
- Calligraphie : Hanzi Writer 3.7.2 (MIT) et les données hanzi-writer-data 2.0.1 sont chargés depuis jsDelivr, sans contrôle d'intégrité. Sans connexion à la toute première visite, l'atelier retombe sur le dessin libre non validé. Le bouton « Télécharger les caractères » les met en cache pour le hors-ligne.
- Seuls les 48 mots des épisodes 1 et 2 ont une aquarelle ; les 106 mots des épisodes 3 à 6 gardent leur pictogramme (voir `VOCABULARY-ART.md`).
- Les listes de vocabulaire suivent le plan HSK 1 de `hsk1-plan.js`, qui n'est pas un référentiel officiel versionné.
- La sauvegarde locale stocke la progression, pas les tracés complets.
- Les épisodes 7 à 12 du Livre I et les livres suivants sont des plans.

## Fichiers

- `index.html`, `style.css`, `manifest.webmanifest`, `sw.js`, `assets/`
- `app.js` : interface et logique générale
- `episode2.js` à `episode6.js` : scènes, vocabulaire, dialogues et thèmes de chaque épisode
- `episodes.js` : démarrage d'un épisode et écran de fin d'épisode
- `enquete.js` : écailles, phrase de la boîte, indices, réactions, déductions
- `quiz.js`, `writing.js` : quiz et calligraphie
- `hsk1-plan.js`, `hsk1-reference.js` : plan HSK 1
- `tests/` et `.github/workflows/integration.yml` : contrôles automatiques

## Changer la version

La version vit à quatre endroits (`version.json`, `app.js`, `sw.js`, `index.html`). Ne les modifie pas à la main :

```
python bump-version.py 0.9.1 "Texte des nouveautés"
python bump-version.py --check
```

## Tests

```
node tests/integration.cjs
node tests/vocabulary-art.cjs
node tests/episodes.cjs
node tests/runtime.cjs
node tests/service-worker.cjs
```

`integration.cjs` vérifie aussi que chaque image référencée par le code, le CSS ou le service worker existe dans le dépôt. `episodes.cjs` vérifie que le vocabulaire de chaque épisode correspond au plan HSK 1 et que les phrases chinoises n'emploient que des caractères déjà appris.

`runtime.cjs` exécute l'application avec une interface simulée : restauration des anciennes sauvegardes, rendu des 36 scènes, parcours des six épisodes, 154 mots, transitions, déductions et absence d'XP en double lors d'une répétition. `service-worker.cjs` simule l'installation, la mise à jour et les requêtes hors connexion ; ce contrôle ne remplace pas un essai sur un appareil Android.

Avant publication de la V0.10.0, contrôles réalisés dans le navigateur local : démarrage, validation d'une réponse, sauvegarde après rechargement, carnet, restauration d'une partie avancée, accès à l'épisode 5 et enquête. Aucune erreur de console ni image manquante constatée sur les écrans contrôlés. Les 252 nouvelles aquarelles préparées séparément ne font pas partie de cette version.

## Ajouter un épisode

1. Créer `episodeN.js` sur le modèle de `episode5.js` : `EPISODEN_SCENES`, `EPISODEN_VOCAB`, `EPISODEN_TURNS`, `EPISODEN_THEMES`.
2. Le charger dans `index.html` (avant `app.js`) et l'ajouter à la liste `CORE` de `sw.js`.
3. Dans `app.js`, ajouter ses données aux trois `push` et à l'`Object.assign` des thèmes (chercher `EPISODE6`).
4. Dans `episodes.js`, ajouter `EP_END[N-1]` et `EP_NEXT[N]` (et `EXTRA_SPEAKERS` pour un nouveau personnage secondaire, sans portrait).
5. Dans `enquete.js`, ajouter ses indices (`scene` = numéro de scène à partir de 0), ses questions, ses réactions et une entrée dans `EQ_DEDUCTIONS`.
6. Mettre à jour les listes de fichiers de `tests/integration.cjs` et `tests/episodes.cjs`, puis lancer `bump-version.py`.

## Enquête (enquete.js)

- `EQ_CLUES` : les indices, liés à la scène qui les débloque. `EQ_LINKS` leurs liens, `EQ_QUESTIONS` les questions ouvertes.
- `EQ_REACTIONS` : un choix de ton après certaines scènes, qui fait varier la confiance de Chen, Mei et Lóng (0 à 5). `EQ_VARIANTS` : lignes de narration ajoutées selon cette confiance.
- `EQ_DEDUCTIONS` : une scène de déduction par épisode (un mot à comprendre, puis les bons indices à choisir).
- `EQ_INSCRIPTION` : la phrase 这是你的家 ; chaque signe apparaît quand le mot est appris. Le dernier, 的, est prévu à l'épisode 11.
- Les écailles de Lóng : une par épisode terminé (6 scènes faites ou passées). Rejouer un épisode ne les retire pas.

## Quiz

L'exercice d'écoute exige une voix mandarin ; sans elle, le mode « Varié » l'écarte. Les pièges sont choisis parmi les mots déjà appris (même thème, même épisode ou caractère commun) ; pour les tons, ils ne diffèrent de la bonne réponse que par un seul ton.
