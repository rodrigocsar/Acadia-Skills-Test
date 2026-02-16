import { initProducts } from "./Products/index.js";
import { initCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  initProducts();
  initCart();
});
