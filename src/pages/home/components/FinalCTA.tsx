import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap } from 'lucide-react';
import { Link } from 'react-router';

export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-purple-600/10">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Your dream job is waiting
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join over 50,000 professionals who've created winning resumes with Ressumy. 
            No credit card, no account needed - just start building.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="group px-10 h-14 text-lg font-semibold"
            asChild
          >
            <Link to="/templates">
              <Zap className="mr-2 h-5 w-5" />
              Create Resume Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span>No sign-up required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span>100% free forever</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span>Your data stays private</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 