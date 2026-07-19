const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

const targets = ['troncal-elecciones-27', 'troncal-valedor-28', 'troncal-consultivo-29', 'troncal-ljca-12'];

targets.forEach(target => {
  const index = source.indexOf(`'${target}'`);
  if (index !== -1) {
    // Find the enclosing object { ... }
    const start = source.lastIndexOf('{', index);
    let bracesCount = 1;
    let end = start + 1;
    while (bracesCount > 0 && end < source.length) {
      if (source[end] === '{') bracesCount++;
      if (source[end] === '}') bracesCount--;
      end++;
    }
    console.log(`=== ${target} ===`);
    console.log(source.substring(start, end));
  } else {
    console.log(`Could not find ${target}`);
  }
});
