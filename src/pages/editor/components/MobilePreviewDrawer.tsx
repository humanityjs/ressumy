import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ResumeData } from '@/stores/resumeStore';
import { Template } from '@/templates';
import { motion } from 'framer-motion';
import { Download, Smartphone } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';

interface MobilePreviewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template;
  resumeData: ResumeData;
  onExportPDF: () => void;
  isExporting: boolean;
}

const MobilePreviewDrawer = forwardRef<
  HTMLDivElement,
  MobilePreviewDrawerProps
>(
  (
    { open, onOpenChange, template, resumeData, onExportPDF, isExporting },
    ref
  ) => {
    const [previewScale, setPreviewScale] = useState(1);
    const [isMobilePreview, setIsMobilePreview] = useState(false);

    // Mobile preview detection and scaling
    useEffect(() => {
      const updatePreviewScale = () => {
        if (typeof window !== 'undefined') {
          const viewportWidth = window.innerWidth;
          const A4_WIDTH_PX = 794; // A4 width in pixels at 96 DPI (210mm)

          // Consider mobile if viewport is smaller than A4 width + some padding
          const isMobile = viewportWidth < A4_WIDTH_PX + 100;
          setIsMobilePreview(isMobile);

          if (isMobile) {
            // Calculate scale to fit with padding
            const availableWidth = viewportWidth - 64; // Account for padding
            const scale = Math.min(availableWidth / A4_WIDTH_PX, 0.85); // Max 85% scale
            setPreviewScale(scale);
          } else {
            setPreviewScale(1);
          }
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
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:w-[min(100vw,80vw)] sm:max-w-none p-0 overflow-y-auto"
        >
          <div className="h-full flex flex-col">
            <SheetHeader className="p-4 sm:p-6 border-b">
              <div className="flex justify-between items-start gap-4 pr-8">
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-lg sm:text-xl">
                    Resume Preview
                  </SheetTitle>
                  {/* Mobile scaling info */}
                  {isMobilePreview && (
                    <motion.div
                      className="flex items-center gap-2 mt-1 text-xs text-muted-foreground"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>
                        Preview scaled to {Math.round(previewScale * 100)}% for
                        mobile viewing
                      </span>
                    </motion.div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <Button
                    onClick={onExportPDF}
                    disabled={isExporting}
                    size="sm"
                    className={
                      isExporting ? 'opacity-70 cursor-not-allowed' : ''
                    }
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isExporting ? 'Exporting...' : 'Export PDF'}
                  </Button>
                </div>
              </div>
            </SheetHeader>

            {/* Mobile scale notice */}
            {isMobilePreview && (
              <motion.div
                className="px-4 py-3 bg-blue-50 dark:bg-blue-950/30 border-b border-blue-200 dark:border-blue-800"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 dark:text-blue-100">
                      Mobile Preview Notice
                    </p>
                    <p className="text-blue-700 dark:text-blue-200 mt-1">
                      This preview is scaled down to fit your screen. The actual
                      PDF export will maintain full size and quality with
                      original formatting.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col items-center">
              <div
                className="transition-transform duration-300 origin-top"
                style={{
                  transform: `scale(${previewScale})`,
                  transformOrigin: 'top center',
                }}
              >
                <div
                  ref={ref}
                  className="bg-white text-black shadow-lg w-full max-w-[210mm]"
                  style={{
                    minHeight: '297mm', // A4 height
                    padding: '20mm', // Full padding for accurate preview
                    width: '210mm', // Exact A4 width
                  }}
                >
                  <TemplateComponent data={resumeData} />
                </div>
              </div>

              {/* Mobile footer info */}
              {isMobilePreview && (
                <motion.div
                  className="mt-6 p-4 bg-muted/50 rounded-lg max-w-sm text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs text-muted-foreground">
                    💡 <strong>Tip:</strong> For the best editing experience,
                    try using a tablet or desktop when available.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
);

MobilePreviewDrawer.displayName = 'MobilePreviewDrawer';

export default MobilePreviewDrawer;
