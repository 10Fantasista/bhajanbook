import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Common spelling variations for Sanskrit/Gujarati terms
const commonVariations: Record<string, string[]> = {
  'kr̥ṣṇa': ['krishna', 'krsna', 'krushna', 'krshn'],
  'gaṇēśa': ['ganesh', 'ganesha', 'ganesa', 'ganpati', 'ganapati'],
  'śiva': ['shiva', 'siva', 'shiv', 'siwa'],
  'rāma': ['ram', 'rama', 'raam'],
  'ōm': ['om', 'aum', 'ohm'],
  'viṣṇu': ['vishnu', 'visnu', 'bishnu'],
  'lakṣmī': ['lakshmi', 'laxmi', 'laksmi'],
  'dēvī': ['devi', 'devee'],
  'bhakti': ['bhakti', 'bhakth'],
  'māta': ['mata', 'matha', 'maa'],
  'pūjā': ['puja', 'pooja', 'pooja'],
  'ārti': ['arti', 'aarti', 'arati', 'arthi']
};

// Remove diacritics and normalize text for searching
export function normalizeText(text: string): string {
  let normalized = text
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

  // Check if this normalized text matches any known variations
  for (const [standard, variations] of Object.entries(commonVariations)) {
    // If the input matches any variation, normalize to the standard form
    if (variations.includes(normalized)) {
      return normalizeBasic(standard);
    }
    // If the input is the normalized standard form, keep it
    if (normalizeBasic(standard) === normalized) {
      return normalized;
    }
  }

  return normalized;
}

// Basic normalization without special handling
function normalizeBasic(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}