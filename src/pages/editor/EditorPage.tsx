import { Button } from '@/components/ui/button';
import { Download, Save } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

function EditorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Resume Editor</h1>
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
            <ResumeForm />
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
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
