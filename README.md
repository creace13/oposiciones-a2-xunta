# Oposita con calma · Cuerpo de Gestión A2 (Xunta de Galicia) 🏛️

Plataforma web independiente y Open-Source para la preparación del primer ejercicio tipo test de las oposiciones del **Cuerpo Superior de la Administración Autonómica de la Xunta de Galicia (Subgrupo A2)**.

---

## 🌟 Características Principales

- **1.522 Preguntas Verificadas**:
  - **1.212 preguntas** de la parte general del temario (23 temas troncales).
  - **310 preguntas oficiales** de exámenes reales recientes (2025 PE, 2024 PE, 2024 Funcionarización).
- **Explicaciones Razonadas**: Cada pregunta incluye 4 justificaciones legales individuales ("por qués") y enlace directo al BOE/DOG oficial.
- **Simulacros con Penalización Real**: Modo examen con cómputo de tiempo y penalización oficial de –0,25 puntos por fallo.
- **Multidispositivo y Nube**: Autenticación segura de usuarios y sincronización de fallos e historial mediante **Supabase Auth** y **PostgreSQL**.
- **Alojamiento en Producción**: Servido globalmente en **Cloudflare Pages** a 0 €/mes.
- **Filosofía 100% Libre / Open Source**: Libre acceso para la comunidad de opositores.

---

## 🧠 Continuidad y Memoria entre Modelos de IA (AGENTS.md)

Este repositorio utiliza el sistema de persistencia y continuidad en `.ia/`:
- Antes de continuar el proyecto, cualquier modelo de IA (Antigravity, Claude, ChatGPT) debe leer `AGENTS.md`.
- El estado canónico, la arquitectura del banco y las tareas pendientes se reconstruyen desde `.ia/ESTADO-PROYECTO.md`.

---

## 🛠️ Tecnologías y Despliegue

- **Frontend**: HTML5 Semántico, Vanilla CSS (Design System nativo) y JavaScript ES6+.
- **Backend / Database**: Supabase (`@supabase/supabase-js` v2).
- **Hosting**: Cloudflare Pages.
- **Validación del Banco**: `node scripts/validar-banco.js`.

---

## 📄 Licencia

Este proyecto es Open Source con fines educativos bajo la licencia **CC BY-NC-SA 4.0 (Atribución - No Comercial - Compartir Igual)**. Gratuito y libre para estudiar y compartir por la comunidad de opositores, quedando estrictamente prohibida su venta o explotación comercial por terceros.
