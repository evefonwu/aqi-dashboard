// https://docs.airnowapi.org/aq101

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const getColor = (level: number) => {
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

export function getAQILevel(aqi: number): number {
  if (aqi <= 50) return 1;
  if (aqi <= 100) return 2;
  if (aqi <= 150) return 3;
  if (aqi <= 200) return 4;
  if (aqi <= 300) return 5;
  return 6;
}

const levels = [
  { level: 1, category: "Good", range: "0-50", color: getColor(1) },
  { level: 2, category: "Moderate", range: "51-100", color: getColor(2) },
  {
    level: 3,
    category: "Unhealthy for Sensitive Groups",
    range: "101-150",
    color: getColor(3),
  },
  { level: 4, category: "Unhealthy", range: "151-200", color: getColor(4) },
  {
    level: 5,
    category: "Very Unhealthy",
    range: "201-300",
    color: getColor(5),
  },
  { level: 6, category: "Hazardous", range: "301-500", color: getColor(6) },
];

export function AirQualityIndex() {
  return (
    <section>
      <Table>
        <TableCaption>EPA U.S. Air Quality Index (AQI)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Color</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">AQI Range</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {levels.map(({ level, category, range, color }) => (
            <TableRow key={level}>
              <TableCell className="font-medium">
                <span
                  className={`w-5 h-5 inline-block rounded-full ${color}`}
                />
              </TableCell>
              <TableCell>{category}</TableCell>
              <TableCell className="text-right">{range}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
