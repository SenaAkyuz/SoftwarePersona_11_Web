export const emptySale = {
  customerName: "",
  itemName: "",
  price: "",
  quantity: 1,
};

export function formatTRY(amount) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(amount || 0);
}

export function safeNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}
