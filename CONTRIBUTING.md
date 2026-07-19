# Guía de Contribución · Oposiciones A2 Xunta de Galicia 🇪🇸

¡Gracias por tu interés en contribuir a este proyecto Open Source! Tu ayuda permite mantener el banco de preguntas actualizado, riguroso y libre de erratas para todos los opositores.

---

## 🎯 Formas de Contribuir

1. **Notificar Erratas o Impugnaciones**: Si detectas una respuesta incorrecta o un artículo desactualizado, abre un [Issue en GitHub](https://github.com/creace13/oposiciones-a2-xunta/issues).
2. **Proponer Nuevas Preguntas**: Puedes sugerir preguntas basadas en normativas oficiales de la Xunta de Galicia o del Estado.
3. **Mejorar la Interfaz o Funcionalidades**: Correcciones en CSS, accesibilidad o rendimiento de la aplicación web.

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

## ⚖️ Licencia

Al contribuir a este repositorio, aceptas que tus aportaciones se publiquen bajo la **Licencia MIT**.
