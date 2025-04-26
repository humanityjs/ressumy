import { Button } from '@/components/ui/button';
import { Database, FileText, Lock, Shield, Upload } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8 text-center animate-fade-in">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Ressumy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create beautiful, professional résumés entirely in your browser -
              no data leaves your device
            </p>
          </div>

          {/* Privacy Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {privacyFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-lg bg-card border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-200"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => (window.location.href = '/templates')}
            >
              <FileText className="mr-2 h-5 w-5" />
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => (window.location.href = '/upload')}
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const privacyFeatures = [
  {
    title: '100% Private',
    icon: <Shield className="h-6 w-6" />,
    description:
      'Your data never leaves your device. All processing happens locally in your browser.',
  },
  {
    title: 'Offline Support',
    icon: <Database className="h-6 w-6" />,
    description:
      'Create and edit résumés even without an internet connection. Your work is automatically saved.',
  },
  {
    title: 'Local Processing',
    icon: <Lock className="h-6 w-6" />,
    description:
      'Our AI features run entirely on your device - no server calls, complete privacy guaranteed.',
  },
];

export default Home;
