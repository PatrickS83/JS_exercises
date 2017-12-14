// materialize init
$(document).ready(function() {
  $("select").material_select();
});

const form = document.querySelector("#form");

const party = {
  guests: [],

  addGuest(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll("input");
    [first, last, email, item, plusOne, plusOneName] = inputs;
    const guest = {
      firstName: first.value,
      lastName: last.value,
      email: email.value,
      bringItem: item.value,
      plusOne: plusOneName.value
    };
    if (!!guest.firstName && !!guest.lastName && !!guest.bringItem) {
      this.guests.push(guest);
    }
  }
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
