/**
 * Instant fallback for the product page. Mirrors the real layout (breadcrumb,
 * large image column, info column) so nothing jumps when content arrives.
 * Also provides the Suspense boundary Next.js expects around `await params`.
 */
export default function ProductLoading() {
  return (
    <div
      className="container animate-pulse pt-4 pb-(--section-y) md:pt-6"
      aria-busy="true"
      aria-label="Loading product"
    >
      <div className="mb-4 h-4 w-56 bg-line-soft md:mb-6" />
      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-8 xl:gap-12">
        <div className="lg:col-span-8">
          <div className="aspect-4/5 w-full bg-line-soft" />
        </div>
        <div className="mt-6 flex flex-col gap-3 lg:col-span-4 lg:mt-0">
          <div className="h-3 w-24 bg-line-soft" />
          <div className="h-7 w-3/4 bg-line-soft" />
          <div className="h-5 w-20 bg-line-soft" />
          <div className="h-3 w-28 bg-line-soft" />
          <div className="mt-4 h-20 w-full bg-line-soft" />
        </div>
      </div>
    </div>
  );
}
