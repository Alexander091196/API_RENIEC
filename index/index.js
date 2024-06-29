document.getElementById('dni').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('searchButton').addEventListener('click', function () {
    const dni = document.getElementById('dni').value;
    const resultados = document.getElementById('result');
    if (dni.length === 8) {
        obtenerData(dni);
    } else {
        resultados.innerHTML = '<p>Por favor, ingrese un DNI válido de 8 dígitos.</p>';
    }
});

function obtenerData(dni) {
    fetch(`https://apiperu.dev/api/dni/${dni}?api_token=67b2ac6b52c804b64e307b779b53369ed597c250511f725c6c3938bea5ea2535`)
        .then(response => response.json())
        .then(datos => {
            mostrarDatos(datos);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            document.getElementById('result').innerHTML = '<p>Error al obtener los datos. Por favor, intente nuevamente.</p>';
        });
}

function mostrarDatos(datos) {
    const resultados = document.getElementById('result');
    if (datos.success) {
        const info = datos.data;
        resultados.innerHTML = `
            <p><strong>DNI:</strong> ${info.dni}</p>
            <p><strong>Nombres:</strong> ${info.nombres}</p>
            <p><strong>Apellido Paterno:</strong> ${info.apellido_paterno}</p>
            <p><strong>Apellido Materno:</strong> ${info.apellido_materno}</p>
        `;
    } else {
        resultados.innerHTML = '<p>No se encontraron datos para el DNI ingresado.</p>';
    }
}

