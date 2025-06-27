import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Check,
  Clock,
  Download,
  Edit3,
  Palette,
  Sparkles
} from 'lucide-react';

const processSteps = [
  {
    title: 'Choose Your Template',
    icon: <Palette className="h-6 w-6" />,
    description: 'Pick from our collection of ATS-optimized templates that match your industry and style.',
    features: ['20+ templates', 'Industry-specific', 'ATS-optimized'],
  },
  {
    title: 'Fill In Your Details',
    icon: <Edit3 className="h-6 w-6" />,
    description: 'Use our guided editor with AI suggestions to craft compelling content that gets noticed.',
    features: ['AI suggestions', 'Real-time preview', 'Auto-save'],
  },
  {
    title: 'Download & Apply',
    icon: <Download className="h-6 w-6" />,
    description: 'Export your polished resume as PDF and start applying to jobs immediately.',
    features: ['PDF export', 'Multiple formats', 'Share link'],
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-purple-600/5 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float animation-delay-2000" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Badge variant="outline" className="px-4 py-1.5">
              <Clock className="w-3 h-3 mr-2" />
              Average time: 10 minutes
            </Badge>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Transform your experience into interviews
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how Ressumy helps you go from blank page to polished professional in minutes
          </p>
        </div>

        {/* Interactive Process */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Steps */}
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`group relative flex gap-4 p-6 rounded-2xl border ${
                  index === 1 ? 'bg-primary/5 border-primary/20' : 'border-border/50 hover:border-primary/20'
                } transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/5`}
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl ${
                    index === 1 ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                  } flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                    {step.icon}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="absolute top-14 left-7 w-0.5 h-12 bg-gradient-to-b from-primary/20 to-transparent" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                  {step.features && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {step.features.map((feature, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Live Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-card">
              <div className="bg-muted/30 p-4 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center text-sm text-muted-foreground">
                  Live Preview
                </div>
              </div>
              <div className="p-8 space-y-6">
                {/* Animated resume preview */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="h-6 w-40 bg-primary/20 rounded mb-2" />
                        <div className="h-4 w-28 bg-muted-foreground/20 rounded" />
                      </div>
                      <div className="text-right">
                        <div className="h-3 w-24 bg-muted-foreground/10 rounded mb-1" />
                        <div className="h-3 w-20 bg-muted-foreground/10 rounded" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-muted-foreground/10 rounded" />
                      <div className="h-3 w-5/6 bg-muted-foreground/10 rounded" />
                      <div className="h-3 w-4/6 bg-muted-foreground/10 rounded" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 w-32 bg-primary/20 rounded" />
                      <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary/40" />
                        <div className="h-3 flex-1 bg-muted-foreground/10 rounded" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary/40" />
                        <div className="h-3 flex-1 bg-muted-foreground/10 rounded" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-green-500 text-white rounded-lg px-4 py-2 shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Check className="w-4 h-4 inline mr-1" />
              ATS-Friendly
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 bg-card rounded-lg shadow-lg p-3 flex items-center gap-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">AI-Enhanced</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Success Stories Bar */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-primary/5 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2.5x</div>
              <div className="text-sm text-muted-foreground">More interviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">87%</div>
              <div className="text-sm text-muted-foreground">Get responses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10min</div>
              <div className="text-sm text-muted-foreground">Average time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50k+</div>
              <div className="text-sm text-muted-foreground">Happy users</div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
} 