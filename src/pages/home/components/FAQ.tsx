import { Badge } from '@/components/ui/badge';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Brain,
  Check,
  ChevronDown,
  Download,
  HardDrive,
  Heart,
  Lock,
  Shield,
  Sparkles,
  Users,
  Zap
} from 'lucide-react';
import React from 'react';

const faqCategories = [
  {
    name: 'Privacy',
    icon: <Lock className="h-5 w-5" />,
  },
  {
    name: 'Features',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    name: 'Technical',
    icon: <HardDrive className="h-5 w-5" />,
  },
  {
    name: 'Support',
    icon: <Users className="h-5 w-5" />,
  },
];

const faqs = [
  {
    question: "Is Ressumy really free forever?",
    answer: "Yes! Ressumy is 100% free and always will be. We believe everyone deserves access to professional resume tools without cost barriers. No hidden fees, no premium tiers, no subscriptions.",
    icon: <Zap className="h-4 w-4" />,
    highlight: "No credit card required, ever!"
  },
  {
    question: "How does the privacy protection work?",
    answer: "All your data stays in your browser. We don't have servers that store your information. When you use our AI features, they run locally on your device using WebAssembly and Web ML APIs. Your resume content never leaves your computer.",
    icon: <Shield className="h-4 w-4" />,
    highlight: "Zero data collection policy"
  },
  {
    question: "What is the on-device AI model?",
    answer: "We use a small, optimized language model that runs entirely in your browser. It helps with writing suggestions, grammar improvements, and keyword optimization without sending your data anywhere. Think of it as having a writing assistant that lives on your computer.",
    icon: <Brain className="h-4 w-4" />,
    highlight: "AI that respects your privacy"
  },
  {
    question: "Can I use Ressumy offline?",
    answer: "Yes! Once you've loaded Ressumy in your browser, it works completely offline. You can create, edit, and export resumes without an internet connection. Your work is automatically saved to your browser's local storage.",
    icon: <HardDrive className="h-4 w-4" />,
    highlight: "Works without internet"
  },
  {
    question: "Are the templates ATS-friendly?",
    answer: "Absolutely. All our templates are designed to pass through Applicant Tracking Systems (ATS). They use standard fonts, clear formatting, and proper structure that ATS software can easily parse.",
    icon: <Check className="h-4 w-4" />,
    highlight: "Tested with major ATS systems"
  },
  {
    question: "How do I save my resume for later?",
    answer: "Your resume is automatically saved in your browser's local storage as you work. You can also export your resume data as a JSON file to back it up or transfer it to another device.",
    icon: <Download className="h-4 w-4" />,
    highlight: "Auto-save + export options"
  }
];

export default function FAQ() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5"></div>
      
      <div className="relative max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Badge variant="secondary" className="px-4 py-1.5 font-medium">
              <Heart className="w-3 h-3 mr-2 text-red-500" />
              Trusted by 50,000+ job seekers
            </Badge>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Got questions? We've got answers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about creating your perfect resume with complete privacy
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {faqCategories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group p-4 rounded-xl border ${
                index === 0 ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              } transition-all duration-300 hover:shadow-md`}
            >
              <div className={`w-10 h-10 rounded-lg ${
                index === 0 ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
              } flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <div className="text-sm font-medium">{category.name}</div>
            </motion.button>
          ))}
        </div>

        {/* Continuous FAQ List */}
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`${index !== faqs.length - 1 ? 'border-b border-border/50' : ''}`}
            >
              <div 
                className={`group cursor-pointer p-6 transition-all duration-300 ${
                  expandedFaq === index 
                    ? 'bg-primary/5' 
                    : 'hover:bg-accent/5'
                }`}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      expandedFaq === index ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary group-hover:bg-primary/15'
                    }`}>
                      {faq.icon}
                    </div>
                    <h3 className={`font-semibold transition-colors duration-300 ${
                      expandedFaq === index ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 transition-all duration-300 ${
                      expandedFaq === index 
                        ? 'rotate-180 text-primary' 
                        : 'text-muted-foreground group-hover:text-primary'
                    }`}
                  />
                </div>
                
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pl-11">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        {faq.highlight && (
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">{faq.highlight}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 