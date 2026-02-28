export function parseTimestampToDate(
  timestamp: number,
  locale: string = "en-US",
): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString(locale, {
    year: "numeric", // Example: "2023"
    month: "long", // Example: "September"
    day: "numeric", // Example: "12"
    hour: "2-digit", // Example: "03"
    minute: "2-digit", // Example: "05"
    second: "2-digit", // Example: "09"
  });
}
