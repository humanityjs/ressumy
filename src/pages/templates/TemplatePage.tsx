import { Button } from '@/components/ui/button';
import { generateSamplePDF } from '@/lib/utils';
import { Template, templates } from '@/templates';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import FilterPills, { FilterCategory } from './components/FilterPills';
import FilterSection from './components/FilterSection';
import SelectionPanel from './components/SelectionPanel';
import TemplateGrid from './components/TemplateGrid';
import TemplateHero from './components/TemplateHero';

function TemplatePage() {
  const navigate = useNavigate();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [downloadingTemplate, setDownloadingTemplate] = useState<string | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template && !template.isComingSoon) {
      setSelectedTemplateId(
        selectedTemplateId === templateId ? null : templateId
      );
    }
  };

  const handleContinue = () => {
    if (selectedTemplateId) {
      navigate(`/editor?template=${selectedTemplateId}`);
    }
  };

  const handleDownloadSample = (template: Template) => {
    generateSamplePDF(template, setDownloadingTemplate);
  };

  const selectedTemplate = selectedTemplateId
    ? templates.find((t) => t.id === selectedTemplateId) || null
    : null;

  const filteredTemplates =
    activeFilter === 'all'
      ? templates
      : templates.filter((template) => template.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-orange-500/5 to-pink-500/5 rounded-full blur-3xl animate-float animation-delay-4000" />
      </div>

      <div className="relative container mx-auto px-4 py-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </motion.div>

          <TemplateHero />
          <FilterSection />
          <FilterPills
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <TemplateGrid
            templates={templates}
            filteredTemplates={filteredTemplates}
            selectedTemplateId={selectedTemplateId}
            downloadingTemplate={downloadingTemplate}
            onTemplateSelect={handleTemplateSelect}
            onDownloadSample={handleDownloadSample}
            onFilterChange={setActiveFilter}
          />
        </div>
      </div>

      <SelectionPanel
        selectedTemplate={selectedTemplate}
        downloadingTemplate={downloadingTemplate}
        onDownloadSample={handleDownloadSample}
        onContinue={handleContinue}
      />
    </div>
  );
}

export default TemplatePage;
