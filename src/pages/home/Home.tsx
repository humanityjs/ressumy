import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Database,
  Download,
  Edit3,
  FileText,
  Palette,
  Shield,
  Sparkles,
  Upload,
  Zap
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

function Home() {
  const [hoveredStep, setHoveredStep] = React.useState<number | null>(null);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background/70 to-indigo-400/10 dark:from-primary/10 dark:via-background/50 dark:to-purple-600/20 animate-gradient-xy">
        {/* Accent Blobs */}
        <div className="pointer-events-none absolute -top-32 -left-16 w-[460px] h-[460px] bg-purple-500/30 dark:bg-purple-700/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="pointer-events-none absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[560px] h-[560px] bg-indigo-500/20 dark:bg-indigo-400/25 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 animate-fade-in">
              <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                <Sparkles className="w-3 h-3 mr-1" />
                100% Free Forever
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-float" style={{ animationDuration: '8s' }}>
                  Ressumy
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Create stunning, professional résumés that land interviews.
                <span className="block mt-2 text-lg opacity-80">
                  Completely free. AI support when you need it. Privacy-protected.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-in-up">
              <Button
                size="lg"
                className="group btn-glow px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                asChild
              >
                <Link to="/templates">
                  <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Creating Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link> 
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled
                asChild
                className="group btn-glow px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link to="#">
                  <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Import Existing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30 bg-aurora">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose Ressumy?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A powerful, privacy-first platform that puts you in control of your resume creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {privacyFeatures.map((feature, index) => (
              <Card
                key={feature.title}
                className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 animate-scale-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              An Experience That Guides You
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our interactive process makes résumé building intuitive and even
              enjoyable.
            </p>
          </div>

          <div
            className="relative grid grid-cols-1 md:grid-cols-3 gap-8"
            onMouseLeave={() => setHoveredStep(null)}
          >
            <AnimatePresence>
              {hoveredStep !== null && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-primary/5 dark:bg-primary/10"
                  layoutId="hover-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    gridColumn: `1 / ${hoveredStep + 2}`,
                  }}
                />
              )}
            </AnimatePresence>

            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative z-10 p-8 rounded-2xl cursor-pointer flex flex-col items-center text-center"
                onMouseEnter={() => setHoveredStep(index)}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-primary-foreground shadow-lg">
                  {step.icon}
                </motion.div>
                <h3 className="font-bold text-xl mb-2 text-foreground">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {step.description}
                </p>
                <AnimatePresence>
                  {hoveredStep === index && (
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ArrowRight className="text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals who've created their perfect résumé with Ressumy - completely free, forever
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="group px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
              onClick={() => (window.location.href = '/templates')}
            >
              <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Building Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const privacyFeatures = [
  {
    title: '100% Free Forever',
    icon: <Zap className="h-8 w-8" />,
    description:
      'No hidden costs, no premium tiers, no subscriptions. All features completely free because job searching shouldn\'t cost money.',
  },
  {
    title: 'AI Writing Support',
    icon: <Shield className="h-8 w-8" />,
    description:
      'Get optional AI assistance to polish content and optimize keywords. Runs entirely on your device when you choose to use it.',
  },
  {
    title: 'Works Offline',
    icon: <Database className="h-8 w-8" />,
    description:
      'Create and edit résumés even without internet. Your work is automatically saved and synced across sessions.',
  },
];

const processSteps = [
  {
    title: 'Choose Template',
    icon: <Palette className="h-8 w-8" />,
    description: 'Select from our collection of professionally designed templates that work for any industry.',
  },
  {
    title: 'Add Your Details',
    icon: <Edit3 className="h-8 w-8" />,
    description: 'Fill in your information with our intuitive editor. Use optional AI suggestions to help polish your content.',
  },
  {
    title: 'Download & Apply',
    icon: <Download className="h-8 w-8" />,
    description: 'Export your polished résumé as a PDF and start applying to your dream jobs immediately.',
  },
];

export default Home;
