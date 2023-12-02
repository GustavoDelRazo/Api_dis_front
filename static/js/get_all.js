function getAll() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://8000-gustavodelra-apidisback-4p3t9uybpfx.ws-us106.gitpod.io/dispositivos');
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

                td_acciones.appendChild(verLink);
                td_acciones.appendChild(document.createTextNode(" | "));  // Añade un nodo de texto
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