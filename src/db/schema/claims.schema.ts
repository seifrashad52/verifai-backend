import { pgTable, text, timestamp, jsonb, pgEnum, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth.schema.js";

export const claimInputTypeEnum = pgEnum("claim_input_type", ["text", "image", "screenshot"]);
export const verdictEnum = pgEnum("verdict", ["true", "false", "unverifiable"]);

// A single "Check a Claim" request made by a user
export const claims = pgTable("claims", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  inputType: claimInputTypeEnum("input_type").notNull(),
  rawText: text("raw_text"), // user-typed claim, or OCR'd/vision-extracted text from an image
  imageUrl: text("image_url"), // stored in object storage (S3/Cloudflare R2) if input was image/screenshot
  verdict: verdictEnum("verdict").notNull(),
  explanation: text("explanation").notNull(),
  // array of {title, url, publisher, publishedAt} used to ground the verdict
  sources: jsonb("sources").notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Follow-up questions asked in the "Ask AI" panel, scoped to either
// a claim (from Check a Claim) or a game level (from the Reveal screen)
export const askAiMessages = pgTable("ask_ai_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  claimId: uuid("claim_id").references(() => claims.id, { onDelete: "cascade" }),
  levelId: uuid("level_id"), // references levels.id, set in game.schema.ts via relations
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sources: jsonb("sources").notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
