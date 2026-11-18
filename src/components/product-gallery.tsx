import Image from "next/image";

import type { ProductImage } from "@/lib/product";

/**
 * Responsive product imagery, a single list restyled per breakpoint:
 * - below lg: horizontal scroll-snap strip (swipe), next image peeks in
 * - lg+: large two-column grid, first image spans the full width
 */
export function ProductGallery({ images }: { images: ProductImage[] }) {
  return (
    <ul
      aria-label="Product images"
      // Scrollable region must be keyboard reachable.
      tabIndex={0}
      className="-mx-(--gutter) flex snap-x snap-mandatory gap-1 overflow-x-auto scroll-pl-(--gutter) px-(--gutter) [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-2 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {images.map((image, index) => (
        <li
          key={image.src}
          className={`relative aspect-4/5 w-[88%] shrink-0 snap-start overflow-hidden bg-line-soft sm:w-[60%] lg:w-auto ${
            index === 0 ? "lg:col-span-2" : ""
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload={index === 0}
            sizes={
              index === 0
                ? "(min-width: 1024px) 66vw, 88vw"
                : "(min-width: 1024px) 33vw, 88vw"
            }
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
