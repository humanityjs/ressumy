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
  ExtendedEducation,
  FormPath,
  ResumeFormData,
} from '@/lib/validationSchema';
import { ResumeData } from '@/stores/resumeStore';
import { TemplateSection } from '@/templates';
import { PlusCircle, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { UseFormReturn } from 'react-hook-form';

function EducationSection({
  section,
  form,
  handleAddEducation,
  resumeData,
  removeEducation,
  updateEducation,
}: {
  section: TemplateSection;
  form: UseFormReturn<ResumeFormData>;
  handleAddEducation: () => void;
  resumeData: ResumeData;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, data: Partial<ExtendedEducation>) => void;
}) {
  const springConfig = { stiffness: 300, damping: 30 };

  return (
    <div key={section.id} className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{section.title}</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddEducation}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      <Separator className="my-4" />

      {resumeData.educations.map((edu, index) => {
        // Cast to extended type for form usage
        const education = edu as ExtendedEducation;

        return (
          <motion.div
            key={education.id || index}
            className="p-4 border rounded-md mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfig}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Education {index + 1}</h3>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeEducation(education.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields
                .filter((f) => ['degree', 'school'].includes(f.id))
                .map((field) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`educations.${index}.${field.id}` as FormPath}
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
                              updateEducation(education.id, {
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
                    name={`educations.${index}.${field.id}` as FormPath}
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
                              field.id === 'endDate' && education.current
                                ? 'Present'
                                : field.placeholder
                            }
                            disabled={
                              field.id === 'endDate' && education.current
                            }
                            value={formField.value as string}
                            onChange={(e) => {
                              formField.onChange(e);
                              updateEducation(education.id, {
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

            {education.description !== undefined && (
              <FormField
                control={form.control}
                name={`educations.${index}.description` as FormPath}
                render={({ field: formField }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-24"
                        value={(formField.value as string) || ''}
                        onChange={(e) => {
                          formField.onChange(e);
                          // Type assertion since description is not in base Education type
                          updateEducation(education.id, {
                            description: e.target.value,
                          } as Partial<ExtendedEducation>);
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
            )}
          </motion.div>
        );
      })}

      {resumeData.educations.length === 0 && (
        <div className="text-center p-6 border border-dashed rounded-md">
          <p className="text-muted-foreground">No education added yet</p>
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={handleAddEducation}
          >
            Add your first education
          </Button>
        </div>
      )}
    </div>
  );
}

export default EducationSection;
