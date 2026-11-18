# Intégration des épisodes 9 et 10 — 18 novembre 2026

Version : 0.14.0. Base : main, dfce374 (0.13.2).

## Contenu

- Épisode 9 : « Écoutez-moi », 6 scènes, 22 mots.
- Épisode 10 : « La boîte à musique », 6 scènes, 23 mots.
- Total jouable : 60 scènes et 251 mots. Les 45 aquarelles correspondantes existaient déjà ; elles sont désormais préchargées pour le hors-ligne.
- Indices, réactions, déductions, menus d’épisodes et thèmes du carnet intégrés.

## Corrections lors de la relecture

- Conservation du nom actuel du héros dans les dialogues et des corrections vocales de la V0.13.2 : l’archive régressait sur ces deux points.
- Attribution explicite de « 请听我说 » à Wu ; horaire avant le verbe dans « 他十二点下班 ».
- Neige présentée comme un souvenir dans un dessin, pour conserver la chronologie de septembre.
- Chambre inoccupée, mais accessible à la voisine et à un visiteur récent ; coffre décrit sans contradiction de taille.
- Sceau de la boîte visible dans la narration ; indices limités aux faits observés. Le bulletin d’hôpital est une piste récente, pas une preuve de l’état actuel du maître.
- Déduction finale : réplique attribuée à Chen. Lien ancien avec Wu présenté comme une hypothèse.
- Très et vraiment distingués ; emploi neutre de 很 et tournure complète 太…了 expliqués. La particule 了 sera enseignée à l’épisode 11.
- Plusieurs encadrés qui répétaient la grammaire deviennent des découvertes culturelles de Tianjin.

## Vérifications

Les sept scripts de tests sont exécutés : syntaxe/intégration, épisodes, vocabulaire illustré, reconnaissance, exécution complète, nom du héros et service worker. Reprise des sauvegardes V0.11 et V0.13, 60 rendus de scènes, dix épisodes, deux nouvelles déductions, conservation des XP et des données, absence de récompense répétée, accès hors ligne aux scripts 9 et 10. Les tests automatiques GitHub sur main sont conservés.

Parcours navigateur sur une sauvegarde fictive après l’épisode 8 : scènes des épisodes 9 et 10 et déductions. Le microphone et la synthèse vocale d’un appareil Samsung réel ne sont pas évalués par ces tests ; leurs callbacks sont couverts par les tests automatiques.

## Sources de relecture

Consultées le 18 novembre 2026 ; résumés rédigés pour l’application, sans reprise de passages longs.

- Centre d’enseignement du chinois de l’université d’Oxford : [ordre des mots et adjectifs](https://www.ctcfl.ox.ac.uk/materials_sample_lessons_1_grammarlist/) ; [太 et 了, omission familière](https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_modal-le/).
- [Bibliothèque de Tianjin : arts de la rue culturelle, figurines et spectacles en maison de thé](https://www.tjl.tj.cn/ArticleContent.aspx?ChannelId=241&ID=27276).
- [Ministère chinois de la Culture : Yangliuqing et Niren Zhang](https://www.mct.gov.cn/preview/special/3415/3421/201202/t20120206_228888.html).
- [Centre chinois de protection du patrimoine immatériel : Qixi, habileté et amour](https://www.ihchina.cn/Article/Index/detail?id=18985).
- [Gouvernement de Jiangyin : symbolique des chaussons à tête de tigre](https://www.jiangyin.gov.cn/doc/2024/11/25/1271334.shtml).
- [China Weather : sens du proverbe 瑞雪兆丰年](https://www.weather.com.cn/index/lssj/11/16529.shtml).
- [Ministère chinois de l’Éducation : diversité des dispositifs de repos de midi](https://www.moe.gov.cn/jyb_xxgk/xxgk_jyta/jyta_jijiaosi/202209/t20220923_664180.html).

Le plan lexical est le plan existant de l’application ; cette intégration ne revalide pas l’ensemble du référentiel HSK.
