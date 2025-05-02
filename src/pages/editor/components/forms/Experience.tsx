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

  // Function to register and keep track of textarea refs
  const registerTextareaRef = (
    experienceId: string,
    index: number,
    element: HTMLTextAreaElement | null
  ) => {
    if (!element) return;

    if (!textareaRefs.current.has(experienceId)) {
      textareaRefs.current.set(experienceId, []);
    }

    const refs = textareaRefs.current.get(experienceId) || [];
    refs[index] = element;
    textareaRefs.current.set(experienceId, refs);
  };

  return (
    <div key={section.id} className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{section.title}</h2>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields
                .filter((f) => ['jobTitle', 'company'].includes(f.id))
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
                            placeholder={field.placeholder}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {section.fields
                .filter((f) => ['startDate', 'endDate'].includes(f.id))
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
                            disabled={
                              field.id === 'endDate' && experience.current
                            }
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
                            onClick={() => {
                              /* LLM enhancement will be added later */
                            }}
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

            {section.fields
              .filter((f) => f.id === 'keyResponsibilities')
              .map((field) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`experiences.${index}.keyResponsibilities` as FormPath}
                  render={({ field: formField }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="flex items-center">
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {(experience.keyResponsibilities || []).map(
                            (responsibility, respIndex) => (
                              <div key={respIndex} className="flex gap-2">
                                <div className="flex-1 relative">
                                  <Textarea
                                    placeholder={`Responsibility ${
                                      respIndex + 1
                                    }`}
                                    value={responsibility || ''}
                                    onChange={(e) => {
                                      const newResponsibilities = [
                                        ...(experience.keyResponsibilities ||
                                          []),
                                      ];
                                      newResponsibilities[respIndex] =
                                        e.target.value;
                                      formField.onChange(newResponsibilities);
                                      updateExperience(experience.id, {
                                        keyResponsibilities:
                                          newResponsibilities,
                                      });
                                    }}
                                    className="w-full py-2 min-h-0 resize-none overflow-hidden transition-all"
                                    style={{
                                      height: 'auto',
                                      minHeight: '38px',
                                    }}
                                    onInput={(e) => {
                                      const target =
                                        e.target as HTMLTextAreaElement;
                                      target.style.height = 'auto';
                                      target.style.height = `${Math.max(
                                        38,
                                        target.scrollHeight
                                      )}px`;
                                    }}
                                    ref={(el) =>
                                      registerTextareaRef(
                                        experience.id,
                                        respIndex,
                                        el
                                      )
                                    }
                                  />
                                  <div className="flex justify-end mt-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-xs text-muted-foreground opacity-70 hover:opacity-100 h-6 px-2"
                                      type="button"
                                      onClick={() => {
                                        /* LLM enhancement will be added later */
                                      }}
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
                                  onClick={() => {
                                    const newResponsibilities = (
                                      experience.keyResponsibilities || []
                                    ).filter((_, i) => i !== respIndex);
                                    formField.onChange(newResponsibilities);
                                    updateExperience(experience.id, {
                                      keyResponsibilities: newResponsibilities,
                                    });
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newResponsibilities = [
                                ...(experience.keyResponsibilities || []),
                                '',
                              ];
                              formField.onChange(newResponsibilities);
                              updateExperience(experience.id, {
                                keyResponsibilities: newResponsibilities,
                              });

                              // Focus the new textarea after it's rendered
                              setTimeout(() => {
                                const newIndex = (
                                  experience.keyResponsibilities || []
                                ).length;
                                const textareas =
                                  textareaRefs.current.get(experience.id) || [];
                                if (textareas[newIndex]) {
                                  textareas[newIndex].focus();
                                }
                              }, 100);
                            }}
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
    </div>
  );
}

export default Experience;
