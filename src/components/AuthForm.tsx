"use client";

import { useActionState, useId, useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  signIn,
  signUp,
  type AuthActionState,
} from "@/lib/auth/actions";

export type AuthFormMode = "sign-in" | "sign-up";

interface AuthFormProps {
  mode: AuthFormMode;
  callbackUrl?: string;
}

const copy = {
  "sign-in": {
    submit: "Sign In",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    showForgot: true,
  },
  "sign-up": {
    submit: "Sign Up",
    passwordLabel: "Password",
    passwordPlaceholder: "Minimum 8 characters",
    showForgot: false,
  },
} as const;

export function AuthForm({ mode, callbackUrl = "/" }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const formId = useId();
  const text = copy[mode];
  const action = mode === "sign-in" ? signIn : signUp;
  const [state, formAction, isPending] = useActionState<
    AuthActionState | null,
    FormData
  >(action, null);

  return (
    <form className="flex flex-col gap-5" action={formAction} noValidate>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      {state?.error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-footnote text-red-700"
        >
          {state.error}
        </p>
      )}

      {mode === "sign-up" && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${formId}-name`}
            className="text-caption text-nike-black"
          >
            Full Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Enter your full name"
            className="h-12 rounded-lg border border-nike-grey-300 px-4 text-body text-nike-black placeholder:text-nike-grey-400 focus-visible:border-nike-black focus-visible:outline-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor={`${formId}-email`}
          className="text-caption text-nike-black"
        >
          Email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="johndoe@gmail.com"
          className="h-12 rounded-lg border border-nike-grey-300 px-4 text-body text-nike-black placeholder:text-nike-grey-400 focus-visible:border-nike-black focus-visible:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor={`${formId}-password`}
            className="text-caption text-nike-black"
          >
            {text.passwordLabel}
          </label>
          {text.showForgot && (
            <Link
              href="#"
              className="text-footnote text-nike-grey-600 underline-offset-2 hover:text-nike-black hover:underline"
            >
              Forgot password?
            </Link>
          )}
        </div>
        <div className="relative">
          <input
            id={`${formId}-password`}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={
              mode === "sign-in" ? "current-password" : "new-password"
            }
            required
            minLength={8}
            placeholder={text.passwordPlaceholder}
            className="h-12 w-full rounded-lg border border-nike-grey-300 py-2 pl-4 pr-12 text-body text-nike-black placeholder:text-nike-grey-400 focus-visible:border-nike-black focus-visible:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-nike-grey-500 transition-colors hover:text-nike-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nike-black"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            aria-controls={`${formId}-password`}
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5" aria-hidden />
            ) : (
              <FiEye className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 h-12 w-full rounded-full bg-nike-black text-body-medium text-white transition-colors hover:bg-nike-grey-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nike-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Please wait…" : text.submit}
      </button>

      {mode === "sign-up" && (
        <p className="text-center text-footnote text-nike-grey-500">
          By signing up, you agree to our{" "}
          <Link
            href="#"
            className="text-nike-black underline underline-offset-2"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-nike-black underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </p>
      )}
    </form>
  );
}
