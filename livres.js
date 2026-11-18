/* Sommaire du Livre I et rejeu des scènes déjà parcourues. */
const REPLAY_XP = 2;
let bookSection = 'parcours';
let openBookEpisode = 0;

function visitedBookScenes() {
  return new Set([...state.completed, ...state.skipped, ...(state.clueScenes || [])]
    .filter(index => Number.isInteger(index) && index >= 0 && index < scenes.length));
}

function restoreBookProgress() {
  // Les anciens rejeux enlevaient les scènes du parcours. Les indices et le registre des XP en gardent la trace.
  if (Array.isArray(state.replayRewards) && state.replayRewards.length) {
    const completed = new Set(state.completed);
    for (const i of state.replayRewards) if (Number.isInteger(i) && scenes[i]) completed.add(i);
    state.completed = [...completed].sort((a,b) => a-b);
    const visited = visitedBookScenes();
    state.skipped = [...visited].filter(i => !completed.has(i)).sort((a,b) => a-b);
    const latest = Math.max(-1, ...visited);
    if (state.scene < latest) state.scene = latest + 1;
    delete state.replayRewards;
    save();
  }
  const replay = state.sceneReplay;
  if (!replay) return;
  const visited = visitedBookScenes();
  if (!Array.isArray(replay.queue) || !replay.queue.length || replay.queue.length > 6
      || !Number.isInteger(replay.position) || replay.position < 0 || replay.position >= replay.queue.length
      || !replay.queue.every((i,n) => visited.has(i) && episodeOfScene(i) === episodeOfScene(replay.queue[0]) && (!n || i > replay.queue[n-1]))
      || !['', 'won', 'passed'].includes(replay.result) || !Number.isInteger(replay.attempts)
      || replay.attempts < 0 || replay.attempts > 3) {
    delete state.sceneReplay;
    save();
    return;
  }
  const indices=scenes[replay.queue[replay.position]].options.map((_,i)=>i);
  if (!Array.isArray(replay.order) || replay.order.length!==indices.length || !indices.every(i=>replay.order.includes(i))) {
    replay.order=shuffleWords(indices);
    save();
  }
}

function activeSceneIndex() {
  const session = state.sceneReplay;
  return session ? session.queue[session.position] : Math.min(state.scene, scenes.length - 1);
}

function stopAdventureMic() {
  const mic = activeRecognition;
  if (!mic) return;
  activeRecognition = null;
  mic.onstart = mic.onsoundstart = mic.onresult = mic.onnomatch = mic.onerror = mic.onspeechend = mic.onend = null;
  try { mic.abort(); } catch {}
}

function resetSceneInput() {
  stopAdventureMic();
  stopJadeAudio();
  selected = '';
  speechText = '';
  speechAlternatives = [];
  micStatus = '';
  answerFeedback = '';
  replayMenuOpen = false;
}

function episodeSeenScenes(ep, visited = visitedBookScenes()) {
  return Array.from({length:6}, (_,n) => (ep-1)*6+n).filter(i => visited.has(i));
}

function replayEpisode(ep) {
  if (!Number.isInteger(ep) || ep < 1 || ep > Math.ceil(scenes.length/6)) return;
  startSceneReplay(episodeSeenScenes(ep));
}

function replayScene(index) {
  if (visitedBookScenes().has(index)) startSceneReplay([index]);
}

function startSceneReplay(queue) {
  const visited=visitedBookScenes();
  if (!queue.length || queue.some(i=>!visited.has(i))) return;
  resetSceneInput();
  stopGameMic();
  state.sceneReplay = {queue, position:0, attempts:0, result:'', order:replayOptionOrder(queue[0])};
  openBookEpisode = episodeOfScene(queue[0]);
  introOverride = false;
  tab = 'aventure';
  save();
  render();
  window.scrollTo(0,0);
}

function leaveSceneReplay(destination = 'campagne') {
  resetSceneInput();
  delete state.sceneReplay;
  bookSection = 'parcours';
  introOverride = false;
  tab = destination;
  save();
  render();
  window.scrollTo(0,0);
}

function advanceSceneReplay() {
  const session = state.sceneReplay;
  if (!session || !session.result) return;
  if (session.position + 1 >= session.queue.length) { leaveSceneReplay(); return; }
  resetSceneInput();
  session.position++;
  session.order = replayOptionOrder(session.queue[session.position]);
  session.attempts = 0;
  session.result = '';
  save();
  render();
  window.scrollTo(0,0);
}

function replayOptionOrder(index) {
  return shuffleWords(scenes[index].options.map((_,i)=>i));
}

function concludeReplayAnswer(good, spoken, alternatives, index) {
  const session = state.sceneReplay;
  if (!session || session.result) return;
  if (good) {
    session.result = 'won';
    state.xp += REPLAY_XP;
    learnSceneWords(scenes[index]);
    recordLesson();
    if (spoken) state.speechSuccess++;
    answerFeedback = spoken ? esc(speechSuccessNote(alternatives,index)) : '';
  } else {
    session.attempts++;
    if (session.attempts >= 3) session.result = 'passed';
    else answerFeedback = '<div class="warning">Essaie encore. Il te reste ' + (3-session.attempts) + ' essai' + (session.attempts === 1 ? 's' : '') + '.</div>';
  }
  if (session.result) stopAdventureMic();
  save();
  render();
}

function replaySceneHeader(session) {
  const ordinal = session.queue.length > 1 ? ` · ${session.position+1}/${session.queue.length}` : '';
  return `<div class="replay-strip"><strong>Rejeu${ordinal} · ${REPLAY_XP} XP par réussite</strong><button onclick="leaveSceneReplay()">Quitter le rejeu</button></div>`;
}

function replaySceneResult(session) {
  if (!session.result) return '<button class="primary" onclick="validate()">Valider ma réponse</button>';
  const next = session.position + 1 < session.queue.length ? 'Rejouer la scène suivante →' : 'Retour aux Livres';
  const note = session.result === 'won' ? `✓ Rejeu réussi · +${REPLAY_XP} XP` : 'Trois essais effectués · 0 XP';
  return `<div class="toast" role="status">${note}</div><button class="primary" onclick="advanceSceneReplay()">${next}</button>`;
}

function episodeReplayMenu() {
  const visited = visitedBookScenes();
  const episodes = [...new Set([...visited].map(episodeOfScene))].sort((a,b) => a-b);
  if (!episodes.length) return '';
  return '<div class="replay-mini"><button class="replay-icon" onclick="toggleReplayMenu()" title="Rejouer un épisode" aria-label="Rejouer un épisode" aria-expanded="'+replayMenuOpen+'">↻</button>'
    + (replayMenuOpen ? '<div class="replay-options">'+episodes.map(ep=>`<button onclick="replayEpisode(${ep})">Épisode ${ep}</button>`).join('')+'</div>' : '')+'</div>';
}

function selectBookSection(section) {
  stopGameMic();
  stopJadeAudio();
  bookSection = section;
  render();
  window.scrollTo(0,0);
}

function bookEpisode(ep, visited, featured) {
  const start = (ep-1)*6;
  const chapter = scenes.slice(start,start+6);
  const done = episodeSeenScenes(ep,visited);
  const title = EP_NEXT[ep]?.title || chapter[0].title;
  const hasCurrent = !visited.has(state.scene) && episodeOfScene(state.scene) === ep && epStarted(ep);
  const status = done.length === chapter.length ? 'Parcouru' : done.length || hasCurrent ? 'En cours' : 'À découvrir';
  const replay = done.length === chapter.length ? 'Rejouer l’épisode' : `Rejouer ${done.length === 1 ? 'la scène débloquée' : 'les '+done.length+' scènes débloquées'}`;
  const rows = chapter.map((scene,n) => {
    const index = start+n;
    const seen = visited.has(index);
    const current = index === state.scene && hasCurrent;
    const label = seen ? (state.completed.includes(index) ? 'Réussie' : state.skipped.includes(index) ? 'Passée' : 'Parcourue') : current ? 'En cours' : 'Verrouillée';
    const action = seen ? `<button onclick="replayScene(${index})" aria-label="Rejouer la scène ${n+1} de l’épisode ${ep}">↻ Rejouer</button>`
      : current ? '<button onclick="leaveSceneReplay(\'aventure\')">Continuer →</button>' : '<span class="book-lock" aria-hidden="true">🔒</span>';
    return `<li><span><small>Scène ${n+1} · ${label}</small><strong>${esc(scene.title)}</strong></span>${action}</li>`;
  }).join('');
  return `<details class="book-episode" name="livre-un"${ep === featured ? ' open' : ''} ontoggle="if(this.open)openBookEpisode=${ep}">
    <summary><span><small>Épisode ${ep}</small><strong>${esc(title)}</strong></span><span class="episode-count">${status} · ${done.length}/${chapter.length}</span></summary>
    <div class="book-chapter-body">${done.length ? `<button class="chapter-replay" onclick="replayEpisode(${ep})">↻ ${replay}</button>` : ''}
    <ol class="book-scenes">${rows}</ol></div></details>`;
}

function bookJourney() {
  const visited = visitedBookScenes();
  const count = Math.ceil(scenes.length/6);
  const currentEp = Math.min(count,episodeOfScene(state.scene));
  const featured = openBookEpisode || currentEp;
  const resume = state.introSeen || state.scene > 0 ? 'Reprendre l’aventure' : 'Commencer l’aventure';
  return `<section class="book-journey"><h2>Épisodes et scènes</h2>
    <p>${visited.size} / ${scenes.length} scènes parcourues · ${REPLAY_XP} XP par scène rejouée et réussie.</p>
    <div class="controls"><button class="primary" onclick="leaveSceneReplay('aventure')">${resume}</button>
    ${state.sceneReplay ? '<button onclick="switchTab(\'aventure\')">Poursuivre mon rejeu</button>' : ''}</div>
    ${Array.from({length:count},(_,n)=>bookEpisode(n+1,visited,featured)).join('')}</section>`;
}
