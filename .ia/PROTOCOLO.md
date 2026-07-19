# Instrucciones obligatorias para cualquier modelo de IA

Estas instrucciones se aplican por igual a Sol, Terra, Luna, 5.5 y cualquier modelo posterior.

## Antes de realizar cualquier cambio

Leer, en este orden:

1. `.ia/ESTADO-PROYECTO.md`: fotografía canónica del estado actual y siguiente tarea.
2. `.ia/PLAN-MAESTRO.md`: fases, prioridades y condiciones de cierre.
3. `.ia/AUDITORIA-CONTENIDO.md`: registro jurídico y temas auditados.
4. `.ia/BITACORA-IA.md`: últimas decisiones y traspasos entre modelos.

Si el chat ha sido compactado, resumido o heredado de otro modelo, volver a leer estos cuatro archivos. No reconstruir el estado desde la memoria del chat.

## Reglas no negociables

- No desplegar ni publicar la aplicación hasta superar la puerta de despliegue definida en `.ia/PLAN-MAESTRO.md`.
- La exactitud jurídica tiene prioridad sobre la cantidad y la velocidad.
- No ampliar el banco mientras exista un lote de auditoría abierto, salvo instrucción expresa del usuario.
- No marcar una pregunta como verificada sin contrastar enunciado, respuesta, distractores, explicación y cita con una fuente oficial identificada.
- No usar memoria general del modelo como sustituto de una fuente jurídica.
- Si falta una versión vigente o consolidada fiable, marcar el tema como bloqueado.
- Conservar los archivos y cambios existentes del usuario.
- Toda respuesta correcta y toda respuesta incorrecta deben permanecer justificadas.
- Detectar duplicación conceptual, no solamente textos idénticos.

## Al terminar cualquier sesión de trabajo

1. Ejecutar `node --check app.js` y `node scripts/validar-banco.js`, además de las comprobaciones específicas del cambio.
2. Actualizar `.ia/AUDITORIA-CONTENIDO.md` si se revisó contenido.
3. Actualizar `.ia/ESTADO-PROYECTO.md` con cifras, bloqueos y siguiente tarea exacta.
4. Añadir una entrada breve a `.ia/BITACORA-IA.md` usando su plantilla.
5. No declarar una fase terminada si queda alguna comprobación pendiente.

## Regla para discrepancias

Si dos archivos se contradicen, detener la mutación y comprobar el estado real en el código y las fuentes oficiales. Después corregir `.ia/ESTADO-PROYECTO.md` y dejar constancia en la bitácora.
