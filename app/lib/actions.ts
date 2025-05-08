"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const UserLocationSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  created_at: z.string(),
});
const CreateLocation = UserLocationSchema.omit({ id: true, created_at: true });

export async function createLocation(formData: FormData) {
  console.log(formData);
  try {
    const { nickname, city, state, zipcode } = CreateLocation.parse({
      nickname: formData.get("nickname"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipcode: formData.get("zipcode"),
    });

    await sql`
        INSERT INTO user_locations (nickname, city, state, zipcode)
        VALUES (${nickname}, ${city}, ${state}, ${zipcode})
      `;
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/locations");
  redirect("/locations");
}

export async function deleteLocation(id: string) {
  try {
    await sql`DELETE FROM user_locations WHERE id = ${id}`;
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/locations");
}
