const nombre = "Mi Sitio Web";
let version = 1;
const activo = true;

console.log("=== Parte 1: Node.js ===");
console.log(`Proyecto: ${nombre} (versión ${version})`);

if (activo) {
    console.log("El proyecto está activo.");
} else {
    console.log("El proyecto está inactivo.");
}

function saludar(usuario) {
    return `Hola, ${usuario}. Bienvenido a ${nombre}.`;
}
console.log(saludar("Alumno"));

const tecnologias = ["HTML", "CSS", "JavaScript", "Bootstrap", "Node.js"];
console.log("Tecnologías usadas en el proyecto:");
for (let i = 0; i < tecnologias.length; i++) {
    console.log(`${i + 1}. ${tecnologias[i]}`);
}

const usuario = {
    nombre: "Nombre Apellido",
    carrera: "Ingeniería en Sistemas",
    ciudad: "Monterrey, Nuevo León"
};
console.log("Datos del usuario:", usuario);

const mayusculas = tecnologias.map(t => t.toUpperCase());
console.log("Tecnologías en mayúsculas:", mayusculas);

const conJ = tecnologias.filter(t => t.toLowerCase().includes("j"));
console.log("Tecnologías que contienen la letra 'j':", conJ);

function validarLogin(user, pass) {
    const usuarioValido = "admin";
    const passwordValido = "1234";
    return user === usuarioValido && pass === passwordValido;
}

console.log("¿Login válido con admin/1234?", validarLogin("admin", "1234"));
console.log("¿Login válido con admin/xxxx?", validarLogin("admin", "xxxx"));

console.log("=== Fin de la ejecución ===");