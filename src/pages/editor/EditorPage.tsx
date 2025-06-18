import { Form } from '@/components/ui/form';
import { exportElementToPDF } from '@/lib/utils';
import { resumeFormSchema, type ResumeFormData } from '@/lib/validationSchema';
import { Education, Experience, useResumeStore } from '@/stores/resumeStore';
import { getTemplateById, Template, templates } from '@/templates';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import MobilePreviewDrawer from './components/MobilePreviewDrawer';
import PreviewPanel from './components/PreviewPanel';
import SectionForm from './components/SectionForm';

export default function EditorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [template, setTemplate] = useState<Template | undefined>();
  const [currentSection, setCurrentSection] = useState('personalInfo');
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const resumeData = useResumeStore((state) => state.resumeData);
  const setPersonalInfo = useResumeStore((state) => state.setPersonalInfo);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);
  const setSkills = useResumeStore((state) => state.setSkills);

  const previewRef = useRef<HTMLDivElement>(null);
  const mobilePreviewRef = useRef<HTMLDivElement>(null);

  const form = useForm<ResumeFormData>({
    resolver: yupResolver(resumeFormSchema),
    defaultValues: {
      personalInfo: resumeData.personalInfo,
      experiences: resumeData.experiences,
      educations: resumeData.educations,
      skills: resumeData.skills,
    },
  });

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

  // Update form when store changes
  useEffect(() => {
    form.reset({
      personalInfo: resumeData.personalInfo,
      experiences: resumeData.experiences,
      educations: resumeData.educations,
      skills: resumeData.skills,
    });
  }, [form, resumeData]);

  const exportPDF = async () => {
    const targetRef = previewRef.current || mobilePreviewRef.current;
    if (!targetRef) return;

    try {
      setIsExporting(true);
      const name = resumeData.personalInfo.fullName || 'Resume';
      await exportElementToPDF(targetRef, name);
      setIsExporting(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsExporting(false);
    }
  };

  // Update store when form changes (autosave functionality)
  const onPersonalInfoChange = (data: ResumeFormData['personalInfo']) => {
    setPersonalInfo(data);
  };

  const handleAddExperience = () => {
    const newExperience: Omit<Experience, 'id'> = {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      keyResponsibilities: [],
    };
    addExperience(newExperience);
  };

  const handleAddEducation = () => {
    const newEducation: Omit<Education, 'id'> = {
      degree: '',
      school: '',
      startDate: '',
      endDate: '',
    };
    addEducation(newEducation);
  };

  const handleAddSkill = () => {
    setSkills([...resumeData.skills, '']);
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

  return (
    <div className="h-screen container mx-auto flex overflow-hidden bg-background">
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form Content */}
        <motion.div
          className="flex-1 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="h-full overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              <Form {...form}>
                <form className="h-full">
                  <SectionForm
                    template={template}
                    currentSection={currentSection}
                    form={form}
                    resumeData={resumeData}
                    onSectionChange={setCurrentSection}
                    onPreviewClick={() => setMobilePreviewOpen(true)}
                    onExportPDF={exportPDF}
                    isExporting={isExporting}
                    onPersonalInfoChange={onPersonalInfoChange}
                    handleAddExperience={handleAddExperience}
                    removeExperience={removeExperience}
                    updateExperience={updateExperience}
                    handleAddEducation={handleAddEducation}
                    removeEducation={removeEducation}
                    updateEducation={updateEducation}
                    handleAddSkill={handleAddSkill}
                    setSkills={setSkills}
                  />
                </form>
              </Form>
            </div>
          </div>
        </motion.div>

        {/* Right Preview Panel - Desktop Only (Larger) */}
        <motion.div
          className="w-[480px] flex-shrink-0 hidden xl:block"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <PreviewPanel
            ref={previewRef}
            template={template}
            resumeData={resumeData}
            onExportPDF={exportPDF}
            isExporting={isExporting}
            onMaximize={() => setMobilePreviewOpen(true)}
          />
        </motion.div>
      </div>

      {/* Mobile Preview Drawer */}
      <MobilePreviewDrawer
        ref={mobilePreviewRef}
        open={mobilePreviewOpen}
        onOpenChange={setMobilePreviewOpen}
        template={template}
        resumeData={resumeData}
        onExportPDF={exportPDF}
        isExporting={isExporting}
      />
    </div>
  );
}
