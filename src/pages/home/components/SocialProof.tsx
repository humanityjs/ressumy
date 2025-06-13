import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "Finally, a resume builder that respects my privacy! The AI suggestions helped me articulate my achievements perfectly.",
    author: "Sarah Chen",
    role: "Software Engineer"
  },
  {
    content: "I love that I don't need to create an account. Just open, build, and download. It's that simple!",
    author: "Michael Rodriguez",
    role: "Marketing Manager"
  },
  {
    content: "The templates are modern and ATS-friendly. Landed 3 interviews in my first week of applying!",
    author: "Emily Thompson",
    role: "Data Analyst"
  }
];

export default function SocialProof() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Loved by job seekers worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands who've landed their dream jobs with Ressumy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600" />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 