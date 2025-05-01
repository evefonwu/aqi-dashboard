import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Dashboard from "@/components/airquality/dashboard";
// import { Suspense } from "react";

export default function Home() {
  // your air quality dashboard will go here
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Your air quality dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <Suspense fallback={<DashboardSkeleton />}> */}
        <Dashboard />
        {/* </Suspense> */}
      </CardContent>
    </Card>
  );
}
