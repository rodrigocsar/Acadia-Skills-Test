import { showToast } from "../ui.js";

export function setupAddProduct() {
  const addProductBtn = document.getElementById("addProductBtn");
  const productGrid = document.getElementById("productGrid");

  if (!addProductBtn) return;

  addProductBtn.addEventListener("click", () => {
    const productName = prompt("Digite o nome do produto:");

    if (!productName?.trim()) {
      showToast("Operação cancelada", "error");
      return;
    }

    const newCard = document.createElement("div");
    newCard.classList.add("product-card");

    newCard.innerHTML = `
      <h2 class="product-title">${productName}</h2>
      <p>Descrição do produto ${productName}</p>
      <span class="price">R$ 199,90</span>
      <button class="add-to-cart">Adicionar ao carrinho</button>
    `;

    productGrid.appendChild(newCard);
    showToast("Produto adicionado!", "success");
  });
}
