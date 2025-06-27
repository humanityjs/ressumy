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
    <div key={section.id} className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
          {section.title}
        </h2>
        <div className="w-8 h-8 rounded-full flex items-center justify-center border border-orange-200 dark:border-orange-800">
          <span className="text-orange-600 dark:text-orange-400 text-sm">
            🎓
          </span>
        </div>
      </div>

      <Separator className="bg-gradient-to-r from-orange-200 to-yellow-200 dark:from-orange-800 dark:to-yellow-800 h-px" />

      {resumeData.educations.map((edu, index) => {
        // Cast to extended type for form usage
        const education = edu as ExtendedEducation;

        return (
          <motion.div
            key={education.id || index}
            className="p-6 border border-orange-200/50 dark:border-orange-800/30 rounded-xl mb-6 shadow-sm hover:shadow-md transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfig}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs border border-orange-200 dark:border-orange-800">
                  {index + 1}
                </div>
                <h3 className="text-lg font-medium text-orange-700 dark:text-orange-300">
                  Education {index + 1}
                </h3>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-8 w-8 hover:scale-110 transition-transform duration-200"
                onClick={() => removeEducation(education.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.fields
                .filter((f) => ['degree', 'school'].includes(f.id))
                .map((field, fieldIndex) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`educations.${index}.${field.id}` as FormPath}
                    render={({ field: formField }) => (
                      <FormItem className="group">
                        <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                              fieldIndex % 2 === 0
                                ? 'from-orange-400 to-orange-500'
                                : 'from-yellow-400 to-yellow-500'
                            }`}
                          />
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
                            className="border-slate-200 dark:border-slate-700 focus:border-orange-400 dark:focus:border-orange-500 focus:ring-orange-400/20 dark:focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-300 dark:hover:border-orange-600"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {section.fields
                .filter((f) => ['startDate', 'endDate'].includes(f.id))
                .map((field, fieldIndex) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`educations.${index}.${field.id}` as FormPath}
                    render={({ field: formField }) => (
                      <FormItem className="group">
                        <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                              fieldIndex % 2 === 0
                                ? 'from-orange-400 to-orange-500'
                                : 'from-yellow-400 to-yellow-500'
                            }`}
                          />
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
                            className="border-slate-200 dark:border-slate-700 focus:border-orange-400 dark:focus:border-orange-500 focus:ring-orange-400/20 dark:focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-300 dark:hover:border-orange-600 disabled:opacity-60"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
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
                  <FormItem className="mt-6 p-4 rounded-xl border border-orange-200/30 dark:border-orange-800/20">
                    <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your academic achievements, relevant coursework, honors, etc."
                        className="min-h-24 border-orange-200/50 dark:border-orange-800/50 focus:border-orange-400 dark:focus:border-orange-500 focus:ring-orange-400/20 dark:focus:ring-orange-500/20 transition-all duration-200"
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
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            )}
          </motion.div>
        );
      })}

      {resumeData.educations.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed border-orange-200/60 dark:border-orange-800/40 rounded-xl">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 border border-orange-200 dark:border-orange-800">
            <span className="text-orange-600 dark:text-orange-400 text-lg">
              🎓
            </span>
          </div>
          <p className="text-orange-600 dark:text-orange-400 font-medium mb-3">
            No education added yet
          </p>
          <Button
            type="button"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
            onClick={handleAddEducation}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add your first education
          </Button>
        </div>
      )}

      {resumeData.educations.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddEducation}
            className="flex items-center gap-2 border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20 transition-all duration-200 hover:scale-105"
          >
            <PlusCircle className="h-4 w-4" />
            Add Education
          </Button>
        </div>
      )}
    </div>
  );
}

export default EducationSection;
