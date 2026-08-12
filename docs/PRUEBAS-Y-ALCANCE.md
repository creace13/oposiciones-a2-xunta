# Pruebas y alcance real

Actualizado: 12 de agosto de 2026.

Este documento explica qué comprueban las pruebas del proyecto y qué no puede deducirse de ellas. Una prueba aprobada reduce riesgos concretos; no demuestra que la aplicación carezca de cualquier fallo ni certifica el contenido jurídico.

## Puertas que se ejecutan juntas

`npm test` ejecuta dos capas:

1. `npm run test:core`: revisa estructura del banco, explicaciones históricas, filtros, modo local, accesibilidad básica, recuperación, cabeceras de seguridad, mantenimiento normativo, continuidad, exposición pública e integración de la interfaz en un DOM simulado.
2. `npm run test:playwright`: recorre la aplicación servida de verdad con Chromium y WebKit en escritorio y con perfiles Pixel e iPhone.

La automatización de GitHub ejecuta `npm run test:ci` en cada cambio propuesto y en cada publicación sobre `main`. Repite todas las puertas que dependen únicamente de archivos públicos y los recorridos Playwright. Las pruebas de recuperación, aceptación y continuidad privada se ejecutan localmente con `npm test`, porque usan documentos que se excluyen deliberadamente del repositorio público. La automatización no necesita secretos ni modifica datos de usuarias.

## Qué significa cada nombre

- DOM/JSDOM: carga el HTML y la aplicación reales en un navegador simulado. Es rápido y permite comprobar datos, migraciones y comportamiento, pero no es un navegador gráfico completo.
- Playwright E2E: abre la web local en motores de navegador reales y recorre acciones de usuaria.
- Perfil móvil: usa tamaño, agente y comportamiento aproximado de un dispositivo; no equivale a probar físicamente todos los móviles.
- Accesibilidad básica: comprueba estructura, foco y contraste seleccionado; no sustituye una auditoría humana con lector de pantalla.
- Seguridad básica: comprueba dependencias, exposición y cabeceras concretas; no es una prueba de intrusión.
- Validación jurídica: comprueba que existen campos, fuentes y explicaciones y que determinados lotes revisados conservan sus decisiones; no consulta automáticamente BOE/DOG ni sustituye una revisión profesional independiente.

## Firefox

Firefox queda como diagnóstico opcional mediante `npm run test:firefox`. En el entorno Windows del proyecto, el motor instalado falla antes de abrir la página por un problema de la herramienta de automatización. Como el fallo ocurre antes de cargar la aplicación, no se usa como puerta obligatoria ni se presenta como defecto demostrado del producto. Se podrá reincorporar cuando el recorrido sea reproducible.

## Criterio de cierre

Un bloque solo se cierra cuando pasan las comprobaciones relacionadas con lo modificado. Las cifras de recorridos pueden aumentar al añadir casos; se informa del número real de cada ejecución, sin convertirlo en una garantía absoluta.
