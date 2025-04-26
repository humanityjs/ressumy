import { Form } from '@/components/ui/form';
import { resumeFormSchema, type ResumeFormData } from '@/lib/validationSchema';
import { Education, Experience, useResumeStore } from '@/stores/resumeStore';
import { Template } from '@/templates';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import EducationSection from './EducationSection';
import ExperienceForm from './Experience';
import PersonalInfo from './PersonalInfo';
import SkillsSection from './SkillsSection';

interface ResumeFormProps {
  template: Template;
}

export function ResumeForm({ template }: ResumeFormProps) {
  const resumeData = useResumeStore((state) => state.resumeData);
  const setPersonalInfo = useResumeStore((state) => state.setPersonalInfo);
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);
  const setSkills = useResumeStore((state) => state.setSkills);

  const form = useForm<ResumeFormData>({
    resolver: yupResolver(resumeFormSchema),
    defaultValues: {
      personalInfo: resumeData.personalInfo,
      experiences: resumeData.experiences,
      educations: resumeData.educations,
      skills: resumeData.skills,
    },
  });

  // Update form when store changes
  useEffect(() => {
    form.reset({
      personalInfo: resumeData.personalInfo,
      experiences: resumeData.experiences,
      educations: resumeData.educations,
      skills: resumeData.skills,
    });
  }, [form, resumeData]);

  // Update store when form changes (autosave functionality)
  const onPersonalInfoChange = (data: ResumeFormData['personalInfo']) => {
    setPersonalInfo(data);
  };

  const handleAddExperience = () => {
    const newExperience: Omit<Experience, 'id'> = {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    addExperience(newExperience);
  };

  const handleAddEducation = () => {
    const newEducation: Omit<Education, 'id'> = {
      degree: '',
      school: '',
      startDate: '',
      endDate: '',
    };
    addEducation(newEducation);
  };

  const handleAddSkill = () => {
    setSkills([...resumeData.skills, '']);
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        {template.sections.map((section) => {
          switch (section.id) {
            case 'personalInfo':
              return (
                <PersonalInfo
                  section={section}
                  form={form}
                  onPersonalInfoChange={onPersonalInfoChange}
                  resumeData={resumeData}
                />
              );
            case 'experience':
              return (
                <ExperienceForm
                  section={section}
                  form={form}
                  handleAddExperience={handleAddExperience}
                  resumeData={resumeData}
                  removeExperience={removeExperience}
                  updateExperience={updateExperience}
                />
              );

            case 'education':
              return (
                <EducationSection
                  section={section}
                  form={form}
                  handleAddEducation={handleAddEducation}
                  resumeData={resumeData}
                  removeEducation={removeEducation}
                  updateEducation={updateEducation}
                />
              );

            case 'skills':
              return (
                <SkillsSection
                  section={section}
                  form={form}
                  handleAddSkill={handleAddSkill}
                  resumeData={resumeData}
                  setSkills={setSkills}
                />
              );

            default:
              return null;
          }
        })}
      </form>
    </Form>
  );
}
