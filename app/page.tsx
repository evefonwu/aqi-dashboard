import { AirQualityIndex } from "@/components/airquality/airquality-index";
import Dashboard from "@/components/airquality/dashboard";
import { DashboardSkeleton } from "@/components/skeletons";

import { Suspense } from "react";

export default function Home() {
  // your air quality dashboard will go here
  return (
    <main className="grid gap-8">
      <section className="grid gap-3">
        <h1 className="text-xl">Dashboard</h1>
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard />
        </Suspense>
      </section>
      <section>
        <AirQualityIndex />
      </section>
    </main>
  );
}
