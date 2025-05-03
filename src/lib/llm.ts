import {
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
  CreateMLCEngine,
  InitProgressCallback,
  InitProgressReport,
  MLCEngine,
  prebuiltAppConfig,
} from '@mlc-ai/web-llm';
import { useEffect, useState } from 'react';

interface LLMConfig {
  model: string;
  modelPath?: string;
  maxTokens?: number;
  temperature?: number;
}

interface PolishResult {
  polishedText: string;
  success: boolean;
  error?: string;
}

class LLMService {
  private config: LLMConfig;
  private isLoading: boolean = false;
  private loadProgress: number = 0;
  private isInitialized: boolean = false;
  private listeners: Set<(progress: number) => void> = new Set();
  private engine: MLCEngine | null = null;

  constructor(
    config: LLMConfig = {
      model: 'Llama-3.1-8B-Instruct-q4f16_1-MLC',
      temperature: 0.7,
      maxTokens: 512,
    }
  ) {
    this.config = config;
  }

  /**
   * Initialize the LLM
   * @param progressCallback Callback for tracking load progress
   * @returns Promise that resolves when the model is loaded
   */
  async initialize(
    progressCallback?: (report: InitProgressReport) => void
  ): Promise<boolean> {
    if (this.isInitialized) return true;
    if (this.isLoading) return false;

    try {
      this.isLoading = true;

      // Setup progress reporting
      const progressHandler: InitProgressCallback = (report) => {
        const progress = Math.floor(report.progress * 100);
        this.loadProgress = progress;

        // Notify all listeners
        this.listeners.forEach((listener) => listener(progress));

        // Call the original callback if provided
        if (progressCallback) progressCallback(report);
      };

      // Try to initialize with primary model - if that fails, try alternatives
      const modelOptions = [
        this.config.model,
        'Llama-3.1-8B-Instruct-q4f16_1-MLC',
        'Llama-3.1-8B-Instruct-q4f32_1-MLC',
        'Gemma-2b-it-q4f16_1',
        'Phi-3-mini-4k-instruct-q4f16_1',
        'Mistral-7B-Instruct-v0.3-q4f16_1',
      ];

      const result = await this.tryInitializeModel(
        modelOptions,
        progressHandler
      );

      this.isInitialized = result.success;
      this.isLoading = false;

      if (!result.success) {
        console.error('Failed to initialize any model');
      } else if (result.modelUsed !== this.config.model) {
        console.log(`Using fallback model: ${result.modelUsed}`);
        this.config.model = result.modelUsed;
      }

      return result.success;
    } catch (error) {
      this.isLoading = false;
      console.error('Error initializing LLM:', error);
      return false;
    }
  }

  /**
   * Try to initialize models in order until one succeeds
   * @param modelIds Array of model IDs to try in order
   * @param progressHandler Progress callback
   * @returns Result with success status and model used
   */
  private async tryInitializeModel(
    modelIds: string[],
    progressHandler: InitProgressCallback
  ): Promise<{ success: boolean; modelUsed: string }> {
    // Log available models to console for debugging
    console.log(
      'Available models in prebuiltAppConfig:',
      prebuiltAppConfig.model_list.map((m) => m.model_id)
    );

    for (const modelId of modelIds) {
      try {
        console.log(`Attempting to initialize model: ${modelId}`);

        // Initialize the engine with the model
        this.engine = await CreateMLCEngine(modelId, {
          initProgressCallback: (report) => {
            // Ensure progress is always between 0-100
            const progress = Math.min(Math.floor(report.progress * 100), 100);
            this.loadProgress = progress;

            // Log progress at specific intervals
            if (progress % 20 === 0 || progress === 100) {
              console.log(`Model loading progress: ${progress}%`, report);
            }

            // Call the original handler
            progressHandler(report);

            // When we reach 100%, give a moment then check if initialization completed
            if (progress === 100) {
              // Force completion after 3 seconds if not already marked as initialized
              setTimeout(() => {
                if (this.engine && !this.isInitialized) {
                  console.log(
                    'Progress reached 100% but initialization not marked complete. Forcing completion.'
                  );
                  this.isInitialized = true;

                  // Broadcast initialization complete event
                  window.dispatchEvent(
                    new CustomEvent('llm-initialized', {
                      detail: { modelId },
                    })
                  );

                  // Notify listeners of the final state
                  this.listeners.forEach((listener) => listener(100));
                }
              }, 3000);
            }
          },
        });

        console.log(`Successfully initialized model: ${modelId}`);
        this.isInitialized = true;

        // Broadcast initialization complete event
        window.dispatchEvent(
          new CustomEvent('llm-initialized', {
            detail: { modelId },
          })
        );

        // Force a final progress update to ensure UI is updated
        this.listeners.forEach((listener) => listener(100));

        return { success: true, modelUsed: modelId };
      } catch (error) {
        console.warn(`Failed to initialize model ${modelId}:`, error);
        // Continue to the next model
      }
    }

    return { success: false, modelUsed: '' };
  }

  /**
   * Polish resume bullet point text
   * @param text The text to polish
   * @returns Polished text
   */
  async polishBullet(text: string): Promise<PolishResult> {
    // First make sure the engine is initialized
    if (!this.isInitialized || !this.engine) {
      try {
        const initialized = await this.initialize();
        if (!initialized || !this.engine) {
          return {
            polishedText: text,
            success: false,
            error: 'LLM not initialized',
          };
        }
      } catch (error) {
        console.error('Failed to initialize LLM:', error);
        return {
          polishedText: text,
          success: false,
          error: 'Failed to initialize LLM',
        };
      }
    }

    try {
      // Create a local reference to the engine that TypeScript can confirm is non-null
      const engine = this.engine!;

      const systemMessage: ChatCompletionSystemMessageParam = {
        role: 'system',
        content: `You're a friendly career coach helping improve a resume bullet point.

        Make it sound natural and compelling by:
        - Starting with powerful action verbs that feel conversational
        - Keeping any numbers or achievements (or suggesting realistic ones if appropriate)
        - Removing corporate jargon and robotic-sounding phrases
        - Writing at a similar length to what was provided
        - Using a warm, professional tone that sounds like a real person wrote it
        - Focusing on what the person actually accomplished
        
        IMPORTANT: Return ONLY the improved text without any introduction, explanation, or quotes. Do not start with phrases like "Here's a rewritten bullet point..." or similar text. Just provide the polished bullet point directly.`,
      };

      const userMessage: ChatCompletionUserMessageParam = {
        role: 'user',
        content: `Could you make this bullet point sound more natural and impressive? "${text}"`,
      };

      // Use OpenAI-compatible API to generate response
      const response = await engine.chat.completions.create({
        messages: [systemMessage, userMessage],
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxTokens || 512,
      });

      // Extract the polished text from the response and clean it
      let improvedText = response.choices[0]?.message.content?.trim() || text;

      // Remove common prefixes that the model might add despite instructions
      improvedText = improvedText.replace(
        /^(here['']s |here is |i['']ve |i have )?(a |an |the )?(revised|rewritten|improved|enhanced|polished|new|better|updated|refined|professional)( version of)? ?(your |the |this )?(bullet point|point|text|statement|summary|content)?:?\s*/i,
        ''
      );

      // Remove quotes if the model wrapped the response in them
      improvedText = improvedText.replace(/^["'](.+)["']$/, '$1');

      return { polishedText: improvedText, success: true };
    } catch (err) {
      console.error('Error polishing bullet text:', err);
      return {
        polishedText: text,
        success: false,
        error: 'Failed to process text',
      };
    }
  }

  /**
   * Polish resume summary text
   * @param text The summary to polish
   * @returns Polished text
   */
  async polishSummary(text: string): Promise<PolishResult> {
    // First make sure the engine is initialized
    if (!this.isInitialized || !this.engine) {
      try {
        const initialized = await this.initialize();
        if (!initialized || !this.engine) {
          return {
            polishedText: text,
            success: false,
            error: 'LLM not initialized',
          };
        }
      } catch (error) {
        console.error('Failed to initialize LLM:', error);
        return {
          polishedText: text,
          success: false,
          error: 'Failed to initialize LLM',
        };
      }
    }

    try {
      // Create a local reference to the engine that TypeScript can confirm is non-null
      const engine = this.engine!;

      const systemMessage: ChatCompletionSystemMessageParam = {
        role: 'system',
        content: `You're a supportive career coach helping craft a resume summary that stands out.

        Create a summary that feels authentic and human by:
        - Using natural, conversational language that flows well when read
        - Highlighting skills and experience in a way that sounds like a real person talking about themselves
        - Avoiding formulaic phrases and corporate buzzwords that sound artificial
        - Keeping a good length (around 100-200 words)
        - Writing in a warm, professional tone with personality
        - Focusing on unique qualities that tell a compelling story
        
        IMPORTANT: Return ONLY the improved summary without any introduction, explanation, or quotes. Do not start with phrases like "Here's a rewritten summary..." or similar text. Just provide the polished summary directly.`,
      };

      const userMessage: ChatCompletionUserMessageParam = {
        role: 'user',
        content: `Could you help me make this professional summary sound more natural and compelling? "${text}"`,
      };

      // Use OpenAI-compatible API to generate response
      const response = await engine.chat.completions.create({
        messages: [systemMessage, userMessage],
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxTokens || 512,
      });

      // Extract the polished text from the response and clean it
      let improvedText = response.choices[0]?.message.content?.trim() || text;

      // Remove common prefixes that the model might add despite instructions
      improvedText = improvedText.replace(
        /^(here['']s |here is |i['']ve |i have )?(a |an |the )?(revised|rewritten|improved|enhanced|polished|new|better|updated|refined|professional)( version of)? ?(your |the |this )?(summary|profile|bio|text|statement|content)?:?\s*/i,
        ''
      );

      // Remove quotes if the model wrapped the response in them
      improvedText = improvedText.replace(/^["'](.+)["']$/, '$1');

      return { polishedText: improvedText, success: true };
    } catch (error) {
      console.error('Error polishing summary text:', error);
      return {
        polishedText: text,
        success: false,
        error: 'Failed to process text',
      };
    }
  }

  /**
   * Subscribe to progress updates
   * @param callback Function to call with progress updates (0-100)
   * @returns Unsubscribe function
   */
  subscribeToProgress(callback: (progress: number) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Get the current loading state
   */
  getLoadingState() {
    return {
      isLoading: this.isLoading,
      isInitialized: this.isInitialized,
      progress: this.loadProgress,
    };
  }
}

// Create and export a singleton instance
export const llmService = new LLMService();

// Hook for components to use the LLM service
export const useLLM = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Get initial state
    const state = llmService.getLoadingState();
    setIsLoading(state.isLoading);
    setIsInitialized(state.isInitialized);
    setProgress(state.progress);

    // Subscribe to progress updates
    const unsubscribe = llmService.subscribeToProgress((newProgress) => {
      setProgress(newProgress);
    });

    return unsubscribe;
  }, []);

  const initialize = async () => {
    setIsLoading(true);
    const success = await llmService.initialize((report) => {
      setProgress(Math.floor(report.progress * 100));
    });
    setIsInitialized(success);
    setIsLoading(false);
    return success;
  };

  const polishBullet = async (text: string) => {
    return llmService.polishBullet(text);
  };

  const polishSummary = async (text: string) => {
    return llmService.polishSummary(text);
  };

  return {
    initialize,
    polishBullet,
    polishSummary,
    progress,
    isLoading,
    isInitialized,
  };
};
