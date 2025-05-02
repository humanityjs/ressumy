import { ResumeData } from '@/stores/resumeStore';
import { ReactNode } from 'react';

interface BasicTemplateProps {
  data?: ResumeData;
}

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center mt-8 mb-6">
      <p className="mr-14 text-lg font-bold uppercase">{title}</p>
      <div className="h-[1px] bg-black flex-1 w-full"></div>
    </div>
  );
};

const Experience = ({
  children,
  title,
  year,
  summary,
  simple = false,
}: {
  children: ReactNode;
  title: string;
  year: string;
  summary: string;
  simple?: boolean;
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-black rounded-full mr-4"></div>
          <p className="font-bold">{title}</p>
        </div>
        <p>{year}</p>
      </div>
      <div className="pl-7">
        {!simple ? (
          <>
            <p className="mt-2">{summary}</p>

            <h3 className="mt-4">Key Responsibilities and Achievements:</h3>
          </>
        ) : null}
        <div className="pl-6">{children}</div>
      </div>
    </div>
  );
};

export function BasicTemplate({ data }: BasicTemplateProps) {
  // Use placeholder data if no data is provided
  const placeholderData: ResumeData = {
    personalInfo: {
      fullName: 'Firstname Lastname',
      jobTitle: 'Job Title',
      phone: 'Phone Number',
      email: 'Email Address',
      website: 'Website URL',
      summary: 'A very short professional summary',
    },
    experiences: [
      {
        id: '1',
        jobTitle: 'Job Title',
        company: 'Company Name',
        startDate: 'Start Date',
        endDate: 'End Date',
        description: 'A very short job description',
        keyResponsibilities: ['Key Responsibility 1', 'Key Responsibility 2'],
      },
    ],
    educations: [],
    skills: [
      'Skill 1',
      'Skill 2',
      'Skill 3',
      'Skill 4',
      'Skill 5',
      'Skill 6',
      'Skill 7',
      'Skill 8',
      'Skill 9',
      'Skill 10',
      'Skill 11',
      'Skill 12',
      'Skill 13',
    ],
  };

  // Use the provided data or fall back to placeholder
  const resumeData = data || placeholderData;

  return (
    <div className="font-[system-ui] text-black">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-[40px] font-bold mb-2">
          {resumeData.personalInfo.fullName}
        </h1>
        <p className="text-xl mb-5">{resumeData.personalInfo.jobTitle}</p>
        <div className="flex items-center justify-between p-2 border border-black mb-6">
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
        <div className="mb-6">
          <p>{resumeData.personalInfo.summary}</p>
        </div>
      )}

      {/* Technical Proficiencies */}
      {resumeData.skills.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="Technical Proficiencies" />
          <div className="pl-6">
            <ul className="list-disc">
              {resumeData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {resumeData.experiences.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="Professional Experience" />

          {resumeData.experiences.map((experience) => (
            <Experience
              key={experience.id}
              title={`${experience.jobTitle} – ${experience.company}`}
              year={`${experience.startDate} – ${experience.endDate}`}
              summary={experience.description}
            >
              <ul className="list-disc">
                {experience.keyResponsibilities?.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </Experience>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.educations.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="Education" />

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
