import Link from "next/link";

import { footerColumns, legalLinks, siteConfig } from "@/data/catalog";

export function SiteFooter() {
  return (
    <footer className="surface-inverse">
      <div className="container section">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-4 lg:col-span-1">
            <h2 className="text-label">Sign up for {siteConfig.name} updates</h2>
            <p className="text-xs">
              Get exclusive updates on new collections, personalised
              communication and the House&apos;s latest news.
            </p>
            <Link href="#" className="btn btn-secondary-inverse btn-fluid">
              Subscribe
            </Link>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-label mb-4">{column.title}</h2>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="container flex flex-col gap-4 border-t border-paper/30 py-6 md:flex-row md:items-center md:justify-between">
        <p className="text-xs">
          &copy; {siteConfig.name}. All rights reserved. Sample storefront.
        </p>
        <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="link">
                {link.label}
              </Link>
            </li>
          ))}
          <li className="text-xs">United States</li>
        </ul>
      </div>
    </footer>
  );
}
