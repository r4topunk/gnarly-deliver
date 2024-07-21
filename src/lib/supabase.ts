"use server";
import { Update } from "@/types";
import { createClient } from "../utils/supabase/server";

export async function fetchAllUpdates(): Promise<Update[] | []> {
  const supabase = createClient();
  const { data: updates } = await supabase
    .from("updates")
    .select()
    .order("created_at", { ascending: false });
  return updates || [];
}

export async function fetchUpdateById(_id: string): Promise<Update | null> {
  const supabase = createClient();
  const { data: update } = await supabase
    .from("updates")
    .select()
    .eq("id", _id)
    .single();
  return update || null;
}

export async function fetchUpdatesForProposal(
  proposal_id: number,
): Promise<Update[] | []> {
  const supabase = createClient();
  const { data: updates } = await supabase
    .from("updates")
    .select()
    .eq("proposal_id", proposal_id);
  return updates || [];
}
