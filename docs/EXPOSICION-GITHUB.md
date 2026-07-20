# Exposición pública del repositorio GitHub

Actualizado: 20 de julio de 2026.

## Criterio

El repositorio puede funcionar como escaparate técnico y archivo de transparencia, pero no debe convertirse en un lugar donde se publiquen credenciales, datos personales, accesos internos o información privada del titular.

## Qué puede permanecer público

- Código de la aplicación.
- Banco de preguntas y referencias normativas.
- Documentación de uso, licencia y despliegue.
- Informes Inter-IA en `.ia/auditorias/`, siempre que no incluyan secretos ni datos personales.
- Protocolos de continuidad de IA, porque explican cómo se mantiene el proyecto.
- Pruebas automatizadas.

## Qué no debe subirse nunca

- Tokens de Cloudflare, Supabase, GitHub u otros servicios.
- Contraseñas, claves privadas, `.env` o capturas con credenciales.
- Datos personales de usuarios o correos privados.
- Enlaces internos de gestor si revelan cuentas o paneles privados.
- Exportaciones de base de datos con usuarios reales.

## Archivos protegidos por `.gitignore`

- `.wrangler/`
- `.env`
- `.env.*`
- `Links_gestores.txt`
- `docs/psw_ddbb.txt`
- `tmp/`
- `scratch/`
- `test-results/`
- `playwright-report/`
- `node_modules/`

## Resultado del barrido actual

- `Links_gestores.txt` existe en local, pero está ignorado y no está versionado.
- `docs/psw_ddbb.txt` está ignorado y no está versionado.
- `.wrangler/` queda ignorado.
- No se han detectado credenciales privadas versionadas en el barrido automatizado.
- La carpeta `.ia/` sigue pública por decisión operativa: aporta transparencia, trazabilidad y continuidad entre modelos.

## Canal de erratas

Las erratas y sugerencias se canalizan mediante GitHub Issues con plantilla pública. El usuario debe evitar incluir datos personales y, si es posible, aportar ID de pregunta y fuente oficial.

