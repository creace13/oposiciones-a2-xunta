# Guía de Contribución · Oposiciones A2 Xunta de Galicia 🇪🇸

¡Gracias por tu interés en ayudar a mejorar este proyecto de código fuente disponible! Tu ayuda permite mantener el banco de preguntas actualizado, riguroso y libre de erratas para todos los opositores.

---

## 🎯 Formas de Contribuir

1. **Notificar Erratas o Impugnaciones**: Si detectas una respuesta incorrecta o un artículo desactualizado, abre un [Issue en GitHub](https://github.com/creace13/oposiciones-a2-xunta/issues).
2. **Proponer Nuevas Preguntas**: Puedes sugerirlas mediante una incidencia, citando una fuente oficial de la Xunta de Galicia o del Estado.
3. **Proponer Mejoras Técnicas**: Puedes describir correcciones de accesibilidad, diseño o rendimiento mediante una incidencia.

El repositorio se mantiene como porfolio bajo dirección del titular. No se aceptarán aportaciones de código o contenido mediante Pull Request sin un acuerdo previo y escrito que aclare autoría, licencia pública y posibilidad de licencia comercial. Esta precaución evita incorporar materiales que el proyecto no tenga derecho a reutilizar o licenciar.

---

## 📋 Reglas para Añadir / Modificar Preguntas

Las preguntas del banco oficial deben cumplir con la siguiente estructura en `app.js`:

```javascript
{
  id: 'tema-articulo-numero', // ID único sin duplicados
  topic: 'Nombre del Tema',   // Tema oficial del programa A2
  question: '¿Texto de la pregunta?',
  options: [
    'A) Opción 1',
    'B) Opción 2',
    'C) Opción 3',
    'D) Opción 4'
  ],
  answer: 0, // Índice de la respuesta correcta (0 para A, 1 para B, 2 para C, 3 para D)
  explanation: 'Explicación detallada con referencia normativa exacta.',
  source: 'Ley X/YYYY, art. Z',
  sourceUrl: officialSources.xxxx,
  quality: 'Verificada'
}
```

---

## 🧪 Validación Obligatoria

Antes de enviar un Pull Request, ejecuta el script de validación del banco de preguntas en tu consola:

```bash
node scripts/validar-banco.js
```

El script comprobará que:
- No existen IDs duplicados.
- Todas las preguntas tienen exactamente 4 opciones.
- El índice `answer` está entre 0 y 3.
- Las fuentes normativas están correctamente enlazadas.

---

## ⚖️ Licencias

Las incidencias y sugerencias no transfieren por sí solas la propiedad de obras o materiales adjuntos. No envíes contenido que no sea tuyo o que no puedas compartir.

Si el titular acuerda previamente aceptar una aportación, el acuerdo indicará por escrito qué licencia se aplica y qué permisos recibe el proyecto. El reparto general utiliza **PolyForm Noncommercial** para el código y **CC BY-NC-SA** para el contenido original, con exclusión de los materiales oficiales y de terceros. Está documentado en [`LICENSE`](LICENSE) y [`docs/LICENCIAS-Y-DERECHOS.md`](docs/LICENCIAS-Y-DERECHOS.md).
