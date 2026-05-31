import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Branding panel — compact on mobile, full split on desktop */}
      <aside className="relative flex flex-col bg-nike-black px-6 py-8 text-white lg:w-1/2 lg:px-12 lg:py-10">
        <Link href="/" className="inline-flex w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-white">
            <Image
              src="/logo-dark.svg"
              alt="Nike"
              width={28}
              height={28}
              priority
            />
          </span>
        </Link>

        <div className="mt-8 flex flex-1 flex-col justify-center lg:mt-0 lg:max-w-md lg:py-16">
          <p className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-heading-3 lg:font-bold">
            Just Do It
          </p>
          <p className="mt-4 max-w-sm text-body text-nike-grey-400">
            Join millions of athletes and fitness enthusiasts who trust Nike for
            their performance needs.
          </p>
          <div
            className="mt-8 hidden items-center gap-2 lg:flex"
            aria-hidden
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-nike-grey-600" />
            <span className="h-2 w-2 rounded-full bg-nike-grey-600" />
          </div>
        </div>

        <p className="mt-8 text-footnote text-nike-grey-500 lg:mt-auto">
          © {new Date().getFullYear()} Nike. All rights reserved.
        </p>
      </aside>

      {/* Form panel */}
      <div className="flex flex-1 flex-col bg-white lg:w-1/2">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-8 sm:px-8 lg:max-w-lg lg:px-12 lg:py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
