import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes safely using clsx + tailwind-merge.
 * Resolves conflicts (e.g. "px-2 px-4" → "px-4") and handles conditionals.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
