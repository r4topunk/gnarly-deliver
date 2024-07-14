'use client'
import React from "react";
import { Box, Button, Flex, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import { FaArrowLeft } from "react-icons/fa";
import { RiExternalLinkLine } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { MarkdownRenderers } from "./MarkdownRenderers";


type VoteStatProps = {
    label: string;
    value: number;
    total: number;
    progressColor: string;
};

const VoteStat: React.FC<VoteStatProps> = ({ label, value, total, progressColor }) => {
    const percentage = Math.round((100.0 * value) / total);
    return (
        <VStack
            spacing={1}
            flex={1}
            textAlign="center"
            border="1px"
            borderColor="gray.200"
            bg="gray.50"
            p={2}
            rounded="md"
        >
            <Text fontSize="xs" color={progressColor}>{label}</Text>
            <Text fontSize="sm" color="gray.800" fontWeight="medium">{value}</Text>
            <Box w="100%" h="6px" bg="gray.200" borderRadius="md" mt="1">
                <Box w={`${percentage}%`} h="6px" bg={progressColor} borderRadius="md" />
            </Box>
        </VStack>
    );
};

type InfoBoxProps = {
    label: string;
    subtext: string;
    value: string;
};

const InfoBox: React.FC<InfoBoxProps> = ({ label, subtext, value }) => (
    <VStack
        spacing={1.5}
        flex={1}
        textAlign="center"
        border="1px"
        borderColor="gray.200"
        bg="white"
        rounded="md"
        p={2}
    >
        <Text fontSize="xs" color="gray.800" fontWeight="medium">{label}</Text>
        <VStack spacing={1}>
            <Text fontSize="xs" color="gray.500" fontWeight="medium">{subtext}</Text>
            <Text fontSize="xs" color="gray.800" fontWeight="semibold">{value}</Text>
        </VStack>
    </VStack>
);

type AddressInfoProps = {
    label: string;
    address: string;
};

const AddressInfo: React.FC<AddressInfoProps> = ({ label, address }) => {
    const href = `https://basescan.io/address/${address}/`;

    if (!address) {
        return null;
    }

    return (
        <HStack alignItems="flex-start" overflow="hidden">
            <Text fontSize="xs" color="gray.500">{label}</Text>
            <a href={href} target="_blank" rel="noreferrer">
                <Text fontSize="xs" color="red.500" fontWeight="medium" isTruncated>
                    {address}
                </Text>
            </a>
        </HStack>
    );
};

type Proposal = {
    proposalId: string;
    title: string;
    proposer: string;
    status: string;
    description: string;
    forVotes: number;
    againstVotes: number;
    abstainVotes: number;
    quorumVotes: number;
    expiresAt: number;
    snapshotBlockNumber: number;
    transactionHash: string;
};

type ProposalDetailViewProps = {
    proposal: Proposal;
    loading: boolean;
};

const ProposalDetailView: React.FC<ProposalDetailViewProps> = ({ proposal, loading }) => {
    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" w="100%" h="100%">
                <Spinner />
            </Box>
        );
    }

    if (!proposal) {
        return null;
    }

    const votes = {
        for: Number(proposal.forVotes),
        against: Number(proposal.againstVotes),
        abstain: Number(proposal.abstainVotes),
        quorum: Number(proposal.quorumVotes),
    };

    const totalVotes = votes.for + votes.against + votes.abstain;

    return (
        <VStack spacing={4} align="stretch" w="full">

            <VStack spacing={2} align="stretch">
                {/* <Text fontSize="lg" fontWeight="bold">Proposal {proposal.proposalId}</Text> */}
                <Flex justifyContent="space-between">
                    <VStack>

                        <Text fontSize="36px" fontWeight="semibold">{proposal.title}</Text>
                    </VStack>
                    <a href={`https://basescan.io/tx/${proposal.transactionHash}`} target="_blank" rel="noreferrer">
                        <Button variant="outline" size="sm" rightIcon={<RiExternalLinkLine />}>
                            BaseScan
                        </Button>
                    </a>
                </Flex>
                <AddressInfo label="Proposed by" address={proposal.proposer} />

            </VStack>
            <HStack spacing={2}>
                <VoteStat label="For" value={votes.for} total={totalVotes} progressColor="green.500" />
                <VoteStat label="Against" value={votes.against} total={totalVotes} progressColor="red.500" />
                <VoteStat label="Abstain" value={votes.abstain} total={totalVotes} progressColor="gray.600" />
            </HStack>
            <HStack spacing={2} wrap="wrap">
                <InfoBox label="Threshold" subtext="Threshold" value={`${votes.quorum} votes`} />
                <InfoBox label="Ends" subtext={moment(proposal.expiresAt * 1000).format('h:mm A')} value={moment(proposal.expiresAt * 1000).format('MMM D, YYYY')} />
                <InfoBox label="Snapshot" subtext="Taken at block" value={proposal.snapshotBlockNumber.toString()} />
            </HStack>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={MarkdownRenderers}
            >{proposal.description}</ReactMarkdown>
        </VStack>
    );
};

export default ProposalDetailView;
