'use client';

import React from 'react';

interface DoodleProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

// Sparkle Doodle
export const Sparkle = ({ color = 'currentColor', size = 24, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83" />
  </svg>
);

// Hand-drawn Star
export const Star = ({ color = 'currentColor', size = 24, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <path d="M12 2l2.5 6.5H21l-5.3 4.2 2 6.3-5.7-4.2-5.7 4.2 2-6.3L3 8.5h6.5z" />
  </svg>
);

// Curvy Arrow Doodle
export const Arrow = ({ color = 'currentColor', size = 32, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <path d="M8 12c12 2 24 8 28 20" />
    <path d="M28 32h8v-8" />
  </svg>
);

// Smiley Face
export const Smiley = ({ color = 'currentColor', size = 28, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M9 10h.01M15 10h.01" strokeWidth="2.5" />
    <path d="M8 14.5c1.5 2 4.5 2 8 0" />
  </svg>
);

// Little Coin
export const Coin = ({ color = 'currentColor', size = 24, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8c.5-1 2.5-1 2.5.5s-2 2-2 3c0 .5 1 1 2 1" />
    <path d="M12 6v12" />
  </svg>
);

// Lightning Bolt
export const Lightning = ({ color = 'currentColor', size = 24, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

// Plant Doodle
export const Plant = ({ color = 'currentColor', size = 48, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <path d="M24 16c4-8 12-4 12-4s-2 8-8 10" />
    <path d="M24 20c-4-8-12-4-12-4s2 8 8 10" />
    <path d="M24 8v32" />
    <path d="M16 40h16" />
    <path d="M20 34c0-4 8-4 8 0" />
  </svg>
);

// Rocket Doodle
export const Rocket = ({ color = 'currentColor', size = 48, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <path d="M24 6s10 6 10 18c0 6-4 10-10 10S14 30 14 24C14 12 24 6 24 6z" />
    <path d="M14 24h-4c-2 0-4 4-2 6l6 4M34 24h4c2 0 4 4 2 6l-6 4" />
    <path d="M20 34v6c0 2 2 4 4 4s4-2 4-4v-6" />
    <circle cx="24" cy="18" r="3" />
  </svg>
);

// Coffee Cup Doodle
export const CoffeeCup = ({ color = 'currentColor', size = 48, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <path d="M12 16h24v18c0 4-4 8-12 8s-12-4-12-8V16z" />
    <path d="M36 20h4c2.5 0 4 2 4 4s-1.5 4-4 4h-4" />
    <path d="M16 6v4M24 5v5M32 6v4" />
  </svg>
);

// Paper Airplane
export const PaperAirplane = ({ color = 'currentColor', size = 42, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <path d="M42 6L6 22l14 6 6 14 16-36z" />
    <path d="M20 28l8-8" />
  </svg>
);

// Heart Doodle
export const Heart = ({ color = 'currentColor', size = 24, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// Small Blob/Shape Accent
export const Blob = ({ color = 'currentColor', size = 32, className, ...props }: DoodleProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={`inline-block ${className || ''}`}
    {...props}
  >
    <path
      d="M24 6c12-3 20 5 18 16s-6 22-18 20S6 34 8 22 12 9 24 6z"
      fill={color}
      opacity="0.15"
    />
  </svg>
);
