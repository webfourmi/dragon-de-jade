# Les Chroniques du Dragon de Jade · V0.2 prototype

Prototype PWA statique, sans backend. Contient un épisode de 6 scènes, une illustration aquarelle de référence réutilisée, des dialogues en mandarin avec synthèse vocale du navigateur, reconnaissance vocale si le navigateur la propose, choix guidés, carnet de vocabulaire, calligraphie tactile libre, atlas introductif et plan de campagne.

## Lancer localement

Depuis ce dossier : `python -m http.server 8000`, puis ouvrir http://localhost:8000. Pour utiliser le micro depuis un téléphone, déployer sur un domaine HTTPS. GitHub Pages est une option. L'installation PWA exige un contexte sécurisé.

## Limites explicites

- La voix est générée par le navigateur et sa disponibilité dépend des voix installées ; aucun enregistrement vocal de comédien n'est inclus.
- La reconnaissance vocale du navigateur n'est pas disponible partout et peut exiger une connexion. Le prototype compare des chaînes simples, sans évaluer les tons ni la prononciation.
- Le dessin tactile fonctionne, mais l'ordre des traits et leur forme ne sont pas automatiquement validés. Les libellés de traits sont provisoires et doivent être confrontés à un corpus fiable avant publication pédagogique.
- Les images des scènes utilisent pour le moment une seule illustration aquarelle. Des illustrations distinctes restent à produire.
- Les listes de vocabulaire ne sont pas encore mappées à un référentiel HSK officiel versionné.
- La sauvegarde locale stocke la progression, mais pas les tracés complets de dessin.
- Seul le premier épisode est disponible ; les livres suivants sont des plans.

## Fichiers

`index.html`, `style.css`, `app.js`, `sw.js`, `manifest.webmanifest`, `assets/`.
