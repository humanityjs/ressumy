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
    <div key={section.id} className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {section.title}
        </h2>
        <div className="w-8 h-8 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-800">
          <span className="text-blue-600 dark:text-blue-400 text-sm">👤</span>
        </div>
      </div>

      <Separator className="bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 h-px" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.fields
          .filter((f) => f.id !== 'summary')
          .map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`personalInfo.${field.id}` as FormPath}
              render={({ field: formField }) => (
                <FormItem className="group">
                  <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                        index % 4 === 0
                          ? 'from-blue-400 to-blue-500'
                          : index % 4 === 1
                          ? 'from-emerald-400 to-emerald-500'
                          : index % 4 === 2
                          ? 'from-purple-400 to-purple-500'
                          : 'from-pink-400 to-pink-500'
                      }`}
                    />
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
                      className="border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-blue-400/20 dark:focus:ring-blue-500/20 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
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
              <FormItem className="p-6 rounded-xl border border-blue-200/30 dark:border-blue-800/20">
                <div className="flex justify-between items-center">
                  <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500" />
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </FormLabel>
                  {hasAI && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 px-3 border border-purple-200/50 dark:border-purple-800/50 text-purple-700 dark:text-purple-300 transition-all duration-200 hover:scale-105 hover:border-purple-300 dark:hover:border-purple-700"
                      type="button"
                      onClick={handlePolishSummary}
                      disabled={
                        !formField.value || isPolishingSummary || !isInitialized
                      }
                    >
                      {isPolishingSummary ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Working magic...
                        </>
                      ) : (
                        <>
                          <ZapIcon className="h-3 w-3 mr-1" />✨ Enhance with AI
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <FormControl>
                  <Textarea
                    placeholder={field.placeholder}
                    className="min-h-32 border-blue-200/50 dark:border-blue-800/50 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-blue-400/20 dark:focus:ring-blue-500/20 transition-all duration-200"
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
                <FormMessage className="text-red-500" />

                {/* Text comparison component */}
                {polishedSummary && (
                  <div className="mt-4 p-4 border border-green-200/50 dark:border-green-800/50 rounded-lg">
                    <TextComparison
                      originalText={formField.value as string}
                      enhancedText={polishedSummary}
                      onAccept={handleAcceptPolishedSummary}
                      onReject={handleRejectPolishedSummary}
                    />
                  </div>
                )}
              </FormItem>
            )}
          />
        ))}
    </div>
  );
}

export default PersonalInfo;
