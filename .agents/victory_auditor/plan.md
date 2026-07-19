# Plan de Auditoría de Victoria

Este plan detalla los pasos para realizar una auditoría rigurosa e independiente de la finalización del proyecto.

## Fase A: Auditoría de Cronología y Procedencia
- [x] Reconstruir la cronología del proyecto a partir de `.ia/BITACORA-IA.md`, `.ia/ESTADO-PROYECTO.md` y `.agents/orchestrator/PROJECT.md`.
- [x] Comprobar si existen anomalías de marcas de tiempo o patrones de modificación sospechosos en los archivos clave.

## Fase B: Control de Calidad e Integridad (Anti-Trampas)
- [x] Analizar el código fuente de `app.js` en busca de desvíos, trampas o atajos (bypasses o shortcuts).
- [x] Verificar que no existan implementaciones fachada (falsas o simuladas) o resultados de pruebas pre-calculados (hardcoded).
- [x] Comprobar que todas las preguntas están correctamente etiquetadas como `Verificada` o `Verificada y reformulada`.
- [x] Verificar que las referencias legales y fuentes oficiales indicadas en `officialSources` y en el array de preguntas existan físicamente en el disco.

## Fase C: Ejecución Independiente de Pruebas
- [x] Ejecutar la comprobación sintáctica del código mediante `node --check app.js`.
- [x] Ejecutar el script canónico de validación del banco mediante `node scripts/validar-banco.js`.
- [x] Ejecutar el script detallado de validación de preguntas mediante `node scripts/validate-all-questions.js`.
- [x] Comparar los resultados obtenidos de manera independiente con las cifras declaradas por el equipo en `.ia/ESTADO-PROYECTO.md`.
