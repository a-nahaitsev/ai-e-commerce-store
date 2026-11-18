import { getStockStatus } from "@/lib/stock";

/**
 * Stock indicator, monochrome to match the design system:
 * filled square = available, bold = running low, hollow + muted = unavailable.
 */
export function StockStatus({ stock }: { stock: number }) {
  const { state, label } = getStockStatus(stock);

  return (
    <p
      className={`flex items-center gap-2 text-xs ${
        state === "out-of-stock" ? "text-mute" : ""
      } ${state === "low-stock" ? "font-bold" : "font-medium"}`}
      data-stock-state={state}
    >
      <span
        aria-hidden="true"
        className={`size-2 border ${
          state === "out-of-stock" ? "border-mute bg-transparent" : "bg-ink"
        }`}
      />
      {label}
    </p>
  );
}
