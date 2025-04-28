"use server";
// use server will mark all exported functions within as Server Actions, fn to run async code directly on the server (skip APIs).
// server action fns will be called when forms are submitted

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  location: z.string(),
  date: z.string(),
});
const CreateLocation = FormSchema.omit({ id: true, date: true });

export async function createLocation(formData: FormData) {
  console.log(formData);
  const { location } = CreateLocation.parse({
    location: formData.get("location"),
  });
  const zipcode = "10001"; // stub
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
        INSERT INTO locations (location, zipcode, date)
        VALUES (${location}, ${zipcode}, ${date})
      `;
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/locations");
  redirect("/locations");
}

export async function deleteLocation(id: string) {
  await sql`DELETE FROM locations WHERE id = ${id}`;
  revalidatePath("/locations");
}
