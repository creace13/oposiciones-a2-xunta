const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const lines = content.split('\n');

const ids = [
  // Empleo público (Galicia)
  'empleo-1',
  'troncal-empleo-15',
  'troncal-empleo-42',
  'troncal-empleo-55',
  'troncal-empleo-73',
  'troncal-empleo-83',
  'troncal-empleo-111',
  'troncal-empleo-124',
  'troncal-empleo-156',
  'troncal-empleo-179',
  'troncal-empleo-202',
  'troncal-empleo-215',
  'troncal-empleo-228',
  'troncal-empleo-241',
  // Contratos
  'troncal-contratos-13',
  'troncal-contratos-21',
  'troncal-contratos-40',
  'troncal-contratos-53',
  'troncal-contratos-72',
  'troncal-contratos-81',
  'troncal-contratos-109',
  'troncal-contratos-122',
  'troncal-contratos-154',
  'troncal-contratos-177',
  'troncal-contratos-200',
  'troncal-contratos-213',
  'troncal-contratos-226',
  'troncal-contratos-239',
  // TREBEP
  'troncal-trebep-14',
  'troncal-trebep-22',
  'troncal-trebep-41',
  'troncal-trebep-54',
  'troncal-trebep-82',
  'troncal-trebep-110',
  'troncal-trebep-123',
  'troncal-trebep-155',
  'troncal-trebep-178',
  'troncal-trebep-201',
  'troncal-trebep-214',
  'troncal-trebep-227',
  'troncal-trebep-240',
  'troncal-trebep-257'
];

ids.forEach(id => {
  let start = -1;
  let end = -1;
  let braces = 0;
  let found = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(`id: '${id}'`) || line.includes(`id: "${id}"`)) {
      start = i;
      found = true;
      // find the end of the object. Look for matching braces or closing list item.
      // Usually, a question is defined as:
      // {
      //   id: '...',
      //   ...
      // } or on a single line or multiple lines. Let's find where the closing brace is.
    }
    if (found) {
      // count braces
      const openCount = (line.match(/{/g) || []).length;
      const closeCount = (line.match(/}/g) || []).length;
      braces += openCount - closeCount;
      if (braces === 0 && i >= start) {
        end = i;
        break;
      }
    }
  }
  
  if (found) {
    console.log(`ID: ${id} | Lines: ${start + 1} to ${end + 1}`);
  } else {
    console.log(`ID: ${id} | NOT FOUND`);
  }
});
