
// 0. Show total stock

const messageBox = document.getElementById("trieMessage");
messageBox.innerHTML = "Total :" + ` ${document.querySelectorAll('.product').length}` + " articles disponibles";


// 1. Collect product categories on the page

const categories = {
  haut: document.querySelectorAll(".haut"),
  bas: document.querySelectorAll(".bas"),
  chaussure: document.querySelectorAll(".chaussure"),
  accessoires: document.querySelectorAll(".access"),
  abaya: document.querySelectorAll(".abaya"),
  complet: document.querySelectorAll(".complet"),
  habitmuslim: document.querySelectorAll(".habitmuslim"),
  maquillage: document.querySelectorAll(".maquillage"),
  skincare: document.querySelectorAll(".skincare"),
  fragrance: document.querySelectorAll(".fragrance"),
  haircare: document.querySelectorAll(".haircare"),
  lunette: document.querySelectorAll(".Lunettes"),
  montre: document.querySelectorAll(".Montre"),
  sac: document.querySelectorAll(".Sac"),
  bracha: document.querySelectorAll(".bracha"),
  phone: document.querySelectorAll(".Phone"),

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
  lunette: document.getElementById("Lunettes"),
  montre: document.getElementById("Montre"),
  sac: document.getElementById("Sac"),
  bracha: document.getElementById("bracha"),
  phone: document.getElementById("Phone"),
};


// 3. Detect which categories exist on page

const activeCategories = Object.keys(categories).filter(name => categories[name].length > 0);



// 4. UI message areas

const pTrie = document.getElementById("pTrie");
const trieMessage = document.getElementById("trieMessage");



// 5. Attach click events

Object.keys(categories).forEach(name => {
  const catBox = boxes[name];
  const catItems = categories[name];

  if (!catBox) return;

  if (catItems.length === 0) {
    // disable visual
    catBox.style.opacity = "0.3";
    catBox.style.cursor = "not-allowed";
    catBox.onclick = emptyStockMessage;
  } else {
    catBox.onclick = () => {
      catBox.classList.toggle("category-active");
      updateView();
    };
  }
});



// 6. Update view based on selected filters

function updateView() {
  const selected = Object.keys(categories).filter(name => {
    return boxes[name] && boxes[name].classList.contains("category-active");
  });

  if (selected.length === 0) {
    showAll();
    trieMessage.textContent = "Total :" + ` ${document.querySelectorAll('.product').length}` + " articles disponibles";
    removeEmptyMessage();
    return;
  }

  // hide all first
  Object.keys(categories).forEach(name => {
    showOrHide(categories[name], false);
  });

  // reveal selected
  let anyVisible = false;
  selected.forEach(name => {
    categories[name].forEach(el => {
      el.style.display = "block";
      anyVisible = true;
    });
  });

  trieMessage.textContent = anyVisible ? formatMessage(selected) : "Aucun article disponible";
}

// select one category at a time
let lastSelectedBox = null;
Object.keys(boxes).forEach(name => {
  const box = boxes[name];
  if (!box) return;
    box.onclick = () => {
        if (lastSelectedBox && lastSelectedBox !== box) {
            lastSelectedBox.classList.remove("category-active");
        }
        box.classList.toggle("category-active");
        lastSelectedBox = box.classList.contains("category-active") ? box : null;
        updateView();
    };
});


// 7. Helper functions

function showOrHide(list, show) {
  list.forEach(el => el.style.display = show ? "block" : "none");
}

function showAll() {
  Object.keys(categories).forEach(name => {
    categories[name].forEach(el => el.style.display = "block");
  });
}

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
    haircare: "hair Care",
    lunette: "Lunettes",
    montre: "Montre",
    sac: "Sac",
    bracha: "bracelet $ chainettes",
    phone: "Phone",
  };

  const translated = arr.map(name => namesMap[name]);
  const total = arr.reduce((acc, name) => acc + categories[name].length, 0);

  if (translated.length === 1) return `${translated[0]} seulement, ${total} articles`;
  if (translated.length === 2) return `${translated[0]} et ${translated[1]} seulement, ${total} articles`;

  return `${translated.join(", ")} seulement, ${total} articles`;
}

