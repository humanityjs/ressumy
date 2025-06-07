import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, FileText, Github, Heart, Linkedin, Save, X } from 'lucide-react';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router';

interface ContextualNavProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

// You can do anything here, like adding a header, footer, or sidebar
export function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [contextualNav, setContextualNav] = React.useState<ContextualNavProps | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // Provide context for child components to update nav
  const updateContextualNav = React.useCallback((navProps: ContextualNavProps | null) => {
    setContextualNav(navProps);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm z-50 sticky top-0">
        <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors duration-300">
                  <FileText className="size-4 sm:size-5" />
                </div>
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Ressumy
              </span>
            </Link>
            
            {/* Contextual Title with mobile optimization */}
            <AnimatePresence mode="wait">
              {contextualNav && (
                <motion.div 
                  className="ml-2 sm:ml-6 border-l pl-2 sm:pl-6 border-border/50 min-w-0 flex-1"
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.4
                  }}
                >
                  <motion.h2 
                    className="font-semibold text-sm sm:text-lg truncate"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {contextualNav.title}
                  </motion.h2>
                  {contextualNav.subtitle && (
                    <motion.p 
                      className="text-xs text-muted-foreground truncate hidden sm:block"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      {contextualNav.subtitle}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6 shrink-0">
            {/* Show either contextual actions or default nav with mobile optimization */}
            <AnimatePresence mode="wait">
              {contextualNav?.actions ? (
                <motion.div 
                  className="flex items-center gap-1 sm:gap-2"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    duration: 0.3
                  }}
                >
                  {/* Mobile-optimized action buttons */}
                  <div className="flex gap-1 sm:hidden">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => {
                        // Trigger preview action by finding the original button
                        const previewBtn = document.querySelector('[data-action="preview"]') as HTMLButtonElement;
                        if (previewBtn) {
                          previewBtn.click();
                        }
                      }}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => {
                        // Trigger save action by finding the original button
                        const saveBtn = document.querySelector('[data-action="save"]') as HTMLButtonElement;
                        if (saveBtn) {
                          saveBtn.click();
                        }
                      }}
                    >
                      <Save className="w-3 h-3" />
                    </Button>
                  </div>
                  {/* Desktop action buttons */}
                  <div className="hidden sm:flex sm:gap-2">
                    {contextualNav.actions}
                  </div>
                </motion.div>
              ) : (
                <motion.nav 
                  className="hidden md:block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="flex gap-6">
                    <li>
                      <Link 
                        to="/" 
                        className="text-sm font-medium hover:text-primary transition-colors duration-200 relative group"
                      >
                        Home
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/templates"
                        className="text-sm font-medium hover:text-primary transition-colors duration-200 relative group"
                      >
                        Templates
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/editor"
                        className="text-sm font-medium hover:text-primary transition-colors duration-200 relative group"
                      >
                        Editor
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                  </ul>
                </motion.nav>
              )}
            </AnimatePresence>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              {user && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm text-muted-foreground hidden lg:inline">
                    Welcome back!
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-xs sm:text-sm hover:bg-destructive/10 hover:text-destructive transition-colors h-8 px-2 sm:px-3"
                  >
                    Sign out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet context={{ updateContextualNav }} />
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <FileText className="size-5" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Ressumy
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Create beautiful, professional résumés with complete privacy. 
                Your data never leaves your device.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/humanityjs"
                  className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="size-4" />
                </a>
                <a
                  href="https://x.com/humanityjs"
                  className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="X"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <X className="size-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/daniel-bamidele/"
                  className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="size-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/templates"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    to="/editor"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Editor
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Import Resume
                  </Link>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider">
                Features
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">
                  AI-Powered Writing
                </li>
                <li className="text-sm text-muted-foreground">
                  100% Privacy
                </li>
                <li className="text-sm text-muted-foreground">
                  Offline Support
                </li>
                <li className="text-sm text-muted-foreground">
                  PDF Export
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/humanityjs/ressumy/issues"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/humanityjs/ressumy/blob/main/PRIVACY.md"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/humanityjs/ressumy/blob/main/TERMS.md"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Ressumy. All rights reserved.
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart className="size-4 text-red-500 fill-current" />
                <span>for job seekers everywhere</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
