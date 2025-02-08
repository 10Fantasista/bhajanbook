import localforage from "localforage";
import type { Bhajan } from "@shared/schema";

const BHAJANS_KEY = "bhajans";

export async function cacheBhajans(bhajans: Bhajan[]): Promise<void> {
  await localforage.setItem(BHAJANS_KEY, bhajans);
}

export async function getCachedBhajans(): Promise<Bhajan[] | null> {
  return localforage.getItem<Bhajan[]>(BHAJANS_KEY);
}

export async function clearCache(): Promise<void> {
  await localforage.clear();
}
