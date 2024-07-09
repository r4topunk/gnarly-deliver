import React from "react";
import { Box, Text, Textarea, VStack } from "@chakra-ui/react";

type ProposalUpdatesProps = {
    proposalId: string;
};

const ProposalUpdates: React.FC<ProposalUpdatesProps> = ({ proposalId }) => {
    // Placeholder updates data
    const updates = [
        { id: 1, content: "Update 1 content for proposal " + proposalId },
        { id: 2, content: "Update 2 content for proposal " + proposalId },
    ];

    return (
        <VStack align="stretch" spacing={4}>
            {updates.map((update) => (
                <Box key={update.id} p={4} border="1px" borderColor="gray.200" rounded="md">
                    <Text>{update.content}</Text>
                </Box>
            ))}
            <Textarea
                placeholder="Add an update..."
                size="sm"
                resize="none"
                rounded="md"
                p={4}
                border="1px"
                borderColor="gray.200"
            />
        </VStack>
    );
};

export default ProposalUpdates;
