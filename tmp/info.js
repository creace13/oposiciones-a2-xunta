const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const boundary = source.indexOf('const defaults');

const context = {};
vm.createContext(context);
vm.runInContext(source.slice(0, boundary) + '\nglobalThis.auditQuestions = questions;', context);

const questions = context.auditQuestions;
const urls = [...new Set(questions.map(q => q.sourceUrl))];
console.log('Unique sourceUrls:');
urls.forEach(url => console.log(`- ${url}`));
