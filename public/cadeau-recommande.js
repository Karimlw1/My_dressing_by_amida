const gifts = [];

document.getElementById("addGift").onclick = () => {
  const data = Object.fromEntries(new FormData(giftForm));
  gifts.push(data);
  alert("Cadeau ajouté");
  giftForm.reset();
};
giftForm.onsubmit = e => {
  e.preventDefault();

  const sender = {
    name: giftForm.client_name.value,
    phone: giftForm.client_phone.value,
    city: giftForm.client_city?.value || "" // si tu ajoutes un champ ville
  };

  const data = Object.fromEntries(new FormData(giftForm));
  gifts.push(data);

  fetch("/gift-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gifts, sender }) // <- ici on envoie sender
  })
  .then(() => {
    alert("Demande envoyée avec succès");
    gifts.length = 0;
    giftForm.reset();
  });
};
