const fs = require('fs');

const files = [
  'f:/05_Proyectos [Aplicaciones]/Oposicion [App] --Gemini/app.js',
  'f:/05_Proyectos [Aplicaciones]/Oposicion [App] --Gemini/.agents/teamwork_preview_worker_milestone2/apply_regex_updates.js'
];

files.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/quality:\s*'Histórica oficial · Verificada · A2 promoción específica 2025'/g, "quality: 'Verificada · Histórica oficial · A2 promoción específica 2025'");
  fs.writeFileSync(p, content, 'utf8');
});

console.log('Successfully updated quality fields in app.js and apply_regex_updates.js');
