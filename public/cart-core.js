/* cart-core.js — alias helpers for pages that load this standalone */
if (typeof getCart === 'undefined') {
  function getCart() { return JSON.parse(localStorage.getItem('cart') || '[]'); }
  function saveCart(c) { localStorage.setItem('cart', JSON.stringify(c)); }
}
