/* Épisode 8 du Livre I : scènes, vocabulaire, tours de dialogue et thèmes. */
const EPISODE8_SCENES=[
  {
    "title": "La cour de l’école",
    "speaker": "Mei",
    "text": "À Tianjin, la croix du plan correspond à un vieux bâtiment de briques grises, au portail rouillé : un 学校, une école fermée depuis des années et transformée en salle de quartier. Un gardien à la veste rapiécée vous barre le passage : « 你们是学生吗 ? » Mei répond avec aplomb : « 我们认识老师. » Nous connaissons le maître. Le gardien fronce les sourcils : « 老师 ? 谁 ? » Personne ne connaît le nom de l’ami. Il va falloir trouver un autre moyen.",
    "zh": "你们是学生吗？我们认识老师。",
    "py": "Nǐmen shì xuésheng ma? Wǒmen rènshi lǎoshī.",
    "fr": "Êtes-vous des élèves ? Nous connaissons le maître.",
    "question": "Que signifie 学生 ?",
    "options": [
      [
        "élève, étudiant",
        true
      ],
      [
        "professeur",
        false
      ],
      [
        "camarade de classe",
        false
      ]
    ],
    "words": [
      "学校",
      "学",
      "学生",
      "老师"
    ],
    "reward": 15,
    "info": "En Chine, les élèves portent souvent un uniforme de sport à l’école, et les cours commencent tôt le matin. Dans beaucoup d’écoles, une cérémonie du drapeau a lieu chaque semaine.",
    "grammar": "学 = étudier, apprendre ; 学生 = élève, étudiant ; 学校 = école ; 老师 = professeur, maître. 你们是学生吗 ? = « Êtes-vous des élèves ? »"
  },
  {
    "title": "Primaire et collège",
    "speaker": "Maître Chen",
    "text": "Un sourire de Mei et quelques mots de Chen sur la famille suffisent : le gardien vous laisse entrer et vous guide : « 这是小学，那是中学. » Le bâtiment abritait les deux écoles côte à côte, les 小学生 au rez-de-chaussée, les 中学生 à l’étage. Sur les murs de la cour, des dizaines de photographies de classe jaunies. Lóng les scrute une à une. Chen s’arrête devant l’une d’elles et ne dit plus rien.",
    "zh": "这是小学，那是中学。",
    "py": "Zhè shì xiǎoxué, nà shì zhōngxué.",
    "fr": "Ça, c’est l’école primaire, là-bas, c’est le collège.",
    "question": "Que signifie 中学 ?",
    "options": [
      [
        "collège et lycée",
        true
      ],
      [
        "école primaire",
        false
      ],
      [
        "université",
        false
      ]
    ],
    "words": [
      "小学",
      "小学生",
      "中学",
      "中学生"
    ],
    "reward": 15,
    "info": "Le système scolaire chinois compte souvent six années d’école primaire (小学), puis trois de collège et trois de lycée ; le mot 中学 recouvre les deux derniers cycles.",
    "grammar": "小学 = école primaire (小 = petit) ; 中学 = collège et lycée (中 = milieu) ; 大学 = université (大 = grand). 学生 désigne l’élève : 小学生 = écolier, 中学生 = collégien ou lycéen."
  },
  {
    "title": "Les camarades",
    "speaker": "Mei",
    "text": "Dans une salle de classe devenue salle de quartier, le gardien soulève une nappe et dévoile de vieux pupitres. « 他在这儿学习. » Le maître, raconte-t-il, a d’abord été élève ici, puis 大学生, avant de revenir enseigner. Mei demande s’il avait des camarades : « 同学 ? » Le gardien hoche la tête : trois anciens 同学 viennent encore, chaque année, déposer des fleurs sur le pupitre du fond. Le maître devait être aimé.",
    "zh": "他在这儿学习。同学？",
    "py": "Tā zài zhèr xuéxí. Tóngxué?",
    "fr": "Il étudiait ici. Des camarades ?",
    "question": "Que signifie 同学 ?",
    "options": [
      [
        "camarade de classe",
        true
      ],
      [
        "professeur",
        false
      ],
      [
        "directeur",
        false
      ]
    ],
    "words": [
      "大学",
      "大学生",
      "同学",
      "学习"
    ],
    "reward": 15,
    "info": "En Chine, les camarades de classe, les 同学 (tóngxué), restent souvent liés toute leur vie : les retrouvailles d’anciens élèves sont très populaires.",
    "grammar": "大学 = université ; 大学生 = étudiant(e) ; 同学 = camarade de classe ; 学习 = étudier. 他在这儿学习 = « Il étudiait ici »."
  },
  {
    "title": "La cloche",
    "speaker": "Lóng",
    "text": "Le gardien tire sur la corde de la cloche, qui sonne une dernière fois pour vous : « 八点上课，十二点下课. » On commence à huit heures, on finit à midi. Lóng demande ce qu’il en était l’après-midi : « 上学 ? » Le gardien sourit : « 下午没有课. » Pas de cours l’après-midi. Le maître avait donc ses après-midi libres. Lóng compte sur ses doigts : midi, une demi-heure de train, une table près d’une fenêtre, à Pékin, vers trois heures. Les pièces s’emboîtent.",
    "zh": "八点上课，十二点下课。下午没有课。",
    "py": "Bā diǎn shàngkè, shíèr diǎn xiàkè. Xiàwǔ méiyǒu kè.",
    "fr": "On commence à huit heures, on finit à midi. L’après-midi, il n’y a pas de cours.",
    "question": "Que signifie 下课 ?",
    "options": [
      [
        "finir le cours",
        true
      ],
      [
        "commencer le cours",
        false
      ],
      [
        "aller à l’école",
        false
      ]
    ],
    "words": [
      "课",
      "上课",
      "下课",
      "上学"
    ],
    "reward": 15,
    "info": "Dans beaucoup d’écoles chinoises, une longue pause de midi permet aux élèves de déjeuner et de se reposer : certains font même une courte sieste à leur pupitre.",
    "grammar": "课 = cours, leçon ; 上课 = commencer un cours ; 下课 = finir le cours ; 上学 = aller à l’école. Même logique que 上午 / 下午 : 上 = commencer, 下 = finir."
  },
  {
    "title": "Le tableau noir",
    "speaker": "Maître Chen",
    "text": "Dans la salle de classe, un grand tableau noir a survécu au temps. À moitié effacés, quelques 汉字 y brillent encore à la craie blanche. Chen s’en approche : « 这是汉字. » Mei précise qu’on parle de 汉语 pour la langue et de 中文 pour le chinois, parlé comme écrit : « 这是中文. » Lóng tourne autour d’un seul signe : « 字 ! » Puis tous se taisent : la phrase du tableau est la même que celle de la boîte de laque, dans la même écriture appliquée. Seuls 这是 et 家 sont encore lisibles.",
    "zh": "这是汉字，这是中文。",
    "py": "Zhè shì Hànzì, zhè shì Zhōngwén.",
    "fr": "Ce sont des caractères chinois, c’est du chinois.",
    "question": "Que signifie 汉字 ?",
    "options": [
      [
        "caractères chinois",
        true
      ],
      [
        "langue chinoise",
        false
      ],
      [
        "livre",
        false
      ]
    ],
    "words": [
      "汉语",
      "汉字",
      "中文",
      "字"
    ],
    "reward": 15,
    "info": "Les 汉字 (Hànzì), « caractères des Han », sont l’écriture chinoise. Environ trois mille caractères suffisent pour lire la grande majorité des textes courants.",
    "grammar": "汉语 = la langue chinoise (parlée) ; 中文 = le chinois (langue et écriture) ; 汉字 = les caractères chinois ; 字 = caractère, mot écrit. 这是汉字 = « Ce sont des caractères chinois »."
  },
  {
    "title": "Une question",
    "speaker": "Mei",
    "text": "Dans le tiroir du pupitre du fond, Mei trouve un vieux cahier relié, une 书 sans titre. Chen l’ouvre et lit à voix haute, comme au temps où il apprenait lui-même : 读书. Page après page, la même ligne, tracée d’une main appliquée : « 她在哪儿 ? » Lóng tourne les pages, effaré : « 写，写，写 ! » Le maître a écrit la même phrase des centaines de fois. « 这是问题. » C’est la seule question qu’il n’ait jamais cessé de se poser : où est la petite fille ? Sur le seuil, une silhouette noire vient de poser la main sur la poignée.",
    "zh": "她在哪儿？这是问题。",
    "py": "Tā zài nǎr? Zhè shì wèntí.",
    "fr": "Où est-elle ? Voilà la question.",
    "question": "Que signifie 问题 ?",
    "options": [
      [
        "question, problème",
        true
      ],
      [
        "livre",
        false
      ],
      [
        "caractère",
        false
      ]
    ],
    "words": [
      "读",
      "读书",
      "书",
      "写",
      "问题"
    ],
    "reward": 30,
    "info": "En chinois, 问题 (wèntí) veut dire à la fois « question » et « problème » : on répond 没问题 (« pas de problème ») pour dire « bien sûr ».",
    "grammar": "书 = livre ; 读 = lire (à voix haute) ; 读书 = lire, étudier ; 写 = écrire ; 问题 = question, problème. 这是问题 = « Voilà la question »."
  }
];
const EPISODE8_VOCAB=[["大学","dàxué","université"],["大学生","dàxuéshēng","étudiant, étudiante"],["学校","xuéxiào","école"],["小学","xiǎoxué","école primaire"],["小学生","xiǎoxuéshēng","écolier, écolière"],["中学","zhōngxué","collège et lycée"],["中学生","zhōngxuéshēng","collégien, lycéen"],["学生","xuéshēng","élève, étudiant"],["同学","tóngxué","camarade de classe"],["老师","lǎoshī","professeur, maître"],["课","kè","cours, leçon"],["上课","shàngkè","avoir cours"],["下课","xiàkè","finir le cours"],["上学","shàngxué","aller à l’école"],["学","xué","étudier, apprendre"],["学习","xuéxí","étudier"],["汉语","Hànyǔ","langue chinoise"],["汉字","Hànzì","caractères chinois"],["中文","Zhōngwén","chinois (langue et écriture)"],["字","zì","caractère, mot écrit"],["读","dú","lire"],["读书","dúshū","lire, étudier"],["书","shū","livre"],["写","xiě","écrire"],["问题","wèntí","question, problème"]];
const EPISODE8_TURNS=[[{"speaker":"Le gardien","zh":"你们是学生吗？","fr":"Êtes-vous des élèves ?"},{"speaker":"Mei","zh":"我们认识老师。","fr":"Nous connaissons le maître."},{"speaker":"Le gardien","zh":"老师？谁？","fr":"Le maître ? Qui ?"}],[{"speaker":"Le gardien","zh":"这是小学，那是中学。","fr":"Ça, c’est l’école primaire, là-bas, c’est le collège."},{"speaker":"Maître Chen","zh":"小学生？","fr":"Des écoliers ?"},{"speaker":"Le gardien","zh":"小学生，中学生。","fr":"Des écoliers, des collégiens."}],[{"speaker":"Le gardien","zh":"他在这儿学习。","fr":"Il étudiait ici."},{"speaker":"Mei","zh":"同学？","fr":"Des camarades ?"},{"speaker":"Maître Chen","zh":"大学生？","fr":"Un étudiant ?"},{"speaker":"Le gardien","zh":"是，大学生。","fr":"Oui, un étudiant."}],[{"speaker":"Le gardien","zh":"八点上课，十二点下课。","fr":"On commence à huit heures, on finit à midi."},{"speaker":"Lóng","zh":"上学？","fr":"À l’école ?"},{"speaker":"Le gardien","zh":"下午没有课。","fr":"L’après-midi, il n’y a pas de cours."}],[{"speaker":"Maître Chen","zh":"这是汉字。","fr":"Ce sont des caractères chinois."},{"speaker":"Mei","zh":"这是中文。","fr":"C’est du chinois."},{"speaker":"Lóng","zh":"字！","fr":"Un caractère !"}],[{"speaker":"Maître Chen","zh":"她在哪儿？","fr":"Où est-elle ?"},{"speaker":"Lóng","zh":"写，写，写！","fr":"Écrit, écrit, écrit !"},{"speaker":"Mei","zh":"这是问题。","fr":"Voilà la question."}]];
const EPISODE8_THEMES={"大学":"École","大学生":"École","学校":"École","小学":"École","小学生":"École","中学":"École","中学生":"École","学生":"École","同学":"École","老师":"École","课":"École","上课":"École","下课":"École","上学":"École","学":"École","学习":"École","汉语":"Langue","汉字":"Langue","中文":"Langue","字":"Langue","读":"Langue","读书":"Langue","书":"Langue","写":"Langue","问题":"Langue"};
