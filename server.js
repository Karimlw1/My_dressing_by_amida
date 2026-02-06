console.log("GITHUB_TOKEN:", !!process.env.GITHUB_TOKEN);

require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { Octokit } = require("@octokit/rest");

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------
// GitHub setup
// -------------------
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const OWNER = "karimlw1";
const REPO = "My_dressing_by_amida";
const BRANCH = "main";

// -------------------
// Cloudinary setup
// -------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------
// Middleware
// -------------------
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ dest: "uploads/" });

const PRODUCTS_FILE = path.join(__dirname, "products.json");
const ORDERS_FILE = path.join(__dirname, "orders.json");

// Init files
if (!fs.existsSync(PRODUCTS_FILE)) fs.writeFileSync(PRODUCTS_FILE, JSON.stringify({}, null, 2));
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, JSON.stringify({}));

function isAdmin(req, res, next) {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: "Accès refusé" });
  }
  next();
}

// -------------------
// ROUTES
// -------------------

// Upload image to Cloudinary
app.post("/admin/upload-image", isAdmin, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "mydressing_products"
    });
    fs.unlinkSync(req.file.path); // remove temp file
    res.json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Add product
app.post("/admin/add-product", isAdmin, async (req, res) => {
  const product = req.body;

  // 1️⃣ Save locally
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf-8"));
  products[product.id] = product;
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));

  // 2️⃣ Push to GitHub
  try {
    const { data: fileData } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: "products.json",
      ref: BRANCH,
    });

    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: "products.json",
      message: `Ajout du produit ${product.name}`,
      content: Buffer.from(JSON.stringify(products, null, 2)).toString("base64"),
      sha: fileData.sha,
      branch: BRANCH,
    });

    console.log("✅ Produit ajouté et GitHub mis à jour !");
    res.json({ success: true });
  } catch (err) {
    console.error("❌ GitHub update failed:", err);
    res.json({ success: false });
  }
});

// Get products
app.get("/api/products", (req, res) => {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf-8"));
  res.json(products);
});

// Orders
app.post("/create-order", (req, res) => {
  const cart = req.body.cart;
  const orderId = Date.now().toString();
  const orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
  orders[orderId] = cart;
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  res.json({ orderId });
});

app.get("/order/:id", (req, res) => {
  const orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
  const order = orders[req.params.id];
  if (!order) return res.send("<h2>Commande introuvable 😢</h2>");

  let html = `<html><head><title>Panier</title></head><body style="font-family:sans-serif;">`;
  let total = 0;
  order.forEach(item => {
    total += item.price * (item.qty || 1);
    html += `
      <div style="margin-bottom:20px;">
        <img src="${item.image}" width="150" style="border-radius:12px;" />
        <h3>${item.name}</h3>
        <p>Catégorie: ${item.category}</p>
        <p>Quantité: ${item.qty}</p>
        <p>Prix: ${item.price} USD</p>
        <p>Taille: ${item.size}</p>
        <p>Couleur: ${item.color}</p>
        <p>Ville: ${item.ville}</p>
      </div><hr/>
    `;
  });
  html += `<h2>Total: ${total} USD 💰</h2></body></html>`;
  res.send(html);
});

// Serve home
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

// -------------------
// Start server
// -------------------
app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));
