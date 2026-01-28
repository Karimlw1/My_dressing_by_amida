const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

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

  //le HTML et style CSS de mon server 
  let html = `
    <html>
    <head>
      <title>Votre Panier</title>
      <style>
         body {
        font-family: Arial, sans-serif;
        background: #f7f7f7;
        padding: 20px;
      }
      .nav-bar {
        border-bottom: 1px solid lightgrey;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }
      h1 {
        text-align: center;
        color: #333;
        width: 80%;
      }
      .cart-item {
        display: flex;
        align-items: center;
        background: #fff;
        padding: 10px;
        height: max-content;
        margin-bottom: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .cart-item img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 15px;
      }
      .cart-item-details {
        flex: 1;
        height: max-content;
      }
      .cart-item-details h3 {
        margin: 0;
      }
      .cart-item-details p {
        margin: 5px 0;
        color: #555;
      }
      .total {
        text-align: right;
        font-weight: bold;
        margin-top: 50px;
        font-size: 1.7em;
        color: darkgreen;
        background-color: white;
        width: max-content;
        padding: 5px 10px;
        border: 1px solid rgb(240, 234, 234);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

      }
      .back {
        display: inline-block;
        text-decoration: none;
        color: white;
        background: black;
        padding: 30px 60px;
        font-weight: bolder;
        height: max-content;
        border-radius: 6px;
        height: max-content;
        display: flex;
        align-self: center;
        font-size: 15px;
        margin: 30px;
      }
      a {
        text-decoration: none;
      }
        </style>
    </head>
    <body>
     <div class="nav-bar">
       <a class="back" href="https://mydressingbyamida.onrender.com">
        ←  Retour au site
      </a>
      <h1>Panier reçu</h1>
     </div>
  `;

  let total = 0;
  
  order.forEach(item => {
    total += item.price * (item.qty || 1);
    html += `
      <a href="https://mydressingbyamida.onrender.com/product.html?id=${item.id}">
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Catégorie: ${item.category}</p>
          <p>Quantité: ${item.qty}</p>
          <p>Prix: ${item.price} USD</p>
          <p>Taille: ${item.size}</p>
          <p>Couleur: ${item.color}</p><br>
          <strong>lieu de livraison:${item.ville}</ville>
        </div>
      </div>
    </a>
    `;
  });

  html += `<div class="total">Total: ${total} USD</div>`;
  html += `</body></html>`;

  res.send(html);
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
