# Oposita con calma · Cuerpo de Gestión A2 (Xunta de Galicia) 🏛️

Plataforma web independiente para la preparación del primer ejercicio tipo test de las oposiciones del **Cuerpo de Gestión de la Administración General de la Xunta de Galicia (Subgrupo A2)**.

---

## 🌟 Características Principales

- **1.522 Preguntas Verificadas**:
  - **1.207 preguntas** de la parte general del temario (23 temas troncales).
  - **315 preguntas oficiales** de 3 exámenes reales completos (2025 PE, 2024 PE, 2024 Funcionarización).
- **Explicaciones Razonadas**: Cada pregunta incluye 4 justificaciones legales individuales ("por qués") y enlace directo al BOE/DOG oficial.
- **Simulacros Oficiales**: Temporizador regresivo en vivo (`⏱ M:SS`), opción de *"Dejar en blanco"* (0 penalización) y penalización de –0,25 puntos por fallo.
- **Privacidad y Perfil de Usuario**: Autenticación mediante **Supabase Auth** y persistencia local de fallos e historial en tu propio navegador.
- **Alojamiento en Producción**: Servido globalmente en **Cloudflare Workers** desde directorio estático aislado (`/public`).
- **Filosofía 100% Abierta (Non-Commercial Open Source)**: Libre acceso para la comunidad de opositores bajo licencia CC BY-NC-SA 4.0.

---

## 🧠 Continuidad y Memoria entre Modelos de IA (AGENTS.md)

Este repositorio utiliza el sistema de persistencia y continuidad en `.ia/`:
- Antes de continuar el proyecto, cualquier modelo de IA (Antigravity, Claude, ChatGPT, etc.) debe leer `AGENTS.md` y `.ia/PROTOCOLO.md`.
- El estado canónico, la arquitectura del banco y los informes de auditorías cruzadas se encuentran en `.ia/ESTADO-PROYECTO.md` y `.ia/auditorias/`.

---

## 🛠️ Tecnologías y Despliegue

- **Frontend**: HTML5 Semántico, Vanilla CSS (Design System nativo) y JavaScript ES6+.
- **Backend / Auth**: Supabase (`@supabase/supabase-js` v2).
- **Hosting**: Cloudflare Workers (Assets en `./public`).
- **Validación del Banco**: `node scripts/validar-banco.js`.

---

## 📄 Licencia

Este proyecto es Open Source con fines educativos bajo la licencia **CC BY-NC-SA 4.0 (Atribución - No Comercial - Compartir Igual)**. Gratuito y libre para estudiar y compartir por la comunidad de opositores, quedando estrictamente prohibida su venta o explotación comercial por terceros.
