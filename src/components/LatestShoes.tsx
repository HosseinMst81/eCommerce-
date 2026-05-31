import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/db/schema";

const now = new Date();

const latestShoes: Product[] = [
  {
    id: "latest-1",
    name: "Nike Air Max Pulse",
    slug: "nike-air-max-pulse",
    description: "Bold cushioning and street-ready style.",
    price: "149.99",
    originalPrice: null,
    category: "Men",
    subcategory: "Lifestyle",
    imageUrl: "/shoes/shoe-1.jpg",
    images: ["/shoes/shoe-1.jpg"],
    sizes: ["8", "9", "10", "11"],
    colors: [{ name: "Black", hex: "#111111" }],
    inStock: true,
    isFeatured: false,
    isNew: true,
    rating: "4.5",
    reviewCount: 128,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "latest-2",
    name: "Nike Dunk Low",
    slug: "nike-dunk-low",
    description: "Classic basketball heritage for everyday wear.",
    price: "119.99",
    originalPrice: "139.99",
    category: "Women",
    subcategory: "Lifestyle",
    imageUrl: "/shoes/shoe-2.webp",
    images: ["/shoes/shoe-2.webp"],
    sizes: ["6", "7", "8", "9"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Grey", hex: "#808080" },
    ],
    inStock: true,
    isFeatured: true,
    isNew: false,
    rating: "4.7",
    reviewCount: 256,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "latest-3",
    name: "Nike Pegasus 41",
    slug: "nike-pegasus-41",
    description: "Responsive ride for daily training miles.",
    price: "134.99",
    originalPrice: null,
    category: "Men",
    subcategory: "Running",
    imageUrl: "/shoes/shoe-3.webp",
    images: ["/shoes/shoe-3.webp"],
    sizes: ["9", "10", "11", "12"],
    colors: [{ name: "Blue", hex: "#2563EB" }],
    inStock: true,
    isFeatured: false,
    isNew: true,
    rating: "4.6",
    reviewCount: 89,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "latest-4",
    name: "Nike Air Force 1",
    slug: "nike-air-force-1",
    description: "The icon that started it all.",
    price: "109.99",
    originalPrice: null,
    category: "Kids",
    subcategory: "Lifestyle",
    imageUrl: "/shoes/shoe-4.webp",
    images: ["/shoes/shoe-4.webp"],
    sizes: ["4", "5", "6"],
    colors: [{ name: "White", hex: "#FFFFFF" }],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: "4.8",
    reviewCount: 412,
    createdAt: now,
    updatedAt: now,
  },
];

export function LatestShoes() {
  return (
    <section className="mx-auto max-w-[1920px] px-6 py-12 lg:px-10">
      <h2 className="text-2xl font-bold text-nike-black">Latest shoes</h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {latestShoes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
