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
    <main className="grid min-w-[380px]">
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Location</CardTitle>
          <CardDescription>Add a location to your list</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateForm />
        </CardContent>
      </Card>
    </main>
  );
}
