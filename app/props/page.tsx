'use client'
import React, { useState, useEffect } from "react";
import useGraphqlQuery from "../hooks/useGraphqlQuery";
import ProposalList from "../components/ProposalList";
import ProposalDetailView from "../components/ProposalDetailView";
import { Proposal } from "../types"; // Import the shared Proposal type
import { Box, HStack, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ProposalUpdates from "../components/ProposalUpdates";
export const NOUNSBUILD_PROPOSALS_QUERY = `
query proposals(
  $where: Proposal_filter
  $first: Int! = 100,
  $skip: Int = 0
) {
  proposals(
    where: $where
    first: $first
    skip: $skip
    orderBy: timeCreated
    orderDirection: desc
  ) {
    ...Proposal
    votes {
      ...ProposalVote
    }
  }
}

fragment Proposal on Proposal {
  abstainVotes
  againstVotes
  calldatas
  description
  descriptionHash
  executableFrom
  expiresAt
  forVotes
  proposalId
  proposalNumber
  proposalThreshold
  proposer
  quorumVotes
  targets
  timeCreated
  title
  values
  voteEnd
  voteStart
  snapshotBlockNumber
  transactionHash
  dao {
    governorAddress
    tokenAddress
  }
}

fragment ProposalVote on ProposalVote {
  voter
  support
  weight
  reason
}
`;

const Proposals = () => {
    const subgGraphUrl = "https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-base-mainnet/stable/gn";
    const [proposalId, setProposalId] = useState<string | null>(null);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
    const [proposalLoading, setProposalLoading] = useState<boolean>(false);

    const {
        data: proposalsData,
        loading: listLoading,
        error: listError,
    } = useGraphqlQuery({
        url: subgGraphUrl,
        query: NOUNSBUILD_PROPOSALS_QUERY,
        variables: {
            where: {
                dao: "0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17"
            }
        }
    });

    useEffect(() => {
        if (proposalsData) {
            const mappedProposals = proposalsData.proposals.map((proposal: any) => ({
                proposalId: proposal.proposalId,
                title: proposal.title,
                proposer: proposal.proposer,
                status: proposal.executableFrom > Date.now() / 1000 ? 'Active' : 'Closed',
                description: proposal.description,
                forVotes: proposal.forVotes,
                againstVotes: proposal.againstVotes,
                abstainVotes: proposal.abstainVotes,
                quorumVotes: proposal.quorumVotes,
                expiresAt: proposal.expiresAt,
                snapshotBlockNumber: proposal.snapshotBlockNumber,
                transactionHash: proposal.transactionHash
            }));
            setProposals(mappedProposals);
            setSelectedProposal(mappedProposals[0]); // Set the most recent proposal as default
        }
    }, [proposalsData]);

    const handleProposalClick = (proposal: Proposal) => {
        setSelectedProposal(proposal);
        setProposalId(proposal.proposalId);
    };

    return (
        <HStack spacing={4} align="start">
            <Box maxH={'100vh'} flex={1} p={4} overflow={'auto'}
                sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}
            >
                <ProposalList
                    proposals={proposals}
                    onProposalClick={handleProposalClick}
                />
            </Box>
            <Box maxH={'100vh'} flex={1} p={4} overflow={'auto'}
                sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}
            >
                {selectedProposal && (
                    <Tabs>
                        <TabList>
                            <Tab>Proposal Details</Tab>
                            <Tab>Updates</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <ProposalDetailView
                                    proposal={selectedProposal}
                                    loading={listLoading}
                                />
                            </TabPanel>
                            <TabPanel>
                                <ProposalUpdates
                                    proposalId={selectedProposal.proposalId}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                )}
            </Box>
        </HStack>
    );
};

export default Proposals;