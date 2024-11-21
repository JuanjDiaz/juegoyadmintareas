let listaTareasAlta = [];
let listaTareasBaja = [];
let estadoCheckboxAlta = [];
let estadoCheckboxBaja = [];

function guardarTarea() {
    let tarea = document.getElementById("tareaIngresada").value;
    let prioridadAlta = document.getElementById("selectorAlta").checked;
    let prioridadBaja = document.getElementById("selectorBaja").checked;

    if (tarea.trim() !== "") {
        if (prioridadAlta || prioridadBaja) {
            if (prioridadAlta) {
                listaTareasAlta.push(tarea);
                estadoCheckboxAlta.push(false);
            } else if (prioridadBaja) {
                listaTareasBaja.push(tarea);
                estadoCheckboxBaja.push(false);
            }
            mostrarTareas();
            document.getElementById("tareaIngresada").value = "";
        } else {
            alert("Por favor, selecciona una prioridad para la tarea");
        }
    } else {
        alert("Por favor, ingresa una tarea");
    }
}

function seleccionarUnico(id) {
    if (id == "selectorAlta") {
        document.getElementById("selectorBaja").checked = false;
    } else if (id == "selectorBaja") {
        document.getElementById("selectorAlta").checked = false;
    }
}

function mostrarTareas() {
    let contenedorAltaPrioridad = document.getElementById("contenedorAlta");
    let contenedorBajaPrioridad = document.getElementById("contenedorBaja");

    contenedorAltaPrioridad.innerHTML = "";
    contenedorBajaPrioridad.innerHTML = "";

    listaTareasAlta.forEach((tarea, index) => {
        const tareaDiv = crearElementoTarea(tarea, index, "alta");
        contenedorAltaPrioridad.appendChild(tareaDiv);
    });

    listaTareasBaja.forEach((tarea, index) => {
        const tareaDiv = crearElementoTarea(tarea, index, "baja");
        contenedorBajaPrioridad.appendChild(tareaDiv);
    });
}

function crearElementoTarea(tarea, index, prioridad) {
    const tareaDiv = document.createElement("div");
    tareaDiv.classList.add("tarea");

    const tareaTexto = document.createElement("p");
    tareaTexto.textContent = tarea;
    tareaDiv.appendChild(tareaTexto);

    const labelCheckbox = document.createElement("label");
    labelCheckbox.textContent = "Completado";
    tareaDiv.appendChild(labelCheckbox);

    const tareaCheckbox = document.createElement("input");
    tareaCheckbox.type = "checkbox";
    tareaCheckbox.classList.add("selector");
    tareaCheckbox.id = `checkbox-${prioridad}-${index}`;

    if (prioridad === "alta") {
        tareaCheckbox.checked = estadoCheckboxAlta[index];
        tareaCheckbox.onchange = () => {
            estadoCheckboxAlta[index] = tareaCheckbox.checked;
        };
    } else {
        tareaCheckbox.checked = estadoCheckboxBaja[index];
        tareaCheckbox.onchange = () => {
            estadoCheckboxBaja[index] = tareaCheckbox.checked;
        };
    }
    tareaDiv.appendChild(tareaCheckbox);

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "🗑️";
    botonEliminar.classList.add("botonEliminar");
    botonEliminar.onclick = () => eliminarTarea(index, prioridad);
    tareaDiv.appendChild(botonEliminar);

    return tareaDiv;
}

function eliminarTarea(index, prioridad) {
    if (prioridad === "alta") {
        listaTareasAlta.splice(index, 1);
        estadoCheckboxAlta.splice(index, 1);
    } else {
        listaTareasBaja.splice(index, 1);
        estadoCheckboxBaja.splice(index, 1);
    }
    mostrarTareas();
}
