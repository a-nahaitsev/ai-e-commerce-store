export const CURRENCY = "USD";

const wholeFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

const centsFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
});

/** Format an amount in cents. Cents are only shown when non-zero. */
export function formatPrice(cents: number) {
  const formatter = cents % 100 === 0 ? wholeFormatter : centsFormatter;
  return formatter.format(cents / 100);
}
