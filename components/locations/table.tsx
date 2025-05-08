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
// async fetch location data and display it in a responsive table

// async await retrieving locations data...
export default async function LocationsTable() {
  const locations = await fetchLocations();

  return (
    <Table className="py-5">
      <TableCaption>
        {locations && locations.length > 0
          ? "A list of your added locations."
          : "To add your locations, click the 'Add' button."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nickname</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations?.map((loc) => (
          <TableRow key={loc.id}>
            <TableCell className="font-medium">
              <div className="max-w-[130px]">
                <p className="truncate" title={loc.nickname}>
                  {loc.nickname}
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="max-w-[200px]">
                <p className="truncate">
                  {loc.city}, {loc.state} {loc.zipcode}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DeleteForm id={loc.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
