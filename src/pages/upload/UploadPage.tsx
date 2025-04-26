import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, File, FileJson, FileUp } from 'lucide-react';
import { useState } from 'react';

function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      // TODO: Handle file upload logic
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      // TODO: Handle file upload logic
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (window.location.href = '/')}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Import Your Resume</h1>
            <p className="text-muted-foreground">
              Upload a previously exported resume file to continue editing
            </p>
          </div>

          <div
            className={`mt-8 border-2 border-dashed rounded-lg p-12 text-center ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                <FileUp className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">
                  Drag & Drop your file here
                </h3>
                <p className="text-sm text-muted-foreground">
                  or click to browse your files
                </p>
              </div>
              <Input
                type="file"
                className="hidden"
                id="file-upload"
                accept=".json"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button>Choose File</Button>
              </label>
              {fileName && (
                <div className="flex items-center gap-2 text-sm mt-4">
                  <FileJson className="w-4 h-4 text-primary" />
                  <span>{fileName}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6 mt-8">
            <h3 className="text-lg font-medium mb-4">Supported File Types</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-blue-500/10 text-blue-500">
                  <FileJson className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Ressumy exported file
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="p-2 rounded-md bg-zinc-500/10 text-zinc-500">
                  <File className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">More formats</p>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
