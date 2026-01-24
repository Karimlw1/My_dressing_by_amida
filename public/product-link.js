document.addEventListener("click", (e) => {
  const card = e.target.closest(".product.details");
  if (!card) return;

  const id = card.dataset.id;
  if (!id) return;

  window.location.href = `product.html?id=${id}`;
});
