import { supabase } from "./supabase";

export async function createLead(
  userId,
  clientName,
  businessType,
  phone = "",
  status = "New"
) {
  const { data, error } = await supabase
    .from("leads")
    .insert([
      {
        user_id: userId,
        client_name: clientName,
        business_type: businessType,
        phone,
        status,
      },
    ])
    .select();

  return { data, error };
}

export async function getLeads(userId) {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function saveGeneration(
  userId,
  businessType,
  contentType,
  content
) {
  const { data, error } = await supabase
    .from("ai_generations")
    .insert([
      {
        user_id: userId,
        business_type: businessType,
        content_type: contentType,
        generated_content: content,
      },
    ])
    .select();

  return { data, error };
}

export async function getGenerations(userId) {
  const { data, error } = await supabase
    .from("ai_generations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return { data, error };
}

export async function getTodayUsage(userId) {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("ai_usage")
    .select("*")
    .eq("user_id", userId)
    .eq("usage_date", today)
    .maybeSingle();

  return { data, error };
}

export async function incrementTodayUsage(userId) {
  const today = new Date().toISOString().split("T")[0];

  const { data: existingUsage, error: fetchError } =
    await getTodayUsage(userId);

  if (fetchError) {
    return { data: null, error: fetchError };
  }

  if (!existingUsage) {
    const { data, error } = await supabase
      .from("ai_usage")
      .insert([
        {
          user_id: userId,
          usage_date: today,
          generations_count: 1,
        },
      ])
      .select()
      .single();

    return { data, error };
  }

  const { data, error } = await supabase
    .from("ai_usage")
    .update({
      generations_count: existingUsage.generations_count + 1,
    })
    .eq("id", existingUsage.id)
    .select()
    .single();

  return { data, error };
}

export async function updateUserPlan(userId, plan) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ plan })
    .eq("id", userId)
    .select()
    .single();

  return { data, error };
}

export async function deleteGeneration(generationId) {
  const { error } = await supabase
    .from("ai_generations")
    .delete()
    .eq("id", generationId);

  return { error };
}