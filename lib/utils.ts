import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with clsx and tailwind-merge for optimal Tailwind CSS class handling.
 * @param inputs - Class values to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
