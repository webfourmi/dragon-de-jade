/* Épisode 5 du Livre I : scènes, vocabulaire, tours de dialogue et thèmes. */
const EPISODE5_SCENES=[
  {
    "title": "Le rideau de bambou",
    "speaker": "Maître Chen",
    "text": "Le lendemain, la porte du 三十六 est grande ouverte : un rideau de bambou, une odeur de feuilles chaudes, et la lanterne verte a disparu. Une vieille femme vous attend sur le seuil, quatre tasses déjà alignées sur le plateau. Elle regarde ton jade, puis ton visage, et sourit sans surprise : « 请喝茶. » Mei répond « 谢谢 », Lóng renifle la vapeur : « 茶 ? 水 ? » Elle vous attendait, visiblement.",
    "zh": "请喝茶。谢谢。",
    "py": "Qǐng hē chá. Xièxie.",
    "fr": "Buvez du thé, je vous en prie. Merci.",
    "question": "Que signifie 喝 ?",
    "options": [
      [
        "boire",
        true
      ],
      [
        "manger",
        false
      ],
      [
        "acheter",
        false
      ]
    ],
    "words": [
      "茶",
      "水",
      "喝"
    ],
    "reward": 15,
    "info": "En Chine, servir le thé aux invités dès qu’ils s’asseyent est un geste d’accueil. On reçoit souvent la tasse à deux mains pour remercier.",
    "grammar": "喝 = boire ; 茶 = thé ; 水 = eau. 请 + verbe = invitation polie : 请喝茶 = « Prenez du thé, je vous en prie »."
  },
  {
    "title": "La tasse réservée",
    "speaker": "Mei",
    "text": "La patronne sort de sous le comptoir une petite tasse de jade pâle, tenue à part des autres. Elle te la tend : « 喝一口. » Mei te demande : « 你喜欢茶吗 ? » et tu réponds : « 我喜欢. » Lóng veut déjà s’emparer de la tasse : « 我要杯子 ! » Sous le pied, un minuscule sceau est gravé : un dragon enroulé autour d’une écaille. « Elle est gardée pour celui qui reviendra », dit la patronne.",
    "zh": "喝一口。你喜欢茶吗？我喜欢。",
    "py": "Hē yì kǒu. Nǐ xǐhuan chá ma? Wǒ xǐhuan.",
    "fr": "Prends une gorgée. Aimes-tu le thé ? J’aime ça.",
    "question": "Comment dit-on « j’aime » ?",
    "options": [
      [
        "我喜欢",
        true
      ],
      [
        "我要",
        false
      ],
      [
        "我叫",
        false
      ]
    ],
    "words": [
      "杯子",
      "口",
      "要",
      "喜欢"
    ],
    "reward": 15,
    "info": "Dans le sud de la Chine, on remercie parfois celui qui verse le thé en tapotant la table de deux doigts, sans interrompre la conversation.",
    "grammar": "要 = vouloir : 我要杯子 = « Je veux la tasse ». 喜欢 = aimer : 我喜欢茶 = « J’aime le thé ». 杯子 = tasse, verre. 口 compte les gorgées : 喝一口 = « boire une gorgée »."
  },
  {
    "title": "La table près de la fenêtre",
    "speaker": "Maître Chen",
    "text": "La patronne dresse la table : un bol de 米饭, des 菜 fumants. « 吃饭 ! » Lóng plonge le nez dans l’assiette et s’écrie : « 好吃 ! » Pendant le repas, la patronne raconte que l’ami de la famille s’asseyait chaque après-midi à la même table, près de la fenêtre, vers trois heures, et qu’il regardait la rue sans presque rien manger.",
    "zh": "吃饭！好吃！",
    "py": "Chī fàn! Hǎochī!",
    "fr": "À table ! C’est délicieux !",
    "question": "Que signifie 好吃 ?",
    "options": [
      [
        "délicieux",
        true
      ],
      [
        "cher",
        false
      ],
      [
        "neuf",
        false
      ]
    ],
    "words": [
      "吃",
      "饭",
      "米饭",
      "菜",
      "好吃"
    ],
    "reward": 15,
    "info": "Pour se saluer, beaucoup de Chinois demandaient autrefois « 你吃饭了吗 ? » (« as-tu mangé ? »), une manière de prendre des nouvelles. La formule est devenue plus rare aujourd’hui.",
    "grammar": "吃 = manger ; 饭 = repas ou riz cuit ; 米饭 = riz cuit ; 菜 = plat, légume. 吃饭 = « manger, prendre un repas ». 好吃 = « bon à manger, délicieux » (好 + 吃)."
  },
  {
    "title": "La commande de l’ami",
    "speaker": "Lóng",
    "text": "La patronne s’assoit avec vous et se souvient de la commande de l’ami : « 两个包子，一个鸡蛋. » Toujours la même, pour deux personnes, alors qu’il venait seul et qu’il posait la seconde part devant la chaise vide. Mei suggère des 饺子 ou des 面条儿, mais la patronne secoue la tête. Lóng demande « 面包 ? » ; elle hoche la tête : « 是，面包. » Un morceau de pain, parfois, pour la route.",
    "zh": "两个包子，一个鸡蛋。",
    "py": "Liǎng ge bāozi, yí ge jīdàn.",
    "fr": "Deux petits pains vapeur, un œuf.",
    "question": "Que signifie 鸡蛋 ?",
    "options": [
      [
        "œuf",
        true
      ],
      [
        "lait",
        false
      ],
      [
        "pomme",
        false
      ]
    ],
    "words": [
      "包子",
      "饺子",
      "面条儿",
      "面包",
      "鸡蛋"
    ],
    "reward": 15,
    "info": "Les 包子 (bāozi) sont des petits pains fourrés cuits à la vapeur, les 饺子 (jiǎozi) des raviolis. Dans le nord de la Chine, on mange traditionnellement des 饺子 au Nouvel An.",
    "grammar": "两个包子 = deux baozi (两 + mot de comptage 个 + nom). 饺子 = raviolis, 面条儿 = nouilles, 面包 = pain, 鸡蛋 = œuf."
  },
  {
    "title": "Des pommes et du lait",
    "speaker": "Mei",
    "text": "En épluchant des fruits, la patronne ajoute que l’ami achetait aussi des pommes et du lait : « 他要苹果，要牛奶. » Mei demande : « 水果 ? » Lóng reste figé, la patte levée : un souvenir remonte, net comme une image. « 她喜欢苹果 ! » La petite fille du portrait aimait les pommes. « 是 », dit la patronne, très simplement. « 我做饭 » : elle cuisinait pour eux deux, quand ils venaient.",
    "zh": "她喜欢苹果。我做饭。",
    "py": "Tā xǐhuan píngguǒ. Wǒ zuò fàn.",
    "fr": "Elle aime les pommes. Je cuisine.",
    "question": "Que signifie 苹果 ?",
    "options": [
      [
        "pomme",
        true
      ],
      [
        "lait",
        false
      ],
      [
        "fruit",
        false
      ]
    ],
    "words": [
      "牛奶",
      "水果",
      "苹果",
      "做饭"
    ],
    "reward": 15,
    "info": "Le soir de Noël, 平安夜 (« nuit paisible »), beaucoup de Chinois s’offrent une pomme 苹果, car píngguǒ rappelle píng’ān, la paix.",
    "grammar": "水果 = fruit(s) ; 苹果 = pomme ; 牛奶 = lait. 做饭 = faire la cuisine (littéralement « faire le repas »). 她喜欢苹果 = « Elle aime les pommes »."
  },
  {
    "title": "Un homme tout de noir",
    "speaker": "Maître Chen",
    "text": "En fin de repas, la patronne égrène les moments où l’ami venait : « 早饭，午饭，晚饭. » Jamais le matin, rarement le soir : toujours l’après-midi. Puis son visage se ferme. La veille de votre venue, un homme tout de noir est entré, a posé des questions sur la tasse réservée et a payé son thé trois fois le prix. Il loge au 饭店 d’en face. Il voulait savoir quand vous viendriez, et il a parlé d’une écaille qu’il comptait trouver au marché.",
    "zh": "早饭，午饭，晚饭。",
    "py": "Zǎofàn, wǔfàn, wǎnfàn.",
    "fr": "Petit-déjeuner, déjeuner, dîner.",
    "question": "Que signifie 午饭 ?",
    "options": [
      [
        "déjeuner",
        true
      ],
      [
        "petit-déjeuner",
        false
      ],
      [
        "dîner",
        false
      ]
    ],
    "words": [
      "早饭",
      "午饭",
      "晚饭",
      "饭店"
    ],
    "reward": 25,
    "info": "Le mot 饭店 (fàndiàn) désigne un restaurant, mais aussi un hôtel : le même mot sert pour les deux dans beaucoup de villes chinoises.",
    "grammar": "饭 se combine avec le moment de la journée : 早饭 (petit-déjeuner), 午饭 (déjeuner), 晚饭 (dîner). 饭店 = restaurant, hôtel."
  }
];
const EPISODE5_VOCAB=[["茶","chá","thé"],["水","shuǐ","eau"],["喝","hē","boire"],["吃","chī","manger"],["饭","fàn","repas, riz cuit"],["米饭","mǐfàn","riz cuit"],["面包","miànbāo","pain"],["包子","bāozi","petit pain farci à la vapeur"],["饺子","jiǎozi","raviolis"],["面条儿","miàntiáor","nouilles"],["鸡蛋","jīdàn","œuf"],["牛奶","niúnǎi","lait"],["水果","shuǐguǒ","fruit, fruits"],["苹果","píngguǒ","pomme"],["菜","cài","plat, légume"],["好吃","hǎochī","délicieux"],["早饭","zǎofàn","petit-déjeuner"],["午饭","wǔfàn","déjeuner"],["晚饭","wǎnfàn","dîner"],["饭店","fàndiàn","restaurant, hôtel"],["杯子","bēizi","tasse, verre"],["做饭","zuò fàn","cuisiner"],["要","yào","vouloir"],["喜欢","xǐhuan","aimer"],["口","kǒu","gorgée, bouchée"]];
const EPISODE5_TURNS=[[{"speaker":"La patronne","zh":"请喝茶。","fr":"Buvez du thé, je vous en prie."},{"speaker":"Mei","zh":"谢谢！","fr":"Merci !"},{"speaker":"Lóng","zh":"茶？水？","fr":"Du thé ? De l’eau ?"},{"speaker":"La patronne","zh":"茶。","fr":"Du thé."}],[{"speaker":"La patronne","zh":"喝一口。","fr":"Prends une gorgée."},{"speaker":"Mei","zh":"你喜欢茶吗？","fr":"Aimes-tu le thé ?"},{"speaker":"Vous","zh":"我喜欢。","fr":"J’aime ça."},{"speaker":"Lóng","zh":"我要杯子！","fr":"Je veux la tasse !"}],[{"speaker":"La patronne","zh":"吃饭！","fr":"À table !"},{"speaker":"Lóng","zh":"米饭，菜！","fr":"Du riz, des plats !"},{"speaker":"Maître Chen","zh":"好吃！","fr":"C’est délicieux !"}],[{"speaker":"La patronne","zh":"两个包子，一个鸡蛋。","fr":"Deux petits pains vapeur, un œuf."},{"speaker":"Mei","zh":"饺子？面条儿？","fr":"Des raviolis ? Des nouilles ?"},{"speaker":"Lóng","zh":"面包？","fr":"Du pain ?"},{"speaker":"La patronne","zh":"是，面包。","fr":"Oui, du pain."}],[{"speaker":"La patronne","zh":"他要苹果，要牛奶。","fr":"Il voulait des pommes, du lait."},{"speaker":"Mei","zh":"水果？","fr":"Des fruits ?"},{"speaker":"Lóng","zh":"她喜欢苹果！","fr":"Elle aime les pommes !"},{"speaker":"La patronne","zh":"是。我做饭。","fr":"Oui. Je cuisinais."}],[{"speaker":"La patronne","zh":"早饭，午饭，晚饭。","fr":"Petit-déjeuner, déjeuner, dîner."},{"speaker":"Mei","zh":"饭店？","fr":"Un hôtel ?"},{"speaker":"La patronne","zh":"是，饭店。","fr":"Oui, l’hôtel d’en face."},{"speaker":"Maître Chen","zh":"谢谢。","fr":"Merci."}]];
const EPISODE5_THEMES={"茶":"Boissons","水":"Boissons","牛奶":"Boissons","杯子":"Boissons","喝":"Boissons","口":"Boissons","吃":"Nourriture","饭":"Nourriture","米饭":"Nourriture","面包":"Nourriture","包子":"Nourriture","饺子":"Nourriture","面条儿":"Nourriture","鸡蛋":"Nourriture","水果":"Nourriture","苹果":"Nourriture","菜":"Nourriture","好吃":"Nourriture","做饭":"Nourriture","早饭":"Repas","午饭":"Repas","晚饭":"Repas","饭店":"Repas","要":"Verbes","喜欢":"Verbes"};
