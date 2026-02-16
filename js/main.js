const buttons = document.querySelectorAll(".add-to-cart");
const searchInput = document.getElementById("searchInput");

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

    // Pega só os 3 primeiros produtos
    const initialProducts = products.slice(0, 3);

    // CRIA OS CARDS CORRETAMENTE
    initialProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h2 class="product-title">${product.title}</h2>
        <p>${product.description}</p>
        <span class="price">R$ ${product.price}</span>
        <button class="add-to-cart" title="Adicionar ${product.title} ao carrinho">Adicionar ao carrinho</button>
      `;

      productGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    productGrid.innerHTML = '<p class="error">Erro ao carregar produtos.</p>';
  }
}

loadProducts();

// ====== ADICIONAR NOVO PRODUTO EXEMPLO ======
// ====== ADICIONAR NOVO PRODUTO ======
// ====== ADICIONAR NOVO PRODUTO ======
const addProductBtn = document.getElementById("addProductBtn");

if (addProductBtn) {
  // REMOVE todos os listeners antigos (clonando e substituindo)
  const newButton = addProductBtn.cloneNode(true);
  addProductBtn.parentNode.replaceChild(newButton, addProductBtn);

  // Agora usa o NOVO botão
  const freshButton = document.getElementById("addProductBtn");

  freshButton.addEventListener("click", () => {
    console.log("Clique detectado no botão NOVO"); // Para debug

    const productName = prompt("Digite o nome do produto:", "Novo Produto");

    if (!productName || productName.trim() === "") {
      showToast("Operação cancelada", "error");
      return;
    }

    // Array de imagens de produtos tecnológicos
    const techImages = [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1546868871-0f936fb1c57d?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=300&h=200&fit=crop",
    ];

    const randomImage =
      techImages[Math.floor(Math.random() * techImages.length)];

    const newCard = document.createElement("div");
    newCard.classList.add("product-card");

    newCard.innerHTML = `
      <img src="${randomImage}" alt="${productName}" loading="lazy">
      <h2 class="product-title">${productName}</h2>
      <p>Descrição do produto ${productName}.</p>
      <span class="price">R$ 199,90</span>
      <button class="add-to-cart" title="Adicionar ${productName} ao carrinho">Adicionar ao carrinho</button>
    `;

    productGrid.appendChild(newCard);
    showToast(`Produto "${productName}" adicionado!`, "success");
  });
}
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
    style: {
      background: type === "success" ? "#28a745" : "#dc3545", // ← nova forma
    },
    close: true,
    stopOnFocus: true,
  }).showToast();
}
