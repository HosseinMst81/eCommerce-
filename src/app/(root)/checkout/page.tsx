import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Checkout | Nike Store",
  description: "Complete your Nike order.",
};

export default async function CheckoutPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in?callbackUrl=/checkout");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
      <h1 className="text-3xl font-bold text-nike-black">Checkout</h1>
      <p className="mt-4 text-body text-nike-grey-600">
        Signed in as {session.user.email}. Order flow will be implemented in a
        later milestone.
      </p>
    </main>
  );
}
