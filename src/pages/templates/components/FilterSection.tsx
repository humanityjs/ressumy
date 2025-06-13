import { motion } from 'framer-motion';

export default function FilterSection() {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Browse by Category
        </h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Find the perfect template for your industry and style. All templates
          are ATS-friendly and fully customizable.
        </p>
      </div>
    </motion.div>
  );
}
