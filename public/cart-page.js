function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();

  const badge = document.querySelector(".badge");

  if (badge) {
    const totalQty = cart.reduce(
      (sum, item) => sum + item.qty,
      0
    );

    badge.textContent = totalQty;
  }
}

function renderCart() {
  const container = document.getElementById("cartContainer");

  const cart = getCart();

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML =
      "<p>Votre panier est vide</p>";

    updateCartBadge();

    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" width="70" alt="image">

      <div>
        <b>${item.name}</b><br><br>

        type :
        <small>${item.category}</small><br>

        Prix :
        <small>
          ${item.price}$ × ${item.qty}
        </small><br>

        Taille :
        <small>${item.size ?? "-"}</small><br>

        Couleur :
        <small>${item.color ?? "-"}</small><br>

        Lieux de livraison :
        <strong>
          ${item.ville ?? "Lieu de livraison manquant"}
        </strong>
      </div>

      <span onclick="removeItem(${index})">
        ✕
      </span>
    `;

    container.appendChild(div);
  });

  container.innerHTML += `
    <h3 class="total">
      Total : ${total}$
    </h3>
  `;

  updateCartBadge();
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

  const btn = document.querySelector(
    ".send-whatsapp"
  );

  if (btn) {
    btn.addEventListener(
      "click",
      sendCartToAdmin
    );
  }
});

async function sendCartToAdmin() {
  const cart = getCart();

  if (!cart || cart.length === 0) {
    alert("Votre panier est vide");
    return;
  }

  try {
    const phone = "243986007232";

    const serverUrl =
      "https://mydressingbyamida.onrender.com";

    // Create order
    const response = await fetch(
      `${serverUrl}/create-order`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ cart }),
      }
    );

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    const orderLink =
      `${serverUrl}/order/${data.orderId}`;

    const message =
      "🛍️ Nouvelle commande My Dressing by Amida\n\n" +
      "Voir le panier 👇\n\n" +
      orderLink;

    // IMPORTANT:
    // Use api.whatsapp.com instead of wa.me
    const whatsappUrl =
      `https://api.whatsapp.com/send?phone=${phone}&text=` +
      encodeURIComponent(message);

    // Single redirect only
    window.location.href = whatsappUrl;

    // Clear cart
    localStorage.removeItem("cart");

  } catch (err) {
    console.error(err);

    alert(
      "Erreur lors de l'envoi de la commande"
    );
  }
}