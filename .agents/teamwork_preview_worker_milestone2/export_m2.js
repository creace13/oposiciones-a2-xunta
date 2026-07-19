const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = fs.readFileSync('f:/05_Proyectos [Aplicaciones]/Oposicion [App] --Gemini/app.js', 'utf8');
const boundary = source.indexOf('const defaults');

const context = {};
vm.createContext(context);
vm.runInContext(source.slice(0, boundary) + '\nglobalThis.questions = questions; \nglobalThis.coverageTopic = coverageTopic;', context);

const questions = context.questions;
const coverageTopic = context.coverageTopic;
const targets = ['g2-12', 'g2-13', 'g2-16'];

const m2 = questions.filter(q => targets.includes(coverageTopic(q)));

fs.writeFileSync(
  'f:/05_Proyectos [Aplicaciones]/Oposicion [App] --Gemini/.agents/teamwork_preview_worker_milestone2/questions_m2_raw.json',
  JSON.stringify(m2, null, 2),
  'utf8'
);
console.log('Exported', m2.length, 'questions to questions_m2_raw.json');
