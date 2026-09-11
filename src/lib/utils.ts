import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// cn(): merge conditional classNames + resolve Tailwind conflicts.
// Use this in every component instead of template-string classNames.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
