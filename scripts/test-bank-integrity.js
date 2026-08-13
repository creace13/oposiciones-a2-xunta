const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { createSnapshot } = require('./lib/bank-integrity');

const root = path.resolve(__dirname, '..');
const expectedPath = path.join(root, 'data', 'BANK-INTEGRITY.json');
const expected = JSON.parse(fs.readFileSync(expectedPath, 'utf8'));
const actual = createSnapshot(root);

assert.deepStrictEqual(actual, expected, [
  'La huella del banco ha cambiado.',
  'Si el cambio es jurídico o editorial e intencionado, revisa el banco y actualiza el contrato en el mismo checkpoint.',
  'Si solo se estaban moviendo archivos, restaura la paridad antes de continuar.'
].join(' '));

console.log('INTEGRIDAD DEL BANCO ANTES DE MODULARIZAR');
console.log(`Preguntas protegidas: ${actual.questionCount}`);
console.log(`Propias: ${actual.classifiedCount}; históricas: ${actual.historicalCount}`);
console.log('IDs, orden, textos, opciones, respuestas, fuentes y explicaciones: SIN CAMBIOS');
console.log('RESULTADO: OK');
