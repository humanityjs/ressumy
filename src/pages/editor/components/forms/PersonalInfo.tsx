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
import { FormPath, ResumeFormData } from '@/lib/validationSchema';
import { ResumeData } from '@/stores/resumeStore';
import { TemplateSection } from '@/templates';
import { UseFormReturn } from 'react-hook-form';

function PersonalInfo({
  section,
  form,
  onPersonalInfoChange,
  resumeData,
}: {
  section: TemplateSection;
  form: UseFormReturn<ResumeFormData>;
  onPersonalInfoChange: (data: ResumeFormData['personalInfo']) => void;
  resumeData: ResumeData;
}) {
  return (
    <div key={section.id} className="space-y-4">
      <h2 className="text-2xl font-bold">{section.title}</h2>
      <Separator className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.fields
          .filter((f) => f.id !== 'summary')
          .map((field) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`personalInfo.${field.id}` as FormPath}
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
                      type={field.id === 'email' ? 'email' : 'text'}
                      placeholder={field.placeholder}
                      value={formField.value as string}
                      onChange={(e) => {
                        formField.onChange(e);
                        onPersonalInfoChange({
                          ...resumeData.personalInfo,
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
        .filter((f) => f.id === 'summary')
        .map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`personalInfo.summary` as FormPath}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={field.placeholder}
                    className="min-h-32"
                    value={(formField.value as string) || ''}
                    onChange={(e) => {
                      formField.onChange(e);
                      onPersonalInfoChange({
                        ...resumeData.personalInfo,
                        summary: e.target.value,
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

export default PersonalInfo;
