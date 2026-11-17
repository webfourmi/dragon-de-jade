/* Épisode 7 du Livre I : scènes, vocabulaire, tours de dialogue et thèmes. */
const EPISODE7_SCENES=[
  {
    "title": "Le plan du carnet",
    "speaker": "Maître Chen",
    "text": "Le soir, dans l’arrière-boutique, Chen ouvre l’un des deux carnets achetés au marché. Entre deux pages couvertes d’une écriture appliquée, un plan dessiné au crayon : un quartier, une porte, une croix. Il pose le doigt dessus : « 这里 ? » Mei secoue la tête et montre un autre coin : « 那里 ? » Lóng, perché sur la lampe, demande ce que tout le monde se demande : « 哪儿 ? » Le plan n’a ni nom de rue ni nom de ville. Seule la croix brille, très faiblement, d’un vert que Lóng reconnaît.",
    "zh": "这里？那里？哪儿？",
    "py": "Zhèlǐ? Nàlǐ? Nǎr?",
    "fr": "Ici ? Là-bas ? Où ça ?",
    "question": "Que signifie 哪儿 ?",
    "options": [
      [
        "où ?",
        true
      ],
      [
        "qui ?",
        false
      ],
      [
        "combien ?",
        false
      ]
    ],
    "words": [
      "这里",
      "这儿",
      "那里",
      "那儿",
      "哪里",
      "哪儿"
    ],
    "reward": 15,
    "info": "En chinois, 这里 (zhèlǐ) et 这儿 (zhèr) signifient tous deux « ici ». La version en 儿 est plus courante à Pékin, où l’on prononce volontiers un « r » à la fin des mots.",
    "grammar": "这里 / 这儿 = ici ; 那里 / 那儿 = là-bas ; 哪里 / 哪儿 = où ? Les formes en 儿 sont plus orales et très employées dans le nord de la Chine. 哪儿 se place là où serait la réponse : 这里 ? = « Ici ? », 哪儿 ? = « Où ? »."
  },
  {
    "title": "Qui vient ?",
    "speaker": "Mei",
    "text": "Au dos du plan, quelques mots tracés à la hâte : le nom d’une ville, Tianjin, et un horaire de train. Mei range ses affaires sans hésiter : « 我去. » Chen, plus lentement : « 我来. » Lóng bondit sur ton épaule : « 我在 ! » Il ne te quittera pas d’une semelle. Tu hoches la tête : c’est décidé, vous partez demain.",
    "zh": "我去。我来。我在！",
    "py": "Wǒ qù. Wǒ lái. Wǒ zài!",
    "fr": "J’y vais. Je viens. Je suis là !",
    "question": "Que signifie 去 ?",
    "options": [
      [
        "aller",
        true
      ],
      [
        "venir",
        false
      ],
      [
        "rester",
        false
      ]
    ],
    "words": [
      "在",
      "去",
      "来"
    ],
    "reward": 15,
    "info": "En chinois, 来 (lái) et 去 (qù) dépendent du point de vue : 来 se rapproche de celui qui parle, 去 s’en éloigne. Les mêmes mots servent donc pour « venir » et « aller ».",
    "grammar": "去 (qù) = aller, 来 (lái) = venir, 在 (zài) = être présent, se trouver quelque part : 我在 = « Je suis là »."
  },
  {
    "title": "La carte de Chine",
    "speaker": "Lóng",
    "text": "À la gare de Pékin, Lóng s’arrête devant une immense carte murale : 中国. Il suit la côte du doigt jusqu’à une ville marquée d’un point rouge et rêve à voix haute : « 去，回 ? » On part, et on revient ? Chen consulte l’horaire noté au dos du plan : « 三点到. » Le train arrivera à trois heures. Mei, qui n’a jamais quitté Pékin, murmure : « 中国 ! » comme pour mesurer la taille du pays.",
    "zh": "去，回？三点到。",
    "py": "Qù, huí? Sān diǎn dào.",
    "fr": "Aller, puis revenir ? Arrivée à trois heures.",
    "question": "Que signifie 回 ?",
    "options": [
      [
        "revenir",
        true
      ],
      [
        "arriver",
        false
      ],
      [
        "partir",
        false
      ]
    ],
    "words": [
      "中国",
      "国",
      "回",
      "到"
    ],
    "reward": 15,
    "info": "La Chine s’appelle 中国 (Zhōngguó), littéralement « pays du milieu ». Le caractère 国 (« pays ») se retrouve dans de nombreux noms de pays.",
    "grammar": "中国 = Chine (中 = milieu, 国 = pays). 回 = revenir, rentrer ; 到 = arriver, parvenir à. 三点到 = « arriver à trois heures »."
  },
  {
    "title": "Les panneaux de la gare",
    "speaker": "Maître Chen",
    "text": "Dans le hall, les panneaux se multiplient. Chen, habitué des archives, lit tout à voix haute pour ne rien manquer : « 前，后. » Devant, derrière. « 上，下. » Les escaliers montent et descendent. Lóng, qui prend les panneaux pour un jeu, saute d’un signe à l’autre : « 里，外 ! » Dedans, dehors. Derrière un pilier de la salle d’attente, quelqu’un en manteau sombre referme son journal quand Mei le regarde, puis la foule se referme à son tour.",
    "zh": "前，后。上，下。里，外。",
    "py": "Qián, hòu. Shàng, xià. Lǐ, wài.",
    "fr": "Devant, derrière. En haut, en bas. Dedans, dehors.",
    "question": "Que signifie 里 ?",
    "options": [
      [
        "dedans",
        true
      ],
      [
        "dehors",
        false
      ],
      [
        "derrière",
        false
      ]
    ],
    "words": [
      "前",
      "后",
      "上",
      "下",
      "里",
      "外"
    ],
    "reward": 15,
    "info": "Dans les gares chinoises, les panneaux sont souvent bilingues, en chinois et en pinyin ou en anglais. Repérer 上 (« monter ») et 下 (« descendre ») aide à suivre les escaliers et les sorties.",
    "grammar": "前 = devant, avant ; 后 = derrière, après ; 上 = en haut, monter ; 下 = en bas, descendre ; 里 = dedans ; 外 = dehors. Ces mots servent aussi pour le temps : 上午 (matinée) et 下午 (après-midi)."
  },
  {
    "title": "De quel côté ?",
    "speaker": "Mei",
    "text": "Au guichet, la guichetière désigne d’un geste las le panneau des quais : « 这边. » Mei, sûre d’elle, part à l’opposé : « 那边 ? » Chen la rattrape par la manche : le train de Tianjin part d’un quai extérieur, de l’autre côté du hall. « 外边. » Il vous faudra traverser avant l’heure. À la dernière seconde, tu poses un pied sur le quai, Lóng accroché à ton sac.",
    "zh": "这边。那边？外边。",
    "py": "Zhèbiān. Nàbiān? Wàibian.",
    "fr": "De ce côté. De l’autre côté ? Dehors.",
    "question": "Que signifie 这边 ?",
    "options": [
      [
        "de ce côté",
        true
      ],
      [
        "de l’autre côté",
        false
      ],
      [
        "dehors",
        false
      ]
    ],
    "words": [
      "边",
      "外边",
      "这边",
      "那边"
    ],
    "reward": 15,
    "info": "Dans les grandes gares chinoises, un billet de train est lié à une pièce d’identité : le nom du voyageur y figure, et les contrôles à l’entrée sont systématiques.",
    "grammar": "边 (biān) = côté ; 这边 = de ce côté-ci ; 那边 = de ce côté-là ; 外边 = l’extérieur, le dehors. 边 se place après un mot de lieu."
  },
  {
    "title": "Le train de trois heures",
    "speaker": "Lóng",
    "text": "Le hall se vide, le quai se remplit. Lóng énumère les moyens de transport comme autant de promesses : « 车 ! 出租车 ? 飞机 ? » Une voiture, un taxi, un avion. Chen lui rappelle que le plus rapide n’est pas toujours le plus discret : « 火车. » Ce sera le train. Alors que les portes se ferment, tu aperçois tout au bout du quai une silhouette en manteau noir qui lève le col : Monsieur Wu, lui aussi, a pris son billet.",
    "zh": "出租车？飞机？火车。",
    "py": "Chūzūchē? Fēijī? Huǒchē.",
    "fr": "Un taxi ? Un avion ? Le train.",
    "question": "Que signifie 火车 ?",
    "options": [
      [
        "train",
        true
      ],
      [
        "avion",
        false
      ],
      [
        "taxi",
        false
      ]
    ],
    "words": [
      "车",
      "出租车",
      "飞机",
      "火车"
    ],
    "reward": 25,
    "info": "Les trains à grande vitesse chinois, appelés 高铁 (gāotiě), relient aujourd’hui Pékin à Tianjin en environ une demi-heure.",
    "grammar": "车 = véhicule ; 出租车 = taxi (littéralement « véhicule de location ») ; 火车 = train (« véhicule à feu », du temps des locomotives à vapeur) ; 飞机 = avion (« machine qui vole »)."
  }
];
const EPISODE7_VOCAB=[["中国","Zhōngguó","Chine"],["国","guó","pays"],["哪里","nǎlǐ","où"],["哪儿","nǎr","où"],["那里","nàlǐ","là-bas"],["那儿","nàr","là-bas"],["这里","zhèlǐ","ici"],["这儿","zhèr","ici"],["那边","nàbiān","de l’autre côté, là-bas"],["这边","zhèbiān","de ce côté, ici"],["边","biān","côté, bord"],["外","wài","dehors, extérieur"],["外边","wàibian","dehors"],["里","lǐ","dedans, intérieur"],["前","qián","devant, avant"],["后","hòu","derrière, après"],["上","shàng","en haut, monter"],["下","xià","en bas, descendre"],["去","qù","aller"],["来","lái","venir"],["回","huí","revenir, rentrer"],["到","dào","arriver"],["车","chē","véhicule, voiture"],["出租车","chūzūchē","taxi"],["飞机","fēijī","avion"],["火车","huǒchē","train"],["在","zài","être (quelque part), se trouver"]];
const EPISODE7_TURNS=[[{"speaker":"Maître Chen","zh":"这里？","fr":"Ici ?"},{"speaker":"Mei","zh":"那里？","fr":"Là-bas ?"},{"speaker":"Lóng","zh":"哪儿？","fr":"Où ça ?"},{"speaker":"Maître Chen","zh":"哪里？","fr":"Où ?"}],[{"speaker":"Mei","zh":"我去。","fr":"J’y vais."},{"speaker":"Maître Chen","zh":"我来。","fr":"Je viens."},{"speaker":"Lóng","zh":"我在！","fr":"Je suis là !"}],[{"speaker":"Lóng","zh":"去，回？","fr":"Aller, puis revenir ?"},{"speaker":"Maître Chen","zh":"三点到。","fr":"Arrivée à trois heures."},{"speaker":"Mei","zh":"中国！","fr":"La Chine !"}],[{"speaker":"Maître Chen","zh":"前，后。","fr":"Devant, derrière."},{"speaker":"Maître Chen","zh":"上，下。","fr":"En haut, en bas."},{"speaker":"Lóng","zh":"里，外！","fr":"Dedans, dehors !"}],[{"speaker":"La guichetière","zh":"这边。","fr":"De ce côté."},{"speaker":"Mei","zh":"那边？","fr":"De l’autre côté ?"},{"speaker":"Maître Chen","zh":"外边。","fr":"Dehors."}],[{"speaker":"Lóng","zh":"出租车？飞机？","fr":"Un taxi ? Un avion ?"},{"speaker":"Maître Chen","zh":"火车。","fr":"Le train."},{"speaker":"Mei","zh":"车！","fr":"Le train !"}]];
const EPISODE7_THEMES={"这里":"Lieux","这儿":"Lieux","那里":"Lieux","那儿":"Lieux","哪里":"Lieux","哪儿":"Lieux","那边":"Lieux","这边":"Lieux","边":"Lieux","外边":"Lieux","里":"Lieux","外":"Lieux","前":"Lieux","后":"Lieux","上":"Lieux","下":"Lieux","去":"Déplacements","来":"Déplacements","回":"Déplacements","到":"Déplacements","在":"Déplacements","车":"Déplacements","出租车":"Déplacements","飞机":"Déplacements","火车":"Déplacements","中国":"Pays","国":"Pays"};
