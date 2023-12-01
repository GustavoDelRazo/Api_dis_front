function getOnlyDetail(id) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8000/dispositivos/' + encodeURIComponent(id));
    //request.open('GET', 'https://api-contactos-91f205878f2d.herokuapp.com/contactos/' + encodeURIComponent(id));
    request.send();

    request.onload = (e) => {
        if (request.status === 200) {
            const response = request.responseText;
            const dispositivo = JSON.parse(response);

            
            showDetails(dispositivo);
        } else {
            console.log("Error al obtener detalles del dispositivo.");
        }
    };
}

function showDetails(dispositivo) {
    // Actualiza el párrafo con el email actual
    document.getElementById("id").value = dispositivo.id;

    // Rellena los campos del formulario con la información del contacto
    document.getElementById("dispositivo").value = dispositivo.dispositivo;
    document.getElementById("valor").value = dispositivo.valor;
}

function editOne() {

    var id = document.getElementById("id").value
    var valor = document.getElementById("valor").value;

    
    var datos = {
        valor: valor
    };

    
    var request = new XMLHttpRequest();
    request.open('PUT', 'http://localhost:8000/dispositivos/' + encodeURIComponent(id));
    //request.open('PUT', 'https://api-contactos-91f205878f2d.herokuapp.com/dispositivos/' + encodeURIComponent(id));
    
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(datos));

    request.onload = (e) => {
        if (request.status === 200) {
            console.log("Dispositivo editado correctamente");
            
            alert("Dispositivo editado correctamente");
            window.location.href = "/";
        } else if (request.status === 500) {
            console.log("Error: no se que putas paso");
            
            alert("Error: no se que putas paso");
        } else {
            console.log("nuh uh dumbass");
        }
    };
}