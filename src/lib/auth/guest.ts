import "server-only";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { guest } from "@/lib/db/schema";
import {
  GUEST_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/constants";

function guestExpiresAt(): Date {
  return new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
}

export async function getGuestSessionTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(GUEST_SESSION_COOKIE)?.value ?? null;
}

export async function setGuestSessionCookie(sessionToken: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(GUEST_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearGuestSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(GUEST_SESSION_COOKIE);
}

export async function findActiveGuestByToken(sessionToken: string) {
  const now = new Date();
  const [record] = await db
    .select()
    .from(guest)
    .where(eq(guest.sessionToken, sessionToken))
    .limit(1);

  if (!record || record.expiresAt <= now) {
    return null;
  }

  return record;
}

export async function createGuestRecord(sessionToken: string) {
  const [record] = await db
    .insert(guest)
    .values({
      sessionToken,
      expiresAt: guestExpiresAt(),
    })
    .returning();

  return record;
}

export async function deleteGuestByToken(sessionToken: string): Promise<void> {
  await db.delete(guest).where(eq(guest.sessionToken, sessionToken));
}
