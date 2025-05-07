"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  location: z.string(),
  zip: z.string(),
  date: z.string(),
});

const CreateLocation = FormSchema.omit({ id: true, date: true });

export async function createLocation(formData: FormData) {
  //console.log(formData);

  try {
    const { nickname, location, zip } = CreateLocation.parse({
      nickname: formData.get("nickname"),
      location: formData.get("location"),
      zip: formData.get("zip"),
    });

    const date = new Date().toISOString().split("T")[0];

    await sql`
        INSERT INTO userLocations (nickname, location, zipcode, date)
        VALUES (${nickname}, ${location}, ${zip}, ${date})
      `;
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/locations");
  redirect("/locations");
}

export async function deleteLocation(id: string) {
  try {
    await sql`DELETE FROM userLocations WHERE id = ${id}`;
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/locations");
}
