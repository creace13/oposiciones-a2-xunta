# 31 - Anexo C02-06: Supabase Free sin backups programados

Fecha: 20 de julio de 2026.

Emisor: Codex / OpenAI, actuando como titular operativo.

Destinatario: Usuario / relevo Inter-IA.

## Evidencia aportada por el titular

El titular aporta captura del panel de Supabase donde se indica que el plan gratuito no incluye copias de seguridad programadas y que el Plan Pro permite copias programadas durante hasta 7 días.

## Impacto

Esto confirma que `C02-06` no puede cerrarse como “backup remoto garantizado” mientras el proyecto dependa de Supabase Free y no exista una exportación manual o externa ensayada.

## Opciones

1. **Mantener Supabase Free con copias manuales**  
   Válido para Beta, siempre que las cuentas remotas sigan claramente etiquetadas como Beta y se exporte manualmente antes de tocar tablas, auth o políticas.

2. **Subir Supabase a Pro**  
   Recomendado para versión definitiva con usuarios reales, porque reduce el riesgo operativo y evita depender de memoria/manualidad.

3. **Desactivar temporalmente cuentas remotas**  
   Opción más prudente si no se quiere asumir coste mensual todavía. La app seguiría funcionando en modo local/invitado.

4. **Crear backup externo automatizado**  
   Posible, pero aumenta complejidad y requiere gestionar secretos. No lo recomiendo como primer camino si el objetivo es estabilidad sencilla.

## Recomendación de Codex

Para Beta: mantener remoto en Beta y hacer copia manual privada antes de cualquier cambio sensible.

Para versión definitiva: elegir entre Plan Pro o retirar temporalmente cuentas remotas. Si hay opositores reales guardando progreso remoto, mi recomendación es Plan Pro.

## Documentación actualizada

- `docs/OPERACION-RECUPERACION.md`: añadida sección específica “Cómo suplir la falta de backups en Supabase Free”.
- `.ia/COLA-ACTIVA.md`: bloqueo de `C02-06` actualizado con esta decisión pendiente.
- `.ia/ESTADO-PROYECTO.md`: estado actualizado.

## Estado

`C02-06` continúa **bloqueado**, pero ahora el bloqueo está mejor definido: no es “no sabemos”, sino “Supabase Free no da backup programado; falta escoger estrategia”.
