function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", updateCartBadge);

function updateCartBadge() {
  const cart = getCart();
  const badge = document.getElementById("cartCount");

  if (!badge) return;

  const totalQty = cart.reduce(
    (sum, item) => sum + (item.qty || 0),
    0
  );

  badge.textContent = totalQty;
  badge.style.display = totalQty > 0 ? "inline-block" : "none";
}


function addToCart(product) {
  const cart = getCart();

  const existing = cart.find(
    item =>
      item.id === product.id &&
      item.size === product.size &&
      item.color === product.color &&
      item.ville ==- product.ville 
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: Number(product.price),
      image: product.image,
      size: product.size || null,
      color: product.color || null,
      ville: product.ville || null,
      qty: 1
    });
  }

  saveCart(cart);
  updateCartBadge();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    addToCart({
      name: btn.dataset.name,
      price: btn.dataset.price,
      category: btn.dataset.category,
      image: btn.dataset.image
    });
  });
});

});
