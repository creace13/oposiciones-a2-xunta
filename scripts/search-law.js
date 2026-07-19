const fs = require('fs');
const path = require('path');

const fileMap = {
  patrimonio: 'documentos/troncal/galicia/ley-6-2023-patrimonio-galicia.html',
  financiero: 'documentos/troncal/galicia/decreto-legislativo-1-1999-regimen-financiero.html',
  subvenciones: 'documentos/troncal/galicia/ley-9-2007-subvenciones-galicia.html'
};

const law = process.argv[2];
const query = process.argv[3];

if (!law || !fileMap[law]) {
  console.error('Uso: node search-law.js [patrimonio|financiero|subvenciones] "patrón de búsqueda"');
  process.exit(1);
}

const filePath = path.join(__dirname, '..', fileMap[law]);
if (!fs.existsSync(filePath)) {
  console.error(`El archivo no existe: ${filePath}`);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const results = [];
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes(query.toLowerCase())) {
    results.push({ lineNum: idx + 1, content: line.trim() });
  }
});

console.log(`Encontradas ${results.length} coincidencias para "${query}" en ${law}:`);
results.slice(0, 30).forEach(r => {
  console.log(`Línea ${r.lineNum}: ${r.content}`);
});
