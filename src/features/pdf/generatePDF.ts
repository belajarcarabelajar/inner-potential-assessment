import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generatePDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const pages = element.querySelectorAll(".pdf-page");
  if (pages.length === 0) return;

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  
  // Make the hidden container temporarily visible for capture (without breaking document flow)
  const originalDisplay = element.style.display;
  element.style.display = "block";

  for (let i = 0; i < pages.length; i++) {
    const pageElement = pages[i] as HTMLElement;
    
    const canvas = await html2canvas(pageElement, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    
    // Calculate aspect ratio to fit A4
    const imgProps = pdf.getImageProperties(imgData);
    const ratio = imgProps.width / imgProps.height;
    const height = pdfWidth / ratio;

    if (i > 0) {
      pdf.addPage();
    }
    
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, height);
  }

  // Restore original display
  element.style.display = originalDisplay;

  pdf.save(filename);
  return pdf.output("blob");
}
