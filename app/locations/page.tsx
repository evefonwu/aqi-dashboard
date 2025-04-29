import LocationsTable from "@/components/locations/table";
import { LocationsTableSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { PlusCircle } from "lucide-react";

export default function Page() {
  return (
    <main className="grid gap-3">
      <h1 className="text-xl">Your locations</h1>
      <section className="grid gap-3">
        <Suspense fallback={<LocationsTableSkeleton />}>
          <LocationsTable />
        </Suspense>
        <Link href="/locations/create">
          <Button aria-label="Add new location">
            Add <PlusCircle className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </main>
  );
}
