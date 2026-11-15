# Aquarelles du carnet

## V0.6.3 — carnet complet

Les **48 mots et expressions des épisodes 1 et 2** possèdent chacun une aquarelle distincte : les 4 images de V0.6.2 sont conservées, 44 nouvelles images complètent le carnet. Les fichiers de diffusion sont dans `assets/vocabulary/` (640 × 640 JPEG, environ 6,1 Mo au total). Le fichier `vocabulary-art.json` donne les 44 associations mot/fichier, les descriptions et les sujets de génération, produits avec l’outil intégré.

Contrôle visuel effectué sur les planches d'ensemble ; les vignettes 人 et 先生 ont été simplifiées avant livraison. Les variantes de travail restent dans le dossier de génération local. Les 48 fichiers utilisés sont ajoutés au cache PWA, et les mots continuent à se débloquer selon la progression existante. Le mode hors connexion réel et le rendu mobile Android restent à confirmer sur l'appareil.

Cette couverture concerne le vocabulaire actuellement jouable, pas les 300 entrées des leçons futures du programme HSK.

## Lot 1 — accueil

Les originaux annoncés pour 你好, 你, 好 et 您 n'ont pas été retrouvés dans les fichiers accessibles le 14 novembre 2026. `/mnt/data` n'est pas monté sur cet ordinateur. Les images de cette livraison sont donc de nouvelles créations, produites avec l'outil de génération d'images intégré, et non une récupération des quatre originaux.

Fichiers : `assets/vocabulary/ni-hao-v1.jpg`, `ni-v1.jpg`, `hao-v1.jpg`, `nin-v1.jpg`. Les PNG de travail restent dans le dossier local de génération. Les JPEG de diffusion sont réduits à 640 × 640, sans recadrage.

Direction commune : petite aquarelle sur papier ivoire, bords fondus, couleurs jade et corail, composition lisible en vignette. Aucun texte, caractère chinois, étiquette, bulle, cadre ou filigrane. Aucun héros personnalisable. Mei, Maître Chen et Lóng sont des personnages secondaires utilisables ; leurs portraits existants servent de références.

Sujets de génération du lot 1 :

- **你好** : Mei et Maître Chen se saluent devant une boutique d'antiquités, scène simple et chaleureuse.
- **你** : Mei, seule et face au lecteur, tend une main ouverte vers son interlocuteur, sourire amical. Référence : `assets/mei.webp`.
- **好** : Mei sourit et lève le pouce en signe d'approbation, à côté du petit Lóng satisfait. Références : `assets/mei.webp`, `assets/long.webp`.
- **您** : Mei s'incline respectueusement devant Maître Chen, qui accueille son salut avec bienveillance. Références : `assets/mei.webp`, `assets/maitre-chen.webp`.

Ces scènes sont des aides de mémorisation du sens, pas des explications de l'étymologie des caractères.

## Briefs des lots complémentaires — réalisés en V0.6.3

Les briefs ci-dessous documentent la préparation initiale. Les scènes finales, les noms de fichiers retenus et les entrées complémentaires figurent dans `vocabulary-art.json`. Tous les fichiers utilisés sont présents dans le dépôt.

### Lot 2 — identité : 我, 叫, 名字, 什么, 谁, 是

| Mot | Scène proposée | Fichier prévu |
| --- | --- | --- |
| 我 | Mei pose une main sur sa propre poitrine. | wo-v1.jpg |
| 叫 | Mei se présente à Chen, main sur la poitrine et bouche entrouverte, aucun nom écrit. | jiao-v1.jpg |
| 名字 | Chen présente une petite étiquette vierge liée à une sacoche ; ne produire aucun signe écrit. | mingzi-v1.jpg |
| 什么 | Mei observe deux objets différents avec une expression interrogative et une paume ouverte. | shenme-v1.jpg |
| 谁 | Lóng regarde derrière un paravent où apparaît la silhouette de Chen. | shei-v1.jpg |
| 是 | Chen confirme d'un signe de tête en désignant Lóng, clairement reconnaissable. | shi-v1.jpg |

### Lot 3 — politesse : 请, 请问, 谢谢, 不客气, 对不起, 没关系, 再见, 认识

| Mot | Scène proposée | Fichier prévu |
| --- | --- | --- |
| 请 | Chen invite Mei à entrer, paume ouverte vers la porte. | qing-v1.jpg |
| 请问 | Mei attire poliment l'attention de Chen occupé à une table. | qingwen-v1.jpg |
| 谢谢 | Mei reçoit une tasse de Chen, sourire reconnaissant. | xiexie-v1.jpg |
| 不客气 | Chen répond avec un sourire et un geste accueillant. | bu-keqi-v1.jpg |
| 对不起 | Mei s'excuse après avoir renversé un peu de thé. | duibuqi-v1.jpg |
| 没关系 | Chen rassure Mei près de la tasse renversée, geste apaisant. | mei-guanxi-v1.jpg |
| 再见 | Mei et Chen se font un signe de la main à la porte. | zaijian-v1.jpg |
| 认识 | Chen présente Mei à Lóng ; échange de regards amicaux. | renshi-v1.jpg |

### Lot 4 — famille, épisode 2

Les 24 mots du deuxième épisode sont illustrés, dont 爸爸, 妈妈, 家, 家人, 哥哥, 姐姐, 弟弟 et 妹妹, ainsi que les liens familiaux, les relations, les pronoms et l'âge. Les groupes familiaux secondaires sont distincts du héros du joueur : portraits parentaux, maison chaleureuse, groupe devant la maison et paires d'aînés et cadets. Aucun nom sur les portraits ou la maison.

## Intégration et contrôle

Le registre `VOCAB_WATERCOLORS` associe explicitement un mot à un fichier réellement présent. Les autres mots conservent leurs pictogrammes. Les images ne débloquent aucun mot et ne modifient aucune sauvegarde. Le texte chinois, le pinyin, le son, les filtres et les sélections de révision restent indépendants de l'image.

Ajouter chaque fichier de diffusion à la liste du service worker, mettre à jour la version et les notes seulement pour un lot prêt à publier. Contrôler le chargement normal, le repli après erreur d'image, le carnet sur écran étroit et le cache hors connexion. La calligraphie tactile doit toujours être vérifiée sur l'appareil Android.

## Épisodes 3 à 6 : 106 mots sans aquarelle

Les mots des épisodes 3 (nombres, quantités, argent : 26), 4 (jours, dates, heure : 29), 5 (thé, nourriture, repas : 25) et 6 (achats, démonstratifs : 26) utilisent pour l'instant leur pictogramme. Aucune aquarelle n'a été produite pour eux. Les 48 images existantes ne sont pas concernées. Pour en ajouter : suivre `vocabulary-art.json`, ajouter l'entrée dans `VOCAB_WATERCOLORS` et les fichiers dans le cache de `sw.js`, puis adapter les compteurs de `tests/vocabulary-art.cjs` (48 → nouveau total).
