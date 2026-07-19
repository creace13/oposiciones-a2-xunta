const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'documentos', 'troncal', 'galicia', 'ley-2-2015-empleo-publico-galicia.html'), 'utf8');

function findSnippet(query) {
  console.log(`\n=== Snippet: "${query}" ===`);
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.toLowerCase().includes(query.toLowerCase())) {
      console.log(`${idx + 1}: ${line.trim().slice(0, 150)}`);
    }
  });
}

findSnippet('suspensión de funciones');
findSnippet('permuta');
findSnippet('excedencia por cuidado');
