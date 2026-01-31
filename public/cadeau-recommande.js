const steps = document.querySelectorAll(".step")
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
ville: ${data.clienTown}


DESTINATAIRE
Pour: ${data.receiverName || "-"}
Âge: ${data.receiverAge || "-"}
Sexe: ${data.receiverGender || "-"}
relation: ${data.relation || "-"}

CADEAU
Occasion: ${data.occasion || "-"}
Budget: ${data.budget || "-"}
Délai: ${data.deadline || "-"}
Style: ${data.style || "-"}

MESSAGE
"${data.details || "-"}"

NOTES
${data.notes || "-"}`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
});
