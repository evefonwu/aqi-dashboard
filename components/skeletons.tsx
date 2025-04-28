import { Skeleton } from "@/components/ui/skeleton";

export function LocationSkeleton() {
  return <Skeleton className="w-[400px] h-[30px]" />;
}

export function LocationsTableSkeleton() {
  return (
    <>
      <LocationSkeleton />
      <LocationSkeleton />
      <LocationSkeleton />
      <LocationSkeleton />
      <LocationSkeleton />
    </>
  );
}
