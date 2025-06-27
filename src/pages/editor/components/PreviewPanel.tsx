import { Button } from '@/components/ui/button';
import { ResumeData } from '@/stores/resumeStore';
import { Template } from '@/templates';
import { motion } from 'framer-motion';
import { Download, Maximize2, Smartphone } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';

interface PreviewPanelProps {
  template: Template;
  resumeData: ResumeData;
  onExportPDF: () => void;
  isExporting: boolean;
  onMaximize: () => void;
}

const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(
  ({ template, resumeData, onExportPDF, isExporting, onMaximize }, ref) => {
    const [previewScale, setPreviewScale] = useState(1);

    // Calculate preview scale based on container size
    useEffect(() => {
      const updatePreviewScale = () => {
        if (typeof window !== 'undefined') {
          const containerWidth = 350; // Approximate width of preview panel
          const A4_WIDTH_PX = 794; // A4 width in pixels at 96 DPI
          const scale = Math.min(containerWidth / A4_WIDTH_PX, 0.45);
          setPreviewScale(scale);
        }
      };

      updatePreviewScale();
      window.addEventListener('resize', updatePreviewScale);

      return () => {
        window.removeEventListener('resize', updatePreviewScale);
      };
    }, []);

    const TemplateComponent = template.component;

    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-50/50 to-blue-50/30 dark:from-slate-900/50 dark:to-blue-950/20 border-l border-blue-200/30 dark:border-blue-800/20">
        {/* Enhanced Preview Header with gradient */}
        <div className="p-4 border-b border-blue-200/30 dark:border-blue-800/20 flex-shrink-0 bg-gradient-to-r from-white/80 to-blue-50/80 dark:from-slate-900/80 dark:to-blue-950/40 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm bg-gradient-to-r from-slate-700 to-blue-700 dark:from-slate-200 dark:to-blue-200 bg-clip-text text-transparent">
              Live Preview
            </h3>
            <div className="flex gap-1">
              <Button
                onClick={onMaximize}
                variant="ghost"
                size="sm"
                className="p-1.5 h-auto hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-all duration-200 hover:scale-110"
                title="Full Screen Preview"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button
                onClick={onExportPDF}
                disabled={isExporting}
                variant="ghost"
                size="sm"
                className="p-1.5 h-auto hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 transition-all duration-200 hover:scale-110 disabled:opacity-50"
                title="Export PDF"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Enhanced scale info with colorful styling */}
          <motion.div
            className="flex items-center gap-2 text-xs bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 px-3 py-1.5 rounded-full border border-blue-200/50 dark:border-blue-800/50"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Smartphone className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Preview scaled to {Math.round(previewScale * 100)}% for panel view
            </span>
          </motion.div>
        </div>

        {/* Preview Content with enhanced background */}
        <div className="flex-1 overflow-hidden relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-pink-50/20 dark:from-blue-950/10 dark:via-purple-950/5 dark:to-pink-950/10" />

          <div className="relative z-10 h-full overflow-y-auto p-4 flex justify-center">
            <motion.div
              className="transition-all duration-300 origin-top hover:scale-105"
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: 'top center',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: previewScale }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div
                ref={ref}
                className="bg-white text-black shadow-xl border border-blue-200/30 rounded-xl overflow-hidden relative"
                style={{
                  width: '210mm', // A4 width
                  minHeight: '297mm', // A4 height
                  padding: '20mm', // Full padding for accurate preview
                }}
              >
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-100/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-100/20 to-transparent pointer-events-none" />

                <TemplateComponent data={resumeData} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Preview Footer */}
        <div className="p-4 border-t border-blue-200/30 dark:border-blue-800/20 flex-shrink-0 bg-gradient-to-r from-white/80 to-blue-50/80 dark:from-slate-900/80 dark:to-blue-950/40 backdrop-blur-sm">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
              ✨ <strong>Real-time Preview:</strong> Changes appear instantly as
              you type
            </p>
          </motion.div>
        </div>
      </div>
    );
  }
);

PreviewPanel.displayName = 'PreviewPanel';

export default PreviewPanel;
