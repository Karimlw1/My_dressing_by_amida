const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const ORDERS_FILE = "orders.json";

// créer le fichier s'il n'existe pas
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify({}));
}



// créer une commande
app.post("/create-order", (req, res) => {
  const cart = req.body.cart;
  const orderId = Date.now().toString();

  const orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
  orders[orderId] = cart;

  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

  res.json({ orderId });
});

// voir une commande
app.get("/order/:id", (req, res) => {
  const orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
  const order = orders[req.params.id];

  if (!order) {
    return res.send("<h2>Commande introuvable</h2>");
  }

  // Créer une vraie page HTML avec style CSS
  let html = `
    <html>
    <head>
      <title>Votre Panier</title>
      <style>
        body { font-family: Arial, sans-serif; background:#f7f7f7; padding:20px; }
        h1 { text-align:center; color:#333; }
        .cart-item { display:flex; align-items:center; background:#fff; padding:10px; margin-bottom:10px; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.1); }
        .cart-item img { width:100px; height:100px; object-fit:cover; border-radius:8px; margin-right:15px; }
        .cart-item-details { flex:1; }
        .cart-item-details h3 { margin:0; }
        .cart-item-details p { margin:5px 0; color:#555; }
        .total { text-align:right; font-weight:bold; margin-top:20px; font-size:1.2em; }
      </style>
    </head>
    <body>
      <h1>Panier reçu</h1>
  `;

  let total = 0;

  order.forEach(item => {
    total += item.price * (item.qty || 1);
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Catégorie: ${item.category}</p>
          <p>Quantité: ${item.qty}</p>
          <p>Prix: ${item.price} USD</p>
        </div>
      </div>
    `;
  });

  html += `<div class="total">Total: ${total} USD</div>`;
  html += `</body></html>`;

  res.send(html);
});


app.get("/cart", (req, res) => {
  const cart = [
    {
      name: "talon rouge maron",
      price: 150,
      category: "Femme(soulier)",
      image: "https://i.pinimg.com/1200x/4a/27/0d/4a270d9a52ff3199fb4a1e516e249a94.jpg",
      qty: 1
    }
  ];

  let html = `<div style =" width: 100% , height: max-content, background-color: darkblue "><h1 style="text-align:center;">Mon Panier</h1></div>`;
  cart.forEach(item => {
    html += `
      <div style="display:flex;align-items:center;margin:10px 0;background:#fff;padding:10px;border-radius:8px;box-shadow:0 2px 5px rgba(0,0,0,0.1);">
        <img src="${item.image}" style="width:100px;height:100px;margin-right:10px;border-radius:8px;">
        <div>
          <h3>${item.name}</h3>
          <p>Catégorie: ${item.category}</p>
          <p>Quantité: ${item.qty}</p>
          <p>Prix: ${item.price} USD</p>
        </div>
      </div>
    `;
  });

  res.send(html);
});


app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
