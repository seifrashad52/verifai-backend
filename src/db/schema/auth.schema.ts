import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

/**
 * These tables follow the schema that `better-auth` expects.
 * Run `npx @better-auth/cli generate` after configuring src/lib/auth.ts
 * to auto-generate/verify this file — the shape below is the standard
 * better-auth core schema (user, session, account, verification) plus
 * the social providers (Google, Facebook) configured in auth.ts.
 */

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// One row per login method linked to a user (email/password, google, facebook, instagram)
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  providerId: text("provider_id").notNull(), // "credential" | "google" | "facebook"
  accountId: text("account_id").notNull(),
  password: text("password"), // only set for provider_id = "credential"
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Used for forgot-password OTP codes and email verification codes
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(), // usually the email
  value: text("value").notNull(), // the OTP / token
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
