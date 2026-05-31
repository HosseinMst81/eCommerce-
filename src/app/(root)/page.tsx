import Link from "next/link";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { HeroBanner } from "@/components/HeroBanner";
import { LatestShoes } from "@/components/LatestShoes";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt));

  const categories = [
    "All",
    ...Array.from(new Set(allProducts.map((p) => p.category))),
  ];

  return (
    <>
      <HeroBanner />

      <LatestShoes />

      {/* Products Section */}
      <section className="mx-auto max-w-[1920px] px-6 py-12 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-nike-black">
              Popular Right Now
            </h2>
            <p className="mt-1 text-sm text-nike-grey-500">
              {allProducts.length} products
            </p>
          </div>
          <CategoryFilter categories={categories} />
        </div>

        <ProductGrid products={allProducts} />
      </section>

      {/* Featured Banner */}
      <section className="bg-nike-black py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-4 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Nike Membership
          </h2>
          <p className="mb-8 text-nike-grey-400">
            Sign up for free. Join the community. Get exclusive access to the
            latest products, inspiration, and member-only benefits.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className="rounded-full bg-white px-7 py-3 text-sm font-medium text-nike-black transition-all hover:bg-nike-grey-200"
            >
              Join Us
            </Link>
            <Link
              href="/sign-in"
              className="rounded-full border border-nike-grey-700 px-7 py-3 text-sm font-medium text-white transition-all hover:border-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
