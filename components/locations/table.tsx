import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { queryLocations } from "@/app/lib/queries";

// async await retrieving locations data...
export default async function LocationsTable() {
  const locations = await queryLocations();

  return (
    <Table>
      <TableCaption>A list of your added locations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nickname</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Zip Code</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations?.map((loc) => (
          <TableRow>
            <TableCell className="font-medium">Nickname</TableCell>
            <TableCell>{loc.location}</TableCell>
            <TableCell className="text-right">{loc.zipcode}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
