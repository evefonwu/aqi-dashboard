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
        <Link href="/locations/create">
          <Button aria-label="Link to create new location page">
            Add <MoveRight className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
