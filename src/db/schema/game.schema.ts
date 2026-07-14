import {
  pgTable,
  text,
  integer,
  timestamp,
  jsonb,
  boolean,
  pgEnum,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { verdictEnum } from "./claims.schema";

export const platformTypeEnum = pgEnum("platform_type", [
  "whatsapp",
  "facebook",
  "twitter",
  "instagram",
  "tiktok",
  "news_article",
  "other",
]);

// MVP scope: 5 countries. Add rows, don't hardcode in app code.
export const countries = pgTable("countries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(), // e.g. "Egypt"
  nameAr: text("name_ar").notNull(), // e.g. "مصر"
  code: text("code").notNull().unique(), // ISO 3166-1 alpha-2, e.g. "EG"
  flagUrl: text("flag_url"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// A single game level: one scenario, one correct verdict, one explanation
export const levels = pgTable("levels", {
  id: uuid("id").primaryKey().defaultRandom(),
  countryId: uuid("country_id")
    .notNull()
    .references(() => countries.id, { onDelete: "cascade" }),
  orderIndex: integer("order_index").notNull(), // position within the country (difficulty ramps up)
  difficulty: integer("difficulty").notNull(), // 1-5, used for "Play all countries" mixed shuffling
  platformType: platformTypeEnum("platform_type").notNull(),
  scenarioText: text("scenario_text").notNull(), // e.g. simulated WhatsApp message
  scenarioImageUrl: text("scenario_image_url"), // optional simulated screenshot mockup
  correctVerdict: verdictEnum("correct_verdict").notNull(),
  explanation: text("explanation").notNull(), // shown on the Reveal screen
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  countryOrderIdx: uniqueIndex("levels_country_order_idx").on(table.countryId, table.orderIndex),
}));

// Timeline entries for the "Source Trace" shown on the Reveal screen
export const sourceTraceEvents = pgTable("source_trace_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  levelId: uuid("level_id")
    .notNull()
    .references(() => levels.id, { onDelete: "cascade" }),
  orderIndex: integer("order_index").notNull(), // chronological position in the timeline
  eventDate: timestamp("event_date"), // approximate real-world date, nullable if unknown
  title: text("title").notNull(), // e.g. "First posted on a local Facebook group"
  description: text("description").notNull(),
  sourceUrl: text("source_url"), // link to the official/debunking source, if any
});

// One row per user attempt at a level (supports retries / re-plays)
export const userLevelProgress = pgTable("user_level_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  levelId: uuid("level_id")
    .notNull()
    .references(() => levels.id, { onDelete: "cascade" }),
  userAnswer: verdictEnum("user_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  scoreEarned: integer("score_earned").notNull().default(0),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

// Aggregated score/streak per user — kept denormalized for fast Score tab reads
export const userScores = pgTable("user_scores", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  totalScore: integer("total_score").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  bestStreak: integer("best_streak").notNull().default(0),
  levelsCompleted: integer("levels_completed").notNull().default(0),
  badges: jsonb("badges").notNull().default([]), // e.g. [{code: "egypt_master", earnedAt: ...}]
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
