// AQI level and color https://docs.airnowapi.org/aq101

export function getAQILevel(aqi: number): number {
  if (aqi <= 50) return 1;
  if (aqi <= 100) return 2;
  if (aqi <= 150) return 3;
  if (aqi <= 200) return 4;
  if (aqi <= 300) return 5;
  return 6;
}

export const getAQIColor = (level: number) => {
  switch (level) {
    case 1:
      return "bg-[#00E400]";
    case 2:
      return "bg-[#FFFF00]";
    case 3:
      return "bg-[#FF7E00]";
    case 4:
      return "bg-[#FF0000]";
    case 5:
      return "bg-[#99004C]";
    case 6:
      return "bg-[#7E0023]";
    default:
      return "bg-gray-300";
  }
};

// Convert hour to 12-hour format with AM/PM
export function formatHour(hour: number, timezone: string): string {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${formattedHour}:00 ${period} ${timezone}`;
}

// Truncate overflowing text
export function truncateName(text: string, maxLen = 8) {
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}
export function truncateLocation(text: string, maxLen = 23) {
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}
