const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const episodeCount=8,sceneCount=48,wordCount=206;
const allDeductions=Array.from({length:episodeCount},(_,i)=>i+1);
const order=[...fs.readFileSync('index.html','utf8').matchAll(/<script src="([^"?]+)\?/g)].map(m=>m[1]);
function boot(progress={}){
 const saved=new Map([['dragonjade-v02',JSON.stringify(progress)]]),nodes=new Map();
 const el=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',value:'',hidden:false,style:{},classList:{toggle(){}},addEventListener(){},appendChild(){},remove(){},setAttribute(){}});return nodes.get(id)};
 const ctx=vm.createContext({console,Date,Math,JSON,URL,Blob,setTimeout:()=>0,clearTimeout(){},confirm:()=>true,alert(){},navigator:{},window:{scrollTo(){},matchMedia:()=>({matches:false})},document:{querySelector:el,querySelectorAll:()=>[],getElementById:el,createElement:el,body:el('body')},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)}});
 for(const file of order)vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
 return {run:s=>vm.runInContext(s,ctx),saved,nodes};
}
const game=boot({name:'Test sauvegarde',xp:37,scene:1,completed:[0],words:['你好'],introSeen:true,chars:[],reviewSelected:[]});
assert.equal(game.run('state.xp'),37);assert.equal(game.run('state.name'),'Test sauvegarde');
assert.equal(game.run('scenes.length'),sceneCount);assert.equal(game.run('vocab.length'),wordCount);
game.run('eqState()');assert(game.run('state.clueScenes.includes(0)'));
// Render every new scene and tab using real app code, not extracted functions.
for(let i=0;i<sceneCount;i++){
 game.run(`state.scene=${i};state.introSeen=true;epMarkStarted(${Math.floor(i/6)+1});state.deduced=${JSON.stringify(allDeductions)};eqDed=null;tab='aventure';render()`);
 assert(game.nodes.get('#app').innerHTML.includes('Scène '+(i%6+1)+'/6'));
}
for(const tab of ['enquete','carnet','atlas','campagne'])game.run(`tab='${tab}';render()`);
// Complete all eight episodes. Check boundaries, clue recovery, and absence of duplicate XP on replay.
const played=boot({introSeen:true});
let v11Save;
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
}
assert.equal(played.run('state.words.length'),wordCount);
const xp=played.run('state.xp');
played.run("replayEpisode(7);selected='0';validate()");assert.equal(played.run('state.xp'),xp);
// Actual final deduction: an incorrect answer never rewards; a correct one rewards only once.
played.run(`state.scene=${sceneCount};state.deduced=state.deduced.filter(e=>e!==${episodeCount});eqDed=null;deductionPage()`);
played.run(`eqDedVocab(EQ_DEDUCTIONS[${episodeCount}].vocab.options.findIndex(o=>!o[1]))`);
assert.equal(played.run('eqDed.step'),'vocab');assert.equal(played.run('state.xp'),xp);
played.run(`eqDedVocab(EQ_DEDUCTIONS[${episodeCount}].vocab.options.findIndex(o=>o[1]));eqDed.picked=[...EQ_DEDUCTIONS[${episodeCount}].pick.need];eqDedCheck()`);
assert.equal(played.run('eqDed.step'),'done');const awarded=played.run('state.xp');assert(awarded>xp);
played.run('eqDedCheck()');assert.equal(played.run('state.xp'),awarded);
const restored=boot(JSON.parse(played.saved.get('dragonjade-v02')));
assert.equal(restored.run('state.xp'),awarded);assert.equal(restored.run('state.words.length'),wordCount);
// Exercise the real recognition callback, rendered input and Validate button together.
function recognizedGame(alternatives){
 const spoken=boot({introSeen:true});
 spoken.run('window.isSecureContext=true;window.SpeechRecognition=class{start(){}stop(){}};recognize()');
 spoken.run(`activeRecognition.onresult({resultIndex:0,results:[Object.assign(${JSON.stringify(alternatives.map(transcript=>({transcript})))},{isFinal:true})]});activeRecognition.onend()`);
 const field=spoken.nodes.get('#app').innerHTML.match(/id="answer"[^>]*value="([^"]*)"/);
 assert(field,'recognized text is rendered in the answer field');
 // Mirror the value that the browser obtains from the rendered input element.
 spoken.run(`document.querySelector('#answer').value=${JSON.stringify(field[1])}`);
 return spoken;
}
function editAnswer(spoken,value){
 const handler=spoken.nodes.get('#app').innerHTML.match(/id="answer"[^>]*oninput="([^"]*)"/)[1];
 spoken.run(`document.querySelector('#answer').value=${JSON.stringify(value)};(function(){${handler}}).call(document.querySelector('#answer'))`);
}
for(const alternatives of [['再见','你好'],['再见','谢谢','谁','我','你好']]){
 const spoken=recognizedGame(alternatives);
 spoken.run("switchTab('carnet');switchTab('aventure');validate()");
 assert(spoken.run('state.completed.includes(0)'),'accept a correct second or fifth alternative, even after a rerender');
 assert.equal(spoken.run('state.xp'),10);
 assert.equal(spoken.run('state.attempts[0]||0'),0);
 spoken.run('nextScene()');assert.equal(spoken.run('speechAlternatives.length'),0);
}
const edited=recognizedGame(['再见','你好']);
editAnswer(edited,'谢谢');editAnswer(edited,'再见');edited.run('validate()');
assert(!edited.run('state.completed.includes(0)'),'an explicit edit overrides old recognition alternatives, even when changed back');
assert.equal(edited.run('state.xp'),0);assert.equal(edited.run('state.attempts[0]'),1);
const corrected=recognizedGame(['再见','谢谢']);editAnswer(corrected,'你好');corrected.run('validate()');
assert(corrected.run('state.completed.includes(0)'),'a correct keyboard correction is accepted');
const cleared=recognizedGame(['你好','再见']);editAnswer(cleared,'');cleared.run('validate()');
assert(!cleared.run('state.completed.includes(0)'),'clearing the field must not reuse a recognized answer');
const wrong=recognizedGame(['再见','谢谢']);wrong.run('validate();validate();validate()');
assert(wrong.run('state.skipped.includes(0)'),'three incorrect attempts still allow continuing');
assert.equal(wrong.run('state.xp'),0);
console.log('PASS: real recognition callback and validation, second/fifth alternatives, rerender, keyboard edits, cleared input and three-attempt fallback');
// Fixture for browser testing, confined to localhost test origin.
if(process.env.WRITE_BROWSER_FIXTURE==='1'){
fs.mkdirSync('../release-test-data',{recursive:true});
fs.writeFileSync('../release-test-data/v11-completed.json',JSON.stringify(v11Save));
const fixture=JSON.parse(played.saved.get('dragonjade-v02'));
fixture.scene=24;fixture.epStarted=[3,4];fixture.deduced=[1,2,3,4];fixture.dedSkipped=[];fixture.dedRewarded=[1,2,3,4];
fixture.completed=fixture.completed.filter(i=>i<24);fixture.skipped=[];fixture.clueScenes=fixture.clueScenes.filter(i=>i<24);fixture.scalesLit=fixture.scalesLit.filter(ep=>ep<=4);
fixture.words=played.run('[...new Set(scenes.slice(0,24).flatMap(s=>s.words))]');
fs.writeFileSync('../release-test-data/episode5.json',JSON.stringify({format:'dragon-de-jade-save',version:1,progress:fixture}));
}
console.log('PASS: full app initialization, V0.11 save upgrade, 48 scene renders, 8 episodes, 206 words, boundaries, replay XP and final deduction');
