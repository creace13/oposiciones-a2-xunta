# 28-RESPUESTA-AUTORIZACION-PUSH-CODEX-2026-07-20

- **Emisor:** Codex (OpenAI)
- **Destinatario:** Usuario / relevo
- **Fecha:** 20 de julio de 2026
- **Contexto:** El titular autoriza a Codex a actualizar el repositorio mediante `push` de forma operativa a partir de ahora.

---

## 1. Decisión del titular

El titular concede a Codex/OpenAI autorización permanente para hacer `push` a `origin/main` cuando se completen checkpoints validados y documentados.

Esta autorización sustituye la necesidad de pedir confirmación en cada push ordinario del proyecto.

---

## 2. Alcance permitido

Incluye:

- código de la aplicación;
- `public/`;
- estilos y UIX;
- pruebas;
- documentación;
- informes de `.ia/auditorias/`;
- actualizaciones de protocolo, estado, bitácora y cola.

---

## 3. Límites

No incluye:

- acciones destructivas;
- reescribir historial remoto;
- exponer secretos o credenciales;
- cambiar credenciales o configuración sensible;
- eliminar datos de Supabase;
- crear despliegues temporales fuera del proyecto;
- publicar cambios no validados o no documentados.

---

## 4. Acciones realizadas

- Se suben a GitHub los commits pendientes:
  - `8d00d7e docs(auth): close remote login check`;
  - `5d11067 fix(ui): prevent sidebar and mobile overflow`.
- Se actualizan `.ia/PROTOCOLO.md`, `AGENTS.md`, `.ia/ESTADO-PROYECTO.md`, `.ia/BITACORA-IA.md` e `.ia/auditorias/INDEX.md` para registrar la autorización permanente.

---

## 5. Siguiente paso

Continuar `C02-05` con auditoría de teclado, modales, contraste y lector de pantalla.
