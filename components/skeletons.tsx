import { Skeleton } from "@/components/ui/skeleton";

export function LocationSkeleton() {
  return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
}

export function LocationsTableSkeleton() {
  return (
    <>
      <LocationSkeleton />
      <LocationSkeleton />
      <LocationSkeleton />
      <LocationSkeleton />
    </>
  );
}
