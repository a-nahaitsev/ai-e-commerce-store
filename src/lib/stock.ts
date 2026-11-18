/** At or below this many units a product is shown as "low stock". */
export const LOW_STOCK_THRESHOLD = 5;

export type StockState = "in-stock" | "low-stock" | "out-of-stock";

export type StockStatus = {
  state: StockState;
  /** Label for the product page. */
  label: string;
  /** schema.org availability URL for structured data. */
  availability: string;
};

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) {
    return {
      state: "out-of-stock",
      label: "Out of stock",
      availability: "https://schema.org/OutOfStock",
    };
  }
  if (stock <= LOW_STOCK_THRESHOLD) {
    return {
      state: "low-stock",
      label: `Only ${stock} left`,
      availability: "https://schema.org/LimitedAvailability",
    };
  }
  return {
    state: "in-stock",
    label: "In stock",
    availability: "https://schema.org/InStock",
  };
}
