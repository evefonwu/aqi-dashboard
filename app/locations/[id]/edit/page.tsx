// This form should be pre-populated with a existing location data
// import { fetchLocationById } from "@/app/lib/queries";

// page components can access a prop called params
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  // to continue

  return (
    <main>
      <p>location id: {id}</p>
    </main>
  );
}
