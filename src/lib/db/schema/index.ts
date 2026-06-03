import { relations } from "drizzle-orm";
import { account } from "./account";
import { guest } from "./guest";
import { products } from "./products";
import { session } from "./session";
import { user } from "./user";
import { verification } from "./verification";

export { account } from "./account";
export { guest } from "./guest";
export { products } from "./products";
export { session } from "./session";
export { user } from "./user";
export { verification } from "./verification";

export type { Account, NewAccount } from "./account";
export type { Guest, NewGuest } from "./guest";
export type { NewProduct, Product } from "./products";
export type { NewSession, Session } from "./session";
export type { NewUser, User } from "./user";
export type { NewVerification, Verification } from "./verification";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
