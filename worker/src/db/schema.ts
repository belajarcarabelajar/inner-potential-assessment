import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // Clerk User ID
  email: text("email"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const assessments = sqliteTable("assessments", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  stage: text("stage").notNull(), // child, teenager, adult
  dominancePattern: text("dominance_pattern"),
  radarData: text("radar_data", { mode: "json" }),
  tendencies: text("tendencies", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});
