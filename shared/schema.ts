import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bhajans = pgTable("bhajans", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull(),
  title: text("title").notNull(),
  titleEnglish: text("title_english").notNull(),
  lyrics: text("lyrics").notNull(),
  lyricsEnglish: text("lyrics_english").notNull(),
  description: text("description"),
  descriptionEnglish: text("description_english"),
});

export const insertBhajanSchema = createInsertSchema(bhajans).omit({ id: true });

export type InsertBhajan = z.infer<typeof insertBhajanSchema>;
export type Bhajan = typeof bhajans.$inferSelect;
