const params = new URLSearchParams(window.location.search);
const id = params.get("id");


// const recipientName = document.getElementById("recipientName").value;

let PRODUCTS = {};

fetch("/api/products")
  .then(res => res.json())
  .then(data => {
    PRODUCTS = data;
    initProduct();
  });

function initProduct() {
  const product = PRODUCTS[id];
  if (!product) {
    alert("Produit introuvable");
    return;
  }

const optionsContainer = document.getElementById("options");
const lieuDeLIvraisonContainer = document.getElementById("lieuDeLIvraison");

if (product.options.size) {
  optionsContainer.innerHTML += `
    <label>Taille :</label>
    <select id="size">
      ${product.options.size.map(s => `<option>${s}</option>`).join("")}
    </select>
  `;
}

if (product.options.color) {
  optionsContainer.innerHTML += `
    <label>Couleur :</label>
    <select id="color">
      ${product.options.color.map(c => `<option>${c}</option>`).join("")}
    </select>
  `;
}

if (product.lieuDeLIvraison.ville) {
  lieuDeLIvraisonContainer.innerHTML += `
    <label><i class="fa fa-list-ul"> </i>
  Choisissez le lieux de livraison : <br> <br> [Kinshasa] , [Goma] , [Lubumbashi], [kampala]</label>
    <select id="ville" required>
      ${product.lieuDeLIvraison.ville.map(v => `<option value="${v}">${v}</option>`).join("")}
    </select>
  `;
}


/** 
const container = document.getElementById("materniteProducts");

PRODUCTS
  .filter(p => p.category === "maternite")
  .forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />

        <h4>${product.name}</h4>
        <p>${product.description}</p>

        <div class="price">$${product.price}</div>

        <button onclick="addToCart('${product.id}')">
          Ajouter au panier
        </button>
      </div>
    `;
  });

**/


function addToCart(product) {
  const cart = getCart();

  const existing = cart.find(
    i =>
      i.id === product.id &&
      i.size === product.size &&
      i.color === product.color &&
      i.ville === product.ville
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: Number(product.price),
      image: product.image,
      size: product.size,
      color: product.color,
      ville: product.ville,
      qty: 1
    });
  }

  saveCart(cart);
  updateCartBadge();
}


document.getElementById("name").textContent = product.name;
document.getElementById("price").textContent = product.price + "$";
const mainImage = document.getElementById("mainImage");
const thumbs = document.getElementById("thumbs");

let currentIndex = 0;
const images = product.images || [product.image]; // fallback if old products

mainImage.src = images[0];

// Thumbnails
thumbs.innerHTML = images.map((img, index) => `
  <img src="${img}" data-index="${index}" class="${index === 0 ? "active" : ""}">
`).join("");

document.querySelectorAll(".thumbs img").forEach(img => {
  img.addEventListener("click", () => {
    currentIndex = Number(img.dataset.index);
    updateImage();
  });
});

function updateImage() {
  mainImage.src = images[currentIndex];
  document.querySelectorAll(".thumbs img").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentIndex);
  });
}

document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
});

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
});

// telephone swipe

let startX = 0;
let endX = 0;

mainImage.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

mainImage.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;

  handleSwipe();
});

function handleSwipe() {
  const distance = endX - startX;

  // petite marge pour éviter les faux mouvements
  if (Math.abs(distance) < 50) return;

  if (distance < 0) {
    // swipe vers la gauche → image suivante
    currentIndex = (currentIndex + 1) % images.length;
  } else {
    // swipe vers la droite → image précédente
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  updateImage();
}


document.getElementById("category").textContent = product.category;

document.getElementById("addToCart").addEventListener("click", () => {
    const size = document.getElementById("size")?.value || null;
    const color = document.getElementById("color")?.value || null;
    const ville = document.getElementById("ville")?.value?.trim() || null;


    if (!ville || ville.length < 2) {
  alert("Veuillez choisir un lieu de livraison");
  return;
}

   addToCart({
  id: product.id,
  name: product.name,
  category: product.category,
  price: product.price,
  image: images[currentIndex],
  size,
  color,
  ville
});


  alert("Produit ajouté au panier ✔");

});


}
function isAdmin(req, res, next) {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: "Accès refusé" });
  }
  next();
}

app.post("/admin/add-product", isAdmin, (req, res) => {  });
app.post("/admin/upload-image", isAdmin, upload.single("image"), async (req, res) => { });
