import { Button } from '@/components/ui/button';

function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-fade-in">
              React Template
            </h1>
            <p className="text-xl text-muted-foreground">
              A modern stack for building fast web applications
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-12">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 border rounded-lg bg-card shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex gap-2 items-center mb-4">
                  {feature.icon}
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Button size="lg" className="animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path d="M9 5H2v7" />
                <path d="M2 12c7.2-2 12-4.8 12-12" />
                <path d="M9 19h12v-7" />
                <path d="M22 12c-7.2 2-12 4.8-12 12" />
              </svg>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'TypeScript',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 text-blue-500"
      >
        <path d="M16.5 9.4 7.5 4.21" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.3 7 12 12l8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    description:
      'Type-safe development with TypeScript for better developer experience',
  },
  {
    title: 'Shadcn UI',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 text-violet-500"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    description:
      'Beautiful, accessible UI components built with Radix UI and Tailwind CSS',
  },
  {
    title: 'Tailwind CSS',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 text-cyan-500"
      >
        <path d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z" />
      </svg>
    ),
    description: 'Utility-first CSS framework for rapid UI development',
  },
  {
    title: 'Vite',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 text-yellow-500"
      >
        <path d="m9 14 6-6" />
        <circle cx="14" cy="9" r="1" />
        <circle cx="9" cy="14" r="1" />
        <path d="M7 21v-4" />
        <path d="M17 21v-4" />
        <path d="M3 7v4" />
        <path d="M21 7v4" />
        <rect width="18" height="14" x="3" y="3" rx="2" />
      </svg>
    ),
    description: 'Next-generation frontend tooling with lightning-fast HMR',
  },
  {
    title: 'React Router',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 text-red-500"
      >
        <path d="M22 9a4 4 0 0 1-4 4H4" />
        <path d="M7 22a4 4 0 0 1-4-4V6" />
        <path d="m16 19 3-3-3-3" />
      </svg>
    ),
    description: 'Declarative routing for React applications',
  },
  {
    title: 'Dark Mode',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 text-purple-500"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
    description: 'Built-in dark mode support with theme toggle',
  },
];

export default Home;
