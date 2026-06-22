import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** User identifier returned from authentication. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const movieRecommendations = mysqlTable("movieRecommendations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  mood: varchar("mood", { length: 100 }).notNull(),
  movies: text("movies").notNull(), // JSON array of movie objects
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MovieRecommendation = typeof movieRecommendations.$inferSelect;
export type InsertMovieRecommendation = typeof movieRecommendations.$inferInsert;

export const moodHistory = mysqlTable("moodHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  mood: varchar("mood", { length: 100 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type MoodHistory = typeof moodHistory.$inferSelect;
export type InsertMoodHistory = typeof moodHistory.$inferInsert;