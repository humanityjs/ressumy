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
import { FormPath, ResumeFormData } from '@/lib/validationSchema';
import { ResumeData } from '@/stores/resumeStore';
import { TemplateSection } from '@/templates';
import { Loader2, ZapIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const [isPolishingSummary, setIsPolishingSummary] = useState(false);
  const [polishedSummary, setPolishedSummary] = useState<string | null>(null);
  const [hasAI, setHasAI] = useState(true);
  const { polishSummary, isInitialized } = useLLM();

  // Check if device supports AI features
  useEffect(() => {
    setHasAI(hasAICapability());
  }, []);

  const handlePolishSummary = async () => {
    const currentSummary = resumeData.personalInfo.summary;
    if (!currentSummary) return;

    // Display a message if LLM is not ready
    if (!isInitialized) {
      alert(
        'Our AI helper is still warming up. Give it a moment and try again!'
      );
      return;
    }

    try {
      setIsPolishingSummary(true);
      const result = await polishSummary(currentSummary);

      if (result.success) {
        // Store the polished summary for comparison
        setPolishedSummary(result.polishedText);
      } else {
        // Display error message to the user
        console.error('Failed to polish summary:', result.error);
        alert(
          `Oops! Something went wrong while polishing your summary. ${
            result.error || "Let's try again later."
          }`
        );
      }
    } catch (err) {
      console.error('Error polishing summary:', err);
      alert("Something unexpected happened. Let's try again in a moment.");
    } finally {
      setIsPolishingSummary(false);
    }
  };

  const handleAcceptPolishedSummary = () => {
    if (polishedSummary) {
      // Update form and store with polished summary
      onPersonalInfoChange({
        ...resumeData.personalInfo,
        summary: polishedSummary,
      });
      form.setValue('personalInfo.summary' as FormPath, polishedSummary);
      setPolishedSummary(null);
    }
  };

  const handleRejectPolishedSummary = () => {
    setPolishedSummary(null);
  };

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
                <div className="flex justify-between items-center">
                  <FormLabel className="flex items-center">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </FormLabel>
                  {hasAI && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 px-2 text-muted-foreground opacity-70 hover:opacity-100"
                      type="button"
                      onClick={handlePolishSummary}
                      disabled={
                        !formField.value || isPolishingSummary || !isInitialized
                      }
                    >
                      {isPolishingSummary ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Working on it...
                        </>
                      ) : (
                        <>
                          <ZapIcon className="h-3 w-3 mr-1" />
                          Enhance with AI
                        </>
                      )}
                    </Button>
                  )}
                </div>
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
                    disabled={isPolishingSummary}
                  />
                </FormControl>
                <FormMessage />

                {polishedSummary && (
                  <TextComparison
                    originalText={resumeData.personalInfo.summary || ''}
                    enhancedText={polishedSummary}
                    onAccept={handleAcceptPolishedSummary}
                    onReject={handleRejectPolishedSummary}
                    className="mt-3"
                  />
                )}
              </FormItem>
            )}
          />
        ))}
    </div>
  );
}

export default PersonalInfo;
