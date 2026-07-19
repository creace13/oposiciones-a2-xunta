const fs = require('fs');
const source = fs.readFileSync('f:/05_Proyectos [Aplicaciones]/Oposicion [App] --Gemini/app.js', 'utf8');
const lines = source.split('\n');

const targets = ['procedimiento-1', 'procedimiento-2', 'historico-2025-01', 'historico-2025-02', 'historico-2025-03', 'historico-2025-04', 'historico-2025-05'];
const patterns = ['troncal-procedimiento-', 'troncal-regimen-', 'troncal-galicia-', 'troncal-organizacion-'];

const found = [];

lines.forEach((line, index) => {
  const lineNum = index + 1;
  targets.forEach(t => {
    if (line.includes("id: '" + t + "'") || line.includes('id: "' + t + '"')) {
      found.push({ id: t, line: lineNum });
    }
  });
  patterns.forEach(p => {
    if ((line.includes("id: '") || line.includes('id: "')) && line.includes(p)) {
      const match = line.match(/id:\s*['"]([^'"]+)['"]/);
      if (match) {
        found.push({ id: match[1], line: lineNum });
      }
    }
  });
});

console.log(JSON.stringify(found, null, 2));
