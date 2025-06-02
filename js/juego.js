const preguntasBarajadas = [
  {
    pregunta: "¿Dónde está Asriel?",
    opciones: ["En la Universidad", "Con Asgore", "En tu escuela", "Con Rudy"],
    respuesta: "En la Universidad",
  },
  {
    pregunta: "¿Qué canción suena cuando Ralsie te cuenta la leyenda",
    opciones: ["Darkness Falls", "Rude Buster", "The Legend", "Beginning"],
    respuesta: "The Legend"
  },
  {
    pregunta: "¿Qué estaba Susie comiendo en el pasillo?",
    opciones: ["Tiza", "Salsa", "Pastel", "Dulce Oscuro"],
    respuesta: "Tiza"
  },
  {
    pregunta: "¿Cuál es el tema de la tienda de Seam?",
    opciones: ["Shop", "Lantern", "Hip Shop", "Gallery"],
    respuesta: "Lantern"
  },
  {
    pregunta: "¿Cuál es el tema del papá de Lancer?",
    opciones: ["Empty Town", "Field of Hopes and Dreams", "Scarlet Forest", "Chaos King"],
    respuesta: "Chaos King"
  },
  {
    pregunta: "¿Qué te dice Susie después de la aventura en el primer mundo oscuro?",
    opciones: ["Volvamos", "Vamos a volver a ahí", "Volvamos mañana a ahí, ¿está bien?", "Volvamos a ahí, Kris"],
    respuesta: "Volvamos mañana a ahí, ¿está bien?"
  },
  {
    pregunta: '"HO HO HO" ¿Quién se ríe así?',
    opciones: ["Lancer", "Susie", "Kris", "Ralsei"],
    respuesta: "Lancer"
  },{
    pregunta: "¿Quién es el jefe secreto del Capítulo 1?",
    opciones: ["Jevil", "Chaos King", "Asgore", "Noelle"],
    respuesta: "Jevil"
  },
  {
    pregunta: "¿Quién eres en DELTARUNE?",
    opciones: ["Kris", "Silliel", "Chara", "Frisk"],
    respuesta: "Kris"
  },
  {
    pregunta: "¿Quién hizo DELTARUNE?",
    opciones: ["Scott Cawthon", "Maddy Make Games", "MDHR Studios", "Toby Fox"],
    respuesta: "Toby Fox"
  },
  {
    pregunta: '¿Quién tiene una risa "no malvada"?',
    opciones: ["Kris", "Susie", "Lancer", "Ralsei"],
    respuesta: "Lancer"
  },
  {
    pregunta: "¿Qué apodo le dice el papá de Lancer a Lancer?",
    opciones: ["Hijo del día", "Hijo de la semana", "Hijo del mes", "Hijo del año"],
    respuesta: "Hijo del mes"
  },
  {
    pregunta: "¿De qué color es Susie?",
    opciones: ["Verde", "Azul", "Morado", "Rojo"],
    respuesta: "Morado"
  },
  {
    pregunta: "¿De quién es hijo Kris?",
    opciones: ["Toriel", "Alphys", "Undyne", "QC"],
    respuesta: "Toriel"
  },
  {
    pregunta: "¿Está Sans en el juego?",
    opciones: ["No, él está en UNDERTALE", "Sí, lo ves antes del final del juego en ambos capítulos", "No, Papyrus aparece en vez de él", "Sí, él es el principe de la oscuridad y te acompaña en ambos capítulos"],
    respuesta: "Sí, lo ves antes del final del juego en ambos capítulos"
  },
  {
    pregunta: "¿Está Flowey en DELTARUNE?",
    opciones: ["No, no aparece", "Aparece durante un breve momento en el capítulo 2", "Aparece una flor con apariencia a Flowey en el capítulo 1, pero no es él como tal", "Sí, aparece antes de sellar la fuente oscura en el capítulo 1 al intentar robar nuestra ALMA"],
    respuesta: "Aparece una flor con apariencia a Flowey en el capítulo 1, pero no es él como tal"
  },
  {
    pregunta: "¿Sans rompe la cuarta pared en DELTARUNE?",
    opciones: ["Sí", "¿Por qué el esqueleto no fue a la pista de baile?", "¿Por qué no tenía cuerpo para bailar?", "No, tío, porque era feo, gordo y nadie le quería"],
    respuesta: "Sí"
  },
  {
    pregunta: "¿Cuántos huevos puedes coleccionar en los dos capítulos de DELTARUNE?",
    opciones: ["Dos en cada uno", "Uno en cada uno", "Dos en el capítulo 1 y uno en el capítulo 2", "Uno en el capítulo 1 y dos en el capítulo 2"],
    respuesta: "Uno en cada uno"
  },
  {
    pregunta: "¿Quiénes pueden crear fuentes oscuras?",
    opciones: ["Lightners", "Darkness", "Monstruos", "Humanos"],
    respuesta: "Lightners"
  },
  {
    pregunta: "¿Con qué NV empiezas en el mundo oscuro del capítulo 1?",
    opciones: ["3", "6", "2", "1"],
    respuesta: "1"
  },
];

let puntaje = 0;
let preguntaActual = 0;
let respuestasUsuario = [];
let errores = [];

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

function iniciarJuego() {
  musica.play(); //Reproducir música de fondo
  musica.currentTime = 0; //Reinicia al segundo 0

  startGameBtn.style.display = "none";
  juegoDiv.style.display = "block";
  mostrarPregunta();
  intro.style.display = "none";
}

function barajarArray(array) {
  return array.sort(() => Math.random() - 0.5);
}


function mostrarPregunta() {
  let p = preguntasBarajadas[preguntaActual];
  preguntaH2.textContent = p.pregunta;
  progresoP.textContent = `Pregunta ${preguntaActual + 1} de ${preguntasBarajadas.length}`;
  opcionesDiv.innerHTML = "";

  // Barajar opciones
  const opcionesBarajadas = barajarArray([...p.opciones]);

  opcionesBarajadas.forEach(opcion => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.addEventListener("click", () => verificarRespuesta(opcion));
    opcionesDiv.appendChild(boton);
  });
  // Mostrar botón de "anterior" a partir de la segunda pregunta
  if (preguntaActual > 0) {
    anteriorBtn.style.display = "inline-block";
  } else {
    anteriorBtn.style.display = "none";
  }
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

function verificarRespuesta(respuestaUsuario) {
  const pregunta = preguntasBarajadas[preguntaActual];
  const respuestaCorrectaTexto = pregunta.respuesta;

  respuestasUsuario[preguntaActual] = respuestaUsuario;

  if (respuestaUsuario === respuestaCorrectaTexto) {
    puntaje++;
    errores[preguntaActual] = null;
  } else {
    errores[preguntaActual] = {
      pregunta: pregunta.pregunta,
      correcta: respuestaCorrectaTexto,
      tuRespuesta: respuestaUsuario
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