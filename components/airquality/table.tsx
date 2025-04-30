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

function truncateName(text: string, maxLen = 8) {
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}

function truncateLocation(text: string, maxLen = 23) {
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
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
              {truncateName(loc.nickname)} in {truncateLocation(loc.location)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
