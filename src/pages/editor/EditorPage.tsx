import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/stores/resumeStore';
import { getTemplateById, Template, templates } from '@/templates';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { Download, Save } from 'lucide-react';
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

      // Create a temporary container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = '8.5in'; // Letter width
      container.style.background = 'white';

      // Add the element to the temporary container
      container.appendChild(element);
      document.body.appendChild(container);

      // Configure html2canvas options
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        letterRendering: true,
        allowTaint: true,
      });

      // Calculate dimensions for PDF (convert canvas dimensions to mm)
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Add canvas image to PDF
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

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
            onClick={exportPDF}
            disabled={isExporting}
            className={isExporting ? 'opacity-70 cursor-not-allowed' : ''}
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left side - Form */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-card rounded-lg p-6 border shadow-sm">
            <ResumeForm template={template} />
          </div>
        </div>

        {/* Right side - Preview */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-lg p-8 border shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-2">Resume Preview</h2>
            <p className="text-muted-foreground mb-4">
              Live preview of your resume
            </p>
            <div
              ref={previewRef}
              className="aspect-[8.5/11] bg-white text-black rounded border border-zinc-200 p-6 shadow-md overflow-hidden"
            >
              <TemplateComponent data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
