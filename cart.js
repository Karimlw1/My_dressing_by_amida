/* 1. CART STORAGE */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* 2. UPDATE CART BADGE*/

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.qty, 0);

  const badge = document.getElementById("cartCount");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}

/*  3. ADD TO CART */

function addToCart(product) {
  const cart = getCart();

  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      category: product.category,
      qty: 1
    });
  }

  saveCart(cart);
  updateCartBadge();
}

/*4. BUTTON EVENTS */

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  const buttons = document.querySelectorAll(".product button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const product = {
        name: button.dataset.name || "Produit",
        price: button.dataset.price || "0$",
        category: button.dataset.category || "Autre"
      };

      addToCart(product);

      // petit feedback UX
      button.textContent = "Ajouté ✓";
      setTimeout(() => {
        button.textContent = "Ajouter au panier";
      }, 800);
    });
  });
});
