import { SubGraphProposal } from "@/types";
import React from "react";
import { Box, Text, Flex, Avatar, HStack, Badge } from "@chakra-ui/react";
import useMemoizedNnsName from "@/hooks/useNNS";
import useEnsDetails from "@/hooks/useEnsDetails"; // Adjust the import path as necessary

interface VoteListProps {
    proposal: SubGraphProposal;
}

const VoteItem = ({ voter, support, weight, reason, totalWeight }: { voter: any, support: any, weight: any, reason: any, totalWeight: number }) => {
    const nnsName = useMemoizedNnsName(voter as `0x${string}`);
    const { ensAvatar } = useEnsDetails(voter as `0x${string}`);
    console.log('ensAvatar:', ensAvatar);
    const votePercentage = ((weight / totalWeight) * 100).toFixed(2);

    return (
        <Flex mb={4} p={4} borderWidth="1px" borderRadius="md" alignItems="center">
            <Avatar src={ensAvatar ? String(ensAvatar) : "/loading.gif"} name={nnsName} mr={4} />
            <Box>
                <HStack>
                    {nnsName} <strong>voted</strong> <Text color={String(support) === "FOR" ? "green" : "red"}>{support} with {weight}</Text>
                    <Badge ml={2} colorScheme="blue">{votePercentage}%</Badge>
                </HStack>
                <Text><strong>Reason:</strong> {reason || "No reason provided"}</Text>
            </Box>
        </Flex>
    );
};

export default function VoteList({ proposal }: VoteListProps) {
    const totalWeight = proposal.votes.reduce((sum, vote) => sum + vote.weight, 0);

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
                        totalWeight={totalWeight}
                    />
                ))
            ) : (
                <Text>No votes available.</Text>
            )}
        </Box>
    );
}
