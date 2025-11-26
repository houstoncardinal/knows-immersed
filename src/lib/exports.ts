import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToCSV = (data: any[], filename: string) => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map(row => headers.map(header => `"${row[header] || ""}"`).join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (
  data: any[],
  filename: string,
  title: string,
  columns?: string[]
) => {
  if (!data.length) return;

  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 20);

  // Prepare table data
  const headers = columns || Object.keys(data[0]);
  const rows = data.map(item => headers.map(header => String(item[header] || "")));

  // Generate table
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 30,
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [0, 200, 200],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  doc.save(`${filename}.pdf`);
};

export const exportAnalyticsToPDF = (
  stats: any,
  charts: any[],
  filename: string
) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text("KNOWS STUDIOS - Analytics Report", 14, 20);

  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

  // Stats Summary
  doc.setFontSize(14);
  doc.text("Key Metrics", 14, 40);

  let yPos = 50;
  Object.entries(stats).forEach(([key, value]) => {
    doc.setFontSize(10);
    doc.text(`${key}: ${value}`, 20, yPos);
    yPos += 7;
  });

  doc.save(`${filename}.pdf`);
};
