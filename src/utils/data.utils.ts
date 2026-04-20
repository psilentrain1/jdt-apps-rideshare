export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function dateFormatter(ISOString: string) {
  const utcDate = ISOString;
  const localDate = new Date(utcDate);
  return localDate.toLocaleString();
}
