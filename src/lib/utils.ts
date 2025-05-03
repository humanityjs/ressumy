import { type ClassValue, clsx } from 'clsx';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Exports an HTML element to PDF with proper pagination
 * @param element The HTML element to export
 * @param filename The filename to save the PDF as (without extension)
 * @returns Promise resolving when the PDF has been generated and saved
 */
export const exportElementToPDF = async (
  element: HTMLElement,
  filename: string = 'document'
): Promise<void> => {
  try {
    // Create a clone of the element to maintain the original DOM
    const clonedElement = element.cloneNode(true) as HTMLElement;

    // Remove styling that shouldn't appear in print
    if (clonedElement instanceof HTMLElement) {
      clonedElement.style.height = 'auto';
      clonedElement.style.overflow = 'visible';
      clonedElement.style.width = '8.5in';
      clonedElement.style.padding = '0';
      clonedElement.style.border = 'none';
      clonedElement.style.borderRadius = '0';
      clonedElement.style.boxShadow = 'none';
    }

    // Create a temporary container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '8.5in'; // Letter width
    container.style.height = 'auto'; // Let it expand as needed
    container.style.background = 'white';
    container.style.overflow = 'visible';

    // Add the element to the temporary container
    container.appendChild(clonedElement);
    document.body.appendChild(container);

    const canvas = await html2canvas(clonedElement, {
      scale: 2, // Higher scale for better quality
      logging: true, // Enable logging to debug issues
      useCORS: true,
      letterRendering: true,
      allowTaint: true,
      backgroundColor: '#ffffff', // Force white background
      foreignObjectRendering: false, // Disable as it may cause issues
      height: clonedElement.scrollHeight, // Capture full height
      windowHeight: clonedElement.scrollHeight,
    });

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Define page margins (smaller, more reasonable margins)
    const margin = {
      top: 12.7, // 0.5 inch in mm
      right: 12.7,
      bottom: 12.7,
      left: 12.7,
    };

    // Calculate the PDF page dimensions with margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const contentWidth = pageWidth - margin.left - margin.right;
    const contentHeight = pageHeight - margin.top - margin.bottom;

    // Calculate the proper scaling for the image
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Calculate how many pages needed
    const pagesCount = Math.ceil(imgHeight / contentHeight);

    // For each page, add a slice of the image
    for (let i = 0; i < pagesCount; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      // Calculate the position and height for this slice
      const sourceY = i * contentHeight * (canvas.height / imgHeight);
      const sourceHeight = Math.min(
        contentHeight * (canvas.height / imgHeight),
        canvas.height - sourceY
      );

      // Create a temporary canvas for this slice
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = canvas.width;
      tmpCanvas.height = sourceHeight;
      const ctx = tmpCanvas.getContext('2d');

      // Draw the slice from the original canvas
      if (ctx) {
        ctx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sourceHeight,
          0,
          0,
          canvas.width,
          sourceHeight
        );

        // Add this slice to the PDF
        const sliceData = tmpCanvas.toDataURL('image/jpeg', 1.0);
        const sliceHeight = (sourceHeight * imgWidth) / canvas.width;

        pdf.addImage(
          sliceData,
          'JPEG',
          margin.left,
          margin.top,
          imgWidth,
          sliceHeight
        );
      }
    }

    // Save the PDF with file extension
    const formattedFilename = `${filename.replace(/\s+/g, '_')}_${
      new Date().toISOString().split('T')[0]
    }.pdf`;

    pdf.save(formattedFilename);

    // Clean up
    document.body.removeChild(container);

    return Promise.resolve();
  } catch (error) {
    console.error('Error generating PDF:', error);
    return Promise.reject(error);
  }
};
