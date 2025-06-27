import { Badge } from '@/components/ui/badge';
import { templates } from '@/templates';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Crown,
  Layers,
  Lightbulb,
  Minus,
  Sparkles,
} from 'lucide-react';

export type FilterCategory =
  | 'all'
  | 'professional'
  | 'modern'
  | 'creative'
  | 'executive'
  | 'minimal';

const categoryFilters = [
  {
    id: 'all' as FilterCategory,
    name: 'All Templates',
    icon: <Layers className="w-4 h-4" />,
    color: 'from-slate-500/20 to-slate-600/10 border-slate-500/30',
  },
  {
    id: 'professional' as FilterCategory,
    name: 'Professional',
    icon: <Briefcase className="w-4 h-4" />,
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
  },
  {
    id: 'modern' as FilterCategory,
    name: 'Modern',
    icon: <Sparkles className="w-4 h-4" />,
    color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  },
  {
    id: 'creative' as FilterCategory,
    name: 'Creative',
    icon: <Lightbulb className="w-4 h-4" />,
    color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
  },
  {
    id: 'executive' as FilterCategory,
    name: 'Executive',
    icon: <Crown className="w-4 h-4" />,
    color: 'from-green-500/20 to-green-600/10 border-green-500/30',
  },
  {
    id: 'minimal' as FilterCategory,
    name: 'Minimal',
    icon: <Minus className="w-4 h-4" />,
    color: 'from-teal-500/20 to-teal-600/10 border-teal-500/30',
  },
];

interface FilterPillsProps {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
}

export default function FilterPills({
  activeFilter,
  onFilterChange,
}: FilterPillsProps) {
  return (
    <motion.div
      className="sticky top-[70px] z-40 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-wrap gap-3 justify-center px-4">
        {categoryFilters.map((filter) => {
          const isActive = activeFilter === filter.id;
          const templateCount =
            filter.id === 'all'
              ? templates.length
              : templates.filter((t) => t.category === filter.id).length;

          return (
            <motion.button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`
                relative flex items-center gap-2.5 px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer backdrop-blur-md
                ${
                  isActive
                    ? `bg-gradient-to-r ${filter.color} text-foreground shadow-lg border hover:shadow-xl`
                    : 'bg-background/40 text-muted-foreground hover:text-foreground hover:bg-background/60 border border-border/30 shadow-sm hover:shadow-md'
                }
              `}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <div
                className={`flex items-center justify-center ${
                  isActive ? 'text-current' : 'text-muted-foreground'
                }`}
              >
                {filter.icon}
              </div>
              <span className="whitespace-nowrap">{filter.name}</span>
              <Badge
                variant="secondary"
                className={`text-xs px-2 py-0.5 min-w-[1.5rem] justify-center ${
                  isActive
                    ? 'bg-background/30 text-current border-current/20'
                    : 'bg-muted/60 text-muted-foreground border-muted-foreground/20'
                }`}
              >
                {templateCount}
              </Badge>

              {isActive && (
                <motion.div
                  layoutId="activeFilterGlow"
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-sm"
                  initial={false}
                  transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
