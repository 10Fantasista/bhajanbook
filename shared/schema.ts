import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bhajans = pgTable("bhajans", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull(),
  title: text("title").notNull(), // Gujarati title
  titleIso: text("title_iso").notNull(), // ISO 15919 transliteration
  lyrics: text("lyrics").notNull(), // Gujarati lyrics
  lyricsIso: text("lyrics_iso").notNull(), // ISO 15919 transliteration
  description: text("description"), // Optional Gujarati description
  descriptionIso: text("description_iso"), // Optional ISO 15919 description
});

export const insertBhajanSchema = createInsertSchema(bhajans).omit({ id: true });

export type InsertBhajan = z.infer<typeof insertBhajanSchema>;
export type Bhajan = typeof bhajans.$inferSelect;