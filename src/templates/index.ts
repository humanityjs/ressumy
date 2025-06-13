import { ResumeData } from '@/stores/resumeStore';
import { BasicTemplate } from './basic/BasicTemplate';

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'bullets';
  placeholder?: string;
  required?: boolean;
}

export interface TemplateSection {
  id: string;
  title: string;
  icon?: string;
  fields: TemplateField[];
  allowMultiple?: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'professional' | 'modern' | 'creative' | 'executive' | 'minimal';
  thumbnail: string;
  component: React.ComponentType<{ data?: ResumeData }>;
  sections: TemplateSection[];
  isNew?: boolean;
  isComingSoon?: boolean;
}

// Define the basic template
const basicTemplate: Template = {
  id: 'basic',
  name: 'Professional',
  description: 'A clean, professional template with a traditional layout',
  category: 'professional',
  thumbnail: '/templates/basic-thumbnail.svg',
  component: BasicTemplate,
  sections: [
    {
      id: 'personalInfo',
      title: 'Personal Information',
      fields: [
        {
          id: 'fullName',
          label: 'Full Name',
          type: 'text',
          placeholder: 'John Doe',
          required: true,
        },
        {
          id: 'jobTitle',
          label: 'Job Title',
          type: 'text',
          placeholder: 'Senior Software Engineer',
          required: true,
        },
        {
          id: 'phone',
          label: 'Phone Number',
          type: 'text',
          placeholder: '+1 (555) 123-4567',
        },
        {
          id: 'email',
          label: 'Email',
          type: 'text',
          placeholder: 'john@example.com',
          required: true,
        },
        {
          id: 'website',
          label: 'Website/GitHub',
          type: 'text',
          placeholder: 'github.com/johndoe',
        },
        {
          id: 'summary',
          label: 'Professional Summary',
          type: 'textarea',
          placeholder: 'A brief summary of your skills and experience...',
        },
      ],
    },
    {
      id: 'skills',
      title: 'Skills',
      fields: [
        {
          id: 'skills',
          label: 'Skills (comma separated)',
          type: 'text',
          placeholder: 'JavaScript, React, TypeScript, Node.js, Git',
        },
      ],
    },
    {
      id: 'experience',
      title: 'Work Experience',
      allowMultiple: true,
      fields: [
        {
          id: 'jobTitle',
          label: 'Job Title',
          type: 'text',
          placeholder: 'Senior Developer',
          required: true,
        },
        {
          id: 'company',
          label: 'Company',
          type: 'text',
          placeholder: 'Acme Inc.',
          required: true,
        },
        {
          id: 'startDate',
          label: 'Start Date',
          type: 'text',
          placeholder: 'January 2020',
          required: true,
        },
        {
          id: 'endDate',
          label: 'End Date',
          type: 'text',
          placeholder: 'Present',
        },
        {
          id: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Describe your responsibilities and achievements...',
        },
        {
          id: 'keyResponsibilities',
          label: 'Key Responsibilities',
          type: 'bullets',
          placeholder: 'Add key responsibilities as bullet points...',
        },
      ],
    },
    {
      id: 'education',
      title: 'Education',
      allowMultiple: true,
      fields: [
        {
          id: 'degree',
          label: 'Degree',
          type: 'text',
          placeholder: 'Bachelor of Science in Computer Science',
          required: true,
        },
        {
          id: 'school',
          label: 'School',
          type: 'text',
          placeholder: 'University of Technology',
          required: true,
        },
        {
          id: 'startDate',
          label: 'Start Date',
          type: 'text',
          placeholder: 'September 2016',
        },
        {
          id: 'endDate',
          label: 'End Date',
          type: 'text',
          placeholder: 'June 2020',
        },
      ],
    },
  ],
};

// A modern template (coming soon)
const modernTemplate: Template = {
  id: 'modern',
  name: 'Modern',
  description: 'A contemporary template with a fresh, innovative layout',
  category: 'modern',
  thumbnail: '/templates/modern-thumbnail.svg',
  component: BasicTemplate,
  sections: [],
  isComingSoon: true,
};

// A creative template (coming soon)
const creativeTemplate: Template = {
  id: 'creative',
  name: 'Creative',
  description: 'A bold, eye-catching template for creative professionals',
  category: 'creative',
  thumbnail: '/templates/creative-thumbnail.svg',
  component: BasicTemplate,
  sections: [],
  isComingSoon: true,
};

// Executive template (coming soon)
const executiveTemplate: Template = {
  id: 'executive',
  name: 'Executive',
  description: 'A prestigious template for senior leadership roles',
  category: 'executive',
  thumbnail: '/templates/executive-thumbnail.svg',
  component: BasicTemplate,
  sections: [],
  isComingSoon: true,
};

// Minimal template (coming soon)
const minimalTemplate: Template = {
  id: 'minimal',
  name: 'Minimal',
  description: 'A clean, distraction-free template focusing on content',
  category: 'minimal',
  thumbnail: '/templates/minimal-thumbnail.svg',
  component: BasicTemplate,
  sections: [],
  isComingSoon: true,
};

// Modern Gradient template (coming soon)
const modernGradientTemplate: Template = {
  id: 'modern-gradient',
  name: 'Modern Gradient',
  description: 'A contemporary template with stylish gradient accents',
  category: 'modern',
  thumbnail: '/templates/modern-gradient-thumbnail.svg',
  component: BasicTemplate,
  sections: [],
  isComingSoon: true,
};

// Creative Portfolio template (coming soon)
const creativePortfolioTemplate: Template = {
  id: 'creative-portfolio',
  name: 'Creative Portfolio',
  description: 'Perfect for designers and creative professionals',
  category: 'creative',
  thumbnail: '/templates/creative-portfolio-thumbnail.svg',
  component: BasicTemplate,
  sections: [],
  isComingSoon: true,
};

// Export all templates
export const templates: Template[] = [
  basicTemplate,
  modernTemplate,
  creativeTemplate,
  executiveTemplate,
  minimalTemplate,
  modernGradientTemplate,
  creativePortfolioTemplate,
];

// Export a function to get a template by ID
export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((template) => template.id === id);
};
