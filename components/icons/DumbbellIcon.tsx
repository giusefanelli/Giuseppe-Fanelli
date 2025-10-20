import React from 'react';

export const DumbbellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Dumbbell handle */}
    <path d="M7 12h10" />

    {/* Left weight plate (base) */}
    <path d="M7 9H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3" />

    {/* Right weight plate */}
    <path d="M17 9h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-3" />

    {/* AI Circuit on Left Plate */}
    {/* The Central Processor */}
    <rect x="3.5" y="11" width="2" height="2" rx="0.5" />
    
    {/* Circuit Lines */}
    <path d="M4.5 11V9.5" />
    <path d="M4.5 13v1.5" />
    <path d="M3.5 12H2" />
    <path d="M5.5 12H7" />
  </svg>
);
