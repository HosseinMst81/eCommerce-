"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface CardBadge {
  text: string;
  variant: "new" | "sale" | "featured";
}

interface CardPrice {
  current: number;
  original?: number;
}

interface CardProps {
  title: string;
  description: string;
  image: string;
  badge?: CardBadge;
  price?: CardPrice;
  href?: string;
  className?: string;
  children?: ReactNode;
}

const badgeStyles: Record<CardBadge["variant"], string> = {
  new: "bg-nike-black text-white",
  sale: "bg-nike-sale text-white",
  featured: "bg-nike-orange text-white",
};

function CardBadgeElement({ badge }: { badge: CardBadge }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[badge.variant]}`}
    >
      {badge.text}
    </span>
  );
}

function CardPriceDisplay({ price }: { price: CardPrice }) {
  const isOnSale =
    price.original !== undefined && price.original > price.current;

  return (
    <div className="flex items-center gap-2 pt-1">
      <span className="text-body font-semibold text-nike-black">
        ${price.current.toFixed(2)}
      </span>
      {isOnSale && (
        <span className="text-caption text-nike-grey-500 line-through">
          ${price.original!.toFixed(2)}
        </span>
      )}
    </div>
  );
}

function CardContent({
  title,
  description,
  image,
  badge,
  price,
  className,
  children,
}: Omit<CardProps, "href">) {
  return (
    <article
      className={`group overflow-hidden rounded-lg bg-nike-white ${className ?? ""}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-nike-grey-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute left-3 top-3">
            <CardBadgeElement badge={badge} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1 px-1">
        <h3 className="text-body-medium text-nike-black transition-colors group-hover:text-nike-grey-600">
          {title}
        </h3>
        <p className="text-caption text-nike-grey-500">{description}</p>
        {price && <CardPriceDisplay price={price} />}
        {children}
      </div>
    </article>
  );
}

export function Card(props: CardProps) {
  const { href, ...rest } = props;

  if (href) {
    return (
      <Link href={href} className="block">
        <CardContent {...rest} />
      </Link>
    );
  }

  return <CardContent {...rest} />;
}
