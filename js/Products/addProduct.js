import { showToast } from "../ui.js";

export function setupAddProduct() {
  const addProductBtn = document.getElementById("addProductBtn");
  const productGrid = document.getElementById("productGrid");

  if (!addProductBtn) return;

  // Array de imagens de produtos tecnológicos (Pexels - confiáveis)
  const techImages = [
    "https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop", // Fone
    "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop", // Smartwatch
    "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop", // Notebook
    "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop", // Mouse
    "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop", // Teclado
    "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop", // iPhone
    "https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop", // Headset
  ];

  addProductBtn.addEventListener("click", () => {
    const productName = prompt("Digite o nome do produto:");

    if (!productName?.trim()) {
      showToast("Operação cancelada", "error");
      return;
    }

    // Pega uma imagem aleatória
    const randomImage =
      techImages[Math.floor(Math.random() * techImages.length)];

    const newCard = document.createElement("div");
    newCard.classList.add("product-card");

    // Cria o card COMPLETO com imagem
    newCard.innerHTML = `
      <img src="${randomImage}" alt="${productName}" loading="lazy">
      <h2 class="product-title">${productName}</h2>
      <p>Descrição do produto ${productName}.</p>
      <span class="price">R$ 199,90</span>
      <button class="add-to-cart" title="Adicionar ${productName} ao carrinho">Adicionar ao carrinho</button>
    `;

    productGrid.appendChild(newCard);
    showToast(`Produto "${productName}" adicionado com imagem!`, "success");
  });
}
