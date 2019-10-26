'use strict';

var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;
function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

function renderCart() {
  loadCart();
  clearCart();
  showCart();
  cart.updateCounter();
}

function clearCart() {
  var tR = document.querySelectorAll('tbody tr');

  for (var i = 0; i <= tR.length; i++) {
    if (tR[i]) {
      tR[i].remove();
    }
  }
}

function showCart() {
  var table = document.querySelector('#cart tbody');

  for (var i in cart.items) {
    var tr = document.createElement('tr');

    var tableD = document.createElement('td');
    tableD.textContent = 'x';
    tableD.classList.add('remover');
    tableD.id = i;

    var tableQ = document.createElement('td');
    tableQ.textContent = cart.items[i].quantity;

    var tableI = document.createElement('td');
    tableI.textContent = cart.items[i].product;

    table.appendChild(tr);
    tr.appendChild(tableD);
    tr.appendChild(tableQ);
    tr.appendChild(tableI);
  }
}

function removeItemFromCart(event) {
  if (event.target.classList.contains('remover')) {
    cart.removeItem(parseInt(event.target.id));
    cart.saveToLocalStorage();
    renderCart();
  }
}

renderCart();