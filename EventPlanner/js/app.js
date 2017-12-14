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
    console.log(plusOne.value);
    const guest = {
      firstName: first.value,
      lastName: last.value,
      email: (email.value = "-".repeat(10)),
      bringItem: item.value,
      plusOne: (plusOneName.value = "-".repeat(10))
    };
    if (!!guest.firstName && !!guest.lastName && !!guest.bringItem) {
      this.guests.push(guest);
      ui.displayGuests();
    }
  },

  deleteGuest(guestID) {
    this.guests.splice(guestID, 1);
    ui.displayGuests();
  }
};

const ui = {
  displayGuests() {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    party.guests.forEach((guest, index) => {
      const row = document.createElement("tr");
      row.id = index;
      row.innerHTML = `
        <td>${guest.firstName} ${guest.lastName}</td>
        <td>${guest.plusOne}</td>
        <td>${guest.email}</td>
        <td>${guest.bringItem}</td>
        <td>
          <a class="btn-floating waves-effect waves-light red">
            <i id="delete" class="material-icons">clear</i>
          </a>
        </td>
        `;
      tableBody.appendChild(row);
    });
  },

  setupEventListener() {
    const table = document.querySelector("table");
    table.addEventListener("click", e => {
      const elementClicked = e.target;
      if (elementClicked.id === "delete") {
        const guestID = elementClicked.parentElement.parentElement.parentElement.id;
        party.deleteGuest(guestID);
      }
      e.preventDefault();
    });
    const plusOne = document.querySelector("#bringOne");
    plusOne.addEventListener("click", () => {
      const plusOneName = document.querySelector(".plusOneDiv");
      plusOneName.classList.toggle("active");
    });
  }
};

ui.setupEventListener();
