// Estado del juego
let preguntasBarajadas = [];
let puntaje = 0;
let preguntaActual = 0;
let respuestasUsuario = [];
let errores = [];
let tiempoLimite = 21; // segundos
let timerInterval = null;

// Utilidades
function barajarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Cargar preguntas
async function cargarPreguntas() {
    try {
        const response = await fetch('assets/js/preguntas.json');
        if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
        const datos = await response.json();
        preguntasBarajadas = barajarArray(datos);
    } catch (error) {
        console.error("Error cargando preguntas:", error);
        alert("Hubo un problema al cargar las preguntas.");
    }
}

// Verificar respuesta
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
}

// Reiniciar juego
function reiniciarEstadoJuego() {
    puntaje = 0;
    preguntaActual = 0;
    respuestasUsuario = [];
    errores = [];
}

function retrocederPregunta() {
    if (preguntaActual > 0) {
        preguntaActual--;
    }
}

// Exportar
export {
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
};