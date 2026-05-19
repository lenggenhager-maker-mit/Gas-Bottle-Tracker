import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // import the function explicitly

const PdfCreator = ({ displayedBottles }) => {
  const createPDF = () => {
    if (!displayedBottles || displayedBottles.length === 0) {
      alert("Keine Flaschen zum Drucken gefunden!");
      return;
    }

    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Gasflaschenlager Übersicht", 105, 15, { align: "center" });

    // Date and time (de-CH format)
    const now = new Date();
    const dateString = now.toLocaleDateString("de-CH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const timeString = now.toLocaleTimeString("de-CH", {
      hour: "2-digit",
      minute: "2-digit",
    });
    doc.setFontSize(10);
    doc.text(`Stand: ${dateString}, ${timeString}`, 105, 22, {
      align: "center",
    });

    // Table headers & data
    const tableColumn = [
      "Flasche",
      "Gastyp",
      "Grösse",
      "Füllstand",
      "Standort",
      "Status",
    ];
    const tableRows = displayedBottles.map((bottle) => [
      bottle.id ?? "",
      bottle.gasTyp ?? "",
      bottle.bottleGrosse ?? "",
      bottle.fuellstand ?? "",
      bottle.standort ?? "",
      bottle.quality === "entsorgen"
        ? "entsorgen"
        : bottle.quality === "ruckgeben"
        ? "ruckgeben"
        : "",
    ]);

    // Generate table using the imported autoTable function
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      margin: { left: 14, right: 14 },
      // optional: add table theme or column widths if needed
    });

    // Open in new tab for preview
    const pdfUrl = doc.output("bloburl");
    window.open(pdfUrl, "_blank");
  };

  return <button onClick={createPDF}>PDF erstellen</button>;
};

export default PdfCreator;
