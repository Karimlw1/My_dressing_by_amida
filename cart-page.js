function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const container = document.getElementById("cartContainer");
  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Votre panier est vide</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" width="70">
      <div>
        <strong>${item.name}</strong><br>
        <small>${item.category}</small><br>
        <small>${item.price}$ × ${item.qty}</small>
      </div>
      <span onclick="removeItem(${index})">✕</span>
    `;

    container.appendChild(div);
  });

  container.innerHTML += `<h3>Total : ${total}$</h3>`;
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);


function sendToWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) return;

  let message = "🛍️ *Commande My Dressing by Amida*%0A%0A";

  cart.forEach(item => {
    message += `• ${item.name} (${item.category}) - ${item.price} x ${item.qty}%0A`;
  });

  message += "%0A📎 *Veuillez joindre le PDF téléchargé*";
  message += "%0A%0AMerci 🙏";

  const phone = "243982932331";
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

