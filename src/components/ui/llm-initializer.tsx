import { useLLM } from '@/lib/llm';
import { hasAICapability, isMobileDevice } from '@/lib/utils';
import { Brain, Loader2, Monitor, Smartphone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './button';
import { Progress } from './progress';

/**
 * LLMInitializer component
 * This component initializes the LLM as soon as it mounts,
 * and provides visual feedback about the initialization status.
 * On mobile devices, it shows a message explaining that AI features work best on desktop.
 */
export function LLMInitializer() {
  const { isInitialized, isLoading, initialize, progress } = useLLM();
  const [showStatus, setShowStatus] = useState(true); // Always show on initial load
  const [lastProgress, setLastProgress] = useState(0);
  const [stuckCounter, setStuckCounter] = useState(0);
  const [forceReady, setForceReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAI, setHasAI] = useState(true);

  // Check device capabilities on mount
  useEffect(() => {
    setIsMobile(isMobileDevice());
    setHasAI(hasAICapability());
  }, []);

  // Start initializing LLM on component mount (only if device supports it)
  useEffect(() => {
    const initLLM = async () => {
      if (!hasAI) {
        console.log('Device does not support AI features, skipping LLM initialization');
        return;
      }

      if (!isInitialized && !isLoading) {
        console.log('Auto-initializing LLM...');
        try {
          const success = await initialize();
          console.log('LLM initialization completed with status:', success);
          if (success) {
            setForceReady(true);
          }
        } catch (error) {
          console.error('Failed to auto-initialize LLM:', error);
        }
      }
    };

    initLLM();
  }, [isInitialized, isLoading, initialize, hasAI]);

  // Detect if progress is stuck
  useEffect(() => {
    if (
      isLoading &&
      progress === lastProgress &&
      progress > 0 &&
      progress < 100
    ) {
      const timer = setTimeout(() => {
        setStuckCounter((prev) => prev + 1);
      }, 10000); // Check every 10 seconds

      return () => clearTimeout(timer);
    } else if (progress !== lastProgress) {
      setLastProgress(progress);
      setStuckCounter(0);
    }
  }, [isLoading, progress, lastProgress]);

  // Auto-hide when initialized after 5 seconds
  useEffect(() => {
    if (isInitialized || forceReady) {
      const timer = setTimeout(() => {
        setShowStatus(false);
      }, 5000); // Hide after 5 seconds of being ready

      return () => clearTimeout(timer);
    }
  }, [isInitialized, forceReady]);

  // Check for successful initialization in console logs
  useEffect(() => {
    // Create a function to monitor console logs
    const originalConsoleLog = console.log;
    console.log = function (...args) {
      if (args[0] === 'Successfully initialized model:') {
        setForceReady(true);
      }
      originalConsoleLog.apply(console, args);
    };

    // Restore original console.log when component unmounts
    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  // Listen for custom initialization event
  useEffect(() => {
    const handleInitialized = (event: Event) => {
      console.log('LLM initialization event received', event);
      setForceReady(true);
    };

    window.addEventListener('llm-initialized', handleInitialized);

    return () => {
      window.removeEventListener('llm-initialized', handleInitialized);
    };
  }, []);

  const isReady = isInitialized || forceReady;

  // Don't show anything if AI is not supported and user has dismissed the message
  if (!hasAI && !showStatus) {
    return null;
  }

  // Always render the component, controlled by opacity rather than unmounting
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 bg-background rounded-lg shadow-lg border p-3 w-80 transition-opacity duration-300 ${
        showStatus ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isMobile ? (
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Brain className="h-4 w-4 text-primary" />
            )}
            <span className="text-sm font-medium">
              {isMobile ? 'AI Text Assistant' : 'AI Text Assistant'}
            </span>
          </div>
          
          {!hasAI ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
              onClick={() => setShowStatus(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          ) : isReady ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-500">Ready</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0"
                onClick={() => setShowStatus(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="text-xs">{progress}%</span>
            </div>
          )}
        </div>

        {!hasAI ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Monitor className="h-3 w-3" />
              <span>Best on desktop/laptop</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AI writing assistance works best on desktop or laptop computers. You can still create amazing resumes on mobile - the AI features will be available when you switch to a larger device.
            </p>
          </div>
        ) : !isReady ? (
          <>
            <Progress value={progress} className="h-1" />
            <p className="text-xs text-muted-foreground">
              {progress === 100
                ? 'Just finishing up...'
                : stuckCounter > 2
                ? 'Taking a bit longer than usual... hang tight!'
                : 'Loading AI text helper. This might take a few minutes on first use.'}
            </p>
          </>
        ) : (
          <p className="text-xs text-muted-foreground">
            AI assistant is ready! You can now enhance your text with AI
            suggestions.
          </p>
        )}
      </div>
    </div>
  );
}
