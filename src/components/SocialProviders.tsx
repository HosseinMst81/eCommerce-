import Image from "next/image";

const providers = [
  {
    id: "google",
    label: "Continue with Google",
    icon: "/icons/google.svg",
  },
  {
    id: "apple",
    label: "Continue with Apple",
    icon: "/icons/apple.svg",
  },
] as const;

export function SocialProviders() {
  return (
    <div className="flex flex-col gap-3" role="group" aria-label="Social sign-in options">
      {providers.map((provider) => (
        <button
          key={provider.id}
          type="button"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-nike-grey-300 bg-white text-body-medium text-nike-black transition-colors hover:border-nike-grey-500 hover:bg-nike-grey-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nike-black"
        >
          <Image
            src={provider.icon}
            alt=""
            width={20}
            height={20}
            className={provider.id === "apple" ? "text-nike-black" : undefined}
          />
          <span>{provider.label}</span>
        </button>
      ))}
    </div>
  );
}
