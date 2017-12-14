// materialize init
$(document).ready(function() {
  $("select").material_select();
});

// object for storing and handling the party data
const party = {
  guests: [],

  addGuest(event) {
    // stop refresh page on button submit
    event.preventDefault();
    // Fetch all input values from form and put them into variables
    const inputs = document.querySelectorAll("input");
    [first, last, eMail, item, plusOne, plusOneName] = inputs;
    // create guest object
    const guest = {
      firstName: first.value,
      lastName: last.value,
      email: eMail.value,
      bringItem: item.value,
      plusOne: plusOneName.value
    };
    // check for required values
    if (!!guest.firstName && !!guest.lastName && !!guest.bringItem) {
      // add guest to array if all required values are filled
      this.guests.push(guest);
      this.storeGuests();
      ui.displayGuests();
    }
  },

  // delete guest at position of the ID
  deleteGuest(guestID) {
    this.guests.splice(guestID, 1);
    this.storeGuests();
    ui.displayGuests();
  },

  // save guest data in local storage
  storeGuests() {
    localStorage.setItem("guests", JSON.stringify(this.guests));
  },
  // load guest data from local storage
  loadGuests() {
    this.guests = JSON.parse(localStorage.getItem("guests") || "[]");
    ui.displayGuests();
  }
};

const ui = {
  // renders the table with the guest from the guests array
  displayGuests() {
    const tableBody = document.querySelector("tbody");
    // clear table
    tableBody.innerHTML = "";
    // add one row for each guest in the guests array
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
    // event listener for delete button
    table.addEventListener("click", e => {
      const elementClicked = e.target;
      if (elementClicked.id === "delete") {
        // getting the correct element to delete
        const guestID = elementClicked.parentElement.parentElement.parentElement.id;
        party.deleteGuest(guestID);
      }
      e.preventDefault();
    });
    // event listener for plusOne button
    const plusOne = document.querySelector("#bringOne");
    plusOne.addEventListener("click", () => {
      const plusOneName = document.querySelector(".plusOneDiv");
      // show input field if button is checked
      plusOneName.classList.toggle("active");
    });
  }
};

// start event listeners on page load
ui.setupEventListener();
party.loadGuests();
