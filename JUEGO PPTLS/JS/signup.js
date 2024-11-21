class RegistroUsuario {
    constructor() {
        this.nombre = null;
        this.correo = null;
        this.contraseña = null;
    }

    agregarEventos() {
        document.getElementById("botonRegistro").addEventListener("click", () => {
            this.tomarDatos();
        });

        document.getElementById("linkIniciarSesion").addEventListener("click", (evento) => {
            evento.preventDefault();
            this.mostrarVistaInicioSesion();
        });
    }

    tomarDatos() {
        this.nombre = document.getElementById("inputNombreRegistro").value;
        this.correo = document.getElementById("inputCorreoRegistro").value;
        this.contraseña = document.getElementById("inputContraseñaRegistro").value;

        const esNombreValido = this.validarNombre(this.nombre);
        const esCorreoValido = this.validarCorreo(this.correo);
        const esContraseñaValida = this.validarContraseña(this.contraseña);

        if (esNombreValido && esCorreoValido && esContraseñaValida) {
            this.registrarUsuario();
        }
    }

    validarNombre(nombre) {
        if (nombre.trim() === "") {
            this.mostrarError("divNombreRegistro", "El campo nombre no puede estar vacío.");
            return false;
        }
        return true;
    }

    validarCorreo(correo) {
        if (correo.trim() === "") {
            this.mostrarError("divCorreoRegistro", "El campo correo no puede estar vacío.");
            return false;
        } else if (!/\S+@\S+\.\S+/.test(correo)) {
            this.mostrarError("divCorreoRegistro", "El correo ingresado no es válido.");
            return false;
        }
        return true;
    }

    validarContraseña(contraseña) {
        if (contraseña.trim() === "") {
            this.mostrarError("divContraseñaRegistro", "El campo contraseña no puede estar vacío.");
            return false;
        } else if (contraseña.length < 6) {
            this.mostrarError("divContraseñaRegistro", "La contraseña debe tener al menos 6 caracteres.");
            return false;
        }
        return true;
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

    registrarUsuario() {
        const usuarioRegistrado = {
            nombre: this.nombre,
            correo: this.correo,
            contraseña: this.contraseña
        };

        alert("¡Registrado exitosamente!");
        this.mostrarVistaInicioSesion();
        localStorage.setItem("usuarioRegistrado", JSON.stringify(usuarioRegistrado));
    }

    mostrarVistaInicioSesion() {
        document.getElementById("divRegistroUsuario").classList.remove("active");
        document.getElementById("divInicioSesion").classList.add("active");
    }
}

const registroUsuario = new RegistroUsuario();
registroUsuario.agregarEventos();