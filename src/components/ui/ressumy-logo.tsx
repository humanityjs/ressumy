import { cn } from '@/lib/utils';

interface ResumyLogoProps {
  className?: string;
  size?: number;
}

export function ResumyLogo({ className, size = 20 }: ResumyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-current", className)}
    >
      {/* Main document outline */}
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Header line */}
      <rect
        x="7"
        y="6"
        width="10"
        height="1.5"
        rx="0.75"
        fill="currentColor"
      />
      
      {/* Bullet points representing resume content */}
      <circle cx="7.5" cy="10" r="1" fill="currentColor" />
      <rect x="9.5" y="9.25" width="7.5" height="1.5" rx="0.75" fill="currentColor" />
      
      <circle cx="7.5" cy="13" r="1" fill="currentColor" />
      <rect x="9.5" y="12.25" width="6" height="1.5" rx="0.75" fill="currentColor" />
      
      <circle cx="7.5" cy="16" r="1" fill="currentColor" />
      <rect x="9.5" y="15.25" width="8" height="1.5" rx="0.75" fill="currentColor" />
      
      {/* Accent mark in top right - represents "polish" or "enhancement" */}
      <circle cx="17" cy="5" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function ResumyLogomark({ className, size = 20 }: ResumyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-current", className)}
    >
      {/* Simplified version - just the "R" shape made from resume elements */}
      <path
        d="M6 4h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H10l4 6M6 4v16M6 12h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
} 