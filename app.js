// if (document.readyState == "loading") {
document.addEventListener("DOMContentLoaded", initUI);
// } else {
//   initUI();
// }

function initUI() {
  // add-to-cart
  const addToCartButtons = document.querySelectorAll(".buy-item-button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", handleAddToCart);
  });
}

function handleAddToCart(event) {
  const buyItem = event.target.closest(".buy-item");
  const title = buyItem.querySelector(".buy-item-title").textContent;
  const price = buyItem.querySelector(".buy-item-price").textContent;
  const image = buyItem.querySelector(".buy-item-image").src;
  addItemToCartUI(title, price, image);
}

function addItemToCartUI(title, price, image) {
  const cartItems = document.querySelector(".cart-items");
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  const cartItemNames = document.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("Item already Added");
      return;
    }
  }

  const cartRowContent = `<div class="cart-item row justify-content-between align-items-center border py-3">
    <div class="col-2">
      <img
        class="cart-img img-thumbnail"
        src=${image}
        alt=""
      />
    </div>
    <div class="col-5">
      <p class="cart-item-title fs-5">${title}</p>
      <p class="cart-price text-secondary fs-5">${price}</p>
    </div>
    <div class="col-2"><input class="cart-quantity-input w-100" type="number" min="1" value="1"/></div>
    <div class="col-2">
      <button class="cart-remove btn btn-danger">Remove</button>
    </div>
  </div>`;

  cartRow.innerHTML = cartRowContent;
  cartItems.appendChild(cartRow);
  cartRow.querySelector(".cart-remove").addEventListener("click", removeItem);
  cartRow
    .querySelector(".cart-quantity-input")
    .addEventListener("change", handleQuantityChange);
}

function handleQuantityChange(event) {
  const input = event.target;
  if (input.value < 1) {
    input.value = 1;
  }
  updateCartTotal();
}
// remove-button
const removeItemButton = document.querySelectorAll(".cart-remove");
console.log(removeItemButton);
removeItemButton.forEach((button) => {
  button.addEventListener(click, removeItem);
});

function removeItem(event) {
  const removeCheck = confirm("Are you sure to remove?");
  if (removeCheck) {
    const btnNewClicked = event.target;
    btnNewClicked.closest(".cart-row").remove();
  }
  updateCartTotal();
}

function updateCartTotal() {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartRows = cartItemsContainer.querySelectorAll(".cart-row");
  let total = 0;

  cartRows.forEach((row) => {
    const priceEl = row.querySelector(".cart-price");
    const quantityInput = row.querySelector(".cart-quantity-input");
    const price = parseFloat(priceEl.textContent);
    const quantity = quantityInput.value;
    total = total + price * quantity;
  });
  document.querySelector(".cart-total-price").textContent = total.toFixed(2);
}
