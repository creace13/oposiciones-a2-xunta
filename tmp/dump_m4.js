const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const boundary = source.indexOf('const defaults');

const context = {};
vm.createContext(context);
vm.runInContext(source.slice(0, boundary) + '\nglobalThis.auditQuestions = questions;', context);

const questions = context.auditQuestions;

// Let's filter by matching topic / id prefix
const milestone4 = questions.filter(q => 
  q.id.includes('contratos') || 
  q.id.includes('trebep') || 
  q.id.includes('empleo-') ||
  q.id.includes('empleo_')
);

let output = `Found ${milestone4.length} questions for Milestone 4:\n`;

const grouped = {};
milestone4.forEach(q => {
  let key = 'unknown';
  if (q.id.includes('contratos')) key = 'Contratos';
  else if (q.id.includes('trebep')) key = 'TREBEP';
  else if (q.id.includes('empleo')) key = 'Empleo público';
  
  if (!grouped[key]) grouped[key] = [];
  grouped[key].push(q);
});

for (const [key, list] of Object.entries(grouped)) {
  output += `\n======================================================\n`;
  output += `TOPIC: ${key} (${list.length} questions)\n`;
  output += `======================================================\n`;
  list.forEach((q, idx) => {
    output += `\n--- [${idx + 1}] ID: ${q.id} ---\n`;
    output += `Text: ${q.text}\n`;
    output += `Options:\n`;
    q.options.forEach((opt, oIdx) => {
      output += `  ${oIdx}. ${opt[0]}: ${opt[1]} ${oIdx === q.correct ? '[CORRECT]' : ''}\n`;
    });
    output += `Explanation: ${q.explanation}\n`;
    output += `Whys:\n`;
    q.whys.forEach((why, wIdx) => {
      output += `  ${wIdx}. ${why}\n`;
    });
    output += `Source: ${q.source}\n`;
    output += `SourceUrl: ${q.sourceUrl}\n`;
    output += `Quality: ${q.quality}\n`;
  });
}

fs.writeFileSync(path.join(__dirname, 'm4_questions.txt'), output, 'utf8');
console.log(`Saved ${milestone4.length} questions to tmp/m4_questions.txt`);
