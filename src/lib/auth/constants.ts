/** Cookie name for Better Auth session (configured in auth.ts). */
export const AUTH_SESSION_COOKIE = "auth_session";

/** Cookie name for anonymous guest sessions. */
export const GUEST_SESSION_COOKIE = "guest_session";

/** Seven days in seconds — matches session and guest cookie max-age. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/** Post-auth redirect when no callbackUrl query param is provided. */
export const DEFAULT_CALLBACK_URL = "/";
