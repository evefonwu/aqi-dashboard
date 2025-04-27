import LocationsTable from "@/components/locations/table";
import { LocationsTableSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="grid p-10 gap-3 w-[500px]">
      <h1 className="text-xl">Your locations</h1>
      <section className="grid gap-3">
        <Suspense fallback={<LocationsTableSkeleton />}>
          <LocationsTable />
        </Suspense>
        <Link href="/locations/create">
          <Button aria-label="Add new location">Add +</Button>
        </Link>
      </section>
    </main>
  );
}
