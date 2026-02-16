import { showToast } from "./ui.js";

const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const buttons = document.querySelectorAll(".add-to-cart");
/* ABRIR / FECHAR SIDEBAR */

cartIcon.addEventListener("click", () => {
  cartSidebar.classList.toggle("open");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});

/* BOTÃO ADICIONAR */
function toggleCart(button) {
  const card = button.closest(".product-card");
  const title = card.querySelector(".product-title").textContent;

  if (!card.classList.contains("added")) {
    card.classList.add("added");
    button.textContent = "Adicionado";
    addCardToCart(card, title);
    showToast("Produto adicionado ao carrinho", "success");
  } else {
    card.classList.remove("added");
    button.textContent = "Adicionar ao carrinho";
    removeCardFromCart(title);
  }
}

/* ADICIONAR CARD NO SIDEBAR */
function addCardToCart(card, title) {
  const clone = document.createElement("div");
  clone.classList.add("product-card");
  clone.setAttribute("data-title", title);

  const image = card.querySelector("img").cloneNode(true);
  const productTitle = card.querySelector(".product-title").cloneNode(true);
  const description = card.querySelector("p").cloneNode(true);
  const price = card.querySelector(".price").cloneNode(true); // 👈 AGORA PEGAMOS O PREÇO

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("cart-content");

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remover";
  removeBtn.classList.add("remove-btn");

  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // 👈 ISSO AQUI RESOLVE

    removeCardFromCart(title);

    const originalCard = [...document.querySelectorAll(".product-card")].find(
      (c) => c.querySelector(".product-title")?.textContent === title,
    );

    if (originalCard) {
      originalCard.classList.remove("added");
      originalCard.querySelector(".add-to-cart").textContent =
        "Adicionar ao carrinho";
    }

    showToast("Produto removido do carrinho", "error");
  });

  contentWrapper.appendChild(productTitle);
  contentWrapper.appendChild(description);
  contentWrapper.appendChild(price); // 👈 ADICIONA O PREÇO
  contentWrapper.appendChild(removeBtn);

  clone.appendChild(image);
  clone.appendChild(contentWrapper);

  cartItems.appendChild(clone);
  updateCartCount();
}

/* REMOVER DO SIDEBAR */
function removeCardFromCart(title) {
  const item = cartItems.querySelector(`[data-title="${title}"]`);
  if (item) item.remove();

  updateCartCount();
}

function updateCartCount() {
  const items = cartItems.querySelectorAll(".product-card").length;

  cartCount.textContent = items;

  const emptyMessage = document.getElementById("emptyCartMessage");

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

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    toggleCart(e.target);
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleCart(button);
  });
});
export function initCart() {}
