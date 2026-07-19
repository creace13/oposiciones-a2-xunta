# Plan maestro hasta una versión desplegable

## Principio rector

La aplicación no se considera lista por alcanzar un número de preguntas. Debe superar puertas de calidad jurídica, cobertura, funcionamiento y publicación.

## Fase 1. Fuentes y programa

Objetivo: disponer del programa rector y de las fuentes oficiales necesarias.

Condiciones de cierre:

- convocatoria vigente identificada y guardada;
- 23 temas troncales inventariados;
- fuente oficial asociada a cada tema;
- versión y fecha conocidas;
- cualquier ausencia o problema de consolidación registrado como bloqueo.

Estado: **completada para la Beta según el registro interno**. El bloqueo inicial del Decreto legislativo 1/1999 figura resuelto en `.ia/AUDITORIA-CONTENIDO.md`; su vigencia debe volver a revisarse cuando cambie la norma.

## Fase 2. Auditoría de las preguntas existentes (Completada)

Objetivo inicial: revisar las 266 preguntas semillas originales tema por tema. (Hito histórico completado).

Condiciones de cierre:

- todas las preguntas tienen estado de auditoría y cita verificada;
- toda pregunta activa está verificada o es histórica oficial contrastada;
- las preguntas dudosas fueron corregidas o retiradas;
- no quedan duplicados conceptuales claros.

Estado: **COMPLETADA COMO REVISIÓN INTERNA**. El banco ha evolucionado de 266 preguntas a **1.522 preguntas totales** (1.207 de elaboración propia clasificadas + 315 oficiales de exámenes históricos 2021-2025). Esta declaración no sustituye una revisión jurídica externa e independiente.

## Fase 3. Matriz real de cobertura


Objetivo: medir qué partes del articulado y submaterias están cubiertas después de retirar repeticiones o errores.

Condiciones de cierre:

- mapa tema > submateria > artículo > preguntas;
- identificación de huecos relevantes;
- reparto de dificultad fácil, media y alta;
- comparación con la frecuencia observada en exámenes oficiales.

Estado: **parcial**. Existe recuento por 23 temas y una matriz interna de trabajo, pero la interfaz pública ya no presenta metas de producción como progreso. Esto no debe confundirse con una matriz completa de artículo, submateria, dificultad y frecuencia oficial.

## Fase 4. Ampliación controlada

Objetivo: crear únicamente las preguntas necesarias para cubrir los huecos detectados.

Reglas:

- cada pregunta nueva nace con fuente y cita concreta;
- se audita en el mismo lote en que se crea;
- no se contabiliza como útil hasta superar la auditoría;
- se priorizan cobertura y variedad antes que volumen.

## Fase 5. Exámenes históricos y simulacros

Objetivo: calibrar estilo, dificultad, penalización y distribución con modelos oficiales.

Condiciones de cierre:

- origen y plantilla oficial de cada pregunta histórica;
- simulacros cortos y completos comprobados;
- corrección, preguntas en blanco y penalización validadas;
- diferenciación clara entre formato oficial y test usados solo como aprendizaje.

Estado 1.1: **funcional en integración DOM/JSDOM y validado visualmente por el usuario** en tableta, móvil y PC. Esta evidencia cierra la puerta visual multidispositivo de la versión estable local; no equivale a una auditoría formal de accesibilidad.

## Fase 6. Calidad funcional

Objetivo: asegurar que la aplicación no pierde ni presenta mal el progreso.

Pruebas mínimas:

- navegación y refresco en todas las secciones;
- práctica, simulacro, errores y metas;
- persistencia y recuperación del estado;
- funcionamiento en móvil y escritorio;
- accesibilidad básica con teclado, contraste y lectores;
- enlaces a documentos locales;
- manejo de datos antiguos al actualizar la aplicación.

Estado 1.1: **suite automatizada aprobada** para navegación, práctica, simulacro, filtros, autenticación, persistencia escrita, documentos, métricas y borrado local. El usuario confirma prueba manual satisfactoria en tableta, móvil y PC. Pendientes para la garantía ampliada: accesibilidad asistida y pruebas operativas de recuperación.

## Fase 7. Preparación para compartir

Estado 1.1:

- alojamiento existente en Cloudflare Workers y autenticación en Supabase;
- progreso de estudio local, no sincronizado entre dispositivos;
- información básica de privacidad publicada y borrado local implementado;
- cuentas remotas etiquetadas como Beta mientras no exista borrado remoto autoservicio o un canal privado controlado por el titular;
- pendientes copias/restauración, rollback y mecanismo formal de actualización normativa para definitiva.

## Puerta de despliegue y publicación

Solo se despliega cuando se cumplan simultáneamente estas condiciones:

- contenido activo auditado;
- cobertura mínima acordada y documentada;
- fuentes locales completas y vigentes;
- simulacros y correcciones probados;
- cero errores críticos conocidos;
- prueba real en móvil y ordenador;
- copia de seguridad y procedimiento de actualización definidos;
- autorización expresa del usuario para desplegar.

La Beta ya fue desplegada históricamente. La versión 1.1 puede considerarse estable para uso local porque la suite automatizada y la prueba manual multidispositivo están aprobadas. Cualquier nueva revisión debe tratar el `push` como una posible publicación automática y pedir autorización expresa. Las cuentas remotas conservarán la etiqueta Beta hasta cerrar su ciclo de privacidad; la etiqueta «definitiva» con garantías ampliadas no se utilizará hasta cerrar accesibilidad, operación/recuperación y revisión jurídica independiente.
