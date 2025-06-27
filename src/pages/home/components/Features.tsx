import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Brain,
  Check,
  Download,
  HardDrive,
  Lock,
  Palette,
  Sparkles,
  Users
} from 'lucide-react';
import React from 'react';

const features = [
  {
    title: 'No Account Needed',
    icon: <Users className="h-5 w-5" />,
    description: 'Start building immediately. No sign-ups, no emails, no passwords. Just open and create.',
    highlights: ['Instant access', 'No email required', 'Zero friction']
  },
  {
    title: '100% Private & Secure',
    icon: <Lock className="h-5 w-5" />,
    description: 'Your resume data never leaves your browser. Everything is processed locally on your device.',
    highlights: ['Zero data collection', 'Browser-only storage', 'No tracking']
  },
  {
    title: 'On-Device AI Assistant',
    icon: <Brain className="h-5 w-5" />,
    description: 'Our small AI model runs entirely in your browser to help polish your content without sending data to servers.',
    highlights: ['Privacy-first AI', 'Instant suggestions', 'No API calls']
  },
  {
    title: 'Works Offline',
    icon: <HardDrive className="h-5 w-5" />,
    description: 'Once loaded, create and edit resumes even without internet. Perfect for on-the-go editing.',
    highlights: ['No internet needed', 'Auto-save locally', 'Work anywhere']
  },
  {
    title: 'Professional Templates',
    icon: <Palette className="h-5 w-5" />,
    description: 'Choose from 20+ ATS-friendly templates designed by HR professionals and recruiters.',
    highlights: ['ATS-optimized', 'Industry-specific', 'Customizable']
  },
  {
    title: 'One-Click Export',
    icon: <Download className="h-5 w-5" />,
    description: 'Download your resume as a perfectly formatted PDF ready for job applications.',
    highlights: ['PDF format', 'Print-ready', 'Share instantly']
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Badge variant="secondary" className="px-4 py-1.5 font-medium">
              <Sparkles className="w-3 h-3 mr-2" />
              All features included • No premium tiers
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Everything you need to land your dream job
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Powerful features that respect your privacy and help you create the perfect resume
          </motion.p>
        </div>

        {/* Compact Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="group relative h-full p-6 rounded-xl border bg-card hover:bg-accent/5 hover:border-primary/20 transition-all duration-300">
                {/* Icon and Title Row */}
                <div className="flex items-start gap-4 mb-3">
                  <div className={`p-2.5 rounded-lg transition-all duration-300 ${
                    index === 0 ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20' :
                    index === 1 ? 'bg-green-500/10 text-green-600 dark:text-green-400 group-hover:bg-green-500/20' :
                    index === 2 ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20' :
                    index === 3 ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500/20' :
                    index === 4 ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500/20' :
                    'bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500/20'
                  }`}>
                    {React.cloneElement(feature.icon, { className: 'w-5 h-5' })}
                  </div>
                  <h3 className="font-semibold text-base flex-1 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Compact highlights */}
                {feature.highlights && (
                  <div className="flex flex-wrap gap-2">
                    {feature.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <Check className="w-3 h-3 text-green-500" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 