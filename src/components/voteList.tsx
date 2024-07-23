import { SubGraphProposal } from "@/types";
import React from "react";
import { Box, Text, Flex, Avatar, HStack } from "@chakra-ui/react";
import useMemoizedNnsName from "@/hooks/useNNS";
import useEnsDetails from "@/hooks/useEnsDetails"; // Adjust the import path as necessary

interface VoteListProps {
    proposal: SubGraphProposal;
}

const VoteItem = ({ voter, support, weight, reason }: { voter: any, support: any, weight: any, reason: any }) => {
    const nnsName = useMemoizedNnsName(voter as `0x${string}`);
    const { ensAvatar } = useEnsDetails(voter as `0x${string}`);

    return (
        <Flex mb={4} p={4} borderWidth="1px" borderRadius="md" alignItems="center">
            <Avatar src={String(ensAvatar)} name={nnsName} mr={4} />
            <Box>
                <HStack>
                    {nnsName} <strong>voted</strong> <Text color={String(support) === "FOR" ? "green" : "red"}>{support} with {weight}</Text>
                </HStack>
                <Text><strong>Reason:</strong> {reason || "No reason provided"}</Text>
            </Box>
        </Flex>
    );
};

export default function VoteList({ proposal }: VoteListProps) {
    return (
        <Box>
            <Text fontSize="2xl" mb={4}>Votes</Text>
            {proposal.votes && proposal.votes.length > 0 ? (
                proposal.votes.map((vote, index) => (
                    <VoteItem
                        key={index}
                        voter={vote.voter}
                        support={vote.support}
                        weight={vote.weight}
                        reason={vote.reason}
                    />
                ))
            ) : (
                <Text>No votes available.</Text>
            )}
        </Box>
    );
}
