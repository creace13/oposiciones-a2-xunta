# Respuesta de implementación al cierre Beta y al anexo de métricas

**Fecha:** 19 de julio de 2026  
**Modelo:** Codex / OpenAI  
**Rol:** constructor autorizado por el usuario  
**Documentos atendidos:** `15-AUDITORIA-CIERRE-BETA-CODEX-2026-07-19.md` y `16-ANEXO-UI-METRICAS-CODEX-2026-07-19.md`  
**Checkpoint local de implementación:** `07fdd3e`  
**Resultado:** **BETA CERRADA TÉCNICAMENTE EN LOCAL — PUBLICACIÓN PENDIENTE DE AUTORIZACIÓN**

## 1. Correcciones implementadas

### Métricas y significado del panel

- «consolidado» se sustituyó por «cantidad clasificada»;
- la tarjeta muestra `302/300 · 100%` y `905/910 · 99%`;
- `1.210` se explica como objetivo interno de volumen;
- el banco aparece como `1.207/1.210` con separadores españoles;
- se aclara que la cantidad no mide preparación personal ni validación jurídica.

Durante las pruebas se encontró la causa de la pérdida de formato: `renderCoverage()` reconstruía la tarjeta después de `updateDashboard()`, eliminaba sus identificadores y volvía a escribir `1207/1210`. Se corrigieron ambas rutas de renderizado.

### Privacidad y borrado local

- se implementó una acción separada «Borrar progreso» con confirmación;
- elimina respuestas, errores, sesiones, metas y última vista, pero no la cuenta remota ni los reportes;
- «Cerrar sesión» deja de presentarse como mecanismo de borrado del progreso;
- se retiró la afirmación no demostrada de que Supabase está alojado en la Unión Europea;
- el modal describe los campos reales enviados a `user_feedback`;
- la política se presenta como información básica de privacidad de la Beta, no como certificación de cumplimiento.

El titular aún debe confirmar que controla y atiende `oposiciones.a2.xunta@gmail.com`.

### Honestidad editorial

- se retiró la última etiqueta pública «Preguntas Verificadas»;
- se suavizaron «Trazabilidad 100% oficial», «ninguna pregunta es imprecisa» y «de forma incontestable»;
- se mantiene la descripción honesta de banco en revisión continua y con referencias normativas.

### Pruebas y copia pública

- la suite se renombró como integración DOM/JSDOM, evitando llamarla navegador gráfico real;
- se añadieron regresiones para métricas, formato, textos de transparencia, persistencia escrita y borrado local;
- `public/` se sincronizó mediante la lista blanca y coincide con la raíz por SHA-256 para `index.html`, `styles.css` y `app.js`.

## 2. Documentación y protocolo

- Codex/OpenAI queda autorizado en `AGENTS.md` y `.ia/PROTOCOLO.md` para actuar como constructor o auditor, igual que Gemini/Antigravity, cuando el usuario lo autorice;
- el rol depende de la autorización, no del proveedor;
- se corrigió el protocolo para que el commit local sea el checkpoint y el `push`/despliegue requiera autorización expresa;
- el anexo duplicado se renumeró de 15 a 16;
- esta respuesta ocupa la secuencia única 17;
- se añadió `README.md` como guía de navegación, sin mover informes históricos ni romper sus enlaces;
- se actualizaron Estado, Plan, Bitácora e Índice.

No se modificó `.ia/AUDITORIA-CONTENIDO.md` porque esta sesión no revisó ni alteró preguntas jurídicas.

## 3. Comprobaciones ejecutadas

- `node --check app.js`: correcto;
- `npm.cmd --prefix <proyecto> test`: correcto;
- banco: 1.522 preguntas, 0 incompletas, 0 duplicadas y 0 fuentes locales ausentes;
- filtros: todas las aserciones correctas;
- autenticación: 5/5 casos correctos;
- integración DOM/JSDOM: todos los flujos y regresiones correctos;
- documentos enlazados: 39 comprobados en la ejecución final;
- `node scripts/sync-public.js`: sincronización correcta, 0 huérfanos;
- `node --check public/app.js`: correcto;
- paridad SHA-256 raíz/`public`: correcta en los tres activos modificados.

## 4. Límites y siguiente paso

No se ejecutó `push` ni despliegue. La web pública puede seguir mostrando la versión anterior hasta que el usuario autorice publicar el checkpoint.

Para llamar a la aplicación «definitiva» siguen pendientes:

1. pruebas en Chrome/Firefox/WebKit o equivalente;
2. comprobación real en móvil y escritorio;
3. accesibilidad con teclado, contraste y lector de pantalla;
4. backup, restauración y rollback;
5. confirmación del canal de privacidad;
6. revisión jurídica independiente y procedimiento de actualización normativa.

## 5. Dictamen

Los hallazgos técnicos y editoriales de los informes 15 y 16 están atendidos en local. No quedan defectos conocidos que bloqueen esta Beta. La publicación y la etiqueta de versión definitiva son decisiones posteriores y separadas.
