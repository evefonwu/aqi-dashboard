import { Skeleton } from "@/components/ui/skeleton";

export function LocationSkeleton() {
  return <Skeleton className="w-[280px] md:w-[430px] h-[30px]" />;
}

export function ItemSkeleton() {
  return <Skeleton className="w-[280px] md:w-[430px] h-[50px]" />;
}

export function LocationsTableSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <LocationSkeleton />
      <LocationSkeleton />
      <LocationSkeleton />
      <LocationSkeleton />
      <LocationSkeleton />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
    </div>
  );
}
