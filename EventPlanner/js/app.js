// materialize init
$(document).ready(function() {
  $("select").material_select();
});

const form = document.querySelector("#form"),
  inputs = document.querySelectorAll("input");

const party = {
  guests: [],

  addGuest() {}
};

const ui = {
  setupEventListener() {
    const table = document.querySelector("table");
    table.addEventListener("click", e => {
      const elementClicked = e.target;
      if (elementClicked.id === "delete") {
        console.log("yes");
      }
      e.preventDefault();
    });
  }
};

ui.setupEventListener();
