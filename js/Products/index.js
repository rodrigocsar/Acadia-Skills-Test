import { loadProducts } from "./loadProducts.js";
import { setupAddProduct } from "./addProduct.js";
import { setupSearch } from "./searchProducts.js";

export function initProducts() {
  loadProducts();
  setupAddProduct();
  setupSearch();
}
