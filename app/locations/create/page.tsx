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
    <main className="grid p-10 w-[500px]">
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
