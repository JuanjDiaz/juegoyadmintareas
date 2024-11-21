class Juego {
    constructor() {
        this.eleccionUsuario = null;
        this.eleccionEnemigo = null;
        this.opciones = ["Piedra👊", "Papel🖐️", "Tijera✌️", "Lagarto🫳", "Spock🖖"];
    }

    iniciarJuego() {
        document.getElementById("botonPiedra").addEventListener("click", () => this.jugar("Piedra👊"));
        document.getElementById("botonPapel").addEventListener("click", () => this.jugar("Papel🖐️"));
        document.getElementById("botonTijera").addEventListener("click", () => this.jugar("Tijera✌️"));
        document.getElementById("botonLagarto").addEventListener("click", () => this.jugar("Lagarto🫳"));
        document.getElementById("botonSpock").addEventListener("click", () => this.jugar("Spock🖖"));
    }

    jugar(eleccionUsuario) {
        this.eleccionUsuario = eleccionUsuario;
        this.eleccionEnemigo = this.generarEleccionEnemigo();

        this.mostrarElecciones();
        const resultado = this.determinarGanador();
        this.mostrarResultado(resultado);
    }

    generarEleccionEnemigo() {
        const indice = Math.floor(Math.random() * this.opciones.length);
        return this.opciones[indice];
    }

    mostrarElecciones() {
        const contenedor = document.getElementById("divResultado");
        contenedor.innerHTML = `
            <p>Tu elección: ${this.eleccionUsuario}</p>
            <p>Enemigo eligió: ${this.eleccionEnemigo}</p>
        `;
    }

    determinarGanador() {
        const usuario = this.eleccionUsuario;
        const enemigo = this.eleccionEnemigo;

        if (usuario === enemigo) {
            return "Empate";
        }

        if (
            (usuario === "Piedra👊" && (enemigo === "Tijera✌️" || enemigo === "Lagarto🫳")) ||
            (usuario === "Papel🖐️" && (enemigo === "Piedra👊" || enemigo === "Spock🖖")) ||
            (usuario === "Tijera✌️" && (enemigo === "Papel🖐️" || enemigo === "Lagarto🫳")) ||
            (usuario === "Lagarto🫳" && (enemigo === "Spock🖖" || enemigo === "Papel🖐️")) ||
            (usuario === "Spock🖖" && (enemigo === "Piedra👊" || enemigo === "Tijera✌️"))
        ) {
            return "Ganaste";
        }

        return "Perdiste";
    }

    mostrarResultado(resultado) {
        const contenedor = document.getElementById("divResultado");
        const parrafoResultado = document.createElement("p");
        parrafoResultado.textContent = `Resultado: ${resultado}`;
        parrafoResultado.classList.add("parrafoResultado");

        contenedor.appendChild(parrafoResultado);
    }
}

const juego = new Juego();
juego.iniciarJuego();