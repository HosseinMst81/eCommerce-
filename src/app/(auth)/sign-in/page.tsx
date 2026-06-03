import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { SocialProviders } from "@/components/SocialProviders";
import { DEFAULT_CALLBACK_URL } from "@/lib/auth/constants";

export const metadata: Metadata = {
  title: "Sign In | Nike Store",
  description: "Sign in to your Nike account to shop the latest products.",
};

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

function resolveCallbackUrl(callbackUrl?: string): string {
  if (callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl;
  }
  return DEFAULT_CALLBACK_URL;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;
  const redirectTo = resolveCallbackUrl(callbackUrl);
  const signUpHref =
    redirectTo === DEFAULT_CALLBACK_URL
      ? "/sign-up"
      : `/sign-up?callbackUrl=${encodeURIComponent(redirectTo)}`;

  return (
    <>
      <div className="mb-8 flex justify-start">
        <p className="text-caption text-nike-grey-600">
          Don&apos;t have an account?{" "}
          <Link
            href={signUpHref}
            className="font-medium text-nike-black underline underline-offset-2"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-nike-black sm:text-3xl">
          Welcome Back!
        </h1>
        <p className="mt-2 text-body text-nike-grey-500">
          Sign in to continue your fitness journey
        </p>
      </header>

      <SocialProviders />

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-nike-grey-200" />
        </div>
        <p className="relative mx-auto w-fit bg-white px-4 text-footnote text-nike-grey-500">
          Or sign in with
        </p>
      </div>

      <AuthForm mode="sign-in" callbackUrl={redirectTo} />
    </>
  );
}
