/* Épisode 6 du Livre I : scènes, vocabulaire, tours de dialogue et thèmes. */
const EPISODE6_SCENES=[
  {
    "title": "Le marché aux antiquités",
    "speaker": "Lóng",
    "text": "Le lendemain, vous traversez un marché aux antiquités qui s’étire sur des centaines de mètres : porcelaines, sceaux, vieux livres, boutons de jade. On y 买 et on y 卖 toutes sortes de 东西. Chen marche vite, le menton dans le col. Soudain, Lóng s’arrête, le nez en l’air : une lueur verte, tout au fond, entre deux étals. « 那 ! 那 ! » Mei plisse les yeux : « 那是什么 ? »",
    "zh": "买东西。那是什么？",
    "py": "Mǎi dōngxi. Nà shì shénme?",
    "fr": "Faire des achats. Qu’est-ce que c’est, là-bas ?",
    "question": "Que signifie 买 ?",
    "options": [
      [
        "acheter",
        true
      ],
      [
        "vendre",
        false
      ],
      [
        "chercher",
        false
      ]
    ],
    "words": [
      "买",
      "卖",
      "东西",
      "那"
    ],
    "reward": 15,
    "info": "Les marchés aux antiquités chinois, comme celui de Panjiayuan à Pékin, attirent à la fois touristes et collectionneurs : on y vend autant d’objets anciens que de copies.",
    "grammar": "买 (mǎi) = acheter, 卖 (mài) = vendre : ils ne diffèrent que par le ton (3e et 4e). 东西 = chose(s), objet(s). 那 (nà) = cela, là-bas ; 这 = ceci."
  },
  {
    "title": "Les boutiques du quartier",
    "speaker": "Maître Chen",
    "text": "Pour ne pas attirer l’attention, Chen vous fait contourner le marché par les boutiques voisines. « 这是商店. » Un peu plus loin, Mei lit l’enseigne d’une librairie : « 这是书店. » Lóng, lui, a repéré les néons d’un supermarché : « 那是超市. » Dans la librairie, un vieil ami de Chen murmure qu’un panier de vieilles affaires de famille a été vendu la semaine dernière à un étal du marché : des carnets, une petite veste d’enfant.",
    "zh": "这是书店。那是超市。",
    "py": "Zhè shì shūdiàn. Nà shì chāoshì.",
    "fr": "Ça, c’est une librairie. Là-bas, c’est un supermarché.",
    "question": "Quel mot désigne une librairie ?",
    "options": [
      [
        "书店",
        true
      ],
      [
        "超市",
        false
      ],
      [
        "商店",
        false
      ]
    ],
    "words": [
      "店",
      "商店",
      "超市",
      "书店"
    ],
    "reward": 15,
    "info": "Le caractère 店 (diàn) revient dans de nombreux noms de commerces : 书店 (librairie), 商店 (magasin), 饭店 (restaurant ou hôtel), 花店 (fleuriste)…",
    "grammar": "店 = boutique ; 商店 = magasin ; 超市 = supermarché ; 书店 = librairie. 这是 / 那是 + nom : « Ceci / cela est… »."
  },
  {
    "title": "Lequel ?",
    "speaker": "Lóng",
    "text": "L’étal du fond croule sous les objets : bols fêlés, sceaux, bracelets, un tas de cailloux verts. Lóng saute de l’un à l’autre : « 哪个 ? » Mei en montre un, la main ouverte, comme on le fait par politesse : « 这个 ? » Lóng s’illumine devant un galet de jade très poli, qui brille plus que tout le reste : « 那个 ! » Il est presque trop beau pour être vrai.",
    "zh": "这个？那个！",
    "py": "Zhège? Nàge!",
    "fr": "Celui-ci ? Celui-là !",
    "question": "Comment dit-on « lequel ? » ?",
    "options": [
      [
        "哪个",
        true
      ],
      [
        "这个",
        false
      ],
      [
        "那个",
        false
      ]
    ],
    "words": [
      "这个",
      "那个",
      "哪个",
      "哪"
    ],
    "reward": 15,
    "info": "En Chine, désigner quelqu’un du doigt est souvent jugé impoli : on montre plutôt les choses et les personnes de la main ouverte.",
    "grammar": "这个 = celui-ci, 那个 = celui-là, 哪个 = lequel ? Le mot de comptage 个 suit 这 / 那 / 哪."
  },
  {
    "title": "Marchander",
    "speaker": "Mei",
    "text": "Le vendeur, un homme replet à la casquette grise, annonce : « 那个三百块. » Mei grimace : « 贵 ! 便宜一点儿 ! » Il hésite et descend : « 两百块. » Chen compte ses billets, trop peu, et propose : « 我给你一百块. » Le vendeur secoue la tête ; Mei sourit : le marchandage ne fait que commencer.",
    "zh": "贵！便宜一点儿！我给你一百块。",
    "py": "Guì! Piányi yìdiǎnr! Wǒ gěi nǐ yì bǎi kuài.",
    "fr": "C’est cher ! Un peu moins cher ! Je te donne cent kuai.",
    "question": "Que dit-on pour demander un prix plus bas ?",
    "options": [
      [
        "便宜一点儿！",
        true
      ],
      [
        "多少钱？",
        false
      ],
      [
        "好吃！",
        false
      ]
    ],
    "words": [
      "贵",
      "便宜",
      "找",
      "给"
    ],
    "reward": 15,
    "info": "En Chine, on marchande presque toujours sur les marchés et dans les petites boutiques, mais pas dans les supermarchés ni les grands magasins, où les prix sont fixes.",
    "grammar": "贵 (guì) = cher ; 便宜 (piányi) = bon marché. 便宜一点儿 = « un peu moins cher ». 给 (gěi) = donner : 我给你一百块 = « Je te donne cent yuans ». 找 (zhǎo) = chercher ; au marché, 找你十块 = « je te rends dix yuans »."
  },
  {
    "title": "Monsieur Wu",
    "speaker": "Maître Chen",
    "text": "Une voix douce s’élève derrière vous : « 有没有那个 ? » Un homme mince, tout de noir, gants de cuir et souliers cirés, désigne le galet vert. « 有 ! » répond le vendeur, ravi. Chen pâlit : l’homme lui adresse un signe de tête, comme à une vieille connaissance. « Monsieur Wu », murmure-t-il. Wu offre 八百块, sans marchander, et fait glisser le galet dans sa poche. Il lance un regard à ton jade, sourit, et s’éloigne.",
    "zh": "有没有那个？有！",
    "py": "Yǒu méiyǒu nàge? Yǒu!",
    "fr": "Avez-vous celui-là ? Oui, j’en ai !",
    "question": "Que signifie 没有 ?",
    "options": [
      [
        "ne pas avoir",
        true
      ],
      [
        "avoir",
        false
      ],
      [
        "donner",
        false
      ]
    ],
    "words": [
      "有",
      "没有",
      "这些",
      "那些",
      "哪些",
      "些"
    ],
    "reward": 15,
    "info": "Beaucoup de collectionneurs cherchent à reconstituer des ensembles d’objets dispersés (services de thé, sceaux, jades) : une pièce isolée vaut parfois moins que la série complète.",
    "grammar": "有 (yǒu) = avoir, il y a ; 没有 (méiyǒu) = ne pas avoir. 有没有…？ = « Avez-vous… ? ». 这些 = ceux-ci, 那些 = ceux-là, 哪些 = lesquels ? ; 些 marque un petit nombre."
  },
  {
    "title": "La veste d’enfant",
    "speaker": "Mei",
    "text": "Wu parti, Lóng ne s’éloigne pas : la lueur verte est toujours là, plus basse, sous la table. Le vendeur sort un panier : deux 本 de carnets reliés et une petite 件 衣服 d’enfant, dont un bouton brille comme une écaille. « 这件衣服，十块. » Mei tend vingt kuai : « 给你二十块. » Le vendeur rend la monnaie : « 找你十块. » Chen, qui a regardé le galet de près avant que Wu ne l’emporte, hoche la tête : « 那个新. » Neuf, poli à la machine : Wu vient de payer cher un leurre. Lóng bondit sur la veste : « 这件 ! » La deuxième écaille est à vous.",
    "zh": "这件衣服，十块。给你二十块。找你十块。",
    "py": "Zhè jiàn yīfu, shí kuài. Gěi nǐ èrshí kuài. Zhǎo nǐ shí kuài.",
    "fr": "Cette veste, dix kuai. Je te donne vingt kuai. Je te rends dix kuai.",
    "question": "Comment compte-t-on les vêtements ?",
    "options": [
      [
        "件",
        true
      ],
      [
        "本",
        false
      ],
      [
        "个",
        false
      ]
    ],
    "words": [
      "本",
      "件",
      "衣服",
      "新"
    ],
    "reward": 30,
    "info": "En chinois, chaque catégorie d’objets a son mot de comptage : 件 (jiàn) pour les vêtements, 本 (běn) pour les livres et carnets, 个 (gè) pour beaucoup d’autres choses.",
    "grammar": "件 compte les vêtements (一件衣服), 本 compte les livres et carnets (两本). 新 (xīn) = neuf, nouveau : 那个新 = « Celui-là est neuf », donc pas ancien."
  }
];
const EPISODE6_VOCAB=[["买","mǎi","acheter"],["卖","mài","vendre"],["店","diàn","boutique"],["商店","shāngdiàn","magasin"],["超市","chāoshì","supermarché"],["书店","shūdiàn","librairie"],["东西","dōngxi","chose, objet"],["贵","guì","cher"],["便宜","piányi","bon marché"],["找","zhǎo","chercher ; rendre la monnaie"],["给","gěi","donner"],["有","yǒu","avoir, il y a"],["没有","méiyǒu","ne pas avoir, il n’y a pas"],["哪","nǎ","quel, lequel"],["哪个","nǎge","lequel"],["那个","nàge","celui-là"],["这个","zhège","celui-ci"],["这些","zhèxiē","ceux-ci"],["那些","nàxiē","ceux-là"],["哪些","nǎxiē","lesquels"],["些","xiē","quelques, pluriel"],["本","běn","mot de comptage (livres, carnets)"],["件","jiàn","mot de comptage (vêtements)"],["衣服","yīfu","vêtement"],["新","xīn","neuf, nouveau"],["那","nà","cela, là-bas"]];
const EPISODE6_TURNS=[[{"speaker":"Maître Chen","zh":"买东西，卖东西。","fr":"Acheter des choses, vendre des choses."},{"speaker":"Lóng","zh":"那！那！","fr":"Là-bas ! Là-bas !"},{"speaker":"Mei","zh":"那是什么？","fr":"Qu’est-ce que c’est, là-bas ?"}],[{"speaker":"Maître Chen","zh":"这是商店。","fr":"Ça, c’est un magasin."},{"speaker":"Mei","zh":"这是书店。","fr":"Ça, c’est une librairie."},{"speaker":"Lóng","zh":"那是超市。","fr":"Là-bas, c’est un supermarché."}],[{"speaker":"Lóng","zh":"哪个？","fr":"Lequel ?"},{"speaker":"Mei","zh":"这个？","fr":"Celui-ci ?"},{"speaker":"Lóng","zh":"那个！","fr":"Celui-là !"}],[{"speaker":"Le vendeur","zh":"那个三百块。","fr":"Celui-là, trois cents kuai."},{"speaker":"Mei","zh":"贵！便宜一点儿！","fr":"C’est cher ! Un peu moins cher !"},{"speaker":"Le vendeur","zh":"两百块。","fr":"Deux cents kuai."},{"speaker":"Maître Chen","zh":"我给你一百块。","fr":"Je te donne cent kuai."}],[{"speaker":"Monsieur Wu","zh":"有没有那个？","fr":"Avez-vous celui-là ?"},{"speaker":"Le vendeur","zh":"有！这些，那些？","fr":"Oui ! Ceux-ci, ceux-là ?"},{"speaker":"Monsieur Wu","zh":"那个。八百块。","fr":"Celui-là. Huit cents kuai."}],[{"speaker":"Le vendeur","zh":"这件衣服，十块。","fr":"Cette veste, dix kuai."},{"speaker":"Mei","zh":"给你二十块。","fr":"Je te donne vingt kuai."},{"speaker":"Le vendeur","zh":"找你十块。","fr":"Je te rends dix kuai."},{"speaker":"Maître Chen","zh":"那个新。","fr":"Celui-là est neuf."},{"speaker":"Lóng","zh":"这件！","fr":"Celle-ci !"}]];
const EPISODE6_THEMES={"买":"Commerce","卖":"Commerce","店":"Commerce","商店":"Commerce","超市":"Commerce","书店":"Commerce","东西":"Commerce","贵":"Commerce","便宜":"Commerce","找":"Commerce","给":"Commerce","衣服":"Commerce","新":"Commerce","本":"Commerce","件":"Commerce","这个":"Démonstratifs","那个":"Démonstratifs","哪个":"Démonstratifs","哪":"Démonstratifs","这些":"Démonstratifs","那些":"Démonstratifs","哪些":"Démonstratifs","些":"Démonstratifs","那":"Démonstratifs","有":"Grammaire","没有":"Grammaire"};
