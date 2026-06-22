import { int, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

// Watchlist/Favorites table
export const watchlist = mysqlTable("watchlist", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  movieTitle: varchar("movieTitle", { length: 255 }).notNull(),
  movieData: text("movieData").notNull(), // JSON of full movie object
  addedAt: timestamp("addedAt").defaultNow().notNull(),
});

export type Watchlist = typeof watchlist.$inferSelect;
export type InsertWatchlist = typeof watchlist.$inferInsert;

// User preferences table
export const userPreferences = mysqlTable("userPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  favoriteGenres: text("favoriteGenres"), // JSON array
  preferredPlatforms: text("preferredPlatforms"), // JSON array
  darkMode: boolean("darkMode").default(true),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;
