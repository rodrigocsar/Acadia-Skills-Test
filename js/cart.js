import { showToast } from "./ui.js";

let cartIcon;
let cartSidebar;
let closeCart;
let cartItems;
let cartCount;
let cartTotal;
let emptyMessage;

//    INIT

export function initCart() {
  cartIcon = document.getElementById("cartIcon");
  cartSidebar = document.getElementById("cartSidebar");
  closeCart = document.getElementById("closeCart");
  cartItems = document.getElementById("cartItems");
  cartCount = document.getElementById("cartCount");
  cartTotal = document.getElementById("cartTotal");
  emptyMessage = document.getElementById("emptyCartMessage");

  setupCartEvents();
  updateCartCount();
}

// EVENTS

function setupCartEvents() {
  cartIcon.addEventListener("click", () => {
    cartSidebar.classList.toggle("open");
  });

  closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
  });

  // Event Delegation
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      toggleCart(e.target);
    }
  });
}

/*  LOGIC OF THE SHOPPING CART */

function toggleCart(button) {
  const card = button.closest(".product-card");
  const title = card.querySelector(".product-title").textContent;

  if (!card.classList.contains("added")) {
    card.classList.add("added");
    button.textContent = "Adicionado";
    addCardToCart(card, title);
    showToast("Product removed from cart", "success");
  } else {
    card.classList.remove("added");
    button.textContent = "Add to Cart";
    removeCardFromCart(title);
    showToast("Product removed from cart", "error");
  }
}

function addCardToCart(card, title) {
  const clone = document.createElement("div");
  clone.classList.add("product-card");
  clone.setAttribute("data-title", title);

  const image = card.querySelector("img").cloneNode(true);
  const productTitle = card.querySelector(".product-title").cloneNode(true);
  const description = card.querySelector("p").cloneNode(true);
  const price = card.querySelector(".price").cloneNode(true);

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("cart-content");

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");

  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeCardFromCart(title);
    syncOriginalCardState(title);
    showToast("Product removed from cart", "error");
  });

  contentWrapper.append(productTitle, description, price, removeBtn);
  clone.append(image, contentWrapper);
  cartItems.appendChild(clone);

  updateCartCount();
}

function removeCardFromCart(title) {
  const item = cartItems.querySelector(`[data-title="${title}"]`);
  if (item) item.remove();
  updateCartCount();
}

function syncOriginalCardState(title) {
  const originalCard = [...document.querySelectorAll(".product-card")].find(
    (c) => c.querySelector(".product-title")?.textContent === title,
  );

  if (originalCard) {
    originalCard.classList.remove("added");
    const btn = originalCard.querySelector(".add-to-cart");
    if (btn) btn.textContent = "Add to Cart";
  }
}

// COUNTER & TOTAL

function updateCartCount() {
  const items = cartItems.querySelectorAll(".product-card").length;
  cartCount.textContent = items;

  if (items === 0) {
    emptyMessage.style.display = "flex";
  } else {
    emptyMessage.style.display = "none";
  }

  updateCartTotal();
}

function updateCartTotal() {
  let total = 0;

  const prices = cartItems.querySelectorAll(".price");

  prices.forEach((priceEl) => {
    const priceText = priceEl.textContent
      .replace("R$", "")
      .replace(".", "")
      .replace(",", ".")
      .trim();

    total += parseFloat(priceText);
  });

  cartTotal.textContent =
    "R$ " + total.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}
