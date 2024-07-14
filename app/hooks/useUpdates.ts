import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

export interface Update {
  id: number;
  author: string;
  comment_body: string;
  created_at: string; // updated column name
  likes: number;
  proposal_id: string; // updated type
}

export const useAllUpdates = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const { data: updates } = await supabase
          .from("updates")
          .select()
          .order("created_at", { ascending: false });
        setUpdates(updates as Update[]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUpdates();
  }, []);

  return {
    updates,
    setUpdates,
  };
};

export const useUpdates = (proposalId: string) => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const { data: updates } = await supabase
          .from("updates")
          .select()
          .eq("proposal_id", proposalId);
        setUpdates(updates as Update[]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUpdates();
  }, []);

  return {
    updates,
    setUpdates,
  };
};

export default useUpdates;
