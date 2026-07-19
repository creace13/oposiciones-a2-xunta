const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'documentos', 'troncal', 'galicia', 'ley-2-2015-empleo-publico-galicia.html'), 'utf8');

function showArticle(artName) {
  console.log(`\n=== Article: "${artName}" ===`);
  const lines = content.split('\n');
  let print = false;
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(artName)) {
      print = true;
    }
    if (print) {
      console.log(`${i + 1}: ${line.trim()}`);
      count++;
      if (count > 25 || line.includes('Artículo ' + (parseInt(artName.match(/\d+/)[0]) + 1))) {
        break;
      }
    }
  }
}

showArticle('Artículo 164.');
showArticle('Artículo 195.');
