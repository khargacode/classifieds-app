export function formatCurrency(amount: number) {
  return "₹" + amount.toLocaleString("en-IN");
}

export function shortText(text: string, length: number = 80) {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}
