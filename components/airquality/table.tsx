import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchLocations } from "@/app/lib/queries";

function truncateString(text: string, maxLen = 8) {
  if (text.length <= maxLen) {
    return text;
  }
  return text.slice(0, maxLen) + "...";
}

// async await retrieving locations data...
export default async function DashboardTable() {
  const locations = await fetchLocations();

  return (
    <Table>
      <TableCaption>
        {locations.length > 0
          ? "Air quality for your saved locations"
          : "To add your locations, go to Locations tab."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">AQI</TableHead>
          <TableHead className=""></TableHead>
          <TableHead className=""></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations?.map((loc) => (
          <TableRow key={loc.id}>
            <TableCell className="text-left">---</TableCell>
            <TableCell className="flex">
              {truncateString(loc.nickname)} @ {loc.location}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
