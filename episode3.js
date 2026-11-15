/* Épisode 3 du Livre I : scènes, vocabulaire, tours de dialogue et thèmes. */
const EPISODE3_SCENES=[
  {
    "title": "Les trois traits",
    "speaker": "Lóng",
    "text": "La nuit est tombée sur le hutong. Dans l’arrière-boutique, Chen éclaire la fiche à l’âge gratté avec une lampe à huile. Lóng pose sa petite patte sur les trois traits horizontaux et les compte à voix haute : « 一，二，三. » Chen se redresse, la loupe à la main : « 她三岁. » Trois traits, trois ans ? L’enfant oubliée n’était donc qu’une toute petite fille.",
    "zh": "一，二，三。她三岁。",
    "py": "Yī, èr, sān. Tā sān suì.",
    "fr": "Un, deux, trois. Elle a trois ans.",
    "question": "Comment dit-on « trois » ?",
    "options": [
      [
        "三",
        true
      ],
      [
        "二",
        false
      ],
      [
        "一",
        false
      ]
    ],
    "words": [
      "一",
      "二",
      "三"
    ],
    "reward": 15,
    "info": "Les chiffres 一, 二 et 三 s’écrivent avec un, deux puis trois traits horizontaux : ce sont les plus faciles à reconnaître. À partir de quatre, les caractères deviennent plus complexes.",
    "grammar": "一 (yī) = 1, 二 (èr) = 2, 三 (sān) = 3. Le nombre se place avant 岁 : 三岁 = « trois ans ». Les trois traits de la fiche peuvent donc se lire 三."
  },
  {
    "title": "Le tiroir sept",
    "speaker": "Maître Chen",
    "text": "Chen entraîne le groupe vers une armoire de bois noir percée de tiroirs numérotés : « 四，五，六，七. » Lóng grimpe de l’un à l’autre en comptant. Au septième, la poignée est brillante et la poussière a été essuyée tout autour. « Personne n’ouvre ce tiroir depuis des années », murmure Chen, très pâle. Quelqu’un est venu fouiller les archives avant vous.",
    "zh": "四，五，六，七。",
    "py": "Sì, wǔ, liù, qī.",
    "fr": "Quatre, cinq, six, sept.",
    "question": "Quel chiffre signifie « six » ?",
    "options": [
      [
        "六",
        true
      ],
      [
        "四",
        false
      ],
      [
        "七",
        false
      ]
    ],
    "words": [
      "四",
      "五",
      "六",
      "七"
    ],
    "reward": 15,
    "info": "Le chiffre 四 (sì) ressemble au mot 死 (sǐ, « mourir ») : dans certains bâtiments chinois, on saute volontairement le numéro 4 pour les étages ou les chambres.",
    "grammar": "四 (sì) = 4 ; 五 (wǔ) = 5 ; 六 (liù) = 6 ; 七 (qī) = 7. Pour désigner un objet par son numéro, on dit simplement 这是七 : « C’est le sept ». Entraîne-toi aux tons : sì (4e ton), wǔ (3e), liù (4e), qī (1er)."
  },
  {
    "title": "Le numéro effacé",
    "speaker": "Mei",
    "text": "Au verso de la liste de départs, Mei déchiffre l’adresse presque effacée. Le nom de la rue a disparu, mais un numéro de maison résiste, noté à côté d’un minuscule dessin de théière : « 三十八 ? » lit-elle. Lóng propose « 九 ? ». Chen approche sa loupe et montre un petit trait au-dessus du dernier signe : ce n’est pas 八 mais 六. « 是三十六. » Le dessin de théière te trotte dans la tête.",
    "zh": "三十八？是三十六。",
    "py": "Sānshíbā? Shì sānshíliù.",
    "fr": "Trente-huit ? C’est trente-six.",
    "question": "Comment dit-on « trente-six » ?",
    "options": [
      [
        "三十六",
        true
      ],
      [
        "三十八",
        false
      ],
      [
        "九十六",
        false
      ]
    ],
    "words": [
      "八",
      "九",
      "十"
    ],
    "reward": 15,
    "info": "Le chiffre 八 (bā) est considéré comme porte-bonheur : sa prononciation ressemble à celle de 发 (fā, « prospérer »). Les numéros contenant des 8 sont très recherchés pour les plaques, les adresses ou les téléphones.",
    "grammar": "Les nombres se construisent comme en mathématiques : 三十 = 3 × 10 = trente ; 三十六 = trente-six. Pour 11 à 19, on dit simplement 十一, 十二… sans 一 devant 十."
  },
  {
    "title": "Cinq sur la photo",
    "speaker": "Lóng",
    "text": "Chen retrouve le cliché ancien dans l’archive numéro « 一百零三 ». Lóng, perché sur l’étagère, demande combien de personnes y posent : « 几个人 ? » Mei les compte du doigt : « 五个人. » Pourtant le registre, lui, nomme six personnes. « 一千 ? » souffle Lóng, qui imagine déjà un millier de photographies à vérifier. Chen hoche la tête : l’armoire en contient à peu près autant. Mais ce cliché-ci porte un compte qui ne tombe pas juste.",
    "zh": "几个人？五个人。",
    "py": "Jǐ gè rén? Wǔ gè rén.",
    "fr": "Combien de personnes ? Cinq personnes.",
    "question": "Que signifie 几个人 ?",
    "options": [
      [
        "Combien de personnes ?",
        true
      ],
      [
        "Qui est cette personne ?",
        false
      ],
      [
        "Quel âge a-t-elle ?",
        false
      ]
    ],
    "words": [
      "零",
      "百",
      "千",
      "个",
      "几"
    ],
    "reward": 15,
    "info": "Pour demander « combien ? » avec une petite quantité (moins de dix environ), on emploie 几 (jǐ). Pour une quantité plus grande ou impossible à estimer, on emploie 多少 (duōshao).",
    "grammar": "Entre un nombre et un nom, on place un mot de comptage : 五个人 = « cinq personnes » (个 est le plus courant). 几个人 ? = « Combien de personnes ? ». 一百零三 = 103 : 零 marque le « trou » des dizaines."
  },
  {
    "title": "Deux moitiés",
    "speaker": "Maître Chen",
    "text": "Dans ton sac, tu sors le papier qui enveloppait ton jade, celui couvert de caractères que tu n’as jamais pu lire. Chen le pose contre la page déchirée du registre : les deux bords s’emboîtent. « 两半 ! » s’écrie Mei. Sur la page reconstituée apparaît le portrait d’une fillette. « 你认识她吗 ? » demande Chen à Lóng. Le dragon hésite, la patte sur le front : « 一点儿. » Il reste encore 一些 lignes à déchiffrer, mais l’encre est trop pâle pour être lue ce soir.",
    "zh": "两半！你认识她吗？一点儿。",
    "py": "Liǎng bàn! Nǐ rènshi tā ma? Yìdiǎnr.",
    "fr": "Deux moitiés ! La connais-tu ? Un peu.",
    "question": "Que signifie 一点儿 ?",
    "options": [
      [
        "un peu",
        true
      ],
      [
        "beaucoup",
        false
      ],
      [
        "une moitié",
        false
      ]
    ],
    "words": [
      "两",
      "半",
      "一半",
      "一点儿",
      "一些"
    ],
    "reward": 15,
    "info": "Recoller deux moitiés d’une même page est un geste classique des restaurateurs de documents : on aligne les fibres du papier et les bords déchirés, qui ne s’emboîtent qu’avec leur vraie moitié.",
    "grammar": "两 (liǎng) remplace 二 devant un mot de comptage : 两个人 = deux personnes. 半 (bàn) = moitié ; 一半 = la moitié. 一点儿 et 一些 se traduisent par « un peu » et « quelques » : 一点儿 pour une petite quantité, 一些 pour un petit nombre."
  },
  {
    "title": "Le plan du quartier",
    "speaker": "Lóng",
    "text": "Pour situer le numéro 三十六, Chen vous mène à l’étal d’un vieux libraire qui vend des plans du quartier. Lóng, qui ne quitte pas le plan des yeux, demande : « 多少钱 ? » Mei lit l’étiquette : « 十块. » Chen précise que le prix est écrit 十元 sur le papier, mais qu’on dit 十块 à l’oral. Sur le plan, le numéro 三十六 est entouré d’un petit symbole de théière, à deux pas de la tour du Tambour. Le soir même, quelque chose glisse sous le rideau de la boutique.",
    "zh": "多少钱？这是十块。",
    "py": "Duōshao qián? Zhè shì shí kuài.",
    "fr": "Combien ça coûte ? Ça coûte dix kuai.",
    "question": "Comment demande-t-on le prix ?",
    "options": [
      [
        "多少钱？",
        true
      ],
      [
        "几个人？",
        false
      ],
      [
        "你叫什么名字？",
        false
      ]
    ],
    "words": [
      "多少",
      "多",
      "少",
      "块",
      "元",
      "钱"
    ],
    "reward": 25,
    "info": "La monnaie chinoise s’appelle le renminbi (RMB) ; son unité de base est le yuan. À l’oral, on dit presque toujours 块 (kuài) pour « yuan » ; à l’écrit, on trouve 元 (yuán).",
    "grammar": "多少 = « combien » (多 = beaucoup + 少 = peu). 多少钱 ? = « Combien ça coûte ? ». À l’oral on dit 十块, à l’écrit 十元."
  }
];
const EPISODE3_VOCAB=[["一","yī","un, 1"],["二","èr","deux, 2"],["三","sān","trois, 3"],["四","sì","quatre, 4"],["五","wǔ","cinq, 5"],["六","liù","six, 6"],["七","qī","sept, 7"],["八","bā","huit, 8"],["九","jiǔ","neuf, 9"],["十","shí","dix, 10"],["零","líng","zéro"],["百","bǎi","cent"],["千","qiān","mille"],["个","gè","mot de comptage (général)"],["几","jǐ","combien (petite quantité)"],["多少","duōshao","combien"],["多","duō","beaucoup"],["少","shǎo","peu"],["两","liǎng","deux (devant un mot de comptage)"],["半","bàn","moitié, demi"],["一半","yíbàn","la moitié"],["一点儿","yìdiǎnr","un peu"],["一些","yìxiē","quelques, un peu de"],["块","kuài","yuan (à l’oral)"],["元","yuán","yuan (à l’écrit)"],["钱","qián","argent"]];
const EPISODE3_TURNS=[[{"speaker":"Lóng","zh":"一，二，三。","fr":"Un, deux, trois."},{"speaker":"Maître Chen","zh":"她三岁。","fr":"Elle a trois ans."}],[{"speaker":"Maître Chen","zh":"四，五，六，七。","fr":"Quatre, cinq, six, sept."},{"speaker":"Lóng","zh":"七！","fr":"Sept !"},{"speaker":"Mei","zh":"这是七。","fr":"C’est le sept."}],[{"speaker":"Mei","zh":"三十八？","fr":"Trente-huit ?"},{"speaker":"Lóng","zh":"九？","fr":"Neuf ?"},{"speaker":"Maître Chen","zh":"是三十六。","fr":"C’est trente-six."}],[{"speaker":"Lóng","zh":"几个人？","fr":"Combien de personnes ?"},{"speaker":"Mei","zh":"五个人。","fr":"Cinq personnes."},{"speaker":"Maître Chen","zh":"这是一百零三。","fr":"C’est le numéro cent trois."},{"speaker":"Lóng","zh":"一千？","fr":"Mille ?"},{"speaker":"Maître Chen","zh":"是。","fr":"Oui."}],[{"speaker":"Mei","zh":"两半！","fr":"Deux moitiés !"},{"speaker":"Maître Chen","zh":"你认识她吗？","fr":"La connais-tu ?"},{"speaker":"Lóng","zh":"一点儿。","fr":"Un peu."}],[{"speaker":"Lóng","zh":"多少钱？","fr":"Combien ça coûte ?"},{"speaker":"Mei","zh":"这是十块。","fr":"Ça coûte dix kuai."},{"speaker":"Maître Chen","zh":"十块，十元。","fr":"Dix kuai, dix yuan."}]];
const EPISODE3_THEMES={"一":"Nombres","二":"Nombres","三":"Nombres","四":"Nombres","五":"Nombres","六":"Nombres","七":"Nombres","八":"Nombres","九":"Nombres","十":"Nombres","零":"Nombres","百":"Nombres","千":"Nombres","个":"Quantités","几":"Quantités","多少":"Quantités","多":"Quantités","少":"Quantités","两":"Quantités","半":"Quantités","一半":"Quantités","一点儿":"Quantités","一些":"Quantités","块":"Argent","元":"Argent","钱":"Argent"};
