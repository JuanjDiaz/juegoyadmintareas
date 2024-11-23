class InicioSesion {
    constructor() {
        this.correo = null;
        this.contraseña = null;
    }

    agregarEventos() {
        document.getElementById("botonIniciarSesion").addEventListener("click", () => {
            this.tomarDatos();
        });

        document.getElementById("linkRegistro").addEventListener("click", (evento) => {
            evento.preventDefault();
            this.mostrarVistaRegistro();
        });
    }

    tomarDatos() {
        this.correo = document.getElementById("inputCorreoSesion").value;
        this.contraseña = document.getElementById("inputContraseñaSesion").value;
        this.validarCorreo(this.correo);
        this.validarContraseña(this.contraseña);

        if (this.correo.trim() !== "" && this.contraseña.trim() !== "") {
            this.validarCredenciales();
        }
    }

    validarCorreo(correo) {
        if (correo.trim() === "") {
            this.mostrarError("divCorreoSesion", "El campo correo no puede estar vacío.");
        } else if (!/\S+@\S+\.\S+/.test(correo)) {
            this.mostrarError("divCorreoSesion", "El correo ingresado no es válido.");
        }
    }

    validarContraseña(contraseña) {
        if (contraseña.trim() === "") {
            this.mostrarError("divContraseñaSesion", "El campo contraseña no puede estar vacío.");
        } else if (contraseña.length < 6) {
            this.mostrarError("divContraseñaSesion", "La contraseña debe tener al menos 6 caracteres.");
        }
    }

    validarCredenciales() {
        const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

        if (usuarioRegistrado && usuarioRegistrado.correo === this.correo && usuarioRegistrado.contraseña === this.contraseña) {
            this.iniciarSesionExitoso();
        } else {
            this.iniciarSesionFallido();
        }
    }

    iniciarSesionExitoso() {
        alert("Inicio de sesión exitoso. ¡Bienvenido al juego!");
        document.getElementById("divInicioSesion").classList.remove("active");
        document.getElementById("divJuego").classList.add("active");
    }

    iniciarSesionFallido() {
        alert("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
    }

    mostrarError(idDiv, mensaje) {
        const contenedor = document.getElementById(idDiv);
        const mensajesPrevios = contenedor.querySelectorAll(".mensajeError");
        mensajesPrevios.forEach((mensaje) => mensaje.remove());
        const mensajeError = document.createElement("p");
        mensajeError.classList.add("mensajeError");
        mensajeError.textContent = mensaje;
        contenedor.appendChild(mensajeError);
    }

    mostrarVistaRegistro() {
        document.getElementById("divInicioSesion").classList.remove("active");
        document.getElementById("divRegistroUsuario").classList.add("active");
    }
}

const inicioSesion = new InicioSesion();
inicioSesion.agregarEventos();