const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
const lines = fs.readFileSync(appPath, 'utf8').split('\n');

const targets = [
  // Patrimonio
  'troncal-patrimonio-30', 'troncal-patrimonio-34', 'troncal-patrimonio-47',
  'troncal-patrimonio-75', 'troncal-patrimonio-103', 'troncal-patrimonio-116',
  'troncal-patrimonio-148', 'troncal-patrimonio-171', 'troncal-patrimonio-194',
  'troncal-patrimonio-207', 'troncal-patrimonio-220', 'troncal-patrimonio-233',
  'troncal-patrimonio-246', 'troncal-patrimonio-253',

  // Financiero
  'troncal-financiero-31', 'troncal-financiero-37', 'troncal-financiero-50',
  'troncal-financiero-78', 'troncal-financiero-106', 'troncal-financiero-119',
  'troncal-financiero-151', 'troncal-financiero-174', 'troncal-financiero-197',
  'troncal-financiero-210', 'troncal-financiero-223', 'troncal-financiero-236',
  'troncal-financiero-247', 'troncal-financiero-254',

  // Subvenciones
  'troncal-subvenciones-32', 'troncal-subvenciones-38', 'troncal-subvenciones-51',
  'troncal-subvenciones-74', 'troncal-subvenciones-79', 'troncal-subvenciones-107',
  'troncal-subvenciones-120', 'troncal-subvenciones-152', 'troncal-subvenciones-175',
  'troncal-subvenciones-198', 'troncal-subvenciones-211', 'troncal-subvenciones-224',
  'troncal-subvenciones-237', 'troncal-subvenciones-255'
];

targets.forEach(id => {
  let start = -1;
  let braceCount = 0;
  let inObj = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`id: '${id}'`) || lines[i].includes(`id: "${id}"`)) {
      // search backwards for the opening brace of this object
      for (let j = i; j >= 0; j--) {
        if (lines[j].trim() === '{' || lines[j].trim().startsWith('{')) {
          start = j;
          break;
        }
      }
      break;
    }
  }
  
  if (start !== -1) {
    // search forwards for the closing brace
    let end = -1;
    let braces = 0;
    for (let i = start; i < lines.length; i++) {
      const line = lines[i];
      for (let char of line) {
        if (char === '{') braces++;
        if (char === '}') braces--;
      }
      if (braces === 0) {
        end = i;
        break;
      }
    }
    console.log(`ID: ${id} -> Lines: ${start + 1} to ${end + 1}`);
  } else {
    console.log(`ID: ${id} -> NOT FOUND`);
  }
});
