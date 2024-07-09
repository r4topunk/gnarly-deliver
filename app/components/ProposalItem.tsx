'use client'
import React, { useState } from "react";
import {
    Card,
    Image,
    Stack,
    CardBody,
    Heading,
    Text,
    CardFooter,
    Button,
} from "@chakra-ui/react";
import { Proposal } from "../types";

type ProposalItemProps = {
    proposal: Proposal | any;
    onClick: () => void;
};

const ProposalItem: React.FC<ProposalItemProps> = ({ proposal, onClick }) => {
    const extractImageUrl = (markdown: string): string | null => {
        const imageRegex = /!\[.*?\]\((.*?)\)/;
        const match = imageRegex.exec(markdown);
        return match ? match[1] : null;
    };

    const [avatarUrl, setAvatarUrl] = useState<string>(
        extractImageUrl(proposal.body) || "https://gnars.com/images/logo.png"
    );
    const handleError = () => {
        setAvatarUrl("https://gnars.com/images/logo.png"); // Fallback placeholder image
    };
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            mb={4} // Adds some space between cards
        >
            <Image
                src={avatarUrl}
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                onError={handleError}
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>{proposal.title}</Heading>
                    <Text py='2'>
                        Author: {proposal.proposer}
                    </Text>
                    <Text>Status: {proposal.status}</Text>
                </CardBody>

                <CardFooter>
                    <Button variant='solid' colorScheme='blue' onClick={onClick}>
                        View Details
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default ProposalItem;
