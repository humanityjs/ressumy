import { Button } from '@/components/ui/button';

function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About This Template</h1>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground">
            A modern, feature-rich starting point for your React projects
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p>
            This template is designed to give you a head start on your React
            projects with all the modern tooling and best practices already set
            up. It includes:
          </p>

          <ul>
            <li>
              <strong>React 19</strong> - The latest version of React with all
              its improvements
            </li>
            <li>
              <strong>TypeScript</strong> - For type safety and better developer
              experience
            </li>
            <li>
              <strong>Vite</strong> - Lightning fast build tool and development
              server
            </li>
            <li>
              <strong>Tailwind CSS</strong> - Utility-first CSS framework for
              rapid UI development
            </li>
            <li>
              <strong>Shadcn UI</strong> - Beautiful, accessible UI components
            </li>
            <li>
              <strong>React Router</strong> - Declarative routing for React
              applications
            </li>
            <li>
              <strong>Dark Mode</strong> - Built-in dark mode support with theme
              toggle
            </li>
          </ul>

          <h2>Getting Started</h2>

          <p>
            This template is meant to be a starting point. Feel free to modify
            it to fit your needs. The structure is designed to be intuitive and
            easy to understand.
          </p>

          <pre>
            <code>npm install npm run dev</code>
          </pre>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            variant="default"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default About;
