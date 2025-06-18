import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { TextComparison } from '@/components/ui/text-comparison';
import { Textarea } from '@/components/ui/textarea';
import { useLLM } from '@/lib/llm';
import { hasAICapability } from '@/lib/utils';
import {
  ExtendedExperience,
  FormPath,
  ResumeFormData,
} from '@/lib/validationSchema';
import { ResumeData } from '@/stores/resumeStore';
import { TemplateSection } from '@/templates';
import { Loader2, PlusCircle, Sparkles, Trash2, ZapIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { UseFormReturn } from 'node_modules/react-hook-form/dist/types/form';
import { useEffect, useRef, useState } from 'react';

const springConfig = { stiffness: 300, damping: 30 };

// Component for a single responsibility item
interface ResponsibilityItemProps {
  value: string;
  index: number;
  onChange: (value: string) => void;
  onDelete: () => void;
  registerRef: (element: HTMLTextAreaElement | null) => void;
}

function ResponsibilityItem({
  value,
  index,
  onChange,
  onDelete,
  registerRef,
}: ResponsibilityItemProps) {
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishedText, setPolishedText] = useState<string | null>(null);
  const [hasAI, setHasAI] = useState(true);
  const { polishBullet, isInitialized } = useLLM();

  // Check if device supports AI features
  useEffect(() => {
    setHasAI(hasAICapability());
  }, []);

  const handlePolishBullet = async () => {
    if (!value.trim() || !isInitialized) return;

    try {
      setIsPolishing(true);
      const result = await polishBullet(value);
      if (result.success) {
        setPolishedText(result.polishedText);
      } else {
        console.error('Failed to polish bullet:', result.error);
      }
    } catch (err) {
      console.error('Error polishing bullet:', err);
    } finally {
      setIsPolishing(false);
    }
  };

  const handleAcceptPolishedText = () => {
    if (polishedText) {
      onChange(polishedText);
      setPolishedText(null);
    }
  };

  const handleRejectPolishedText = () => {
    setPolishedText(null);
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${Math.max(38, target.scrollHeight)}px`;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            placeholder={`Responsibility ${index + 1}`}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full py-2 min-h-0 resize-none overflow-hidden transition-all"
            style={{
              height: 'auto',
              minHeight: '38px',
            }}
            onInput={handleTextareaInput}
            ref={registerRef}
          />
          <div className="flex justify-end mt-1">
            {hasAI && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground opacity-70 hover:opacity-100 h-6 px-2"
                type="button"
                onClick={handlePolishBullet}
                disabled={!value.trim() || isPolishing || !isInitialized}
              >
                {isPolishing ? (
                  <>
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    Polishing...
                  </>
                ) : (
                  <>
                    <ZapIcon className="h-3 w-3 mr-1" />
                    Polish bullet
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {polishedText && (
        <TextComparison
          originalText={value}
          enhancedText={polishedText}
          onAccept={handleAcceptPolishedText}
          onReject={handleRejectPolishedText}
        />
      )}
    </div>
  );
}

// Component for the responsibilities list
interface ResponsibilitiesListProps {
  experience: ExtendedExperience;
  index: number;
  form: UseFormReturn<ResumeFormData>;
  textareaRefs: React.MutableRefObject<Map<string, HTMLTextAreaElement[]>>;
  updateExperience: (id: string, data: Partial<ExtendedExperience>) => void;
}

function ResponsibilitiesList({
  experience,
  index,
  form,
  textareaRefs,
  updateExperience,
}: ResponsibilitiesListProps) {
  const handleResponsibilityChange = (respIndex: number, value: string) => {
    const newResponsibilities = [...(experience.keyResponsibilities || [])];
    newResponsibilities[respIndex] = value;
    updateExperience(experience.id, {
      keyResponsibilities: newResponsibilities,
    });
    form.setValue(
      `experiences.${index}.keyResponsibilities` as FormPath,
      newResponsibilities
    );
  };

  const handleResponsibilityDelete = (respIndex: number) => {
    const newResponsibilities = (experience.keyResponsibilities || []).filter(
      (_, i) => i !== respIndex
    );
    updateExperience(experience.id, {
      keyResponsibilities: newResponsibilities,
    });
    form.setValue(
      `experiences.${index}.keyResponsibilities` as FormPath,
      newResponsibilities
    );
  };

  const handleAddResponsibility = () => {
    const newResponsibilities = [...(experience.keyResponsibilities || []), ''];
    updateExperience(experience.id, {
      keyResponsibilities: newResponsibilities,
    });
    form.setValue(
      `experiences.${index}.keyResponsibilities` as FormPath,
      newResponsibilities
    );

    // Focus the new textarea after it's rendered
    setTimeout(() => {
      const newIndex = (experience.keyResponsibilities || []).length;
      const textareas = textareaRefs.current.get(experience.id) || [];
      if (textareas[newIndex]) {
        textareas[newIndex].focus();
      }
    }, 100);
  };

  const registerTextareaRef =
    (respIndex: number) => (element: HTMLTextAreaElement | null) => {
      if (!element) return;

      if (!textareaRefs.current.has(experience.id)) {
        textareaRefs.current.set(experience.id, []);
      }

      const refs = textareaRefs.current.get(experience.id) || [];
      refs[respIndex] = element;
      textareaRefs.current.set(experience.id, refs);
    };

  return (
    <FormField
      control={form.control}
      name={`experiences.${index}.keyResponsibilities` as FormPath}
      render={() => (
        <FormItem className="mt-4">
          <FormLabel className="flex items-center">
            Key Responsibilities
          </FormLabel>
          <FormControl>
            <div className="space-y-2">
              {(experience.keyResponsibilities || []).map(
                (responsibility, respIndex) => (
                  <ResponsibilityItem
                    key={respIndex}
                    value={responsibility}
                    index={respIndex}
                    onChange={(value) =>
                      handleResponsibilityChange(respIndex, value)
                    }
                    onDelete={() => handleResponsibilityDelete(respIndex)}
                    registerRef={registerTextareaRef(respIndex)}
                  />
                )
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddResponsibility}
                className="mt-2 w-full flex items-center justify-center text-sm hover:bg-accent"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Responsibility
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Component for the job information
interface JobInfoFieldsProps {
  section: TemplateSection;
  experience: ExtendedExperience;
  index: number;
  form: UseFormReturn<ResumeFormData>;
  updateExperience: (id: string, data: Partial<ExtendedExperience>) => void;
  fieldIds: string[];
}

function JobInfoFields({
  section,
  experience,
  index,
  form,
  updateExperience,
  fieldIds,
}: JobInfoFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {section.fields
        .filter((f) => fieldIds.includes(f.id))
        .map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`experiences.${index}.${field.id}` as FormPath}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      field.id === 'endDate' && experience.current
                        ? 'Present'
                        : field.placeholder
                    }
                    disabled={field.id === 'endDate' && experience.current}
                    value={formField.value as string}
                    onChange={(e) => {
                      formField.onChange(e);
                      updateExperience(experience.id, {
                        [field.id]: e.target.value,
                      });
                    }}
                    onBlur={formField.onBlur}
                    name={formField.name}
                    ref={formField.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
    </div>
  );
}

// Component for job description
interface JobDescriptionProps {
  section: TemplateSection;
  experience: ExtendedExperience;
  index: number;
  form: UseFormReturn<ResumeFormData>;
  updateExperience: (id: string, data: Partial<ExtendedExperience>) => void;
}

function JobDescription({
  section,
  experience,
  index,
  form,
  updateExperience,
}: JobDescriptionProps) {
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishedDescription, setPolishedDescription] = useState<string | null>(
    null
  );
  const [isStructuring, setIsStructuring] = useState(false);
  const [structured, setStructured] = useState<{
    summary: string;
    bullets: string[];
  } | null>(null);
  const [hasAI, setHasAI] = useState(true);
  const { polishSummary, structureJobDescription, isInitialized } = useLLM();

  // Check if device supports AI features
  useEffect(() => {
    setHasAI(hasAICapability());
  }, []);

  const handlePolishDescription = async () => {
    const currentDescription = experience.description;
    if (!currentDescription || !isInitialized) return;

    try {
      setIsPolishing(true);
      // Using polishSummary since it's more appropriate for longer text
      const result = await polishSummary(currentDescription);

      if (result.success) {
        setPolishedDescription(result.polishedText);
      } else {
        console.error('Failed to polish description:', result.error);
      }
    } catch (err) {
      console.error('Error polishing description:', err);
    } finally {
      setIsPolishing(false);
    }
  };

  const handleAcceptPolishedDescription = () => {
    if (polishedDescription) {
      updateExperience(experience.id, {
        description: polishedDescription,
      });
      form.setValue(
        `experiences.${index}.description` as FormPath,
        polishedDescription
      );
      setPolishedDescription(null);
    }
  };

  const handleRejectPolishedDescription = () => {
    setPolishedDescription(null);
  };

  // ----------- Structure generation handlers ----------
  const handleGenerateStructure = async () => {
    const inputText = experience.description;
    if (!inputText || !isInitialized) return;

    try {
      setIsStructuring(true);
      const result = await structureJobDescription(inputText);
      if (result.success) {
        setStructured({ summary: result.summary, bullets: result.bullets });
      } else {
        console.error('Failed to generate structure:', result.error);
      }
    } catch (err) {
      console.error('Error generating structure:', err);
    } finally {
      setIsStructuring(false);
    }
  };

  const handleAcceptStructured = () => {
    if (!structured) return;

    updateExperience(experience.id, {
      description: structured.summary,
      keyResponsibilities: structured.bullets,
    });

    form.setValue(
      `experiences.${index}.description` as FormPath,
      structured.summary
    );
    form.setValue(
      `experiences.${index}.keyResponsibilities` as FormPath,
      structured.bullets
    );

    setStructured(null);
  };

  const handleRejectStructured = () => {
    setStructured(null);
  };

  return (
    <>
      {section.fields
        .filter((f) => f.id === 'description')
        .map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`experiences.${index}.description` as FormPath}
            render={({ field: formField }) => (
              <FormItem className="mt-4">
                <FormLabel className="flex items-center">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder={field.placeholder}
                      className="min-h-24"
                      value={(formField.value as string) || ''}
                      onChange={(e) => {
                        formField.onChange(e);
                        updateExperience(experience.id, {
                          description: e.target.value,
                        });
                      }}
                      onBlur={formField.onBlur}
                      name={formField.name}
                      ref={formField.ref}
                    />
                    {hasAI && (
                      <div className="absolute right-2 bottom-2 flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          className="text-xs text-muted-foreground opacity-70 hover:opacity-100"
                          onClick={handlePolishDescription}
                          disabled={
                            !experience.description ||
                            isPolishing ||
                            !isInitialized
                          }
                        >
                          {isPolishing ? (
                            <>
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              Polishing...
                            </>
                          ) : (
                            <>
                              <ZapIcon className="h-3 w-3 mr-1" />
                              Polish
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          className="text-xs text-muted-foreground opacity-70 hover:opacity-100"
                          onClick={handleGenerateStructure}
                          disabled={
                            !experience.description ||
                            isStructuring ||
                            !isInitialized
                          }
                        >
                          {isStructuring ? (
                            <>
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-3 w-3 mr-1" />
                              Generate
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />

                {polishedDescription && (
                  <TextComparison
                    originalText={experience.description || ''}
                    enhancedText={polishedDescription}
                    onAccept={handleAcceptPolishedDescription}
                    onReject={handleRejectPolishedDescription}
                    className="mt-3"
                  />
                )}

                {structured && (
                  <div className="mt-3 p-4 border rounded-md bg-muted/10">
                    <h4 className="font-medium mb-2">
                      AI generated suggestion
                    </h4>
                    <p className="whitespace-pre-wrap">{structured.summary}</p>
                    {structured.bullets.length > 0 && (
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        {structured.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" onClick={handleAcceptStructured}>
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleRejectStructured}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                )}
              </FormItem>
            )}
          />
        ))}
    </>
  );
}

// Main Experience component
function Experience({
  section,
  form,
  handleAddExperience,
  resumeData,
  removeExperience,
  updateExperience,
}: {
  section: TemplateSection;
  form: UseFormReturn<ResumeFormData>;
  handleAddExperience: () => void;
  resumeData: ResumeData;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, data: Partial<ExtendedExperience>) => void;
}) {
  const textareaRefs = useRef<Map<string, HTMLTextAreaElement[]>>(new Map());

  // Adjust height of textareas when they first render or when content changes
  useEffect(() => {
    // Give a small delay to ensure the DOM is fully rendered
    const timeoutId = setTimeout(() => {
      textareaRefs.current.forEach((textareas) => {
        textareas.forEach((textarea) => {
          if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
          }
        });
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [resumeData.experiences]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          {section.title}
        </h2>
        <div className="w-8 h-8 rounded-full flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
          <span className="text-emerald-600 dark:text-emerald-400 text-sm">
            💼
          </span>
        </div>
      </div>

      <Separator className="bg-gradient-to-r from-emerald-200 to-blue-200 dark:from-emerald-800 dark:to-blue-800 h-px" />

      {resumeData.experiences.map((exp, index) => {
        // Cast to extended type for form usage
        const experience = exp as ExtendedExperience;

        return (
          <motion.div
            key={experience.id || index}
            className="p-6 border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl mb-6 shadow-sm hover:shadow-md transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfig}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs border border-emerald-200 dark:border-emerald-800">
                  {index + 1}
                </div>
                <h3 className="text-lg font-medium text-emerald-700 dark:text-emerald-300">
                  Experience {index + 1}
                </h3>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-8 w-8 hover:scale-110 transition-transform duration-200"
                onClick={() => removeExperience(experience.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Job Title and Company */}
            <JobInfoFields
              section={section}
              experience={experience}
              index={index}
              form={form}
              updateExperience={updateExperience}
              fieldIds={['jobTitle', 'company']}
            />

            {/* Start Date and End Date */}
            <JobInfoFields
              section={section}
              experience={experience}
              index={index}
              form={form}
              updateExperience={updateExperience}
              fieldIds={['startDate', 'endDate']}
            />

            {/* Job Description */}
            <JobDescription
              section={section}
              experience={experience}
              index={index}
              form={form}
              updateExperience={updateExperience}
            />

            {/* Key Responsibilities */}
            {section.fields
              .filter((f) => f.id === 'keyResponsibilities')
              .map((field) => (
                <ResponsibilitiesList
                  key={field.id}
                  experience={experience}
                  index={index}
                  form={form}
                  textareaRefs={textareaRefs}
                  updateExperience={updateExperience}
                />
              ))}
          </motion.div>
        );
      })}

      {resumeData.experiences.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed border-emerald-200/60 dark:border-emerald-800/40 rounded-xl">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200 dark:border-emerald-800">
            <span className="text-emerald-600 dark:text-emerald-400 text-lg">
              💼
            </span>
          </div>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-3">
            No experiences added yet
          </p>
          <Button
            type="button"
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
            onClick={handleAddExperience}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add your first experience
          </Button>
        </div>
      )}

      {resumeData.experiences.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddExperience}
            className="flex items-center gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20 transition-all duration-200 hover:scale-105"
          >
            <PlusCircle className="h-4 w-4" />
            Add Experience
          </Button>
        </div>
      )}
    </div>
  );
}

export default Experience;
