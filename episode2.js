/* Livre I, épisode 2 : Les noms derrière le jade. */
const EPISODE2_SCENES=[
  {
    "title": "Le registre des familles",
    "speaker": "Maître Chen",
    "text": "Dans l'arrière-boutique, Chen ouvre le registre indiqué par la carte de Lóng. Une photographie montre un père et une mère devant une maison. Mei reconnaît sa mère, mais le nom de son père a été effacé. « 爸爸，妈妈 », dit-elle en touchant les deux visages. Chen remarque une marque verte à l'endroit de la signature.",
    "zh": "这是爸爸和妈妈。",
    "py": "Zhè shì bàba hé māma.",
    "fr": "Voici le papa et la maman.",
    "question": "Comment dit-on « maman » ?",
    "options": [
      [
        "妈妈",
        true
      ],
      [
        "姐姐",
        false
      ],
      [
        "妹妹",
        false
      ]
    ],
    "words": [
      "爸爸",
      "妈妈",
      "家",
      "家人"
    ],
    "reward": 15,
    "info": "À Hong Kong, les noms chinois peuvent apparaître dans des ordres et des transcriptions différents selon les langues et les documents.",
    "grammar": "爸爸 (bàba) = papa ; 妈妈 (māma) = maman. 家 = maison ou famille, selon le contexte."
  },
  {
    "title": "La photographie déchirée",
    "speaker": "Mei",
    "text": "Mei retourne la photographie : quatre enfants y sont nommés selon leur place dans la famille. « 哥哥，姐姐，弟弟，妹妹 », lit-elle. Pourtant, elle affirme n'avoir jamais connu de petite sœur. Quelqu'un a-t-il ajouté un enfant aux archives ? Lóng remarque que l'encre du dernier nom est plus récente.",
    "zh": "这是我的哥哥和姐姐。",
    "py": "Zhè shì wǒ de gēge hé jiějie.",
    "fr": "Voici mon grand frère et ma grande sœur.",
    "question": "Quel mot signifie « petite sœur » ?",
    "options": [
      [
        "妹妹",
        true
      ],
      [
        "哥哥",
        false
      ],
      [
        "姐姐",
        false
      ]
    ],
    "words": [
      "哥哥",
      "姐姐",
      "弟弟",
      "妹妹"
    ],
    "reward": 15,
    "info": "En mandarin, les mots pour frères et sœurs indiquent souvent si la personne est plus âgée ou plus jeune.",
    "grammar": "哥哥 = grand frère ; 弟弟 = petit frère ; 姐姐 = grande sœur ; 妹妹 = petite sœur."
  },
  {
    "title": "Le portrait sans visage",
    "speaker": "Lóng",
    "text": "Une deuxième page révèle deux portraits, un homme et une femme. Lóng demande : « 他是谁？她是谁？ » Mei reconnaît la femme, mais pas l'homme. Chen constate que les deux noms ont été recopiés d'une autre main. La piste mène à une personne qui a modifié le registre après la disparition.",
    "zh": "他是谁？她是谁？",
    "py": "Tā shì shéi? Tā shì shéi?",
    "fr": "Qui est-il ? Qui est-elle ?",
    "question": "Quel caractère désigne « elle » ?",
    "options": [
      [
        "她",
        true
      ],
      [
        "他",
        false
      ],
      [
        "男",
        false
      ]
    ],
    "words": [
      "他",
      "她",
      "男",
      "女"
    ],
    "reward": 15,
    "info": "他 et 她 se prononcent tous deux tā. La distinction est visible à l’écrit, mais pas à l’oral.",
    "grammar": "男 = homme / masculin ; 女 = femme / féminin. 他 = il ; 她 = elle."
  },
  {
    "title": "Les enfants de la maison",
    "speaker": "Maître Chen",
    "text": "Sur une liste de départs, Chen découvre la mention d'un fils et d'une fille accompagnés d'un ami de la famille. « 他们是孩子 », lit-il. Mei pense que le mystérieux ami a peut-être protégé les enfants. Une adresse est inscrite au verso, mais les chiffres sont presque illisibles.",
    "zh": "他们是孩子。",
    "py": "Tāmen shì háizi.",
    "fr": "Ce sont des enfants.",
    "question": "Quel mot signifie « fille » (d’une famille) ?",
    "options": [
      [
        "女儿",
        true
      ],
      [
        "儿子",
        false
      ],
      [
        "朋友",
        false
      ]
    ],
    "words": [
      "儿子",
      "女儿",
      "孩子",
      "朋友"
    ],
    "reward": 15,
    "info": "孩子 signifie enfant. 儿子 désigne un fils, 女儿 une fille. 朋友 signifie ami ou amie.",
    "grammar": "Le contexte précise les liens familiaux. Les pronoms au pluriel utilisent souvent 们."
  },
  {
    "title": "Les alliés du Dragon",
    "speaker": "Mei",
    "text": "Mei montre une lettre plus récente. Un homme y parle de son petit ami et d'une jeune femme qu'il appelle sa compagne. Elle explique que les mots 男朋友 et 女朋友 indiquent une relation amoureuse, et non simplement une amitié. Lóng reconnaît le sceau au bas de la lettre : c'est celui qui figurait sur ton courrier reçu en France.",
    "zh": "他是男朋友。她是女朋友。",
    "py": "Tā shì nánpéngyou. Tā shì nǚpéngyou.",
    "fr": "Il est le petit ami. Elle est la petite amie.",
    "question": "Quel mot signifie « petite amie » ?",
    "options": [
      [
        "女朋友",
        true
      ],
      [
        "男朋友",
        false
      ],
      [
        "妈妈",
        false
      ]
    ],
    "words": [
      "男朋友",
      "女朋友",
      "我们",
      "你们"
    ],
    "reward": 15,
    "info": "男朋友 et 女朋友 désignent généralement un petit ami et une petite amie dans un contexte amoureux.",
    "grammar": "我们 = nous ; 你们 = vous (pluriel). 男朋友 et 女朋友 sont des mots composés de 朋友."
  },
  {
    "title": "La date sur le registre",
    "speaker": "Lóng",
    "text": "Une dernière fiche contient la question « 她几岁？ » : quel âge avait-elle ? Le nombre a été gratté, mais Lóng distingue trois traces. Chen propose de revenir aux nombres pour retrouver l'âge et identifier l'enfant oublié. Une nouvelle piste s'ouvre pour l'épisode suivant.",
    "zh": "她几岁？",
    "py": "Tā jǐ suì?",
    "fr": "Quel âge a-t-elle ?",
    "question": "Quel mot sert à parler de l’âge ?",
    "options": [
      [
        "岁",
        true
      ],
      [
        "家",
        false
      ],
      [
        "们",
        false
      ]
    ],
    "words": [
      "他们",
      "她们",
      "们",
      "岁"
    ],
    "reward": 15,
    "info": "岁 (suì) s’emploie pour l’âge. Les nombres seront étudiés dans l’épisode 3, qui permettra de résoudre l’énigme.",
    "grammar": "他们 = ils / groupe mixte ; 她们 = elles ; 们 marque le pluriel de certains pronoms ; 几岁 ? demande l’âge."
  }
];
const EPISODE2_VOCAB=[["爸爸","bàba","papa"],["妈妈","māma","maman"],["哥哥","gēge","grand frère"],["弟弟","dìdi","petit frère"],["姐姐","jiějie","grande sœur"],["妹妹","mèimei","petite sœur"],["儿子","érzi","fils"],["女儿","nǚ’ér","fille"],["家","jiā","maison, famille"],["家人","jiārén","membres de la famille"],["孩子","háizi","enfant"],["朋友","péngyou","ami(e)"],["男","nán","homme, masculin"],["女","nǚ","femme, féminin"],["男朋友","nánpéngyou","petit ami"],["女朋友","nǚpéngyou","petite amie"],["他","tā","il, lui"],["她","tā","elle"],["他们","tāmen","ils, eux"],["她们","tāmen","elles"],["我们","wǒmen","nous"],["你们","nǐmen","vous (pluriel)"],["们","men","suffixe du pluriel"],["岁","suì","ans (âge)"]];
