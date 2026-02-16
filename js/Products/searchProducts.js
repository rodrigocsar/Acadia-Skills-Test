export function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();

    document.querySelectorAll(".product-card").forEach((card) => {
      const title = card
        .querySelector(".product-title")
        .textContent.toLowerCase();

      card.style.display = title.includes(searchValue) ? "flex" : "none";
    });
  });
}
