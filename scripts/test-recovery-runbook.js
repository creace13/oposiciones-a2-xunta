const assert = require("assert");
const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const root = path.resolve(__dirname, "..");
const runbookPath = path.join(root, "docs", "OPERACION-RECUPERACION.md");
const wranglerPath = path.join(root, "wrangler.json");

function runGit(args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function assertIncludes(text, expected, label) {
  assert(
    text.includes(expected),
    `Falta en el runbook la referencia obligatoria: ${label}`
  );
}

const runbook = fs.readFileSync(runbookPath, "utf8");
const wrangler = JSON.parse(fs.readFileSync(wranglerPath, "utf8"));

assertIncludes(runbook, "GitHub", "GitHub");
assertIncludes(runbook, "Cloudflare Workers", "Cloudflare Workers");
assertIncludes(runbook, "Supabase", "Supabase");
assertIncludes(runbook, "git revert", "rollback seguro con git revert");
assertIncludes(runbook, "curl -I https://oposiciones-xunta.opos-galicia.workers.dev", "smoke test público");
assertIncludes(runbook, "Nunca subir a GitHub", "protección de secretos");
assertIncludes(runbook, "Estado actual: **parcial y seguro**", "estado honesto de C02-06");
assertIncludes(runbook, "El plan gratuito no incluye copias de seguridad", "limitación Supabase Free");
assertIncludes(runbook, "Cómo suplir la falta de backups en Supabase Free", "plan compensatorio Supabase Free");
assertIncludes(runbook, "Subir Supabase a Pro", "opción Supabase Pro");

assert.strictEqual(wrangler.name, "oposiciones-xunta", "Nombre Cloudflare inesperado");
assert.strictEqual(wrangler.assets.directory, "./public", "Cloudflare debe publicar ./public");

const remote = runGit(["remote", "get-url", "origin"]);
assert(
  remote.includes("github.com/creace13/oposiciones-a2-xunta"),
  "Remoto GitHub inesperado"
);

const head = runGit(["rev-parse", "--short", "HEAD"]);
assert(head.length >= 7, "No se pudo leer el commit actual");

const criticalFiles = [
  "public/index.html",
  "public/app.js",
  "public/styles.css",
  "index.js",
  "wrangler.json",
  "package.json",
  ".ia/ESTADO-PROYECTO.md",
  ".ia/COLA-ACTIVA.md",
];

for (const file of criticalFiles) {
  const type = runGit(["cat-file", "-t", `HEAD:${file}`]);
  assert.strictEqual(type, "blob", `Archivo crítico ausente del commit: ${file}`);
}

const archivePath = path.join(os.tmpdir(), `oposiciones-backup-check-${Date.now()}.tar`);
execFileSync("git", ["archive", "--format=tar", "--output", archivePath, "HEAD"], {
  cwd: root,
  stdio: ["ignore", "ignore", "pipe"],
});

const archiveStats = fs.statSync(archivePath);
assert(archiveStats.size > 1024 * 100, "El archivo de backup Git parece demasiado pequeño");
fs.unlinkSync(archivePath);

console.log("--- TEST DE RUNBOOK DE RECUPERACIÓN ---");
console.log(`Commit actual: ${head}`);
console.log("PASADO: Runbook contiene GitHub, Cloudflare, Supabase, rollback y protección de secretos.");
console.log("PASADO: Configuración Cloudflare apunta a ./public.");
console.log("PASADO: Archivos críticos existen en HEAD.");
console.log("PASADO: Ensayo no destructivo de git archive completado.");
console.log("\n✅ TEST DE RUNBOOK DE RECUPERACIÓN PASADO CON ÉXITO.");
