"use client";

import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useUpdates, { Update } from "../hooks/useUpdates";
import { Proposal } from "../types";
import { createClient } from "../utils/supabase/client";
import UpdateBody from "./UpdateBody";

interface ProposalUpdatesProps {
  proposal: Proposal;
}

function ProposalUpdates({ proposal }: ProposalUpdatesProps) {
  const { updates, setUpdates, fetchUpdates } = useUpdates(proposal.proposalNumber);
  const supabase = createClient();
  const [author, setAuthor] = useState<string>("");
  const [comment_body, setComment_body] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [created_at, setCreated_at] = useState<string>(""); // updated state name
  const [likes, setLikes] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>("");
  const user_account = useAccount();
  const [userWallet, setUserWallet] = useState<string>("");

  useEffect(() => {
    if (user_account) {
      setUserWallet(user_account.address as string);
    }
  }, [user_account]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Test if proposal exists in the database
      const { data: proposalExists, error: proposalError } = await supabase
        .from('proposals')
        .select()
        .eq('proposal_id', proposal.proposalNumber)
        .single(); // Use single() to get a single row

      if (proposalError) {
        console.error('Error checking proposal existence:', proposalError);
        return;
      }

      if (!proposalExists) {
        // If it doesn't exist, create a new entry
        const { data, error } = await supabase
          .from('proposals')
          .insert([
            {
              id: Number(proposal.proposalNumber),
              created_at: new Date().toISOString(), // Use ISO string for created_at
              ai_summary: '',
              proposal_index: proposal.proposalId,
            },
          ]);

        if (error) {
          console.error('Error inserting new proposal:', error);
          return;
        }
      }

      // Insert the new update
      const { data: updateData, error: updateError } = await supabase
        .from('updates')
        .insert([
          {
            author: userWallet,
            comment_body: newComment,
            likes: 0,
            proposal_id: Number(proposal.proposalNumber),
          },
        ]);

      if (updateError) {
        console.error('Error inserting new update:', updateError);
        return;
      }

      // Fetch updates and clear the comment input field
      fetchUpdates();
      setNewComment('');
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };


  return (
    <Box w={"full"} id="teste">
      {userWallet && (
        <h4 className=" font-semibold mb-2"> Connected User: {userWallet}</h4>
      )}
      {userWallet && proposal.proposer === userWallet.toLowerCase() ? (
        <>
          <textarea
            className="w-full h-24 p-2 rounded-md border border-gray-200"
            placeholder="Add your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button variant="solid" colorScheme="yellow" onClick={handleSubmit}>
            Submit
          </Button>
        </>
      ) : (
        <Text>Only the proposer can comment</Text>
      )}

      <VStack mt={4}>
        {updates && updates.length > 0
          ? updates
            .sort((a: Update, b: Update) => b.created_at.localeCompare(a.created_at))
            .map((update: Update) => <UpdateBody fetchUpdates={fetchUpdates} key={update.id} update={update} author={proposal.proposer} />)
          : ""}
      </VStack>
    </Box>
  );
}

export default ProposalUpdates;
