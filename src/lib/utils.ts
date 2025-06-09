import { Template } from '@/templates';
import { type ClassValue, clsx } from 'clsx';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { twMerge } from 'tailwind-merge';
import { sampleResumeData } from './sampleData';

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

/**
 * Generates a sample PDF for a given template
 * @param template The template to generate a sample for
 * @param setDownloadingTemplate Function to update downloading state
 * @returns Promise resolving when the PDF has been generated and downloaded
 */
export const generateSamplePDF = async (
  template: Template,
  setDownloadingTemplate: (id: string | null) => void
): Promise<void> => {
  if (template.isComingSoon) return;

  setDownloadingTemplate(template.id);

  try {
    // Create a temporary container for rendering
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '210mm';
    tempContainer.style.minHeight = '297mm';
    tempContainer.style.padding = '20mm';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.color = 'black';

    document.body.appendChild(tempContainer);

    // Create a React root and render the template
    const { createRoot } = await import('react-dom/client');
    const root = createRoot(tempContainer);

    // Import React for JSX
    const React = await import('react');

    const TemplateComponent = template.component;

    await new Promise<void>((resolve) => {
      root.render(
        React.createElement(TemplateComponent, {
          data: sampleResumeData,
        })
      );

      // Wait for render to complete
      setTimeout(resolve, 500);
    });

    // Export to PDF
    await exportElementToPDF(tempContainer, `${template.name}-Sample`);

    // Cleanup
    root.unmount();
    document.body.removeChild(tempContainer);
  } catch (error) {
    console.error('Error generating sample PDF:', error);
  } finally {
    setDownloadingTemplate(null);
  }
};

/**
 * Detects if the user is on a mobile device
 * @returns boolean indicating if the device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check user agent for mobile indicators
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUserAgent = mobileRegex.test(navigator.userAgent);

  // Check screen size (mobile is typically <= 768px wide)
  const isSmallScreen = window.innerWidth <= 768;

  // Check for touch capability
  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Return true if any mobile indicator is present
  return isMobileUserAgent || (isSmallScreen && isTouchDevice);
};

/**
 * Checks if the device has sufficient resources for AI processing
 * @returns boolean indicating if AI features should be available
 */
export const hasAICapability = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Mobile devices typically don't have enough resources for web LLMs
  if (isMobileDevice()) return false;

  // Check for WebAssembly support (required for web LLM)
  if (typeof WebAssembly === 'undefined') return false;

  // Check available memory (rough estimate) - deviceMemory is experimental
  const navigatorWithMemory = navigator as Navigator & {
    deviceMemory?: number;
  };
  const memory = navigatorWithMemory.deviceMemory;
  if (memory && memory < 4) return false; // Less than 4GB RAM

  return true;
};
