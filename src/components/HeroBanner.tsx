import Link from "next/link";
import heroImage from "../../public/hero-bg.png";
import Image from "next/image";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-nike-grey-100 z-0">
      <Image
        src={heroImage}
        alt="Hero Image"
        fill
        className="object-cover -z-10 absolute"
        sizes="100vw"
        priority
      />
      <div className="mx-auto z-10 max-w-[1920px] px-6 py-16 sm:py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-nike-grey-500">
            Nike Running
          </p>
          <h1 className="mb-4 text-5xl font-extrabold uppercase tracking-tight text-nike-black sm:text-6xl lg:text-8xl">
            Just Do It
          </h1>
          <p className="mb-8 max-w-lg text-base text-nike-grey-600 sm:text-lg">
            Gear up with the latest Nike collection. Performance meets style in
            every step, every stride, every moment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-nike-black px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-nike-grey-700 hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              href="/"
              className="rounded-full border-2 border-nike-black px-7 py-3 text-sm font-medium text-nike-black transition-all duration-300 hover:bg-nike-black hover:text-white"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
