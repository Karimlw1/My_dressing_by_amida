const container = document.getElementById("materniteProducts");

products
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
