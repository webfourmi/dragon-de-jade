/* Jeux du Livre I. Les cartes, les solutions et les distracteurs viennent du carnet du joueur. */
const JADE_GAMES = {
  pairs:  {title:'Les paires de jade', xp:10, min:2, art:'assets/dragon-icon.svg', description:'Retourne les cartes pour associer chaque mot chinois à sa traduction.'},
  echo:   {title:'Les échos de Lóng', xp:40, min:2, art:'assets/long.webp', description:'Écoute un mot en mandarin et retrouve son sens.'},
  brush:  {title:'Le pinceau de Mei', xp:80, min:1, art:'assets/mei.webp', description:'Recompose un mot avec des caractères ou écris-le au clavier.'},
  envoy:  {title:'Le messager de Chen', xp:120, min:1, art:'assets/maitre-chen.webp', description:'Pars d’un indice en français et prononce le mot chinois.'}
};
let jadeGame = null;
let gameMic = null;

function gameVocabulary() {
  const known = new Set(state.words);
  return vocab.filter(entry => known.has(entry[0]));
}

function senseKeys(entry) {
  return entry[2].toLocaleLowerCase('fr').split(/[,;/]/).map(s => s.trim()).filter(Boolean);
}
function shareSense(a,b) {
  const keys = senseKeys(b);
  return senseKeys(a).some(key => keys.includes(key));
}
function sameGameClue(a,b) {
  const first=senseKeys(a), second=senseKeys(b);
  return first.length===second.length && first.every(key=>second.includes(key));
}
function differentSounds(a,b) {
  const keys = v => v[1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f\s'’·-]/g,'').split('/');
  const other = keys(b);
  return keys(a).every(k => !other.includes(k));
}
function listenOptions(target,pool) {
  const choices = [target];
  for (const v of shuffleWords(pool)) {
    if (choices.every(w => !shareSense(w,v)) && differentSounds(target,v)) choices.push(v);
    if (choices.length === 3) break;
  }
  return shuffleWords(choices);
}

function hasMandarinPlayback() {
  return !!(window.speechSynthesis && window.SpeechSynthesisUtterance && mandarinVoice());
}
function hasGameMic() {
  return !!(window.isSecureContext && (window.SpeechRecognition || window.webkitSpeechRecognition));
}
function stopJadeAudio() {
  audioRequest++;
  clearTimeout(audioTimer);
  activeUtterance = null;
  try { window.speechSynthesis?.cancel(); } catch {}
}
function stopGameMic() {
  const r = gameMic;
  if (!r) return;
  gameMic = null;
  r.onstart = r.onspeechend = r.onresult = r.onerror = r.onend = null;
  try { r.abort(); } catch {}
}

function gameMenu() {
  const pool = gameVocabulary();
  const games = Object.entries(JADE_GAMES);
  const next = games.find(([,game]) => state.xp < game.xp);
  const nextText = next ? `Encore <strong>${next[1].xp-state.xp} XP</strong> pour ouvrir « ${next[1].title} ».` : 'Les quatre jeux sont débloqués.';
  return `<section class="jade-lobby"><h2>Jeux de révision</h2>
    <p class="game-xp"><strong>${state.xp} XP</strong> · ${nextText}</p>
    <p>Les XP ouvrent les jeux et restent sur ta fiche. Tu y retrouves les mots de ton carnet.</p>
    <div class="jade-game-grid">${games.map(([id,game]) => {
      const locked = state.xp < game.xp;
      const ready = pool.length >= game.min;
      const label = locked ? `À ${game.xp} XP` : ready ? 'Jouer' : `${game.min} mot${game.min>1?'s':''} à apprendre`;
      return `<article class="jade-game-card"><img src="${game.art}" alt=""><div><small>${game.xp} XP · ${locked?'Verrouillé':'Débloqué'}</small>
        <h3>${game.title}</h3><p>${game.description}</p><button${locked || !ready ? ' disabled' : ' class="primary"'} onclick="startJadeGame('${id}')" aria-label="${label} · ${game.title}">${label}</button></div></article>`;
    }).join('')}</div><p id="game-notice" role="status"></p></section>`;
}

function startJadeGame(kind, missedOnly = false) {
  const def = JADE_GAMES[kind];
  if (!def || state.xp < def.xp) return;
  const pool = gameVocabulary();
  if (pool.length < def.min) return;
  const missed = missedOnly && jadeGame?.kind === kind ? new Set(jadeGame.answers.filter(a=>!a.ok).map(a=>a.word[0])) : null;
  const targets = shuffleWords(pool.filter(v => !missed || missed.has(v[0])));
  const game = {kind, rounds:[], index:0, answers:[], feedback:null, message:'', pool, pinyinMode:kind==='echo' && !hasMandarinPlayback()};
  if (kind === 'pairs') {
    for (const v of targets) {
      if (game.rounds.every(w => !shareSense(w,v))) game.rounds.push(v);
      if (game.rounds.length === 4) break;
    }
    if (game.rounds.length >= 2) {
      game.cards = shuffleWords(game.rounds.flatMap((v,i)=>[{pair:i,side:0},{pair:i,side:1}]));
      game.open = []; game.matched = []; game.moves = 0;
    }
  } else {
    for (const v of targets) {
      const choices = kind==='echo' ? listenOptions(v,pool) : [];
      if (kind==='echo' && choices.length<2) continue;
      game.rounds.push({word:v,choices});
      if (game.rounds.length===5) break;
    }
  }
  if (!game.rounds.length || (kind==='pairs' && !game.cards)) {
    const notice = document.getElementById('game-notice');
    if (notice) notice.textContent = 'Ce jeu attend deux mots aux indices bien distincts. Apprends encore un mot dans l’aventure.';
    return;
  }
  stopGameMic();
  stopJadeAudio();
  jadeGame = game;
  bookSection = 'jeux';
  tab = 'campagne';
  if (kind !== 'pairs') prepareGameRound();
  render();
  window.scrollTo(0,0);
}
function leaveJadeGame() {
  stopGameMic();
  stopJadeAudio();
  jadeGame = null;
  bookSection = 'jeux';
  render();
  window.scrollTo(0,0);
}

function prepareGameRound() {
  const g = jadeGame;
  g.feedback = null;
  g.message = '';
  g.hint = false;
  g.revealed = false;
  g.tries = 0;
  g.keyboard = false;
  g.draft = '';
  g.chosen = [];
  const round = g.rounds[g.index];
  if (g.kind !== 'brush' || !round) return;
  const chars = [...round.word[0]];
  const extras = [...new Set(g.pool.flatMap(v=>[...v[0]]))].filter(c=>!chars.includes(c) && hasChinese(c));
  g.tiles = shuffleWords([...chars,...shuffleWords(extras).slice(0,3)]);
}

function turnJadeCard(index) {
  const g = jadeGame;
  if (g?.kind !== 'pairs' || !g.cards[index] || g.open.length===2 || g.open.includes(index) || g.matched.includes(g.cards[index].pair)) return;
  g.open.push(index);
  g.message = '';
  if (g.open.length===2) {
    g.moves++;
    const [a,b] = g.open.map(n=>g.cards[n]);
    if (a.pair === b.pair) {
      g.matched.push(a.pair);
      const [zh,py,fr] = g.rounds[a.pair];
      g.message = `Paire retrouvée · ${zh} (${py}), ${fr}.`;
      g.open = [];
    } else g.message = 'Ces cartes forment deux paires différentes. Mémorise leur place.';
  }
  render();
}
function hideJadeCards() {
  if (jadeGame?.kind !== 'pairs' || jadeGame.open.length !== 2) return;
  jadeGame.open = [];
  jadeGame.message = '';
  render();
}
function memoryBoard() {
  const g = jadeGame;
  return `<p>Retrouve ${g.rounds.length} paires, un mot chinois et son sens en français.</p>
    <p><strong>${g.matched.length} / ${g.rounds.length} paires</strong> · ${g.moves} coup${g.moves===1?'':'s'}</p>
    <div class="memory-board">${g.cards.map((card,i) => {
      const matched = g.matched.includes(card.pair);
      const visible = matched || g.open.includes(i);
      const entry = g.rounds[card.pair];
      const face = card.side === 0 ? entry[0] : entry[2];
      const label = visible ? face+(matched?' · paire retrouvée':'') : 'Retourner la carte '+(i+1);
      return `<button class="memory-card ${matched?'matched':visible?'turned':'back'} ${visible && card.side===0?'han-card':''}" aria-label="${esc(label)}" ${matched||g.open.includes(i)||g.open.length===2?'disabled':''} onclick="turnJadeCard(${i})">
        ${visible ? esc(face) : '<span aria-hidden="true">◇</span>'}</button>`;
    }).join('')}</div><p role="status">${esc(g.message)}</p>
    ${g.open.length===2 ? '<button class="primary" onclick="hideJadeCards()">Retourner les deux cartes</button>' : ''}`;
}

function gameSpeak(text) {
  stopGameMic();
  speak(text);
}
function listenGameWord() {
  if (jadeGame && jadeGame.kind !== 'pairs' && jadeGame.rounds[jadeGame.index]) gameSpeak(jadeGame.rounds[jadeGame.index].word[0]);
}
function finishGameAnswer(ok, selfRated=false, detail='') {
  const g = jadeGame;
  if (!g || g.kind==='pairs' || g.feedback || !g.rounds[g.index]) return;
  stopGameMic();
  const word = g.rounds[g.index].word;
  g.feedback = {word,ok,selfRated,detail};
  g.answers.push(g.feedback);
  rateWord(word[0],ok);
  render();
}
function nextGameRound() {
  const g = jadeGame;
  if (!g || !g.feedback || g.index >= g.rounds.length) return;
  stopGameMic();
  stopJadeAudio();
  g.index++;
  prepareGameRound();
  render();
}
function answerEcho(index) {
  const g = jadeGame;
  if (g?.kind !== 'echo' || g.feedback) return;
  const round = g.rounds[g.index];
  const guess = round?.choices[index];
  if (guess) finishGameAnswer(guess[0]===round.word[0]);
}
function switchEchoMode(usePinyin) {
  const g=jadeGame;
  if (g?.kind!=='echo' || g.feedback) return;
  stopJadeAudio();
  const voice=hasMandarinPlayback();
  g.pinyinMode=usePinyin || !voice;
  g.message=!usePinyin && !voice ? 'La voix en mandarin est encore indisponible sur cet appareil.' : '';
  render();
  if (!g.pinyinMode) listenGameWord();
}
function echoQuestion(round) {
  const g = jadeGame;
  const prompt = g.pinyinMode
    ? `<p class="game-word">${esc(round.word[1])}</p><p>Retrouve le sens de ce pinyin.</p>${hasMandarinPlayback()?'':'<p class="small muted">Aucune voix en mandarin détectée. Cette partie se joue en pinyin.</p>'}<button onclick="switchEchoMode(false)">Revenir à l’écoute</button>`
    : '<p>Quel mot entends-tu ? Choisis son sens.</p><div class="controls"><button class="primary" onclick="listenGameWord()">🔊 Écouter le mot</button><button onclick="switchEchoMode(true)">Passer au pinyin</button></div>';
  return prompt+'<p role="status">'+esc(g.message)+'</p><div class="choices">'+round.choices.map((v,i)=>`<button onclick="answerEcho(${i})">${esc(v[2])}</button>`).join('')+'</div>';
}

function chooseGameTile(i) {
  const g = jadeGame;
  if (g?.kind !== 'brush' || g.feedback || g.keyboard || !g.tiles[i] || g.chosen.includes(i)) return;
  g.chosen.push(i);
  g.draft = g.chosen.map(index=>g.tiles[index]).join('');
  render();
}
function undoGameTile() {
  const g = jadeGame;
  if (g?.kind !== 'brush' || g.feedback || g.keyboard) return;
  g.chosen.pop();
  g.draft = g.chosen.map(i=>g.tiles[i]).join('');
  render();
}
function toggleGameKeyboard() {
  const g=jadeGame;
  if (g?.kind !== 'brush' || g.feedback) return;
  g.keyboard = !g.keyboard;
  g.chosen = [];
  g.draft = '';
  render();
  if (g.keyboard) document.getElementById('game-writing-input')?.focus();
}
function writtenGameAnswer() {
  const g = jadeGame;
  if (g?.kind !== 'brush' || g.feedback) return;
  const typed = g.draft.normalize('NFKC').replace(/\s/g,'');
  if (!typed) return;
  const target = g.rounds[g.index].word;
  const correct = g.pool.some(v=>v[0]===typed && sameGameClue(v,target));
  finishGameAnswer(correct,false,'Ta réponse · '+typed);
}
function brushQuestion(word) {
  const g = jadeGame;
  const input = g.keyboard
    ? `<label for="game-writing-input">Ta réponse en chinois</label><input type="text" id="game-writing-input" lang="zh-CN" autocomplete="off" value="${esc(g.draft)}" oninput="jadeGame.draft=this.value;document.getElementById('check-game-writing').disabled=!this.value.trim()" onkeydown="if(event.key==='Enter'&&!event.isComposing)writtenGameAnswer()">`
    : `<div class="brush-answer" aria-live="polite">${g.draft?esc(g.draft):'<small>Ton mot</small>'}</div>
       <div class="brush-tiles">${g.tiles.map((ch,i)=>`<button lang="zh-CN" ${g.chosen.includes(i)?'disabled':''} onclick="chooseGameTile(${i})">${esc(ch)}</button>`).join('')}</div>
       <button onclick="undoGameTile()" ${g.chosen.length?'':'disabled'}>Effacer le dernier caractère</button>`;
  return `<p>Comment écris-tu ce mot en chinois ?</p><p class="game-word">${esc(word[2])}</p>
    ${input}<div class="controls"><button class="primary" id="check-game-writing" onclick="writtenGameAnswer()" ${g.draft.trim()?'':'disabled'}>Vérifier mon mot</button>
    <button onclick="toggleGameKeyboard()">${g.keyboard?'Utiliser les caractères proposés':'Utiliser le clavier chinois'}</button></div>
    ${g.hint?`<p>Indice · ${esc(word[1])}</p>`:'<button onclick="jadeGame.hint=true;render()">Indice en pinyin</button>'}`;
}

function revealEnvoy() {
  if (jadeGame?.kind!=='envoy' || jadeGame.feedback) return;
  stopGameMic();
  jadeGame.revealed=true;
  jadeGame.message='';
  render();
}
function startEnvoyMic() {
  const g = jadeGame;
  if (tab!=='campagne' || bookSection!=='jeux' || g?.kind!=='envoy' || g.feedback || g.revealed || gameMic || !hasGameMic()) return;
  stopJadeAudio();
  const round = g.rounds[g.index];
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let r;
  try {
    r = new Recognition();
    gameMic = r;
    r.lang='zh-CN'; r.maxAlternatives=5; r.interimResults=false;
    const current = () => gameMic===r && jadeGame===g && g.rounds[g.index]===round;
    r.onspeechend=()=>{ if (current()) {try {r.stop();} catch {}} };
    r.onresult=e=>{
      if (!current()) return;
      const result=e.results[e.resultIndex ?? 0];
      if (!result || result.isFinal===false) return;
      const alts=Array.from(result).map(item=>item.transcript.trim()).filter(Boolean);
      if (!alts.length) return;
      const acceptable=g.pool.filter(v=>sameGameClue(v,round.word)).map(v=>v[0]);
      const match=speechMatchAny(alts,acceptable);
      stopGameMic();
      if (match.ok) { finishGameAnswer(true,false,'Entendu · '+match.heard); return; }
      g.tries++;
      if (g.tries>=3) { finishGameAnswer(false,false,'Entendu · '+alts[0]); return; }
      g.message='Entendu · '+alts[0]+'. Essaie à nouveau ('+g.tries+'/3).';
      render();
    };
    r.onerror=e=>{
      if (!current()) return;
      stopGameMic();
      const reason=e.error==='not-allowed'?'Microphone refusé.':e.error==='no-speech'?'Aucune voix entendue.':'Reconnaissance vocale indisponible.';
      g.message=reason+' Tu peux réessayer ou t’autoévaluer.';
      render();
    };
    r.onend=()=>{
      if (!current()) return;
      gameMic=null;
      g.message='Aucune réponse enregistrée. Réessaie ou révèle le modèle.';
      render();
    };
    g.message='Le microphone écoute. Prononce le mot en mandarin.';
    r.start();
  } catch {
    stopGameMic();
    g.message='Le microphone ne démarre pas. Tu peux t’autoévaluer.';
  }
  render();
}
function envoyQuestion(word) {
  const g=jadeGame;
  const prompt=`<p>Comment le dirais-tu en mandarin ?</p><p class="game-word">${esc(word[2])}</p>`;
  if (g.revealed) return prompt+`<p class="game-hanzi" lang="zh-CN">${esc(word[0])}</p><p>${esc(word[1])}</p>
    ${hasMandarinPlayback()?'<button onclick="listenGameWord()">🔊 Écouter le modèle</button>':''}
    <p>Compare avec le mot que tu as prononcé.</p><div class="controls"><button onclick="finishGameAnswer(false,true)">À retravailler</button><button class="primary" onclick="finishGameAnswer(true,true)">Je l’ai dit</button></div>`;
  return prompt + (hasGameMic()
    ? `<button class="primary" onclick="${gameMic?'stopGameMic();jadeGame.message=\'Écoute arrêtée.\';render()':'startEnvoyMic()'}">${gameMic?'Arrêter le micro':'🎤 Parler en mandarin'}</button>`
    : '<p class="muted">Le micro est indisponible ici. Prononce le mot à voix haute, puis révèle le modèle.</p>')
    + '<p role="status">'+esc(g.message)+'</p><button onclick="revealEnvoy()">Révéler le modèle et m’autoévaluer</button>';
}

function gameWordModel(word) {
  return `<div class="game-model">${vocabIllustration(word)}<span><strong lang="zh-CN">${esc(word[0])}</strong> ${esc(word[1])}<br>${esc(word[2])}</span></div>`;
}
function roundFeedback() {
  const g=jadeGame, answer=g.feedback;
  const mark=answer.selfRated ? (answer.ok?'Autoévaluation · réussi':'Autoévaluation · à revoir') : (answer.ok?'✓ Bonne réponse !':'À revoir');
  return `<div role="status"><strong>${mark}</strong>${answer.detail?'<p>'+esc(answer.detail)+'</p>':''}${gameWordModel(answer.word)}</div>
    <div class="controls">${hasMandarinPlayback()?'<button onclick="listenGameWord()">🔊 Écouter le mot</button>':''}
    <button class="primary" onclick="nextGameRound()">${g.index+1===g.rounds.length?'Voir le bilan':'Mot suivant →'}</button></div>`;
}
function gameSummary() {
  const g=jadeGame, memory=g.kind==='pairs';
  const missed=g.answers.filter(a=>!a.ok);
  const words=memory ? g.rounds : missed.map(a=>a.word);
  const success=memory ? `${g.matched.length} paires retrouvées en ${g.moves} coups.` : `${g.answers.length-missed.length} / ${g.answers.length} mots réussis.`;
  const self=g.answers.filter(a=>a.selfRated).length;
  return `<h2>Partie terminée</h2><p class="game-score">${success}</p>${self?`<p>${self} réponse${self>1?'s':''} en autoévaluation.</p>`:''}
    ${words.length?`<h3>${memory?'Les mots des paires':'Tes mots à revoir'}</h3>${words.map(gameWordModel).join('')}`:''}
    <div class="controls">${missed.length?`<button class="primary" onclick="startJadeGame('${g.kind}',true)">Rejouer les mots à revoir</button>`:''}
    <button onclick="startJadeGame('${g.kind}')">Nouvelle partie</button><button onclick="leaveJadeGame()">Retour aux jeux</button></div>`;
}
function gamePage() {
  const g=jadeGame;
  const finished=g.kind==='pairs' ? g.matched.length===g.rounds.length : g.index>=g.rounds.length;
  let body;
  if (finished) body=gameSummary();
  else if (g.kind==='pairs') body=memoryBoard();
  else {
    const round=g.rounds[g.index];
    const question=g.feedback?roundFeedback():g.kind==='echo'?echoQuestion(round):g.kind==='brush'?brushQuestion(round.word):envoyQuestion(round.word);
    body=`<p class="label">Mot ${g.index+1} sur ${g.rounds.length}</p>${question}`;
  }
  return `<main class="page jade-play"><button class="game-exit" onclick="leaveJadeGame()">← Jeux de révision</button>
    <h1>${JADE_GAMES[g.kind].title}</h1><section class="paper">${body}<p class="audio-status small muted" role="status"></p></section></main>`;
}
