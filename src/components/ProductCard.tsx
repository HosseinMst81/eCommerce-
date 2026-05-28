"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = parseFloat(product.price);
  const originalPrice = product.originalPrice
    ? parseFloat(product.originalPrice)
    : null;
  const isOnSale = originalPrice !== null && originalPrice > price;
  const discount = isOnSale
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Link href={`/`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-nike-grey-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-nike-black px-3 py-1 text-xs font-semibold text-white">
              New
            </span>
          )}
          {isOnSale && (
            <span className="rounded-full bg-nike-sale px-3 py-1 text-xs font-semibold text-white">
              {discount}% Off
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 space-y-1">
        {product.isFeatured && (
          <p className="text-xs font-semibold text-nike-orange">
            Featured
          </p>
        )}
        <h3 className="text-base font-medium text-nike-black transition-colors group-hover:text-nike-grey-600">
          {product.name}
        </h3>
        <p className="text-sm text-nike-grey-500">
          {product.subcategory ?? product.category}
        </p>
        {/* Colors */}
        {product.colors && (product.colors as { name: string; hex: string }[]).length > 0 && (
          <p className="text-sm text-nike-grey-500">
            {(product.colors as { name: string; hex: string }[]).length} Color
            {(product.colors as { name: string; hex: string }[]).length !== 1 ? "s" : ""}
          </p>
        )}
        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-base font-semibold text-nike-black">
            ${price.toFixed(2)}
          </span>
          {isOnSale && (
            <span className="text-sm text-nike-grey-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
