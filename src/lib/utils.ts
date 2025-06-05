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
    const clonedElement = element.cloneNode(true) as HTMLElement;
    if (clonedElement instanceof HTMLElement) {
      clonedElement.style.height = 'auto';
      clonedElement.style.overflow = 'visible';
      clonedElement.style.width = '8.5in';
      clonedElement.style.padding = '0';
      clonedElement.style.border = 'none';
      clonedElement.style.borderRadius = '0';
      clonedElement.style.boxShadow = 'none';
    }

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '8.5in';
    container.style.height = 'auto';
    container.style.background = 'white';
    container.style.overflow = 'visible';
    container.appendChild(clonedElement);
    document.body.appendChild(container);

    const canvas = await html2canvas(clonedElement, {
      scale: 2.5,
      logging: false,
      useCORS: true,
      letterRendering: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      height: clonedElement.scrollHeight,
      windowHeight: clonedElement.scrollHeight,
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const margin = {
      top: 12.7,
      right: 12.7,
      bottom: 13.7,
      left: 12.7,
    };

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const contentWidth = pageWidth - margin.left - margin.right;
    const contentHeight = pageHeight - margin.top - margin.bottom;

    // Calculate pixels per mm based on canvas width and PDF content width
    const pxPerMm = canvas.width / contentWidth;
    // Calculate the height of one PDF page's content area in source canvas pixels
    const pageHeightPx = Math.floor(contentHeight * pxPerMm);

    let currentCanvasY = 0; // Y position on the source canvas to start copying from
    let pageNum = 0;

    while (currentCanvasY < canvas.height) {
      if (pageNum > 0) {
        pdf.addPage();
      }

      const remainingCanvasHeight = canvas.height - currentCanvasY;
      const sliceCaptureHeightPx = Math.min(
        pageHeightPx,
        remainingCanvasHeight
      );

      if (sliceCaptureHeightPx <= 0) {
        break; // No more content left
      }

      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceCaptureHeightPx;
      const sliceCtx = sliceCanvas.getContext('2d');

      if (sliceCtx) {
        sliceCtx.drawImage(
          canvas,
          0,
          currentCanvasY, // Source x, y
          canvas.width,
          sliceCaptureHeightPx, // Source width, height
          0,
          0, // Destination x, y on sliceCanvas
          canvas.width,
          sliceCaptureHeightPx // Destination width, height on sliceCanvas
        );

        const sliceDataUrl = sliceCanvas.toDataURL('image/jpeg', 1.0);
        const sliceHeightOnPdfMm = sliceCaptureHeightPx / pxPerMm;

        pdf.addImage(
          sliceDataUrl,
          'JPEG',
          margin.left,
          margin.top,
          contentWidth,
          sliceHeightOnPdfMm
        );
      }

      currentCanvasY += pageHeightPx; // Advance by the exact page height in pixels
      pageNum++;

      if (pageNum > 50) {
        // Safety break
        console.warn('PDF generation: Exceeded 50 pages limit.');
        break;
      }
    }

    const formattedFilename = `${filename.replace(/\s+/g, '_')}_${
      new Date().toISOString().split('T')[0]
    }.pdf`;
    pdf.save(formattedFilename);

    document.body.removeChild(container);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
