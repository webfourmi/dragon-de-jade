/* Épisode 4 du Livre I : scènes, vocabulaire, tours de dialogue et thèmes. */
const EPISODE4_SCENES=[
  {
    "title": "Le message sous la porte",
    "speaker": "Maître Chen",
    "text": "À l’aube, Chen ramasse un papier plié glissé sous le rideau de la boutique. Pas de nom, mais le sceau du dragon enroulé autour d’une écaille, le même que celui de ton courrier. Quelques mots seulement, tracés d’une main nerveuse : « 明天下午三点. » Mei lit à voix haute et Lóng frémit : le rendez-vous est demain. Sans lieu, sans signature.",
    "zh": "明天下午三点。",
    "py": "Míngtiān xiàwǔ sān diǎn.",
    "fr": "Demain, à trois heures de l’après-midi.",
    "question": "Que signifie 明天 ?",
    "options": [
      [
        "demain",
        true
      ],
      [
        "hier",
        false
      ],
      [
        "aujourd’hui",
        false
      ]
    ],
    "words": [
      "明天",
      "下午",
      "点"
    ],
    "reward": 15,
    "info": "Dans la Chine traditionnelle, la journée était découpée en douze périodes de deux heures, appelées shíchen. Aujourd’hui, on dit l’heure avec un nombre suivi de 点, précédé d’un mot comme « matin » ou « après-midi ».",
    "grammar": "明天 = demain. 下午 = après-midi. 三点 = trois heures. En chinois, on dit d’abord le jour, puis le moment de la journée, puis l’heure : 明天下午三点."
  },
  {
    "title": "Le calendrier arraché",
    "speaker": "Mei",
    "text": "Pour être sûrs de la date, vous consultez le grand calendrier accroché derrière le comptoir. Mei suit les jours du doigt : « 今天星期五. » Sur la feuille de la veille, il ne reste qu’un bout de papier déchiré : quelqu’un a arraché la page d’hier. Chen assure avoir verrouillé la porte. Lóng, lui, note le plus important : « 明天星期六. » Ce week-end, tout va se jouer. Le dimanche, lui, s’écrit 星期日 ou 星期天.",
    "zh": "今天星期五。明天星期六。",
    "py": "Jīntiān xīngqīwǔ. Míngtiān xīngqīliù.",
    "fr": "Aujourd’hui, c’est vendredi. Demain, c’est samedi.",
    "question": "Comment dit-on « hier » ?",
    "options": [
      [
        "昨天",
        true
      ],
      [
        "今天",
        false
      ],
      [
        "明天",
        false
      ]
    ],
    "words": [
      "今天",
      "昨天",
      "星期",
      "星期日",
      "星期天"
    ],
    "reward": 15,
    "info": "En chinois, les jours de la semaine sont numérotés : 星期一 est lundi, 星期二 mardi… jusqu’à 星期六 (samedi). Seul le dimanche fait exception : on dit 星期日 ou 星期天.",
    "grammar": "星期 + nombre = jour de la semaine : 星期五 = vendredi. Le dimanche est 星期日 ou 星期天. 今天 = aujourd’hui, 昨天 = hier, 明天 = demain."
  },
  {
    "title": "Quel jour du mois ?",
    "speaker": "Maître Chen",
    "text": "Chen tapote la date inscrite en haut du calendrier : le mois, puis le jour. « 几月几号 ? » demande Lóng, qui confond encore les deux. Chen lit lentement : « 今天九月十四号. » Demain sera donc le quinze. À l’écrit, on trouve plutôt 日 que 号, et l’année s’écrit avec 年. Mei griffonne la date dans son carnet : 九月十五号, le jour du rendez-vous.",
    "zh": "几月几号？今天九月十四号。",
    "py": "Jǐ yuè jǐ hào? Jīntiān jiǔ yuè shísì hào.",
    "fr": "Quel jour du mois ? Aujourd’hui, c’est le 14 septembre.",
    "question": "Comment dit-on « 15 septembre » ?",
    "options": [
      [
        "九月十五号",
        true
      ],
      [
        "五月九号",
        false
      ],
      [
        "十月五号",
        false
      ]
    ],
    "words": [
      "年",
      "月",
      "日",
      "号"
    ],
    "reward": 15,
    "info": "En chinois, la date va toujours du plus grand au plus petit : année, mois, puis jour. 2026年9月15日 se lit dans cet ordre, et l’heure suit la même logique : les heures d’abord, puis les minutes.",
    "grammar": "Les mois sont des nombres suivis de 月 : 九月 = septembre. Pour le jour du mois, on ajoute 号 à l’oral ou 日 à l’écrit : 十五号 / 十五日. Pour l’année, on utilise 年."
  },
  {
    "title": "Matin ou après-midi ?",
    "speaker": "Mei",
    "text": "Mei relit le message : « 明天上午三点. » Chen fronce les sourcils : trois heures du matin, avant même le lever du jour ? Lui lit 下午. Les deux signes se ressemblent : 上 a son trait court au-dessus, 下 en dessous. Lóng énumère les moments de la journée pour trancher : « 早上，上午，中午，下午，晚上. » Il conclut que le rendez-vous est en plein 白天. Tu relis le message avec eux : c’est bien 下午. Inutile de se lever 早 ou de veiller 晚 pour ce rendez-vous.",
    "zh": "上午？是下午。",
    "py": "Shàngwǔ? Shì xiàwǔ.",
    "fr": "Le matin ? C’est l’après-midi.",
    "question": "Quel mot désigne le milieu de la journée (midi) ?",
    "options": [
      [
        "中午",
        true
      ],
      [
        "晚上",
        false
      ],
      [
        "早上",
        false
      ]
    ],
    "words": [
      "早上",
      "上午",
      "中午",
      "晚上",
      "白天",
      "早",
      "晚"
    ],
    "reward": 15,
    "info": "Les caractères 上 (shàng, « haut ») et 下 (xià, « bas ») sont des opposés très fréquents : on les retrouve dans 上午 et 下午. Midi, 中午, contient 中, « milieu ».",
    "grammar": "Les moments de la journée : 早上 (tôt le matin), 上午 (matinée), 中午 (midi), 下午 (après-midi), 晚上 (soir). 白天 = la journée, en plein jour. 早 = tôt ; 晚 = tard."
  },
  {
    "title": "Une date à l’encre fraîche",
    "speaker": "Lóng",
    "text": "En relisant la page reconstituée, Lóng remarque dans la marge une toute petite date, du même vert pâle que l’encre fraîche de ton nom : « 去年九月. » Septembre de l’année dernière : quelqu’un a ajouté ton nom il y a un an, presque jour pour jour. Le dragon récite alors sa comptine préférée : « 去年，今年，明年 », puis Mei rappelle qu’une année compte « 一年三百六十五天 ». Un an pour préparer ta venue, c’est long…",
    "zh": "去年九月。一年三百六十五天。",
    "py": "Qùnián jiǔ yuè. Yì nián sānbǎi liùshíwǔ tiān.",
    "fr": "En septembre de l’année dernière. Une année compte 365 jours.",
    "question": "Que signifie 去年 ?",
    "options": [
      [
        "l’année dernière",
        true
      ],
      [
        "cette année",
        false
      ],
      [
        "l’année prochaine",
        false
      ]
    ],
    "words": [
      "去年",
      "今年",
      "明年",
      "天"
    ],
    "reward": 15,
    "info": "Le Nouvel An chinois suit le calendrier lunaire : sa date change chaque année, entre la fin janvier et la fin février. Pour les dates courantes, la Chine utilise le calendrier grégorien, comme nous.",
    "grammar": "去年 = l’année dernière, 今年 = cette année, 明年 = l’année prochaine. 年 se place après le nombre : 一年 = un an. 天 compte les jours : 三百六十五天 = 365 jours."
  },
  {
    "title": "Trois heures, personne",
    "speaker": "Maître Chen",
    "text": "Le lendemain, vous prenez position devant la maison 三十六, à deux pas de la tour du Tambour. La devanture est close, couverte de poussière. Chen consulte sa montre : « 现在两点五十分. » Lóng compte à voix basse : « 十分钟. » Mei demande « 什么时候 ? » : quand viendra-t-il ? « 三点 », répond Chen. Le temps s’étire. Trois heures sonnent, puis trois heures dix : personne. Sur la porte, pourtant, une petite lanterne verte au sceau du dragon vient d’être accrochée. Quelqu’un vous observe.",
    "zh": "现在两点五十分。什么时候？三点。",
    "py": "Xiànzài liǎng diǎn wǔshí fēn. Shénme shíhou? Sān diǎn.",
    "fr": "Il est deux heures cinquante. Quand ? À trois heures.",
    "question": "Comment demande-t-on l’heure ?",
    "options": [
      [
        "现在几点？",
        true
      ],
      [
        "今天星期几？",
        false
      ],
      [
        "你叫什么名字？",
        false
      ]
    ],
    "words": [
      "现在",
      "时间",
      "时候",
      "小时",
      "分钟",
      "分"
    ],
    "reward": 30,
    "info": "À l’écrit, les Chinois utilisent souvent l’heure sur 24 heures, mais à l’oral ils précisent plutôt le moment de la journée : 十五点 et 下午三点 se disent tous les deux.",
    "grammar": "现在几点 ? = « Quelle heure est-il ? ». 点 = l’heure, 分 = la minute ; 分钟 et 小时 comptent une durée : 十分钟 = dix minutes, 一个小时 = une heure. 什么时候 ? = « Quand ? ». 时间 = le temps."
  }
];
const EPISODE4_VOCAB=[["今天","jīntiān","aujourd’hui"],["明天","míngtiān","demain"],["昨天","zuótiān","hier"],["今年","jīnnián","cette année"],["明年","míngnián","l’année prochaine"],["去年","qùnián","l’année dernière"],["年","nián","an, année"],["月","yuè","mois, lune"],["日","rì","jour (date), soleil"],["号","hào","numéro ; jour du mois"],["星期","xīngqī","semaine"],["星期日","xīngqīrì","dimanche"],["星期天","xīngqītiān","dimanche"],["早上","zǎoshang","matin (tôt)"],["上午","shàngwǔ","matinée"],["中午","zhōngwǔ","midi"],["下午","xiàwǔ","après-midi"],["晚上","wǎnshang","soir"],["白天","báitiān","journée, en plein jour"],["点","diǎn","heure (sur l’horloge) ; point"],["分","fēn","minute"],["分钟","fēnzhōng","minute (durée)"],["小时","xiǎoshí","heure (durée)"],["时候","shíhou","moment"],["时间","shíjiān","temps"],["现在","xiànzài","maintenant"],["天","tiān","jour, ciel"],["晚","wǎn","tard, soir"],["早","zǎo","tôt, matin"]];
const EPISODE4_TURNS=[[{"speaker":"Maître Chen","zh":"明天下午三点。","fr":"Demain, à trois heures de l’après-midi."},{"speaker":"Mei","zh":"几点？","fr":"À quelle heure ?"},{"speaker":"Maître Chen","zh":"三点。","fr":"À trois heures."}],[{"speaker":"Mei","zh":"今天星期五。","fr":"Aujourd’hui, c’est vendredi."},{"speaker":"Lóng","zh":"明天星期六。","fr":"Demain, c’est samedi."},{"speaker":"Maître Chen","zh":"昨天星期四。","fr":"Hier, c’était jeudi."}],[{"speaker":"Lóng","zh":"几月几号？","fr":"Quel jour du mois ?"},{"speaker":"Maître Chen","zh":"今天九月十四号。","fr":"Aujourd’hui, c’est le 14 septembre."},{"speaker":"Mei","zh":"明天九月十五号。","fr":"Demain, c’est le 15 septembre."}],[{"speaker":"Mei","zh":"明天上午三点？","fr":"Demain à trois heures du matin ?"},{"speaker":"Maître Chen","zh":"是下午。","fr":"C’est l’après-midi."},{"speaker":"Lóng","zh":"早上，上午，中午，下午，晚上。","fr":"Tôt le matin, matinée, midi, après-midi, soir."},{"speaker":"Mei","zh":"白天。","fr":"En plein jour."}],[{"speaker":"Maître Chen","zh":"去年九月。","fr":"En septembre de l’année dernière."},{"speaker":"Lóng","zh":"去年，今年，明年。","fr":"L’année dernière, cette année, l’année prochaine."},{"speaker":"Mei","zh":"一年三百六十五天。","fr":"Une année compte 365 jours."}],[{"speaker":"Maître Chen","zh":"现在两点五十分。","fr":"Il est deux heures cinquante."},{"speaker":"Lóng","zh":"十分钟。","fr":"Dix minutes."},{"speaker":"Mei","zh":"什么时候？","fr":"Quand ?"},{"speaker":"Maître Chen","zh":"三点。","fr":"À trois heures."}]];
const EPISODE4_THEMES={"今天":"Temps","明天":"Temps","昨天":"Temps","今年":"Temps","明年":"Temps","去年":"Temps","年":"Temps","月":"Temps","日":"Temps","号":"Temps","星期":"Temps","星期日":"Temps","星期天":"Temps","早上":"Temps","上午":"Temps","中午":"Temps","下午":"Temps","晚上":"Temps","白天":"Temps","点":"Temps","分":"Temps","分钟":"Temps","小时":"Temps","时候":"Temps","时间":"Temps","现在":"Temps","天":"Temps","晚":"Temps","早":"Temps"};
