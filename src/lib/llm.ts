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

// ADD_INTERFACE_START
// Result returned when converting a rough, unstructured job description into a concise summary and action-oriented bullet points.
interface JobStructureResult {
  summary: string;
  bullets: string[];
  success: boolean;
  error?: string;
}
// ADD_INTERFACE_END

class LLMService {
  private config: LLMConfig;
  private isLoading: boolean = false;
  private loadProgress: number = 0;
  private isInitialized: boolean = false;
  private listeners: Set<(progress: number) => void> = new Set();
  private initListeners: Set<(isInitialized: boolean) => void> = new Set();
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

      // Notify initialization listeners
      this.initListeners.forEach((listener) => listener(true));

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

                  // Notify initialization listeners
                  this.initListeners.forEach((listener) => listener(true));
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

        // Notify initialization listeners
        this.initListeners.forEach((listener) => listener(true));

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
        content: `You are a friendly career-coach AI. Rewrite the user's résumé bullet so it reads like a confident, human voice while staying accomplishment-focused.

        Style & Tone:
        • Warm, energetic, concise—skip buzzwords like "results-oriented".
        • Contractions are okay if they feel natural.
        • No list markers or hyphens—return the sentence only.

        Content Rules:
        • Begin with a vivid action verb.
        • Keep roughly the same length (1 succinct sentence).
        • Include concrete metrics where appropriate.

        IMPORTANT: Reply with ONLY the rewritten sentence (no bullet symbol, no prefixes, no commentary).`,
      };

      const userMessage: ChatCompletionUserMessageParam = {
        role: 'user',
        content: `Improve this resume bullet: ${text}`,
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
        /^(here['']s |here is |i['']ve |i have |that sounds |that['']s |bullet point |summary |content )?(more impactful|more natural|more compelling|improved|better|clearer|stronger|enhanced|refined)( and )?(natural|impactful|compelling|professional|effective)?:?\s*/i,
        ''
      );

      // Also remove prefixes like "summary that's more impactful and natural:"
      improvedText = improvedText.replace(
        /^(summary|bullet point|text|content|version|point|statement)(\s+that['']s|\s+that\s+is)?(\s+)(more|better|clearer)(\s+).*?:/i,
        ''
      );

      // Remove quotes if the model wrapped the response in them
      improvedText = improvedText.replace(/^["'](.+)["']$/s, '$1');
      improvedText = improvedText.replace(/^(.+):$/s, '$1');

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
        content: `You are a friendly career-coach AI. Rewrite the user's résumé summary so it feels like something they would naturally say when introducing themselves to a colleague.

        Style & Tone:
        • Warm, conversational, confident—avoid corporate buzzwords like "results-driven" or "highly skilled".
        • Use plain English and varied sentence length; contractions (I'm, I've) are welcome if they sound natural.
        • Keep it first-person implied: no "I" unless it genuinely improves flow.
        • One short paragraph, 3-4 sentences (~80-120 words). No lists.

        Content:
        • Highlight key experience, primary tech stack, and collaboration strengths.
        • Include one concrete fact or metric if it fits naturally (e.g., "7 years" of experience).
        • End with a forward-looking statement that shows curiosity or passion for learning.

        IMPORTANT: Return ONLY the rewritten paragraph—no labels, prefixes, or extra commentary.`,
      };

      const userMessage: ChatCompletionUserMessageParam = {
        role: 'user',
        content: `Improve this summary by making it more impactful and natural: ${text}`,
      };

      // Use OpenAI-compatible API to generate response
      const response = await engine.chat.completions.create({
        messages: [systemMessage, userMessage],
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxTokens || 512,
      });

      // Extract the polished text from the response and clean it
      let improvedText = response.choices[0]?.message.content?.trim() || text;

      // Remove common prefixes the model might still add despite instructions
      improvedText = improvedText.replace(
        /^(here['’]?s\s+)?(a\s+)?(revised|rewritten|improved)?\s*(resume\s+)?summary(\s+that['’]?s?\s+|\s+that\s+is\s+)?(more\s+)?(impactful|natural|compelling|professional|effective|concise)[^:]*:\s*/i,
        ''
      );

      // Additional catch-all removal for generic lead-ins like "Here's the ...:" or "Here is the ...:"
      improvedText = improvedText.replace(
        /^here['’]?s\s+(the\s+)?(rewritten|revised|improved)\s+summary\s*:?/i,
        ''
      );

      // Also remove prefixes like "summary that's more impactful and natural:"
      improvedText = improvedText.replace(
        /^(summary|bullet point|text|content|version|point|statement)(\s+that['']s|\s+that\s+is)?(\s+)(more|better|clearer)(\s+).*?:/i,
        ''
      );

      // Remove quotes if the model wrapped the response in them
      improvedText = improvedText.replace(/^["'](.+)["']$/s, '$1');
      improvedText = improvedText.replace(/^(.+):$/s, '$1');

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
   * Transform a rough and incoherent job description into a concise summary and bullet points.
   * @param text Raw user input describing job responsibilities and achievements.
   * @returns Structured summary and bullet list.
   */
  async structureJobDescription(text: string): Promise<JobStructureResult> {
    // Ensure model is ready
    if (!this.isInitialized || !this.engine) {
      try {
        const initialized = await this.initialize();
        if (!initialized || !this.engine) {
          return {
            summary: text,
            bullets: [],
            success: false,
            error: 'LLM not initialized',
          };
        }
      } catch (error) {
        console.error('Failed to initialize LLM:', error);
        return {
          summary: text,
          bullets: [],
          success: false,
          error: 'Failed to initialize LLM',
        };
      }
    }

    try {
      const engine = this.engine!;

      const systemMessage: ChatCompletionSystemMessageParam = {
        role: 'system',
        content: `You are a supportive career-coach AI helping transform rough job descriptions into résumé-ready content.

        Output requirements (JSON only): {"summary": string, "bullets": string[] }

        For the "summary":
        • One warm, conversational paragraph (1–2 sentences, ~30–40 words).
        • Highlight the role's impact and scope without corporate jargon.

        For each element in "bullets":
        • Single concise sentence starting with a strong action verb.
        • Include a tangible metric or outcome when it feels natural.
        • Avoid buzzwords; keep language human and engaging.

        IMPORTANT: Return ONLY the JSON object on a single line—no markdown, no commentary.`,
      };

      const userMessage: ChatCompletionUserMessageParam = {
        role: 'user',
        content: `Raw role description: ${text}`,
      };

      const response = await engine.chat.completions.create({
        messages: [systemMessage, userMessage],
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxTokens || 512,
      });

      let raw = response.choices[0]?.message.content?.trim() || '';

      // The model might wrap JSON in markdown code block – strip if present
      raw = raw.replace(/^```(?:json)?\s*|\s*```$/g, '');

      let parsed: JobStructureResult | null = null;
      try {
        const safe = raw
          .trim()
          // Remove any leading text before first brace and trailing text after last brace
          .replace(/^[\s\S]*?(\{[\s\S]*?\}).*$/s, '$1')
          .replace(/,\s*}/g, '}')
          .replace(/,\s*]/g, ']');
        parsed = JSON.parse(safe);
      } catch (parseErr) {
        console.warn('Failed to parse JSON. Attempting recovery.', parseErr);
        // Give up – return raw text as summary
        return {
          summary: raw || text,
          bullets: [],
          success: false,
          error: 'Malformed JSON returned by LLM',
        };
      }

      if (
        parsed &&
        Array.isArray(parsed.bullets) &&
        typeof parsed.summary === 'string'
      ) {
        return {
          summary: parsed.summary,
          bullets: parsed.bullets,
          success: true,
        };
      }

      return {
        summary: parsed?.summary || text,
        bullets: parsed?.bullets || [],
        success: false,
        error: 'Unexpected JSON structure',
      };
    } catch (error) {
      console.error('Error structuring job description:', error);
      return {
        summary: text,
        bullets: [],
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
   * Subscribe to initialization state changes
   * @param callback Function to call when initialization state changes
   * @returns Unsubscribe function
   */
  subscribeToInitialization(
    callback: (isInitialized: boolean) => void
  ): () => void {
    this.initListeners.add(callback);
    return () => this.initListeners.delete(callback);
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
    const unsubscribeProgress = llmService.subscribeToProgress(
      (newProgress) => {
        setProgress(newProgress);
      }
    );

    // Subscribe to initialization state changes
    const unsubscribeInit = llmService.subscribeToInitialization(
      (initialized) => {
        setIsInitialized(initialized);
      }
    );

    // Auto-initialize if not already initialized
    if (!state.isInitialized && !state.isLoading) {
      llmService.initialize().then((success) => {
        setIsInitialized(success);
      });
    }

    return () => {
      unsubscribeProgress();
      unsubscribeInit();
    };
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

  const structureJobDescription = async (text: string) => {
    return llmService.structureJobDescription(text);
  };

  return {
    initialize,
    polishBullet,
    polishSummary,
    structureJobDescription,
    progress,
    isLoading,
    isInitialized,
  };
};
