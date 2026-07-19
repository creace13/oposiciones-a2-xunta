const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

// Find lines containing officialSources or how the questions use sourceUrl
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('officialSources')) {
    console.log(`${idx + 1}: ${line}`);
  }
});
