"use server";

import { createClient } from "../utils/supabase/server";

export async function fetchAllUpdates() {
  const supabase = createClient();
  const { data: updates } = await supabase
    .from("updates")
    .select()
    .order("created_at", { ascending: false });
  return updates || [];
}

export async function fetchUpdateById(_id: string) {
  const supabase = createClient();
  const { data: update } = await supabase
    .from("updates")
    .select()
    .eq("id", _id)
    .single();
  return update || null;
}

export async function fetchUpdatesForProposal(
  proposalNumber: number,
) {
  const supabase = createClient();
  const { data: updates } = await supabase
    .from("updates")
    .select()
    .eq("proposalNumber", proposalNumber);
  return updates || [];
}
