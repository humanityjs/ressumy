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
    <div key={section.id} className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {section.title}
        </h2>
        <div className="w-8 h-8 rounded-full flex items-center justify-center border border-purple-200 dark:border-purple-800">
          <span className="text-purple-600 dark:text-purple-400 text-sm">
            ⚡
          </span>
        </div>
      </div>

      <Separator className="bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 h-px" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="group"
              >
                <FormItem className="relative">
                  <FormControl>
                    <div className="flex items-center gap-2 p-3 rounded-lg border border-purple-200/50 dark:border-purple-800/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-200">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                          index % 5 === 0
                            ? 'from-purple-400 to-purple-500'
                            : index % 5 === 1
                            ? 'from-pink-400 to-pink-500'
                            : index % 5 === 2
                            ? 'from-blue-400 to-blue-500'
                            : index % 5 === 3
                            ? 'from-emerald-400 to-emerald-500'
                            : 'from-orange-400 to-orange-500'
                        }`}
                      />
                      <Input
                        placeholder="Enter skill"
                        value={field.value as string}
                        onChange={(e) => {
                          field.onChange(e);
                          const newSkills = [...resumeData.skills];
                          newSkills[index] = e.target.value;
                          setSkills(newSkills);
                        }}
                        className="border-0 bg-transparent focus:ring-0 px-0 text-slate-700 dark:text-slate-300 placeholder:text-purple-400/70 dark:placeholder:text-purple-500/70"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 flex-shrink-0 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:scale-110"
                        onClick={() => {
                          const newSkills = resumeData.skills.filter(
                            (_, idx) => idx !== index
                          );
                          setSkills(newSkills);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              </motion.div>
            )}
          />
        ))}
      </div>

      {resumeData.skills.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed border-purple-200/60 dark:border-purple-800/40 rounded-xl">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 border border-purple-200 dark:border-purple-800">
            <span className="text-purple-600 dark:text-purple-400 text-lg">
              ⚡
            </span>
          </div>
          <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
            No skills added yet
          </p>
          <Button
            type="button"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
            onClick={handleAddSkill}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add your first skill
          </Button>
        </div>
      )}

      {resumeData.skills.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSkill}
            className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20 transition-all duration-200 hover:scale-105"
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
