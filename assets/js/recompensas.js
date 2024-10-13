// Obtener el usuario logueado desde sessionStorage
const emailUsuario = sessionStorage.getItem('usuarioLogueado');

if (!emailUsuario) {
    alert("Debes iniciar sesion primero.");
    window.location.href = "index.html"; // Redirigir al inicio de sesion si no esta logueado
}

// Obtener los datos del usuario desde localStorage
const usuario = JSON.parse(localStorage.getItem(emailUsuario));

// Mostrar los puntos actuales del usuario
document.getElementById('puntos_usuario').innerText = `Puntos actuales: ${usuario.puntosTotales}`;

// Obtener todos los botones de canje
const botonesCanje = document.querySelectorAll('.btn_canjear');

// Añadir eventos a cada boton de canje
botonesCanje.forEach(function(boton) {
    boton.addEventListener('click', function() {
        const puntosRequeridos = parseInt(boton.getAttribute('data-puntos'));

        // Verificar si el usuario tiene suficientes puntos
        if (usuario.puntosTotales >= puntosRequeridos) {
            // Restar los puntos del usuario
            usuario.puntosTotales -= puntosRequeridos;
            localStorage.setItem(emailUsuario, JSON.stringify(usuario));

            // Actualizar los puntos en la pagina
            document.getElementById('puntos_usuario').innerText = `Puntos actuales: ${usuario.puntosTotales}`;

            alert("Recompensa canjeada con exito.");
        } else {
            alert("No tienes suficientes puntos para canjear esta recompensa.");
        }
    });
});
