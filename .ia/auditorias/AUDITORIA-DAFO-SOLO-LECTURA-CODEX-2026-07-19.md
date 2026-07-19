# Auditoría independiente y DAFO — Oposita con calma A2

**Fecha:** 19 de julio de 2026  
**Modalidad:** auditoría de solo lectura  
**Autor de la revisión:** Codex  
**Repositorio auditado:** `Oposicion [App] --Gemini`

## 1. Dictamen ejecutivo

El proyecto tiene un activo muy valioso: un banco grande, trazable, acompañado de documentos oficiales locales, tres exámenes históricos completos y una interfaz coherente que ya permite practicar, corregir y repasar errores. La validación estructural actual pasa sin errores y no hay identificadores duplicados.

Sin embargo, la declaración **«proyecto oficialmente finalizado, v1.0 en producción» no está suficientemente respaldada por el estado real del código**. La aplicación debería considerarse, como máximo, una **beta pública avanzada** hasta resolver cuatro frentes:

1. fallos funcionales en la selección de preguntas, simulacros y métricas;
2. afirmaciones de autenticación y sincronización que no coinciden con la implementación;
3. inconsistencias de recuento y ejemplos jurídicos incorrectamente marcados como verificados;
4. publicación demasiado amplia del repositorio, con archivos internos accesibles desde producción.

La fortaleza principal está en el volumen, la intención metodológica y la base documental. La debilidad principal es que se ha equiparado **«estructura válida y etiqueta Verificada»** con **«exactitud jurídica demostrada»**. El validador actual no puede demostrar esta última.

### Valoración resumida

| Área | Valoración | Motivo principal |
| --- | --- | --- |
| Cobertura temática | Alta | 23 temas representados y 1.522 registros utilizables |
| Integridad estructural | Alta | 0 incompletas, 0 IDs duplicados, 0 fuentes locales declaradas ausentes |
| Garantía jurídica | Media-baja | Muestreo con citas erróneas y duplicación conceptual pese a la etiqueta «Verificada» |
| Funcionalidad de estudio | Media | El flujo básico funciona, pero la selección de preguntas y las métricas están defectuosas |
| Simulación de examen | Baja | Sin cronómetro, sin blancos y con las mismas 18 preguntas en el simulacro general |
| Autenticación y nube | Baja | El acceso se activa aunque falle Supabase y el progreso no se sincroniza |
| Seguridad y privacidad | Baja | Publicación de la raíz, archivos internos públicos y ausencia de política de privacidad |
| Mantenibilidad | Media-baja | `app.js` monolítico de 2,53 MB, datos y lógica mezclados, documentación desalineada |

## 2. Alcance y límites de esta auditoría

Se revisaron, sin modificar, los siguientes elementos:

- protocolo, estado, plan maestro, metodología, auditoría histórica y bitácora de IA;
- estructura completa del repositorio y estado de Git;
- `index.html`, `app.js`, `styles.css`, configuración de Cloudflare, manifiesto, README, licencia y guía de contribución;
- validador general y validador parcial de 42 preguntas;
- composición real del banco, procedencia, cobertura, duplicación exacta y candidatos de duplicación conceptual;
- implementación de práctica, simulacro, progreso, autenticación, recuperación de contraseña y buzón de erratas;
- respuesta HTTP del despliegue público y accesibilidad de varios archivos internos;
- una muestra jurídica dirigida de preguntas sospechosas, contrastada con BOE/DOG y con las fuentes locales.

No se realizó una reauditoría jurídica manual de las 1.522 preguntas. Por tanto, este informe **no afirma que todo el banco sea incorrecto**; demuestra que el mecanismo actual no permite sostener la afirmación de que todo está jurídicamente verificado y aporta casos concretos que fallan.

Tampoco se pudo auditar la configuración interna de Supabase —políticas RLS, copias de seguridad o tablas— porque no existen migraciones ni definición de infraestructura en el repositorio.

## 3. Hechos comprobados

### 3.1. Validaciones que sí pasan

Se ejecutaron satisfactoriamente:

- `node --check app.js`;
- `node scripts/validar-banco.js`;
- `node scripts/validate-all-questions.js`.

Resultado del validador principal:

- 1.522 preguntas totales;
- 1.359 clasificadas por el algoritmo de cobertura;
- 302 asignadas al Bloque I;
- 1.057 asignadas al Bloque II;
- 1.522 con una etiqueta que empieza por `Verificada`;
- 0 preguntas estructuralmente incompletas;
- 0 identificadores duplicados;
- 16 fuentes locales declaradas y 0 ausentes.

Esto acredita integridad formal, pero no exactitud jurídica. El script comprueba que exista texto, cuatro opciones, un índice correcto válido, explicación, cuatro `whys`, fuente y URL. Para considerar una pregunta verificada solo exige que `quality` empiece por la palabra `Verificada`.

El segundo validador revisa únicamente 42 IDs antiguos y vuelve a comprobar presencia de campos; no contrasta su contenido con el articulado.

### 3.2. Composición real del banco

El código contiene:

- **1.207 preguntas sin `originUrl`**, es decir, de elaboración propia;
- **315 preguntas con `originUrl` histórico**, distribuidas en tres exámenes de 105 preguntas cada uno;
- total: **1.522**.

Por procedencia, el desglose real es **1.207 + 315**, no **1.212 + 310**. La cifra publicada parece reclasificar cinco preguntas históricas como si fueran banco troncal. Esa reclasificación puede explicar la suma, pero no es coherente con los propios metadatos de origen.

Además:

- el Bloque I propio tiene 302 preguntas frente a un objetivo de 300;
- el Bloque II propio tiene 905 frente a un objetivo de 910;
- Procedimiento administrativo común tiene **65 preguntas propias**, no 70; las cinco restantes para alcanzar la meta proceden del histórico;
- el clasificador mezcla 147 preguntas históricas con el temario y muestra 1.359/1.210 como si fueran preguntas creadas;
- después presenta solo 163 como «exámenes oficiales», aunque existen 315.

El sistema de cobertura se basa en fragmentos del ID y del texto de la fuente, no en un campo canónico de tema. Es frágil y explica los recuentos inflados.

### 3.3. Duplicación

No se detectaron textos exactamente repetidos entre las 1.207 preguntas propias. Es un buen dato.

Sí se detectaron:

- 56 grupos de texto idéntico entre exámenes históricos;
- 119 preguntas históricas implicadas en esos grupos;
- 10 parejas propias con similitud léxica muy alta que merecen revisión humana.

La repetición en históricos puede ser legítima porque refleja exámenes reales. No obstante, si esas preguntas entran juntas en prácticas mixtas, inflan el volumen y sobreponderan determinados conocimientos.

Ejemplos de duplicación conceptual propia:

- `defensor-nombramiento-periodo-2` y `defensor-pueblo-duracion-mandato-2` preguntan lo mismo con la misma fuente;
- `subvenciones-subcontratacion-limite` y `subvenciones-galicia-120` evalúan el mismo porcentaje del artículo 27.2;
- `transparencia-unidades-responsables-30` y `transparencia-galicia-l1-019` formulan prácticamente la misma cuestión;
- existen tres preguntas sobre la definición de discriminación directa por discapacidad, una de ellas con cita errónea.

### 3.4. Casos jurídicos concretos que contradicen el «100% verificado»

Se confirmaron al menos los siguientes casos:

1. **`gobierno-comisiones-delegadas-creacion-12`** atribuye al artículo 12.1 de la Ley 50/1997 la creación de Comisiones Delegadas. Esa regla está en el artículo 6.1. El artículo 12 regula el nombramiento y cese del Gobierno. La pregunta duplica `gobierno-comisiones-creacion`, que sí cita el artículo 6.1.
2. **`estatuto-xunta-organo-colegiado-17`** afirma que el artículo 17.1 del Estatuto define a la Xunta como órgano colegiado de gobierno y reproduce funciones que no están en ese apartado. La definición está en el artículo 16.1; el 17.1 regula la responsabilidad política solidaria ante el Parlamento. También duplica `troncal-estatuto-165`.
3. **`troncal-discapacidad-114`** cita el artículo 2.d del RDL 1/2013 para la discriminación directa. En el texto consolidado, la definición está en el artículo 2.c. El banco contiene otras dos preguntas con la cita correcta y el mismo conocimiento.
4. **`consultivo-galicia-consejeros-duracion-mandato-10`** cita el artículo 10.1 de la Ley 3/2014 y añade que no cabe reelección consecutiva. La duración está en el artículo 4.1; el artículo 10 trata la renovación y no contiene esa regla como se presenta.
5. **`consultivo-galicia-duracion-mandato-seis-anos-art8`** atribuye la misma cuestión al artículo 8.1. La fuente local sitúa la duración en el artículo 4.1 y tampoco respalda la prohibición de reelección incluida en la respuesta.

Estos casos no son simples diferencias de estilo: incluyen citas falsas, explicaciones que atribuyen literalmente a un artículo un texto que no contiene y duplicación del mismo conocimiento. Deben tratarse como evidencia de que hace falta una nueva puerta jurídica, no como una lista exhaustiva de todos los errores.

### 3.5. Calidad de las justificaciones históricas

En 210 de las 315 preguntas históricas, los cuatro `whys` se limitan a decir que una opción coincide o no coincide con la solución oficial. Eso prueba la correspondencia con la plantilla, pero **no explica jurídicamente por qué cada distractor es falso**.

La comunicación pública afirma que las 1.522 preguntas ofrecen justificaciones legales individuales. Esa afirmación es demasiado fuerte para esos 210 registros.

### 3.6. Metadatos de auditoría ausentes

La guía de fuentes exige fecha de revisión y responsable antes de pasar una pregunta a revisada. Ninguna de las 1.522 preguntas tiene campos estructurados de fecha o revisor.

Además, 919 preguntas usan la etiqueta genérica `Verificada - Nueva`, sin fecha consolidada dentro del propio registro. La auditoría acumulada termina alrededor de las 1.154 preguntas y la bitácora documenta ampliaciones hasta 1.212, pero no deja un cierre equivalente y trazable para las 315 históricas actuales.

## 4. Auditoría funcional

### 4.1. Selección de preguntas

La función `buildSet()` no aleatoriza las preguntas. Toma siempre los primeros elementos del conjunto.

Consecuencias comprobadas:

- el repaso mixto devuelve siempre las primeras preguntas del banco;
- el simulacro general devuelve siempre las primeras 18;
- «Procedimiento administrativo» filtra por un nombre de tema antiguo y encuentra solo 2 preguntas;
- «Organización de Galicia» encuentra 1;
- «Empleo público» encuentra 1;
- cuando se piden más preguntas, esos pocos registros se repiten cíclicamente.

Las alternativas sí se barajan al mostrarse. Esto evita que el fuerte sesgo interno de índices correctos —B representa el 51,4% de las preguntas propias y D el 1,3%— sea visible en la interfaz. Aun así, el banco debería equilibrarse si se exporta a formatos sin barajado.

### 4.2. Simulacros

El simulacro general aplica la penalización de –0,25, pero no reproduce las condiciones anunciadas:

- no hay cronómetro;
- no se puede dejar una pregunta en blanco y avanzar;
- solo existe un simulacro general de 18 preguntas;
- siempre usa las mismas 18 preguntas;
- los tiempos «8 min», «16 min» y «30 min» son texto informativo, no límites reales;
- los históricos se muestran completos, pero también barajan el orden de alternativas y no ofrecen gestión real del tiempo.

La documentación de fuentes habla de 160 preguntas y 210 minutos para el primer ejercicio, mientras que una franja de `index.html` afirma que la prueba tiene 105 preguntas. Debe fijarse una única descripción basada en la convocatoria rectora y distinguir claramente el proceso libre de los históricos de promoción específica o funcionarización.

### 4.3. Métricas de progreso

Varias métricas son decorativas o acumuladas, aunque se presentan como datos reales:

- «preguntas hoy» cuenta todas las respuestas guardadas, sin fecha;
- «sesiones esta semana» cuenta todas las sesiones históricas, sin semana;
- «tiempo medio» muestra siempre `1:08` después de la primera respuesta;
- no se registra duración por pregunta;
- el progreso se guarda en `localStorage`, no en la nube.

### 4.4. Autenticación y sincronización

Supabase se usa para autenticación y para insertar comentarios en `user_feedback`. No hay lectura ni escritura del progreso de estudio en una tabla remota.

Problemas observados:

- tras intentar entrar o registrarse se ejecuta `setAuthState(true)` aunque la operación falle;
- el alta en caso de credenciales inválidas no comprueba el error devuelto;
- el acceso de invitado guarda el nombre `Merce` y marca el estado como autenticado;
- la presencia de un nombre en `localStorage` basta para mostrar al usuario como autenticado;
- el mensaje «Sincronización activa» se muestra al existir una sesión de Supabase, aunque el progreso siga siendo local;
- el buzón muestra agradecimiento aunque la inserción remota falle, porque no se inspecciona el error devuelto.

La promesa de «perfil privado» y «sincronización multidispositivo» no coincide con la implementación actual.

## 5. Seguridad, privacidad y despliegue

### 5.1. Superficie de publicación excesiva

`wrangler.json` configura como directorio de recursos estáticos la raíz completa (`"directory": "./"`). En producción se comprobó:

- `/` → 200;
- `/.ia/ESTADO-PROYECTO.md` → 200;
- `/scripts/validar-banco.js` → 200;
- `/sitemap.xml` → 200.

Esto confirma que se publican archivos internos que no forman parte del producto. También quedan dentro de la superficie potencial README, licencia, guías, datos de trabajo y cualquier archivo que se incorpore a la raíz sin una exclusión explícita.

El repositorio no tiene `.gitignore`. En el árbol local hay material de agentes, temporales, scripts de auditoría y `Links_gestores.txt` sin seguimiento. Ese último archivo contiene enlaces de gestión y valores largos; no se reproducen en este informe. Actualmente su URL pública devolvió 500, no contenido, pero la combinación de raíz desplegable y ausencia de exclusiones crea un riesgo evidente de publicación accidental.

`docs/psw_ddbb.txt` está vacío en el momento de la revisión.

### 5.2. Cabeceras y dependencias

La respuesta principal no incluyó políticas explícitas como CSP, `X-Content-Type-Options`, `Referrer-Policy` o `Permissions-Policy`.

Supabase JS se carga desde jsDelivr con `@supabase/supabase-js@2`, sin fijar versión exacta ni atributo de integridad. Esto reduce reproducibilidad y amplía el riesgo de cadena de suministro.

La clave incluida en `app.js` tiene formato publicable y no debe confundirse con una `service_role`. La seguridad real depende de las políticas RLS de Supabase, que no pueden auditarse porque no hay migraciones ni configuración de base de datos en el repositorio.

### 5.3. Privacidad

La aplicación recoge o procesa:

- nombre;
- correo electrónico;
- credenciales a través de Supabase Auth;
- comentarios y posibles erratas;
- progreso almacenado en el navegador.

No se encontró política de privacidad, información sobre responsable, finalidad, conservación, derechos, proveedores o contacto. Antes de promover cuentas públicas debe existir esa información y verificarse la configuración de Supabase.

### 5.4. Inyección HTML

Las metas escritas por el usuario se insertan en `innerHTML` sin escapar. Es principalmente un riesgo de XSS almacenado local, pero se volvería más grave si esas metas se sincronizasen. Preguntas y explicaciones también se renderizan mediante plantillas HTML; una contribución maliciosa al banco podría convertirse en código ejecutable.

## 6. Arquitectura, rendimiento y mantenibilidad

- `app.js` pesa aproximadamente **2,53 MB** y contiene los 1.522 registros, la lógica de cobertura, la interfaz, la autenticación y la persistencia.
- No hay `package.json`, compilación, minificación, separación por módulos ni carga diferida por tema.
- La primera visita descarga y analiza todo el banco aunque el usuario solo quiera cinco preguntas.
- No existe service worker; el manifiesto permite presentación tipo app, pero no hay una estrategia offline controlada.
- No hay pruebas automáticas de interfaz, selección aleatoria, temporizador, persistencia, autenticación, accesibilidad o navegación móvil.
- Los scripts de trabajo antiguos y los archivos temporales incrementan ruido y riesgo de ejecutar utilidades obsoletas.
- El código contiene contenido estático personal (`Merce`, fecha del 10 de julio) que no corresponde a una plataforma pública genérica.

## 7. Documentación y gobierno del proyecto

Se observaron contradicciones relevantes:

- `ESTADO-PROYECTO.md` dice finalizado; `PLAN-MAESTRO.md` sigue en fase 2;
- README habla de Cloudflare Pages; el despliegue real es un Worker con assets;
- README denomina «Cuerpo Superior» al A2, cuando el proyecto se presenta en otros lugares como Cuerpo de Gestión;
- `FUENTES_OFICIALES.md` dice que los históricos requieren importación, pero ya están incorporados;
- la Biblioteca marca la consolidación financiera como pendiente, mientras la auditoría dice que el bloqueo fue resuelto;
- el estado referencia `implementation_plan.md` y `walkthrough.md`, que no existen;
- la bitácora afirma actualizar `matriz_cobertura.md`, que tampoco existe;
- no hay etiqueta Git `v1.0`, pese a declararse esa versión;
- la guía de contribución usa el esquema `question`/`answer`, mientras el banco real usa `text`/`correct` y exige también `whys`.

La licencia también necesita aclaración. El archivo se presenta como CC BY-NC-SA 4.0, pero contiene una redacción propia abreviada y aplica «No Comercial» a software. Esto permite hablar de código fuente disponible o proyecto libre para uso no comercial, pero no de «Open Source» en el sentido habitual de licencias sin restricción de campo de uso. Conviene separar licencia del código, contenido y documentos oficiales, y enlazar el texto jurídico auténtico elegido.

## 8. DAFO del banco de preguntas y del producto

### Fortalezas

- Banco amplio: 1.522 registros y 23 temas representados.
- Tres exámenes históricos completos y enlazados a sus documentos de origen.
- Cuatro opciones, explicación, cuatro justificaciones y fuente en todos los registros desde el punto de vista estructural.
- 0 IDs duplicados y 0 preguntas incompletas según el esquema actual.
- No hay duplicados textuales exactos entre las preguntas propias.
- Biblioteca local de normas y exámenes que reduce dependencia de enlaces externos.
- Diseño visual coherente, amable y adecuado para estudio prolongado.
- Penalización implementada y corrección detallada tras las respuestas.
- Filosofía de trazabilidad y protocolo de continuidad entre modelos bien concebidos.
- Canal de erratas integrado y repositorio público orientado a colaboración.

### Debilidades

- La etiqueta «Verificada» no representa una comprobación automática ni una evidencia individual reproducible.
- Existen preguntas con cita y explicación jurídicamente incorrectas.
- Duplicación conceptual propia y repetición histórica sin ponderación en prácticas mixtas.
- Desglose 1.212/310 incompatible con los metadatos reales 1.207/315.
- Clasificador de cobertura por cadenas de texto, que mezcla preguntas históricas con las creadas.
- Prácticas no aleatorias y filtros que trabajan con 2, 1 y 1 preguntas en tres categorías.
- Simulacro sin tiempo, blancos, muestreo variable ni formato completo.
- Métricas de día, semana y tiempo medio no calculadas realmente.
- Progreso exclusivamente local aunque se anuncia sincronización en nube.
- Autenticación permisiva y éxito visual aunque Supabase falle.
- 210 históricas sin justificación sustantiva de distractores.
- Sin fecha ni responsable estructurado de revisión.
- Código monolítico de 2,53 MB y ausencia de pruebas funcionales.
- Documentación y marketing desalineados con el código.

### Oportunidades

- Convertir el banco en datos versionados por tema y separar contenido de lógica.
- Introducir estados reales: `pendiente`, `revisada por IA`, `revisada humana`, `oficial histórica`, `bloqueada`.
- Guardar fuente, versión, fecha, revisor, hash documental y evidencia por cada pregunta.
- Crear revisión a doble ciego o por pares para preguntas jurídicas de mayor riesgo.
- Añadir deduplicación semántica y matriz artículo/submateria/dificultad.
- Implementar muestreo aleatorio estratificado por tema, dificultad y errores previos.
- Construir simulacros completos y cortos con tiempo, blancos y distribución configurable.
- Incorporar sincronización real y estadísticas útiles si se documenta privacidad y seguridad.
- Publicar solo una carpeta `public/` y automatizar una lista blanca de recursos.
- Añadir CI que compruebe recuentos, esquema, enlaces, cobertura, duplicados, seguridad y pruebas de navegador.
- Introducir actualización normativa periódica y alertas oficiales BOE/DOG.
- Mejorar rendimiento mediante JSON por tema, compresión, caché y carga bajo demanda.

### Amenazas

- Una reforma legal puede volver incorrectas muchas preguntas sin que el sistema lo detecte.
- La etiqueta «100% verificado» puede generar confianza excesiva y daño académico si hay errores.
- La publicación de la raíz facilita filtraciones accidentales de material interno o enlaces de gestión.
- Una política RLS débil podría exponer cuentas o comentarios; no puede comprobarse con el repositorio actual.
- La dependencia remota sin versión exacta ni SRI aumenta riesgo de disponibilidad y suministro.
- El crecimiento dentro de un único `app.js` dificulta revisar cambios y favorece regresiones.
- La restricción no comercial y el término Open Source pueden provocar conflictos de expectativas o reutilización.
- Datos de progreso solo locales pueden perderse al limpiar navegador o cambiar de dispositivo.
- Métricas decorativas pueden erosionar la confianza del usuario al descubrirse.
- La ausencia de pruebas reales en móvil, teclado y lectores de pantalla puede ocultar barreras importantes.

## 9. Qué falta

### Crítico antes de volver a declarar la v1.0

- Una auditoría jurídica reproducible de las preguntas nuevas, empezando por los IDs señalados y extendiéndose por lotes.
- Corregir el muestreo de práctica, los filtros de tema y el recuento de cobertura.
- Decidir una taxonomía inequívoca: 1.207 propias + 315 históricas, o documentar formalmente otra clasificación.
- Publicar una carpeta explícita de recursos en lugar de la raíz completa.
- Hacer veraz la autenticación: no conceder sesión visual tras un fallo.
- Implementar sincronización real o retirar cualquier promesa de sincronización.
- Política de privacidad y revisión de RLS para autenticación y comentarios.

### Importante para calidad de producto

- Cronómetro, respuestas en blanco y simulacro configurable/completo.
- Fechas reales para métricas diarias y semanales y medición real de tiempos.
- Aleatoriedad sin repetición y selección estratificada.
- Pruebas de navegador y accesibilidad.
- Esquema de base de datos, migraciones, copias de seguridad y recuperación.
- Revisión de 210 históricos con justificación sustantiva de distractores.
- Dificultad, submateria y artículo normalizados.
- CI y un procedimiento de actualización normativa.

### Deseable

- Modularización y carga por demanda.
- PWA offline real.
- Changelog, etiqueta de versión y criterios objetivos de release.
- Analítica pedagógica útil sin invadir privacidad.

## 10. Qué sobra o conviene retirar del producto público

No se propone borrar nada sin una copia o decisión del propietario. Sí conviene sacar del despliegue y del flujo principal:

- `.ia/`, scripts de auditoría y documentación de agentes;
- archivos temporales y utilidades antiguas de mutación;
- enlaces de gestores y cualquier fichero de credenciales o administración;
- cifras y porcentajes escritos a mano en varios sitios;
- afirmaciones no implementadas como «sincronización activa»;
- métricas simuladas como `1:08` fijo;
- nombres y fechas personales por defecto;
- imágenes OG duplicadas en raíz, `assets/` y `docs/`, salvo que exista una razón de despliegue documentada;
- referencias a archivos inexistentes;
- denominación «Open Source» si se mantiene una restricción no comercial incompatible con ese uso habitual del término.

## 11. Plan recomendado por prioridad

### P0 — Riesgo inmediato

1. Crear una carpeta pública mínima y desplegar solo lo necesario.
2. Añadir exclusiones de Git y despliegue; tratar cualquier enlace de gestión como potencialmente comprometido si llegó a publicarse.
3. Poner en cuarentena los cinco IDs jurídicos confirmados y buscar variantes duplicadas.
4. Corregir `buildSet()`, los filtros y el clasificador de cobertura.
5. Retirar temporalmente las afirmaciones de «100% verificado» y «sincronización activa».
6. No activar visualmente una sesión si Supabase devuelve error.

### P1 — Cierre real de producto

1. Separar preguntas propias e históricas y recalcular todas las cifras desde una única fuente.
2. Implementar simulacro con tiempo, blancos y muestreo real.
3. Añadir privacidad, migraciones y revisión de RLS.
4. Crear pruebas automáticas de los flujos principales.
5. Reauditar jurídicamente por lotes, con fecha y revisor en cada registro.
6. Resolver duplicación conceptual y justificaciones históricas genéricas.

### P2 — Mantenibilidad y crecimiento

1. Extraer el banco de `app.js` y dividirlo por temas o paquetes JSON.
2. Añadir CI, versión, changelog y release verificable.
3. Unificar estado, plan, auditoría, bitácora, README y guía de fuentes.
4. Optimizar carga móvil y añadir offline si sigue siendo objetivo.
5. Aclarar licencias separadas para código, contenido propio y documentos oficiales.

## 12. Condiciones objetivas para considerar la v1.0 cerrada

La v1.0 sería defendible cuando se cumplan simultáneamente estas condiciones:

- cero preguntas activas con discrepancia conocida entre enunciado, respuesta, explicación y artículo;
- recuentos generados automáticamente y coherentes en código y documentación;
- prácticas aleatorias sin repetición accidental;
- simulacro con tiempo, blancos, penalización y distribución comprobados;
- progreso local descrito como local, o sincronización real comprobada entre dos dispositivos;
- autenticación que no conceda acceso tras error;
- política de privacidad y RLS revisadas;
- solo recursos públicos expuestos en producción;
- pruebas automatizadas de los recorridos esenciales;
- documentación canónica sin contradicciones;
- etiqueta Git de release y copia de seguridad verificable.

## 13. Conclusión

El proyecto **merece continuar**: la base documental, el volumen del banco y el enfoque pedagógico son difíciles de reunir y constituyen una ventaja real. No parece un proyecto fallido ni vacío; al contrario, está cerca de convertirse en una herramienta sólida.

Lo que necesita ahora no es más volumen, sino una fase de saneamiento: veracidad de las promesas, revisión jurídica por evidencia, selección correcta de preguntas, seguridad del despliegue y pruebas funcionales. La prioridad debería ser **confiabilidad antes que nuevas preguntas**.

Hasta completar esa fase, la formulación pública más honesta sería: **«beta pública con banco amplio y trazable, en revisión jurídica continua»**.

---

## Anexo A. Archivos y puntos de evidencia principales

- `.ia/PROTOCOLO.md`
- `.ia/ESTADO-PROYECTO.md`
- `.ia/PLAN-MAESTRO.md`
- `.ia/AUDITORIA-CONTENIDO.md`
- `.ia/BITACORA-IA.md`
- `.ia/METODOLOGIA-BANCO-DE-PREGUNTAS.md`
- `app.js`, especialmente `coverageTopic()`, `coverageRows()`, `buildSet()`, `updateDashboard()`, `renderGoals()` y autenticación Supabase
- `index.html`
- `scripts/validar-banco.js`
- `scripts/validate-all-questions.js`
- `wrangler.json`
- `README.md`
- `CONTRIBUTING.md`
- `docs/FUENTES_OFICIALES.md`
- `LICENSE`

## Anexo B. Garantía de no modificación

Durante esta auditoría no se modificó ningún archivo previamente existente. El único archivo creado es el presente informe.
