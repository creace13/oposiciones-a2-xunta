const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const workflowPath = path.join(root, '.github', 'workflows', 'quality.yml');
const scopePath = path.join(root, 'docs', 'PRUEBAS-Y-ALCANCE.md');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

assert.ok(fs.existsSync(workflowPath), 'Falta la puerta automática de GitHub Actions.');
const workflow = fs.readFileSync(workflowPath, 'utf8');
const scope = fs.readFileSync(scopePath, 'utf8');

assert.ok(workflow.includes('npm ci'), 'CI debe instalar desde el bloqueo reproducible.');
assert.ok(workflow.includes('npm run test:ci'), 'CI debe ejecutar la misma puerta declarada por el proyecto.');
assert.ok(workflow.includes('playwright install --with-deps chromium webkit'), 'CI debe instalar los motores que forman la puerta obligatoria.');
assert.ok(!workflow.includes('firefox-desktop'), 'Firefox no debe convertirse accidentalmente en puerta obligatoria.');
assert.ok(packageJson.scripts['test:core'], 'Falta la capa de pruebas rápidas y estructurales.');
assert.ok(packageJson.scripts['test:public-core'], 'Falta la capa reproducible con archivos públicos.');
assert.ok(!packageJson.scripts['test:ci'].includes('test:core'), 'CI no debe depender de documentos privados ausentes en GitHub.');
assert.ok(packageJson.scripts['test:dom'], 'La integración DOM debe estar nombrada como tal.');
assert.ok(scope.includes('no es un navegador gráfico completo'), 'Debe explicarse el límite de JSDOM.');
assert.ok(scope.includes('no sustituye una auditoría humana'), 'Debe explicarse el límite de accesibilidad.');
assert.ok(scope.includes('no es una prueba de intrusión'), 'Debe explicarse el límite de seguridad.');
assert.ok(scope.includes('no consulta automáticamente BOE/DOG'), 'Debe explicarse el límite jurídico.');
assert.ok(scope.includes('se excluyen deliberadamente del repositorio público'), 'Debe explicarse por qué CI y la comprobación local no tienen idéntico alcance documental.');

console.log('AUTOMATIZACIÓN CONTINUA Y ALCANCE');
console.log('Workflow, capas y límites documentados: OK');
console.log('Firefox permanece como diagnóstico opcional: OK');
console.log('RESULTADO: OK');
