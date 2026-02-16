export async function loadProducts() {
  const productGrid = document.getElementById("productGrid");

  try {
    const response = await fetch("./data/db.json");
    const data = await response.json();

    productGrid.innerHTML = "";

    data.products.slice(0, 3).forEach((product) => {
      const card = createProductCard(product);
      productGrid.appendChild(card);
    });
  } catch (error) {
    productGrid.innerHTML = "<p>Erro ao carregar produtos.</p>";
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h2 class="product-title">${product.title}</h2>
    <p>${product.description}</p>
    <span class="price">R$ ${product.price}</span>
    <button class="add-to-cart">Adicionar ao carrinho</button>
  `;

  return card;
}
