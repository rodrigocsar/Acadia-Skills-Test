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
