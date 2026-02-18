export function showToast(message, type = "success") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "center",
    style: {
      background: type === "success" ? "#28a745" : "#dc3545",
    },
  }).showToast();
}

export function initAOS() {
  // Checks if AOS exists before initializing.
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      easing: "ease-in-out",
    });
  } else {
    console.warn("AOS library not loaded");
  }
}

export function refreshAOS() {
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
}

// THEME

export function initThemeToggle() {
  const themeDiv = document.querySelector(".theme");

  if (!themeDiv) return;

  // Verificar tema salvo no localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Evento de clique
  themeDiv.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // Aplicar novo tema
    document.documentElement.setAttribute("data-theme", newTheme);

    // Salvar no localStorage
    localStorage.setItem("theme", newTheme);

    // Mostrar toast de feedback (opcional)
    showToast(
      `${newTheme === "light" ? "Light" : "Dark"} Theme changed to ${newTheme}`,
      "success",
    );

    // Refresh AOS se necessário (opcional)
    if (typeof refreshAOS === "function") {
      setTimeout(refreshAOS, 100);
    }
  });
}
