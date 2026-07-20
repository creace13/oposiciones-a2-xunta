# Cola interna de alto razonamiento

Fecha de apertura: 20 de julio de 2026.

Esta cola sirve para proteger cuota sin perder calidad. No sustituye a `.ia/COLA-ACTIVA.md`: la cola activa decide qué se hace; este archivo decide cuándo una tarea puede justificar pedir al titular un modelo o razonamiento superior.

## Regla de uso

- Por defecto, Codex trabaja en razonamiento medio.
- Antes de subir razonamiento/modelo, Codex debe avisar al titular y explicar el motivo.
- Solo se recomienda subir cuando el riesgo, la ambigüedad o el coste de equivocarse sea alto.
- Si una tarea puede resolverse con pruebas reproducibles, lectura de código y razonamiento medio, se mantiene en el modo normal.

## Candidatas vigentes

| ID | Relación | Tarea | Motivo para posible subida | Estado |
| :--- | :--- | :--- | :--- | :---: |
| **AR-01** | C02-11 / C02-03 | Diagnóstico profundo de cuentas remotas si el fallo de login no se reproduce con pruebas ordinarias. | Puede afectar a autenticación, privacidad y datos reales en Supabase. | `RESERVA` |
| **AR-02** | C02-07 | Revisión de seguridad técnica, cabeceras, dependencias, errores y exposición de datos. | Alto impacto si se pasa por alto un riesgo de producción. | `RESERVA` |
| **AR-03** | C02-08 / C02-09 | Auditoría jurídica compleja o contraste masivo de vigencia normativa. | Riesgo jurídico y volumen de fuentes. | `RESERVA` |
| **AR-04** | C02-10 | Cierre final de versión definitiva y aceptación de publicación estable. | Puerta de salida del proyecto; conviene máxima cautela. | `RESERVA` |

## Decisión actual

No se solicita todavía modelo superior. `C02-07` se cerró con pruebas objetivas en razonamiento medio. La siguiente tarea ejecutable, `C02-08`, debe empezar con procedimiento ordinario; solo se valorará elevar razonamiento si hay contraste jurídico masivo o ambigüedad normativa relevante.
