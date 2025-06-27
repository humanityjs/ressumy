import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Template } from '@/templates';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Award, Check, Download, Palette, Zap } from 'lucide-react';

interface SelectionPanelProps {
  selectedTemplate: Template | null;
  downloadingTemplate: string | null;
  onDownloadSample: (template: Template) => void;
  onContinue: () => void;
}

export default function SelectionPanel({
  selectedTemplate,
  downloadingTemplate,
  onDownloadSample,
  onContinue,
}: SelectionPanelProps) {
  return (
    <AnimatePresence>
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-2xl"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 border-primary/30 shadow-lg">
                  <img
                    src={selectedTemplate.thumbnail}
                    alt={selectedTemplate.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                  <div className="absolute -top-1 -right-1">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-1 shadow-lg">
                      <Check className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {selectedTemplate.name}
                    </span>{' '}
                    Selected
                  </h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    {selectedTemplate.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20"
                  >
                    <Check className="w-2.5 h-2.5" />
                    <span className="text-xs">ATS-Friendly</span>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20"
                  >
                    <Award className="w-2.5 h-2.5" />
                    <span className="text-xs">Professional</span>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20"
                  >
                    <Palette className="w-2.5 h-2.5" />
                    <span className="text-xs">Customizable</span>
                  </Badge>
                </div>
              </div>

              <div className="flex-shrink-0 w-full sm:w-auto">
                <div className="flex flex-row items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownloadSample(selectedTemplate)}
                    disabled={downloadingTemplate === selectedTemplate.id}
                    className="flex items-center gap-2 border-primary/20 hover:bg-primary/5 cursor-pointer h-10 px-4"
                  >
                    {downloadingTemplate === selectedTemplate.id ? (
                      <>
                        <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs hidden sm:inline">
                          Generating...
                        </span>
                        <span className="text-xs sm:hidden">...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3 h-3" />
                        <span className="text-xs hidden sm:inline">Sample</span>
                      </>
                    )}
                  </Button>

                  <Button
                    size="sm"
                    onClick={onContinue}
                    className="group h-10 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Start Building
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
