function getAll() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8000/dispositivos');
    // request.open('GET', 'https://api-contactos-91f205878f2d.herokuapp.com/contactos');
    request.send();

    request.onload = (e) => {
        if (request.status === 200) {
            const response = request.responseText;
            const contactos = JSON.parse(response);

            const tbody_contactos = document.getElementById("tbody_dispositivos");
            contactos.forEach((contacto) => {
                var tr = document.createElement("tr");
                var td_id = document.createElement("td");
                var td_dispositivo = document.createElement("td");
                var td_valor = document.createElement("td");
                var td_acciones = document.createElement("td");

                td_id.innerHTML = contacto.id;
                td_dispositivo.innerHTML = contacto.dispositivo;
                td_valor.innerHTML = contacto.valor;

                // Enlaces de ver, editar y borrar
                var verLink = document.createElement("a");
                verLink.href = "/ver?id=" + encodeURIComponent(contacto.id);
                verLink.innerText = "Ver ";

                var editarLink = document.createElement("a");
                editarLink.href = "/editar?id=" + encodeURIComponent(contacto.id);
                editarLink.innerText = "Editar ";

                /*
                var borrarButton = document.createElement("button");
                borrarButton.innerText = "Borrar";
                borrarButton.addEventListener("click", function () {
                    deleteOne(contacto.email);
                });
                */

                td_acciones.appendChild(verLink);
                td_acciones.appendChild(editarLink);
                // td_acciones.appendChild(borrarButton);

                tr.appendChild(td_id);
                tr.appendChild(td_dispositivo);
                tr.appendChild(td_valor);
                tr.appendChild(td_acciones);

                tbody_dispositivos.appendChild(tr);
            });
        } else {
            console.log("Error al cargar los dispositivos.");
        }
    };
}

function deleteOne(id) {
    var confirmacion = confirm("¿Está seguro de eliminar este dispositivo?");
    if (confirmacion) {
        // Realizar una solicitud POST para eliminar el contacto
        var request = new XMLHttpRequest();
        request.open('DELETE', 'http://localhost:8000/dispositivos/' + encodeURIComponent(id));
        //request.open('DELETE', 'https://api-contactos-91f205878f2d.herokuapp.com/contactos/' + encodeURIComponent(id));
        request.setRequestHeader('Content-Type', 'application/json');
        request.send();

        request.onload = (e) => {
            if (request.status === 200) {
                console.log("Contacto eliminado correctamente");
                // Actualizar la tabla eliminando la fila del contacto
                deleteRow(id);
            } else {
                console.log("Error al eliminar el dispositivo.");
            }
        };
    }
}

function deleteRow(email) {
    var tbody_contactos = document.getElementById("tbody_contactos");
    var filas = tbody_contactos.getElementsByTagName("tr");
    
    // Buscar la fila que contiene el contacto con el email especificado y eliminarla
    for (var i = 0; i < filas.length; i++) {
        var celdas = filas[i].getElementsByTagName("td");
        if (celdas.length > 0 && celdas[0].innerHTML === email) {
            tbody_contactos.removeChild(filas[i]);
            break;
        }
    }
}