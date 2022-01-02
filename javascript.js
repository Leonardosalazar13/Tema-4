window.onload = function () {
    var localStorageKeyName = 'data';
    document.querySelector("#Guardar").addEventListener('click', function () {
        var nombre = document.getElementById("nombre"),
            trabajo = document.getElementById("trabajo"),
            edad = document.getElementById("edad");
    
        // Validate
        if (nombre.value.length === 0 || trabajo.value.length === 0 || !parseInt(edad.value)) return;
    
        var usuario = {
            Nombre: nombre.value,
            Trabajo: trabajo.value,
            Edad: edad.value
        };
    
        // Clean data
        nombre.value = '';
        trabajo.value = '';
        edad.value = '';
    
        // Append to my localStorage
        appendObjectToLocalStorage(usuario);
    })
    
    function appendObjectToLocalStorage(obj) {
        var usuarios = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName);
    
        if (dataInLocalStorage !== null) {
            usuarios = JSON.parse(dataInLocalStorage);
        }
    
        usuarios.push(obj);
    
        localStorage.setItem(localStorageKeyName, JSON.stringify(usuarios));
    
        loadFromLocalStorage();
    }
    
    function loadFromLocalStorage() {
        var usuarios = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName),
            gridBody = document.querySelector("#grid tbody");
    
        if (dataInLocalStorage !== null) {
            usuarios = JSON.parse(dataInLocalStorage);
        }
    
        // Draw TR from TBODY
        gridBody.innerHTML = '';
    
        usuarios.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdNombre = document.createElement("td"),
                tdTrabajo = document.createElement("td"),
                tdEdad = document.createElement("td"),
                tdRemove = document.createElement("td"),
                btnEliminar = document.createElement("button");
    
            tdNombre.innerHTML = x.Nombre;
            tdTrabajo.innerHTML = x.Trabajo;
            tdEdad.innerHTML = x.Edad;
    
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.className = 'btn btn-xs btn-danger';
            btnEliminar.addEventListener('click', function(){
                removeFromLocalStorage(i);
            });
    
            tdRemove.appendChild(btnEliminar);
    
            tr.appendChild(tdNombre);
            tr.appendChild(tdTrabajo);
            tr.appendChild(tdEdad);
            tr.appendChild(tdRemove);
    
            gridBody.appendChild(tr);
        });
    }
    
    function removeFromLocalStorage(index){
        var usuarios = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName);
    
        usuarios = JSON.parse(dataInLocalStorage);
    
        usuarios.splice(index, 1);
    
        localStorage.setItem(localStorageKeyName, JSON.stringify(usuarios));
    
        loadFromLocalStorage();
    }

}