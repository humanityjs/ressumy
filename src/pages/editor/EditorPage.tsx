import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/stores/resumeStore';
import { getTemplateById, Template, templates } from '@/templates';
import { Download, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ResumeForm } from './components/forms/ResumeForm';

function EditorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [template, setTemplate] = useState<Template | undefined>();
  const resumeData = useResumeStore((state) => state.resumeData);

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
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
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
            <div className="aspect-[8.5/11] bg-white text-black rounded border border-zinc-200 p-6 shadow-md overflow-hidden dark:bg-white">
              <TemplateComponent data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
