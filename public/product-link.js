document.addEventListener("click", e => {
  const btn = e.target.closest(".details");
  if (!btn) return;

  window.location.href = `product.html?id=${btn.dataset.id}`;
});
