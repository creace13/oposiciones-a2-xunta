const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const boundary = source.indexOf('const defaults');

const context = {};
vm.createContext(context);
vm.runInContext(source.slice(0, boundary) + '\nglobalThis.sources = officialSources;', context);

console.log(context.sources);
