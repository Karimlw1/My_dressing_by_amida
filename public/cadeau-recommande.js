const gifts = [];

document.getElementById("addGift").onclick = () => {
  const data = Object.fromEntries(new FormData(giftForm));
  gifts.push(data);
  alert("Cadeau ajouté");
  giftForm.reset();
};

giftForm.onsubmit = e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(giftForm));
  gifts.push(data);

  fetch("/gift-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gifts })
  })
  .then(() => {
    alert("Demande envoyée avec succès");
    gifts.length = 0;
    giftForm.reset();
  });
};
