// ===============================
// 1. Get UI elements
// ===============================
const pTrie = document.getElementById("pTrie");
const trieMessage = document.getElementById("trieMessage");

// ===============================
// 2. Get category buttons
// (IDs must match HTML)
// ===============================
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
  lunette: document.getElementById("lunette"),
  montre: document.getElementById("montre"),
  sac: document.getElementById("sac"),
  bracha: document.getElementById("bracha"),
  phone: document.getElementById("phone"),
};

// ===============================
// 3. Get products by category
// (always fresh from the DOM)
// ===============================
function getCategories() {
  return {
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
}

// ===============================
// 4. Show total stock
// ===============================
function showTotalStock() {
  const totalProducts = document.querySelectorAll(".product").length;
  trieMessage.textContent = "Total : " + totalProducts + " articles disponibles";
}

// ===============================
// 5. Update products when clicking category
// ===============================
function updateView() {
  const categories = getCategories();

  // Find selected categories
  const selectedCategories = Object.keys(categories).filter(name => {
    return boxes[name] && boxes[name].classList.contains("category-active");
  });

  // Hide all products first
  Object.keys(categories).forEach(name => {
    categories[name].forEach(item => {
      item.style.display = "none";
    });
  });

  // If nothing selected, show everything
  if (selectedCategories.length === 0) {
    showAllProducts();
    showTotalStock();
    refreshCategoryStockUI()
    removeEmptyMessage();
    return;
  }

  let hasVisibleProduct = false;

  // Show only selected categories
  selectedCategories.forEach(name => {
    categories[name].forEach(item => {
      item.style.display = "block";
      hasVisibleProduct = true;
    });
  });

  trieMessage.textContent = hasVisibleProduct
    ? formatMessage(selectedCategories)
    : "Aucun article disponible";
}

// ===============================
// 6. Handle button clicks
// (only one active at a time)
// ===============================
let lastActiveBox = null;

Object.keys(boxes).forEach(name => {
  const box = boxes[name];
  if (!box) return;

  box.onclick = function () {
    if (lastActiveBox && lastActiveBox !== box) {
      lastActiveBox.classList.remove("category-active");
    }

    box.classList.toggle("category-active");

    if (box.classList.contains("category-active")) {
      lastActiveBox = box;
    } else {
      lastActiveBox = null;
    }

    updateView();
  };
});

// ===============================
// 7. Helper functions
// ===============================
function showAllProducts() {
  const categories = getCategories();
  Object.keys(categories).forEach(name => {
    categories[name].forEach(item => {
      item.style.display = "block";
    });
  });
}

function removeEmptyMessage() {
  const msg = document.getElementById("emptyStock");
  if (msg) msg.remove();
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

// ===============================
// 8. Disable empty categories
// ===============================

// ===============================
// 9. Format the message text
// ===============================
function formatMessage(selected) {
  const names = {
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
    montre: "Montres",
    sac: "Sacs",
    bracha: "Bracelets & Chaînettes",
    phone: "Téléphones",
  };

  const translatedNames = selected.map(name => names[name]);
  const categories = getCategories();

  let total = 0;
  selected.forEach(name => {
    total += categories[name].length;
  });

  if (translatedNames.length === 1) {
    return `${translatedNames[0]} seulement, ${total} articles`;
  }

  if (translatedNames.length === 2) {
    return `${translatedNames[0]} et ${translatedNames[1]} seulement, ${total} articles`;
  }

  return `${translatedNames.join(", ")} seulement, ${total} articles`;
}

document.addEventListener("DOMContentLoaded", function () {
  refreshCategoryStockUI();
  showTotalStock();
});
