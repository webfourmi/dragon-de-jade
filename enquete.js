/* Enquête du Livre I : écailles de Lóng, inscription de la boîte, carnet d'indices,
   scènes de déduction, réactions qui font varier la confiance et variantes de scènes.
   Toutes les données sont dans ce fichier ; app.js ne fait que l'appeler (voir README). */

/* ---------- Données ---------- */
const EQ_CLUES=[
 {id:'dragon',scene:0,title:'Le dragon sur ton jade',text:'Chen reconnaît aussitôt le dragon gravé sur ton pendentif : un dragon enroulé autour d’une écaille.'},
 {id:'nom',scene:1,title:'Ton nom, à l’encre fraîche',text:'Ton nom figure dans le registre de Chen, d’une encre bien plus fraîche que les lignes voisines. Chen affirme ne jamais l’avoir écrit.'},
 {id:'enveloppe',scene:1,title:'L’enveloppe anonyme',text:'Chen n’a fait que suivre une enveloppe anonyme, arrivée avec ton adresse et un sceau.'},
 {id:'photo',scene:2,title:'Le grand-père de Chen',text:'Sur la photographie, 陈先生 est le grand-père de Chen, gardien des archives de la famille de Mei.'},
 {id:'effaces',scene:2,title:'Des noms effacés',text:'Depuis des mois, Mei cherche la personne qui a effacé les noms de sa famille des registres.'},
 {id:'boite',scene:3,title:'La boîte de laque',text:'Une boîte héritée du grand-père de Chen : sa serrure n’a pas de clé, seulement un creux à la forme de ton jade.'},
 {id:'inscription',scene:4,title:'Une inscription grattée',text:'Le couvercle porte une phrase grattée dont seul le premier signe, 这, est lisible. Lóng dit que chaque mot appris lui rend de la mémoire.'},
 {id:'carte',scene:5,title:'La carte vers le registre',text:'Chen te remet une carte vers un ancien registre de familles. Une photographie y porte le même symbole que ton jade.'},
 {id:'verte',scene:6,title:'La marque verte',text:'Dans le registre, une marque verte remplace l’encre à l’endroit de la signature du père de Mei. Elle brille du même vert que l’écaille de Lóng.'},
 {id:'ajout',scene:7,title:'Un enfant ajouté ?',text:'Mei n’a jamais eu de petite sœur, pourtant un dernier nom figure à l’encre plus récente. Quelqu’un a-t-il ajouté un enfant aux archives ?'},
 {id:'main',scene:8,title:'Une autre main',text:'Les noms du portrait ont été recopiés d’une autre main, appliquée, qui connaissait l’écriture de la famille.'},
 {id:'ami',scene:9,title:'L’ami de la famille',text:'Une liste de départs mentionne un fils, une fille et un 朋友 (un ami de la famille). L’adresse au verso est presque illisible.'},
 {id:'amoureux',scene:10,title:'朋友 ou 男朋友 ?',text:'Une lettre parle d’un 男朋友 (petit ami). Sur la liste de départs, le même homme n’est noté que comme 朋友.'},
 {id:'sceau',scene:10,title:'Un sceau, trois courriers',text:'Le même sceau figure sur ton courrier venu de France, sur l’enveloppe anonyme de Chen et au bas de la lettre ancienne.'},
 {id:'age',scene:11,title:'Un âge gratté',text:'Sur la dernière fiche, la case de l’âge est grattée : il ne reste que trois traits horizontaux.'},
 {id:'trois',scene:12,title:'Trois traits, trois ans',text:'L’âge gratté se lit sans doute 三岁 : trois traits horizontaux, trois ans. L’enfant oubliée n’était qu’une toute petite fille.'},
 {id:'tiroir',scene:13,title:'Le tiroir sept',text:'Dans l’armoire des archives, la poignée du tiroir 七 est brillante et la poussière a été essuyée tout autour : quelqu’un l’a ouvert récemment.'},
 {id:'adresse',scene:14,title:'Le numéro 三十六',text:'L’adresse du verso se termine par le numéro 三十六 (36), noté à côté d’un minuscule dessin de théière. Le nom de la rue a disparu.'},
 {id:'compte',scene:15,title:'Cinq sur la photo, six au registre',text:'Le cliché 一百零三 montre 五个人, mais le registre nomme six personnes : l’une d’elles ne figure sur aucune photographie.'},
 {id:'moitie',scene:16,title:'Les deux moitiés',text:'Le papier qui enveloppait ton jade est l’autre moitié d’une page du registre : les deux bords s’emboîtent. Le portrait d’une fillette apparaît, et Lóng la reconnaît « un peu » (一点儿).'},
 {id:'plan',scene:17,title:'Le plan du quartier',text:'Sur le plan, le numéro 三十六 est entouré d’un symbole de théière, à deux pas de la tour du Tambour : sans doute une maison de thé.'},
 {id:'rdv',scene:18,title:'Un rendez-vous sans signature',text:'Un papier glissé sous le rideau de la boutique, au sceau du dragon, dit seulement 明天下午三点. Pas de lieu, pas de nom.'},
 {id:'calendrier',scene:19,title:'La page d’hier arrachée',text:'La page d’hier est arrachée du calendrier de la boutique, alors que Chen assure avoir verrouillé la porte : quelqu’un est entré, ou a voulu effacer une date.'},
 {id:'date',scene:20,title:'Le 15 septembre',text:'Aujourd’hui, c’est le 九月十四号 : le rendez-vous tombe donc le 九月十五号.'},
 {id:'jour',scene:21,title:'Rendez-vous en plein jour',text:'Le message dit 下午, pas 上午 : le rendez-vous a lieu de jour (白天), en plein après-midi.'},
 {id:'encre',scene:22,title:'去年九月',text:'En marge de la page reconstituée, une date à l’encre vert pâle : 去年九月. Ton nom a été ajouté il y a un an, presque jour pour jour.'},
 {id:'lanterne',scene:23,title:'La lanterne verte',text:'À trois heures, personne ne s’est montré, mais une lanterne verte au sceau du dragon est apparue devant la maison 三十六. L’expéditeur vous observe sans se dévoiler.'},
 {id:'attendus',scene:24,title:'Quatre tasses prêtes',text:'Quatre tasses étaient déjà alignées sur le plateau de la patronne quand vous êtes arrivés, et la lanterne verte avait disparu de la porte : elle vous attendait.'},
 {id:'tasse',scene:25,title:'La tasse réservée',text:'Sous le comptoir, une tasse de jade pâle est gardée « pour celui qui reviendra ». Le sceau du dragon est gravé sous son pied.'},
 {id:'table',scene:26,title:'La table près de la fenêtre',text:'L’ami s’asseyait chaque après-midi à la même table, près de la fenêtre, vers trois heures, et regardait la rue sans presque rien manger.'},
 {id:'commande',scene:27,title:'Une commande pour deux',text:'Il commandait toujours de quoi nourrir deux personnes (两个包子, 一个鸡蛋) et posait la seconde part devant la chaise vide.'},
 {id:'pommes',scene:28,title:'Des pommes pour la petite',text:'Il achetait des pommes et du lait pour la petite : Lóng s’en souvient soudain, 她喜欢苹果. La fillette du portrait aimait les pommes.'},
 {id:'noir',scene:29,title:'Un homme tout de noir',text:'La veille de votre venue, un homme tout de noir a posé des questions sur la tasse, payé son thé trois fois le prix et demandé quand vous viendriez. Il loge au 饭店 voisin et cherche une écaille au marché.'},
 {id:'marche',scene:30,title:'Une lueur verte au marché',text:'Au marché aux antiquités, Lóng sent une lueur verte tout au fond, entre deux étals : une autre écaille s’y trouve peut-être.'},
 {id:'panier',scene:31,title:'Un panier de vieilles affaires',text:'Le libraire, ami de Chen, a vu vendre la semaine dernière un panier de vieilles affaires de famille (carnets, petite veste d’enfant) à un étal du marché.'},
 {id:'caillou',scene:32,title:'Le galet trop beau',text:'Un galet de jade très poli brille plus que tout le reste de l’étal : Lóng le désigne d’abord (那个), mais il est presque trop beau pour être vrai.'},
 {id:'prix',scene:33,title:'Un prix qui baisse vite',text:'Le vendeur demande 三百块 du galet, puis 两百块 après marchandage : bien cher pour un simple caillou.'},
 {id:'wu',scene:34,title:'Monsieur Wu',text:'Un homme mince tout de noir, gants de cuir, salue Chen comme une vieille connaissance. C’est Monsieur Wu : il offre 八百块 du galet sans marchander, puis lance un regard à ton jade.'},
 {id:'veste',scene:35,title:'La veste d’enfant',text:'Sous la table, une petite veste d’enfant dont un bouton de jade vert brille comme l’écaille de Lóng. Le vendeur la cède pour 十块 : c’est la deuxième écaille.'},
 {id:'neuf',scene:35,title:'Un galet neuf',text:'Chen juge le galet de Wu 新 (neuf) : poli à la machine, c’est un leurre. Wu a payé cher une fausse écaille.'},
 {id:'d1',scene:null,ded:1,title:'Conclusion : un expéditeur inconnu',text:'Quelqu’un d’extérieur a glissé ton nom dans le registre et envoyé l’enveloppe. Son message, 请认识我, demande simplement qu’on fasse sa connaissance.'},
 {id:'d2',scene:null,ded:2,title:'Conclusion : l’ami était le petit ami',text:'L’« ami » de la liste de départs était le petit ami de la jeune femme, et c’est sans doute lui qui a envoyé le sceau jusqu’à toi.'},
 {id:'d3',scene:null,ded:3,title:'Conclusion : une enfant bien réelle',text:'L’enfant oubliée avait trois ans, elle ne figure sur aucune photographie du registre, et Lóng la reconnaît un peu : elle a bien existé, et quelqu’un tient à ce qu’on retrouve sa trace.'},
 {id:'d4',scene:null,ded:4,title:'Conclusion : quelqu’un vous observe',text:'L’expéditeur connaît la boutique, tes horaires et la maison 三十六 : il vous observe avant de se dévoiler.'},
 {id:'d5',scene:null,ded:5,title:'Conclusion : un ami qui attendait quelqu’un',text:'L’ami venait chaque après-midi nourrir une petite fille qui l’attendait, et gardait une tasse pour son retour. Un homme tout de noir cherche, lui aussi, ses traces.'},
 {id:'d6',scene:null,ded:6,title:'Conclusion : Wu a été trompé',text:'Monsieur Wu, un collectionneur que Chen connaît, a payé 八百块 un leurre neuf : la vraie écaille est le bouton de la veste d’enfant. Mais il cherche une écaille et vous a vus : il reviendra.'}
];
const EQ_LINKS=[['enveloppe','sceau'],['nom','enveloppe'],['nom','ajout'],['effaces','verte'],['verte','dragon'],['effaces','main'],['ami','amoureux'],['sceau','amoureux'],['boite','inscription'],['age','ajout'],['photo','effaces'],['trois','age'],['trois','ajout'],['tiroir','effaces'],['tiroir','calendrier'],['compte','ajout'],['moitie','nom'],['moitie','trois'],['adresse','plan'],['plan','lanterne'],['adresse','lanterne'],['rdv','sceau'],['rdv','lanterne'],['date','rdv'],['jour','rdv'],['encre','nom'],['attendus','tasse'],['tasse','sceau'],['table','commande'],['commande','pommes'],['pommes','moitie'],['pommes','trois'],['noir','wu'],['noir','lanterne'],['marche','noir'],['caillou','neuf'],['caillou','prix'],['veste','pommes'],['veste','panier'],['wu','prix'],['panier','marche'],['attendus','rdv']];
const EQ_QUESTIONS=[
 {id:'venue',title:'Qui a préparé ta venue ?',evidence:['nom','enveloppe','sceau','rdv','encre'],conclusion:'d1'},
 {id:'noms',title:'Qui a effacé les noms de la famille ?',evidence:['photo','effaces','carte','verte','main','tiroir','calendrier']},
 {id:'enfant',title:'Qui est l’enfant ajoutée aux archives ?',evidence:['ajout','age','trois','compte','moitie','pommes','veste'],conclusion:'d3'},
 {id:'ami',title:'Qui est l’ami de la famille ?',evidence:['ami','amoureux','sceau','lanterne','table','commande'],conclusion:'d2'},
 {id:'boite',title:'Que dit la phrase grattée sur la boîte ?',evidence:['boite','inscription','dragon']},
 {id:'maison',title:'Que cache la maison 三十六 ?',evidence:['adresse','plan','lanterne','tasse']},
 {id:'observe',title:'Qui vous observe ?',evidence:['rdv','calendrier','jour','lanterne','attendus','noir'],conclusion:'d4'},
 {id:'attente',title:'Qui l’ami attendait-il à la maison de thé ?',evidence:['attendus','tasse','table','commande','pommes'],conclusion:'d5'},
 {id:'noir',title:'Qui est l’homme tout de noir ?',evidence:['noir','wu','caillou','prix','neuf'],conclusion:'d6'},
 {id:'ecaille',title:'Où est la deuxième écaille ?',evidence:['marche','panier','caillou','veste']}
];
const EQ_INSCRIPTION=['这','是','你','的','家'];

/* Réactions : un petit choix de ton après certaines scènes, qui fait varier la confiance (0 à 5). */
const EQ_REACTIONS={
 1:{prompt:'Chen avoue ne pas savoir qui a écrit ton nom. Comment réagis-tu ?',options:[
  {t:'Tu le crois et lui proposes ton aide.',fx:{chen:1},res:'Chen se détend : il n’a plus l’air de porter seul un secret.'},
  {t:'Tu exiges de voir tout le registre avant de te prononcer.',fx:{},res:'Chen acquiesce, mais ton regard méfiant ne lui a pas échappé.'}]},
 2:{prompt:'Mei pâlit en voyant ton jade. Que fais-tu ?',options:[
  {t:'Tu lui montres le jade sans hésiter.',fx:{mei:1},res:'Mei effleure à peine le dragon gravé, la gorge nouée : tu viens de lui donner un début de confiance.'},
  {t:'Tu serres le pendentif dans ta main.',fx:{chen:1},res:'Chen approuve d’un signe : un objet pareil ne se montre pas à tout le monde. Mei, elle, baisse les yeux.'}]},
 4:{prompt:'Lóng apparaît, éblouie par la lumière. Comment l’accueilles-tu ?',options:[
  {t:'Tu t’inclines pour le saluer.',fx:{long:1},res:'Lóng cligne des yeux : on ne l’avait pas salué ainsi depuis longtemps.'},
  {t:'Tu recules d’un pas, sur tes gardes.',fx:{chen:1},res:'Chen te rassure d’un geste. Lóng se réfugie derrière la boîte.'}]},
 7:{prompt:'Mei affirme n’avoir jamais eu de petite sœur. Que fais-tu ?',options:[
  {t:'Tu l’écoutes sans l’interrompre.',fx:{mei:1},res:'Mei raconte alors un souvenir d’enfance, comme si tu faisais déjà partie de la famille.'},
  {t:'Tu proposes d’examiner l’encre avec Lóng.',fx:{long:1},res:'Lóng s’approche de la page : sa petite patte verte tremble au-dessus du dernier nom.'}]},
 9:{prompt:'Une adresse presque illisible figure au verso. Quelle piste suis-tu ?',options:[
  {t:'Tu demandes à Chen de la relire chiffre par chiffre.',fx:{chen:1},res:'Chen sourit : la méthode lui rappelle celle de son grand-père.'},
  {t:'Tu suis l’intuition de Mei : l’ami a protégé les enfants.',fx:{mei:1},res:'Mei serre les poings, reconnaissante : personne n’avait pris son hypothèse au sérieux.'}]},
 10:{prompt:'Le sceau de la lettre est celui de ton courrier. Qui interroges-tu ?',options:[
  {t:'Chen : il connaît peut-être ce sceau.',fx:{chen:1},res:'Chen hésite, puis admet qu’il l’a déjà vu… sans pouvoir dire où.'},
  {t:'Lóng : ce sceau lui rappelle quelque chose.',fx:{long:1},res:'Lóng ferme les yeux ; une image floue de jardin et de rires remonte, puis s’évanouit.'}]},
 13:{prompt:'Le tiroir sept a été ouvert récemment. Que proposes-tu ?',options:[
  {t:'Tu proposes de veiller dans la boutique cette nuit.',fx:{chen:1},res:'Chen te remercie d’un signe : veiller seul lui pesait.'},
  {t:'Tu demandes à Lóng de flairer les alentours.',fx:{long:1},res:'Lóng renifle l’air et frissonne : une odeur de pluie et de jade chaud, déjà sentie quelque part.'}]},
 15:{prompt:'Cinq personnes sur la photo, six noms au registre. Quelle hypothèse retiens-tu ?',options:[
  {t:'Un nom a été ajouté au registre.',fx:{mei:1},res:'Mei acquiesce lentement : cela rejoint l’encre fraîche qu’elle avait remarquée.'},
  {t:'Une personne a été découpée de la photographie.',fx:{chen:1},res:'Chen fronce les sourcils et examine les bords du cliché à la loupe : aucun coup de ciseaux.'}]},
 16:{prompt:'Lóng reconnaît « un peu » la fillette. Comment l’aides-tu ?',options:[
  {t:'Tu le laisses se souvenir à son rythme.',fx:{long:1},res:'Lóng s’assoit sur le registre, les yeux mi-clos : un souvenir vert pâle affleure, sans se laisser attraper.'},
  {t:'Tu le presses : un nom, vite !',fx:{chen:1},res:'Lóng se crispe et le souvenir se referme. Chen te fait signe que la patience paie mieux.'}]},
 19:{prompt:'La page d’hier est arrachée du calendrier. Que fais-tu ?',options:[
  {t:'Tu cherches la page dans la corbeille.',fx:{mei:1},res:'Mei fouille la corbeille avec toi : quelques bribes de papier sentent encore l’encre fraîche.'},
  {t:'Tu demandes à Chen qui avait la clé.',fx:{chen:1},res:'Chen jure que la porte était verrouillée… puis vérifie sa clé, soudain inquiet.'}]},
 21:{prompt:'Mei jure avoir lu « matin ». Que fais-tu ?',options:[
  {t:'Tu relis le signe avec elle, trait par trait.',fx:{mei:1},res:'Mei rit de sa méprise : le trait court est en haut pour 上, en bas pour 下.'},
  {t:'Tu t’en remets à Chen, qui a l’œil exercé.',fx:{chen:1},res:'Chen se redresse, flatté : trente ans de registres ne s’oublient pas.'}]},
 23:{prompt:'Une lanterne verte vient d’apparaître sur la porte. Que fais-tu ?',options:[
  {t:'Tu décroches la lanterne.',fx:{long:1},res:'La lanterne s’allume d’un vert doux. Lóng ferme les yeux, comme si on lui rendait un vieux souvenir.'},
  {t:'Tu la laisses en place et guettes la rue.',fx:{chen:1},res:'Chen approuve : mieux vaut ne pas montrer qu’on a trouvé le message.'}]},
 25:{prompt:'La patronne te tend la tasse réservée. Que fais-tu ?',options:[
  {t:'Tu bois une gorgée, comme elle te le propose.',fx:{chen:1},res:'Le thé est amer, puis doux. La patronne sourit : l’ami faisait la même grimace.'},
  {t:'Tu poses la tasse pour l’examiner de près.',fx:{long:1},res:'Lóng se penche sur le pied de la tasse : le sceau luit faiblement, comme une braise.'}]},
 28:{prompt:'Lóng se souvient soudain que la fillette aimait les pommes. Comment réagis-tu ?',options:[
  {t:'Tu lui demandes de décrire son souvenir.',fx:{long:1},res:'Lóng ferme les yeux : une main tend une pomme rouge, quelqu’un rit. Puis l’image s’efface.'},
  {t:'Tu notes l’indice et le laisses souffler.',fx:{mei:1},res:'Mei approuve : un souvenir ne se force pas. Elle glisse une pomme dans la patte de Lóng.'}]},
 31:{prompt:'Le libraire parle d’un panier de vieilles affaires de famille. Que fais-tu ?',options:[
  {t:'Tu veux aller à l’étal tout de suite.',fx:{mei:1},res:'Mei est déjà à la porte : chaque heure compte, et elle le sait.'},
  {t:'Tu proposes d’observer l’étal avant de t’approcher.',fx:{chen:1},res:'Chen hoche la tête : sur un marché, on regarde d’abord, on parle ensuite.'}]},
 34:{prompt:'Monsieur Wu salue Chen comme une vieille connaissance. Que fais-tu ?',options:[
  {t:'Tu interroges Chen du regard.',fx:{chen:1},res:'Chen détourne les yeux : « Plus tard. Pas ici. »'},
  {t:'Tu observes Wu sans rien dire.',fx:{long:1},res:'Lóng fronce le nez : cet homme sent le jade neuf et le parfum cher.'}]}
};

/* Variantes de scène : une ligne en plus (ou en moins) selon la confiance accordée. */
const EQ_VARIANTS={
 8:t=>t.mei>=1?'Mei hésite, puis ajoute à voix basse qu’elle reconnaît le col de la veste de l’homme : celui d’un tailleur du quartier.':'Mei serre les lèvres : elle ne dira rien de plus pour l’instant.',
 9:t=>t.chen>=2?'À voix basse, Chen te confie que cette écriture appliquée lui rappelle celle des carnets de son grand-père.':'',
 11:t=>t.long>=1?'Lóng passe sa petite patte sur le grattage : sous la poussière, une écaille verte semble se dessiner.':'',
 14:t=>t.chen>=3?'Chen te regarde longuement : tu lis déjà les chiffres comme un gardien d’archives.':'',
 16:t=>t.long>=2?'Lóng murmure un son, peut-être le début d’un prénom, sans parvenir à le finir.':'',
 17:t=>t.mei>=2?'Mei glisse quelques pièces au libraire avant même que tu aies fini de compter : « Les amis de la famille ne paient pas plein tarif. »':'',
 20:t=>t.mei>=3?'Mei note la date dans son carnet, puis ajoute en dessous : « Je serai là. »':'',
 22:t=>t.long>=2?'Lóng pose sa patte sur la date : l’encre vert pâle s’illumine un instant, de la même teinte que la marque verte du registre.':'',
 26:t=>t.mei>=3?'Mei s’assoit près de la fenêtre, sans un mot, comme pour essayer la place de l’ami.':'',
 28:t=>t.chen>=3?'Chen sort son carnet et note chaque mot de la patronne, comme il le fait pour un registre.':'',
 31:t=>t.mei>=3?'Mei glisse la main dans sa cape : elle a déjà préparé quelques billets pour l’occasion.':'',
 33:t=>t.chen>=3?'Chen te souffle une règle de marchand : quand le prix paraît trop haut, il suffit de regarder ailleurs.':''
};

/* Scènes de déduction : un petit problème de vocabulaire, puis un raisonnement à partir de tes indices. */
const EQ_DEDUCTIONS={
 1:{title:'Qui a préparé ta venue ?',
  intro:'Avant de quitter la boutique, tu rassembles ce que tu sais. Dans l’enveloppe anonyme, un seul message est glissé :',
  zh:'请认识我。',
  vocab:{q:'Que demande l’expéditeur ?',options:[['Qu’on fasse sa connaissance.',true],['Qu’on lui dise au revoir.',false],['Qu’on lui rende le jade.',false]]},
  pick:{prompt:'Quels deux indices prouvent que quelqu’un d’autre que Chen t’a fait venir ?',need:['nom','enveloppe'],pool:['nom','enveloppe','dragon','photo','boite'],hint:'Cherche ce qui montre que Chen n’a pas écrit ton nom, et d’où vient ton adresse.'},
  conclusion:'d1',reward:20,trust:{chen:1}},
 2:{title:'Pourquoi l’« ami » est-il resté dans l’ombre ?',
  intro:'La liste de départs ne parle que d’un 朋友, mais la lettre évoque un autre mot :',
  zh:'男朋友',
  vocab:{q:'Que signifie ce mot ?',options:[['petit ami',true],['ami d’enfance',false],['frère aîné',false]]},
  pick:{prompt:'Quels trois indices montrent que l’ami de la liste a pu t’envoyer le sceau ?',need:['ami','amoureux','sceau'],pool:['ami','amoureux','sceau','age','verte'],hint:'Compare ce que dit la liste, ce que dit la lettre et ce que montre le sceau.'},
  conclusion:'d2',reward:25,trust:{mei:1}},
 3:{title:'Qui était l’enfant oubliée ?',
  intro:'La case grattée de l’âge se lit enfin, après tout ce que vous avez compté :',
  zh:'她三岁。',
  vocab:{q:'Quel âge a-t-elle ?',options:[['trois ans',true],['treize ans',false],['trente ans',false]]},
  pick:{prompt:'Quels trois indices montrent que cette enfant a bien existé, même si le registre l’a effacée ?',need:['trois','compte','moitie'],pool:['trois','compte','moitie','tiroir','adresse','plan'],hint:'Cherche son âge, l’endroit où elle manque, et ce qui la montre enfin.'},
  conclusion:'d3',reward:25,trust:{long:1}},
 4:{title:'Qui vous observe ?',
  intro:'Le rendez-vous est passé sans visite. Reste le message, dont tu connais maintenant chaque mot :',
  zh:'明天下午三点。',
  vocab:{q:'Quand a lieu le rendez-vous ?',options:[['Demain, à 15 h',true],['Hier, à 3 h du matin',false],['Aujourd’hui, à 13 h',false]]},
  pick:{prompt:'Quels trois indices montrent que l’expéditeur vous observe sans se dévoiler ?',need:['rdv','calendrier','lanterne'],pool:['rdv','calendrier','lanterne','encre','adresse','date'],hint:'Pense au message sans lieu, à la page arrachée et à la lanterne apparue à l’heure dite.'},
  conclusion:'d4',reward:30,trust:{mei:1}},
 5:{title:'Qui l’ami attendait-il ?',
  intro:'La patronne a fini son récit. Reste la phrase de Lóng, celle qui a fait remonter son souvenir :',
  zh:'她喜欢苹果。',
  vocab:{q:'Que dit Lóng ?',options:[['Elle aime les pommes.',true],['Elle veut du lait.',false],['Elle cuisine pour nous.',false]]},
  pick:{prompt:'Quels trois indices montrent que l’ami venait nourrir une petite fille qui l’attendait ?',need:['commande','pommes','tasse'],pool:['commande','pommes','tasse','attendus','table','noir'],hint:'Cherche ce qu’il commandait, ce qu’il achetait et ce qu’il gardait en réserve.'},
  conclusion:'d5',reward:25,trust:{long:1}},
 6:{title:'Qui est l’homme tout de noir ?',
  intro:'Chen a jugé le galet d’un seul mot :',
  zh:'那个新。',
  vocab:{q:'Que dit Chen du galet ?',options:[['Il est neuf.',true],['Il est cher.',false],['Il est ancien.',false]]},
  pick:{prompt:'Quels trois indices montrent que Monsieur Wu a été trompé et que la vraie écaille est ailleurs ?',need:['caillou','neuf','veste'],pool:['caillou','neuf','veste','wu','prix','panier'],hint:'Pense à ce qui brille trop, à ce qui est trop récent, et à ce qui brille au fond d’un panier.'},
  conclusion:'d6',reward:30,trust:{chen:1}}
};

let eqDedForce=0,eqDed=null;

/* ---------- État ---------- */
function eqInit(){
  state.trust=state.trust||{chen:0,mei:0,long:0};
  state.reactions=state.reactions||{};
  state.deduced=state.deduced||[];
  state.dedSkipped=state.dedSkipped||[];
  state.dedRewarded=state.dedRewarded||[];
  state.clueScenes=state.clueScenes||[];
  state.scalesLit=state.scalesLit||[];
  return state;
}
/* Appelée à chaque scène terminée ou passée : mémorise l'indice et rallume l'écaille de l'épisode si les 6 scènes sont faites. */
function eqMark(i){
  if(!state.clueScenes.includes(i))state.clueScenes.push(i);
  const ep=episodeOfScene(i),first=(ep-1)*6;
  if(first+6<=scenes.length&&!state.scalesLit.includes(ep)){
    for(let k=first;k<first+6;k++)if(!state.clueScenes.includes(k))return;
    state.scalesLit.push(ep);
  }
}
function eqSceneDone(i){eqInit();eqMark(i)}
function eqState(){
  eqInit();
  (state.completed||[]).concat(state.skipped||[]).forEach(eqMark);/* rattrape les parties déjà commencées */
  return state;
}
function eqDone(ep){return state.deduced.includes(ep)&&!state.dedSkipped.includes(ep)}
function eqUnlocked(){
  const st=eqState();
  return EQ_CLUES.filter(c=>c.scene!==null?st.clueScenes.includes(c.scene):eqDone(c.ded));
}
function eqClue(id){return EQ_CLUES.find(c=>c.id===id)}

/* ---------- Écailles et inscription ---------- */
function scalesBar(){
  const st=eqState(),n=st.scalesLit.length;
  return '<div class="scales" role="img" aria-label="Écailles de Lóng : '+n+' sur 12">'
    +Array.from({length:12},(_,k)=>'<span class="scale'+(st.scalesLit.includes(k+1)?' lit':'')+'">'+(k+1)+'</span>').join('')
    +'<small>'+n+' / 12 écailles</small></div>';
}
function eqInscription(){
  const st=eqState(),known=EQ_INSCRIPTION.filter(c=>st.words.includes(c)).length;
  return '<div class="inscription" lang="zh-CN" role="img" aria-label="Inscription de la boîte : '+known+' signes sur '+EQ_INSCRIPTION.length+' retrouvés">'
    +EQ_INSCRIPTION.map(c=>st.words.includes(c)?'<span class="ins on">'+esc(c)+'</span>':'<span class="ins">？</span>').join('')+'</div>'
    +'<p class="small muted">'+known+' signe'+(known>1?'s':'')+' sur '+EQ_INSCRIPTION.length+' retrouvé'+(known>1?'s':'')+'. Chaque signe réapparaît quand tu apprends le mot correspondant.'
    +(known<EQ_INSCRIPTION.length?' Il t’en manque encore un : la suite de l’enquête te l’apprendra.':'')+'</p>';
}

/* ---------- Réactions et variantes ---------- */
function reactionBlock(i,completed){
  const r=EQ_REACTIONS[i];if(!r||!completed)return '';
  const chosen=eqState().reactions[i];
  return '<div class="paper"><div class="label">Ta réaction · elle compte pour la confiance</div><h3>'+esc(r.prompt)+'</h3><div class="choices">'
    +r.options.map((o,j)=>'<button class="'+(chosen===j?'selected':'')+'" '+(chosen!==undefined?'disabled':'')+' onclick="eqReact('+i+','+j+')">'+esc(o.t)+'</button>').join('')+'</div>'
    +(chosen!==undefined?'<p class="narration variant">'+esc(r.options[chosen].res)+'</p>':'')+'</div>';
}
function eqReact(i,j){
  const st=eqState(),r=EQ_REACTIONS[i];
  if(!r||!r.options[j]||st.reactions[i]!==undefined)return;
  st.reactions[i]=j;
  const fx=r.options[j].fx;Object.keys(fx).forEach(k=>{st.trust[k]=Math.max(0,Math.min(5,(st.trust[k]||0)+fx[k]))});
  save();render();
}
function sceneVariant(i){
  const f=EQ_VARIANTS[i];if(!f)return '';
  const t=f(eqState().trust);
  return t?'<p class="narration variant">'+esc(t)+'</p>':'';
}

/* ---------- Scènes de déduction ---------- */
function eqPendingDeduction(){
  const st=eqState();
  if(eqDed&&eqDed.step==='done')return eqDed.ep;/* garde l'écran de réussite jusqu'à « Continuer » */
  if(eqDedForce&&!eqDone(eqDedForce))return eqDedForce;
  eqDedForce=0;
  const sc=state.scene,total=scenes.length;
  let ep=0;
  if(sc>=total&&total>=12)ep=Math.floor(total/6);
  else if(sc>=6&&sc%6===0&&!epStarted(sc/6+1))ep=sc/6;
  return ep&&EQ_DEDUCTIONS[ep]&&!st.deduced.includes(ep)?ep:0;
}
function deductionPage(){
  const ep=eqPendingDeduction();if(!ep)return '';
  const d=EQ_DEDUCTIONS[ep];
  if(!eqDed||eqDed.ep!==ep)eqDed={ep,step:'vocab',picked:[],msg:'',order:shuffleWords(d.pick.pool)};
  const head='<div class="hero location-banner"><h1>Les Chroniques du Dragon de Jade</h1></div><main class="page"><div class="label">Scène de déduction · Épisode '+ep+'</div><h2>'+esc(d.title)+'</h2>';
  const skip='<button onclick="eqDedSkip()">Passer (0 XP)</button>';
  let body;
  if(eqDed.step==='vocab'){
    body='<p>'+esc(d.intro)+'</p><p class="han han-dialogue" lang="zh-CN">'+chineseText(d.zh)+'</p><div class="paper"><div class="label">Étape 1 sur 2 · Vocabulaire</div><h3>'+esc(d.vocab.q)+'</h3><div class="choices">'
      +d.vocab.options.map((o,j)=>'<button onclick="eqDedVocab('+j+')">'+esc(o[0])+'</button>').join('')+'</div>'
      +(eqDed.msg?'<div class="warning">'+esc(eqDed.msg)+'</div>':'')+'</div>'+skip;
  }else if(eqDed.step==='pick'){
    const st=eqState();
    body='<div class="paper"><div class="label">Étape 2 sur 2 · Raisonnement</div><h3>'+esc(d.pick.prompt)+'</h3><p class="small muted">Choisis '+d.pick.need.length+' indices de ton carnet.</p><div class="clue-picks">'
      +eqDed.order.filter(id=>eqUnlocked().some(c=>c.id===id)).map(id=>{const c=eqClue(id);return '<button class="clue-pick'+(eqDed.picked.includes(id)?' selected':'')+'" onclick="eqDedPick(\''+id+'\')"><strong>'+esc(c.title)+'</strong><span>'+esc(c.text)+'</span></button>'}).join('')
      +'</div><button class="primary" onclick="eqDedCheck()">Valider mon raisonnement</button>'
      +(eqDed.msg?'<div class="warning">'+esc(eqDed.msg)+'</div>':'')+'</div>'+skip;
  }else{
    const c=eqClue(d.conclusion);
    body='<div class="toast">✓ Déduction réussie'+(eqDed.gain?' · +'+eqDed.gain+' XP':'')+'</div><div class="paper"><div class="label">Nouvel indice dans ton carnet</div><h3>'+esc(c.title)+'</h3><p>'+esc(c.text)+'</p></div><button class="primary" onclick="eqDedFinish()">Continuer →</button>';
  }
  return head+body+'</main>';
}
function eqDedVocab(j){
  const d=EQ_DEDUCTIONS[eqDed.ep];
  if(d.vocab.options[j][1]){eqDed.step='pick';eqDed.msg=''}else eqDed.msg='Pas tout à fait. Relis le mot, aide-toi du carnet si besoin.';
  render();
}
function eqDedPick(id){
  const d=EQ_DEDUCTIONS[eqDed.ep],p=eqDed.picked,k=p.indexOf(id);
  if(k>=0)p.splice(k,1);else if(p.length<d.pick.need.length)p.push(id);
  eqDed.msg='';render();
}
function eqDedCheck(){
  const d=EQ_DEDUCTIONS[eqDed.ep],need=d.pick.need,p=eqDed.picked;
  if(p.length<need.length){eqDed.msg='Il te faut '+need.length+' indices.';render();return}
  const good=p.filter(id=>need.includes(id)).length;
  if(good<need.length){eqDed.msg='Tu as '+good+' bon'+(good>1?'s':'')+' indice'+(good>1?'s':'')+' sur '+need.length+'. '+d.pick.hint;render();return}
  const st=eqState(),ep=eqDed.ep;
  st.dedSkipped=st.dedSkipped.filter(e=>e!==ep);
  if(!st.deduced.includes(ep))st.deduced.push(ep);
  eqDed.gain=0;
  if(!st.dedRewarded.includes(ep)){
    st.dedRewarded.push(ep);state.xp+=d.reward;eqDed.gain=d.reward;
    Object.keys(d.trust).forEach(k=>{st.trust[k]=Math.max(0,Math.min(5,(st.trust[k]||0)+d.trust[k]))});
    recordLesson();
  }
  eqDed.step='done';save();render();
}
function eqDedSkip(){
  if(!confirm('Passer cette déduction ? Tu ne gagneras pas d’XP et l’indice de conclusion restera caché. Tu pourras la reprendre depuis l’onglet Enquête.'))return;
  const st=eqState(),ep=eqDed.ep;
  if(!st.deduced.includes(ep))st.deduced.push(ep);
  if(!st.dedSkipped.includes(ep))st.dedSkipped.push(ep);
  save();eqDedFinish();
}
function eqDedFinish(){eqDedForce=0;eqDed=null;render();window.scrollTo(0,0)}
function eqStartDeduction(ep){eqDedForce=ep;eqDed=null;tab='aventure';render();window.scrollTo(0,0)}

/* ---------- Onglet Enquête ---------- */
function eqBar(n){return '<span class="trust-bar" aria-label="'+n+' sur 5">'+'●'.repeat(n)+'○'.repeat(5-n)+'</span>'}
function enquete(){
  const st=eqState(),clues=eqUnlocked(),ids=new Set(clues.map(c=>c.id));
  const questions=EQ_QUESTIONS.filter(q=>q.evidence.some(id=>ids.has(id)));
  const pending=Object.keys(EQ_DEDUCTIONS).map(Number).filter(ep=>st.scalesLit.includes(ep)&&!eqDone(ep));
  return '<main class="page"><div class="label">Livre I · Enquête</div><h2>Le carnet d’enquête</h2>'
    +'<div class="paper"><h3>Les écailles de Lóng</h3>'+scalesBar()+'<p class="small muted">Chaque épisode terminé rallume une écaille et rend un souvenir à Lóng.</p></div>'
    +'<div class="paper"><h3>La phrase de la boîte</h3>'+eqInscription()+'</div>'
    +pending.map(ep=>'<div class="paper"><div class="label">Déduction à résoudre</div><h3>Épisode '+ep+' · '+esc(EQ_DEDUCTIONS[ep].title)+'</h3><button class="primary" onclick="eqStartDeduction('+ep+')">Résoudre →</button></div>').join('')
    +'<h3>Questions ouvertes</h3>'
    +(questions.map(q=>{
      const have=q.evidence.filter(id=>ids.has(id)),c=q.conclusion&&eqDone(eqClue(q.conclusion).ded)?eqClue(q.conclusion):null;
      return '<div class="paper"><div class="label">'+(c?'Piste confirmée':'Question ouverte')+'</div><h3>'+esc(q.title)+'</h3><p class="small muted">'+have.length+' indice'+(have.length>1?'s':'')+' sur '+q.evidence.length+' possibles à ce stade</p><ul>'+have.map(id=>'<li>'+esc(eqClue(id).title)+'</li>').join('')+'</ul>'+(c?'<p><strong>'+esc(c.text)+'</strong></p>':'')+'</div>';
    }).join('')||'<div class="paper"><p>Aucun indice pour l’instant. Avance dans l’aventure : chaque scène terminée ajoute des pièces au dossier.</p></div>')
    +'<h3>Indices ('+clues.length+')</h3>'
    +clues.map(c=>{
      const links=EQ_LINKS.filter(l=>l.includes(c.id)).map(l=>l[0]===c.id?l[1]:l[0]).filter(id=>ids.has(id));
      return '<article class="paper clue"><h4>'+esc(c.title)+'</h4><p>'+esc(c.text)+'</p>'+(links.length?'<p class="small muted">Lié à : '+links.map(id=>esc(eqClue(id).title)).join(' · ')+'</p>':'')+'</article>';
    }).join('')
    +'<div class="paper"><h3>Confiance</h3>'
    +[['chen','Maître Chen'],['mei','Mei'],['long','Lóng']].map(([k,n])=>'<p>'+esc(n)+' '+eqBar(st.trust[k]||0)+'</p>').join('')
    +'<p class="small muted">Tes réactions après certaines scènes font varier la confiance, et donc ce que les personnages te confient.</p></div></main>';
}
