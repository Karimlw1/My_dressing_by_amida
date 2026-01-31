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

const steps = document.querySelectorAll(".step");
let current = 0;

function showStep(index) {
  steps.forEach((s, i) =>
    s.classList.toggle("active", i === index)
  );
}

document.querySelectorAll(".next").forEach(btn =>
  btn.addEventListener("click", () => {
    if (current < steps.length - 1) {
      current++;
      showStep(current);
    }
  })
);

document.querySelectorAll(".prev").forEach(btn =>
  btn.addEventListener("click", () => {
    if (current > 0) {
      current--;
      showStep(current);
    }
  })
);

showStep(current);

document.getElementById("giftForm").addEventListener("submit", e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));
  const phone = "256788064469";

  const urgent = data.urgent
    ? "⚠ DEMANDE URGENTE\n"
    : "";

  const message =
`${urgent}🎁 DEMANDE CADEAU PERSONNALISÉ

CLIENT
Nom: ${data.clientName}
Tel: ${data.clientPhone || "-"}

DESTINATAIRE
Pour: ${data.receiverName || "-"}
Âge: ${data.receiverAge || "-"}
Sexe: ${data.receiverGender || "-"}

CADEAU
Occasion: ${data.occasion || "-"}
Budget: ${data.budget || "-"}
Délai: ${data.deadline || "-"}
Style: ${data.style || "-"}

MESSAGE
"${data.message || "-"}"

NOTES
${data.notes || "-"}`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
});
