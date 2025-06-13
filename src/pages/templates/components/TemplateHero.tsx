import { Badge } from '@/components/ui/badge';
import { templates } from '@/templates';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function TemplateHero() {
  return (
    <motion.div
      className="text-center mb-16 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="inline-flex items-center gap-2 mb-4">
        <Badge
          variant="secondary"
          className="px-4 py-1.5 font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20"
        >
          <Sparkles className="w-3 h-3 mr-2 text-blue-600" />
          {templates.filter((t) => !t.isComingSoon).length}+ Professional
          Templates
        </Badge>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
        Choose Your Perfect Template
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Select from our curated collection of ATS-friendly templates designed by
        HR professionals. All templates are completely free and ready to
        customize.
      </p>

      <div className="flex items-center justify-center gap-8 mt-8">
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            {templates.filter((t) => !t.isComingSoon).length}
          </div>
          <div className="text-sm text-muted-foreground">Templates</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            100%
          </div>
          <div className="text-sm text-muted-foreground">ATS-Friendly</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
            Free
          </div>
          <div className="text-sm text-muted-foreground">Forever</div>
        </div>
      </div>
    </motion.div>
  );
}
