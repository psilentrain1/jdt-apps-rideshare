export function getMonthLabel(month: number): string {
  const monthNumber = Number(String(month).substring(4, 6)) - 1;
  const yearString = String(month).substring(0, 4);
  const date = new Date();
  date.setMonth(monthNumber);

  const monthName = date.toLocaleString("en-US", { month: "long" });

  return `${monthName} ${yearString}`;
}
