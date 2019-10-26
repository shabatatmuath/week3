'use strict';

var cart = new Cart([]);

function populateForm() {


  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var option = document.createElement('option');
    option.value = Product.allProducts[i].name;
    option.textContent = Product.allProducts[i].name;
    selectElement.appendChild(option);
  }

}

function handleSubmit(event) {
  event.preventDefault();

  addSelectedItemToCart();
  cart.saveToLocalStorage();
  cart.updateCounter();
  updateCartPreview();
  

}

function addSelectedItemToCart() {
  var item = document.getElementById('items').value;
  var quantity = document.getElementById('quantity').value;
  cart.addItem(item, quantity);
}

function updateCartPreview() {
  var item = document.getElementById('items').value;
  var quantity = document.getElementById('quantity').value;
  var cartOutput = document.getElementById('cartContents');
  var itemElement = document.createElement('div');
  itemElement.textContent = quantity + ': ' + item;
  cartOutput.appendChild(itemElement);
}

var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);



populateForm();