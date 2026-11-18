import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/format";
import { productHref, type Product } from "@/lib/product";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;
  const label = soldOut ? "Sold out" : product.badge;

  return (
    <article className="group">
      <Link href={productHref(product)} className="block">
        <div className="relative aspect-4/5 overflow-hidden bg-line-soft">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className={`object-cover transition-transform duration-800 ease-gucci group-hover:scale-[1.04] ${
              soldOut ? "opacity-60" : ""
            }`}
          />
          {label && (
            <span className="text-label absolute top-3 left-3 bg-paper px-2 py-1">
              {label}
            </span>
          )}
        </div>
        <div className="mt-3 flex flex-col gap-1">
          <p className="text-xs text-mute">{product.category}</p>
          <h3 className="text-xs font-medium">{product.name}</h3>
          <p className="text-xs">{formatPrice(product.priceCents)}</p>
        </div>
      </Link>
    </article>
  );
}
