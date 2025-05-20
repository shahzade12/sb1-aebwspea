import { jsPDF } from 'jspdf';
import { Customer } from '@/hooks/useCustomers';

const generatePdf = (customer: Customer) => {
  const doc = new jsPDF();
  let yPos = 20;
  const lineHeight = 7;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  const maxWidth = pageWidth - 2 * margin;

  // Set font styles
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(customer.name, margin, yPos);
  yPos += lineHeight * 2;

  // Add customer info
  doc.setFontSize(12);
  if (customer.email) {
    doc.text(`Email: ${customer.email}`, margin, yPos);
    yPos += lineHeight;
  }
  if (customer.phone) {
    doc.text(`Phone: ${customer.phone}`, margin, yPos);
    yPos += lineHeight;
  }
  if (customer.address) {
    doc.text(`Address: ${customer.address}`, margin, yPos);
    yPos += lineHeight;
  }
  yPos += lineHeight;

  // Received Items Section
  if (customer.received.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Received Items', margin, yPos);
    yPos += lineHeight * 1.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    customer.received.forEach((item) => {
      // Check if we need a new page
      if (yPos > doc.internal.pageSize.height - margin) {
        doc.addPage();
        yPos = margin;
      }

      doc.setFont('helvetica', 'bold');
      doc.text(item.title, margin, yPos);
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      const date = new Date(item.date).toLocaleDateString();
      doc.text(`Date: ${date}`, margin, yPos);
      yPos += lineHeight;

      if (item.currency) {
        doc.text(`Currency: ${item.currency}`, margin, yPos);
        yPos += lineHeight;
      }

      const contentLines = doc.splitTextToSize(item.content, maxWidth);
      contentLines.forEach((line: string) => {
        if (yPos > doc.internal.pageSize.height - margin) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(line, margin, yPos);
        yPos += lineHeight;
      });

      yPos += lineHeight; // Add space between items
    });
  }

  // Customer Details Section
  if (customer.details.length > 0) {
    // Add a new page if we're close to the bottom
    if (yPos > doc.internal.pageSize.height - 50) {
      doc.addPage();
      yPos = margin;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Customer Details', margin, yPos);
    yPos += lineHeight * 1.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    customer.details.forEach((detail) => {
      // Check if we need a new page
      if (yPos > doc.internal.pageSize.height - margin) {
        doc.addPage();
        yPos = margin;
      }

      doc.setFont('helvetica', 'bold');
      doc.text(detail.title, margin, yPos);
      yPos += lineHeight;

      doc.setFont('helvetica', 'normal');
      const date = new Date(detail.date).toLocaleDateString();
      doc.text(`Date: ${date}`, margin, yPos);
      yPos += lineHeight;

      if (detail.currency) {
        doc.text(`Currency: ${detail.currency}`, margin, yPos);
        yPos += lineHeight;
      }

      const contentLines = doc.splitTextToSize(detail.content, maxWidth);
      contentLines.forEach((line: string) => {
        if (yPos > doc.internal.pageSize.height - margin) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(line, margin, yPos);
        yPos += lineHeight;
      });

      yPos += lineHeight; // Add space between items
    });
  }

  // Save the PDF
  const fileName = `${customer.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_details.pdf`;
  doc.save(fileName);
};

export default generatePdf;