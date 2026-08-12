# Plan de mantenimiento técnico por piezas

Actualizado: 12 de agosto de 2026.

Este documento clasifica tres deudas conocidas sin convertirlas en una reescritura global: el tamaño de `app.js`, la política de seguridad del navegador y los archivos históricos de construcción.

## Decisión general

La aplicación está operativa y sus recorridos principales pasan. Dividirla entera de una vez introduciría más riesgo que beneficio inmediato. El mantenimiento se hará mediante cambios pequeños, cada uno con recuento del banco, pruebas, punto de guardado y posibilidad clara de volver atrás.

## 1. Archivo principal de gran tamaño

`app.js` contiene aproximadamente 30.600 líneas y 2,9 MB. La mayor parte corresponde al banco y a las ampliaciones históricas; la lógica de la aplicación comienza cerca del final del archivo.

Clasificación: modernización necesaria a medio plazo, pero no bloqueo funcional actual.

Orden seguro de separación futura:

1. congelar por prueba los 1.522 identificadores, respuestas, fuentes y recuentos;
2. extraer solo los datos del banco a un archivo cargado antes del motor, sin cambiar contenido;
3. extraer en un segundo bloque las ampliaciones y advertencias históricas;
4. separar después persistencia, panel, práctica, simulacro e historial, una pieza por checkpoint;
5. medir tamaño y tiempo de carga antes y después de cada extracción.

No se mezclarán en un mismo bloque una separación de archivos y una corrección jurídica.

## 2. Política de seguridad del navegador

La ejecución general de scripts inline ya está desactivada. El arranque temprano vive en `bootstrap.js`, los botones usan eventos registrados por la aplicación y el JSON-LD se autoriza únicamente mediante su hash exacto. Esto reduce la posibilidad de ejecutar código introducido accidentalmente en el HTML.

Permanece `unsafe-inline` para estilos porque la interfaz conserva atributos visuales inline. Retirarlo exige mover esos estilos a clases CSS y se hará en un bloque visual independiente para evitar regresiones de diseño.

La aplicación aún genera algunas secciones con plantillas HTML. El banco es estático y controlado por el proyecto; aun así, el criterio futuro es escapar todo texto y validar todo enlace antes de mostrar cualquier dato que pueda proceder de formularios, importaciones o servicios externos.

Clasificación:

- scripts inline: endurecimiento inmediato completado;
- estilos inline: modernización gradual, no defecto explotable demostrado;
- plantillas HTML: deuda controlada; prohibido incorporar datos externos sin saneamiento específico.

## 3. Archivos históricos y duplicados

No se elimina nada automáticamente. Inventario actual:

| Elemento | Situación comprobada | Decisión actual |
| --- | --- | --- |
| `data/temario-a2-2025.json` | Está citado por `docs/FUENTES_OFICIALES.md` como estructuración del temario. | Conservar. |
| `parse_questions.js` | Herramienta antigua de extracción; su ruta relativa ya no coincide con la ubicación actual y no participa en las pruebas ni en producción. | Candidato a archivar o retirar; requiere decisión del titular. |
| `scratch_pac.js` | Fragmento de preguntas, no programa ejecutable ni dependencia de producción. | Candidato a archivar o retirar; requiere decisión del titular. |
| `og-image.jpg` y `public/og-image.jpg` | Copias necesarias: fuente de despliegue y activo publicado. | Conservar. |
| `assets/og-image.jpg` y `docs/og-image.jpg` | Copias idénticas por SHA-256 sin referencia de ejecución. | Candidatas a consolidar tras revisar su uso histórico. |
| `og-image.png` | Variante PNG no enlazada por la aplicación. | Candidata a archivar o retirar tras decisión. |

## Decisiones apartadas para el titular

Cuando vuelva, el titular podrá decidir en conjunto si los dos scripts históricos y las tres copias de imagen candidatas se archivan, se eliminan del repositorio activo o se conservan con una nota de procedencia. Ninguna de estas decisiones bloquea el uso de la aplicación.

La licencia permanece en un bloque separado porque afecta a derechos de uso y modelo de distribución; no se resuelve como limpieza técnica.
