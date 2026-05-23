require("dotenv").config();

console.log("GITHUB_TOKEN:", !!process.env.GITHUB_TOKEN);

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
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

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

// -------------------
// Init files
// -------------------
if (!fs.existsSync(PRODUCTS_FILE)) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify({}, null, 2));
}

if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify({}, null, 2));
}

// -------------------
// Admin middleware
// -------------------
function isAdmin(req, res, next) {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
    return res
      .status(403)
      .json({ error: "Accès refusé / you are not admin" });
  }

  next();
}

// -------------------
// Upload image to Cloudinary
// -------------------
app.post(
  "/admin/upload-image",
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "mydressing_products",
      });

      // remove temp file
      fs.unlinkSync(req.file.path);

      res.json({
        imageUrl: result.secure_url,
      });
    } catch (err) {
      console.error("Cloudinary upload error:", err);

      res.status(500).json({
        error: "Upload failed",
      });
    }
  }
);

// -------------------
// Add product
// -------------------
app.post("/admin/add-product", isAdmin, async (req, res) => {
  try {
    const product = {
  ...req.body,
  createdAt: new Date().toISOString()
};

    // Read products
    const products = JSON.parse(
      fs.readFileSync(PRODUCTS_FILE, "utf-8")
    );

    // Add product
    products[product.id] = product;

    // Save locally
    fs.writeFileSync(
      PRODUCTS_FILE,
      JSON.stringify(products, null, 2)
    );

    // -------------------
    // Push to GitHub
    // -------------------
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
        content: Buffer.from(
          JSON.stringify(products, null, 2)
        ).toString("base64"),
        sha: fileData.sha,
        branch: BRANCH,
      });

      console.log("✅ Produit ajouté et GitHub mis à jour !");
    } catch (githubError) {
      console.error("❌ GitHub update failed:", githubError);
    }

    res.json({
      success: true,
      message: "Produit ajouté avec succès",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Erreur serveur",
    });
  }
});

// -------------------
// Get products
// -------------------
app.get("/api/products", (req, res) => {
  try {
    const products = JSON.parse(
      fs.readFileSync(PRODUCTS_FILE, "utf-8")
    );

    res.json(products);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Erreur lecture produits",
    });
  }
});

// -------------------
// Delete product
// -------------------
app.delete("/admin/delete-product/:id", isAdmin, async (req, res) => {
  try {
    const productId = req.params.id;

    // Read products
    const products = JSON.parse(
      fs.readFileSync(PRODUCTS_FILE, "utf-8")
    );

    // Check product
    if (!products[productId]) {
      return res.status(404).json({
        error: "Produit introuvable",
      });
    }

    // Delete product
    delete products[productId];

    // Save locally
    fs.writeFileSync(
      PRODUCTS_FILE,
      JSON.stringify(products, null, 2)
    );

    // -------------------
    // Push to GitHub
    // -------------------
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
        message: `Suppression du produit ${productId}`,
        content: Buffer.from(
          JSON.stringify(products, null, 2)
        ).toString("base64"),
        sha: fileData.sha,
        branch: BRANCH,
      });

      console.log("✅ Produit supprimé et GitHub mis à jour !");
    } catch (githubError) {
      console.error("❌ GitHub update failed:", githubError);
    }

    res.json({
      success: true,
      message: `Produit ${productId} supprimé ✔`,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Erreur serveur",
    });
  }
});

// -------------------
// Download products.json
// -------------------
app.get("/admin/download-products", isAdmin, (req, res) => {
  res.download(PRODUCTS_FILE, "products.json", (err) => {
    if (err) {
      console.error("Erreur téléchargement:", err);
    }
  });
});

// -------------------
// Create order
// -------------------
app.post("/create-order", (req, res) => {
  try {
    const cart = req.body.cart;

    if (!cart || !Array.isArray(cart)) {
      return res.status(400).json({
        error: "Panier invalide",
      });
    }

    const orderId = Date.now().toString();

    const orders = JSON.parse(
      fs.readFileSync(ORDERS_FILE, "utf-8")
    );

    orders[orderId] = cart;

    fs.writeFileSync(
      ORDERS_FILE,
      JSON.stringify(orders, null, 2)
    );

    res.json({
      orderId,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Erreur création commande",
    });
  }
});

// -------------------
// Download orders.json
// -------------------
app.get("/admin/download-orders", isAdmin, (req, res) => {
  res.download(ORDERS_FILE, "orders.json", (err) => {
    if (err) {
      console.error("Erreur téléchargement:", err);
    }
  });
});

// -------------------
// View order
// -------------------
app.get("/order/:id", (req, res) => {
  try {
    const orders = JSON.parse(
      fs.readFileSync(ORDERS_FILE, "utf-8")
    );

    const order = orders[req.params.id];

    if (!order) {
      return res.send(`
        <h2>Commande introuvable 😢</h2>
      `);
    }

    let html = `
    <html>
    <head>
      <title>Panier</title>

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
          display: flex;
          justify-self: end;
          text-align: end;
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
          color: darkgreen;
          background-color: white;
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

        .back:hover {
          background: darkred;
        }

        a {
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .cart-item {
            flex-direction: column;
            text-align: center;
          }

          .cart-item img {
            width: 100%;
            height: auto;
            margin-bottom: 15px;
          }

          .cart-item-details {
            font-size: large;
          }

          .total {
            font-size: 1.5em;
            width: 100%;
          }

          .back {
            padding: 20px 40px;
            font-size: 1em;
          }
        }
      </style>
    </head>

    <body>

      <a
        href="https://mydressingbyamida.com"
        class="back"
      >
        Retour à la boutique
      </a>

      <h1>Récapitulatif de votre commande</h1>

      <div class="cart-container">
    `;

    let total = 0;

    order.forEach((item) => {
      total += item.price * (item.qty || 1);

      html += `
      <a href="https://mydressingbyamida.com/product.html?id=${item.id}">
        <div class="cart-item">

          <img
            src="${item.image}"
            alt="${item.name}"
          />

          <div class="cart-item-details">
            <h3>${item.name}</h3>

            <p>
              Catégorie: ${item.category}
            </p>

            <p>
              Quantité: ${item.qty}
            </p>

            <p>
              Prix: ${item.price} USD
            </p>

            <p>
              Taille: ${item.size}
            </p>

            <p>
              Couleur: ${item.color}
            </p>

            <br>

            <strong style="color: crimson;">
              Lieu de livraison: ${item.ville}
            </strong>

          </div>

        </div>
      </a>
      `;
    });

    html += `
      <div class="total">
        Total: ${total} USD
      </div>

      </div>

    </body>
    </html>
    `;

    res.send(html);
  } catch (err) {
    console.error(err);

    res.status(500).send(`
      <h2>Erreur serveur 😢</h2>
    `);
  }
});

// -------------------
// Serve home
// -------------------
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );
});

// -------------------
// Start server
// -------------------
app.listen(PORT, () => {
  console.log(`
🚀 live Serveur sur http://localhost:${PORT}
  `);
});