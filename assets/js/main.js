import {
    preguntasBarajadas,
    puntaje,
    preguntaActual,
    respuestasUsuario,
    errores,
    tiempoLimite,
    timerInterval,
    barajarArray,
    cargarPreguntas,
    verificarRespuesta,
    reiniciarEstadoJuego,
    retrocederPregunta
} from './juego.js';

// DOM Elements
const musica = document.getElementById("musicaFondo");
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
const tiempoRestanteSpan = document.getElementById("tiempoRestante");
const anteriorBtn = document.getElementById("anteriorBtn");
const volverMenuBtn = document.getElementById("volverMenu");
const audiosFondo = [
    "assets/audio/trash.mp3",
    "assets/audio/quiz.mp3",
    "assets/audio/ruder.mp3"
];
const nombreForm = document.getElementById("nombreForm");
const nombreInput = document.getElementById("nombreInput");
const nombreGuardado = document.getElementById("nombreGuardado");
const audioHover = document.getElementById("audioHover");
const audioClick = document.getElementById("audioClick");
const audioWin = document.getElementById("audioWin");
const audioLose = document.getElementById("audioLose");
const rankingJugadores = document.getElementById("rankingJugadores");

// Timer Functions
function iniciarTemporizador() {
    let fin = luxon.DateTime.now().plus({ seconds: tiempoLimite });

    window.timerInterval = setInterval(() => {
        const ahora = luxon.DateTime.now();
        const diff = Math.round(fin.diff(ahora, "seconds").seconds);

        tiempoRestanteSpan.textContent = `⏳ Tiempo restante: ${diff}s`;

        if (diff <= 0) {
            clearInterval(window.timerInterval);
            verificarRespuesta(null, true); // true = por tiempo
            mostrarPregunta();
        }
    }, 1000);
}

function detenerTemporizador() {
    clearInterval(window.timerInterval);
}

// UI Functions
function mostrarPregunta() {
    detenerTemporizador();

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
            if (preguntaActual < preguntasBarajadas.length) {
                mostrarPregunta();
            } else {
                mostrarResultados();
            }
        });
        opcionesDiv.appendChild(boton);
    });

    iniciarTemporizador();

    anteriorBtn.style.display = preguntaActual > 0 ? "inline-block" : "none";
}

function mostrarResultados() {
    juegoDiv.style.display = "none";
    resultadoDiv.style.display = "block";

    puntajeFinal.textContent = `Obtuviste ${puntaje} de ${preguntasBarajadas.length} puntos.`;
    // Mostrar formulario de nombre
    nombreForm.style.display = "block";
    nombreGuardado.textContent = "";

    // Sonido según puntaje
    if (puntaje === preguntasBarajadas.length) {
        audioWin.currentTime = 0;
        audioWin.play();
    } else if (puntaje < preguntasBarajadas.length) {
        audioLose.currentTime = 0;
        audioLose.play();
    }
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
    mostrarRanking();
}

// Guardar nombre y puntaje
nombreForm.onsubmit = (e) => {
    e.preventDefault();
    const nombre = nombreInput.value.trim();
    let ranking = JSON.parse(localStorage.getItem("rankingJugadores") || "[]");
    ranking.push({ nombre: nombre || "Anónimo", puntaje });
    localStorage.setItem("rankingJugadores", JSON.stringify(ranking));
    if (nombre) {
        nombreGuardado.textContent = `¡Gracias, ${nombre}! Puntaje registrado: ${puntaje}`;
        localStorage.setItem("nombreJugador", nombre);
    } else {
        nombreGuardado.textContent = `Puntaje registrado sin nombre: ${puntaje}`;
    }
    nombreForm.style.display = "none";
    mostrarRanking();
};

// Mostrar ranking de jugadores
function mostrarRanking() {
    let ranking = JSON.parse(localStorage.getItem("rankingJugadores") || "[]");
    if (ranking.length === 0) {
        rankingJugadores.innerHTML = "";
        return;
    }
    // Ordenar por puntaje descendente
    ranking.sort((a, b) => b.puntaje - a.puntaje);
    let html = `<h3 style="color:var(--primario);margin-bottom:8px;">Jugadores registrados</h3><ul style="list-style:none;padding:0;">`;
    ranking.forEach((jug, i) => {
        html += `<li style="margin-bottom:4px;">
            <span style="font-weight:bold;color:yellow;">${i+1}.</span>
            <span style="color:cyan;">${jug.nombre || "Anónimo"}</span>
            <span style="color:#fff;">-</span>
            <span style="color:lightgreen;">${jug.puntaje} pts</span>
        </li>`;
    });
    html += "</ul>";
    rankingJugadores.innerHTML = html;
}

// Sonidos de hover y click en botones
document.addEventListener("mouseover", (e) => {
    if (e.target.tagName === "BUTTON") {
        audioHover.currentTime = 0;
        audioHover.play();
    }
});
document.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        audioClick.currentTime = 0;
        audioClick.play();
    }
});

// Game Flow Functions
async function iniciarJuego() {
    await cargarPreguntas();
    // Elegir un audio al azar y asignarlo como fuente
    const audioAleatorio = audiosFondo[Math.floor(Math.random() * audiosFondo.length)];
    musica.src = audioAleatorio;
    musica.currentTime = 0;
    musica.play();

    startGameBtn.style.display = "none";
    juegoDiv.style.display = "block";
    mostrarPregunta();
    intro.style.display = "none";
}

function reiniciarJuego() {
    reiniciarEstadoJuego();
    resultadoDiv.style.display = "none";
    juegoDiv.style.display = "block";
    mostrarPregunta();
}

function volverAlMenu() {
    intro.style.display = "block";
    resultadoDiv.style.display = "none";
    reiniciarEstadoJuego();
    resultadoDiv.style.display = "none";
    mostrarPregunta();

    startGameBtn.style.display = "inline-block";
    musica.pause();
    musica.currentTime = 0;

    const mensajeAnterior = document.getElementById("mensajeAnterior");
    const puntajeMaximoDiv = document.getElementById("puntajeMaximo");

    const puntajeGuardado = localStorage.getItem("ultimoPuntaje");
    const puntajeMaximo = localStorage.getItem("puntajeMaximo");

    mensajeAnterior.textContent = puntajeGuardado !== null
        ? `Puntaje anterior: ${puntajeGuardado} puntos.`
        : "";

    puntajeMaximoDiv.textContent = puntajeMaximo !== null
        ? `¡Tu puntaje más alto hasta ahora es: ${puntajeMaximo} puntos!`
        : "";
}

// Event Listeners
startGameBtn.addEventListener("click", iniciarJuego);
reiniciarBtn.addEventListener("click", reiniciarJuego);
volverMenuBtn.addEventListener("click", volverAlMenu);

imagen.addEventListener("click", () => {
    audio.currentTime = 0;
    audio.play();
});

anteriorBtn.addEventListener("click", () => {
    if (preguntaActual > 0) {
        const respuestaAnterior = respuestasUsuario[preguntaActual - 1];
        if (respuestaAnterior === preguntasBarajadas[preguntaActual - 1].respuesta) {
            puntaje--;
        }
        errores[preguntaActual - 1] = null;
        retrocederPregunta();
        mostrarPregunta();
    }
});

// On DOM Load
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
