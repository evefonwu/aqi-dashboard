// Helper function to convert hour to 12-hour format with AM/PM
export function formatHour(hour: number, timezone: string): string {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${formattedHour}:00 ${period} ${timezone}`;
}

// Helper functions to truncate overflowing text
export function truncateName(text: string, maxLen = 8) {
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}
export function truncateLocation(text: string, maxLen = 23) {
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}
