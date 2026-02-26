//* search logic 
const searchInput = document.getElementById("SearchInput");

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("SearchInput");

    if (!searchInput) return; // prevents crash if page doesn't have it

    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href =
                    "search.html?q=" + encodeURIComponent(query);
            }
        }
    });
});

const container = document.getElementById("resultsContainer");
const resultsCount = document.getElementById("resultsCount");

function normalize(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function loadSearchResults() {
    const query = getQueryParam("q");

    if (!query) {
        container.innerHTML = "<p>Aucune recherche trouvée.</p>";
        return;
    }

    const res = await fetch("./api/products");
    const data = await res.json();
    const products = Object.values(data);

    const filtered = products.filter(product => {
        const searchable = normalize(`
    ${product.name}
    ${product.description || ""}
    ${product.category}
    ${product.type}
    ${product.price}
    ${product.options.size.join(" ")}
    ${product.options.color.join(" ")}
  `);

        return searchable.includes(normalize(query));
    });


    resultsCount.textContent = `${filtered.length} résultat(s) pour "${query}"`;

    if (filtered.length === 0) {
        container.innerHTML = "<p style='margin:20px'>Aucun produit trouvé.</p>";
        return;
    }

    filtered.forEach(product => {
        container.innerHTML += `
      <div class="product details" id="${product.id}" onclick="location.href='product.html?id=${product.id}'">
        
      <img src="${product.image}" alt="${product.name}" />
        <div class="info">
          <div class="price">$${product.price}</div>
          <button class="details-bttn" onclick="location.href='product.html?id=${product.id}'">
            Voir produit
          </button>
        </div>
    `;
    });
}

loadSearchResults();