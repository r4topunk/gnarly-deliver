"use client";

import { useParams } from 'next/navigation';
import { Box, Center, HStack, Image, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import { useProposal } from '@/hooks/useProposal';
import ProposalDetailView from '@/components/ProposalDetailView';
import ProposalUpdates from '@/components/ProposalUpdates';
import VoteList from '@/components/voteList';
import Insights from '@/components/Insights';

const ProposalPage = () => {
  const params = useParams();
  const proposalNumber = params.proposalId;
  const proposal = useProposal(String(proposalNumber));

  if (!proposal) {
    return (
      <Center>
        <VStack>
          <Text>Serching the wild blockchain for the proposal...</Text>
          <Image src="/sktloading.gif" alt="loading" />
        </VStack>
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Tabs w="full">
        <TabList>
          <Tab>Proposal Details</Tab>
          <Tab>Votes</Tab>
          <Tab>Updates</Tab>
          <Tab>Insights</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProposalDetailView proposal={proposal} loading={false} />
          </TabPanel>
          <TabPanel>
            <VoteList proposal={proposal} />
          </TabPanel>
          <TabPanel>
            <ProposalUpdates proposal={proposal} />
          </TabPanel>
          <TabPanel>
            <Insights votes={proposal.votes} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProposalPage;
