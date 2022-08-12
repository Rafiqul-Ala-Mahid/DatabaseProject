///const { response } = require("express");

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => {
      loadHTMLTable(data["data"]);
      console.log(loadHTMLTable);
    });

  document
    .querySelector("table tbody")
    .addEventListener("click", function (event) {
      if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
      }
      if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
      }
    });

  const updateBtn = document.querySelector("#update-row-btn");
  const searchBtn = document.querySelector("#search-btn");

  searchBtn.onclick = function () {
    const searchValue = document.querySelector("#search-input").value;
    fetch("http://localhost:5000/search/" + searchValue)
      .then((response) => response.json())
      .then((data) => loadHTMLTable(data["data"]));
  };

  function deleteRowById(id) {
    fetch("http://localhost:5000/delete/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          document.location.reload();
        }
      });
  }

  function handleEditRow(id) {
    const updateSection = document.querySelector("#update-row");
    updateSection.hidden = false;
    document.querySelector("#update-row-btn").dataset.id = id;
  }

  updateBtn.onclick = function () {
    const updateAvailable = document.querySelector("#update-name-input");
    const Id = document.querySelector("#update-row-btn").dataset.id;

    fetch("http://localhost:5000/update", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: Id,
        available: updateAvailable.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // console.log("motherfucker")
          document.location.reload()
        }
      });
  };

  const addBtn = document.querySelector("#add-name-btn");

  addBtn.onclick = function () {
    console.log("clickked")
    const nameInput = document.querySelector("#name-input");
    const name = nameInput.value; 
    nameInput.value = "";

    const bookAuthor = document.querySelector("#author-name");
    const book = bookAuthor.value;
    bookAuthor.value = "";

    const publicationName = document.querySelector("#publication-name");
    const pub = publicationName.value;
    publicationName.value = "";

    const categoryName = document.querySelector("#category-name");
    const category = categoryName.value;
    categoryName.value = "";

    const availableName = document.querySelector("#available-name");
    const available = availableName.value;
    availableName.value = "";


    fetch("http://localhost:5000/insert", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name,bookAuthor:book, publicationName: pub,categoryName:category,availableName:available }),
    })
      .then((response) => response.json())
      .then((data) => insertRowIntoTable(data["data"]))
      .then((R) => {
        document.location.reload();
        document.addEventListener("DOMContentLoaded", function () {
          fetch("http://localhost:5000/getAll")
            .then((response) => response.json())
            .then((data) => insertRowIntoTable(data["data"]));
        });
      });
  };

  function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector("table tbody");
    const isTableData = table.querySelector(".no-data");

    let tableHtml = "<tr>";

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === "dateAdded") {
          data[key] = new Date(data[key].toLocaleString());
        }
        tableHtml += `<td>${data[key]}</td>`;
      }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml = "</tr>";

    if (isTableData) {
      table.innerHTML = tableHtml;
    } else {
      const newRow = table.insertRow();
      newRow.innerHTML = tableHtml;
    }
  }

  function loadHTMLTable(data) {
    const table = document.querySelector("table tbody");

    if (data.length === 0) {
      table.innerHTML = "<tr><td class='no-data' colspan='9'>No Data</td></tr>";
      return;
    }

    let tableHtml = "";

    data.forEach(function ({ id, name,book_author,publication_name,category,available_book,date_added }) {
      tableHtml += "<tr>";
      tableHtml += `<td>${id}</td>`;
      tableHtml += `<td>${name}</td>`;
      tableHtml += `<td>${book_author}</td>`;
      tableHtml += `<td>${publication_name}</td>`;
      tableHtml += `<td>${category}</td>`;
      tableHtml += `<td>${available_book}</td>`;
      tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
      tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
      tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
      tableHtml += "</tr>";
    });
    table.innerHTML = tableHtml;
  }
});
