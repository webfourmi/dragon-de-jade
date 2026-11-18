const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {createHash}=require('node:crypto');
const episodeCount=10,sceneCount=60,wordCount=251;
const allDeductions=Array.from({length:episodeCount},(_,i)=>i+1);
const order=[...fs.readFileSync('index.html','utf8').matchAll(/<script src="([^"?]+)\?/g)].map(m=>m[1]);
function boot(progress={}){
 const saved=new Map([['dragonjade-v02',JSON.stringify(progress)]]),nodes=new Map();
 const el=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',value:'',hidden:false,style:{},classList:{toggle(){}},addEventListener(){},appendChild(){},remove(){},setAttribute(){}});return nodes.get(id)};
 const ctx=vm.createContext({console,Date,Math,JSON,URL,Blob,setTimeout:()=>0,clearTimeout(){},confirm:()=>true,alert(){},navigator:{},window:{scrollTo(){},matchMedia:()=>({matches:false})},document:{querySelector:el,querySelectorAll:()=>[],getElementById:el,createElement:el,body:el('body')},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)}});
 for(const file of order)vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
 return {run:s=>vm.runInContext(s,ctx),saved,nodes};
}
function mockMicrophone(game){
 game.run(`window.isSecureContext=true;
 const voicePart=(isFinal,...phrases)=>Object.assign(phrases.map(transcript=>({transcript})),{isFinal});
 window.SpeechRecognition=class{
  start(){window.lastMic=this}
  stop(){this.stopRequested=true}
  abort(){this.aborted=true}
 };`);
}
const game=boot({name:'Test sauvegarde',xp:37,scene:1,completed:[0],words:['你好'],introSeen:true,chars:[],reviewSelected:[]});
assert.equal(game.run('state.xp'),37);assert.equal(game.run('state.name'),'Test sauvegarde');
assert.equal(game.run('scenes.length'),sceneCount);assert.equal(game.run('vocab.length'),wordCount);
game.run('eqState()');assert(game.run('state.clueScenes.includes(0)'));
const mappings=JSON.parse(game.run('JSON.stringify(SCENE_PLACES)'));
const places=JSON.parse(game.run('JSON.stringify(PLACE_ART)'));
assert.equal(mappings.length,sceneCount);
assert.deepEqual([...new Set(mappings.flat())].sort(),Object.keys(places).sort());
assert.deepEqual(fs.readdirSync('assets/lieux').sort(),Object.keys(places).map(id=>id+'.webp').sort());
const imageHashes=Object.keys(places).map(id=>createHash('sha256').update(fs.readFileSync('assets/lieux/'+id+'.webp')).digest('hex'));
assert.equal(new Set(imageHashes).size,19);
const earlyAtlas=game.run('atlas()');
assert(earlyAtlas.includes('rue-des-lanternes.webp') && earlyAtlas.includes('boutique-de-chen.webp'));
assert(!earlyAtlas.includes('maison-de-the.webp') && !earlyAtlas.includes('cinema-du-quartier.webp'));
const skippedPlace=boot({introSeen:true,skipped:[17]});
assert(skippedPlace.run('atlas()').includes('etal-des-cartes.webp'));
const beforeCinema=Array.from({length:52},(_,i)=>i);
const oldSave=boot({introSeen:true,scene:1,completed:[0],clueScenes:beforeCinema});
assert(!oldSave.run('atlas()').includes('cinema-du-quartier.webp'));
oldSave.run('eqSceneDone(52);atlasEpisode="9";atlasSearch="cinema";renderAtlasDiscoveries()');
const memory=oldSave.nodes.get('atlas-places').innerHTML;
assert(memory.includes('cinema-du-quartier.webp') && memory.includes('Souvenir de la voisine'));
assert(!memory.includes('salon-de-la-voisine.webp'));
oldSave.run('atlasEpisode="8";atlasSearch="";renderAtlasDiscoveries()');
const school=oldSave.nodes.get('atlas-places').innerHTML;
assert.equal((school.match(/class="place-card"/g)||[]).length,2);
assert(school.includes('cour-de-lecole.webp') && school.includes('salle-de-classe.webp'));
// Render every new scene and tab using real app code, not extracted functions.
for(let i=0;i<sceneCount;i++){
 game.run(`state.scene=${i};state.introSeen=true;epMarkStarted(${Math.floor(i/6)+1});state.deduced=${JSON.stringify(allDeductions)};eqDed=null;tab='aventure';render()`);
 const markup=game.nodes.get('#app').innerHTML;
 assert(markup.includes('Scène '+(i%6+1)+'/6'));
 assert(mappings[i].length>0 && markup.includes('<header class="scene-place">'));
 for(const id of mappings[i]){
  assert(places[id].alt && markup.includes('src="assets/lieux/'+id+'.webp"'),'visible place in scene '+i+': '+id);
 }
}
for(const tab of ['enquete','carnet','atlas','campagne'])game.run(`tab='${tab}';render()`);
// Complete all ten episodes. Check boundaries, clue recovery, and absence of duplicate XP on replay.
const played=boot({introSeen:true});
let v11Save,v13Save;
for(let ep=1;ep<=episodeCount;ep++){
 played.run(`epMarkStarted(${ep});state.deduced=${JSON.stringify(allDeductions.slice(0,ep))};eqDed=null`);
 for(let n=(ep-1)*6;n<ep*6;n++){
  played.run(`state.scene=${n};selected='0';speechText='';document.querySelector('#answer').value='';validate()`);
  assert(played.run(`state.completed.includes(${n})`));
  played.run('nextScene()');
 }
 assert(played.run(`state.scalesLit.includes(${ep})`));
 if(ep<episodeCount)assert(played.run('episodeBoundaryPage()').includes('Commencer l’épisode '+(ep+1)));
 if(ep===6){
  v11Save=JSON.parse(played.saved.get('dragonjade-v02'));
  const upgraded=boot(v11Save);
  assert.equal(upgraded.run('state.xp'),v11Save.xp);
  assert.equal(upgraded.run('state.words.length'),154);
  assert(upgraded.nodes.get('#app').innerHTML.includes('Commencer l’épisode 7'));
  upgraded.run('epMarkStarted(7);render()');
  assert(upgraded.nodes.get('#app').innerHTML.includes('Le plan du carnet'));
 }
 if(ep===8){
  v13Save=JSON.parse(played.saved.get('dragonjade-v02'));
  const upgraded=boot({...v13Save,name:'Léo',inventory:['jade','veste'],reviewSelected:['你好'],trust:{chen:4,mei:3,long:2}});
  const before=upgraded.run('JSON.stringify(state)');
  assert(upgraded.nodes.get('#app').innerHTML.includes('Commencer l’épisode 9'));
  upgraded.run('startEpisode(9)');
  assert(upgraded.nodes.get('#app').innerHTML.includes('Écoutez-moi'));
  const retained=JSON.parse(before);
  for(const key of ['xp','completed','words','chars','scalesLit','deduced','inventory','reviewSelected','trust','name'])
   assert.deepEqual(JSON.parse(upgraded.run('JSON.stringify(state['+JSON.stringify(key)+'])')),retained[key],'V0.13 save preserved: '+key);
 }
}
assert.equal(played.run('state.words.length'),wordCount);
const xp=played.run('state.xp');
played.run("replayEpisode(7);selected='0';validate();validate()");
assert.equal(played.run('state.xp'),xp+2);
assert.equal(played.run('state.scene'),sceneCount);
played.run('leaveSceneReplay()');
const afterReplay=xp+2;
// Actual final deduction: an incorrect answer never rewards; a correct one rewards only once.
played.run(`state.scene=${sceneCount};state.deduced=state.deduced.filter(e=>e!==${episodeCount});eqDed=null;deductionPage()`);
played.run(`eqDedVocab(EQ_DEDUCTIONS[${episodeCount}].vocab.options.findIndex(o=>!o[1]))`);
assert.equal(played.run('eqDed.step'),'vocab');assert.equal(played.run('state.xp'),afterReplay);
played.run(`eqDedVocab(EQ_DEDUCTIONS[${episodeCount}].vocab.options.findIndex(o=>o[1]));eqDed.picked=[...EQ_DEDUCTIONS[${episodeCount}].pick.need];eqDedCheck()`);
assert.equal(played.run('eqDed.step'),'done');const awarded=played.run('state.xp');assert(awarded>afterReplay);
played.run('eqDedCheck()');assert.equal(played.run('state.xp'),awarded);
const restored=boot(JSON.parse(played.saved.get('dragonjade-v02')));
assert.equal(restored.run('state.xp'),awarded);assert.equal(restored.run('state.words.length'),wordCount);
// Both new deductions: a wrong clue set cannot reward, a correct set rewards once and survives reload.
for(const ep of [9,10]){
 const deduction=boot(JSON.parse(played.saved.get('dragonjade-v02')));
 deduction.run(`state.deduced=state.deduced.filter(e=>e!==${ep});eqStartDeduction(${ep});eqDedVocab(EQ_DEDUCTIONS[${ep}].vocab.options.findIndex(o=>o[1]))`);
 const before=deduction.run('state.xp');
 deduction.run(`eqDed.picked=EQ_DEDUCTIONS[${ep}].pick.pool.filter(id=>!EQ_DEDUCTIONS[${ep}].pick.need.includes(id));eqDedCheck()`);
 assert.equal(deduction.run('eqDed.step'),'pick');assert.equal(deduction.run('state.xp'),before);
 deduction.run(`state.dedRewarded=state.dedRewarded.filter(e=>e!==${ep});eqDed.picked=[...EQ_DEDUCTIONS[${ep}].pick.need];eqDedCheck()`);
 assert.equal(deduction.run('eqDed.step'),'done');
 const after=deduction.run('state.xp');assert.equal(after,before+deduction.run(`EQ_DEDUCTIONS[${ep}].reward`));
 deduction.run('eqDedCheck()');assert.equal(deduction.run('state.xp'),after);
 const reloaded=boot(JSON.parse(deduction.saved.get('dragonjade-v02')));
 assert(reloaded.run(`eqUnlocked().some(c=>c.id==='d${ep}')`));
}
// Exercise the real recognition callback, rendered input and Validate button together.
function recordScene(spoken,alternatives){
 spoken.run('recognize()');
 spoken.run(`window.lastMic.onresult({resultIndex:0,results:[voicePart(true,...${JSON.stringify(alternatives)})]});window.lastMic.onend()`);
 const field=spoken.nodes.get('#app').innerHTML.match(/id="answer"[^>]*value="([^"]*)"/);
 assert(field,'recognized text is rendered in the answer field');
 // Mirror the input value from the actual rendered markup.
 spoken.run(`document.querySelector('#answer').value=${JSON.stringify(field[1])}`);
}
function recognizedGame(alternatives){
 const spoken=boot({introSeen:true});
 mockMicrophone(spoken);
 recordScene(spoken,alternatives);
 return spoken;
}
function editAnswer(spoken,value){
 const handler=spoken.nodes.get('#app').innerHTML.match(/id="answer"[^>]*oninput="([^"]*)"/)[1];
 spoken.run(`document.querySelector('#answer').value=${JSON.stringify(value)};(function(){${handler}}).call(document.querySelector('#answer'))`);
}
for(const alternatives of [['再见','你好'],['再见','谢谢','谁','我','你好']]){
 const spoken=recognizedGame(alternatives);
 assert.equal(spoken.run('speechText'),'你好');
 assert.match(spoken.run('micStatus'),/你好.*bonjour/i);
 spoken.run("switchTab('carnet');switchTab('aventure');validate()");
 assert(spoken.run('state.completed.includes(0)'),'accept a correct second or fifth alternative, even after a rerender');
 assert.equal(spoken.run('state.xp'),10);
 assert.equal(spoken.run('state.attempts[0]||0'),0);
 spoken.run('nextScene()');assert.equal(spoken.run('speechAlternatives.length'),0);
}
const edited=recognizedGame(['再见','你好']);
const polite=recognizedGame(['您好']);polite.run('validate()');
assert(polite.run('state.completed.includes(0) && state.speechSuccess===1'));
assert.match(polite.run("recognizedFrench('您好')"),/bonjour/i);
editAnswer(edited,'谢谢');editAnswer(edited,'再见');edited.run('validate()');
assert(!edited.run('state.completed.includes(0)'),'an explicit edit overrides old recognition alternatives, even when changed back');
assert.equal(edited.run('state.xp'),0);assert.equal(edited.run('state.attempts[0]'),1);
const corrected=recognizedGame(['再见','谢谢']);editAnswer(corrected,'你好');corrected.run('validate()');
assert(corrected.run('state.completed.includes(0)'),'a correct keyboard correction is accepted');
const cleared=recognizedGame(['你好','再见']);editAnswer(cleared,'');cleared.run('validate()');
assert(!cleared.run('state.completed.includes(0)'),'clearing the field must not reuse a recognized answer');
assert.equal(cleared.run('state.attempts[0]||0'),0);
const wrong=recognizedGame(['再见','谢谢']);wrong.run('validate();validate();validate()');
assert.equal(wrong.run('state.attempts[0]'),1,'one recording cannot count three times');
assert.match(wrong.nodes.get('#scene-attempts').textContent,/1\/3/);
for(let i=0;i<2;i++){recordScene(wrong,['再见','谢谢']);wrong.run('validate()')}
assert(wrong.run('state.skipped.includes(0)'),'three incorrect attempts still allow continuing');
assert.equal(wrong.run('state.xp'),0);
console.log('PASS: real recognition callback and validation, second/fifth alternatives, rerender, keyboard edits, cleared input and three-attempt fallback');
// Each native event is a complete snapshot. A final segment can be followed by a revised interim segment.
const fragmented=boot({introSeen:true});mockMicrophone(fragmented);
fragmented.run("validate();recognize();var mic=window.lastMic;validate()");
assert.equal(fragmented.run('state.attempts[0]||0'),0);
assert(fragmented.run("mic.lang==='zh-CN' && mic.interimResults && !mic.continuous && mic.maxAlternatives===5"));
fragmented.run("mic.onresult({resultIndex:0,results:[voicePart(true,'泥','你'),voicePart(false,'坏')]})");
assert.match(fragmented.run('micStatus'),/泥坏/);
fragmented.run("mic.onresult({resultIndex:1,results:[voicePart(true,'泥','你'),voicePart(false,'好')]})");
assert.match(fragmented.run('micStatus'),/泥好/);
fragmented.run("finishMandarinMic('aventure');validate()");
assert(fragmented.run('mic.stopRequested'));assert.equal(fragmented.run('speechText'),'');
fragmented.run("mic.onresult({resultIndex:1,results:[voicePart(true,'泥','你'),voicePart(true,'号','好')]});mic.onend();mic.onend()");
assert.equal(fragmented.run('speechText'),'你好');
fragmented.run("document.querySelector('#answer').value=speechText;validate()");
assert.equal(fragmented.run('state.xp'),10);
const incomplete=recognizedGame(['你好']);
incomplete.run("recognize();var mic=window.lastMic;mic.onresult({results:[voicePart(true,'你'),voicePart(false,'好')]});mic.onend()");
assert.equal(incomplete.run('speechText'),'');
assert.match(incomplete.run('micStatus'),/incomplète/);
incomplete.run("document.querySelector('#answer').value='';validate();recognize();mic=window.lastMic;mic.onerror({error:'no-speech'});mic.onend();validate()");
assert.equal(incomplete.run('state.attempts[0]||0'),0);
assert(!incomplete.run('state.completed.includes(0)'));
incomplete.run("recognize();mic=window.lastMic;selectAnswer('2');mic.onresult({results:[voicePart(true,'你好')]});mic.onend()");
assert.equal(incomplete.run('selected'),'2');assert.equal(incomplete.run('speechText'),'');
incomplete.run("recognize();mic=window.lastMic;window.speechSynthesis={getVoices:()=>[],cancel(){},speak(){},resume(){}};window.SpeechSynthesisUtterance=class{};var SpeechSynthesisUtterance=window.SpeechSynthesisUtterance;speakScene(true);mic.onresult({results:[voicePart(true,'你好')]});mic.onend()");
assert(incomplete.run('mic.aborted'));assert.equal(incomplete.run('speechText'),'');
const practice=boot({introSeen:true,words:['谢谢']});mockMicrophone(practice);
practice.run("switchTab('carnet');startSpeakingPractice();listenSpeakingPractice();var mic=window.lastMic;mic.onresult({results:[voicePart(true,'謝')]});mic.onresult({resultIndex:1,results:[voicePart(true,'謝'),voicePart(false,'寫')]})");
assert.equal(practice.run('speakingAttempts'),0);
practice.run("mic.onresult({resultIndex:1,results:[voicePart(true,'謝'),voicePart(true,'寫','謝')]});mic.onend();mic.onend()");
assert.equal(practice.run('speakingScore'),1);assert.equal(practice.run('speakingAttempts'),1);
assert(practice.nodes.get('speaking-overlay').innerHTML.includes('Entendu · 謝謝'));
practice.run("nextSpeakingPractice();listenSpeakingPractice();mic=window.lastMic;mic.onresult({results:[voicePart(false,'謝謝')]});mic.onend()");
assert.equal(practice.run('speakingAttempts'),0);
for(let i=0;i<3;i++)practice.run("listenSpeakingPractice();mic=window.lastMic;mic.onresult({results:[voicePart(true,'外星')]});mic.onend();mic.onend()");
assert(practice.run('speakingFinished && speakingAttempts===3 && speakingScore===1'));
practice.run("nextSpeakingPractice();listenSpeakingPractice();mic=window.lastMic;nextSpeakingPractice();mic.onresult({results:[voicePart(true,'谢谢')]});mic.onend()");
assert(practice.run('mic.aborted && !speakingFinished && speakingAttempts===0'));
const replayVoice=boot({introSeen:true,scene:2,completed:[0],xp:10});mockMicrophone(replayVoice);
replayVoice.run("replayScene(0);validate();recognize();window.lastMic.onerror({error:'network'});validate()");
assert.equal(replayVoice.run('state.sceneReplay.attempts'),0);
recordScene(replayVoice,['再见','你好']);replayVoice.run('validate();validate()');
assert.equal(replayVoice.run('state.xp'),12);
console.log('PASS: complete and interim transcripts, correct displayed translation, one attempt per recording, practice, replay, audio and navigation cancellation');
// Fixture for browser testing, confined to localhost test origin.
if(process.env.WRITE_BROWSER_FIXTURE==='1'){
fs.mkdirSync('../release-test-data',{recursive:true});
fs.writeFileSync('../release-test-data/v11-completed.json',JSON.stringify(v11Save));
fs.writeFileSync('../release-test-data/v13-completed.json',JSON.stringify(v13Save));
const fixture=JSON.parse(played.saved.get('dragonjade-v02'));
fixture.scene=24;fixture.epStarted=[3,4];fixture.deduced=[1,2,3,4];fixture.dedSkipped=[];fixture.dedRewarded=[1,2,3,4];
fixture.completed=fixture.completed.filter(i=>i<24);fixture.skipped=[];fixture.clueScenes=fixture.clueScenes.filter(i=>i<24);fixture.scalesLit=fixture.scalesLit.filter(ep=>ep<=4);
fixture.words=played.run('[...new Set(scenes.slice(0,24).flatMap(s=>s.words))]');
fs.writeFileSync('../release-test-data/episode5.json',JSON.stringify({format:'dragon-de-jade-save',version:1,progress:fixture}));
}
console.log('PASS: full app initialization, V0.11/V0.13 save upgrades, new deductions, 60 scene renders, 10 episodes, 251 words, boundaries, replay XP and final deduction');

require('./livres-jeux.cjs')(boot,mockMicrophone);
require('./radicaux.cjs')(boot);
