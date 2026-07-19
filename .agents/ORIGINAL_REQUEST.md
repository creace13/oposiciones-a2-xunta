# Original User Request

## Initial Request — 2026-07-11T14:21:18Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Auditar las 218 preguntas pendientes del banco de test de la aplicación "Gestión A2 Xunta de Galicia". Cada pregunta debe ser contrastada individualmente con su fuente legal oficial en PDF, corrigiendo o reformulando aquellas que sean incorrectas o redundantes, y actualizando los archivos de seguimiento del proyecto.

Working directory: f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini
Integrity mode: development

## Requirements

### R1. Auditoría Jurídica Estricta
Para cada tema pendiente en `app.js`, localizar su PDF oficial en `documentos/`. Verificar que cada pregunta tiene base en un artículo exacto, que solo hay una respuesta inequívocamente correcta y tres falsas, y que las justificaciones son precisas. Si hay solapamiento conceptual, reformular la pregunta para evaluar otros artículos.

### R2. Actualización de Código
Modificar las preguntas auditadas en `app.js`, cambiando su atributo `quality` a `'Verificada'` o `'Verificada y reformulada'`, y concretando el atributo `source` con el artículo exacto (ej. `Ley X, art. Y`).

### R3. Actualización de Control y Trazabilidad
Por cada lote/tema terminado, añadir la entrada correspondiente en `.ia/AUDITORIA-CONTENIDO.md`, actualizar las cifras y la siguiente tarea en `.ia/ESTADO-PROYECTO.md`, y añadir un log en `.ia/BITACORA-IA.md`.

## Acceptance Criteria

### Verificación Técnica
- [ ] La ejecución de `node --check app.js` no arroja errores de sintaxis.
- [ ] La ejecución de `node scripts/validar-banco.js` devuelve `RESULTADO: OK` (0 incompletas, 0 duplicados, 0 fuentes ausentes).

### Verificación Funcional
- [ ] Todas las 218 preguntas pendientes han cambiado su estado a verificado en `app.js`.
- [ ] El archivo `ESTADO-PROYECTO.md` refleja que quedan 0 preguntas pendientes de auditoría sistemática.
