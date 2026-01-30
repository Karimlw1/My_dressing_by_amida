require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Fichier pour sauvegarder les commandes si tu veux
const ORDERS_FILE = "orders.json";
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, JSON.stringify({}));

// Configurer le transporteur mail


async function sendEmailBrevo(subject, message) {
  return axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: "My Dressing by Amida",
        email: process.env.EMAIL_FROM
      },
      to: [
        {
          email: process.env.EMAIL_TO,
          name: "Admin"
        }
      ],
      subject,
      textContent: message
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );
}


// Route pour recevoir le formulaire cadeau
app.post("/gift-request", async (req, res) => {
  const { gifts, sender } = req.body;

  let message = `
🎁 NOUVELLE DEMANDE CADEAU

👤 Client :
Nom : ${sender?.name}
Téléphone : ${sender?.phone}

━━━━━━━━━━━━━━━━━━━
`;

  gifts.forEach((g, i) => {
    message += `
🎁 Cadeau ${i + 1}
👤 Pour : ${g.receiver_name}
🎯 Type : ${g.gift_type}
💰 Budget : ${g.budget}
🤝 Relation : ${g.relation}
📝 Détails : ${g.details}

━━━━━━━━━━━━━━━━━━━
`;
  });

  try {
    await sendEmailBrevo(
      "Nouvelle demande de cadeau",
      message
    );

    console.log("✅ Email envoyé via Brevo API");
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Brevo API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Email failed" });
  }
});


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
        margin-top: 40px;
      }
      .cart-item img {
        width: 300px;
        height: 350px;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 15px;
      }
      .cart-item-details {
        flex: 1;
        height: max-content;
        font-size: xx-large;
      }
      .cart-item-details h3 {
        margin: 0;
        color: darksalmon;
      }
      .cart-item-details p {
        margin: 5px 0;
        color: #555;
      }
      .total {
        text-align: right;
        font-weight: bold;
        margin-top: 50px;
        /* font-size: 1.7em; */
        color: darkgreen;
        background-color: white;
        /* width: max-content; */
        padding: 16px 30px;
        border: 1px solid rgb(240, 234, 234);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        justify-self: end;
        height: max-content;
        width: max-content;
        display: flex;
        align-items: center;
        font-size: 40px;
        border-radius: 20px;

      }
      .back {
        position: absolute;
        left: 20px;
        width: max-content;
        text-align: center;
        display: inline-block;
        text-decoration: none;
        color: white;
        background: black;
        padding: 30px 60px;
        font-weight: bolder;
        height: max-content;
        border-radius: 6px;
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
          <strong style="color: crimson;">lieu de livraison:${item.ville}</ville>
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

app.post("/send-order-email", async (req, res) => {
  const { subject, message } = req.body;

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "My Dressing by Amida",
          email: process.env.BREVO_USER
        },
        to: [
          { email: process.env.EMAIL_TO, name: "Admin" }
        ],
        subject,
        textContent: message
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Email de commande envoyé !");
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur Brevo:", err.response?.data || err.message);
    res.status(500).json({ error: "Impossible d'envoyer l'email" });
  }
});


app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
