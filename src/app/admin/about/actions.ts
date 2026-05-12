"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAboutData() {
  const supabase = createClient();
  const { data, error } = await supabase.from("about").select("*").single();
  if (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
  return data;
}

export async function updateAboutData(formData: FormData): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const id = formData.get("id") as string;

  const aboutData = {
    full_name: formData.get("full_name") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    experience: parseInt(formData.get("experience") as string, 10),
    completed_projects: parseInt(formData.get("completed_projects") as string, 10),
    customer_satisfaction: parseInt(formData.get("customer_satisfaction") as string, 10),
  };

  if (id) {
    const { error } = await supabase.from("about").update(aboutData).eq("id", id);
    if (error) {
      console.error("Error updating about data:", error);
      return;
    }
  } else {
    const { error } = await supabase.from("about").insert([aboutData]);
    if (error) {
      console.error("Error inserting about data:", error);
      return;
    }
  }

  revalidatePath("/admin/about");
  revalidatePath("/");
}
