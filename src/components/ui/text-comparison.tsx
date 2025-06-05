import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './button';

interface TextComparisonProps {
  originalText: string;
  enhancedText: string;
  onAccept: () => void;
  onReject: () => void;
  className?: string;
}

export function TextComparison({
  originalText,
  enhancedText,
  onAccept,
  onReject,
  className,
}: TextComparisonProps) {
  const [showComparison, setShowComparison] = useState(true);

  // Prepare text for comparison display
  const prepareLineDiff = () => {
    const origLines = originalText.split('\n');
    const enhancedLines = enhancedText.split('\n');

    // For single line text (most common case), we'll show it as a single line diff
    if (origLines.length === 1 && enhancedLines.length === 1) {
      return (
        <div className="py-1">
          <motion.div
            className="flex hover:bg-red-50/10 dark:hover:bg-red-950/30 border-b border-gray-100 dark:border-gray-800"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-6 flex-shrink-0 text-center text-xs text-red-500 font-bold select-none">
              -
            </div>
            <pre className="px-2 py-1 text-red-700 dark:text-red-300 w-full whitespace-pre-wrap">
              {originalText}
            </pre>
          </motion.div>
          <motion.div
            className="flex hover:bg-green-50/10 dark:hover:bg-green-950/30"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="w-6 flex-shrink-0 text-center text-xs text-green-500 font-bold select-none">
              +
            </div>
            <pre className="px-2 py-1 text-green-700 dark:text-green-300 w-full whitespace-pre-wrap">
              {enhancedText}
            </pre>
          </motion.div>
        </div>
      );
    }

    // For multi-line text, we'll create a line-by-line diff
    return (
      <div className="py-1">
        {origLines.map((line, i) => (
          <motion.div
            key={`orig-${i}`}
            className="flex hover:bg-red-50/10 dark:hover:bg-red-950/30"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            <div className="w-6 flex-shrink-0 text-center text-xs text-red-500 font-bold select-none">
              -
            </div>
            <pre className="px-2 py-1 text-red-700 dark:text-red-300 w-full whitespace-pre-wrap">
              {line || ' '}
            </pre>
          </motion.div>
        ))}

        {enhancedLines.map((line, i) => (
          <motion.div
            key={`enh-${i}`}
            className="flex hover:bg-green-50/10 dark:hover:bg-green-950/30"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: (origLines.length + i) * 0.05 }}
          >
            <div className="w-6 flex-shrink-0 text-center text-xs text-green-500 font-bold select-none">
              +
            </div>
            <pre className="px-2 py-1 text-green-700 dark:text-green-300 w-full whitespace-pre-wrap">
              {line || ' '}
            </pre>
          </motion.div>
        ))}
      </div>
    );
  };

  // If user rejects, hide the comparison
  const handleReject = () => {
    setShowComparison(false);
    onReject();
  };

  // If user accepts, hide the comparison and accept the change
  const handleAccept = () => {
    setShowComparison(false);
    onAccept();
  };

  if (!showComparison) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        'rounded-md border overflow-hidden bg-background my-2 shadow-sm',
        className
      )}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-sm font-medium py-2 px-3 bg-muted/40 border-b flex items-center">
        <span className="flex-1">AI Enhancement Suggestion</span>
        <span className="text-xs text-muted-foreground">Compare changes</span>
      </div>

      <div className="font-mono text-sm overflow-x-auto bg-muted/5">
        {prepareLineDiff()}
      </div>

      <div className="flex justify-end space-x-2 p-2 bg-muted/20 border-t">
        <Button variant="outline" size="sm" onClick={handleReject}>
          <X className="h-4 w-4 mr-1" />
          Reject
        </Button>
        <Button variant="default" size="sm" onClick={handleAccept}>
          <Check className="h-4 w-4 mr-1" />
          Accept
        </Button>
      </div>
    </motion.div>
  );
}
