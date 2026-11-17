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
for(const turn of game.run('SCENE_DIALOGUE_TURNS.flat()')){
 const html=game.run('renderDialogueTurn('+JSON.stringify(turn)+',0)');
 const name=turn.speaker==='Vous'?game.run('state.name'):turn.speaker;
 const escaped=game.run('esc('+JSON.stringify(name)+')');
 assert(html.includes(escaped+' parle <button'));
 assert(html.includes('onclick="speakSceneTurn(0)"'));
 if(turn.speaker==='Vous')count++;
}
assert(count>0);
console.log('PASS: '+count+' hero turns; rename through profile; persisted reload; HTML escaping; NPC labels; portraits; audio buttons; unchanged dialogue data and XP.');
`;
vm.runInNewContext(helper+checks,{require,console,URL,Blob,setTimeout,clearTimeout,process});
