const preguntas = [
  {
    pregunta: "¿Dónde está Asriel?",
    opciones: ["A) En la Universidad", "B) Con Asgore", "C) En tu escuela", "D) Con Rudy"],
    respuesta: "A",
  },
  {
    pregunta: "¿Qué canción suena cuando Ralsie te cuenta la leyenda",
    opciones: ["A) Darkness Falls", "B) Rude Buster", "C) The Legend", "D) Beginning"],
    respuesta: "C"
  },
  {
    pregunta: "¿Qué estaba Susie comiendo en el pasillo?",
    opciones: ["A) Tiza", "B) Salsa", "C) Pastel", "D) Dulce Oscuro"],
    respuesta: "A"
  },
  {
    pregunta: "¿Cuál es el tema de la tienda de Seam?",
    opciones: ["A) Shop", "B) Lantern", "C) Hip Shop", "D) Gallery"],
    respuesta: "B"
  },
  {
    pregunta: "¿Cuál es el tema del papá de Lancer?",
    opciones: ["A) Empty Town", "B) Field of Hopes and Dreams", "C) Scarlet Forest", "D) Chaos King"],
    respuesta: "D"
  },
  {
    pregunta: "¿Qué te dice Susie después de la aventura en el primer mundo oscuro?",
    opciones: ["A) Volvamos", "B) Vamos a volver a ahí", "C) Volvamos mañana a ahí, ¿está bien?", "D) Volvamos a ahí, Kris"],
    respuesta: "C"
  },
  {
    pregunta: '"HO HO HO" ¿Quién se ríe así?',
    opciones: ["A) Lancer", "B) Susie", "C) Kris", "D) Ralsei"],
    respuesta: "A"
  },{
    pregunta: "¿Quién es el jefe secreto del Capítulo 1?",
    opciones: ["A) Jevil", "B) Chaos King", "C) Asgore", "D) Noelle"],
    respuesta: "A"
  },
  {
    pregunta: "¿Quién eres en DELTARUNE?",
    opciones: ["A) Kris", "B) Silliel", "C) Chara", "D) Frisk"],
    respuesta: "A"
  },
  {
    pregunta: "¿Quién hizo DELTARUNE?",
    opciones: ["A) Scott Cawthon", "B) Maddy Make Games", "C) MDHR Studios", "D) Toby Fox"],
    respuesta: "D"
  },
  {
    pregunta: '¿Quién tiene una risa "no malvada"?',
    opciones: ["A) Kris", "B) Susie", "C) Lancer", "D) Ralsei"],
    respuesta: "C"
  },
  {
    pregunta: "¿Qué apodo le dice el papá de Lancer a Lancer?",
    opciones: ["A) Hijo del día", "B) Hijo de la semana", "C) Hijo del mes", "D) Hijo del año"],
    respuesta: "C"
  },
  {
    pregunta: "¿De qué color es Susie?",
    opciones: ["A) Verde", "B) Azul", "C) Morado", "D) Rojo"],
    respuesta: "C"
  },
  {
    pregunta: "¿De quién es hijo Kris?",
    opciones: ["A) Toriel", "B) Alphys", "C) Undyne", "D) QC"],
    respuesta: "A"
  },
  {
    pregunta: "¿Está Sans en el juego?",
    opciones: ["A) No, él está en UNDERTALE", "B) Sí, lo ves antes del final del juego en ambos capítulos", "C) No, Papyrus aparece en vez de él", "D) Sí, él es el principe de la oscuridad y te acompaña en ambos capítulos"],
    respuesta: "B"
  },
  {
    pregunta: "¿Está Flowey en DELTARUNE?",
    opciones: ["A) No, no aparece", "B) Aparece durante un breve momento en el capítulo 2", "C) Aparece una flor con apariencia a Flowey en el capítulo 1, pero no es él como tal", "D) Sí, aparece antes de sellar la fuente oscura en el capítulo 1 al intentar robar nuestra ALMA"],
    respuesta: "C"
  },
  {
    pregunta: "¿Sans rompe la cuarta pared en DELTARUNE?",
    opciones: ["A) Sí", "B) ¿Por qué el esqueleto no fue a la pista de baile?", "C) ¿Por qué no tenía cuerpo para bailar?", "D) No, tío, porque era feo, gordo y nadie le quería"],
    respuesta: "A"
  },
  {
    pregunta: "¿Cuántos huevos puedes coleccionar en los dos capítulos de DELTARUNE?",
    opciones: ["A) Dos en cada uno", "B) Uno en cada uno", "C) Dos en el capítulo 1 y uno en el capítulo 2", "D) Uno en el capítulo 1 y dos en el capítulo 2"],
    respuesta: "B"
  },
  {
    pregunta: "¿Quiénes pueden crear fuentes oscuras?",
    opciones: ["A) Lightners", "B) Darkness", "C) Monstruos", "D) Humanos"],
    respuesta: "A"
  },
  {
    pregunta: "¿Con qué NV empiezas en el mundo oscuro del capítulo 1?",
    opciones: ["A) 3", "B) 6", "C) 2", "D) 1"],
    respuesta: "D"
  },
];

let puntaje = 0;
let preguntaActual = 0;

const musica = document.getElementById("musicaFondo"); //Para la música
const intro = document.getElementById("introduccion");
const startGameBtn = document.getElementById("startGameBtn");
const juegoDiv = document.getElementById("juego");
const preguntaH2 = document.getElementById("pregunta");
const opcionesDiv = document.getElementById("opciones");
const progresoP = document.getElementById("progreso");
const resultadoDiv = document.getElementById("resultado");
const puntajeFinalH2 = document.getElementById("puntajeFinal");
const reiniciarBtn = document.getElementById("reiniciar");

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

function mostrarPregunta() {
  let p = preguntas[preguntaActual];
  preguntaH2.textContent = p.pregunta;
  progresoP.textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
  opcionesDiv.innerHTML = "";

  p.opciones.forEach(opcion => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.addEventListener("click", () => verificarRespuesta(opcion.charAt(0)));
    opcionesDiv.appendChild(boton);
  });
}

function verificarRespuesta(respuestaUsuario) {
  let respuestaCorrecta = preguntas[preguntaActual].respuesta;

  if (respuestaUsuario === respuestaCorrecta) {
    puntaje++;
  }

  preguntaActual++;

  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultados();
  }
}

function mostrarResultados() {
  juegoDiv.style.display = "none";
  resultadoDiv.style.display = "block";
  puntajeFinalH2.textContent = `Obtuviste ${puntaje} de ${preguntas.length} puntos.`;
  localStorage.setItem("ultimoPuntaje", puntaje);
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
}