import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Remove diacritics and normalize text for searching
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    // Remove diacritics
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Common substitutions for Gujarati transliteration
    .replace(/ṇ/g, 'n')
    .replace(/ṃ/g, 'm')
    .replace(/ś|ṣ/g, 'sh')
    .replace(/ṛ|ṝ/g, 'r')
    .replace(/ḍ/g, 'd')
    .replace(/ṭ/g, 't')
    .replace(/ñ/g, 'n')
    .replace(/ṅ/g, 'n')
    .replace(/ā/g, 'a')
    .replace(/ī/g, 'i')
    .replace(/ū/g, 'u')
    .replace(/ē/g, 'e')
    .replace(/ō/g, 'o')
    .trim();
}