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
          <TableHead>Zip Code</TableHead>
          <TableHead className="text-right">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations?.map((loc) => (
          <TableRow key={loc.id}>
            <TableCell className="font-medium">Nickname</TableCell>
            <TableCell>{loc.location}</TableCell>
            <TableCell>{loc.zipcode}</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
