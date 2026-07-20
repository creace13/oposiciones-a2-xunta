# Instrucciones obligatorias para cualquier modelo de IA

Estas instrucciones se aplican por igual a Gemini/Antigravity (Google), Codex (OpenAI), Sol, Terra, Luna y cualquier modelo posterior.

## Roles y autorización de modelos

- El rol depende de la tarea y de la autorización del usuario, no de la marca del modelo.
- Desde el 20 de julio de 2026, por instrucción expresa del titular, **Codex/OpenAI queda designado como titular operativo del proyecto**: puede actuar como auditor, constructor y gestor documental mientras respete este protocolo y las autorizaciones de publicación.
- **Gemini/Antigravity y Codex/OpenAI pueden actuar como constructores**: leer, editar, probar y documentar el proyecto cuando el usuario lo autorice.
- Cualquiera de ellos puede actuar también como auditor. Si un modelo pasa de auditor a constructor, debe declararlo en la bitácora y en su informe de cierre.
- Un modelo constructor debe atender los hallazgos abiertos igual que cualquier relevo: no puede dar por resuelto un punto sin evidencia reproducible.
- La revisión cruzada entre proveedores es recomendable para una versión definitiva, pero no bloquea correcciones de Beta autorizadas expresamente por el usuario.

## Gestión de cuota, modelos y razonamiento

- El modo operativo normal será trabajar con el modelo disponible en razonamiento medio, optimizando contexto, lecturas y pruebas para no consumir cuota de forma innecesaria.
- Antes de solicitar o recomendar un modelo/razonamiento superior, Codex debe explicar al titular por qué la tarea lo justifica y qué riesgo se reduce al hacerlo.
- Las tareas candidatas a razonamiento alto se registran en `.ia/COLA-ALTO-RAZONAMIENTO.md`. Esta cola no sustituye a `.ia/COLA-ACTIVA.md`: solo sirve para reservar trabajos que pueden requerir más capacidad.
- Si una tarea de la cola activa puede resolverse con razonamiento medio y pruebas objetivas, se ejecuta sin elevar modelo.
- Ejemplos de tareas que pueden justificar razonamiento superior: revisión de seguridad/autenticación con impacto en datos reales, cierre final de versión definitiva, auditoría jurídica compleja de muchas normas, rediseños de arquitectura o fallos no reproducibles tras varios intentos razonables.

## Antes de realizar cualquier cambio

Leer, en este orden:

1. `.ia/ESTADO-PROYECTO.md`: fotografía canónica del estado actual y siguiente tarea.
2. `.ia/COLA-ACTIVA.md`: único listado ejecutable de trabajo pendiente, dependencias y bloqueos.
3. `.ia/COLA-ALTO-RAZONAMIENTO.md`: cola interna para decidir cuándo conviene pedir al titular usar un modelo o razonamiento superior.
4. `.ia/PLAN-MAESTRO.md`: fases, prioridades y condiciones de cierre.
5. `.ia/AUDITORIA-CONTENIDO.md`: registro jurídico y temas auditados.
6. `.ia/BITACORA-IA.md`: últimas decisiones y traspasos entre modelos.
7. `.ia/auditorias/CICLOS.md`, `.ia/auditorias/INDEX.md` y los últimos informes correlativos: reconstruir el ciclo vigente y revisar observaciones abiertas.

Si el chat ha sido compactado, resumido o heredado de otro modelo, volver a leer estos archivos. No reconstruir el estado desde la memoria del chat.

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
  4. Hacer `push` o desplegar conforme a la autorización vigente del titular.

### Autorización vigente de publicación

- Desde el 20 de julio de 2026, el titular concede a Codex/OpenAI autorización permanente para hacer `push` a `origin/main` tras checkpoints validados y documentados, aunque el push active publicación automática en Cloudflare Workers.
- Esta autorización cubre cambios ordinarios del proyecto: código, UIX, documentación, pruebas, informes, sincronización de `public/` y correcciones verificadas.
- No cubre acciones destructivas o de alto riesgo fuera del alcance normal: borrar repositorios, reescribir historial remoto, exponer secretos, crear despliegues temporales en otra cuenta, cambiar credenciales, eliminar datos de Supabase o modificar configuración sensible sin evidencia y justificación.
- Tras cada `push`, Codex debe comprobar el estado de Git y, cuando sea razonable, verificar que la web pública responde o indicar por qué no pudo comprobarse.

## Informes Inter-IA y orden documental

- Todo informe nuevo se guarda directamente en `.ia/auditorias/` con una secuencia única y correlativa: `NN-TIPO-ASUNTO-MODELO-AAAA-MM-DD.md`.
- Tipos admitidos: `AUDITORIA`, `RESPUESTA`, `ANEXO` y `CIERRE`.
- No se reutiliza un número, aunque dos documentos pertenezcan al mismo asunto.
- Todo informe se registra inmediatamente en `.ia/auditorias/INDEX.md` con su estado: `ABIERTO`, `ATENDIDO`, `CERRADO` o `HISTÓRICO`.
- Los informes cerrados no se mueven ni se renombran: permanecen en la raíz de `.ia/auditorias/` para conservar enlaces y trazabilidad.
- `README.md` explica cómo orientarse, `INDEX.md` conserva la secuencia completa y `CICLOS.md` agrupa rangos por etapa sin duplicar informes.
- El constructor que atienda una auditoría debe emitir una `RESPUESTA` con los archivos cambiados, pruebas ejecutadas, limitaciones y siguiente paso.

## Ciclos y cola activa

- La secuencia numérica de informes es global y nunca se reinicia al abrir un ciclo nuevo.
- Un ciclo agrupa una finalidad concreta y se identifica como `C01`, `C02`, etc. Su alcance y rango de informes se registran en `.ia/auditorias/CICLOS.md`.
- El único backlog operativo es `.ia/COLA-ACTIVA.md`. No se deben ejecutar listas antiguas de informes cerrados como si siguieran pendientes.
- `.ia/COLA-ALTO-RAZONAMIENTO.md` no es backlog operativo: es un registro de tareas donde Codex debe valorar si conviene pedir más razonamiento antes de ejecutarlas.
- Cada elemento de cola usa un identificador estable `CXX-NN`, prioridad `P0`, `P1` o `P2`, estado, dependencias y evidencia exigida para cerrarlo.
- Estados admitidos: `PENDIENTE`, `EN CURSO`, `BLOQUEADO` y `HECHO`. Solo puede haber un elemento `EN CURSO` en toda la cola para evitar trabajo duplicado entre modelos.
- Si un elemento está bloqueado por una decisión, credencial o revisión externa, debe indicarse quién puede desbloquearlo. Mientras tanto se continúa con el siguiente elemento ejecutable de mayor prioridad.
- Un elemento pasa a `HECHO` únicamente cuando existe evidencia reproducible y su `RESPUESTA` correlativa está registrada en `INDEX.md`.
- Un ciclo se cierra mediante un informe `CIERRE` cuando todos sus elementos están en `HECHO` o han sido trasladados justificadamente a otro ciclo.
- La expresión «100 % funcional y lista» se interpreta como una puerta operativa verificable definida en la cola; nunca como garantía absoluta de ausencia futura de fallos o cambios normativos.

## Al terminar cualquier sesión de trabajo

1. Ejecutar `node --check app.js` y `node scripts/validar-banco.js`, además de las comprobaciones específicas del cambio.
2. Actualizar `.ia/AUDITORIA-CONTENIDO.md` si se revisó contenido.
3. Actualizar `.ia/ESTADO-PROYECTO.md` con cifras, bloqueos y siguiente tarea exacta.
4. Actualizar el estado del elemento correspondiente en `.ia/COLA-ACTIVA.md`.
5. Añadir una entrada breve a `.ia/BITACORA-IA.md` usando su plantilla.
6. Emitir y registrar el informe correlativo en `.ia/auditorias/`.
7. No declarar una fase o ciclo terminado si queda alguna comprobación pendiente.

## Regla para discrepancias

Si dos archivos se contradicen, detener la mutación y comprobar el estado real en el código y las fuentes oficiales. Después corregir `.ia/ESTADO-PROYECTO.md` y dejar constancia en la bitácora.
