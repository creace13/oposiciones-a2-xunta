# Metodología pública del proyecto

Actualizado: 20 de julio de 2026.

## Qué es esta metodología

Este documento resume de forma pública cómo se construye y mantiene la plataforma sin exponer los protocolos internos completos del titular.

La app nace como una herramienta gratuita de práctica y refuerzo para opositores del Subgrupo A2 de la Xunta de Galicia. No pretende sustituir una academia, un temario oficial, una preparación profesional ni una revisión jurídica humana.

## Principios de trabajo

1. **Fuentes oficiales primero.** Las preguntas se apoyan en normas, convocatoria y documentos oficiales.
2. **Trazabilidad.** Cada pregunta debe mantener una referencia normativa o documental útil para contrastar la respuesta.
3. **Explicación por alternativas.** No basta con marcar una respuesta correcta: se busca explicar por qué las otras opciones no lo son.
4. **Revisión continua.** El banco puede contener erratas o quedar afectado por cambios normativos posteriores; por eso se mantiene abierto a correcciones.
5. **Modo local por defecto.** El progreso se guarda en el navegador del usuario para evitar dependencias innecesarias de bases de datos, cuentas remotas o suscripciones.
6. **Transparencia responsable.** Se publica lo necesario para generar confianza, pero no se expone la documentación interna completa de gestión, auditoría y coordinación.

## Calidad y límites

El proyecto incorpora pruebas automatizadas sobre funcionamiento, filtros, accesibilidad básica, seguridad técnica, mantenimiento normativo y experiencia en navegadores reales.

Eso mejora la fiabilidad técnica, pero no convierte la app en una garantía jurídica absoluta. Ante cualquier duda, prevalecen siempre:

- BOE;
- DOG;
- convocatoria vigente;
- criterio profesional o jurídico correspondiente.

## Cómo reportar mejoras

Las erratas, enlaces rotos y sugerencias pueden comunicarse mediante GitHub Issues:

https://github.com/creace13/oposiciones-a2-xunta/issues/new?template=errata.md

No incluyas datos personales. Si puedes, indica el ID de pregunta, la fuente oficial y el motivo de la revisión.

## Qué no se publica

El repositorio público no incluye la sala de máquinas interna del proyecto: bitácoras completas, colas de trabajo, informes internos de IA, protocolos de relevo, instrucciones locales de agentes ni artefactos `.agents/` con briefings, handoffs o progresos internos. Esa documentación se conserva localmente para mantener el proyecto, pero no forma parte de la versión pública.
