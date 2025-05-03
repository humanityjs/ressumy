import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useResumeStore } from '@/stores/resumeStore';
import { getTemplateById, Template, templates } from '@/templates';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { Download, Eye, Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ResumeForm } from './components/forms/ResumeForm';

function EditorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [template, setTemplate] = useState<Template | undefined>();
  const resumeData = useResumeStore((state) => state.resumeData);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Parse the template ID from the URL query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const templateId = params.get('template');

    if (templateId) {
      const selectedTemplate = getTemplateById(templateId);
      if (selectedTemplate) {
        setTemplate(selectedTemplate);
      } else {
        // If template not found, use the first available template
        setTemplate(templates[0]);
      }
    } else {
      // If no template specified, redirect to template selection
      navigate('/templates');
    }
  }, [location.search, navigate]);

  const exportPDF = async () => {
    if (!previewRef.current) return;

    try {
      setIsExporting(true);

      // Create a clone of the preview content to maintain the original DOM
      const element = previewRef.current.cloneNode(true) as HTMLElement;

      // Remove height constraints and overflow settings for PDF export
      if (element instanceof HTMLElement) {
        element.style.height = 'auto';
        element.style.overflow = 'visible';
        element.style.width = '8.5in';
        element.style.padding = '0'; // Remove existing padding
        element.style.border = 'none'; // Remove border
        element.style.borderRadius = '0'; // Remove rounded corners
        element.style.boxShadow = 'none'; // Remove shadow
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
      container.appendChild(element);
      document.body.appendChild(container);

      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        logging: true, // Enable logging to debug issues
        useCORS: true,
        letterRendering: true,
        allowTaint: true,
        backgroundColor: '#ffffff', // Force white background
        foreignObjectRendering: false, // Disable as it may cause issues
        height: element.scrollHeight, // Capture full height
        windowHeight: element.scrollHeight,
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

      // Save the PDF
      const name = resumeData.personalInfo.fullName || 'Resume';
      const filename = `${name.replace(/\s+/g, '_')}_${
        new Date().toISOString().split('T')[0]
      }.pdf`;
      pdf.save(filename);

      // Clean up
      document.body.removeChild(container);
      setIsExporting(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsExporting(false);
    }
  };

  if (!template) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Loading template...</h2>
          <p className="text-muted-foreground">
            Please wait while we prepare your template.
          </p>
        </div>
      </div>
    );
  }

  // Render the Template component
  const TemplateComponent = template.component;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Resume Editor</h1>
          <p className="text-muted-foreground text-sm">
            Template: {template.name}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewOpen(true)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportPDF}
            disabled={isExporting}
            className={isExporting ? 'opacity-70 cursor-not-allowed' : ''}
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
        </div>
      </div>

      {/* Main content - Form only */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <ResumeForm template={template} />
        </div>
      </div>

      {/* Preview Sheet (slides in from right) */}
      <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
        <SheetContent
          side="right"
          className="w-[min(100vw,80vw)] sm:max-w-none p-0 overflow-y-auto"
        >
          <div className="h-full flex flex-col">
            <SheetHeader className="p-6 border-b flex justify-between items-center">
              <SheetTitle>Resume Preview</SheetTitle>
              <Button
                onClick={exportPDF}
                disabled={isExporting}
                size="sm"
                className={isExporting ? 'opacity-70 cursor-not-allowed' : ''}
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </Button>
            </SheetHeader>
            <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center">
              <div
                ref={previewRef}
                className="bg-white text-black rounded border border-zinc-200 p-6 shadow-md w-[8.5in] max-w-full"
              >
                <TemplateComponent data={resumeData} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default EditorPage;
