import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  keyResponsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
}

interface ResumeState {
  resumeData: ResumeData;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  setSkills: (skills: string[]) => void;
  resetResume: () => void;
}

// Initial state with placeholder data
const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    phone: '',
    email: '',
    website: '',
    summary: '',
  },
  experiences: [],
  educations: [],
  skills: [],
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resumeData: initialResumeData,

      setPersonalInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: {
              ...state.resumeData.personalInfo,
              ...info,
            },
          },
        })),

      addExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experiences: [
              ...state.resumeData.experiences,
              { ...experience, id: crypto.randomUUID() },
            ],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experiences: state.resumeData.experiences.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experiences: state.resumeData.experiences.filter(
              (exp) => exp.id !== id
            ),
          },
        })),

      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            educations: [
              ...state.resumeData.educations,
              { ...education, id: crypto.randomUUID() },
            ],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            educations: state.resumeData.educations.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            educations: state.resumeData.educations.filter(
              (edu) => edu.id !== id
            ),
          },
        })),

      setSkills: (skills) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills,
          },
        })),

      resetResume: () => set({ resumeData: initialResumeData }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
