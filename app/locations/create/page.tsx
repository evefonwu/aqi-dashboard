import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/components/locations/create-form";
export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Location</CardTitle>
        <CardDescription>
          Add a location to your air quality dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateForm />
      </CardContent>
    </Card>
  );
}
