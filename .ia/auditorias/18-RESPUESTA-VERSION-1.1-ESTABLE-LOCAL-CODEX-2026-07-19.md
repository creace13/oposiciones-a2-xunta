# Respuesta de cierre — versión 1.1 estable en modo local

Fecha: 19 de julio de 2026
Modelo: Codex / OpenAI
Rol: constructor y auditor, con autorización expresa del titular

## Dictamen

La aplicación queda preparada como **versión 1.1 estable en modo local**. La lógica principal supera la suite automatizada y el titular confirma una experiencia visual satisfactoria en tableta, móvil y PC.

Este cierre no convierte automáticamente las cuentas remotas en estables. El acceso mediante Supabase conserva la etiqueta **Beta** hasta que exista borrado remoto autoservicio o un canal privado de privacidad que el titular controle y atienda. La interfaz informa ahora de esta diferencia y ofrece el modo invitado local como opción estable.

## Cambios realizados

1. Se añadió al final de Guía y metodología una sección que explica:
   - dirección y decisiones finales humanas;
   - construcción, ampliación y documentación con Gemini / Antigravity;
   - auditoría cruzada, pruebas, correcciones y cierre técnico con Codex;
   - tecnologías principales y protocolo de auditoría Inter-IA.
2. Se incorporó un enlace secundario y discreto al repositorio oficial: `https://github.com/creace13/oposiciones-a2-xunta`.
3. Se añadió una frase motivadora original: «La constancia no hace ruido, pero el día del examen se nota.»
4. Se retiró `oposiciones.a2.xunta@gmail.com` de la aplicación porque el titular declara no conocer ni controlar esa cuenta.
5. La privacidad ya no invita a enviar datos personales por un canal no confirmado. Las incidencias generales y erratas pueden comunicarse públicamente en GitHub sin incluir información personal.
6. Se añadió un aviso visible en el acceso: las cuentas remotas están en Beta y no disponen aún de borrado autoservicio ni canal privado confirmado.
7. Se actualizó el banner a «Versión 1.1 (Estable en modo local)» y el paquete a `1.1.0`.
8. Se actualizó el identificador de caché y se sincronizó la lista blanca de `public/`.

## Evidencia de validación

- `node --check app.js`: aprobado.
- `npm test`: aprobado.
- Banco: 1.522 preguntas; 0 incompletas; 0 duplicadas; 0 fuentes ausentes según los validadores actuales.
- Filtros, autenticación, integración DOM/JSDOM, persistencia y borrado local: aprobados.
- Regresiones añadidas: ausencia del correo no controlado, enlace correcto al repositorio, créditos, frase final, versión estable local y advertencia de cuentas remotas.
- Validación manual comunicada por el titular: tableta, móvil y PC, sin problemas de interfaz o experiencia de uso.
- Checkpoint de implementación: `e176942`.

## Límite del cierre

No se realizó `push` ni despliegue. La web pública sigue mostrando la revisión anterior hasta que el titular autorice expresamente la publicación.

Para declarar estable también el sistema de cuentas remotas falta una de estas dos soluciones:

- implementar un borrado remoto autoservicio y probarlo de extremo a extremo; o
- habilitar y confirmar un canal privado de privacidad controlado por el titular, con procedimiento documentado de baja.

Para una garantía definitiva ampliada siguen siendo aconsejables una revisión de accesibilidad asistida, un procedimiento probado de backup/rollback y una revisión jurídica independiente del contenido.

## Ayuda al siguiente constructor si reaparece un fallo

1. No reintroducir correos, domicilios o responsables que el titular no haya confirmado.
2. Mantener separadas las etiquetas «estable local» y «cuentas remotas Beta» hasta cerrar el ciclo remoto.
3. Ejecutar `npm test` y `node scripts/sync-public.js` después de cualquier cambio visible.
4. Comprobar que raíz y `public/` conservan paridad antes de publicar.
5. Registrar cada corrección en la bitácora y en una respuesta correlativa antes de cerrar.

## Siguiente acción autorizable

Revisar el estado limpio de Git y, únicamente tras una orden expresa del titular, hacer `push` para actualizar Cloudflare Workers.
