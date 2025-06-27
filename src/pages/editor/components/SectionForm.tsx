import { LLMInitializer } from '@/components/ui/llm-initializer';
import { ResumeFormData } from '@/lib/validationSchema';
import { ResumeData } from '@/stores/resumeStore';
import { Template } from '@/templates';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Sparkles,
} from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import EducationSection from './forms/EducationSection';
import ExperienceForm from './forms/Experience';
import PersonalInfo from './forms/PersonalInfo';
import SkillsSection from './forms/SkillsSection';

interface SectionFormProps {
  template: Template;
  currentSection: string;
  form: UseFormReturn<ResumeFormData>;
  resumeData: ResumeData;
  onSectionChange: (sectionId: string) => void;
  onPreviewClick: () => void;
  onExportPDF: () => void;
  isExporting: boolean;
  // Personal Info handlers
  onPersonalInfoChange: (data: ResumeFormData['personalInfo']) => void;
  // Experience handlers
  handleAddExperience: () => void;
  removeExperience: (id: string) => void;
  updateExperience: (
    id: string,
    data: Partial<ResumeData['experiences'][0]>
  ) => void;
  // Education handlers
  handleAddEducation: () => void;
  removeEducation: (id: string) => void;
  updateEducation: (
    id: string,
    data: Partial<ResumeData['educations'][0]>
  ) => void;
  // Skills handlers
  handleAddSkill: () => void;
  setSkills: (skills: string[]) => void;
}

export default function SectionForm({
  template,
  currentSection,
  form,
  resumeData,
  onSectionChange,
  onPreviewClick,
  onExportPDF,
  isExporting,
  onPersonalInfoChange,
  handleAddExperience,
  removeExperience,
  updateExperience,
  handleAddEducation,
  removeEducation,
  updateEducation,
  handleAddSkill,
  setSkills,
}: SectionFormProps) {
  const getCurrentSection = () => {
    return template.sections.find((section) => section.id === currentSection);
  };

  const getCurrentSectionIndex = () => {
    return template.sections.findIndex(
      (section) => section.id === currentSection
    );
  };

  const getTotalSections = () => {
    return template.sections.length;
  };

  const renderSectionContent = () => {
    const section = getCurrentSection();
    if (!section) return null;

    switch (section.id) {
      case 'personalInfo':
        return (
          <PersonalInfo
            section={section}
            form={form}
            onPersonalInfoChange={onPersonalInfoChange}
            resumeData={resumeData}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            section={section}
            form={form}
            handleAddExperience={handleAddExperience}
            resumeData={resumeData}
            removeExperience={removeExperience}
            updateExperience={updateExperience}
          />
        );
      case 'education':
        return (
          <EducationSection
            section={section}
            form={form}
            handleAddEducation={handleAddEducation}
            resumeData={resumeData}
            removeEducation={removeEducation}
            updateEducation={updateEducation}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            section={section}
            form={form}
            handleAddSkill={handleAddSkill}
            resumeData={resumeData}
            setSkills={setSkills}
          />
        );
      default:
        return null;
    }
  };

  const section = getCurrentSection();
  const sectionIndex = getCurrentSectionIndex();
  const totalSections = getTotalSections();

  if (!section) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Section not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative">
      {/* Enhanced Section Header - Responsive */}
      <motion.div
        className="relative border-b border-border/50 pb-4 md:pb-6 mb-4 md:mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative z-10 px-3 md:px-6">
          {/* Top row with template info - More compact on mobile */}
          <div className="flex items-center gap-2 mb-3 md:mb-6 mt-3 md:mt-6">
            <span className="text-muted-foreground text-sm md:text-base">
              Template:
            </span>
            <span className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm md:text-base">
              {template.name}
            </span>
            <button
              onClick={() => {}}
              className="text-xs md:text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
            >
              Change
            </button>
          </div>

          <div className="flex items-center justify-between mb-4 flex-col md:flex-row gap-3 md:gap-0">
            <div className="flex items-center gap-2 md:gap-4 flex-col md:flex-row">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent text-center md:text-left">
                  Resume Builder
                </h1>
              </div>

              {/* Enhanced step indicator with colorful design - More compact on mobile */}
              <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm font-medium text-blue-700 dark:text-blue-300">
                  Step {sectionIndex + 1} of {totalSections}
                </span>
                <span className="text-xs text-blue-600/70 dark:text-blue-400/70 bg-blue-50 dark:bg-blue-900/30 px-1.5 md:px-2 py-0.5 rounded-full">
                  {Math.round(((sectionIndex + 1) / totalSections) * 100)}%
                  Complete
                </span>
              </div>
            </div>

            {/* Mobile Actions with icons and beautiful styling */}
            <div className="flex gap-2 xl:hidden">
              <button
                onClick={onPreviewClick}
                data-action="preview"
                className="group flex items-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
              >
                <Eye className="w-4 h-4" />
                <span className="inline">Preview</span>
              </button>
              <button
                onClick={onExportPDF}
                data-action="save"
                disabled={isExporting}
                className="group flex items-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="inline">Exporting...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span className="inline">Export</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Section title and description with enhanced styling - More compact on mobile */}
          <div className="mb-2 md:mb-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2 text-slate-800 dark:text-slate-100 text-center md:text-left">
              {section.title}
            </h2>
            <motion.p
              className="text-muted-foreground text-sm md:text-base text-center md:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {section.id === 'personalInfo' &&
                'Add your basic contact information and professional summary to make a great first impression.'}
              {section.id === 'experience' &&
                'Showcase your work history and key achievements to demonstrate your professional growth.'}
              {section.id === 'education' &&
                'List your educational background including degrees, certifications, and relevant training.'}
              {section.id === 'skills' &&
                'Highlight your technical and soft skills that are relevant to your target position.'}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Form Content with minimal spacing for fixed navigation */}
      <motion.div
        className="flex-1 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ paddingBottom: '90px' }}
      >
        <div className="h-full overflow-y-auto">
          <div className="">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="border border-border/50 rounded-xl p-4 md:p-6 shadow-sm"
              >
                {renderSectionContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Fixed Navigation Bar - Fixed to bottom with proper boundaries */}
      <motion.div
        className="fixed bottom-0 left-0 w-full z-50 "
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="xl:container xl:mx-auto flex items-center justify-between">
          <div className="w-full xl:max-w-5xl xl:mx-auto px-3 py-2 flex-1 bg-background/95 backdrop-blur-md border-t border-border/50 shadow-lg">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              {/* Previous Button - More compact on smaller screens */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const prevIndex = sectionIndex - 1;
                  if (prevIndex >= 0) {
                    onSectionChange(template.sections[prevIndex].id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={sectionIndex === 0}
                className="group flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:shadow-sm transform hover:scale-[1.02] disabled:transform-none"
              >
                <div className="w-7 md:w-8 h-7 md:h-8 rounded-full border border-slate-400 dark:border-slate-500 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:border-slate-500 dark:group-hover:border-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-all duration-200">
                  <ChevronLeft className="w-3 md:w-4 h-3 md:h-4" />
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-sm font-semibold group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
                    Previous
                  </div>
                  {sectionIndex > 0 && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      {template.sections[sectionIndex - 1]?.title}
                    </div>
                  )}
                </div>
              </button>

              {/* Progress indicator - Smaller dots on mobile */}
              <div className="flex items-center gap-1.5 md:gap-2">
                {template.sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 md:w-2.5 h-2 md:h-2.5 rounded-full transition-all duration-300 ${
                      index === sectionIndex
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-sm'
                        : index < sectionIndex
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-sm'
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              {/* Next Button - More compact on smaller screens with enhanced icons */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const nextIndex = sectionIndex + 1;
                  if (nextIndex < template.sections.length) {
                    onSectionChange(template.sections[nextIndex].id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={sectionIndex === template.sections.length - 1}
                className="group flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-[1.02] disabled:transform-none border-0"
              >
                <div className="text-right hidden md:block">
                  <div className="text-sm font-semibold">
                    {sectionIndex === template.sections.length - 1
                      ? 'Complete'
                      : 'Next'}
                  </div>
                  {sectionIndex < template.sections.length - 1 && (
                    <div className="text-xs text-blue-100/90">
                      {template.sections[sectionIndex + 1]?.title}
                    </div>
                  )}
                </div>
                <div className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-200">
                  {sectionIndex === template.sections.length - 1 ? (
                    <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
                  ) : (
                    <ChevronRight className="w-3 md:w-4 h-3 md:h-4" />
                  )}
                </div>
              </button>
            </div>
          </div>
          <div className="w-[480px] flex-shrink-0 hidden xl:block"></div>
        </div>
      </motion.div>

      {/* LLM Initializer */}
      <LLMInitializer />
    </div>
  );
}
