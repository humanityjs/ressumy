import { Button } from '@/components/ui/button';
import { LLMInitializer } from '@/components/ui/llm-initializer';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useLLM } from '@/lib/llm';
import { exportElementToPDF } from '@/lib/utils';
import { useResumeStore } from '@/stores/resumeStore';
import { getTemplateById, Template, templates } from '@/templates';
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
  const llm = useLLM();

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

      // Use the utility function to export the preview element
      const name = resumeData.personalInfo.fullName || 'Resume';
      await exportElementToPDF(previewRef.current, name);

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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewOpen(true)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        </div>
      </div>

      {/* Main content - Form only */}
      <div className="max-w-3xl mx-auto">
        <LLMInitializer
          onInitialize={llm.initialize}
          progress={llm.progress}
          isLoading={llm.isLoading}
          isInitialized={llm.isInitialized}
          className="mb-6"
        />
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
