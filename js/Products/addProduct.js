import { showToast } from "/js/ui.js";

export function setupAddProduct() {
  const addProductBtn = document.getElementById("addProductBtn");
  const confirmModal = document.getElementById("confirmModal");
  const cancelModal = document.getElementById("cancelModal");
  const productGrid = document.getElementById("productGrid");
  const modal = document.getElementById("productModal");

  const nameInput = document.getElementById("modalName");
  const descInput = document.getElementById("modalDescription");
  const priceInput = document.getElementById("modalPrice");
  const imageInput = document.getElementById("modalImage");

  // iMPLEMTAÇÃO EXTRA LOGICA DE REMOÇÃO DE PRODURTO

  const deleteModal = document.getElementById("deleteModal");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");

  let productToDelete = null;

  // delegação para funcionar em cards dinâmicos
  document.addEventListener("click", (e) => {
    if (e.target.closest(".delete-btn")) {
      productToDelete = e.target.closest(".product-card");
      deleteModal.style.display = "flex";
    }
  });

  cancelDelete.addEventListener("click", () => {
    deleteModal.style.display = "none";
    productToDelete = null;
  });

  //----------------//////////////

  confirmDelete.addEventListener("click", (e) => {
    e.preventDefault(); // 🔥 garante que nada estranho aconteça

    if (productToDelete) {
      productToDelete.remove();
      showToast("Product removed from grid", "success");
    }

    deleteModal.style.display = "none";
    productToDelete = null;
  });

  if (!addProductBtn) return;

  // 👇 ABRIR MODAL
  addProductBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // 👇 FECHAR MODAL
  cancelModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 👇 CONFIRMAR
  confirmModal.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const description = descInput.value.trim();
    const price = parseFloat(priceInput.value);
    const file = imageInput.files[0];

    if (!name || !description || !price || !file) {
      showToast("Please fill in all fields", "error");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const imageURL = e.target.result;

      const newCard = document.createElement("div");
      newCard.classList.add("product-card");

      newCard.innerHTML = `
  <img src="${imageURL}" alt="${name}" loading="lazy">
  <h2 class="product-title">${name}</h2>
  <p>${description}</p>
  <span class="price">$${price.toFixed(2)}</span>

  <div class="product-actions">
    <button class="add-to-cart">Add to Cart</button>
    <button class="delete-btn" title="Remove product">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>
`;

      productGrid.appendChild(newCard);
      modal.style.display = "none";

      showToast(`Product "${name}" added!`, "success");

      // reset
      nameInput.value = "";
      descInput.value = "";
      priceInput.value = "";
      imageInput.value = "";
    };

    reader.readAsDataURL(file);
  });
}
