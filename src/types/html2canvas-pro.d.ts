declare module 'html2canvas-pro' {
  export interface Options {
    /** Whether to allow mixed content (using images from another origin with a CORS policy). */
    allowTaint?: boolean;
    /** Canvas background color, if none is specified in DOM. Set null for transparent. */
    backgroundColor?: string | null;
    /** Whether to use the canvas height attribute to crop the canvas. */
    canvas?: HTMLCanvasElement | null;
    /** Whether to use ForeignObject rendering if the browser supports it. */
    foreignObjectRendering?: boolean;
    /** Whether to render more pixels than needed and let the browser scale down the canvas for better quality when scaling. */
    scale?: number;
    /** Whether to log events in the console. */
    logging?: boolean;
    /** Proxy URL for loading cross-origin images. If left empty, cross-origin images won't be loaded. */
    proxy?: string;
    /** Whether to clean up proxy URL responses. */
    removeContainer?: boolean;
    /** Whether to use CORS to load images from a different origin. */
    useCORS?: boolean;
    /** HTML element or selector to scroll while rendering. */
    scrollX?: number;
    /** HTML element or selector to scroll while rendering. */
    scrollY?: number;
    /** Whether to use letter-rendering for improved text display */
    letterRendering?: boolean;
    /** Additional options */
    [key: string]: unknown;
  }

  /**
   * Generate canvas from HTML element
   * @param element HTML element or selector
   * @param options Rendering options
   */
  export default function html2canvas(
    element: HTMLElement | string,
    options?: Partial<Options>
  ): Promise<HTMLCanvasElement>;
}
