import Link from "next/link";

import { mainNav, siteConfig } from "@/data/catalog";

/**
 * Sticky header. Desktop (lg+): centred wordmark with a nav row underneath.
 * Below lg: a CSS-only `<details>` menu, so no client JS is needed.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-paper">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <div className="mx-auto grid max-w-(--container-page) grid-cols-[1fr_auto_1fr] items-center px-1 md:px-3 lg:px-9">
        <details className="group justify-self-start lg:hidden">
          <summary className="link-nav cursor-pointer list-none px-3 md:px-6 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>
          <nav
            aria-label="Main"
            className="absolute inset-x-0 top-full border-b bg-paper"
          >
            <ul className="container flex flex-col py-2">
              {mainNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="link-nav w-full px-0">
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* Header actions that don't fit beside the centred wordmark below md. */}
              <li className="md:hidden">
                <Link href="#" className="link-nav w-full px-0">
                  Search
                </Link>
              </li>
              <li className="md:hidden">
                <Link href="#" className="link-nav w-full px-0">
                  Account
                </Link>
              </li>
            </ul>
          </nav>
        </details>

        {/* Keeps the wordmark centred on lg+, where the menu is hidden. */}
        <span className="hidden lg:block" aria-hidden="true" />

        <Link
          href="/"
          aria-label={`${siteConfig.name} - go to homepage`}
          className="py-4 text-lg font-medium tracking-[0.35em] uppercase md:text-xl"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center justify-self-end">
          <Link href="#" className="link-nav hidden md:inline-flex">
            Search
          </Link>
          <Link href="#" className="link-nav hidden md:inline-flex">
            Account
          </Link>
          <Link href="#" className="link-nav px-3 md:px-6">
            Bag (0)
          </Link>
        </div>
      </div>

      <nav aria-label="Main" className="hidden border-t lg:block">
        <ul className="container flex justify-center">
          {mainNav.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="link-nav">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
