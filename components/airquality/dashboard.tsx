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
          <TableHead className="text-left">AQI Category</TableHead>
          <TableHead className="w-[100px]">Nickname</TableHead>
          <TableHead className="w-[280px]">Location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations?.map((loc) => (
          <TableRow key={loc.id}>
            <TableCell className="text-left"></TableCell>
            <TableCell className="font-medium">{loc.nickname}</TableCell>
            <TableCell>{loc.location}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
