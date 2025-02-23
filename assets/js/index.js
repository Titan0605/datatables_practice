$(document).ready(function () { // Function when the document is ready, do a function
  const table = initializeDataTable();
  initializeInsertForm();
});

function initializeDataTable() { //function to create and show the datatable
  return $("#videogameTable").DataTable({
    processing: true,

    ajax: {
      url: "http://apipractice.com/videogames/", // asyncornous function to make a GET to the API and get the data to show
      type: "GET",
      dataSrc: "data",
    },

    columns: [ // Specifing the keys where we want to show the data in order
      { data: "id_videogame" },
      { data: "tittle" },
      { data: "developer" },
      { data: "publisher" },
      {
        data: "release_date",
      },
      {
        data: "price",
        render: function (data) { //function to add a symbol "$" next to the value of price
          return `$${data}`;
        },
      },
      {
        data: "time_to_finish",
        render: function (data) { // function to add the text "hours" next to time_to_finish value
          return `${data} hours`;
        },
      },
      { data: "difficulty" },
      {
        data: "genders",
        render: function (data) { //function to join the values of the array genders with a ", " between them
          return data.join(", ");
        },
      },
      {
        data: "platforms",
        render: function (data) { //function to join the values of the array platforms with a ", " between them
          return data.join(", ");
        },
      },
      {
        data: null,
        render: function (data, type, row) { //function render to make the button to edit and delete in the column Actions
          return `
          <div class="d-flex justify-content-around">
            <button type="button" onclick="editGame(${row.id_videogame})" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editModal">
              <i class="fa-duotone fa-solid fa-pen text-dark"></i>
            </button>
            <button type="button" onclick="deleteGame(${row.id_videogame})" id="deleteButton" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal">
              <i class="fa-duotone fa-regular fa-trash-can "></i>
            </button>
          </div>
          `;
        },
      },
    ],
    columnDefs: [ //parameters to the datatable
      {width: "15%", target: [1,8,9]}, //modifying the width of the columns in %
      {width: "5%", target: [2,3,4,6,7]},
      {width: "1%", target: [0,5,10]},
      {
        targets: [0,4,5,6,7,10], //centering the text of some columns
        className: 'text-center',
      }
    ],
    responsive: true, //saying to the datatables to make it responsive
    //modifying the DOM of the datatables, changing the visual with classes of Bootstrap
    dom: `<"row mb-1 d-flex justify-content-between pe-3"
            <"col-auto d-flex align-items-center"l>
            <"col-auto d-flex justify-content-end gap-3 dataTables_filter_container bg-dark-subtle rounded p-2" <"mt-1"f> >
          >
          <"row mb-3"<"col-12"t>>
          <"row d-flex justify-content-between"
            <"col-auto"i>
            <"col-auto"p>
          >`,
    initComplete: function() { // and adding the button for the PUT method before the search and giving it some classes of bootstrap
        const boton = $('<button class="btn btn-success rounded" data-bs-toggle="modal" data-bs-target="#addModal"><i class="fa-solid fa-plus"></i></button>');

        $('.dataTables_filter_container').prepend(boton);
    }
  });
}

function initializeInsertForm() { //function to make the POST to the API and ADD a new Videogame
  const form = document.querySelector("#addModal form");
  
  form.addEventListener("submit", function (event) {
      event.preventDefault(); //function to prevent the form send the normal way
      
      const formData = { //taking the values in the inputs and adding them to a key
          tittle: form.querySelector("#tittle").value,
          developer: form.querySelector("#developer").value,
          publisher: form.querySelector("#publisher").value,
          release_date: form.querySelector("#release").value,
          price: parseFloat(form.querySelector("#price").value),
          duration: parseInt(form.querySelector("#duration").value),
          difficulty: parseInt(form.querySelector("#difficulties_select").value),
          genders: form.querySelector("#gender").value.split(",").map(gender => gender.trim()),
          platforms: form.querySelector("#platform").value.split(",").map(platform => platform.trim())
      };

      fetch("http://apipractice.com/videogames/", { //calling the api with the URI and specifyng the method POST
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData) //Converting to a JSON
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log("Success:", data);
          alert("Videogame added succesfully");
          $("#addModal").modal("hide");
          $("#videogameTable").DataTable().ajax.reload(); //if the videogame was added correctly the datatable will reload with any problem
      })
      .catch(error => {
          console.error("Error:", error);
          alert("An error occurred when adding the video game");
      });
  });
}

function editGame(id) {
  fetch(`http://apipractice.com/videogames/${id}`)
  .then(response => response.json())
  .then(data => {
      const videogame = data.data[0];  // Accedemos al primer objeto del array "data"

      document.querySelector("#edit_tittle").value = videogame.tittle;
      document.querySelector("#edit_developer").value = videogame.developer;
      document.querySelector("#edit_publisher").value = videogame.publisher;
      document.querySelector("#edit_release").value = videogame.release_date;
      document.querySelector("#edit_price").value = videogame.price;
      document.querySelector("#edit_duration").value = videogame.time_to_finish;
      document.querySelector("#edit_difficulties_select").value = videogame.id_difficulty;
      document.querySelector("#edit_gender").value = videogame.genders.join(", ");
      document.querySelector("#edit_platform").value = videogame.platforms.join(", ");

      document.querySelector("#editForm").dataset.id = id; // Saving the id in the Form for a future if the submit button is pressed
  })
  .catch(error => console.error("Error loading data:", error));
}

document.querySelector("#editForm").addEventListener("submit", function (event) { //listener for the editform in case that the user press a the submit button
  event.preventDefault();

  const id = this.dataset.id;

  const formData = { //taking the values in the inputs and adding them to a key
      tittle: document.querySelector("#edit_tittle").value,
      developer: document.querySelector("#edit_developer").value,
      publisher: document.querySelector("#edit_publisher").value,
      release_date: document.querySelector("#edit_release").value,
      price: parseFloat(document.querySelector("#edit_price").value),
      duration: parseInt(document.querySelector("#edit_duration").value),
      difficulty: parseInt(document.querySelector("#edit_difficulties_select").value),
      genders: document.querySelector("#edit_gender").value.split(",").map(g => g.trim()),
      platforms: document.querySelector("#edit_platform").value.split(",").map(p => p.trim())
  };

  fetch(`http://apipractice.com/videogames/${id}`, { //calling the api with the URI and specifyng the method PUT and giving an id as an argument in the URI
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
  })
  .then(response => {
      if (!response.ok) throw new Error("Error while updating");
      return response.json();
  })
  .then(() => {
      alert("Correctly updated videogame");
      $("#editModal").modal("hide");
      $("#videogameTable").DataTable().ajax.reload(); //if the videogame was edited correctly the datatable will reload with any problem
  })
  .catch(error => {
      console.error("Error:", error);
      alert("An error occurred while updating the videogame.");
  });
});

function deleteGame(id) {
  document.querySelector("#deleteModal .btn-danger").onclick = function () {
      fetch(`http://apipractice.com/videogames/${id}`, { //calling the api with the URI and specifyng the method DELETE and giving an id as an argument in the URI
          method: "DELETE",
      })
      .then(response => {
          if (!response.ok) throw new Error("Error when deleting");
          return response.json();
      })
      .then(() => {
          alert("Video game successfully removed");
          $("#deleteModal").modal("hide");
          $("#videogameTable").DataTable().ajax.reload(); //if the videogame was deleted correctly the datatable will reload with any problem
      })
      .catch(error => {
          console.error("Error:", error);
          alert("An error occurred when deleting the video game");
      });
  };
}