document.addEventListener("DOMContentLoaded", () => {

  // 0. Show total stock
  const messageBox = document.getElementById("trieMessage");
  const pTrie = document.getElementById("pTrie");

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

  const allProducts = document.querySelectorAll(".product");

  messageBox.textContent = `Total : ${allProducts.length} articles disponibles`;

  // Helpers
  function countVisible(catName) {
    return Array.from(categories[catName] || []).filter(el => el.style.display !== "none").length;
  }

  function updateBoxCounts() {
    Object.keys(boxes).forEach(name => {
      const box = boxes[name];
      if (!box) return;

      const visibleCount = countVisible(name);

      let badge = box.querySelector(".count");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "count";
        box.appendChild(badge);
      }

      badge.textContent = visibleCount;
      badge.style.background = visibleCount === 0 ? "#b00020" : "#111";
      box.style.opacity = visibleCount === 0 ? "0.3" : "1";
      box.style.cursor = visibleCount === 0 ? "not-allowed" : "pointer";
    });
  }

  function updateView() {
    const selected = Object.keys(categories).filter(name => {
      return boxes[name] && boxes[name].classList.contains("category-active");
    });

    if (selected.length === 0) {
      allProducts.forEach(p => p.style.display = "block");
      messageBox.textContent = `Total : ${allProducts.length} articles disponibles`;
      removeEmptyMessage();
      updateBoxCounts();
      return;
    }

    // show matching
    let visibleCount = 0;
    allProducts.forEach(p => {
      if (selected.some(cat => p.classList.contains(cat))) {
        p.style.display = "block";
        visibleCount++;
      }
    });

    messageBox.textContent = visibleCount > 0
      ? formatMessage(selected)
      : "Aucun article disponible";

    updateBoxCounts();
  }

  // Click logic (single handler, no duplicates)
  let lastSelectedBox = null;

  Object.keys(categories).forEach(name => {
    const box = boxes[name];
    const items = categories[name];

    if (!box) return;

    if (!items || items.length === 0) {
      box.style.opacity = "0.3";
      box.style.cursor = "not-allowed";
      box.onclick = emptyStockMessage;
      return;
    }

    box.onclick = () => {
      if (lastSelectedBox && lastSelectedBox !== box) {
        lastSelectedBox.classList.remove("category-active");
      }

      box.classList.toggle("category-active");
      lastSelectedBox = box.classList.contains("category-active") ? box : null;

      updateView();
    };
  });

  // Messages
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

  // 8. Format display message
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

    const translated = arr.map(name => namesMap[name] || name);
    const total = arr.reduce((acc, name) => acc + (categories[name]?.length || 0), 0);

    if (translated.length === 1) return `${translated[0]} seulement, ${total} articles`;
    if (translated.length === 2) return `${translated[0]} et ${translated[1]} seulement, ${total} articles`;

    return `${translated.join(", ")} seulement, ${total} articles`;
  }

  // Initial refresh
  updateBoxCounts();

});
