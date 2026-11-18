import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Disclosure } from "@/components/disclosure";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { SectionHeading } from "@/components/section-heading";
import { StockStatus } from "@/components/stock-status";
import { siteConfig } from "@/data/catalog";
import {
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
} from "@/db/queries/products";
import { CURRENCY, formatPrice } from "@/lib/format";
import { getStockStatus } from "@/lib/stock";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.description,
      images: [{ url: product.image, alt: product.alt }],
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const stock = getStockStatus(product.stock);
  const related = await getRelatedProducts(product.slug);

  // schema.org Product markup for search engines.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    category: product.category,
    brand: { "@type": "Brand", name: siteConfig.name },
    image: product.gallery.map((image) => image.src),
    offers: {
      "@type": "Offer",
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: CURRENCY,
      availability: stock.availability,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can never close the script tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <div className="container pt-4 pb-(--section-y) md:pt-6">
        <nav aria-label="Breadcrumb" className="mb-4 md:mb-6">
          <ol className="flex flex-wrap items-center gap-x-2 text-xs text-mute">
            <li>
              <Link href="/" className="link">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{product.category}</li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-8 xl:gap-12">
          <div className="lg:col-span-8">
            <ProductGallery images={product.gallery} />
          </div>

          {/* Info panel stays in view beside the long image column on lg+. */}
          <div className="mt-6 lg:sticky lg:top-36 lg:col-span-4 lg:mt-0">
            <p className="text-label text-mute">{product.category}</p>
            <h1 className="mt-2 text-xl font-medium tracking-[-0.04em] md:text-2xl">
              {product.name}
            </h1>
            <p className="mt-3 text-base font-medium">
              {formatPrice(product.priceCents)}
            </p>
            <div className="mt-3">
              <StockStatus stock={product.stock} />
            </div>

            <p className="mt-6 text-base">{product.description}</p>

            <div className="mt-8">
              <Disclosure title="Product details" defaultOpen>
                <ul className="flex list-disc flex-col gap-1 pl-4">
                  {product.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <p className="mt-4 text-mute">Style code: {product.sku}</p>
              </Disclosure>
              <Disclosure title="Shipping & returns">
                <p>
                  Complimentary standard delivery on all orders. Returns
                  accepted within 30 days of delivery in original condition.
                </p>
              </Disclosure>
            </div>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="related-title"
        className="container pb-(--section-y)"
      >
        <SectionHeading
          id="related-title"
          title="You May Also Like"
          action={{ label: "View all", href: "/#new-arrivals" }}
        />
        <div className="grid-products gap-y-8 md:gap-y-10">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </>
  );
}
