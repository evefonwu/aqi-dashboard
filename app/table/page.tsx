import LocationsAddForm from "@/components/sections/LocationsAddForm";
import LocationsTable from "@/components/sections/LocationsTable";

export default function Page() {
  return (
    <div className="grid p-10 gap-10 w-150">
      <LocationsAddForm />
      <LocationsTable />
    </div>
  );
}
