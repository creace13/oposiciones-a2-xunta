const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = [
  'documentos/troncal/boe/ley-9-2017-contratos-sector-publico.pdf',
  'documentos/troncal/boe/trebep-rdl-5-2015.pdf',
  'documentos/troncal/galicia/ley-2-2015-empleo-publico-galicia.html'
];

files.forEach(f => {
  const fullPath = path.join(root, f);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`${f}: exists, size = ${stats.size} bytes`);
  } else {
    console.log(`${f}: DOES NOT EXIST`);
  }
});
