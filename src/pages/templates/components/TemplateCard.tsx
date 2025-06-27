import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Template, templates } from '@/templates';
import { motion } from 'framer-motion';
import { Check, Download, Lock } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDownloadSample: (template: Template) => void;
  isDownloading: boolean;
}

export default function TemplateCard({
  template,
  isSelected,
  onSelect,
  onDownloadSample,
  isDownloading,
}: TemplateCardProps) {
  const getCardColors = (index: number) => {
    const colorSchemes = [
      'from-blue-500/10 to-blue-600/5 border-blue-500/20',
      'from-green-500/10 to-green-600/5 border-green-500/20',
      'from-purple-500/10 to-purple-600/5 border-purple-500/20',
      'from-orange-500/10 to-orange-600/5 border-orange-500/20',
      'from-teal-500/10 to-teal-600/5 border-teal-500/20',
      'from-pink-500/10 to-pink-600/5 border-pink-500/20',
    ];
    return colorSchemes[index % colorSchemes.length];
  };

  const cardIndex = templates.findIndex((t) => t.id === template.id);

  return (
    <motion.div
      className={`
        group relative border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
        ${
          isSelected
            ? `ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg bg-gradient-to-br ${getCardColors(
                cardIndex
              )}`
            : 'hover:border-primary/30 shadow-md hover:shadow-lg bg-card hover:bg-card/80'
        }
        ${
          template.isComingSoon
            ? 'opacity-60 cursor-not-allowed'
            : 'cursor-pointer'
        }
      `}
      whileHover={{ scale: template.isComingSoon ? 1 : 1.02 }}
      whileTap={{ scale: template.isComingSoon ? 1 : 0.98 }}
    >
      <div
        className="relative aspect-[3/4] bg-gradient-to-br from-muted/50 to-muted/20 overflow-hidden"
        onClick={() => onSelect(template.id)}
      >
        <img
          src={template.thumbnail}
          alt={`${template.name} template`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {template.isComingSoon && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center">
            <Lock className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-sm font-medium">Coming Soon</span>
            <span className="text-xs text-muted-foreground mt-1">
              Stay tuned!
            </span>
          </div>
        )}

        {isSelected && !template.isComingSoon && (
          <motion.div
            className="absolute top-3 right-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-2 shadow-lg">
              <Check className="h-4 w-4" />
            </div>
          </motion.div>
        )}

        {!template.isComingSoon && (
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="sm"
              className="w-full bg-background/95 backdrop-blur-sm hover:bg-background text-xs font-medium shadow-md border-white/20 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDownloadSample(template);
              }}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-3 h-3 mr-2" />
                  Download Sample
                </>
              )}
            </Button>
          </div>
        )}

        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            getCardColors(cardIndex).split(' ')[0]
          } ${
            getCardColors(cardIndex).split(' ')[1]
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
      </div>

      <div className="p-4 space-y-2" onClick={() => onSelect(template.id)}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
            {template.name}
          </h3>
          {!template.isComingSoon && (
            <Badge
              variant="outline"
              className="text-xs px-2 py-0.5 bg-gradient-to-r from-green-500/10 to-green-600/5 border-green-500/30 text-green-700 dark:text-green-300"
            >
              Free
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {template.description}
        </p>
      </div>
    </motion.div>
  );
}
