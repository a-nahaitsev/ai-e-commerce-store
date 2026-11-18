import type { ReactNode } from "react";

/** Native, JS-free accordion row with hairline dividers. Group rows in one parent. */
export function Disclosure({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-t last:border-b">
      <summary className="text-label flex min-h-(--size-control) cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden="true" className="text-base font-normal group-open:hidden">
          +
        </span>
        <span
          aria-hidden="true"
          className="hidden text-base font-normal group-open:inline"
        >
          &minus;
        </span>
      </summary>
      <div className="pb-5 text-xs">{children}</div>
    </details>
  );
}
