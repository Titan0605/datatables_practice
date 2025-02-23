$(document).ready(function () {
  const table = initializeDataTable();
});

function initializeDataTable() {
  return $("#videogameTable").DataTable({
    processing: true,

    ajax: {
      url: "http://apipractice.com/videogames/",
      type: "GET",
      dataSrc: "data",
    },

    columns: [
      { data: "id_videogame" },
      { data: "tittle" },
      { data: "developer" },
      { data: "publisher" },
      {
        data: "release_date",
/*         render: function (data) {
          return new Date(data).toLocaleDateString();
        }, */
      },
      {
        data: "price",
        render: function (data) {
          return `$${data}`;
        },
      },
      {
        data: "time_to_finish",
        render: function (data) {
          return `${data} hours`;
        },
      },
      { data: "difficulty" },
      {
        data: "genders",
        render: function (data) {
          return data.join(", ");
        },
      },
      {
        data: "platforms",
        render: function (data) {
          return data.join(", ");
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
            <button type="button" onclick="editarRegistro(${row.id_videogame})" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editModal">
              <i class="fa-duotone fa-solid fa-pen text-dark"></i>
            </button>
            <button type="button" onclick="eliminarRegistro(${row.id_videogame})" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal">
              <i class="fa-duotone fa-regular fa-trash-can "></i>
            </button>
          `;
        },
      },
    ],
    columnDefs: [
      {width: "15%", target: [1,8,9]},
      {width: "5%", target: [2,3,4,6,7]},
      {width: "1%", target: [0,5,10]},
      {
        targets: [0,4,5,6,7,8,9,10],
        className: 'text-center',
      }
    ],
    responsive: true
    // pageLength: 10,
    // order: [[0, 'desc']]
  });
}

function editarRegistro(id) {
  // Aquí tu lógica de edición
  console.log("Editando videojuego:", id);
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
  console.log("Eliminando videojuego:", id);
}
