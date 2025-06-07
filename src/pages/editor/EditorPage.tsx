import { Button } from '@/components/ui/button';
import { LLMInitializer } from '@/components/ui/llm-initializer';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { exportElementToPDF } from '@/lib/utils';
import { useResumeStore } from '@/stores/resumeStore';
import { getTemplateById, Template, templates } from '@/templates';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Eye, Save, Smartphone } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router';
import { ResumeForm } from './components/forms/ResumeForm';

interface ContextualNavProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

interface OutletContext {
  updateContextualNav: (navProps: ContextualNavProps | null) => void;
}

export default function EditorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [template, setTemplate] = useState<Template | undefined>();
  const { updateContextualNav } = useOutletContext<OutletContext>();
  const resumeData = useResumeStore((state) => state.resumeData);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isContextualNavActive, setIsContextualNavActive] = useState(false);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const headerRef = React.useRef<HTMLDivElement>(null);

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

  // Mobile preview detection and scaling
  useEffect(() => {
    const updatePreviewScale = () => {
      if (typeof window !== 'undefined') {
        const viewportWidth = window.innerWidth;
        const A4_WIDTH_PX = 794; // A4 width in pixels at 96 DPI (210mm)
        
        // Consider mobile if viewport is smaller than A4 width + some padding
        const isMobile = viewportWidth < (A4_WIDTH_PX + 100);
        setIsMobilePreview(isMobile);
        
        if (isMobile) {
          // Calculate scale to fit with padding
          const availableWidth = viewportWidth - 32; // Account for padding
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

  // Scroll detection effect with earlier trigger
  React.useEffect(() => {
    if (!template) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsContextualNavActive(!isVisible);
        
        if (!isVisible) {
          // Header is about to go out of view, show contextual nav
          updateContextualNav({
            title: 'Resume Editor',
            subtitle: `Template: ${template.name}`,
            actions: (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewOpen(true)}
                  data-action="preview"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  data-action="save"
                  disabled
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
              </>
            ),
          });
        } else {
          // Header is visible, hide contextual nav
          updateContextualNav(null);
        }
      },
      { 
        threshold: 0.8, // Trigger earlier when 80% is still visible
        rootMargin: '-64px 0px 0px 0px' // Account for header height (64px)
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      observer.disconnect();
      updateContextualNav(null); // Clean up when component unmounts
    };
  }, [updateContextualNav, template, setPreviewOpen]);

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
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 flex items-center justify-center min-h-[60vh]">
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
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-6xl">
      {/* Original Header - now being observed with animations */}
      <div ref={headerRef} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ 
            opacity: isContextualNavActive ? 0.3 : 1,
            y: isContextualNavActive ? -5 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold">Resume Editor</h1>
          <p className="text-muted-foreground text-sm">
            Template: {template.name}
          </p>
        </motion.div>
        
        {/* Original action buttons with smooth exit animation */}
        <AnimatePresence>
          {!isContextualNavActive && (
            <motion.div 
              className="flex gap-2 self-start sm:self-auto"
              initial={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0.95, 
                x: 20,
                transition: { duration: 0.2 }
              }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewOpen(true)}
                data-action="preview"
                className="flex-1 sm:flex-none"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                data-action="save"
                className="flex-1 sm:flex-none"
                disabled
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main content - Form only */}
      <div className="max-w-3xl mx-auto">
        <LLMInitializer />
        <div className="bg-card rounded-lg p-4 sm:p-6 border shadow-sm">
          <ResumeForm template={template} />
        </div>
      </div>

      {/* Preview Sheet (slides in from right) */}
      <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
        <SheetContent
          side="right"
          className="w-full sm:w-[min(100vw,80vw)] sm:max-w-none p-0 overflow-y-auto"
        >
          <div className="h-full flex flex-col">
            <SheetHeader className="p-4 sm:p-6 border-b">
              <div className="flex justify-between items-start gap-4 pr-8">
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-lg sm:text-xl">Resume Preview</SheetTitle>
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
                        Preview scaled to {Math.round(previewScale * 100)}% for mobile viewing
                      </span>
                    </motion.div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <Button
                    onClick={exportPDF}
                    disabled={isExporting}
                    size="sm"
                    className={isExporting ? 'opacity-70 cursor-not-allowed' : ''}
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
                      This preview is scaled down to fit your screen. The actual PDF export will maintain full size and quality with original formatting.
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
                  ref={previewRef}
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
                    💡 <strong>Tip:</strong> For the best editing experience, try using a tablet or desktop when available.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
