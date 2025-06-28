# 🎮 Simulador Trivia DELTARUNE

¡Bienvenido/a al **Simulador de Trivia DELTARUNE**!  
Este proyecto es un juego interactivo de preguntas de opción múltiple basado en el universo de DELTARUNE, desarrollado como proyecto final para el curso de JavaScript en CoderHouse.

---

## 📑 Descripción

Pon a prueba tus conocimientos sobre DELTARUNE con este juego de trivia. Responde preguntas de opción múltiple, compite contra el tiempo, escucha música de fondo aleatoria y trata de superar tu propio puntaje máximo. ¡Demuestra cuánto sabes y diviértete!

---

## 🚀 ¿Cómo usar el simulador?

1. **Descarga o clona este repositorio**  
   ```bash
   git clone https://https://github.com/nicholas-delarosa/deltarune-trivia
   ```
2. **Abre el archivo `index.html` en tu navegador**  
   No necesitas instalar nada extra.
3. **Haz clic en "Iniciar"**  
   - Se elegirá una música de fondo al azar.
   - Responde las preguntas antes de que termine el tiempo.
   - Al finalizar, revisa tu puntaje y los errores cometidos.

---

## 🧩 Estructura del Proyecto

```
assets/
  audio/         # Audios de fondo y efectos
    AUDIO_INTRONOISE.mp3
    quiz.mp3
    ruder.mp3
    trash.mp3
  css/
    style.css    # Estilos personalizados
  fonts/
    logo_font_dr.ttf
    text_font_utdr.ttf
  images/
    deltarune_logo.ico
    logo.png
  js/
    juego.js         # Lógica y estado del juego
    main.js          # Interfaz y eventos
    preguntas.json   # Preguntas y respuestas
index.html           # Página principal
README.md            # Este archivo
```

---

## ✨ Características principales

- **Preguntas y opciones cargadas desde un archivo JSON** usando `fetch`.
- **Interfaz 100% dinámica:**  
  Todas las preguntas y opciones se generan con JavaScript.
- **Música de fondo aleatoria:**  
  Cada partida suena una pista diferente de la carpeta `audio/`.
- **Timer visual:**  
  Si el tiempo se acaba, la pregunta se marca como incorrecta.
- **Botón "Anterior":**  
  Permite volver a la pregunta anterior (ajustando el puntaje si corresponde).
- **Resumen de errores:**  
  Al finalizar puedes ver en qué fallaste.
- **Puntaje máximo y último puntaje:**  
  Se guardan y muestran en la pantalla de inicio usando `localStorage`.
- **Animaciones y estilos personalizados** para una experiencia inmersiva.
- **Fuentes y recursos visuales** inspirados en DELTARUNE.

---

## 🛠️ Tecnologías utilizadas

- **HTML5** y **CSS3** (diseño responsivo y personalizado)
- **JavaScript ES6+** (modular, sin frameworks)
- **Luxon** (librería para manejo de fechas y temporizadores)
- **localStorage** (para guardar puntajes)
- **Fuentes y recursos visuales** inspirados en DELTARUNE

---

## 🎵 Audios de fondo

Al iniciar el juego, se selecciona aleatoriamente uno de los siguientes audios de fondo:

- `trash.mp3`
- `quiz.mp3`
- `ruder.mp3`

Además, hay efectos de sonido como `AUDIO_INTRONOISE.mp3` al interactuar con el logo.

---

## 📊 Guardado de puntajes

- El **puntaje máximo** y el **último puntaje** se guardan automáticamente en el navegador usando `localStorage`.
- Estos puntajes se muestran en la pantalla de inicio para motivar la superación personal.

---

## 🖼️ Interfaz y experiencia de usuario

- **Diseño centrado y responsivo**, con colores y fuentes inspirados en DELTARUNE.
- **Animación de texto** en el mensaje del puntaje anterior.
- **Botones grandes y claros** para facilitar la interacción.
- **Opciones de respuesta** generadas dinámicamente.
- **Resumen de errores** al finalizar, mostrando la respuesta correcta y la elegida.

---

## 📦 ¿Qué archivos modifico si quiero agregar más preguntas?

Solo debes editar el archivo  
[`assets/js/preguntas.json`](assets/js/preguntas.json)  
y agregar más objetos de pregunta siguiendo el formato existente.

---

## 👨‍💻 Créditos

- **Desarrollador/a:** Nicholas Andres de la Rosa Rivera
- **Curso:** JavaScript - CoderHouse
- **Inspiración:** [DELTARUNE](https://www.deltarune.com) de Toby Fox

---

## ⚠️ Notas

- Este proyecto es solo con fines educativos y de práctica.
- Todos los recursos de audio, imagen y fuente son para uso no comercial y pertenecen a sus respectivos autores.

---

¡Gracias por jugar y disfrutar del simulador!  
Si tienes sugerencias o encuentras algún bug, no dudes en abrir un issue o contactarme.

---