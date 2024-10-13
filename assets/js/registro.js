// Obtener el formulario de registro
const formularioRegistro = document.getElementById('form_registro');

formularioRegistro.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validar que los campos no esten vacios
    if (!nombre || !email || !password) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    // Guardar el usuario en localStorage
    const usuario = {
        nombre: nombre,
        email: email,
        password: password,
        puntosTotales: 0, // Inicializar con 0 puntos
        materialReciclado: 0 // Inicializar con 0 kg de material reciclado
    };

    // Verificar si el correo ya existe
    if (localStorage.getItem(email)) {
        alert("Este correo ya esta registrado.");
        return;
    }

    // Guardar en localStorage
    localStorage.setItem(email, JSON.stringify(usuario));
    alert("Usuario registrado con exito. Por favor, inicia sesion.");

    // Redirigir al inicio de sesion
    window.location.href = "index.html";
});
