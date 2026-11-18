const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const files = ['hsk1-reference.js','hsk1-plan.js','episode2.js','episode3.js','episode4.js','episode5.js','episode6.js','episode7.js','episode8.js','episode9.js','episode10.js','writing.js','quiz.js','lieux.js','livres.js','jeux.js','episodes.js','speech.js','enquete.js','app.js','sw.js'];
for (const file of files) new vm.Script(fs.readFileSync(file,'utf8'),{filename:file});
const version=JSON.parse(fs.readFileSync('version.json','utf8')).version;
const html=fs.readFileSync('index.html','utf8');
for(const file of files.filter(x=>x!=='sw.js')) assert(html.includes(file+'?v='+version),file+' missing in HTML or wrong version');
const app=fs.readFileSync('app.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const quiz=fs.readFileSync('quiz.js','utf8');
const enquiry=fs.readFileSync('enquete.js','utf8');
assert.equal(app.split('assets/vocabulary/').length-1,300,'300 watercolor references (HSK 1)');
assert(app.includes("const KEY='dragonjade-v02'"),'existing saves preserved');
assert(app.includes('writingTestResults=[]'),'calligraphy results initialized');
assert(app.includes('writingTestResults.filter'),'calligraphy scoring retained');
assert(fs.readFileSync('writing.js','utf8').includes('mastered:total===0'),'calligraphy test records mastered characters');
assert(app.includes('eqSceneDone(sceneIndex)'),'investigation scene progression');
assert(app.includes('episodeBoundaryPage()'),'generic end-of-episode screens');
assert(fs.readFileSync('speech.js','utf8').includes('function speechMatchAny('),'tolerant speech matching');
assert(quiz.includes('function startQuiz(')&&quiz.includes('function answerQuiz('),'quiz functions');
assert(enquiry.includes('function eqInit(')&&enquiry.includes('function deductionPage('),'investigation functions');
assert(sw.includes("const VERSION='"+version+"'"),'service worker version');
assert(app.includes("const APP_VERSION='"+version+"'"),'app version');
for(const file of ['quiz.js','enquete.js','lieux.js','livres.js','jeux.js','episodes.js','episode3.js','episode4.js','episode5.js','episode6.js','episode7.js','episode8.js','episode9.js','episode10.js','speech.js']) assert(sw.includes(file+'?v='+version),file+' offline core');
// Toute image référencée par le code, le CSS ou le service worker doit exister dans le dépôt.
const missing=[];
for(const file of ['app.js','style.css','sw.js','index.html','manifest.webmanifest','enquete.js','writing.js','quiz.js','lieux.js','livres.js','jeux.js','episodes.js'])
  for(const m of fs.readFileSync(file,'utf8').matchAll(/(?:\.\/)?(assets\/[A-Za-z0-9_\-./]+\.(?:png|jpg|jpeg|webp|svg))/g))
    if(!fs.existsSync(m[1])) missing.push(file+' -> '+m[1]);
assert.deepEqual([...new Set(missing)],[],'images référencées mais absentes du dépôt');
console.log('PASS: JS syntax, load order, watercolors, saves, writing, quiz, investigation, episodes, offline core, images, version '+version);
