import React from 'react';

const parsePositiveInteger = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const MAX_MESSAGES_PER_PROJECT = parsePositiveInteger(
  process.env.NEXT_PUBLIC_MAX_MESSAGES_PER_PROJECT,
  10,
);

export const MAX_PROJECTS_PER_USER = parsePositiveInteger(
  process.env.NEXT_PUBLIC_MAX_PROJECTS_PER_USER,
  2,
);

export const BlueLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#2563EB" />
    <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="16" r="3" fill="white" />
  </svg>
);
