/* cart.js — shared cart utilities */

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, item) => s + (Number(item.qty) || 1), 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = total > 0 ? total : '';
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
