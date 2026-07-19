# Auditoría de transición — apertura de la cola definitiva

Fecha: 19 de julio de 2026
Modelo: Codex / OpenAI
Rol: auditor y organizador, con autorización expresa del titular

## Dictamen sobre los informes existentes

Los informes 01–21 forman una cadena completa de construcción, revisión cruzada, corrección, publicación y créditos. No deben seguir apareciendo como una lista indiferenciada de trabajo pendiente.

Se declaran agrupados como **ciclo C01 — Construcción, auditoría y estabilización**, con estado cerrado.

No se han movido ni renombrado archivos. El orden físico ya lo aporta su prefijo numérico y moverlos rompería enlaces históricos. La organización se realiza de forma lógica y reversible mediante:

- `.ia/auditorias/CICLOS.md` para rangos y etapas;
- `.ia/auditorias/INDEX.md` para la secuencia completa;
- `.ia/auditorias/README.md` para orientación;
- `.ia/COLA-ACTIVA.md` para el único trabajo ejecutable.

## Nueva cola C02

Se abre **C02 — Versión plenamente funcional** con diez entregables:

1. decisión sobre el ciclo de cuentas remotas;
2. responsable y canal privado de privacidad;
3. validación o retirada del ciclo remoto completo;
4. pruebas automatizadas en navegadores reales;
5. auditoría y corrección de accesibilidad;
6. backup, restauración y rollback;
7. seguridad, privacidad técnica y rendimiento;
8. mantenimiento normativo;
9. revisión jurídica independiente;
10. aceptación final, versionado y despliegue.

El detalle de prioridades, dependencias, estados y evidencia se encuentra en `.ia/COLA-ACTIVA.md`.

## Qué puede avanzarse sin el titular

- `C02-04`: navegadores reales;
- `C02-06`: runbook de recuperación;
- `C02-07`: auditoría técnica;
- `C02-08`: procedimiento normativo.

## Qué requiere al titular

- `C02-01`: elegir si se mantienen o retiran temporalmente las cuentas remotas;
- `C02-02`: proporcionar un canal privado controlado;
- `C02-09`: designar un revisor jurídico independiente.

## Regla de cierre

La aplicación ya es utilizable y está publicada como 1.1.1. El ciclo C02 no pretende perseguir una perfección abstracta: exige evidencia para todas las puertas operativas y cero defectos críticos conocidos.

No se declarará la versión plenamente funcional hasta cerrar C02-01 a C02-10 o trasladar expresamente un elemento a otro ciclo mediante un informe `CIERRE`.

## Siguiente acción

El siguiente constructor debe marcar `C02-04` como `EN CURSO`, ejecutar pruebas reales en Chromium, Firefox y WebKit y emitir la respuesta 23 con resultados y correcciones.
