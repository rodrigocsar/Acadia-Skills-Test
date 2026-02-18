import { initAOS, refreshAOS } from "/js/ui.js";
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

  // Auxiliary function to check if a product already exists.
  function isProductDuplicate(productName) {
    const existingProducts = document.querySelectorAll(
      ".product-card .product-title",
    );
    const productNameLower = productName.toLowerCase().trim();

    for (let product of existingProducts) {
      if (product.textContent.toLowerCase().trim() === productNameLower) {
        return true;
      }
    }
    return false;
  }

  // EXTRA-LOGICAL IMPLEMENTATION OF PRODUCT REMOVAL
  const deleteModal = document.getElementById("deleteModal");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");

  let productToDelete = null;

  // delegation to work on dynamic cards
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

  confirmDelete.addEventListener("click", (e) => {
    e.preventDefault();

    if (productToDelete) {
      productToDelete.remove();
      showToast("Product removed from grid", "success");
    }

    deleteModal.style.display = "none";
    productToDelete = null;
  });

  if (!addProductBtn) return;

  // OPEN MODAL
  addProductBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // CLOSE MODAL
  cancelModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // CONFIRM
  confirmModal.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const description = descInput.value.trim();
    const price = parseFloat(priceInput.value);
    const file = imageInput.files[0];

    if (!name || !description || !price || !file) {
      showToast("Please fill in all fields", "error");
      return;
    }

    // VERIFICAÇÃO DE DUPLICIDADE
    if (isProductDuplicate(name)) {
      showToast(`Product "${name}" already exists!`, "error");

      // Opcional: destacar o produto existente
      highlightExistingProduct(name);

      return; // Interrompe o cadastro
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const imageURL = e.target.result;

      const newCard = document.createElement("div");
      newCard.classList.add("product-card");
      newCard.setAttribute("data-aos", "zoom-in");

      newCard.innerHTML = `
        <img src="${imageURL}" alt="${name}" title="Image of ${name}"loading="lazy">
        <h2 class="product-title">${name}</h2>
        <p>${description}</p>
        <span class="price">$${price.toFixed(2)}</span>

        <div class="product-actions">
          <button class="add-to-cart" title="Add to Cart">Add to Cart</button>
          <button class="delete-btn" title="Remove product from grid">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;

      productGrid.appendChild(newCard);
      modal.style.display = "none";

      refreshAOS();
      initAOS();

      showToast(`Product "${name}" added to grid!`, "success");

      // reset
      nameInput.value = "";
      descInput.value = "";
      priceInput.value = "";
      imageInput.value = "";
    };

    reader.readAsDataURL(file);
  });

  function highlightExistingProduct(productName) {
    const existingProducts = document.querySelectorAll(".product-card");
    const productNameLower = productName.toLowerCase().trim();

    existingProducts.forEach((card) => {
      const title = card
        .querySelector(".product-title")
        .textContent.toLowerCase()
        .trim();
      if (title === productNameLower) {
        // Remove highlight
        card.style.transition = "all 0.3s ease";
        card.style.boxShadow = "0 0 15px rgba(255, 0, 0, 0.5)";
        card.style.transform = "scale(1.02)";

        // Remove  2 sec
        setTimeout(() => {
          card.style.boxShadow = "";
          card.style.transform = "";
        }, 2000);
      }
    });
  }
}
