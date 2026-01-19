const haut = document.querySelectorAll(".haut");
const bas = document.querySelectorAll(".bas");
const chaussure = document.querySelectorAll(".chaussure");
const accessoires = document.querySelectorAll(".access");

const Boxhaut = document.getElementById("haut");
const Boxbas = document.getElementById("bas");
const Boxchaussure = document.getElementById("chaussure");
const Boxaccessoire = document.getElementById("accessoire");

const pTrie = document.getElementById("pTrie");
const trieMessage = document.getElementById("trieMessage");

Boxhaut.onclick = update;
Boxbas.onclick = update;
Boxchaussure.onclick = update;
Boxaccessoire.onclick = update;

function update() {
    Boxhaut.classList.toggle("category-active", Boxhaut === this ? !Boxhaut.classList.contains("category-active") : Boxhaut.classList.contains("category-active"));
    Boxbas.classList.toggle("category-active", Boxbas === this ? !Boxbas.classList.contains("category-active") : Boxbas.classList.contains("category-active"));
    Boxchaussure.classList.toggle("category-active", Boxchaussure === this ? !Boxchaussure.classList.contains("category-active") : Boxchaussure.classList.contains("category-active"));
    Boxaccessoire.classList.toggle("category-active", Boxaccessoire === this ? !Boxaccessoire.classList.contains("category-active") : Boxaccessoire.classList.contains("category-active"));

    const selected = [];

    if (Boxhaut.classList.contains("category-active")) selected.push("Haut");
    if (Boxbas.classList.contains("category-active")) selected.push("Bas");
    if (Boxchaussure.classList.contains("category-active")) selected.push("Chaussures");
    if (Boxaccessoire.classList.contains("category-active")) selected.push("Accessoires");

    if (selected.length === 0) {
        trieMessage.textContent = "Tous les articles";
        showAll();
    } else {
        pTrie.style.display = "block";
        trieMessage.textContent = formatMessage(selected);
        filter(selected);
    }
}

function filter(selected) {
    showOrHide(haut, selected.includes("Haut"));
    showOrHide(bas, selected.includes("Bas"));
    showOrHide(chaussure, selected.includes("Chaussures"));
    showOrHide(accessoires, selected.includes("Accessoires"));
}

function showOrHide(elements, show) {
    elements.forEach(el => {
        el.style.display = show ? "block" : "none";
    });
}

function showAll() {
    [haut, bas, chaussure, accessoires].forEach(group =>
        group.forEach(el => el.style.display = "block")
    );
}

function formatMessage(arr) {
    if (arr.length === 1) return arr[0] + " seulement";
    if (arr.length === 2) return arr[0] + " et " + arr[1] + " seulement";
    if (arr.length === 3) return arr[0] + ", " + arr[1] + " et " + arr[2] + " seulement";
    if (arr.length > 3)
        return "Tous les articles";
}
