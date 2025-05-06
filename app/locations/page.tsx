import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LocationsTable from "@/components/locations/table";
import { LocationsTableSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { MoveRight } from "lucide-react";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your locations</CardTitle>
        <CardDescription>
          Air quality dashboard will be created for the locations you add here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<LocationsTableSkeleton />}>
          <LocationsTable />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Button aria-label="Link to create new location" asChild>
          <Link href="/locations/create">
            Add <MoveRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
