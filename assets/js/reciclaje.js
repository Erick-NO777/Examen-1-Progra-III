// Obtener el usuario logueado desde sessionStorage
const emailUsuario = sessionStorage.getItem('usuarioLogueado');

if (!emailUsuario) {
    alert("Debes iniciar sesion primero.");
    window.location.href = "index.html"; // Redirigir al inicio de sesion si no esta logueado
}

// Obtener los datos del usuario desde localStorage
const usuario = JSON.parse(localStorage.getItem(emailUsuario));

// Mostrar los puntos actuales del usuario al cargar la pagina
document.getElementById('puntos_usuario').innerText = `Puntos actuales: ${usuario.puntosTotales}`;

// Agregar evento al formulario de reciclaje
document.getElementById('form_reciclaje').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const materialSeleccionado = document.getElementById('material');
    const cantidadReciclada = parseFloat(document.getElementById('cantidad').value);
    const valorPorKilo = parseInt(materialSeleccionado.options[materialSeleccionado.selectedIndex].getAttribute('data-valor'));
    const centroAcopio = document.getElementById('centro').value;  // Obtener el centro de acopio seleccionado

    // Validar que se ingrese una cantidad valida
    if (isNaN(cantidadReciclada) || cantidadReciclada <= 0) {
        alert("Por favor, ingresa una cantidad valida de material reciclado.");
        return;
    }

    // Calcular los puntos obtenidos
    const puntosObtenidos = cantidadReciclada * valorPorKilo;

    // Actualizar los datos del usuario
    usuario.materialReciclado = (usuario.materialReciclado || 0) + cantidadReciclada;
    usuario.puntosTotales += puntosObtenidos;
    usuario.acopio = centroAcopio;

    // Guardar los cambios en localStorage
    localStorage.setItem(emailUsuario, JSON.stringify(usuario));

    // Actualizar los puntos actuales del usuario en la pagina
    document.getElementById('puntos_usuario').innerText = `Puntos actuales: ${usuario.puntosTotales}`;

    // Mostrar los puntos obtenidos por el reciclaje
    document.getElementById('puntos_obtenidos').innerText = `Puntos obtenidos: ${puntosObtenidos}`;

    alert("Material reciclado registrado con exito.");
});
