import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { collections, editorial, hero, services } from "@/data/catalog";
import { getProducts } from "@/db/queries/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      {/* Hero: full-bleed editorial image */}
      <section
        aria-labelledby="hero-title"
        className="container-bleed relative isolate flex min-h-[32rem] h-[calc(100svh-7.5rem)] max-h-[56rem] items-end overflow-hidden bg-ink text-paper"
      >
        <Image
          src={hero.image}
          alt={hero.alt}
          fill
          preload
          sizes="100vw"
          className="-z-10 object-cover object-[50%_20%]"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        <div className="container pb-8 md:pb-12 lg:pb-16">
          <p className="text-label mb-3">{hero.eyebrow}</p>
          <h1 id="hero-title" className="display max-w-[16ch]">
            {hero.title}
          </h1>
          <p className="mt-3 max-w-md text-base">{hero.description}</p>
          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <Link href="#collections" className="btn btn-primary-inverse btn-fluid">
              Shop Now
            </Link>
            <Link
              href="#new-arrivals"
              className="btn btn-secondary-inverse btn-fluid"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Featured collections */}
      <section
        id="collections"
        aria-labelledby="collections-title"
        className="container section scroll-mt-32"
      >
        <SectionHeading id="collections-title" title="Featured Collections" />
        <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
          {collections.map((collection) => (
            <li key={collection.id}>
              <Link
                href={collection.href}
                className="group relative isolate block aspect-4/5 overflow-hidden bg-ink text-paper md:aspect-3/4 lg:aspect-4/5"
              >
                <Image
                  src={collection.image}
                  alt={collection.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-800 ease-gucci group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                  <p className="text-label mb-2">{collection.eyebrow}</p>
                  <h3 className="heading mb-4 md:text-xl">{collection.title}</h3>
                  <span className="btn btn-primary-inverse group-hover:bg-transparent group-hover:text-paper">
                    {collection.cta}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* New arrivals: product grid */}
      <section
        id="new-arrivals"
        aria-labelledby="new-arrivals-title"
        className="container pb-(--section-y) scroll-mt-32"
      >
        <SectionHeading
          id="new-arrivals-title"
          title="New Arrivals"
          action={{ label: "View all", href: "#" }}
        />
        <div className="grid-products gap-y-8 md:gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial split banner */}
      <section
        aria-labelledby="editorial-title"
        className="container-bleed grid md:grid-cols-2"
      >
        <div className="relative aspect-square md:aspect-auto md:min-h-[32rem]">
          <Image
            src={editorial.image}
            alt={editorial.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="surface-inverse flex flex-col items-start justify-center gap-4 px-(--gutter) py-12 md:px-12 lg:px-20">
          <p className="text-label">{editorial.eyebrow}</p>
          <h2 id="editorial-title" className="display max-w-[14ch]">
            {editorial.title}
          </h2>
          <p className="max-w-md text-base">{editorial.description}</p>
          <Link
            href={editorial.href}
            className="btn btn-primary-inverse btn-fluid mt-2"
          >
            {editorial.cta}
          </Link>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        aria-labelledby="services-title"
        className="container section scroll-mt-32"
      >
        <SectionHeading id="services-title" title="Aurelia Services" />
        <ul className="grid gap-8 md:grid-cols-3 md:gap-4">
          {services.map((service) => (
            <li key={service.id}>
              <Link href={service.href} className="group block">
                <div className="relative aspect-square overflow-hidden bg-line-soft md:aspect-4/5">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-800 ease-gucci group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="text-label mt-4">{service.title}</h3>
                <p className="mt-1 max-w-xs text-xs">{service.description}</p>
                <span className="link-cta mt-3 inline-block underline underline-offset-4">
                  {service.cta}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
