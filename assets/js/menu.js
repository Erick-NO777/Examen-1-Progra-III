// Obtener el usuario logueado desde sessionStorage
const emailUsuario = sessionStorage.getItem('usuarioLogueado');

// Verificar si el usuario esta logueado
if (!emailUsuario) {
    alert("Debes iniciar sesion primero.");
    window.location.href = "index.html"; // Redirigir al inicio de sesion si no esta logueado
}

// Obtener los datos del usuario desde localStorage
const usuario = JSON.parse(localStorage.getItem(emailUsuario));

// Mostrar el nombre del usuario en la pagina
document.getElementById('nombre_usuario').innerText = `Hola, ${usuario.nombre}`;

// Logica para cerrar sesion
document.getElementById('btn_logout').addEventListener('click', function() {
    // Limpiar sessionStorage
    sessionStorage.removeItem('usuarioLogueado');
    
    // Redirigir a la pagina de inicio de sesion
    window.location.href = "index.html";
});

// Borrar la memoria
document.getElementById('btn_reset').addEventListener('click', function() {
    localStorage.clear();
    alert("Datos reiniciados.");
    window.location.reload();  // Recargar la pagina para que los cambios se reflejen
});
