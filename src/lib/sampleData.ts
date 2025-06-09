import { ResumeData } from '@/stores/resumeStore';

// Sample resume data for template previews and downloads
export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Jane Doe',
    jobTitle: 'Senior Product Manager',
    email: 'john.jane.doe@email.com',
    phone: '(555) 123-4567',
    website: 'linkedin.com/in/john-jane-doe',
    summary:
      'Results-driven Product Manager with 5+ years of experience leading cross-functional teams and delivering innovative digital products. Proven track record of increasing user engagement by 40% and revenue by $2.3M through data-driven product decisions and strategic roadmap planning.',
  },
  experiences: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      jobTitle: 'Senior Product Manager',
      startDate: 'May 2022',
      endDate: 'Present',
      description:
        'Leading product strategy for core SaaS platform serving 50K+ users, resulting in 35% increase in user retention.',
      keyResponsibilities: [
        'Led product strategy for core SaaS platform serving 50K+ users, resulting in 35% increase in user retention',
        'Collaborated with engineering and design teams to ship 12 major features, improving user satisfaction scores by 28%',
        'Conducted market research and competitive analysis to identify growth opportunities worth $1.5M in potential revenue',
        'Managed product roadmap and prioritized features based on user feedback and business impact metrics',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      jobTitle: 'Product Manager',
      startDate: 'June 2020',
      endDate: 'May 2022',
      description:
        'Launched mobile app from concept to 10K+ downloads within 6 months of release.',
      keyResponsibilities: [
        'Launched mobile app from concept to 10K+ downloads within 6 months of release',
        'Implemented A/B testing framework that improved conversion rates by 22% across key user flows',
        'Coordinated with sales and marketing teams to develop go-to-market strategies for 3 major product launches',
        'Analyzed user behavior data to identify pain points and optimization opportunities',
      ],
    },
    {
      id: '3',
      company: 'Digital Innovations Inc.',
      jobTitle: 'Associate Product Manager',
      startDate: 'Jan 2019',
      endDate: 'May 2020',
      description:
        'Supported senior PM in managing product backlog and feature specifications for e-commerce platform.',
      keyResponsibilities: [
        'Supported senior PM in managing product backlog and feature specifications for e-commerce platform',
        'Conducted user interviews and usability testing sessions with 100+ participants',
        'Created detailed product requirements documents and user stories for development team',
      ],
    },
  ],
  educations: [
    {
      id: '1',
      school: 'University of California, Berkeley',
      degree: 'Master of Business Administration - Technology Management',
      startDate: 'August 2017',
      endDate: 'May 2019',
    },
    {
      id: '2',
      school: 'Stanford University',
      degree: 'Bachelor of Science - Computer Science',
      startDate: 'September 2013',
      endDate: 'June 2017',
    },
  ],
  skills: [
    'UX: Product Strategy, User Research',
    'Product: A/B Testing, Product Roadmapping, Agile Methodology',
    'Technical: SQL, Python, Figma',
    'Tools: Jira, Google Analytics',
  ],
};
