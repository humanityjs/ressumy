import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const templateCategories = ['Professional', 'Creative', 'Technical', 'Executive'];

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = React.useState(0);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Professional templates for every career
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of ATS-friendly templates designed by HR professionals
          </p>
        </div>

        <Tabs value={templateCategories[selectedTemplate]} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
            {templateCategories.map((category, index) => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setSelectedTemplate(index)}
                className="text-sm"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {templateCategories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((template) => (
                  <motion.div
                    key={template}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: template * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                      <div className="aspect-[3/4] bg-gradient-to-br from-muted/50 to-muted/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                        <div className="p-6 space-y-4">
                          <div className="h-6 w-32 bg-primary/20 rounded" />
                          <div className="space-y-2">
                            <div className="h-2 w-full bg-muted-foreground/10 rounded" />
                            <div className="h-2 w-4/5 bg-muted-foreground/10 rounded" />
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <Button className="w-full" asChild>
                            <Link to="/editor">
                              Use This Template
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{category} Template {template}</h3>
                        <p className="text-sm text-muted-foreground">Perfect for {category.toLowerCase()} roles</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/templates">
              View All Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 