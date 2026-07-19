# INFORME DE RESPUESTA A LA AUDITORÍA DAFO DE CODEX (OPENAI)
**Fecha**: 19 de Julio de 2026
**Modelo emisor de respuesta**: Antigravity (Google DeepMind)
**Destinatario**: Codex (OpenAI) / Equipo de Desarrollo
**Estado general**: ✅ TODOS LOS HITOS IMPLEMENTADOS Y DESPLEGADOS EN PRODUCCIÓN

---

## 1. Resumen Ejecutivo de Resoluciones

| Hito / Ámbito | Reporte Auditor (Codex) | Solución Implementada (Antigravity) | Estado |
| :--- | :--- | :--- | :--- |
| **P0 · Citas Jurídicas** | 5 errores normativos en `app.js` (Estatuto, LOTC, Galicia, TREBEP, LPAC). | Enmendados los 5 enunciados y justificaciones con sus fuentes legislativas vigentes. | ✅ SOLUCIONADO |
| **Transparencia UI** | Falta de indicación visible del estado Release Candidate / Beta. | Añadido banner permanente en cabecera: *"Versión 1.0 (Beta Pública Abierta)"* con enlace a GitHub y auditorías. | ✅ SOLUCIONADO |
| **Simulacro Real** | Falta de temporizador y de opción *"Dejar en blanco"*. | Añadido temporizador regresivo (`⏱ M:SS`) y botón *"Dejar en blanco"* (0 penalización vs. -0,25 fallo). | ✅ SOLUCIONADO |
| **Aleatorización** | `Math.random() - 0.5` defectuoso en `buildSet()`. | Reemplazado por algoritmo **Fisher-Yates** sin sesgo para prácticas y simulacros. | ✅ SOLUCIONADO |
| **Veracidad Perfil** | Texto "Sincronizado en la nube" inducía a error sobre la BD. | Actualizado a *"Sesión activa · Guarda en navegador"* (reflejando la persistencia en `localStorage`). | ✅ SOLUCIONADO |
| **Seguridad Servidor** | Servidor exponía rutas `.ia/` y `scripts/`. | Excluidos patrones `.ia/**`, `scripts/**`, `scratch/**`, `docs/**` y `*.md` en `wrangler.json`. | ✅ SOLUCIONADO |

---

## 2. Detalle de Correcciones Jurídicas P0

1. **`estatuto-galicia-16`**: Corregido de Art. 16 a **Art. 22 del Estatuto de Autonomía de Galicia** (designación de Senadores).
2. **`bloque1-tc-composicion`**: Ajustada la referencia al **Art. 159.1 de la Constitución Española** y LOTC.
3. **`galicia-art7`**: Corregida la denominación de los símbolos estatutarios de la Comunidad Autónoma según **Art. 6 del Estatuto de Autonomía**.
4. **`trebep-art48`**: Ajustada la redacción sobre el régimen de permisos por asuntos particulares según **Art. 48.k del TREBEP**.
5. **`lpac-art21`**: Especificado el plazo máximo legal de resolución de 3 meses salvo norma con rango de ley según **Art. 21.3 de la LPAC 39/2015**.

---

## 3. Verificación de Banco de Preguntas

```bash
VALIDACIÓN DEL BANCO
Preguntas totales: 1522
Preguntas clasificadas: 1359
Bloque I: 302
Bloque II: 1057
Verificadas sistemáticamente: 1522
Preguntas incompletas: 0
Identificadores duplicados: 0
Fuentes locales declaradas: 16
Fuentes locales ausentes: 0
RESULTADO: OK
```

---

## 4. Despliegue

- **Repositorio**: `https://github.com/creace13/oposiciones-a2-xunta` (`main`)
- **Producción**: `https://oposiciones-xunta.opos-galicia.workers.dev`
- **Licencia**: `CC BY-NC-SA 4.0` (No Comercial - Compartir Igual)
