import { initProducts } from "./Products/index.js";
import { initCart } from "./cart.js";
import { initThemeToggle } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  initProducts();
  initCart();
  initThemeToggle();
});
