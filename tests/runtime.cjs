const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
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
assert.equal(game.run('scenes.length'),36);assert.equal(game.run('vocab.length'),154);
game.run('eqState()');assert(game.run('state.clueScenes.includes(0)'));
// Render every new scene and tab using real app code, not extracted functions.
for(let i=0;i<36;i++){
 game.run(`state.scene=${i};state.introSeen=true;epMarkStarted(${Math.floor(i/6)+1});state.deduced=[1,2,3,4,5,6];eqDed=null;tab='aventure';render()`);
 assert(game.nodes.get('#app').innerHTML.includes('Scène '+(i%6+1)+'/6'));
}
for(const tab of ['enquete','carnet','atlas','campagne'])game.run(`tab='${tab}';render()`);
// Complete all six episodes. Check boundaries, clue recovery, and absence of duplicate XP on replay.
const played=boot({introSeen:true});
for(let ep=1;ep<=6;ep++){
 played.run(`epMarkStarted(${ep});state.deduced=[1,2,3,4,5,6];eqDed=null`);
 for(let n=(ep-1)*6;n<ep*6;n++){
  played.run(`state.scene=${n};selected='0';speechText='';document.querySelector('#answer').value='';validate()`);
  assert(played.run(`state.completed.includes(${n})`));
  played.run('nextScene()');
 }
 assert(played.run(`state.scalesLit.includes(${ep})`));
 if(ep<6)assert(played.run('episodeBoundaryPage()').includes('Commencer l’épisode '+(ep+1)));
}
assert.equal(played.run('state.words.length'),154);
const xp=played.run('state.xp');
played.run("replayEpisode(5);selected='0';validate()");assert.equal(played.run('state.xp'),xp);
// Actual final deduction: an incorrect answer never rewards; a correct one rewards only once.
played.run("state.scene=36;state.deduced=state.deduced.filter(e=>e!==6);eqDed=null;deductionPage()");
played.run('eqDedVocab(EQ_DEDUCTIONS[6].vocab.options.findIndex(o=>!o[1]))');
assert.equal(played.run('eqDed.step'),'vocab');assert.equal(played.run('state.xp'),xp);
played.run('eqDedVocab(EQ_DEDUCTIONS[6].vocab.options.findIndex(o=>o[1]));eqDed.picked=[...EQ_DEDUCTIONS[6].pick.need];eqDedCheck()');
assert.equal(played.run('eqDed.step'),'done');const awarded=played.run('state.xp');assert(awarded>xp);
played.run('eqDedCheck()');assert.equal(played.run('state.xp'),awarded);
const restored=boot(JSON.parse(played.saved.get('dragonjade-v02')));
assert.equal(restored.run('state.xp'),awarded);assert.equal(restored.run('state.words.length'),154);
// Fixture for browser testing, confined to localhost test origin.
if(process.env.WRITE_BROWSER_FIXTURE==='1'){
fs.mkdirSync('../release-test-data',{recursive:true});
const fixture=JSON.parse(played.saved.get('dragonjade-v02'));
fixture.scene=24;fixture.epStarted=[3,4];fixture.deduced=[1,2,3,4];fixture.dedSkipped=[];fixture.dedRewarded=[1,2,3,4];
fixture.completed=fixture.completed.filter(i=>i<24);fixture.skipped=[];fixture.clueScenes=fixture.clueScenes.filter(i=>i<24);fixture.scalesLit=fixture.scalesLit.filter(ep=>ep<=4);
fixture.words=played.run('[...new Set(scenes.slice(0,24).flatMap(s=>s.words))]');
fs.writeFileSync('../release-test-data/episode5.json',JSON.stringify({format:'dragon-de-jade-save',version:1,progress:fixture}));
}
console.log('PASS: full app initialization, existing saves, 36 scene renders, 6 episodes, 154 words, boundaries, replay XP and final deduction');
