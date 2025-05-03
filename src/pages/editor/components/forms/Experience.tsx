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
import { Textarea } from '@/components/ui/textarea';
import {
  ExtendedExperience,
  FormPath,
  ResumeFormData,
} from '@/lib/validationSchema';
import { ResumeData } from '@/stores/resumeStore';
import { TemplateSection } from '@/templates';
import { PlusCircle, Trash2, ZapIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { UseFormReturn } from 'node_modules/react-hook-form/dist/types/form';
import { useEffect, useRef } from 'react';

const springConfig = { stiffness: 300, damping: 30 };

// Component for a single responsibility item
interface ResponsibilityItemProps {
  value: string;
  index: number;
  experienceId: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  registerRef: (element: HTMLTextAreaElement | null) => void;
}

function ResponsibilityItem({
  value,
  index,
  experienceId,
  onChange,
  onDelete,
  registerRef,
}: ResponsibilityItemProps) {
  const handlePolishBullet = () => {
    // LLM enhancement will be added later
    console.log('Polish bullet for', experienceId, 'index', index);
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${Math.max(38, target.scrollHeight)}px`;
  };

  return (
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
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground opacity-70 hover:opacity-100 h-6 px-2"
            type="button"
            onClick={handlePolishBullet}
          >
            <ZapIcon className="h-3 w-3 mr-1" />
            Polish bullet
          </Button>
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
                    experienceId={experience.id}
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
  const handlePolishDescription = () => {
    // LLM enhancement will be added later
    console.log('Polish description for', experience.id);
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 bottom-2 text-xs text-muted-foreground opacity-70 hover:opacity-100"
                      type="button"
                      onClick={handlePolishDescription}
                    >
                      <ZapIcon className="h-3 w-3 mr-1" />
                      Polish bullet
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{section.title}</h2>
      </div>

      <Separator className="my-4" />

      {resumeData.experiences.map((exp, index) => {
        // Cast to extended type for form usage
        const experience = exp as ExtendedExperience;

        return (
          <motion.div
            key={experience.id || index}
            className="p-4 border rounded-md mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfig}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Experience {index + 1}</h3>
              <Button
                type="button"
                variant="destructive"
                size="icon"
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
        <div className="text-center p-6 border border-dashed rounded-md">
          <p className="text-muted-foreground">No experiences added yet</p>
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={handleAddExperience}
          >
            Add your first experience
          </Button>
        </div>
      )}

      {resumeData.experiences.length > 0 && (
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddExperience}
            className="flex items-center gap-1"
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
