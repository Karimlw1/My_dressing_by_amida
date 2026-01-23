function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}



function updateCartBadge() {
  const cart = getCart();
  const badge = document.querySelector(".cart-badge"); // ton élément badge
  if (badge) {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = totalQty;
  }
}

// Appelle à chaque rendu de cart
function renderCart() {
  const container = document.getElementById("cartContainer");
  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Votre panier est vide</p>";
    updateCartBadge();
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" width="70"  alt=" image place">
      <div>
        <strong>${item.name}</strong><br>
        type :<small>${item.category}</small><br>
        Prix : <small> ${item.price}$ × ${item.qty}</small>
      </div>
      <span onclick="removeItem(${index})">✕</span>
    `;

    container.appendChild(div);
  });

  container.innerHTML += `<h3>Total : ${total}$</h3>`;
  updateCartBadge(); // met à jour badge à chaque rendu
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  
  const btn = document.querySelector(".send");
  if (btn) btn.addEventListener("click", sendCartToAdmin);
});


function sendCartToAdmin() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Votre panier est vide");
    return;
  }

  // URL publique de ton serveur Render
  const serverUrl = "https://mydressingbyamida.onrender.com";

  fetch(`${serverUrl}/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart })
  })
    .then(res => res.json())
    .then(data => {
      const orderLink = `${serverUrl}/order/${data.orderId}`;

      const phone = "256788064469";
      const whatsappLink =
        `https://wa.me/${phone}?text=` +
        encodeURIComponent(
          "🛍️ Nouvelle commande My Dressing by Amida\n\n" +
          orderLink
        );

      window.open(whatsappLink, "_blank");
    })
    .catch(() => {
      alert("Erreur lors de l'envoi de la commande");
    });
}



