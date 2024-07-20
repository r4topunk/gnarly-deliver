import { fetchAllUpdates, fetchUpdatesForProposal } from "@/lib/supabase";
import { Update } from "@/types";
import { useEffect, useState } from "react";

export const useAllUpdates = () => {
  const [updates, setUpdates] = useState<Update[]>([]);

  async function fetchUpdates() {
    try {
      const updates = await fetchAllUpdates();
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
      const updates = await fetchUpdatesForProposal(proposalId)
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
