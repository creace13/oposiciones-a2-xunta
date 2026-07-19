# Anexo al informe 15: métricas del panel y significado de «consolidado»

**Fecha:** 19 de julio de 2026  
**Modelo auditor:** Codex / OpenAI  
**Informe principal:** 15-AUDITORIA-CIERRE-BETA-CODEX-2026-07-19.md  
**Evidencia visual:** captura aportada por el usuario del panel principal  
**Resultado:** **ARITMÉTICA CORRECTA — PRESENTACIÓN ENGAÑOSA**

## 1. Qué muestra la captura

- Banco troncal: 1.207/1.210.
- Preguntas propias: 1.207.
- Preguntas oficiales históricas: 315.
- Total: 1.522.
- Bloque I: 100 %.
- Bloque II: 99 %.
- Leyenda: «consolidado».

## 2. La suma no está mal

Los datos internos son:

- Bloque I: 302 preguntas frente a un objetivo de 300;
- Bloque II: 905 preguntas frente a un objetivo de 910;
- total propio clasificado: 302 + 905 = 1.207;
- objetivo total: 300 + 910 = 1.210;
- banco completo: 1.207 + 315 históricas = 1.522.

Por tanto, 1.207/1.210 y 1.522 total son cifras matemáticamente coherentes.

## 3. Lo que sí está mal o induce a error

### [P1 editorial] «Consolidado» no es lo que mide la barra

El porcentaje se calcula contando preguntas clasificadas y comparándolas con objetivos numéricos de 300 y 910. No mide:

- consolidación jurídica;
- artículos cubiertos;
- ausencia de duplicidades;
- calidad de distractores;
- vigencia normativa;
- revisión independiente.

La palabra «consolidado» hace pensar que el contenido está jurídicamente validado. Debe sustituirse por «avance respecto al objetivo de volumen», «preguntas clasificadas» o «objetivo cuantitativo».

### [P1 editorial] El 100 % del Bloque I oculta 302/300

app.js limita visualmente el porcentaje con Math.min(100, ...). El Bloque I tiene realmente 302/300, aproximadamente 100,7 %, pero la tarjeta solo muestra 100 %.

No es un error de cálculo, pero oculta la razón por la que el total puede seguir en 1.207/1.210 aunque un bloque aparezca completo.

Debe mostrarse al menos:

- «302/300 · objetivo cumplido»;
- «905/910 · faltan 5 para el objetivo»;
- total «1.207/1.210 · faltan 3 netas respecto al objetivo global».

No es necesario mostrar más de 100 % en la barra; sí es necesario enseñar los recuentos para que el usuario entienda el reparto.

### [P2] «Banco troncal» necesita explicar el denominador

1.210 no es el total oficial exigido por una norma ni una medición jurídica. Es un objetivo interno de volumen: 10 temas × 30 y 13 temas × 70.

Texto recomendado:

«Banco propio clasificado: 1.207 preguntas · objetivo interno de volumen: 1.210 · más 315 preguntas oficiales históricas».

### [P2] Formato numérico inconsistente

El HTML inicial usa 1.207/1.210, pero el render dinámico escribe 1207/1210 sin separadores de miles, como se observa en la captura. Conviene usar toLocaleString('es-ES') para mantener 1.207, 1.210 y 1.522.

## 4. Elementos de la captura que no son errores

- Precisión neta y tiempo medio aparecen con raya porque todavía no existen respuestas.
- Repasos pendientes y sesiones aparecen a cero porque el perfil no tiene actividad.
- 1.207 propias + 315 oficiales = 1.522 es correcto.
- 99 % para 905/910 es un redondeo razonable, aunque debe acompañarse del recuento.

## 5. Corrección mínima para cerrar la Beta

Gemini/Antigravity debe:

1. sustituir «consolidado» por una etiqueta cuantitativa honesta;
2. mostrar 302/300 y 905/910 junto a las barras;
3. aclarar que 1.210 es un objetivo interno de volumen;
4. mantener los separadores españoles de miles;
5. evitar usar estos porcentajes como evidencia de cobertura jurídica.

Este anexo no reabre la parte técnica de la Beta. Es una corrección necesaria de comunicación y comprensión del panel.

## 6. Mensaje breve para Gemini / Antigravity

La captura no revela una suma incorrecta: 302 + 905 = 1.207 y 1.207 + 315 = 1.522. El error es semántico. Las barras comparan cantidad de preguntas con objetivos internos, pero la interfaz las llama «consolidado», lo que puede interpretarse como validación jurídica. Sustituye esa leyenda, muestra 302/300 y 905/910, explica que 1.210 es un objetivo interno y conserva el formato 1.207/1.210. Integra este anexo en la respuesta 17 al informe de cierre Beta.

## 7. Estado histórico del anexo

El anexo fue creado originalmente bajo la regla de solo lectura y posteriormente renumerado como secuencia 16 al ordenar la carpeta documental. Las correcciones se documentan en la respuesta 17.
