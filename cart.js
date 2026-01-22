function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((t, i) => t + i.qty, 0);

  const badge = document.getElementById("cartCount");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.name === product.name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      name: product.name,
      price: Number(product.price),
      category: product.category,
      image: product.image,
      qty: 1
    });
  }

  saveCart(cart);
  updateCartBadge();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  document.querySelectorAll(".product button").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart({
        name: btn.dataset.name,
        price: btn.dataset.price,
        category: btn.dataset.category,
        image: btn.dataset.image
      });

      btn.textContent = "Ajouté ✓";
      setTimeout(() => (btn.textContent = "Ajouter au panier"), 800);
    });
  });
});
