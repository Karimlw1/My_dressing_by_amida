const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// const recipientName = document.getElementById("recipientName").value;

const PRODUCTS = {
  Homep1: {
    id: "Homep1",
    name: "Talon rouge marron",
    category: "chaussures",
    price: 150,
    image: "https://i.pinimg.com/1200x/4a/27/0d/4a270d9a52ff3199fb4a1e516e249a94.jpg",
    options: {
      size: ["36", "37", "38", "39" ,"40" ,"41"],
      color: ["Rouge", "Marron"]
    },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  Homep2: {
    id: "Homep2",
    name: "Tricot homme",
    category: "haut",
    price: 80,
    image: "https://i.pinimg.com/1200x/1a/80/c0/1a80c0cf8eef5d4f398982e08e54bf57.jpg",
    options: {
      size: ["S", "M", "L" , "XL", "XXL"],
      color: ["Noir", "Gris" , "marron"]
    },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },
  Homep3: {
    id: "Homep3",
    name: "Crème visage Centella",
    category: "cosmetique",
    price: 100,
    image: "https://raw.githubusercontent.com/Karimlw1/My_dressing_by_amida/main/public/images/skincareHome.png",
    options: {},
   lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },
  Homep4: {
    id: "Homep4",
    name: "robe complet femme",
    category: "Femme(complet)",
    price: 350,
    image: "https://i.pinimg.com/1200x/32/85/04/328504bda1f71b45ce07fdda398351fb.jpg",
    options: {
        size: [ "S", "M", "L" , "XL", "XXL"],
        color: ["noir" , "blanc" , "rouge"]
    },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },
  Homep5: {
    id: "Homep5",
    name: "chaise",
    category: "Fourniture",
    price: 250,
    image: "https://i.pinimg.com/736x/da/56/4e/da564e6b2abe587262ae19c6a456f804.jpg",
    options: {
        color: ["white" , "gris"]
    },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },
  Homep6: {
    id: "Homep6",
    name: "Lunette Celine",
    category: "Femme (Accessoire)",
    price: 210,
    image: "https://i.pinimg.com/736x/d4/ce/98/d4ce985e40ea436f4eea1d8881375531.jpg",
    options: {},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },
  FashionHp1: {
    id: "FashionHp1",
    name: "chemise ZARA",
    category: "Homme(haut)",
    price: 150,
    image: "https://i.pinimg.com/1200x/84/f2/d7/84f2d733d4736d4376ba44c005194a5b.jpg",
    options: {
      size: ["S", "M", "L", "XL"],
      color: ["Blanc", "Noir", "Beige"]
    }
    ,
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionHp2: {
    id: "FashionHp2",
    name: "Montre",
    category: "Homme(accessoire)",
    price: 40,
    image: "https://i.pinimg.com/736x/46/c1/ca/46c1ca4aaa247e242120a89823e042c5.jpg",
    options: {},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionHp3: {
    id: "FashionHp3",
    name: "Culotte de sport noir",
    category: "Homme(Bas)",
    price: 35,
    image: "https://i.pinimg.com/1200x/4b/4a/18/4b4a186675a7274b5c6d613713d5d435.jpg",
    options: {
      size: ["S", "M", "L", "XL"]
    },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionHp4: {
    id: "FashionHp4",
    name: "tricot marron",
    category: "Homme(Haut)",
    price: 80,
    image: "https://i.pinimg.com/1200x/1a/80/c0/1a80c0cf8eef5d4f398982e08e54bf57.jpg",
    options: {
      size: ["S", "M", "L", "XL", "XXL"],
      color: ["Marron", "Noir", "Gris"]
    },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionHp5: {
    id: "FashionHp5",
    name: "2 bonets",
    category: "homme(accessoire)",
    price: 40,
    image: "https://i.pinimg.com/1200x/e4/6a/5b/e46a5bdbbf182d89d492d1458fce95b0.jpg",
    options: {},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionHp6: {
    id: "FashionHp6",
    name: "3 culottes",
    category: "homme(accessoire)",
    price: 30,
    image: "https://i.pinimg.com/736x/12/6d/5f/126d5f4bdd73ee1f48f9808e977c675d.jpg",
    options: {
      size: ["S", "M", "L"]
    },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionHp7: {
    id: "FashionHp7",
    name: "4 culottes",
    category: "homme(accessoire)",
    price: 50,
    image: "https://i.pinimg.com/1200x/c5/cc/f4/c5ccf44e7cd0f72ddc3d098435431cf9.jpg",
    options: {
      size: ["S", "M", "L", "XL"]
    },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionHp8: {
    id: "FashionHp8",
    name: "sac noir",
    category: "homme(accessoire)",
    price: 20,
    image: "https://i.pinimg.com/1200x/df/d9/98/dfd9986fb48ab0bdffa30d7e432cd92e.jpg",
    options: {},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionHp9: {
    id: "FashionHp9",
    name: "sandale dior",
    category: "homme(chaussure)",
    price: 55,
    image: "https://i.pinimg.com/736x/fd/0a/89/fd0a8932abe69c47f7e1e1f9d4b2c6d9.jpg",
    options: {
      size: ["39", "40", "41", "42", "43"]
    },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionHp10: {
    id: "FashionHp10",
    name: "sandale hermes",
    category: "homme(chausssure)",
    price: 80,
    image: "https://i.pinimg.com/736x/9b/6e/89/9b6e892029ddcfb3fa32fb3c17f29c16.jpg",
    options: {
      size: ["39", "40", "41", "42", "43"]
    },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionHp11: {
    id: "FashionHp11",
    name: "chaussure tom ford",
    category: "homme(chausssure)",
    price: 200,
    image: "https://i.pinimg.com/1200x/de/69/43/de69434a6cf0ad4c78379af6e60fff5d.jpg",
    options: {
      size: ["40", "41", "42", "43", "44"]
    },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionFp1: {
    id: "FashionFp1",
    name: "blouse chocolate",
    category: "Femme(haut)",
    price: 150,
    image: "https://i.pinimg.com/1200x/37/5f/ca/375fcac6476f3ec09f820d114715fea4.jpg",
    options: { size: ["S", "M", "L", "XL"] },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionFp2: {
    id: "FashionFp2",
    name: "talon rouge maron",
    category: "Femme(soulier)",
    price: 150,
    image: "https://i.pinimg.com/1200x/4a/27/0d/4a270d9a52ff3199fb4a1e516e249a94.jpg",
    options: { size: ["36", "37", "38", "39", "40"] },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionFp3: {
    id: "FashionFp3",
    name: "chapeau marque",
    category: "Femme(accessoires)",
    price: 40,
    image: "https://i.pinimg.com/1200x/b4/8e/81/b48e8111848ca991a4eb6b793e0f5fe4.jpg",
    options: {},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionFp4: {
    id: "FashionFp4",
    name: "pentalon baggy jeans",
    category: "Femme(bas)",
    price: 35,
    image: "https://i.pinimg.com/736x/ae/f8/1b/aef81bff4c08a594dc3f808bb56c16a4.jpg",
    options: { size: ["S", "M", "L", "XL"] },
   lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionFp5: {
    id: "FashionFp5",
    name: "Tricot mapeka",
    category: "Femme(haut)",
    price: 80,
    image: "https://i.pinimg.com/736x/c8/5d/0d/c85d0d708b0e77bce7dce8d6e249a920.jpg",
    options: { size: ["S", "M", "L", "XL"] },
   lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionFp6: {
    id: "FashionFp6",
    name: "collant noir",
    category: "Femme(bas)",
    price: 30,
    image: "https://i.pinimg.com/1200x/20/ca/85/20ca8528d84d0f54fde3b5d504e8cc43.jpg",
    options: { size: ["S", "M", "L"] },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionFp7: {
    id: "FashionFp7",
    name: "chemise ZARA avec chainette",
    category: "Femme(haut)",
    price: 100,
    image: "https://i.pinimg.com/1200x/67/f8/38/67f8383b696cef0dbeb050305586b421.jpg",
    options: { size: ["S", "M", "L", "XL"] },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionFp8: {
    id: "FashionFp8",
    name: "lunnette celine",
    category: "Femme(Accessoire)",
    price: 40,
    image: "https://i.pinimg.com/736x/ad/d1/3d/add13d7b799c811eb46a27fe92233af6.jpg",
    options: {},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  FashionFp9: {
    id: "FashionFp9",
    name: "chemise avec tricot au ventre",
    category: "Femme(haut)",
    price: 350,
    image: "https://i.pinimg.com/1200x/4c/d9/0d/4cd90ddb1aac1998f8f68705044e902b.jpg",
    options: { size: ["S", "M", "L", "XL"] },
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },
  BeautyP1: {
    id: "BeautyP1",
    name: "Rouge a levre lancome",
    price: 150,
    category: "Cosmetique(maquillage)",
    image: "https://i.pinimg.com/736x/fc/95/a8/fc95a8fde6efd87c6377786a9ab11058.jpg",
    options:{},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  BeautyP2: {
    id: "BeautyP2",
    name: "masse visage",
    price: 40,
    category: "Cosmetique(accessoire)",
    image: "https://i.pinimg.com/736x/4a/ec/63/4aec636ed4040a38d293607b48c5521d.jpg",
   options:{},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  BeautyP3: {
    id: "BeautyP3",
    name: "La roche posay Vitamine C",
    price: 35,
    category: "Cosmetique(skincare)",
    image: "https://i.pinimg.com/736x/9f/af/11/9faf117b216f2aa8a897e41ca3e870ea.jpg",
   options:{},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  BeautyP4: {
    id: "BeautyP4",
    name: "EQQUAL BERRY vitamine C",
    price: 30,
    category: "Cosmetique(skincare)",
    image: "https://i.pinimg.com/736x/7e/b5/16/7eb5166567f5890bd9827441e70a63b8.jpg",
   options:{},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  BeautyP5: {
    id: "BeautyP5",
    name: "centella",
    price: 100,
    category: "Cosmetique(skincare)",
    image: "https://raw.githubusercontent.com/Karimlw1/My_dressing_by_amida/main/images/skincareHome.png",
   options:{},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  BeautyP6: {
    id: "BeautyP6",
    name: "stronger with You",
    price: 50,
    category: "Cosmetique(fragrance)",
    image: "https://i.pinimg.com/736x/11/fd/5c/11fd5c4ed5231ccf813827a2ec295850.jpg",
    options:{},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  BeautyP7: {
    id: "BeautyP7",
    name: "KIT complet haircare",
    price: 55,
    category: "Cosmetique(haircare)",
    image: "https://i.pinimg.com/736x/19/e6/cc/19e6cc85d0dbc47881063962605de663.jpg",
    options:{},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },
  MAT01:{
      id: "MAT01",
      name: "Coffret Maternité Douceur",
      price: 45,
      category: "maternite",
      image: "https://i.pinimg.com/736x/5e/fb/0d/5efb0d628a6278c4f6748c383d6814ef.jpg",
      options:{},
      lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
    },
  
   MAT02 :
   { id: "MAT02",
    name: "Coffret Naissance Premium",
    price: 75,
    category: "maternite",
    image: "https://i.pinimg.com/736x/86/0b/28/860b2871ce09823dbffeee19e846e70d.jpg",
    options:{},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  },

  MAT03 :{
    id: "MAT03",
    name: "Coffret Famille & Bébé",
    price: 110,
    category: "maternite",
    image: "https://i.pinimg.com/736x/fa/f0/a2/faf0a2f2daf53ef00be9a139c82754c0.jpg",
    options:{},
    lieuDeLIvraison: {
      ville: ["Kinshasa", "Goma" , "Lubumbashi"]
    }
  }
};

const product = PRODUCTS[id];

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
    <label>lieux de livraison :</label>
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
document.getElementById("image").src = product.image;
document.getElementById("category").textContent = product.category;

document.getElementById("addToCart").addEventListener("click", () => {
    const size = document.getElementById("size")?.value || null;
    const color = document.getElementById("color")?.value || null;
    const ville = document.getElementById("ville")?.value?.trim() || null;


    if (!ville || ville.length < 2) {
  alert("Veuillez choisir un lieu de livraison");
  return;
}

   addToCart ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
    size,
    color,
    ville,
  });

  alert("Produit ajouté au panier ✔");

});
