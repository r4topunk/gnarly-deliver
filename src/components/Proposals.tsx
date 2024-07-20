"use client";

import ProposalDetailView from "@/components/ProposalDetailView";
import ProposalList from "@/components/ProposalList";
import ProposalUpdates from "@/components/ProposalUpdates";
import useGraphqlQuery from "@/hooks/useGraphqlQuery";
import { Proposal } from "@/types";
import { NOUNSBUILD_PROPOSALS_QUERY } from "@/utils/query";
import {
  Box,
  Button,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Proposals = () => {
  const subgGraphUrl =
    "https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-base-mainnet/stable/gn";
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null,
  );
  const [proposalLoading, setProposalLoading] = useState<boolean>(false);
  console.log(selectedProposal);
  const {
    data: proposalsData,
    loading: listLoading,
    error: listError,
  } = useGraphqlQuery({
    url: subgGraphUrl,
    query: NOUNSBUILD_PROPOSALS_QUERY,
    variables: {
      where: {
        dao: "0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17",
      },
      first: 50,
    },
  });

  useEffect(() => {
    if (proposalsData) {
      const mappedProposals = proposalsData.proposals.map((proposal: any) => ({
        proposalId: proposal.proposalId,
        title: proposal.title,
        proposer: proposal.proposer,
        status:
          proposal.executableFrom > Date.now() / 1000 ? "Active" : "Closed",
        description: proposal.description,
        forVotes: proposal.forVotes,
        againstVotes: proposal.againstVotes,
        abstainVotes: proposal.abstainVotes,
        proposalNumber: proposal.proposalNumber,
        quorumVotes: proposal.quorumVotes,
        expiresAt: proposal.expiresAt,
        snapshotBlockNumber: proposal.snapshotBlockNumber,
        transactionHash: proposal.transactionHash,
      }));
      setProposals(mappedProposals);
    }
  }, [proposalsData]);

  const handleProposalClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setProposalId(proposal.proposalId);
  };

  return (
    <>
      {selectedProposal === null && (
        <Box flex={1} p={4}>
          <ProposalList
            proposals={proposals}
            onProposalClick={handleProposalClick}
          />
        </Box>
      )}
      <Box flex={1} p={4}>
        {selectedProposal && (
          <Box>
            <Button onClick={() => setSelectedProposal(null)} mb={4}>
              Back
            </Button>
            <Tabs w="full">
              <TabList>
                <Center>
                  <Tab>Proposal Details</Tab>
                  <Tab>Updates</Tab>
                </Center>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ProposalDetailView
                    proposal={selectedProposal}
                    loading={listLoading}
                  />
                </TabPanel>
                <TabPanel>
                  <ProposalUpdates proposal={selectedProposal} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Proposals;
