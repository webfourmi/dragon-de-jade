const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// Execute the real application's boot helper with its complete script loading order.
const runtime=fs.readFileSync('tests/runtime.cjs','utf8');
const helper=runtime.slice(0,runtime.indexOf('const game=boot('));
const checks=`
const game=boot({introSeen:true,scene:0,xp:37,completed:[],words:[]});
function labels(name){
 const html=game.nodes.get('#app').innerHTML;
 const escaped=game.run('esc(state.name)');
 assert(html.includes(escaped+' parle <button'));
 assert(html.includes('class="character-caption">'+escaped+'</span>'));
 assert(html.includes('aria-label="Écouter '+escaped+'"'));
 assert(!html.includes('Vous parle'));
 assert(html.includes('Maître Chen parle'));
 assert(html.includes('character-portrait player'));
}
labels('Esmée');
const before=game.run('JSON.stringify(SCENE_DIALOGUE_TURNS)');
for(const name of ['Léo', 'Mei', 'Lóng', '王明', 'A & B <img src=x> "ami"']){
 game.nodes.set('hero-name',{value:name});
 game.run('saveProfileName()');
 assert.equal(game.run('state.name'),name);
 labels(name);
 assert.equal(game.run('state.xp'),37);
 const restored=boot(JSON.parse(game.saved.get('dragonjade-v02')));
 assert(restored.nodes.get('#app').innerHTML.includes(restored.run('esc(state.name)')+' parle'));
}
assert.equal(game.run('JSON.stringify(SCENE_DIALOGUE_TURNS)'),before);
let count=0;
const characters=game.run('NPCS.map(npc=>({...npc, source:npcImage(npc)}))');
const speakingPortraits=new Map(characters.filter(npc=>npc.avatar).map(npc=>[npc.name,npc.source]));
const illustrated=new Set();
for(const turn of game.run('scenes.flatMap((scene,i)=>sceneTurns(i,scene))')){
 const html=game.run('renderDialogueTurn('+JSON.stringify(turn)+',0)');
 const name=turn.speaker==='Vous'?game.run('state.name'):turn.speaker;
 const escaped=game.run('esc('+JSON.stringify(name)+')');
 assert(html.includes(escaped+' parle <button'));
 assert(html.includes('onclick="speakSceneTurn(0)"'));
 if(turn.speaker==='Vous'){
  count++;
  assert(html.includes('src="assets/heros.webp"'));
 }else{
  const source=speakingPortraits.get(turn.speaker);
  assert(source && html.includes('src="'+source+'"'),turn.speaker);
  illustrated.add(turn.speaker);
 }
}
assert(count>0);
assert.equal(illustrated.size,speakingPortraits.size);
assert.equal(new Set(characters.map(npc=>npc.source)).size,characters.length);

function gallery(progress){
 const book=boot(progress);
 book.run("switchTab('campagne');selectBookSection('personnages')");
 return book.nodes.get('#app').innerHTML;
}
assert(!gallery({}).includes('class="npc-card"'));
const early=gallery({introSeen:true,scene:2,completed:[0],skipped:[1],xp:10});
assert(early.includes('maitre-chen.webp') && early.includes('expediteur-anonyme.webp'));
assert(!early.includes('grand-pere-chen.webp') && !early.includes('monsieur-wu.webp'));
const all=gallery({introSeen:true,scene:sceneCount,completed:Array.from({length:sceneCount},(_,i)=>i),deduced:allDeductions});
for(const npc of characters){
 assert(npc.scene>=0 && npc.scene<sceneCount,npc.name);
 assert(all.includes('src="'+npc.source+'"'),npc.name);
}
assert(game.run('sceneNpcPortraits(16)').includes('fillette-du-portrait.webp'));
assert(!game.run('sceneNpcPortraits(43)').includes('instituteur.webp'));
game.run('eqSceneDone(43)');
assert(game.run('sceneNpcPortraits(43)').includes('instituteur.webp'));
console.log('PASS: '+count+' hero turns; rename, reload and escaping; every NPC dialogue portrait and audio button; scene portraits and progressive gallery.');
`;
vm.runInNewContext(helper+checks,{require,console,URL,Blob,setTimeout,clearTimeout,process});
