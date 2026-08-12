# Oposita con calma · Cuerpo de Gestión A2 (Xunta de Galicia) 🏛️

Plataforma web independiente para la preparación del primer ejercicio tipo test de las oposiciones del **Cuerpo de Gestión de la Administración General de la Xunta de Galicia (Subgrupo A2)**.

**Versión 1.2.0 estable local:** publicada como herramienta estable en modo local. El banco continúa en revisión normativa y las cuentas remotas están pausadas para evitar prometer sincronización, backups o soporte que no forman parte de esta versión.

> **Privacidad y uso responsable:** esta plataforma es una herramienta gratuita de práctica y refuerzo. No es una academia, no está vinculada a la Xunta de Galicia, no sustituye preparadores, temarios actualizados, boletines oficiales ni asesoramiento jurídico profesional. Ante cualquier duda, prevalecen siempre BOE/DOG, la convocatoria vigente y el criterio profesional correspondiente. La misma advertencia queda visible dentro de la Política de Privacidad y Protección de Datos de la app.

---

## 🌟 Características Principales

- **1.522 preguntas clasificadas en revisión continua**:
  - **1.207 preguntas** de la parte general del temario (23 temas troncales).
  - **315 preguntas oficiales** de 3 exámenes reales completos (2025 PE, 2024 PE, 2024 Funcionarización).
- **Explicaciones Razonadas**: Cada pregunta incluye 4 justificaciones legales individuales ("por qués") y enlace directo al BOE/DOG oficial.
- **Simulacros Oficiales**: Temporizador regresivo en vivo (`⏱ M:SS`), opción de *"Dejar en blanco"* (0 penalización) y penalización de –0,25 puntos por fallo.
- **Privacidad y Perfil de Usuario**: Persistencia local de fallos e historial en tu propio navegador. La autenticación remota queda pausada; el progreso no se sincroniza entre dispositivos.
- **Uso como apoyo al estudio**: La app ayuda a practicar y razonar respuestas, pero no debe usarse como única fuente ni como garantía jurídica absoluta.
- **Alojamiento en Producción**: Servido globalmente en **Cloudflare Workers** desde directorio estático aislado (`/public`).
- **Filosofía 100% Abierta (Non-Commercial Open Source)**: Libre acceso para la comunidad de opositores bajo licencia CC BY-NC-SA 4.0.

---

## 🤝 Autoría humana y colaboración con IA

Este proyecto ha sido dirigido por **creace13**, que ha definido su propósito, enfoque para opositores, criterios funcionales y decisiones finales.

Su construcción se ha apoyado en distintas etapas documentadas de colaboración con inteligencia artificial:

- **Gemini / Antigravity (Google), etapa histórica ya finalizada**: construcción y ampliación inicial del banco, organización de fuentes y desarrollo funcional.
- **Codex (OpenAI), única IA activa desde el 12 de agosto de 2026**: auditoría, construcción, mantenimiento jurídico-técnico, pruebas, documentación y gestión de versiones.

El trabajo se coordina mediante un protocolo Inter-IA con bitácora, auditorías correlativas y puntos de guardado reproducibles. La IA se utiliza como herramienta de construcción y revisión; la dirección del proyecto y las decisiones finales permanecen bajo responsabilidad humana.

> «La constancia no hace ruido, pero el día del examen se nota.»

---

## 🐞 Reportar erratas o sugerencias

Si detectas una posible errata, una fuente rota o una explicación mejorable, puedes abrir una incidencia pública en GitHub:

[Reportar errata o sugerencia](https://github.com/creace13/oposiciones-a2-xunta/issues/new?template=errata.md)

No incluyas datos personales, correos, teléfonos, contraseñas ni información sensible. Si es posible, indica el ID de la pregunta y enlaza la fuente oficial BOE/DOG o la convocatoria aplicable.

La política de qué se publica y qué se mantiene fuera del repositorio está documentada en [`docs/EXPOSICION-GITHUB.md`](docs/EXPOSICION-GITHUB.md).

---

## 🧠 Metodología y continuidad del proyecto

La metodología pública del proyecto se resume en [`docs/METODOLOGIA-PUBLICA.md`](docs/METODOLOGIA-PUBLICA.md).

El procedimiento comprensible para mantener las leyes está en [`docs/GUIA-ACTUALIZACION-LEGAL.md`](docs/GUIA-ACTUALIZACION-LEGAL.md), y la explicación de cómo se recupera el contexto al abrir una tarea nueva está en [`docs/CONTINUIDAD-DEL-PROYECTO.md`](docs/CONTINUIDAD-DEL-PROYECTO.md).

El proyecto mantiene documentación interna de coordinación, auditoría y continuidad, pero esa sala de máquinas no forma parte del repositorio público. La decisión busca equilibrar transparencia con protección del flujo de trabajo propio del titular.

Las aportaciones históricas de Gemini / Antigravity y el trabajo operativo actual de Codex quedan documentados bajo dirección humana. Codex es la única IA activa salvo nueva decisión expresa del titular.

---

## 🛠️ Tecnologías y Despliegue

- **Frontend**: HTML5 Semántico, Vanilla CSS (Design System nativo) y JavaScript ES6+.
- **Persistencia principal**: modo local del navegador (`localStorage`), sin sincronización entre dispositivos.
- **Backend / Auth**: Supabase queda conservado solo como opción técnica futura; las cuentas remotas están pausadas en la interfaz pública.
- **Hosting**: Cloudflare Workers (Assets en `./public`).
- **Validación del Banco**: `node scripts/validar-banco.js`.
- **Mantenimiento normativo**: `docs/MANTENIMIENTO-NORMATIVO.md`, `docs/GUIA-ACTUALIZACION-LEGAL.md` y `npm run test:normativa`.
- **Continuidad entre sesiones**: `docs/CONTINUIDAD-DEL-PROYECTO.md` y la cadena privada iniciada por `AGENTS.md`.

---

## 📄 Licencia

Este proyecto es Open Source con fines educativos bajo la licencia **CC BY-NC-SA 4.0 (Atribución - No Comercial - Compartir Igual)**. Gratuito y libre para estudiar y compartir por la comunidad de opositores, quedando estrictamente prohibida su venta o explotación comercial por terceros.
