import { ResumeData } from '@/stores/resumeStore';

interface BasicTemplateProps {
  data?: ResumeData;
}

export function BasicTemplate({ data }: BasicTemplateProps) {
  // Use placeholder data if no data is provided
  const placeholderData: ResumeData = {
    personalInfo: {
      fullName: 'Daniel Bamidele',
      jobTitle: 'Senior Software Engineer',
      phone: '(+234)8066193821',
      email: 'greatbolulife@gmail.com',
      website: 'https://github.com/humanityjs',
      summary:
        'An innovative Senior Software Engineer with 8+ years of experience crafting cutting-edge web and mobile solutions. I have demonstrated expertise in full-stack development, team leadership, and startup operations. I also have a proven track record of delivering user-centric applications that significantly boost engagement and drive business impact. I am committed to continuous learning and staying at the forefront of industry advancements.',
    },
    experiences: [
      {
        id: '1',
        jobTitle: 'LEAD ENGINEER',
        company: 'Rivefi',
        startDate: 'April 2024',
        endDate: 'Present',
        description:
          'Led the development of a fundraising platform (https://rivefi.com) designed to make donations and crowdfunding more accessible in Nigeria. Spearheaded the development of a full-stack platform using NestJS, Postgres, and Redis for a scalable backend, and React/Typescript with Tailwind CSS for a responsive frontend.',
      },
    ],
    educations: [],
    skills: [
      'JavaScript',
      'TypeScript',
      'PHP',
      'Python',
      'React',
      'React Native',
      'Vue.js',
      'D3.js',
      'Bootstrap',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'NestJS',
      'Laravel',
      'GraphQL',
      'MongoDB',
      'PostgreSQL',
      'SQLite',
    ],
  };

  // Use the provided data or fall back to placeholder
  const resumeData = data || placeholderData;

  return (
    <div className="font-[system-ui] text-black">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {resumeData.personalInfo.fullName}
        </h1>
        <p className="text-xl mb-2">{resumeData.personalInfo.jobTitle}</p>
        <div className="flex flex-wrap text-sm gap-x-4">
          {resumeData.personalInfo.phone && (
            <>
              <span>{resumeData.personalInfo.phone}</span>
              <span>|</span>
            </>
          )}
          {resumeData.personalInfo.email && (
            <>
              <span>{resumeData.personalInfo.email}</span>
              <span>|</span>
            </>
          )}
          {resumeData.personalInfo.website && (
            <span>{resumeData.personalInfo.website}</span>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-6 text-sm">
          <p>{resumeData.personalInfo.summary}</p>
        </div>
      )}

      {/* Technical Proficiencies */}
      {resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2">
            Technical Proficiencies
          </h2>
          <hr className="border-t border-gray-300 mb-2" />
          <ul className="list-disc pl-5 text-sm space-y-1">
            {resumeData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Professional Experience */}
      {resumeData.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2">
            Professional Experience
          </h2>
          <hr className="border-t border-gray-300 mb-2" />

          {resumeData.experiences.map((experience) => (
            <div key={experience.id} className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">
                  {experience.jobTitle} – {experience.company}
                </h3>
                <span className="text-sm">
                  {experience.startDate} – {experience.endDate}
                </span>
              </div>
              <p className="text-sm mb-2">{experience.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.educations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-2">Education</h2>
          <hr className="border-t border-gray-300 mb-2" />

          {resumeData.educations.map((education) => (
            <div key={education.id} className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{education.degree}</h3>
                <span className="text-sm">
                  {education.startDate} – {education.endDate}
                </span>
              </div>
              <p className="text-sm">{education.school}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
