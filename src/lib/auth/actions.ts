"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { DEFAULT_CALLBACK_URL } from "@/lib/auth/constants";
import {
  clearGuestSessionCookie,
  createGuestRecord,
  deleteGuestByToken,
  findActiveGuestByToken,
  getGuestSessionTokenFromCookie,
  setGuestSessionCookie,
} from "@/lib/auth/guest";
import {
  formatZodErrors,
  parseFormData,
  signInSchema,
  signUpSchema,
} from "@/lib/auth/validations";

export type AuthActionState = {
  error?: string;
};

function sanitizeCallbackUrl(url: string | undefined): string {
  if (!url || !url.startsWith("/") || url.startsWith("//")) {
    return DEFAULT_CALLBACK_URL;
  }
  return url;
}

function mapAuthError(error: unknown): string {
  if (error instanceof APIError) {
    if (error.status === "UNAUTHORIZED") {
      return "Invalid email or password.";
    }
    if (error.status === "CONFLICT") {
      return "An account with this email already exists.";
    }
    return error.message || "Authentication failed. Please try again.";
  }

  if (error instanceof z.ZodError) {
    return formatZodErrors(error);
  }

  return "Something went wrong. Please try again.";
}

/**
 * Merges guest cart data into the authenticated user's cart, then clears the guest session.
 * Cart tables are not implemented yet — guest cleanup runs so the flow is ready for cart work.
 */
export async function mergeGuestCartWithUserCart(
  userId: string,
): Promise<void> {
  const sessionToken = await getGuestSessionTokenFromCookie();
  if (!sessionToken) {
    return;
  }

  const guestRecord = await findActiveGuestByToken(sessionToken);
  if (!guestRecord) {
    await clearGuestSessionCookie();
    return;
  }

  // TODO(cart): merge guest cart lines keyed by guestRecord.id into userId cart.
  void userId;
  void guestRecord.id;

  await deleteGuestByToken(sessionToken);
  await clearGuestSessionCookie();
}

export async function guestSession() {
  const sessionToken = await getGuestSessionTokenFromCookie();
  if (!sessionToken) {
    return { guest: null as null };
  }

  const record = await findActiveGuestByToken(sessionToken);
  if (!record) {
    await clearGuestSessionCookie();
    return { guest: null as null };
  }

  return { guest: record };
}

export async function createGuestSession(): Promise<{
  sessionToken: string;
}> {
  const existingToken = await getGuestSessionTokenFromCookie();
  if (existingToken) {
    const existing = await findActiveGuestByToken(existingToken);
    if (existing) {
      return { sessionToken: existing.sessionToken };
    }
  }

  const sessionToken = crypto.randomUUID();
  await createGuestRecord(sessionToken);
  await setGuestSessionCookie(sessionToken);

  return { sessionToken };
}

export async function signUp(
  _prevState: AuthActionState | null,
  formData: FormData,
): Promise<AuthActionState> {
  try {
    const input = parseFormData(signUpSchema, formData);
    const callbackUrl = sanitizeCallbackUrl(input.callbackUrl);

    const result = await auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
      },
      headers: await headers(),
    });

    if (result?.user?.id) {
      await mergeGuestCartWithUserCart(result.user.id);
    }

    redirect(callbackUrl);
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return { error: mapAuthError(error) };
  }
}

export async function signIn(
  _prevState: AuthActionState | null,
  formData: FormData,
): Promise<AuthActionState> {
  try {
    const input = parseFormData(signInSchema, formData);
    const callbackUrl = sanitizeCallbackUrl(input.callbackUrl);

    const result = await auth.api.signInEmail({
      body: {
        email: input.email,
        password: input.password,
      },
      headers: await headers(),
    });

    if (result?.user?.id) {
      await mergeGuestCartWithUserCart(result.user.id);
    }

    redirect(callbackUrl);
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return { error: mapAuthError(error) };
  }
}

export async function signOut(): Promise<void> {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}
