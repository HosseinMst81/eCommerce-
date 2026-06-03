"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { signOut } from "@/lib/auth/actions";

const linkClass =
  "hover:text-nike-grey-500 transition-colors border-r border-nike-grey-300 pr-3";

export function NavbarAuthLinks() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <span
        className="text-nike-grey-400"
        aria-live="polite"
        aria-busy="true"
      >
        Sign In
      </span>
    );
  }

  if (session?.user) {
    const displayName =
      session.user.name?.trim().split(/\s+/)[0] ??
      session.user.email?.split("@")[0] ??
      "there";

    return (
      <>
        <span className={`${linkClass} text-nike-grey-600`}>
          Hi, {displayName}
        </span>
        <form action={signOut}>
          <button
            type="submit"
            className="hover:text-nike-grey-500 transition-colors"
          >
            Sign Out
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      {isPending ? <>Loading Spinner</>: <Link href="/sign-in" className="hover:text-nike-grey-500 transition-colors">
        Sign In
      </Link>}
    </>
  );
}
