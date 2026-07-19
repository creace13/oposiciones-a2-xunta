# Respuesta correctiva — métricas reales del banco

Fecha: 19 de julio de 2026
Modelo: Codex / OpenAI
Rol: constructor y auditor, con autorización expresa del titular

## Motivo de reapertura

Dos capturas aportadas por el usuario mostraron que el cierre anterior seguía siendo insuficiente: aunque la meta de 1.210 se había descrito como interna, la interfaz todavía mostraba `1.207/1.210` y un `99,8 %` en tarjetas visualmente presentadas como avance o progreso.

La aritmética era correcta, pero su significado seguía siendo inadecuado. Una meta de producción del banco no mide el progreso del opositor, la calidad jurídica ni la cobertura material del programa.

## Corrección aplicada

- «Banco propio clasificado 1.207/1.210» se sustituyó por «Banco disponible 1.522».
- El desglose visible queda en 1.207 preguntas propias de temario y 315 oficiales.
- Bloque I y Bloque II muestran únicamente 302 y 905 preguntas, sin denominadores ni porcentajes de producción.
- «Avance por tema» pasa a «Distribución por tema».
- «Progreso real 99,8 %» se sustituye por el recuento «Banco propio 1.207».
- Se retiraron porcentajes, barras de cumplimiento y objetivos de cada tema.
- Se retiraron afirmaciones de «100 % de cobertura» cuando solo estaban respaldadas por cantidad.
- El estado editorial visible queda como «Revisión continua».
- La versión se elevó a `1.1.1` y el identificador de caché a `v19-stable-local-20260719`.

## Archivos modificados

- `index.html`
- `app.js`
- `styles.css`
- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `scripts/test-browser-e2e.js`
- `package.json`
- `package-lock.json`

## Pruebas

- `node --check app.js`: aprobado.
- `npm test`: aprobado.
- Banco: 1.522 preguntas, 0 incompletas, 0 duplicadas y 0 fuentes locales ausentes.
- Regresiones añadidas para impedir que reaparezcan `99,8 %`, `1.207/1.210` o «objetivo interno de volumen».
- `scripts/sync-public.js`: aprobado; raíz y paquete público sincronizados mediante lista blanca y SHA-256.
- Checkpoint de implementación: `44188e2`.

## Resultado

El hallazgo queda corregido en local. La interfaz ya no convierte una antigua meta interna de construcción en una métrica dirigida al opositor.

No se hizo `push` ni despliegue. La página pública conservará la versión anterior hasta recibir autorización expresa del titular.

## Ayuda si el error reaparece

1. No utilizar objetivos de producción como porcentajes de progreso del usuario.
2. Mostrar cantidades absolutas y explicar su procedencia.
3. Reservar «progreso», «preparación» y «rendimiento» para datos derivados de la actividad real del opositor.
4. Mantener las regresiones negativas que buscan `1.207/1.210` y `99,8 %`.
5. Ejecutar la sincronización de `public/` antes de cualquier publicación.
