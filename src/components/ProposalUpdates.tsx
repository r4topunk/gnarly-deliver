"use client";

import UpdateBody from "@/components/UpdateBody";
import { useProposalUpdates } from "@/hooks/useUpdates";
import { SubGraphProposal } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Tables } from "@/utils/supabase/database.types";

type Update = Tables<'updates'>;  // Type for updates row

interface ProposalUpdatesProps {
  proposal: SubGraphProposal;
}

function ProposalUpdates({ proposal }: ProposalUpdatesProps) {
  const { updates, fetchUpdates } = useProposalUpdates(proposal.proposalNumber);
  const supabase = createClient();
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
    console.log('trying to submit');
    try {
      // Test if proposal exists in the database
      const { data: proposalUpsert, error: proposalError } = await supabase
        .from('proposals')
        .upsert({
          proposalNumber: Number(proposal.proposalNumber),
          ai_summary: '',
          proposalId: String(proposal.proposalId),
          proposer: proposal.proposer,
          title: proposal.title
        })
      console.log('proposalExists:', proposalUpsert);
      if (proposalError) {
        console.error('Error checking proposal existence:', proposalError);
        return;
      }

      const { data: updateData, error: updateError } = await supabase
        .from('updates')
        .insert([
          {
            author: userWallet,
            comment_body: newComment,
            proposalNumber: Number(proposal.proposalNumber),
          },
        ]);

      if (updateError) {
        console.error('Error inserting new update:', updateError);
        return;
      }



      fetchUpdates();
      setNewComment('');
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  // console.log('updates:', updates);
  // console.log('proposal:', proposal);
  // console.log('userWallet:', userWallet, 'proposal.proposer:', proposal.proposer);
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
            .map((update: Update) => <UpdateBody key={update.id} serverUpdate={update} />)
          : ""}
      </VStack>
    </Box>
  );
}

export default ProposalUpdates;
