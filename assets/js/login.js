// Obtener el formulario de inicio de sesion
const formularioLogin = document.getElementById('form_login');

formularioLogin.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores de los campos
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validar que los campos no esten vacios
    if (!email || !password) {
        alert("Por favor, ingresa tu correo y contraseña.");
        return;
    }

    // Verificar si el usuario existe en localStorage
    const usuario = JSON.parse(localStorage.getItem(email));

    // Validar que el usuario exista y la contraseña coincida
    if (!usuario || usuario.password !== password) {
        alert("Correo o contraseña incorrectos.");
        return;
    }

    // Guardar el usuario en sessionStorage para la sesion actual
    sessionStorage.setItem('usuarioLogueado', email);

    // Confirmar que se ha guardado en sessionStorage correctamente
    const usuarioLogueado = sessionStorage.getItem('usuarioLogueado');
    console.log("Usuario logueado:", usuarioLogueado);

    // Redirigir al menu principal si todo esta correcto
    if (usuarioLogueado) {
        window.location.href = "menu.html";
    } else {
        alert("Error al iniciar sesion. Intentalo de nuevo.");
    }
});
