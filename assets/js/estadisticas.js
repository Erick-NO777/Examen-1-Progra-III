// Obtener el usuario logueado desde sessionStorage
const emailUsuario = sessionStorage.getItem('usuarioLogueado');

// Verificar si el usuario esta logueado
if (!emailUsuario) {
    alert("Debes iniciar sesion primero.");
    window.location.href = "index.html"; // Redirigir al inicio de sesion si no esta logueado
}

// Obtener los datos del usuario desde localStorage
const usuario = JSON.parse(localStorage.getItem(emailUsuario));

// Mostrar las estadisticas personales del usuario
document.getElementById('material_reciclado_usuario').innerText = `Material reciclado: ${usuario.materialReciclado || 0} kg`;
document.getElementById('puntos_acumulados_usuario').innerText = `Puntos acumulados: ${usuario.puntosTotales}`;

// Calcular estadisticas de la comunidad
const usuarios = Object.keys(localStorage).map(function(key) {
    return JSON.parse(localStorage.getItem(key));
});

// Inicializar un objeto para almacenar la informacion de cada centro de acopio
const acopios = {
    "san_jose": { usuarios: 0, material: 0 },
    "alajuela": { usuarios: 0, material: 0 },
    "cartago": { usuarios: 0, material: 0 },
    "heredia": { usuarios: 0, material: 0 },
    "limon": { usuarios: 0, material: 0 },
    "guanacaste": { usuarios: 0, material: 0 },
    "puntarenas": { usuarios: 0, material: 0 }
};

// Sumar el numero de usuarios y el material reciclado por cada centro de acopio
usuarios.forEach(function(usuario) {
    if (usuario.acopio && acopios.hasOwnProperty(usuario.acopio)) {
        acopios[usuario.acopio].usuarios += 1;
        acopios[usuario.acopio].material += usuario.materialReciclado || 0;
    }
});

// Mostrar el total de usuarios y el material reciclado para cada acopio
document.getElementById('usuarios_san_jose').innerText = `San Jose - Usuarios: ${acopios['san_jose'].usuarios}`;
document.getElementById('material_san_jose').innerText = `Material reciclado: ${acopios['san_jose'].material.toFixed(1)} kg`;

document.getElementById('usuarios_alajuela').innerText = `Alajuela - Usuarios: ${acopios['alajuela'].usuarios}`;
document.getElementById('material_alajuela').innerText = `Material reciclado: ${acopios['alajuela'].material.toFixed(1)} kg`;

document.getElementById('usuarios_cartago').innerText = `Cartago - Usuarios: ${acopios['cartago'].usuarios}`;
document.getElementById('material_cartago').innerText = `Material reciclado: ${acopios['cartago'].material.toFixed(1)} kg`;

document.getElementById('usuarios_heredia').innerText = `Heredia - Usuarios: ${acopios['heredia'].usuarios}`;
document.getElementById('material_heredia').innerText = `Material reciclado: ${acopios['heredia'].material.toFixed(1)} kg`;

document.getElementById('usuarios_limon').innerText = `Limon - Usuarios: ${acopios['limon'].usuarios}`;
document.getElementById('material_limon').innerText = `Material reciclado: ${acopios['limon'].material.toFixed(1)} kg`;

document.getElementById('usuarios_guanacaste').innerText = `Guanacaste - Usuarios: ${acopios['guanacaste'].usuarios}`;
document.getElementById('material_guanacaste').innerText = `Material reciclado: ${acopios['guanacaste'].material.toFixed(1)} kg`;

document.getElementById('usuarios_puntarenas').innerText = `Puntarenas - Usuarios: ${acopios['puntarenas'].usuarios}`;
document.getElementById('material_puntarenas').innerText = `Material reciclado: ${acopios['puntarenas'].material.toFixed(1)} kg`;
