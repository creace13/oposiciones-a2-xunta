const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

const filesToSync = [
  'index.html',
  'styles.css',
  'app.js',
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

function syncDirectory(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const srcEntries = fs.readdirSync(srcDir, { withFileTypes: true });
  const destEntries = fs.existsSync(destDir) ? fs.readdirSync(destDir, { withFileTypes: true }) : [];

  // Remove files in dest that no longer exist in src
  for (const destEntry of destEntries) {
    const srcPath = path.join(srcDir, destEntry.name);
    const destPath = path.join(destDir, destEntry.name);
    if (!fs.existsSync(srcPath)) {
      if (destEntry.isDirectory()) {
        fs.rmSync(destPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(destPath);
      }
    }
  }

  // Copy and verify files
  for (const srcEntry of srcEntries) {
    const srcPath = path.join(srcDir, srcEntry.name);
    const destPath = path.join(destDir, srcEntry.name);
    if (srcEntry.isDirectory()) {
      syncDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      const srcHash = getHash(srcPath);
      const destHash = getHash(destPath);
      if (srcHash !== destHash) {
        console.error(`❌ ERROR: Hash mismatch for ${srcPath}`);
        process.exit(1);
      }
    }
  }
}

console.log('--- SINCRONIZANDO RAÍZ -> PUBLIC ---');

// Remove public/index.js if present to keep public minimal
const publicIndexJs = path.join(publicDir, 'index.js');
if (fs.existsSync(publicIndexJs)) {
  fs.unlinkSync(publicIndexJs);
}

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
      console.error(`❌ ERROR: Hash mismatch for ${fileName}`);
      process.exit(1);
    }
    syncCount += 1;
  }
});

const docSrc = path.join(rootDir, 'documentos');
const docDest = path.join(publicDir, 'documentos');
syncDirectory(docSrc, docDest);

console.log(`✅ SINCRONIZACIÓN EXITOSA: ${syncCount} activos principales + arbol documentos/ sincronizados y verificados por SHA-256.`);
