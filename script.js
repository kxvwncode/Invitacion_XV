// Esperar a que todo el contenido del documento se cargue
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Obtener referencias a los elementos del HTML
    const audioElement = document.getElementById("bg-music");
    const playBtn = document.getElementById("btn-play");
    const progressBar = document.getElementById("progress-bar");

    // Variable para rastrear si la música está sonando
    let isPlaying = false;

    // 2. Función para alternar entre Reproducir y Pausar
    function togglePlay() {
        if (isPlaying) {
            audioElement.pause();
            playBtn.textContent = "▶"; // Cambia el icono a Play
        } else {
            audioElement.play().then(() => {
                playBtn.textContent = "⏸"; // Cambia el icono a Pausa
            }).catch(error => {
                console.log("El navegador bloqueó la reproducción automática:", error);
            });
        }
        isPlaying = !isPlaying; // Invierte el estado
    }

    // 3. Evento al hacer clic en el botón de play
    playBtn.addEventListener("click", togglePlay);

    // 4. Actualizar la barra de progreso mientras suena la música
    audioElement.addEventListener("timeupdate", () => {
        if (audioElement.duration) {
            // Calcula el porcentaje de avance: (tiempo actual / duración total) * 100
            const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }
    });

    // 5. Opcional: Reiniciar la barra cuando termine la pista
    audioElement.addEventListener("ended", () => {
        progressBar.style.width = "0%";
        playBtn.textContent = "▶";
        isPlaying = false;
    });
});

// --- LÓGICA DE LA CUENTA REGRESIVA ---
// Define la fecha objetivo (Año, Mes [indexado desde 0: Ene=0, Feb=1, Mar=2...], Día, Hora, Minutos)
const targetDate = new Date(2026, 12, 14, 18, 0, 0).getTime(); // 14 de Marzo de 2026 a las 6:00 PM

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    // Si la fecha ya pasó
    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    // Cálculos matemáticos para obtener días, horas, minutos y segundos sobrantes
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Escribir en el HTML formateando a 2 dígitos (ejemplo: '05' en vez de '5')
    document.getElementById("days").textContent = days < 10 ? `0${days}` : days;
    document.getElementById("hours").textContent = hours < 10 ? `0${hours}` : hours;
    document.getElementById("minutes").textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById("seconds").textContent = seconds < 10 ? `0${seconds}` : seconds;
}

// Ejecutar la función inmediatamente al cargar
updateCountdown();

// Actualizar el reloj cada 1 segundo (1000 milisegundos)
setInterval(updateCountdown, 1000);

// --- CONFIRMACIÓN VÍA WHATSAPP (RSVP) ---
    const rsvpBtn = document.getElementById("btn-rsvp");
    const phoneNumber = "+526751135255"; // Número de teléfono real con código de país
    const customMessage = encodeURIComponent("¡Hola! Confirmo mi asistencia a la celebración de los XV Años de Dayana. ✨");

    rsvpBtn.addEventListener("click", () => {
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${customMessage}`;
        window.open(whatsappUrl, "_blank");
    });

// Inicializar animaciones de DESPLAZAMIENTO
    AOS.init({
        duration: 800,  // Duración de la animación en milisegundos
        once: false,      // La animación se repite siempre la hacer scroll
        mirror: true    // Anima los elementos mientraste desplazas hacia arriba tambien
    });

//Animacion de la linea del tiempo(Itinerario)
    const timeline = document.querySelector('.timeline');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

if (timeline) {
    observer.observe(timeline);
}  