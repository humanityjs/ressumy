import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FormPath, ResumeFormData } from '@/lib/validationSchema';
import { ResumeData } from '@/stores/resumeStore';
import { TemplateSection } from '@/templates';
import { PlusCircle, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { UseFormReturn } from 'react-hook-form';

function SkillsSection({
  section,
  form,
  handleAddSkill,
  resumeData,
  setSkills,
}: {
  section: TemplateSection;
  form: UseFormReturn<ResumeFormData>;
  handleAddSkill: () => void;
  resumeData: ResumeData;
  setSkills: (skills: string[]) => void;
}) {
  const springConfig = { stiffness: 300, damping: 30 };

  return (
    <div key={section.id} className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{section.title}</h2>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resumeData.skills.map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`skills.${index}` as FormPath}
            render={({ field }) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={springConfig}
              >
                <FormItem className="relative">
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        placeholder="Enter skill"
                        value={field.value as string}
                        onChange={(e) => {
                          field.onChange(e);
                          const newSkills = [...resumeData.skills];
                          newSkills[index] = e.target.value;
                          setSkills(newSkills);
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="ml-1"
                        onClick={() => {
                          const newSkills = resumeData.skills.filter(
                            (_, idx) => idx !== index
                          );
                          setSkills(newSkills);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
        ))}
      </div>

      {resumeData.skills.length === 0 && (
        <div className="text-center p-6 border border-dashed rounded-md">
          <p className="text-muted-foreground">No skills added yet</p>
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={handleAddSkill}
          >
            Add your first skill
          </Button>
        </div>
      )}

      {resumeData.skills.length > 0 && (
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSkill}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Add Skill
          </Button>
        </div>
      )}
    </div>
  );
}

export default SkillsSection;
