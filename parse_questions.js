const fs = require('fs');
const path = require('path');
const vm = require('vm');

try {
  const appJsPath = path.join(__dirname, '..', '..', 'app.js');
  const appJsContent = fs.readFileSync(appJsPath, 'utf8');

  // Get lines 1 to 2000
  const lines = appJsContent.split('\n');
  const questionsPart = lines.slice(0, 2000).join('\n');

  // Replace const with var for the main globals so they attach to context
  const questionsPartWithVar = questionsPart
    .replace(/^const\s+officialSources\b/m, 'var officialSources')
    .replace(/^const\s+questions\b/m, 'var questions');

  const context = vm.createContext({ console });
  
  try {
    vm.runInContext(questionsPartWithVar, context);
  } catch (evalErr) {
    console.error('Error during eval in context:', evalErr);
  }

  const questions = context.questions;
  const officialSources = context.officialSources;

  if (!questions) {
    console.error('context.questions is undefined! keys in context:', Object.keys(context));
    return;
  }

  console.log(`Total questions loaded: ${questions.length}`);

  const results = [];
  const topicCounts = {};

  questions.forEach(q => {
    // A question is verified if its `quality` property starts with 'Verificada'.
    const verified = q.quality && q.quality.startsWith('Verificada') ? true : false;
    const status = verified ? 'Verified' : 'Pending';
    
    if (!topicCounts[q.topic]) {
      topicCounts[q.topic] = { total: 0, verified: 0, pending: 0 };
    }
    
    topicCounts[q.topic].total++;
    if (verified) {
      topicCounts[q.topic].verified++;
    } else {
      topicCounts[q.topic].pending++;
    }
    
    results.push({
      id: q.id,
      topic: q.topic,
      status: status,
      quality: q.quality || 'None',
      source: q.source,
      sourceUrl: q.sourceUrl,
      text: q.text
    });
  });

  fs.writeFileSync(
    path.join(__dirname, 'extracted_questions.json'), 
    JSON.stringify({ results, topicCounts, officialSources }, null, 2)
  );
  console.log('Successfully wrote extracted_questions.json');
} catch (err) {
  console.error('Error parsing questions:', err);
}
