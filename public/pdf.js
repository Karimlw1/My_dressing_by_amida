function generatePDF() {
  const element = document.getElementById("pdfArea");

  const options = {
    margin: 0.5,
    filename: "commande-my-dressing.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      useCORS: true,
      scale: 2
    },
    jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }
  };

    html2pdf().from(element).save().then(() => {
    alert("PDF généré ✔️ Ouvrez WhatsApp et joignez-le");
  });
}
