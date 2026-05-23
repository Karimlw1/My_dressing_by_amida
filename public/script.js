/* script.js — My Dressing by Amida */

/* ---- CAROUSEL ---- */
const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let index = 0;

function update() {
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

let auto = setInterval(() => { index = (index + 1) % slideItems.length; update(); }, 3800);

dots.forEach((dot, i) => dot.addEventListener('click', () => { index = i; update(); restartAuto(); }));

let startX = 0;
slides.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive: true});
slides.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff < -50) index = (index + 1) % slideItems.length;
  else if (diff > 50) index = (index - 1 + slideItems.length) % slideItems.length;
  update(); restartAuto();
}, {passive: true});

function restartAuto() {
  clearInterval(auto);
  auto = setInterval(() => { index = (index + 1) % slideItems.length; update(); }, 3800);
}

/* ---- REVEAL ---- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- MENU ---- */
function showMenu() {
  document.querySelector('.socials').classList.toggle('visible');
}
function exitMenu() {
  document.querySelector('.socials').classList.remove('visible');
}

/* ---- YEAR ---- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- PRODUCTS ---- */
const productsContainer = document.getElementById('productsContainer');

function isProductNew(product) {
  if (!product.createdAt) return false;
  const diffDays = (Date.now() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 14; // New within 14 days
}

fetch('/api/products')
  .then(res => { if (!res.ok) throw new Error(); return res.json(); })
  .then(products => {
    const arr = Object.values(products).sort(() => Math.random() - 0.5);

    if (!arr.length) {
      productsContainer.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa">Aucun produit disponible</p>';
      return;
    }

    arr.forEach(product => {
      const isNew = isProductNew(product);
      const isPromo = product.price < 40;

      const div = document.createElement('div');
      div.className = 'product';
      div.dataset.id = product.id;

      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy"
             onerror="this.style.background='#f0efed'" />
        <div class="info">
          <p class="description">${product.name}</p>
          <div class="price">
            <span ${isPromo ? 'style="color:#128C7E"' : 'style="color:#b30e0e"'}>$${product.price}</span>
            <div style="display:flex;gap:4px;align-items:center">
              ${isPromo ? '<span class="promo"><i class="fa fa-fire"></i></span>' : ''}
              ${isNew ? '<span class="new">Nouveau</span>' : ''}
            </div>
          </div>
          <div style="margin-top:2px">
            <button class="details-bttn" style="pointer-events:none">Voir produit</button>
          </div>
        </div>`;

      div.addEventListener('click', () => {
        location.href = `product.html?id=${product.id}`;
      });

      productsContainer.appendChild(div);
    });
  })
  .catch(() => {
    productsContainer.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa">Erreur de chargement</p>';
  });
