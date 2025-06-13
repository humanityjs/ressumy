import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Download, FileText, Lock, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-purple-600/5 dark:from-primary/10 dark:via-background dark:to-purple-600/10">
    <div className="absolute inset-0">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
    </div>
    
    <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          {/* Trust Badge */}
          <motion.div 
            className="inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="px-4 py-1.5">
              <Shield className="w-3 h-3 mr-2" />
              100% Private • No Sign-up Required • Free Forever
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Write your story with the{' '}
              <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                ultimate resume builder
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Create stunning, ATS-friendly resumes in minutes. Powered by on-device AI, 
              your data never leaves your computer. No accounts, no tracking, just results.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="group px-8 h-12 text-base"
              asChild
            >
              <Link to="/templates">
                <Sparkles className="mr-2 h-4 w-4" />
                Create My Resume
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group px-8 h-12 text-base"
              asChild
            >
              <Link to="/templates">
                <FileText className="mr-2 h-4 w-4" />
                Browse Templates
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div>
              <div className="text-3xl font-bold text-primary">20+</div>
              <div className="text-sm text-muted-foreground">Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Privacy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Free Forever</div>
            </div>
          </motion.div>
        </div>

        {/* Hero Image/Preview */}
        <motion.div 
          className="relative lg:pl-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Main Resume Preview */}
          <div className="relative">
            {/* Glow effect behind the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-600/20 to-indigo-600/20 blur-3xl opacity-60"></div>
            
            {/* Resume Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/10 bg-gradient-to-br from-card via-card to-muted/30">
              {/* Browser-like header */}
              <div className="bg-muted/50 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  ressumy.app/preview
                </div>
                <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </div>
              
              {/* Resume Content */}
              <div className="aspect-[3/4] p-8 relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-grid-pattern"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>
                
                {/* Resume content with typing animation */}
                <div className="relative space-y-6">
                  {/* Header */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      Alex Thompson
                    </h3>
                    <p className="text-sm text-muted-foreground">Senior Product Designer</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                        San Francisco, CA
                      </span>
                      <span>alex@example.com</span>
                    </div>
                  </motion.div>
                  
                  {/* Experience Section */}
                  <motion.div 
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h4 className="text-sm font-semibold text-primary">Experience</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">Lead Designer at TechCorp</span>
                            <span className="text-xs text-muted-foreground">2021-Present</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Led design for flagship product reaching 2M+ users...
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Skills with progress bars */}
                  <motion.div 
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <h4 className="text-sm font-semibold text-primary">Skills</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {['UI Design', 'Prototyping', 'User Research', 'Figma'].map((skill, i) => (
                        <motion.div 
                          key={skill} 
                          className="space-y-1"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: 1 + i * 0.1 }}
                        >
                          <span className="text-xs">{skill}</span>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-primary to-purple-600"
                              initial={{ width: 0 }}
                              animate={{ width: `${85 + i * 5}%` }}
                              transition={{ delay: 1.2 + i * 0.1, duration: 0.8 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* AI Enhancement Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.1, 0] }}
                  transition={{ delay: 2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-600/20"></div>
                </motion.div>
              </div>
            </div>
            
            {/* Download button */}
            <motion.div 
              className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Download className="w-8 h-8 text-primary-foreground group-hover:scale-110 transition-transform" />
            </motion.div>
          </div>
          
          {/* Floating Feature Cards */}
          <motion.div 
            className="absolute -top-6 -right-6 bg-card rounded-xl shadow-xl p-4 flex items-center gap-3 backdrop-blur-sm border border-primary/10"
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold">AI Writing Assistant</p>
              <p className="text-xs text-muted-foreground">Enhance content instantly</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-6 left-8 bg-card rounded-xl shadow-xl p-4 backdrop-blur-sm border border-green-500/20"
            animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500"></div>
              </div>
              <div>
                <p className="text-xs font-semibold">50k+ Happy Users</p>
                <p className="text-xs text-green-600">Join them today!</p>
              </div>
            </div>
          </motion.div>
          
          {/* Privacy Shield */}
          <motion.div 
            className="absolute top-1/2 -left-8 transform -translate-y-1/2"
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
  )
}

export default Hero