import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { SocialProviders } from "@/components/SocialProviders";
import { DEFAULT_CALLBACK_URL } from "@/lib/auth/constants";

export const metadata: Metadata = {
  title: "Sign Up | Nike Store",
  description: "Create your Nike account and start your fitness journey.",
};

type SignUpPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

function resolveCallbackUrl(callbackUrl?: string): string {
  if (callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl;
  }
  return DEFAULT_CALLBACK_URL;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { callbackUrl } = await searchParams;
  const redirectTo = resolveCallbackUrl(callbackUrl);
  const signInHref =
    redirectTo === DEFAULT_CALLBACK_URL
      ? "/sign-in"
      : `/sign-in?callbackUrl=${encodeURIComponent(redirectTo)}`;

  return (
    <>
      <div className="mb-8 flex justify-start">
        <p className="text-caption text-nike-grey-600">
          Already have an account?{" "}
          <Link
            href={signInHref}
            className="font-medium text-nike-black underline underline-offset-2"
          >
            Sign In
          </Link>
        </p>
      </div>

      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-nike-black sm:text-3xl">
          Join Nike Today!
        </h1>
        <p className="mt-2 text-body text-nike-grey-500">
          Create your account to start your fitness journey
        </p>
      </header>

      <SocialProviders />

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-nike-grey-200" />
        </div>
        <p className="relative mx-auto w-fit bg-white px-4 text-footnote text-nike-grey-500">
          Or sign up with
        </p>
      </div>

      <AuthForm mode="sign-up" callbackUrl={redirectTo} />
    </>
  );
}
