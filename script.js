function mostrarMensaje(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = `alert alert-${tipo} mt-3`;
    elemento.classList.remove("d-none");
}

async function validarLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const mensaje = document.getElementById("login-mensaje");
    const btnLogin = document.getElementById("btn-login");

    if (email === "" || password === "") {
        mostrarMensaje(mensaje, "Por favor completa ambos campos.", "danger");
        return;
    }

    btnLogin.disabled = true;
    try {
        const respuesta = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mostrarMensaje(mensaje, datos.message || "Usuario o contraseña incorrectos.", "danger");
            return;
        }

        sessionStorage.setItem("usuario", JSON.stringify(datos.user));

        mostrarMensaje(mensaje, "Inicio de sesión exitoso. Redirigiendo...", "success");
        setTimeout(() => {
            window.location.href = "profile.html";
        }, 1000);
    } catch (error) {
        mostrarMensaje(
            mensaje,
            "No se pudo conectar con la REST-API. ¿Está corriendo en " + API_BASE_URL + "?",
            "danger",
        );
    } finally {
        btnLogin.disabled = false;
    }
}

async function registrarUsuario(event) {
    event.preventDefault();

    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const mensaje = document.getElementById("register-mensaje");
    const btnRegister = document.getElementById("btn-register");

    if (name === "" || email === "" || password === "") {
        mostrarMensaje(mensaje, "Completa nombre, correo y contraseña.", "danger");
        return;
    }

    btnRegister.disabled = true;
    try {
        const respuesta = await fetch(`${API_BASE_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mostrarMensaje(mensaje, datos.message || "No se pudo crear la cuenta.", "danger");
            return;
        }

        mostrarMensaje(mensaje, "Cuenta creada. Ahora inicia sesión arriba.", "success");
        event.target.reset();
    } catch (error) {
        mostrarMensaje(
            mensaje,
            "No se pudo conectar con la REST-API. ¿Está corriendo en " + API_BASE_URL + "?",
            "danger",
        );
    } finally {
        btnRegister.disabled = false;
    }
}

function inicializarLogin() {
    const form = document.getElementById("login-form");
    if (form) {
        form.addEventListener("submit", validarLogin);
    }
}

function inicializarRegistro() {
    const form = document.getElementById("register-form");
    if (form) {
        form.addEventListener("submit", registrarUsuario);
    }
}

function inicializarPerfil() {
    const contenedor = document.getElementById("perfil-contenido");
    if (!contenedor) return;

    const datosUsuario = sessionStorage.getItem("usuario");
    const mensaje = document.getElementById("perfil-mensaje");

    if (!datosUsuario) {
        mostrarMensaje(mensaje, "Debes iniciar sesión para ver tu perfil. Redirigiendo...", "warning");
        contenedor.classList.add("d-none");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
        return;
    }

    const usuario = JSON.parse(datosUsuario);
    document.getElementById("profile-name").textContent = usuario.name;
    document.getElementById("profile-email").textContent = usuario.email;
    document.getElementById("profile-created").textContent = usuario.created_at
        ? new Date(usuario.created_at).toLocaleDateString()
        : "N/D";

    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            sessionStorage.removeItem("usuario");
            window.location.href = "index.html";
        });
    }
}

function inicializarBotonesDemo() {
    const btnSaludo = document.getElementById("btn-saludo");
    const salidaSaludo = document.getElementById("salida-saludo");

    if (btnSaludo && salidaSaludo) {
        btnSaludo.addEventListener("click", () => {
            const hora = new Date().toLocaleTimeString();
            salidaSaludo.textContent = `¡Hola! Hiciste clic a las ${hora}.`;
        });
    }

    const btnContador = document.getElementById("btn-contador");
    const salidaContador = document.getElementById("salida-contador");
    let contador = 0;

    if (btnContador && salidaContador) {
        btnContador.addEventListener("click", () => {
            contador++;
            salidaContador.textContent = `Has hecho clic ${contador} vez(ces).`;
        });
    }
}

function inicializarRadioButtons() {
    const radios = document.querySelectorAll('input[name="contacto"]');
    const campoEmail = document.getElementById("campo-email");
    const campoTelefono = document.getElementById("campo-telefono");

    if (radios.length === 0) return; 

    radios.forEach((radio) => {
        radio.addEventListener("change", () => {
            campoEmail.classList.add("d-none");
            campoTelefono.classList.add("d-none");

            if (radio.value === "email" && radio.checked) {
                campoEmail.classList.remove("d-none");
            } else if (radio.value === "telefono" && radio.checked) {
                campoTelefono.classList.remove("d-none");
            }
        });
    });
}

function inicializarDropdownsPaisRegion() {
    const selectPais = document.getElementById("select-pais");
    const selectRegion = document.getElementById("select-region");

    if (!selectPais || typeof countryRegionData === "undefined") return;

    countryRegionData.forEach((pais, index) => {
        const option = document.createElement("option");
        option.value = index; 
        option.textContent = pais.countryName;
        selectPais.appendChild(option);
    });

    selectPais.addEventListener("change", () => {
        selectRegion.innerHTML = "";

        const indice = selectPais.value;

        if (indice === "") {
            selectRegion.innerHTML = '<option value="">Primero selecciona un país...</option>';
            selectRegion.disabled = true;
            return;
        }

        const pais = countryRegionData[indice];
        const regiones = pais.regions || [];

        if (regiones.length === 0) {
            selectRegion.innerHTML = '<option value="">Este país no tiene regiones registradas</option>';
            selectRegion.disabled = true;
            return;
        }

        selectRegion.innerHTML = '<option value="">Selecciona una región...</option>';
        regiones.forEach((region) => {
            const option = document.createElement("option");
            option.value = region.shortCode;
            option.textContent = region.name;
            selectRegion.appendChild(option);
        });

        selectRegion.disabled = false;
    });
}

function inicializarCheckboxes() {
    const check1 = document.getElementById("check-terminos");
    const check2 = document.getElementById("check-privacidad");
    const btnEnviar = document.getElementById("btn-enviar");

    if (!check1 || !check2 || !btnEnviar) return;

    function actualizarBoton() {
        btnEnviar.disabled = !(check1.checked && check2.checked);
    }

    check1.addEventListener("change", actualizarBoton);
    check2.addEventListener("change", actualizarBoton);
}

function inicializarEnvioFormulario() {
    const form = document.getElementById("practica-form");
    const mensaje = document.getElementById("form-mensaje");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        mensaje.textContent = "¡Formulario enviado correctamente!";
        mensaje.className = "alert alert-success mt-3";
        mensaje.classList.remove("d-none");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarLogin();
    inicializarRegistro();
    inicializarPerfil();
    inicializarBotonesDemo();
    inicializarRadioButtons();
    inicializarDropdownsPaisRegion();
    inicializarCheckboxes();
    inicializarEnvioFormulario();
});