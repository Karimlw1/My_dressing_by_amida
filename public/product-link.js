document.addEventListener("click", (e) => {
  const card = e.target.closest(".details");
  if (!card) return;

  const id = card.dataset.id;
  if (!id) return;

  window.location.href = `product.html?id=${id}`;
});
