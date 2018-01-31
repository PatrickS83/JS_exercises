class ShoppingCart {
  constructor() {
    // the shopping cart array expects objects
    this.items = [];
  }

  // add clicked item to shoppingcart
  addItem(foodItem = {}) {
    const shoppingCartContent = this.items;
    shoppingCartContent.push(foodItem);
    this.calculatePriceTotal();
    ui.displayItemCount(shoppingCartContent);
    ui.displayCartContent(shoppingCartContent);
  }

  // delete item from shoppingcart
  deleteItem(itemID) {
    const shoppingCartContent = this.items;
    shoppingCartContent.splice(itemID, 1);
    this.calculatePriceTotal();
    ui.displayItemCount(shoppingCartContent);
    ui.displayCartContent(shoppingCartContent);
  }

  // calculates total price of all items in cart without shipping cost
  calculatePriceTotal() {
    const totalCost = this.items.reduce((total, item) => total + Number(item.price * item.quantity), 0);
    ui.displayCost(totalCost);
  }
}


// UI class handles the browser display
class UI {
  constructor() {
    this.elements = {
      itemCount: document.querySelector('#item_count'),
      priceTotal: document.querySelector('#price_total'),
      cartOverview: document.querySelector('.cart_overview'),
    };
  }

  // displays total cost of all items in shopping cart
  displayCost(totalCost) {
    this.elements.priceTotal.innerHTML = totalCost.toFixed(2);
  }

  // displays the number of items in shopping cart
  displayItemCount(cartContent = []) {
    this.elements.itemCount.innerHTML = cartContent.length;
  }

  // displays the names of all items in the shopping cart in a list
  displayCartContent(cartContent = []) {
    const cartList = this.elements.cartOverview;
    cartList.innerHTML = '';
    cartContent.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} x${item.quantity}  <i class="fa fa-trash-o" aria-hidden="true"></i>`;
      li.id = index;
      cartList.appendChild(li);
    });
  }
}

// handles events and clicks in browser
class Controller {
  constructor() {
    Controller.setupEventlistener();
  }

  static setupEventlistener() {
    const foodList = document.querySelector('.food_list');
    const cartOverview = document.querySelector('.cart_overview');
    // listens to clicks on items in the shop
    foodList.addEventListener('click', this.handleItemClick);
    // listens to clicks in shopping cart list
    cartOverview.addEventListener('click', this.handleShoppingCartDelete);
  }

  // receives event of clicked Item and store information as an object
  static handleItemClick(clickedItem) {
    const quantity = clickedItem.target.parentElement.previousSibling.value || 1;
    const itemToAdd = clickedItem.target.parentElement.parentElement;
    if (itemToAdd.nodeName === 'LI') {
      const item = {
        name: itemToAdd.innerText,
        price: itemToAdd.dataset.price,
        quantity,
        shippingCost: itemToAdd.dataset.shippingCosts,
        deliveryTime: itemToAdd.dataset.deliveryTime
      };
      shoppingCart.addItem(item);
    }
  }

  // receives event of clicked item in shopping cart
  static handleShoppingCartDelete(clickedItem) {
    const elementClicked = clickedItem.target;
    if (elementClicked.nodeName === 'I') {
      shoppingCart.deleteItem(elementClicked.parentElement.id);
    }
  }
}

// initialization
const ui = new UI();
const shoppingCart = new ShoppingCart();
const controller = new Controller();

