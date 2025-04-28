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
import { DeleteForm } from "./delete-form";

// async await retrieving locations data...
export default async function LocationsTable() {
  const locations = await fetchLocations();

  return (
    <Table>
      <TableCaption>
        {locations.length > 0
          ? "A list of your added locations."
          : "To add your locations, click the 'Add' button."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nickname</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Zip Code</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations?.map((loc) => (
          <TableRow key={loc.id}>
            <TableCell className="font-medium">{loc.nickname}</TableCell>
            <TableCell>{loc.location}</TableCell>
            <TableCell>{loc.zipcode}</TableCell>
            <TableCell className="text-right">
              <DeleteForm id={loc.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
