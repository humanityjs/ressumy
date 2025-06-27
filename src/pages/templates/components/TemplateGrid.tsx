import { Button } from '@/components/ui/button';
import { Template } from '@/templates';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { FilterCategory } from './FilterPills';
import TemplateCard from './TemplateCard';

interface TemplateGridProps {
  templates: Template[];
  filteredTemplates: Template[];
  selectedTemplateId: string | null;
  downloadingTemplate: string | null;
  onTemplateSelect: (templateId: string) => void;
  onDownloadSample: (template: Template) => void;
  onFilterChange: (filter: FilterCategory) => void;
}

export default function TemplateGrid({
  filteredTemplates,
  selectedTemplateId,
  downloadingTemplate,
  onTemplateSelect,
  onDownloadSample,
  onFilterChange,
}: TemplateGridProps) {
  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
            >
              <TemplateCard
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={onTemplateSelect}
                onDownloadSample={onDownloadSample}
                isDownloading={downloadingTemplate === template.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredTemplates.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-muted-foreground mb-4">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">
              No templates in this category yet
            </h3>
            <p className="text-sm">
              We're working on adding more templates. Check back soon!
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => onFilterChange('all')}
            className="mt-4"
          >
            View All Templates
          </Button>
        </motion.div>
      )}

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <p className="text-sm text-muted-foreground">
          💡 You can customize colors, fonts, and layout after selecting a
          template
        </p>
      </motion.div>
    </>
  );
}
