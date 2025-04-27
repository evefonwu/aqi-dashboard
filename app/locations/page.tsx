import LocationsTable from "@/components/locations/table";
import { LocationsTableSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="grid p-10 gap-10 w-150">
      <h1>Here are your locations</h1>
      <Link href="/locations/create">
        <Button>Add +</Button>
      </Link>
      <Suspense fallback={<LocationsTableSkeleton />}>
        <LocationsTable />
      </Suspense>
    </div>
  );
}
