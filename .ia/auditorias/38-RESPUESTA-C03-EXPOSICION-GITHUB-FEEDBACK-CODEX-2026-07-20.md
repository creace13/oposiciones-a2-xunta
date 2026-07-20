# 38 - RESPUESTA C03: exposición GitHub y feedback público

Fecha: 20 de julio de 2026  
Emisor: Codex / OpenAI  
Rol: titular operativo, constructor y gestor documental  
Estado: CERRADO

## Alcance autorizado

El titular ordena ejecutar solo:

- **Punto 2:** barrido GitHub público/privado.
- **Punto 4:** canal de reporte de erratas y sugerencias.

Quedan aplazados expresamente:

- **Punto 1:** revisión jurídica humana externa.
- **Punto 3:** donaciones o “buy me a coffee”.
- **Punto 6:** auditoría IA avanzada final, reservada para la última fase.

## Cambios realizados

### 1. Exposición pública y privada en GitHub

- Añadido `docs/EXPOSICION-GITHUB.md` como criterio operativo para distinguir:
  - documentación pública útil;
  - documentación interna publicable por transparencia;
  - secretos, tokens, credenciales, enlaces internos y datos personales que nunca deben publicarse.
- Reforzado `.gitignore` con exclusión explícita de:
  - `.wrangler/`;
  - `.env`;
  - `.env.*`;
  - `Links_gestores.txt`;
  - `docs/psw_ddbb.txt`.
- Añadido `scripts/test-public-exposure.js` para comprobar que las rutas sensibles no quedan versionadas y que el flujo de erratas existe.

### 2. Canal de erratas y sugerencias

- Creada plantilla pública `.github/ISSUE_TEMPLATE/errata.md`.
- Creada configuración `.github/ISSUE_TEMPLATE/config.yml` para evitar issues en blanco.
- Añadido botón “Reportar errata o sugerencia” en Guía y Metodología.
- Convertido el flujo de feedback de la app para abrir GitHub Issues en lugar de intentar guardar en Supabase.
- El modal `feedbackDialog` advierte que GitHub es público y que no deben incluirse datos personales.
- Se mantiene el botón de reporte contextual en preguntas respondidas, precargando el ID de pregunta.

## Archivos modificados o creados

- `.gitignore`
- `.github/ISSUE_TEMPLATE/errata.md`
- `.github/ISSUE_TEMPLATE/config.yml`
- `README.md`
- `docs/EXPOSICION-GITHUB.md`
- `index.html`
- `app.js`
- `public/index.html`
- `public/app.js`
- `package.json`
- `scripts/test-public-exposure.js`
- `scripts/test-browser-e2e.js`
- `scripts/test-release-acceptance.js`
- `.ia/COLA-ACTIVA.md`
- `.ia/ESTADO-PROYECTO.md`
- `.ia/BITACORA-IA.md`
- `.ia/auditorias/INDEX.md`
- `.ia/auditorias/CICLOS.md`

## Pruebas ejecutadas

- `node --check app.js`: OK.
- `node scripts/validar-banco.js`: OK.
- `node scripts/test-public-exposure.js`: OK.
- `npm test`: OK.

La suite completa incluye:

- validación del banco: 1.522 preguntas, 0 incompletas, 0 duplicadas;
- filtros temáticos;
- autenticación local;
- accesibilidad básica;
- recuperación/rollback documental;
- seguridad básica;
- mantenimiento normativo;
- aceptación release;
- exposición pública/GitHub;
- integración DOM/JSDOM;
- Playwright en Chromium, WebKit, móvil Chrome y móvil Safari: **24/24 OK**.

## Resultado

C03 queda cerrado. El proyecto dispone de una política básica de exposición pública y un canal de erratas sin base de datos, sin Supabase y sin suscripción mensual adicional.

## Limitaciones

- GitHub Issues es público: no sirve para privacidad, contraseñas, correos, incidencias personales ni soporte privado.
- El canal de erratas no equivale a revisión jurídica externa; solo organiza la detección y revisión posterior.
- El barrido es una protección de repositorio y documentación, no una auditoría forense de todo el historial remoto.

## Siguientes decisiones del titular

- Revisar jurídicamente el banco con una persona competente si se quiere elevar garantía.
- Decidir más adelante si se añade donación sin suscripción mensual.
- Reservar una auditoría IA avanzada final para antes de una versión definitiva.
