import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import { account, session, user, verification } from "@/lib/db/schema";
import { SESSION_MAX_AGE_SECONDS } from "@/lib/auth/constants";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: SESSION_MAX_AGE_SECONDS,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  advanced: {
    database: {
      generateId: "uuid",
    },
    cookiePrefix: "",
    useSecureCookies: process.env.NODE_ENV === "production",
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    },
    cookies: {
      session_token: {
        name: "auth_session",
        attributes: {
          maxAge: SESSION_MAX_AGE_SECONDS,
          sameSite: "strict",
          path: "/",
          httpOnly: true,
        },
      },
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
