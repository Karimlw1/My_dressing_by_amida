/*LOAD CART*/

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/*DISPLAY CART */

function renderCart() {
  const container = document.getElementById("cartContainer");
  const cart = getCart();

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty">Votre panier est vide</p>`;
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const priceNumber = parseFloat(item.price);
    total += priceNumber * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <small>${item.category}</small><br>
        <small>${item.price} × ${item.qty}</small>
      </div>
      <span class="remove" onclick="removeItem(${index})">✕</span>
    `;

    container.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "total";
  totalDiv.textContent = "Total : $" + total;
  container.appendChild(totalDiv);
}

/* REMOVE ITEM */

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

/*   WHATSAPP MESSAGE */

function sendToWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) return;

  let message = "🛍️ *Commande My Dressing by Amida*%0A%0A";

  cart.forEach(item => {
    message += `• ${item.name} (${item.category}) - ${item.price} × ${item.qty}%0A`;
  });

  message += `%0AMerci 🙏`;

  const phone = "243982932331"; 
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}


document.addEventListener("DOMContentLoaded", renderCart);
