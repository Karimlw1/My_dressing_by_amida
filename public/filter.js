// 0. Show total stock
const messageBox = document.getElementById("trieMessage");
messageBox.innerHTML = "Total : " + document.querySelectorAll(".product").length + " articles disponibles";

// 1. Collect product categories on the page
const categories = {
  haut: document.querySelectorAll(".haut"),
  bas: document.querySelectorAll(".bas"),
  chaussure: document.querySelectorAll(".chaussure"),
  accessoires: document.querySelectorAll(".accessoire"),
  abaya: document.querySelectorAll(".abaya"),
  complet: document.querySelectorAll(".complet"),
  habitmuslim: document.querySelectorAll(".habitmuslim"),
  maquillage: document.querySelectorAll(".maquillage"),
  skincare: document.querySelectorAll(".skincare"),
  fragrance: document.querySelectorAll(".fragrance"),
  haircare: document.querySelectorAll(".haircare"),
  lunette: document.querySelectorAll(".lunettes"),
  montre: document.querySelectorAll(".montre"),
  sac: document.querySelectorAll(".sac"),
  bracha: document.querySelectorAll(".bracha"),
  phone: document.querySelectorAll(".phone"),
};

// 2. Collect box buttons by ID
const boxes = {
  haut: document.getElementById("haut"),
  bas: document.getElementById("bas"),
  chaussure: document.getElementById("chaussure"),
  accessoires: document.getElementById("accessoire"),
  abaya: document.getElementById("abaya"),
  complet: document.getElementById("complet"),
  habitmuslim: document.getElementById("habitmuslim"),
  maquillage: document.getElementById("maquillage"),
  skincare: document.getElementById("skincare"),
  fragrance: document.getElementById("fragrance"),
  haircare: document.getElementById("haircare"),
  lunette: document.getElementById("lunettes"),
  montre: document.getElementById("Montre"),
  sac: document.getElementById("Sac"),
  bracha: document.getElementById("bracha"),
  phone: document.getElementById("Phone"),
};

// 3. UI message areas
const pTrie = document.getElementById("pTrie");
const trieMessage = document.getElementById("trieMessage");

// --------- Badge init (GLOBAL stock only) ---------
Object.keys(categories).forEach(name => {
  const box = boxes[name];
  if (!box) return;

  const count = categories[name].length;

  let badge = box.querySelector(".count");
  if (!badge) {
    badge = document.createElement("span");
    badge.className = "count";
    box.appendChild(badge);
  }

  badge.textContent = count;
  badge.style.background = count === 0 ? "#b00020" : "#111";

  box.style.opacity = count === 0 ? "0.3" : "1";
  box.style.cursor = count === 0 ? "not-allowed" : "pointer";
});

// --------- Core filter logic ---------

function updateView() {
  const selected = Object.keys(categories).filter(name =>
    boxes[name] && boxes[name].classList.contains("category-active")
  );

  const allProducts = document.querySelectorAll(".product");

  if (selected.length === 0) {
    allProducts.forEach(p => (p.style.display = "block"));
    trieMessage.textContent = "Total : " + allProducts.length + " articles disponibles";
    removeEmptyMessage();
    return;
  }

  allProducts.forEach(p => (p.style.display = "none"));

  let anyVisible = false;
  allProducts.forEach(p => {
    const classes = Array.from(p.classList);
    if (selected.some(cat => classes.includes(cat))) {
      p.style.display = "block";
      anyVisible = true;
    }
  });

  trieMessage.textContent = anyVisible ? formatMessage(selected) : "Aucun article disponible";
}

// --------- Events (single select) ---------

let lastSelectedBox = null;

Object.keys(categories).forEach(name => {
  const box = boxes[name];
  if (!box || categories[name].length === 0) return;

  box.onclick = () => {
    if (lastSelectedBox && lastSelectedBox !== box) {
      lastSelectedBox.classList.remove("category-active");
    }

    box.classList.toggle("category-active");
    lastSelectedBox = box.classList.contains("category-active") ? box : null;

    updateView();
  };
});

// --------- Helpers ---------

function removeEmptyMessage() {
  const oldMsg = document.getElementById("emptyStock");
  if (oldMsg) oldMsg.remove();
}

function emptyStockMessage() {
  removeEmptyMessage();
  const message = document.createElement("p");
  message.id = "emptyStock";
  message.textContent = `Aucun article disponible dans ${this.id}`;
  message.style.color = "red";
  message.style.marginTop = "10px";
  pTrie.appendChild(message);
}

function formatMessage(arr) {
  const namesMap = {
    haut: "Haut",
    bas: "Bas",
    chaussure: "Chaussures",
    accessoires: "Accessoires",
    abaya: "Abayas",
    complet: "Complets",
    habitmuslim: "Habit Muslim",
    maquillage: "Maquillage",
    skincare: "Skin Care",
    fragrance: "Parfums",
    haircare: "Hair Care",
    lunette: "Lunettes",
    montre: "Montre",
    sac: "Sac",
    bracha: "Bracelets & chainettes",
    phone: "Phone",
  };

  const translated = arr.map(n => namesMap[n] || n);
  const total = arr.reduce((acc, n) => acc + (categories[n]?.length || 0), 0);

  if (translated.length === 1) return `${translated[0]} seulement, ${total} articles`;
  if (translated.length === 2) return `${translated[0]} et ${translated[1]} seulement, ${total} articles`;

  return `${translated.join(", ")} seulement, ${total} articles`;
}
