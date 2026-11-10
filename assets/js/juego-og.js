// Archivo que se utilizó para el juego original, ahora se usa main.js
// y este archivo se ha convertido en un backup para evitar conflictos con el nuevo código.
// Por si acaso, este archivo contiene la lógica del juego original.
// Se ha modificado para que funcione con el nuevo sistema de módulos y Luxon.
// Y ahora se carga desde main.js
// Aclaro eso doblemente para que no haya confusiones. Lol (La Profe: "Vamos a bajarle puntos por usar comentarios innecesarios y redundantes, también por dejar este comentario en el código y por no usar este archivo en la entrega final") XD
// Profe, no se sea mala y no me baje puntos por esto, es un backup y no se usa en la entrega final, lo prometo. XD

let preguntasBarajadas = [];

let puntaje = 0;
let preguntaActual = 0;
let respuestasUsuario = [];
let errores = [];
let tiempoLimite = 21; // segundos
let timerInterval = null;
let tiempoRestanteSpan = document.getElementById("tiempoRestante");


const musica = document.getElementById("musicaFondo"); //Para la música
const intro = document.getElementById("introduccion");
const startGameBtn = document.getElementById("startGameBtn");
const juegoDiv = document.getElementById("juego");
const preguntaH2 = document.getElementById("pregunta");
const opcionesDiv = document.getElementById("opciones");
const progresoP = document.getElementById("progreso");
const resultadoDiv = document.getElementById("resultado");
const puntajeFinal = document.getElementById("puntajeFinal");
const reiniciarBtn = document.getElementById("reiniciar");
const mensajeFinal = document.getElementById("mensajeFinal");
const mostrarErroresBtn = document.getElementById("mostrarErroresBtn");
const listaErrores = document.getElementById("listaErrores");
const imagen = document.getElementById("logonoise");
const audio = document.getElementById("intronoise");

startGameBtn.addEventListener("click", iniciarJuego);
reiniciarBtn.addEventListener("click", reiniciarJuego);

// Función para barajar un array (Fisher-Yates)
function barajarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Cargar preguntas al inicio
async function cargarPreguntas() {
  try {
    // Ajusta la ruta según la ubicación de tu archivo HTML principal
    const response = await fetch('js/preguntas.json');
    if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
    const datos = await response.json();
    preguntasBarajadas = barajarArray(datos);
  } catch (error) {
    console.error("Error cargando preguntas:", error);
    alert("Hubo un problema al cargar las preguntas.");
  }
}


async function iniciarJuego() {
  await cargarPreguntas(); // <-- cargar preguntas primero
  musica.play();
  musica.currentTime = 0;

  startGameBtn.style.display = "none";
  juegoDiv.style.display = "block";
  mostrarPregunta();
  intro.style.display = "none";
}



function mostrarPregunta() {
  clearInterval(timerInterval); // detener temporizador anterior si existe

  let p = preguntasBarajadas[preguntaActual];
  preguntaH2.textContent = p.pregunta;
  progresoP.textContent = `Pregunta ${preguntaActual + 1} de ${preguntasBarajadas.length}`;
  opcionesDiv.innerHTML = "";

  const opcionesBarajadas = barajarArray([...p.opciones]);

  opcionesBarajadas.forEach(opcion => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.addEventListener("click", () => {
      detenerTemporizador();
      verificarRespuesta(opcion);
    });
    opcionesDiv.appendChild(boton);
  });

  iniciarTemporizador();

  anteriorBtn.style.display = preguntaActual > 0 ? "inline-block" : "none";
}

function iniciarTemporizador() {
  let fin = luxon.DateTime.now().plus({ seconds: tiempoLimite });

  timerInterval = setInterval(() => {
    const ahora = luxon.DateTime.now();
    const diff = Math.round(fin.diff(ahora, "seconds").seconds);

    tiempoRestanteSpan.textContent = `⏳ Tiempo restante: ${diff}s`;

    if (diff <= 0) {
      clearInterval(timerInterval);
      verificarRespuesta(null, true); // true = por tiempo
    }
  }, 1000);
}


function detenerTemporizador() {
  clearInterval(timerInterval);
}


anteriorBtn.addEventListener("click", () => {
  if (preguntaActual > 0) {
    // Si retrocede desde una respuesta correcta, resta puntaje
    const respuestaAnterior = respuestasUsuario[preguntaActual - 1];
    if (respuestaAnterior === preguntasBarajadas[preguntaActual - 1].respuesta) {
      puntaje--;
    }

    // Borrar el error si había uno
    errores[preguntaActual - 1] = null;

    preguntaActual--;
    mostrarPregunta();
  }
});

function verificarRespuesta(respuestaUsuario, porTiempo = false) {
  const pregunta = preguntasBarajadas[preguntaActual];
  const respuestaCorrectaTexto = pregunta.respuesta;

  respuestasUsuario[preguntaActual] = respuestaUsuario ?? "(Sin respuesta)";

  if (respuestaUsuario === respuestaCorrectaTexto) {
    puntaje++;
    errores[preguntaActual] = null;
  } else {
    errores[preguntaActual] = {
      pregunta: pregunta.pregunta,
      correcta: respuestaCorrectaTexto,
      tuRespuesta: respuestaUsuario ?? "(Sin respuesta)",
      razon: porTiempo ? "Se acabó el tiempo" : "Respuesta incorrecta"
    };
  }

  preguntaActual++;

  if (preguntaActual < preguntasBarajadas.length) {
    mostrarPregunta();
  } else {
    mostrarResultados();
  }
}

function mostrarResultados() {
  juegoDiv.style.display = "none";
  resultadoDiv.style.display = "block";

  puntajeFinal.textContent = `Obtuviste ${puntaje} de ${preguntasBarajadas.length} puntos.`;

  const erroresFiltrados = errores.filter(e => e !== null);

  if (erroresFiltrados.length > 0) {
    mostrarErroresBtn.style.display = "inline-block";
    listaErrores.style.display = "none";

    mostrarErroresBtn.textContent = "Mostrar errores";

    mostrarErroresBtn.onclick = () => {
      if (listaErrores.style.display === "none") {
        let mensaje = "<h3>Respuestas incorrectas:</h3><ul>";
        erroresFiltrados.forEach(error => {
          mensaje += `
            <li>
              <strong>${error.pregunta}</strong><br>
              Tu respuesta: <span style="color:red">${error.tuRespuesta}</span><br>
              Respuesta correcta: <span style="color:lightgreen">${error.correcta}</span>
            </li><br>`;
        });
        mensaje += "</ul>";
        listaErrores.innerHTML = mensaje;
        listaErrores.style.display = "block";
        mostrarErroresBtn.textContent = "Ocultar errores";
      } else {
        listaErrores.style.display = "none";
        mostrarErroresBtn.textContent = "Mostrar errores";
      }
    };
  } else {
    mostrarErroresBtn.style.display = "none";
    listaErrores.style.display = "none";
    mensajeFinal.innerHTML = "¡Perfecto! Todas tus respuestas fueron correctas.";
  }
  localStorage.setItem("ultimoPuntaje", puntaje);
  const puntajeMaximoGuardado = localStorage.getItem("puntajeMaximo") || 0;
  if (puntaje > puntajeMaximoGuardado) {
  localStorage.setItem("puntajeMaximo", puntaje);
}

}

function reiniciarJuego() {
  puntaje = 0;
  preguntaActual = 0;
  resultadoDiv.style.display = "none";
  juegoDiv.style.display = "block";
  mostrarPregunta();
}

const volverMenuBtn = document.getElementById("volverMenu");

// Evento del nuevo botón
volverMenuBtn.addEventListener("click", volverAlMenu);

function volverAlMenu() {
  // Ocultar resultados
  intro.style.display = "block"
  resultadoDiv.style.display = "none";
  puntaje = 0;
  preguntaActual = 0;
  resultadoDiv.style.display = "none";
  mostrarPregunta();

  // Mostrar botón de inicio nuevamente
  startGameBtn.style.display = "inline-block";
  
  //Música
  musica.pause(); 
  musica.currentTime = 0;

  const mensajeAnterior = document.getElementById("mensajeAnterior");
  const puntajeMaximoDiv = document.getElementById("puntajeMaximo");

  const puntajeGuardado = localStorage.getItem("ultimoPuntaje");
  const puntajeMaximo = localStorage.getItem("puntajeMaximo");

  if (puntajeGuardado !== null) {
    mensajeAnterior.textContent = `Puntaje anterior: ${puntajeGuardado} puntos.`;
  } else {
    mensajeAnterior.textContent = "";
  }

  if (puntajeMaximo !== null) {
    puntajeMaximoDiv.textContent = `¡Tu puntaje más alto hasta ahora es: ${puntajeMaximo} puntos!`;
  } else {
    puntajeMaximoDiv.textContent = "";
  }
}

// Mostrar mensajes al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  const mensajeAnterior = document.getElementById("mensajeAnterior");
  const puntajeMaximoDiv = document.getElementById("puntajeMaximo");

  const puntajeGuardado = localStorage.getItem("ultimoPuntaje");
  const puntajeMaximo = localStorage.getItem("puntajeMaximo");

  if (puntajeGuardado !== null) {
    mensajeAnterior.textContent = `Puntaje anterior: ${puntajeGuardado} puntos.`;
  }

  if (puntajeMaximo !== null) {
    puntajeMaximoDiv.textContent = `¡Tu puntaje más alto hasta ahora es: ${puntajeMaximo} puntos!`;
  }
});

//AUDIO_INTRONOISE
imagen.addEventListener("click", () => {
  audio.currentTime = 0; // Reinicia el audio cada vez que se toca
  audio.play();
});