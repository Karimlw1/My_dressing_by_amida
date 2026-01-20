/* =====================================
   CATEGORY SELECTION SYSTEM (Beginner Friendly)
   Works for both pages automatically
===================================== */
// 0. show acutal stock available
 const messageBox = document.getElementById("trieMessage");
 messageBox.innerHTML = "Total :" + [` ${document.querySelectorAll('.product').length}` + " articles disponibles" ];
/* 1. Collect categories (products) */
const categories = {
  haut: document.querySelectorAll(".haut"),
  bas: document.querySelectorAll(".bas"),
  chaussure: document.querySelectorAll(".chaussure"),
  accessoires: document.querySelectorAll(".access"),
  abaya: document.querySelectorAll(".abaya"),
  complet: document.querySelectorAll(".complet"),
  habitmuslim: document.querySelectorAll(".habitmuslim")
};

/* 2. Collect category boxes/buttons */
const boxes = {
  haut: document.getElementById("haut"),
  bas: document.getElementById("bas"),
  chaussure: document.getElementById("chaussure"),
  accessoires: document.getElementById("accessoire"),
  abaya: document.getElementById("abaya"),
  complet: document.getElementById("complet"),
  habitmuslim: document.getElementById("habitmuslim")
};

/* 3. Only use categories that exist on current page */
const activeCategories = Object.keys(categories).filter(key => categories[key].length === 0 ? false : true);

/* 4. UI message */
const pTrie = document.getElementById("pTrie");
const trieMessage = document.getElementById("trieMessage");

/* 5. Add click events only for available categories */
activeCategories.forEach(name => {
  if (boxes[name]) {
    boxes[name].onclick = () => {
      boxes[name].classList.toggle("category-active");
      updateView();
    };
  }
});

/* 6. Update products visibility and message */
function updateView() {
  const selected = activeCategories.filter(name => boxes[name].classList.contains("category-active"));

  if (selected.length === 0) {
    showAll();
    trieMessage.textContent = "Tous les articles";
    return;
  }

  pTrie.style.display = "block";
  trieMessage.textContent = formatMessage(selected);

  activeCategories.forEach(name => {
    showOrHide(categories[name], selected.includes(name));
  });
}
/*stock availability*/



function updateView() {
     const selected = activeCategories.filter(name => boxes[name].classList.contains("category-active"));
  pTrie.style.display = "block";

  if(selected.length === 0) {
    showAll();
    trieMessage.textContent = "Total :" + ` ${document.querySelectorAll('.product').length}` + " articles disponibles";
    return;
  }

  // Hide all first
  activeCategories.forEach(name => showOrHide(categories[name], false));

  let anyVisible = false;
  selected.forEach(name => {
    const list = categories[name];
    list.forEach(el => {
      el.style.display = "block";
      anyVisible = true;
    });
  });
  
  trieMessage.textContent = anyVisible ? formatMessage(selected) : "Aucun article disponible";

   const emptyMsg = document.getElementById("emptyStock");
  if (selected.length > 0 ) {
    emptyMsg.remove();
  }
}



/* 7. Helper functions */
function showOrHide(list, show) {
  list.forEach(el => el.style.display = show ? "block" : "none");
}

/* 7b. Empty stock message */

function emptyStockMessage() {
  // Remove previous message if any
const oldMsg = document.getElementById("emptyStock");
  if (oldMsg) oldMsg.remove();

  // Create the message
    const message = document.createElement("p");
    message.id = "emptyStock";
    message.textContent = `Aucun article disponible dans ${this.id}`;
    message.style.color = "red";
    message.style.marginTop = "10px";
    pTrie.appendChild(message);
}

// Example: attach to a category with no products
const emptyCategories = {
    haut: categories.haut.length === 0 ? boxes.haut : null,
    bas: categories.bas.length === 0 ? boxes.bas : null,
    chaussure: categories.chaussure.length === 0 ? boxes.chaussure : null,
    accessoires: categories.accessoires.length === 0 ? boxes.accessoire : null,
    complet: categories.complet.length === 0 ? boxes.complet : null,
};
if (emptyCategories.complet) {
    emptyCategories.complet.onclick = emptyCategories.complet.style.opacity = "0.3";
    emptyCategories.complet.onclick = emptyStockMessage;
  
}
/* 7c. Show all products */


function showAll() {
  activeCategories.forEach(name => {
    categories[name].forEach(el => el.style.display = "block");
  });
}

/* 8. Message formatting */
function formatMessage(arr) {
  const namesMap = {
    haut: "Haut",
    bas: "Bas",
    chaussure: "Chaussures",
    accessoires: "Accessoires",
    abaya: "Abayas",
    complet: "Complets",
    habitmuslim: "Habit Muslim"
  };

  const translated = arr.map(name => namesMap[name]);
  if (translated.length === 1) return translated[0] + " seulement" + ", " + [ `${categories[arr[0]].length}` + " articles" ]; ;
  if (translated.length === 2) return translated[0] + " et " + translated[1] + " seulement" + ", " + [ `${categories[arr[0]].length + categories[arr[1]].length}` + " articles" ]; ;
  if (translated.length === 3) return translated[0] + ", " + translated[1] + " et " + translated[2] + " seulement" + ", " + [ `${categories[arr[0]].length + categories[arr[1]].length + categories[arr[2]].length}` + " articles" ]; ;
  if (translated.length > 3) {
    const total = translated.reduce((sum, _, index) => sum + categories[arr[index]].length, 0);
    return translated[0] + ", " + translated[1] + ", " + translated[2] + ", " + (translated.length - 3) + " autres seulement" + ", " + [ `${total}` + " articles" ]; ;
  }
  const last = translated.pop();
    return messageBox;
}

