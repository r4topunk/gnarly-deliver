import { fetchAllUpdates, fetchUpdatesForProposal } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Tables } from "@/utils/supabase/database.types";

type Update = Tables<'updates'>;  // Type for updates row

export const useAllUpdates = () => {
  const [updates, setUpdates] = useState<Update[]>([]);

  async function fetchUpdates() {
    try {
      const updates: Update[] = await fetchAllUpdates();
      setUpdates(updates);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUpdates();
  }, []);

  return {
    updates,
    setUpdates,
    fetchUpdates,
  };
};

export const useProposalUpdates = (proposalId: number) => {
  const [updates, setUpdates] = useState<Update[]>([]);

  async function fetchUpdates() {
    try {
      const updates: Update[] = await fetchUpdatesForProposal(proposalId);
      setUpdates(updates);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUpdates();
  }, [proposalId]);

  return {
    updates,
    setUpdates,
    fetchUpdates,
  };
};
