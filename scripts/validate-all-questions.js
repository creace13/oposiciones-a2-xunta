const fs = require('fs');
const path = require('path');
const vm = require('vm');

try {
  const appJsPath = path.join(__dirname, '..', 'app.js');
  const appJsContent = fs.readFileSync(appJsPath, 'utf8');

  // Replace const with var so they bind to the global context
  const appJsContentWithVar = appJsContent
    .replace(/^const\s+officialSources\b/m, 'var officialSources')
    .replace(/^const\s+questions\b/m, 'var questions');

  const mockWindow = new Proxy({}, {
    get: (target, prop) => {
      if (prop === 'addEventListener') return () => {};
      if (prop === 'location') return { href: '', hash: '' };
      return undefined;
    }
  });

  const mockElement = {
    addEventListener: () => {},
    setAttribute: () => {},
    removeAttribute: () => {},
    style: {},
    dataset: {},
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => {},
      contains: () => false
    },
    querySelector: () => mockElement,
    querySelectorAll: () => [mockElement],
    get textContent() { return ''; },
    set textContent(val) {},
    get innerHTML() { return ''; },
    set innerHTML(val) {}
  };

  const mockDocument = new Proxy({}, {
    get: (target, prop) => {
      if (prop === 'addEventListener') return () => {};
      if (prop === 'getElementById') return () => mockElement;
      if (prop === 'querySelector') return () => mockElement;
      if (prop === 'querySelectorAll') return () => [mockElement];
      if (prop === 'createElement') return () => mockElement;
      if (prop === 'documentElement') return mockElement;
      return undefined;
    }
  });

  const context = vm.createContext({
    window: mockWindow,
    document: mockDocument,
    console,
    setTimeout: setTimeout,
    setInterval: setInterval
  });

  // Execute the file
  vm.runInContext(appJsContentWithVar, context);

  const questions = context.questions;
  if (!questions) {
    console.error('FAIL: questions array not found');
    process.exit(1);
  }

  // 42 target question IDs
  const targetIds = [
    'troncal-patrimonio-30', 'troncal-patrimonio-34', 'troncal-patrimonio-47', 'troncal-patrimonio-75',
    'troncal-patrimonio-103', 'troncal-patrimonio-116', 'troncal-patrimonio-148', 'troncal-patrimonio-171',
    'troncal-patrimonio-194', 'troncal-patrimonio-207', 'troncal-patrimonio-220', 'troncal-patrimonio-233',
    'troncal-patrimonio-246', 'troncal-patrimonio-253',

    'troncal-financiero-31', 'troncal-financiero-37', 'troncal-financiero-50', 'troncal-financiero-78',
    'troncal-financiero-106', 'troncal-financiero-119', 'troncal-financiero-151', 'troncal-financiero-174',
    'troncal-financiero-197', 'troncal-financiero-210', 'troncal-financiero-223', 'troncal-financiero-236',
    'troncal-financiero-247', 'troncal-financiero-254',

    'troncal-subvenciones-32', 'troncal-subvenciones-38', 'troncal-subvenciones-51', 'troncal-subvenciones-74',
    'troncal-subvenciones-79', 'troncal-subvenciones-107', 'troncal-subvenciones-120', 'troncal-subvenciones-152',
    'troncal-subvenciones-175', 'troncal-subvenciones-198', 'troncal-subvenciones-211', 'troncal-subvenciones-224',
    'troncal-subvenciones-237', 'troncal-subvenciones-255'
  ];

  let verifiedCount = 0;
  let errorCount = 0;

  console.log('=== DETAILED AUDIT VERIFICATION OF 42 QUESTIONS ===\n');

  targetIds.forEach(id => {
    const q = questions.find(item => item.id === id);
    if (!q) {
      console.error(`FAIL: Question with ID ${id} not found in app.js!`);
      errorCount++;
      return;
    }

    const isVerified = q.quality && q.quality.startsWith('Verificada');
    const hasSource = q.source && q.source.length > 0;
    const hasExplanation = q.explanation && q.explanation.length > 0;
    const hasFourOptions = q.options && q.options.length === 4;
    const correctOption = q.correct;
    
    // Check correct option values
    let optionMatch = false;
    if (hasFourOptions && correctOption >= 0 && correctOption <= 3) {
      optionMatch = true;
    }

    if (isVerified && hasSource && hasExplanation && optionMatch) {
      verifiedCount++;
      console.log(`[OK] ${id} - Source: ${q.source} - Quality: "${q.quality}"`);
    } else {
      console.error(`[FAIL] ${id} fails validation:`);
      console.error(`  - Quality: "${q.quality}" (Verified: ${isVerified})`);
      console.error(`  - Source: "${q.source}"`);
      console.error(`  - Explanation: "${q.explanation}"`);
      console.error(`  - Options length: ${q.options ? q.options.length : 0}`);
      console.error(`  - Correct Option: ${correctOption}`);
      errorCount++;
    }
  });

  console.log(`\nVerification Summary:`);
  console.log(`- Verified successfully: ${verifiedCount} / 42`);
  console.log(`- Errors found: ${errorCount}`);

  if (errorCount > 0) {
    process.exit(1);
  } else {
    console.log('\nAll 42 questions fully validated. Outstanding work!');
  }

} catch (err) {
  console.error('FAIL: Error during detailed validation:', err);
  process.exit(1);
}
