
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}



function updateCartBadge() {
  const cart = getCart();
  const badge = document.querySelector(".badge"); // ton élément badge
  if (badge) {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = totalQty;
  }
}

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
        <b>${item.name}</b><br><br>
        type :<small>${item.category}</small><br>
        Prix : <small> ${item.price}$ × ${item.qty}</small><br>
        Taille : <small>${item.size ?? "-"}</small><br>
        Couleur : <small>${item.color ?? "-"}</small><br>
        Lieux de livraison : <strong> ${item.ville ?? "Lieu de livraison maquant"}</strong>

      </div>
      <span onclick="removeItem(${index})">✕</span>
    `;

    container.appendChild(div);
  });

  container.innerHTML += `<h3 class="total">Total : ${total}$</h3>`;
  updateCartBadge(); // met à jour badge à chaque rendu
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  updateCartBadge(); 
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  
  const btn = document.querySelector(".send-whatsapp");
  if (btn) btn.addEventListener("click", sendCartToAdmin);
});

function sendCartToAdmin() {
  const cart = getCart();
  

  if (!cart || cart.length === 0) {
    alert("Votre panier est vide");
    return;
  }

  const phone = "256788064469";

  // 1️⃣ Open a blank window (Safari allows this)
  const popup = window.open("", "_blank");

  const serverUrl = "https://mydressingbyamida.onrender.com";

  // 2️⃣ Create order
  fetch(`${serverUrl}/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart })
  })
    .then(res => {
      if (!res.ok) throw new Error("Server error");
      return res.json();
    })
    .then(data => {
      const orderLink = `${serverUrl}/order/${data.orderId}`;

      const message =
        "🛍️ Nouvelle commande My Dressing by Amida\n\n" +
        "Voir le panier 👇\n" +
        orderLink;

      const whatsappUrl =
        `https://wa.me/${phone}?text=` +
        encodeURIComponent(message);

      popup.location.href = whatsappUrl;

setTimeout(() => {
  popup.location.href =
    `https://wa.me/${phone}?text=` +
    encodeURIComponent(message);
}, 800);


      // 3️⃣ Load WhatsApp ONCE with final message
      popup.location.href = whatsappUrl;
      localStorage.removeItem("cart");
    })
    .catch(err => {
      console.error(err);
      popup.close();
      alert("Erreur lors de l'envoi de la commande");
    });
}
