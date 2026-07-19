# Instrucciones obligatorias para cualquier modelo de IA

Estas instrucciones se aplican por igual a Gemini/Antigravity (Google), Codex (OpenAI), Sol, Terra, Luna y cualquier modelo posterior.

## Roles y autorización de modelos

- El rol depende de la tarea y de la autorización del usuario, no de la marca del modelo.
- **Gemini/Antigravity y Codex/OpenAI pueden actuar como constructores**: leer, editar, probar y documentar el proyecto cuando el usuario lo autorice.
- Cualquiera de ellos puede actuar también como auditor. Si un modelo pasa de auditor a constructor, debe declararlo en la bitácora y en su informe de cierre.
- Un modelo constructor debe atender los hallazgos abiertos igual que cualquier relevo: no puede dar por resuelto un punto sin evidencia reproducible.
- La revisión cruzada entre proveedores es recomendable para una versión definitiva, pero no bloquea correcciones de Beta autorizadas expresamente por el usuario.

## Antes de realizar cualquier cambio

Leer, en este orden:

1. `.ia/ESTADO-PROYECTO.md`: fotografía canónica del estado actual y siguiente tarea.
2. `.ia/PLAN-MAESTRO.md`: fases, prioridades y condiciones de cierre.
3. `.ia/AUDITORIA-CONTENIDO.md`: registro jurídico y temas auditados.
4. `.ia/BITACORA-IA.md`: últimas decisiones y traspasos entre modelos.
5. `.ia/auditorias/INDEX.md` y los últimos informes correlativos: revisar las observaciones abiertas y sus respuestas.

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

## Protocolo de Puntos de Guardado e Hitos (Checkpoints)

- Cada vez que se complete un hito o tarea considerable (por ejemplo, corregir un bug P0, aislar el directorio de producción, ajustar autenticación o unificar métricas), se debe:
  1. Validar la integridad del código (`node --check app.js`, `node scripts/validar-banco.js`).
  2. Registrar la actualización en `.ia/ESTADO-PROYECTO.md` y `.ia/BITACORA-IA.md`.
  3. Realizar un commit local con un mensaje descriptivo que funcione como punto de guardado oficial e identificable.
  4. Hacer `push` o desplegar únicamente con autorización expresa del usuario, especialmente cuando la rama esté conectada a despliegue automático.

## Informes Inter-IA y orden documental

- Todo informe nuevo se guarda directamente en `.ia/auditorias/` con una secuencia única y correlativa: `NN-TIPO-ASUNTO-MODELO-AAAA-MM-DD.md`.
- Tipos admitidos: `AUDITORIA`, `RESPUESTA`, `ANEXO` y `CIERRE`.
- No se reutiliza un número, aunque dos documentos pertenezcan al mismo asunto.
- Todo informe se registra inmediatamente en `.ia/auditorias/INDEX.md` con su estado: `ABIERTO`, `ATENDIDO`, `CERRADO` o `HISTÓRICO`.
- `INDEX.md` y `README.md` son los únicos documentos de navegación de esa carpeta. Los informes conservan su nombre para no romper la trazabilidad.
- El constructor que atienda una auditoría debe emitir una `RESPUESTA` con los archivos cambiados, pruebas ejecutadas, limitaciones y siguiente paso.

## Al terminar cualquier sesión de trabajo

1. Ejecutar `node --check app.js` y `node scripts/validar-banco.js`, además de las comprobaciones específicas del cambio.
2. Actualizar `.ia/AUDITORIA-CONTENIDO.md` si se revisó contenido.
3. Actualizar `.ia/ESTADO-PROYECTO.md` con cifras, bloqueos y siguiente tarea exacta.
4. Añadir una entrada breve a `.ia/BITACORA-IA.md` usando su plantilla.
5. Emitir y registrar el informe correlativo en `.ia/auditorias/`.
6. No declarar una fase terminada si queda alguna comprobación pendiente.

## Regla para discrepancias

Si dos archivos se contradicen, detener la mutación y comprobar el estado real en el código y las fuentes oficiales. Después corregir `.ia/ESTADO-PROYECTO.md` y dejar constancia en la bitácora.
