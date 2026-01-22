const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

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
    return res.send("Commande introuvable");
  }

  res.send(`
    <h2>Panier reçu</h2>
    <pre>${JSON.stringify(order, null, 2)}</pre>
  `);
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
