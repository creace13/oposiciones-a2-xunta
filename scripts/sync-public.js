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
  'og-image.jpg',
  '_headers'
];

const allowedPublicItems = new Set([...filesToSync, 'documentos']);

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

  // Remove files/dirs in dest that no longer exist in src
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

console.log('--- SINCRONIZANDO RAÍZ -> PUBLIC CON LISTA BLANCA ESTRICTA ---');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Strict root-level whitelist enforcement for public/
const currentPublicEntries = fs.readdirSync(publicDir, { withFileTypes: true });
let purgedCount = 0;

for (const entry of currentPublicEntries) {
  if (!allowedPublicItems.has(entry.name)) {
    const orphanPath = path.join(publicDir, entry.name);
    if (entry.isDirectory()) {
      fs.rmSync(orphanPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(orphanPath);
    }
    purgedCount++;
  }
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

console.log(`✅ SINCRONIZACIÓN EXITOSA: ${syncCount} activos principales + árbol documentos/ sincronizados y verificados por SHA-256. (Huérfanos purgados a nivel raíz: ${purgedCount})`);
