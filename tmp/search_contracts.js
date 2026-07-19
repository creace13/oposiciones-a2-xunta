const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'contratos.txt'), 'utf8');

function search(query) {
  console.log(`\n=== Search: "${query}" ===`);
  const lines = content.split('\n');
  let count = 0;
  lines.forEach((line, idx) => {
    if (line.toLowerCase().includes(query.toLowerCase())) {
      console.log(`${idx + 1}: ${line.trim().slice(0, 120)}`);
      count++;
      if (count >= 15) return;
    }
  });
  if (count >= 15) console.log('... truncated ...');
}

search('contrato menor');
search('garantía definitiva');
search('lotes');
search('riesgo operacional');
