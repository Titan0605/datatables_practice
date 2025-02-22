$(document).ready(function() {
    const table = initializeDataTable();
});

function initializeDataTable() {
    return $('#videogameTable').DataTable({
        processing: true,

        ajax: {
            url: 'http://apipractice.com/videogames',
            type: 'GET',
            dataSrc: 'data'
        },
        
        columns: [
            { data: 'id_videogame' },
            { data: 'tittle' },
            { data: 'developer' },
            { data: 'publisher' },
            { 
                data: 'release_date',
                render: function(data) {
                    return new Date(data).toLocaleDateString();
                }
            },
            { 
                data: 'price',
                render: function(data) {
                    return `$${data.toFixed(2)}`;
                }
            },
            { 
                data: 'time_to_finish',
                render: function(data) {
                    return `${data} horas`;
                }
            },
            { data: 'difficulty' },
            { 
                data: 'genders',
                render: function(data) {
                    return data.join(', ');
                }
            },
            { 
                data: 'platforms',
                render: function(data) {
                    return data.join(', ');
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    return `
                        <button onclick="editarRegistro(${row.id_videogame})" class="button">
                            Editar
                        </button>
                        <button onclick="eliminarRegistro(${row.id_videogame})" class="button">
                            Eliminar
                        </button>
                    `;
                }
            }
        ],
        // pageLength: 10,
        // order: [[0, 'desc']]
    });
}

function editarRegistro(id) {
    // Aquí tu lógica de edición
    console.log('Editando videojuego:', id);
}

function eliminarRegistro(id) {
    // if(confirm('¿Estás seguro de eliminar este videojuego?')) {
    //     fetch(`http://apipractice.com/videogames/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //             // Aquí tus headers de autenticación si son necesarios
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if(data.success) {
    //             $('#videogameTable').DataTable().ajax.reload();
    //             alert('Videojuego eliminado correctamente');
    //         } else {
    //             alert('Error al eliminar el videojuego');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         alert('Error al eliminar el videojuego');
    //     });
    // }
    console.log('Eliminando videojuego:', id);
}