let PRODUCTS = {};
let product = null;

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("/api/products")
  .then(res => res.json())
  .then(data => {
    PRODUCTS = data;
    initProduct();
    refreshCategoryStockUI()
  });

  function initProduct() {
  if (!id) {
    console.log("ID produit manquant dans l'URL");
    return;
  }

  product = PRODUCTS[id];

  if (!product) {
    console.log("ID demandé:", id);
    console.log("Tous les produits:", PRODUCTS);
    alert("Produit introuvable");
    return;
  }

  // Sécurité: injecter l'id si absent dans le JSON
  if (!product.id) {
    product.id = id;
  }

  renderProduct();
  
}

function renderProduct() {
  const optionsContainer = document.getElementById("options");
  const lieuDeLIvraisonContainer = document.getElementById("lieuDeLIvraison");

  if (product.options?.size) {
    optionsContainer.innerHTML += `
      <label>Cliquer pour Choisir la Taille :</label>
      <select id="size">
        ${product.options.size.map(s => `<option>${s}</option>`).join("")}
      </select>
    `;
  }

  if (product.options?.color) {
    optionsContainer.innerHTML += `
      <label>Cliquer pour Choisir la Couleur :</label>
      <select id="color">
        ${product.options.color.map(c => `<option>${c}</option>`).join("")}
      </select>
    `;
  }


  if (product.lieuDeLIvraison?.ville) {
    lieuDeLIvraisonContainer.innerHTML += `
      <label>Cliquer pour choisir le lieu de livraison :</label>
      <select id="ville" required>
        ${product.lieuDeLIvraison.ville.map(v => `<option value="${v}">${v}</option>`).join("")}
      </select>
    `;
  }

  document.getElementById("name").textContent = product.name;
  document.getElementById("price").textContent = product.price + "$";
  document.getElementById("category").textContent = product.category;

  document.getElementById("product-id").textContent = `ID: ${product.id}`;

  const mainImage = document.getElementById("mainImage");
  const thumbs = document.getElementById("thumbs");

  let currentIndex = 0;
  const images = product.images || [product.image];

  mainImage.src = images[0];

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

  // swipe mobile
  let startX = 0;

  mainImage.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  mainImage.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const distance = endX - startX;

    if (Math.abs(distance) < 50) return;

    currentIndex = distance < 0
      ? (currentIndex + 1) % images.length
      : (currentIndex - 1 + images.length) % images.length;

    updateImage();
  });

  document.getElementById("addToCart").addEventListener("click", () => {
    const size = document.getElementById("size")?.value || null;
    const color = document.getElementById("color")?.value || null;
    const ville = document.getElementById("ville")?.value?.trim() || null;

    if (!ville) {
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

