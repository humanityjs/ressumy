import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

interface SkillsInputProps {
  value: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
}

export function SkillsInput({
  value,
  onChange,
  placeholder = 'React, TypeScript, Tailwind CSS...',
}: SkillsInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (!trimmedSkill || value.includes(trimmedSkill)) return;

    const newSkills = [...value, trimmedSkill];
    onChange(newSkills);
    setInputValue('');
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = value.filter((skill) => skill !== skillToRemove);
    onChange(newSkills);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(inputValue);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const skills = pastedText
      .split(/,|\n/)
      .map((skill) => skill.trim())
      .filter(Boolean);

    const newSkills = [...value];
    skills.forEach((skill) => {
      if (!value.includes(skill)) {
        newSkills.push(skill);
      }
    });

    onChange(newSkills);
    setInputValue('');
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 mb-2">
        <AnimatePresence>
          {value.map((skill) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Badge className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-100 transition-colors">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 text-zinc-400 hover:text-zinc-100 transition-colors focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => inputValue && addSkill(inputValue)}
          placeholder={
            value.length === 0
              ? placeholder
              : 'Add more skills (press Enter or comma)'
          }
          className="w-full pr-8"
        />
      </div>
    </div>
  );
}
