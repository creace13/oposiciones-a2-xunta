# Ciclos de auditoría y construcción

Este documento agrupa los informes por finalidad sin moverlos ni renombrarlos. La secuencia numérica es global y `INDEX.md` conserva el detalle completo.

## C01 — Construcción, auditoría y estabilización

Estado: **CERRADO**.

Rango: informes `01` a `21`.

### Etapas internas

- `01–02`: DAFO inicial y primera respuesta de construcción.
- `03–14`: auditorías cruzadas iterativas sobre despliegue, filtros, autenticación, privacidad y pruebas.
- `15–17`: cierre técnico de la Beta y corrección de métricas y borrado local.
- `18–19`: cierre editorial, créditos, privacidad y métricas reales.
- `20–21`: publicación de la versión 1.1.1 y créditos públicos en GitHub.

Resultado: versión 1.1.1 publicada, estable en modo local, con cuentas remotas todavía en Beta.

Informe de transición: `22-AUDITORIA-APERTURA-COLA-DEFINITIVA-CODEX-2026-07-19.md`.

## C02 — Versión plenamente funcional local

Estado: **CERRADO OPERATIVO**.

Rango: informes `22` a `36`.

Objetivo: cerrar las cuentas remotas o retirarlas, diagnosticar el fallo de login remoto reportado por el titular, privacidad, navegadores reales, accesibilidad, operación/recuperación, seguridad, rendimiento y gobernanza jurídica.

Cola canónica: `../COLA-ACTIVA.md`.

Resultado: versión `1.2.0` aceptada como **estable local**, publicada y verificada en producción. Las cuentas remotas quedan pausadas y `C02-09` queda trasladado como garantía jurídica externa futura, porque requiere un revisor humano jurídicamente competente designado por el titular.

## C03 — Post-release público y feedback

Estado: **CERRADO**.

Rango: informe `38`.

Objetivo: ejecutar los puntos 2 y 4 autorizados por el titular tras la versión 1.2.0 estable local: barrido de exposición pública/privada de GitHub y canal sencillo de erratas/sugerencias.

Cola canónica: `../COLA-ACTIVA.md`.

Resultado: se documenta la política de exposición pública en `docs/EXPOSICION-GITHUB.md`, se refuerza `.gitignore`, se crea plantilla de GitHub Issues para erratas y la aplicación abre reportes públicos sin depender de Supabase ni de nuevas suscripciones. Los puntos 1, 3 y 6 quedan fuera del ciclo por decisión expresa del titular.
