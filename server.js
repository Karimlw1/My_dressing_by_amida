const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "./orders.json";

function readOrders() {
return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function saveOrders(data) {
fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.post("/order", (req, res) => {
const orders = readOrders();
const id = Date.now().toString();

orders[id] = {
createdAt: new Date().toISOString(),
cart: req.body
};

saveOrders(orders);
res.json({ orderId: id });
});

app.get("/order/:id", (req, res) => {
const orders = readOrders();
const order = orders[req.params.id];

if (!order) {
return res.status(404).json({ error: "Commande introuvable" });
}

res.json(order);
});

app.listen(3000, () => {
console.log("Serveur lancé sur http://localhost:3000");
});

