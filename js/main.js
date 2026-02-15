const buttons = document.querySelectorAll(".add-to-cart");
const searchInput = document.getElementById("searchInput");
const addProductBtn = document.getElementById("addProductBtn");

/*carrinho*/

const cartTotal = document.getElementById("cartTotal");

/* ====== Alternar botão e classe ====== */

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleCart(button);
  });
});

/* ====== Filtro por título ====== */

searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();

  document.querySelectorAll(".product-card").forEach((card) => {
    const title = card
      .querySelector(".product-title")
      .textContent.toLowerCase();

    if (title.includes(searchValue)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    toggleCart(e.target);
  }
});
/* ====== Criar novo card dinamicamente ====== */

const productGrid = document.getElementById("productGrid");

async function loadProducts() {
  try {
    const response = await fetch("./data/db.json");
    const data = await response.json();
    const products = data.products;

    productGrid.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h2 class="product-title">${product.title}</h2>
        <p>${product.description}</p>
        <span class="price">R$ ${product.price}</span>
        <button 
          class="add-to-cart"
          title="Adicionar ${product.title} ao carrinho"
          aria-label="Adicionar ${product.title} ao carrinho">
          Adicionar ao carrinho
        </button>
      `;

      productGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}

loadProducts();

// Carrinho

const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");

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

/* CONTADOR */
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

// Mensagem

function showToast(message, type = "success") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: type === "success" ? "#28a745" : "#dc3545",
    close: true,
    stopOnFocus: true,
  }).showToast();
}
