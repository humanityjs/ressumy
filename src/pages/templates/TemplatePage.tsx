import { Button } from '@/components/ui/button';
import { Template, templates } from '@/templates';
import { ArrowLeft, ArrowRight, Check, Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function TemplatePage() {
  const navigate = useNavigate();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    templates[0].id
  );

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template && !template.isComingSoon) {
      setSelectedTemplateId(templateId);
    }
  };

  const handleContinue = () => {
    navigate(`/editor?template=${selectedTemplateId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Choose a Template</h1>
            <p className="text-muted-foreground">
              Select a template to get started with your résumé
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={handleTemplateSelect}
              />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button size="lg" onClick={handleContinue} className="px-8">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <div
      className={`
        border rounded-lg overflow-hidden transition-all duration-200
        ${
          isSelected
            ? 'ring-2 ring-primary ring-offset-2'
            : 'hover:border-primary/50'
        }
        ${
          template.isComingSoon
            ? 'opacity-60 cursor-not-allowed'
            : 'cursor-pointer'
        }
      `}
      onClick={() => onSelect(template.id)}
    >
      <div className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-800">
        {/* Template Thumbnail */}
        <img
          src={template.thumbnail}
          alt={`${template.name} template`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Coming Soon overlay */}
        {template.isComingSoon && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <Lock className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-sm font-medium">Coming Soon</span>
          </div>
        )}

        {/* Selected indicator */}
        {isSelected && !template.isComingSoon && (
          <div className="absolute top-2 right-2">
            <div className="bg-primary text-primary-foreground rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-1">{template.name}</h3>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </div>
    </div>
  );
}

export default TemplatePage;
