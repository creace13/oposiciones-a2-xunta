const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '../..');
const files = [
  'documentos/troncal/galicia/ley-8-1985-elecciones-parlamento-galicia.html',
  'documentos/troncal/galicia/ley-6-1984-valedor-pueblo.pdf',
  'documentos/troncal/galicia/ley-3-2014-consejo-consultivo-galicia.html',
  'documentos/troncal/boe/jurisdiccion-contencioso-administrativa.pdf'
];

files.forEach(f => {
  const fullPath = path.join(root, f);
  if (fs.existsSync(fullPath)) {
    const data = fs.readFileSync(fullPath);
    const hash = crypto.createHash('sha256').update(data).digest('hex').toUpperCase();
    console.log(`${f} | SHA-256: ${hash}`);
  } else {
    console.log(`${f} | FILE NOT FOUND`);
  }
});
