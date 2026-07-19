const fs = require('fs');

const appPath = 'f:/05_Proyectos [Aplicaciones]/Oposicion [App] --Gemini/app.js';
const content = fs.readFileSync(appPath, 'utf8');

const ids = [
  'procedimiento-1', 'procedimiento-2', 'historico-2025-01', 'historico-2025-02',
  'historico-2025-03', 'historico-2025-04', 'historico-2025-05', 'troncal-procedimiento-03',
  'troncal-regimen-04', 'troncal-galicia-05', 'troncal-procedimiento-18', 'troncal-procedimiento-19',
  'troncal-regimen-20', 'troncal-procedimiento-35', 'troncal-regimen-36', 'troncal-organizacion-39',
  'troncal-procedimiento-48', 'troncal-regimen-49', 'troncal-organizacion-52', 'troncal-procedimiento-70',
  'troncal-regimen-71', 'troncal-procedimiento-76', 'troncal-regimen-77', 'troncal-organizacion-80',
  'troncal-procedimiento-104', 'troncal-regimen-105', 'troncal-organizacion-108', 'troncal-procedimiento-117',
  'troncal-regimen-118', 'troncal-organizacion-121', 'troncal-procedimiento-149', 'troncal-regimen-150',
  'troncal-organizacion-153', 'troncal-procedimiento-172', 'troncal-regimen-173', 'troncal-organizacion-176',
  'troncal-procedimiento-195', 'troncal-regimen-196', 'troncal-organizacion-199', 'troncal-procedimiento-208',
  'troncal-regimen-209', 'troncal-organizacion-212', 'troncal-procedimiento-221', 'troncal-regimen-222',
  'troncal-organizacion-225', 'troncal-procedimiento-234', 'troncal-regimen-235', 'troncal-organizacion-238',
  'troncal-organizacion-248', 'troncal-organizacion-256'
];

let matched = 0;
ids.forEach(id => {
  const regex = new RegExp(`\\{\\s*id:\\s*['"]` + id + `['"][\\s\\S]*?\\n\\s*\\}(?:,)?`);
  const match = content.match(regex);
  if (match) {
    matched++;
  } else {
    console.log('Failed to match ID:', id);
  }
});

console.log('Regex matched', matched, 'out of', ids.length);
