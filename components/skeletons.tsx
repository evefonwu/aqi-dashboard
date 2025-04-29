import { Skeleton } from "@/components/ui/skeleton";

export function LocationSkeleton() {
  return <Skeleton className="w-[350px] h-[30px]" />;
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

export function ItemSkeleton() {
  return <Skeleton className="w-[350px] h-[50px]" />;
}

export function DashboardSkeleton() {
  return (
    <>
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
    </>
  );
}
