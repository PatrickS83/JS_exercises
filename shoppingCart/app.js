const foodList = document.querySelector('.food_list');


class ShoppingCart {
  constructor() {
    this.items = [];
    this.setupEventlistener();
  }

  setupEventlistener() {
    foodList.addEventListener('click', (e) => {
      const elementClicked = e.target;
      if (elementClicked.nodeName === 'LI') {
        const item = {
          name: elementClicked.innerHTML,
          price: elementClicked.dataset.price,
          shippingCost: elementClicked.dataset.shippingCosts,
          deliveryTime: elementClicked.dataset.deliveryTime
        };
        this.addItem(item);
      }
    });
  }

  addItem(foodItem) {
    const shoppingCartContent = this.items;
    shoppingCartContent.push(foodItem);
    this.calculatePriceTotal();
    ui.displayItemCount(shoppingCartContent);
    ui.displayCartContent(shoppingCartContent);
  }

  calculatePriceTotal() {
    const totalCost = this.items.reduce((total, item) => total + Number(item.price), 0);
    ui.displayCost(totalCost);
  }
}

class UI {
  constructor() {
    this.elements = {
      itemCount: document.querySelector('#item_count'),
      priceTotal: document.querySelector('#price_total'),
      cartOverview: document.querySelector('#cart_overview'),
    };
  }

  displayItemCount(cartContent = []) {
    this.elements.itemCount.innerHTML = cartContent.length;
  }

  displayCost(totalCost) {
    this.elements.priceTotal.innerHTML = totalCost.toFixed(2);
  }

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

const ui = new UI();
const shoppingCart = new ShoppingCart();
