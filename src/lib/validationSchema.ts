import { Education, Experience } from '@/stores/resumeStore';
import * as yup from 'yup';
import { InferType } from 'yup';

// Extended types for the form that match the validation schema
export interface ExtendedExperience extends Experience {
  location?: string;
  current?: boolean;
  highlights?: string[];
}

export interface ExtendedEducation extends Education {
  location?: string;
  current?: boolean;
  description?: string;
  highlights?: string[];
}

// Field paths for personal info
export type PersonalInfoPath =
  `personalInfo.${keyof ResumeFormData['personalInfo'] & string}`;
// Field paths for experiences array items
export type ExperiencePath = `experiences.${number}.${keyof ExtendedExperience &
  string}`;
// Field paths for educations array items
export type EducationPath = `educations.${number}.${keyof ExtendedEducation &
  string}`;
// Field paths for skills array items
export type SkillPath = `skills.${number}`;

// Union of all possible form field paths
export type FormPath =
  | keyof ResumeFormData
  | PersonalInfoPath
  | ExperiencePath
  | EducationPath
  | SkillPath;

// Personal Information Schema
export const personalInfoSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .test(
      'has-space',
      'Please enter first and last name separated by a space',
      (value) => {
        if (!value) return true; // Skip validation if field is empty (required handles this)
        return value.trim().includes(' '); // Check if there's at least one space
      }
    ),
  jobTitle: yup.string().required('Job title is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  phone: yup.string().optional(),
  website: yup.string().url('Please enter a valid URL').optional(),
  location: yup.string().optional(),
  summary: yup.string().optional(),
});

// Experience Schema
export const experienceSchema = yup.object({
  id: yup.string().optional(),
  jobTitle: yup.string().required('Job title is required'),
  company: yup.string().required('Company name is required'),
  location: yup.string().optional(),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().when('current', {
    is: false,
    then: (schema) => schema.required('End date is required'),
    otherwise: (schema) => schema.optional(),
  }),
  current: yup.boolean().default(false),
  description: yup.string().optional(),
  highlights: yup.array().of(yup.string().optional()).default([]),
  keyResponsibilities: yup
    .array()
    .of(yup.string().required('Responsibility cannot be empty'))
    .default([]),
});

// Education Schema
export const educationSchema = yup.object({
  id: yup.string().optional(),
  degree: yup.string().required('Degree is required'),
  school: yup.string().required('School name is required'),
  location: yup.string().optional(),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().when('current', {
    is: false,
    then: (schema) => schema.required('End date is required'),
    otherwise: (schema) => schema.optional(),
  }),
  current: yup.boolean().default(false),
  description: yup.string().optional(),
  highlights: yup.array().of(yup.string().optional()).default([]),
});

// Skill Schema
export const skillSchema = yup.string().required('Skill cannot be empty');

// Complete Resume Form Schema
export const resumeFormSchema = yup.object({
  personalInfo: personalInfoSchema.required(),
  experiences: yup.array().of(experienceSchema).default([]),
  educations: yup.array().of(educationSchema).default([]),
  skills: yup.array().of(skillSchema).default([]),
});

// Type Definitions
export type PersonalInfoFormData = InferType<typeof personalInfoSchema>;
export type ExperienceFormData = InferType<typeof experienceSchema>;
export type EducationFormData = InferType<typeof educationSchema>;
export type ResumeFormData = InferType<typeof resumeFormSchema>;
