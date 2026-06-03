import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const guest = pgTable("guest", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionToken: text("session_token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export type Guest = typeof guest.$inferSelect;
export type NewGuest = typeof guest.$inferInsert;
