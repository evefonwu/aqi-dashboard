import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LocationsTable() {
  return (
    <Table>
      <TableCaption>A list of your added locations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nickname</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Street</TableHead>
          <TableHead className="text-right">Zip Code</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Fam</TableCell>
          <TableCell>Oakland Gardens</TableCell>
          <TableCell>NY</TableCell>
          <TableCell className="text-right">11364</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Work</TableCell>
          <TableCell>NYC</TableCell>
          <TableCell>NY</TableCell>
          <TableCell className="text-right">10001</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
