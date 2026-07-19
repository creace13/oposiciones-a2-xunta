const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

const filesToSync = [
  'index.html',
  'styles.css',
  'app.js',
  'index.js',
  'manifest.json',
  'robots.txt',
  'sitemap.xml',
  'favicon.svg',
  'google418592490c331f5b.html',
  'og-image.jpg'
];

function getHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

console.log('--- SINCRONIZANDO RAÍZ -> PUBLIC ---');

let syncCount = 0;
filesToSync.forEach((fileName) => {
  const src = path.join(rootDir, fileName);
  const dest = path.join(publicDir, fileName);
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    const srcHash = getHash(src);
    const destHash = getHash(dest);
    if (srcHash !== destHash) {
      console.error(`❌ ERROR: Mismatch hash for ${fileName}`);
      process.exit(1);
    }
    syncCount += 1;
  }
});

const docSrc = path.join(rootDir, 'documentos');
const docDest = path.join(publicDir, 'documentos');
if (fs.existsSync(docSrc)) {
  copyRecursiveSync(docSrc, docDest);
}

console.log(`✅ SINCRONIZACIÓN EXITOSA: ${syncCount} archivos transferidos y verificados por SHA-256 en ./public`);
