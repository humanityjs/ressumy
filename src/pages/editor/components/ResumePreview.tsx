interface ResumePreviewProps {
  // We'll expand this interface as we implement the actual data flow
  data?: any;
}

function ResumePreview({ data }: ResumePreviewProps) {
  // This is a placeholder component that will be updated with actual data binding
  return (
    <div className="font-[system-ui] text-black">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Daniel Bamidele</h1>
        <p className="text-xl mb-2">Senior Software Engineer</p>
        <div className="flex flex-wrap text-sm gap-x-4">
          <span>(+234)8066193821</span>
          <span>|</span>
          <span>greatbolulife@gmail.com</span>
          <span>|</span>
          <span>https://github.com/humanityjs</span>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-6 text-sm">
        <p>
          An innovative Senior Software Engineer with 8+ years of experience
          crafting cutting-edge web and mobile solutions. I have demonstrated
          expertise in full-stack development, team leadership, and startup
          operations. I also have a proven track record of delivering
          user-centric applications that significantly boost engagement and
          drive business impact. I am committed to continuous learning and
          staying at the forefront of industry advancements.
        </p>
      </div>

      {/* Technical Proficiencies */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase mb-2">
          Technical Proficiencies
        </h2>
        <hr className="border-t border-gray-300 mb-2" />
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Languages: JavaScript, TypeScript, PHP, Python</li>
          <li>
            Frontend/Mobile: React, React Native, Vue.js, D3.js, Bootstrap,
            Tailwind CSS
          </li>
          <li>Backend: Node.js, Express, NestJS, Laravel, GraphQL</li>
          <li>Databases: MongoDB, PostgreSQL, SQLite</li>
          <li>
            Tools & Platforms: AWS, Heroku, Jest, Storybook, Webpack, Babel, Git
          </li>
          <li>
            Other: RESTful APIs, WebSockets, Electron, FFmpeg, Datadog,
            RudderStack, Supabase, Redis, Socket.io, Paystack
          </li>
        </ul>
      </div>

      {/* Professional Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase mb-2">
          Professional Experience
        </h2>
        <hr className="border-t border-gray-300 mb-2" />

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">LEAD ENGINEER – Rivefi</h3>
            <span className="text-sm">April 2024 – Present</span>
          </div>
          <p className="text-sm mb-2">
            Led the development of a fundraising platform (https://rivefi.com)
            designed to make donations and crowdfunding more accessible in
            Nigeria.
          </p>
          <p className="text-sm font-semibold">
            Key Responsibilities and Achievements:
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>
              Spearheaded the development of a full-stack platform using NestJS,
              Postgres, and Redis for a scalable backend, and React/Typescript
              with Tailwind CSS for a responsive frontend.
            </li>
            {/* Add more bullet points as needed */}
          </ul>
        </div>

        {/* Additional experience entries would go here */}
      </div>
    </div>
  );
}

export default ResumePreview;
