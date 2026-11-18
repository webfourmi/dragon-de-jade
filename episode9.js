/* Épisode 9 du Livre I : scènes, vocabulaire, tours de dialogue et thèmes. */
const EPISODE9_SCENES=[
  {
    "title": "Écoutez-moi",
    "speaker": "Mei",
    "text": "Une silhouette noire se découpe dans l’encadrement de la porte : Monsieur Wu, son chapeau à la main, comme s’il entrait dans un salon. Mei bondit devant le cahier. Wu lève une main : « 请听我说. » Sa voix est calme, presque amicale. « 你说什么 ? » siffle Mei. Il laisse passer un silence, puis regarde le tableau noir, le cahier, ton jade : « 我看，这是问题. » À son avis, tout cela est un problème, pour lui comme pour vous. Chen pose une main sur le bras de Mei : on peut au moins le laisser 说话, parler. Il suffit d’écouter : « 听. »",
    "zh": "请听我说。你说什么？",
    "py": "Qǐng tīng wǒ shuō. Nǐ shuō shénme?",
    "fr": "Écoutez-moi, je vous prie. Qu’est-ce que vous dites ?",
    "question": "Que signifie 听 ?",
    "options": [
      [
        "écouter",
        true
      ],
      [
        "regarder",
        false
      ],
      [
        "parler",
        false
      ]
    ],
    "words": [
      "看",
      "听",
      "说",
      "说话"
    ],
    "reward": 15,
    "info": "À Tianjin, les maisons de thé accueillent aussi des spectacles de xiangsheng (相声), un art de la parole qui mêle notamment récit, imitation et chant.",
    "grammar": "听 = écouter, 看 = regarder, 说 = dire, parler ; 说话 = parler, adresser la parole. 请听我说 = « Écoutez-moi, je vous prie »."
  },
  {
    "title": "Un numéro dans le cahier",
    "speaker": "Lóng",
    "text": "Wu repart comme il est venu, en laissant sur le pupitre une carte de visite : un numéro de 手机 et trois mots tracés au stylo, « 请打电话. » Mei déchire la carte en deux avant que Chen ne puisse la retenir. Lóng, lui, fixe le cahier : collé à l’intérieur de la couverture, un autre numéro, plus ancien, un 电话 fixe. « 这是电话. » Lóng, qui n’a jamais vu d’appareil pareil, demande ce qui sonne : « 手机 ? 电脑 ? » Le gardien, ému par tant de bruit, tend son portable : « 给你手机. » Mei compose, le cœur battant : « 打电话 ! » Quelque part dans la ville, une sonnerie retentit, puis une voisine décroche.",
    "zh": "这是电话。打电话！",
    "py": "Zhè shì diànhuà. Dǎ diànhuà!",
    "fr": "C’est un téléphone. Appelons !",
    "question": "Que signifie 打电话 ?",
    "options": [
      [
        "téléphoner",
        true
      ],
      [
        "écouter",
        false
      ],
      [
        "dormir",
        false
      ]
    ],
    "words": [
      "电话",
      "打电话",
      "手机",
      "电脑"
    ],
    "reward": 15,
    "info": "En Chine, le téléphone 手机 sert à presque tout : on y règle ses achats en scannant un code, on y réserve un taxi, on y montre ses billets de train.",
    "grammar": "电话 = téléphone ; 手机 = téléphone portable (littéralement « machine de main ») ; 电脑 = ordinateur (« cerveau électrique ») ; 打电话 = téléphoner. 给你手机 = « Je te donne le téléphone »."
  },
  {
    "title": "Chez la voisine",
    "speaker": "Maître Chen",
    "text": "La voisine du maître vous accueille sur son palier, un thermos de thé sous le bras. Elle parle de lui comme d’un homme de routine : « 六点起床，十点睡觉. » Levé à six heures, couché à dix. « 星期天休息. » Seul le dimanche était pour lui. Lóng demande, étonné : « 睡 ? » Elle rit : même les gens les plus sérieux ont besoin de dormir. Chen note tout dans son carnet, comme pour un registre.",
    "zh": "六点起床，十点睡觉。星期天休息。",
    "py": "Liù diǎn qǐchuáng, shí diǎn shuìjiào. Xīngqītiān xiūxi.",
    "fr": "Il se levait à six heures, se couchait à dix. Le dimanche, il se reposait.",
    "question": "Que signifie 起床 ?",
    "options": [
      [
        "se lever",
        true
      ],
      [
        "se coucher",
        false
      ],
      [
        "se reposer",
        false
      ]
    ],
    "words": [
      "起床",
      "睡觉",
      "睡",
      "休息"
    ],
    "reward": 15,
    "info": "La pause de midi peut comprendre un temps de repos, 午休 (wǔxiū). Certaines écoles chinoises prévoient une sieste pour leurs élèves ; son organisation varie selon les établissements.",
    "grammar": "起床 = se lever (littéralement « quitter le lit ») ; 睡觉 = dormir, se coucher ; 休息 = se reposer. L’heure se place avant le verbe : 六点起床 = « se lever à six heures »."
  },
  {
    "title": "Le travail du maître",
    "speaker": "Mei",
    "text": "La voisine continue : le matin, le maître partait pour l’école, « 上班 » ; à midi, « 下班 », il rentrait manger. L’après-midi, c’était le train pour Pékin et la maison de thé, vous le savez. Mais le soir, il avait une seconde 工作 : il copiait des documents à la main dans une petite 公司 du quartier, une imprimerie. « 晚上在公司工作. » Elle vous y conduit : la vitrine est poussiéreuse, l’enseigne presque effacée. Il ne reste qu’un seul caractère lisible, que Chen déchiffre du bout des lèvres : 吴. Wu. Personne ne dit rien.",
    "zh": "他十二点下班。晚上在公司工作。",
    "py": "Tā shí’èr diǎn xiàbān. Wǎnshang zài gōngsī gōngzuò.",
    "fr": "Il finissait à midi. Le soir, il travaillait dans une entreprise.",
    "question": "Que signifie 公司 ?",
    "options": [
      [
        "entreprise",
        true
      ],
      [
        "école",
        false
      ],
      [
        "gare",
        false
      ]
    ],
    "words": [
      "上班",
      "下班",
      "工作",
      "公司"
    ],
    "reward": 15,
    "info": "Les journées de travail chinoises commencent souvent vers huit ou neuf heures, avec une longue pause à midi. Dans certaines entreprises, la pratique dite « 996 » (de 9 h à 21 h, six jours par semaine) est très contestée.",
    "grammar": "上班 = aller au travail, commencer le travail ; 下班 = finir le travail ; 工作 = travail, travailler ; 公司 = entreprise. Comme 上课 / 下课, mais pour le travail : 上 = commencer, 下 = finir."
  },
  {
    "title": "Le dimanche au cinéma",
    "speaker": "Lóng",
    "text": "Dans le salon de la voisine, un vieux 电视 ronronne, diffusant un film en noir et blanc. Elle baisse le son, les yeux mouillés : « 他们看电影. » Chaque dimanche, le maître emmenait la petite fille au 电影院 du coin, et elle regardait les films les yeux écarquillés, perchée sur deux coussins. « 电影院 ? » demande Mei. « 电视，电影. » La voisine montre l’écran, puis la rue. Lóng sourit sans savoir pourquoi : ce mot-là lui est familier.",
    "zh": "他们看电影。电影院？",
    "py": "Tāmen kàn diànyǐng. Diànyǐngyuàn?",
    "fr": "Ils regardaient des films. Au cinéma ?",
    "question": "Que signifie 电影 ?",
    "options": [
      [
        "film",
        true
      ],
      [
        "télévision",
        false
      ],
      [
        "ordinateur",
        false
      ]
    ],
    "words": [
      "电视",
      "电影",
      "电影院"
    ],
    "reward": 15,
    "info": "La Chine compte parmi les pays qui ont le plus grand nombre de salles de cinéma au monde, et son public est l’un des plus nombreux de la planète.",
    "grammar": "电视 = télévision ; 电影 = film ; 电影院 = cinéma (la salle, littéralement « salle de films électriques »). 看电影 = regarder un film, aller au cinéma."
  },
  {
    "title": "La chanson",
    "speaker": "Maître Chen",
    "text": "Avant de vous laisser partir, la voisine fredonne une mélodie très simple, une berceuse que le maître chantait chaque soir : « 他唱歌. » Elle a oublié les paroles, mais pas l’air. Lóng l’écoute les yeux fermés puis, à la surprise de tous, reprend le refrain sans une fausse note : « 歌 ! » Mei sourit : « 她喜欢玩. » La petite fille aimait jouer au son de cette chanson. Le dragon tremble : il ne sait pas d’où lui vient cet air. Par la fenêtre du palier, les premières gouttes de pluie tapent contre la vitre.",
    "zh": "他唱歌，她喜欢玩。",
    "py": "Tā chàng gē, tā xǐhuan wán.",
    "fr": "Il chantait, elle aimait jouer.",
    "question": "Que signifie 唱歌 ?",
    "options": [
      [
        "chanter",
        true
      ],
      [
        "jouer",
        false
      ],
      [
        "écouter",
        false
      ]
    ],
    "words": [
      "唱",
      "歌",
      "玩"
    ],
    "reward": 25,
    "info": "Chanter entre amis, 唱歌, est un loisir très populaire en Chine : le karaoké, appelé KTV, est une sortie classique pour se retrouver.",
    "grammar": "唱 = chanter ; 歌 = chanson ; 唱歌 = chanter. 玩 = jouer, s’amuser : 她喜欢玩 = « Elle aime jouer »."
  }
];
const EPISODE9_VOCAB=[["起床","qǐchuáng","se lever"],["睡觉","shuìjiào","dormir, se coucher"],["睡","shuì","dormir"],["休息","xiūxi","se reposer"],["上班","shàngbān","aller au travail"],["下班","xiàbān","finir le travail"],["工作","gōngzuò","travail, travailler"],["公司","gōngsī","entreprise"],["电脑","diànnǎo","ordinateur"],["手机","shǒujī","téléphone portable"],["电话","diànhuà","téléphone"],["打电话","dǎ diànhuà","téléphoner"],["电视","diànshì","télévision"],["电影","diànyǐng","film"],["电影院","diànyǐngyuàn","cinéma (salle)"],["看","kàn","regarder"],["听","tīng","écouter"],["说","shuō","dire, parler"],["说话","shuōhuà","parler"],["唱","chàng","chanter"],["歌","gē","chanson"],["玩","wán","jouer, s’amuser"]];
const EPISODE9_TURNS=[[{"speaker":"Monsieur Wu","zh":"请听我说。","fr":"Écoutez-moi, je vous prie."},{"speaker":"Mei","zh":"你说什么？","fr":"Qu’est-ce que vous dites ?"},{"speaker":"Monsieur Wu","zh":"我看，这是问题。","fr":"À mon avis, c’est un problème."},{"speaker":"Maître Chen","zh":"听。","fr":"Écoute."}],[{"speaker":"Maître Chen","zh":"这是电话。","fr":"C’est un téléphone."},{"speaker":"Lóng","zh":"手机？电脑？","fr":"Un portable ? Un ordinateur ?"},{"speaker":"Le gardien","zh":"给你手机。","fr":"Je te donne le téléphone."},{"speaker":"Mei","zh":"打电话！","fr":"Appelons !"}],[{"speaker":"La voisine","zh":"六点起床，十点睡觉。","fr":"Il se levait à six heures, se couchait à dix."},{"speaker":"La voisine","zh":"星期天休息。","fr":"Le dimanche, il se reposait."},{"speaker":"Lóng","zh":"睡？","fr":"Dormir ?"}],[{"speaker":"La voisine","zh":"他八点上班。","fr":"Il commençait à huit heures."},{"speaker":"La voisine","zh":"他十二点下班。","fr":"Il finissait à midi."},{"speaker":"La voisine","zh":"晚上在公司工作。","fr":"Le soir, il travaillait dans une entreprise."},{"speaker":"Mei","zh":"公司？","fr":"Une entreprise ?"}],[{"speaker":"La voisine","zh":"他们看电影。","fr":"Ils regardaient des films."},{"speaker":"Mei","zh":"电影院？","fr":"Au cinéma ?"},{"speaker":"La voisine","zh":"电视，电影。","fr":"La télévision, le cinéma."}],[{"speaker":"La voisine","zh":"他唱歌。","fr":"Il chantait."},{"speaker":"Lóng","zh":"歌！","fr":"Une chanson !"},{"speaker":"Mei","zh":"她喜欢玩。","fr":"Elle aimait jouer."}]];
const EPISODE9_THEMES={"起床":"Vie quotidienne","睡觉":"Vie quotidienne","睡":"Vie quotidienne","休息":"Vie quotidienne","上班":"Vie quotidienne","下班":"Vie quotidienne","工作":"Vie quotidienne","公司":"Vie quotidienne","电脑":"Technologie","手机":"Technologie","电话":"Technologie","打电话":"Technologie","电视":"Technologie","电影":"Loisirs","电影院":"Loisirs","唱":"Loisirs","歌":"Loisirs","玩":"Loisirs","看":"Communication","听":"Communication","说":"Communication","说话":"Communication"};
