/* Clés des caractères rencontrés dans le Livre I. Le carnet se reconstruit à partir des mots de la sauvegarde. */
const RADICAL_BY_CHAR = new Map();
for (const [id, symbol, name, characters, variants, lookalikes] of RADICAL_DATA) {
  const key = {id, symbol, name, lookalikes};
  for (const ch of characters) {
    const form = Object.keys(variants).find(shape => variants[shape].includes(ch)) || symbol;
    RADICAL_BY_CHAR.set(ch, {ch, key, form});
  }
}

function radicalVocabulary() {
  const dictionary=new Map(vocab.map(word=>[word[0],word]));
  // A few older saves contain whole expressions instead of separate vocabulary entries.
  return [...new Set(state.words)].filter(text=>typeof text==='string' && [...text].some(ch=>RADICAL_BY_CHAR.has(ch)))
    .map(text=>dictionary.get(text)||[text,'','']);
}

function radicalEntries(words = radicalVocabulary()) {
  const found = new Map();
  for (const word of words) {
    for (const ch of new Set(word[0])) {
      const item = RADICAL_BY_CHAR.get(ch);
      if (!item) continue;
      if (!found.has(ch)) found.set(ch, {...item, words:[]});
      found.get(ch).words.push(word);
    }
  }
  return [...found.values()];
}

function radicalGroups(entries) {
  const groups = new Map();
  for (const entry of entries) {
    if (!groups.has(entry.key)) groups.set(entry.key, []);
    groups.get(entry.key).push(entry);
  }
  return groups;
}

function radicalForm(entry) {
  if (entry.key.id === 163) return '阝 à droite';
  if (entry.key.id === 170) return '阝 à gauche';
  return entry.form;
}

function radicalCaption(entry) {
  const {symbol, name} = entry.key;
  return entry.form === symbol ? symbol+' · '+name : radicalForm(entry)+' · '+symbol+' (« '+name+' »)';
}

function radicalInk(entry) {
  if (!RADICAL_INK.includes(entry.ch)) return '<span class="radical-print" lang="zh-CN">'+entry.ch+'</span>';
  return '<svg class="radical-print" viewBox="0 0 1024 1024" role="img" aria-label="'+entry.ch+', clé '+esc(entry.key.name)+' en vert"><use href="assets/radicaux/empreintes.svg#u'+entry.ch.codePointAt(0).toString(16)+'"></use></svg>';
}

function radicalWords(words) {
  return words.map(([zh, py, fr]) => '<span>'+['<b lang="zh-CN">'+esc(zh)+'</b>',esc(py),esc(fr)].filter(Boolean).join(' · ')+'</span>').join('');
}

function radicalExample(entry, words = entry.words) {
  return '<div class="radical-example">'+radicalInk(entry)+'<div><strong>'+entry.ch+' · '+esc(radicalCaption(entry))+'</strong><div class="radical-word-list">'+radicalWords(words)+'</div></div></div>';
}

function wordRadicals(word) {
  const entries = radicalEntries([word]);
  if (!entries.length) return '';
  return '<details class="word-radicals"><summary>Clés du mot</summary>'+
    entries.map(e => '<div class="radical-word-key">'+radicalInk(e)+'<span>'+e.ch+' · '+esc(radicalCaption(e))+'</span></div>').join('')+'</details>';
}

function openRadicalNotebook() {
  carnetPanel='cles';
  switchTab('carnet');
  document.getElementById('radical-collection')?.scrollIntoView?.({block:'start'});
}

function radicalNotebook() {
  const entries=radicalEntries(), groups=radicalGroups(entries);
  const heading='<section class="paper radical-notebook" id="radical-collection"><h3>Ma collection de clés</h3>';
  if (!entries.length) return heading+'<p>Réussis un défi de dialogue pour découvrir les clés de tes premiers mots.</p></section>';
  const count=groups.size+' clé'+(groups.size>1?'s':'')+' · '+entries.length+' caractère'+(entries.length>1?'s':'');
  const rows=[...groups].map(([key,examples])=>{
    const shapes=[...new Set(examples.map(radicalForm))].filter(s=>s!==key.symbol);
    return '<details class="radical-family"><summary><span class="radical-seal" lang="zh-CN">'+key.symbol+'</span><span><strong>'+esc(key.name)+'</strong>'+
      (shapes.length?'<small>Forme rencontrée · '+esc(shapes.join(' / '))+'</small>':'')+'</span><small>'+examples.length+' car.</small></summary>'+
      examples.map(e=>radicalExample(e)).join('')+'</details>';
  }).join('');
  const play=state.xp>=JADE_GAMES.keys.xp && groups.size>=2
    ? '<button onclick="startJadeGame(\'keys\')">Jouer à la chasse aux clés</button>'
    : '<span>La chasse aux clés s’ouvre à '+JADE_GAMES.keys.xp+' XP avec deux clés découvertes.</span>';
  return heading+'<p>Une clé est la partie qui sert à classer un caractère dans le dictionnaire. Ouvre une fiche pour la retrouver dans tes mots.</p>'+
    '<div class="radical-notebook-head"><strong>'+count+'</strong>'+play+'</div>'+rows+'</section>';
}

const RADICAL_SCENE_LINES=[
  'Dans la marge de ton carnet, Mei a laissé une empreinte.',
  'Une petite empreinte marque la page du registre des familles.',
  'Entre deux nombres, tu repères une marque à l’encre verte.',
  'Mei a glissé un papier calque entre les pages du calendrier.',
  'Sous la tasse de thé, un papier porte l’empreinte de Mei.',
  'Une étiquette du marché porte le signe que Mei cherche.',
  'Mei a recopié un signe au dos du plan de la gare.',
  'Un signe à la craie figure dans la marge du cahier d’école.',
  'Mei a entouré un détail dans ses notes sur le quartier.',
  'Sur la dernière page du carnet, l’encre a résisté à la pluie.'
];
let sceneRadicalDiscovery=null;

function noteSceneRadicals(scene, previousKeys, earnedXP) {
  const fresh=[...radicalGroups(radicalEntries(vocab.filter(v=>scene.words.includes(v[0])))).keys()].filter(key=>!previousKeys.has(key));
  const threshold=JADE_GAMES.keys.xp;
  const unlocked=state.xp>=threshold && state.xp-earnedXP<threshold && radicalGroups(radicalEntries()).size>=2;
  sceneRadicalDiscovery={scene,fresh,unlocked,picked:''};
}

function sceneRadicalPuzzle(index) {
  const scene=scenes[index], entries=radicalEntries(radicalVocabulary().filter(v=>scene.words.includes(v[0])));
  if (!entries.length) return null;
  const discovery=sceneRadicalDiscovery?.scene===scene ? sceneRadicalDiscovery : null;
  const priority=e=>(discovery?.fresh.includes(e.key)?4:0)+(RADICAL_INK.includes(e.ch)?2:0)+(e.ch!==e.key.symbol?1:0);
  const candidates=entries.slice().sort((a,b)=>priority(b)-priority(a));
  for (const focus of candidates) {
    if (!RADICAL_INK.includes(focus.ch)) continue;
    const others=entries.filter(e=>e.key!==focus.key && !focus.key.lookalikes.includes(e.ch)).slice(0,2);
    if (!others.length) continue;
    others.splice((index+1)%(others.length+1),0,focus);
    return {focus, choices:others, entries, discovery};
  }
  return {focus:candidates[0], choices:[], entries, discovery};
}

function sceneRadicalCard(index) {
  const puzzle=sceneRadicalPuzzle(index);
  if (!puzzle) return '';
  const {focus,choices,entries,discovery}=puzzle;
  const picked=choices.find(e=>e.ch===discovery?.picked);
  const won=picked===focus;
  const prompt='<p>'+RADICAL_SCENE_LINES[Math.floor(index/6)]+'</p>';
  const choicesHtml=choices.length ? '<p>Quel caractère se classe sous la clé <strong>'+esc(radicalCaption(focus))+'</strong> ?</p>'+
    '<div class="radical-choices">'+choices.map(e=>'<button lang="zh-CN" '+(won?'disabled ':'')+'onclick="answerSceneRadical('+index+',\''+e.ch+'\')">'+e.ch+'</button>').join('')+'</div>'+
    '<div role="status">'+(won?'<strong>Bien vu ! Voici l’empreinte.</strong>'+radicalExample(focus):picked?'Observe encore '+picked.ch+'. Sa clé est « '+esc(picked.key.name)+' ». Tu peux réessayer.':'')+'</div>'
    : '<details><summary>Soulever le calque de Mei</summary>'+radicalExample(focus)+'</details>';
  const keys=radicalGroups(entries);
  const fresh=discovery?.fresh.length||0;
  const unlock=discovery?.unlocked?'<p class="radical-unlock"><strong>La chasse aux clés est débloquée !</strong> <button onclick="startJadeGame(\'keys\')">Jouer avec Mei</button></p>':'';
  return '<section class="scene-radical" aria-label="L’empreinte de Mei"><h3>L’empreinte de Mei</h3>'+prompt+choicesHtml+
    '<details class="scene-key-list"><summary>Les clés de cette scène'+(fresh?' · '+fresh+' nouvelle'+(fresh>1?'s':''):'')+'</summary>'+
    [...keys].map(([key,chars])=>'<p><strong>'+key.symbol+' · '+esc(key.name)+'</strong> — '+chars.map(e=>e.ch).join(' · ')+'</p>').join('')+
    '<button onclick="openRadicalNotebook()">Ouvrir ma collection</button></details>'+unlock+'</section>';
}

function answerSceneRadical(index,ch) {
  if (tab!=='aventure'||activeSceneIndex()!==index) return;
  const replay=state.sceneReplay;
  if (replay ? replay.result!=='won' : !state.completed.includes(index)) return;
  const puzzle=sceneRadicalPuzzle(index);
  if (!puzzle || !puzzle.choices.some(e=>e.ch===ch) || puzzle.discovery?.picked===puzzle.focus.ch) return;
  if (!puzzle.discovery) sceneRadicalDiscovery={scene:scenes[index],fresh:[],picked:''};
  sceneRadicalDiscovery.picked=ch;
  const panel=document.getElementById('scene-key-puzzle');
  if (panel) panel.innerHTML=sceneRadicalCard(index);
}

function radicalRoundChoices(target, entries, reverse) {
  const seen=new Set([target.key.id]), clear=[], fallback=[];
  for (const entry of shuffleWords(entries)) {
    if (seen.has(entry.key.id)) continue;
    const ch=reverse?entry.ch:target.ch, key=reverse?target.key:entry.key;
    if (RADICAL_ALTERNATIVES[ch]?.includes(key.id)) continue;
    if (key.lookalikes.includes(ch)) {fallback.push(entry);continue}
    clear.push(entry);seen.add(entry.key.id);
    if (clear.length===2) break;
  }
  for (const entry of fallback) {
    if (clear.length===2) break;
    if (!seen.has(entry.key.id)) {clear.push(entry);seen.add(entry.key.id)}
  }
  return clear.length?shuffleWords([target,...clear]):[];
}

function buildRadicalRounds(words, missedChars) {
  const entries=radicalEntries(words);
  const targets=shuffleWords(entries.filter(e=>!missedChars||missedChars.has(e.ch)));
  const groups=radicalGroups(targets);
  const ordered=[...groups.values()].map(items=>items[0]).concat([...groups.values()].flatMap(items=>items.slice(1)));
  const rounds=[];
  for (const target of ordered) {
    let reverse=rounds.length%2===1;
    let choices=radicalRoundChoices(target,entries,reverse);
    if (!choices.length) {reverse=!reverse;choices=radicalRoundChoices(target,entries,reverse)}
    if (!choices.length) continue;
    const word=target.words[0];
    rounds.push({word,target,reverse,choices});
    if (rounds.length===5) break;
  }
  return rounds;
}

function radicalQuestion(round) {
  const {target,reverse,word}=round;
  const face=reverse?target.form:target.ch;
  const side=target.key.id===163?' · à droite':target.key.id===170?' · à gauche':'';
  const clue=reverse?'Clé « '+esc(target.key.name)+' »'+side:'Dans ton mot '+word.slice(0,3).filter(Boolean).map(esc).join(' · ');
  const ask=reverse?'Quel caractère se range sous cette clé ?':'Quel tiroir du carnet contient ce caractère ?';
  return '<div class="radical-prompt"><div class="radical-large" lang="zh-CN">'+esc(face)+'</div><div><p>'+clue+'</p><strong>'+ask+'</strong></div></div>'+
    '<div class="radical-choices">'+round.choices.map((e,i)=>'<button onclick="answerRadicalGame('+i+')"><span lang="zh-CN">'+
      esc(reverse?e.ch:e.key.symbol)+'</span>'+(reverse?'':'<small>'+esc(e.key.name)+'</small>')+'</button>').join('')+'</div>';
}

function answerRadicalGame(i) {
  const g=jadeGame;
  if (tab!=='campagne'||bookSection!=='jeux'||g?.kind!=='keys'||g.feedback) return;
  const round=g.rounds[g.index], choice=round?.choices[i];
  if (!choice) return;
  const ok=choice.ch===round.target.ch;
  const detail=ok?'Ce sceau est bien rangé.':'Tu avais choisi '+(round.reverse?choice.ch:choice.key.symbol+' (« '+choice.key.name+' »)')+'.';
  finishGameAnswer(ok,false,detail);
}
