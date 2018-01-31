const foodList = document.querySelector('.food_list');


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

  // calculates total price of all items in cart without shipping cost
  calculatePriceTotal() {
    const totalCost = this.items.reduce((total, item) => total + Number(item.price), 0);
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
    cartContent.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = item.name;
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
    // listens to clicks on items in the shop
    foodList.addEventListener('click', this.handleItemClick);
  }

  // receives event of clicked Item and store information as an object
  static handleItemClick(clickedItem) {
    const quantity = clickedItem.target.parentElement.previousSibling.value;
    const elementClicked = clickedItem.target.parentElement.parentElement;
    if (elementClicked.nodeName === 'LI') {
      const item = {
        name: elementClicked.innerText,
        price: elementClicked.dataset.price,
        quantity,
        shippingCost: elementClicked.dataset.shippingCosts,
        deliveryTime: elementClicked.dataset.deliveryTime
      };
      shoppingCart.addItem(item);
    }
  }
}

// initialization
const ui = new UI();
const shoppingCart = new ShoppingCart();
const controller = new Controller();
