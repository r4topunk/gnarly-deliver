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
      <Tabs w="full" isLazy>
        <TabList>
          <Center>
            <Tab>Proposal Details</Tab>
            <Tab>Votes</Tab>
            <Tab>Updates</Tab>
            <Tab>Insights</Tab>
          </Center>
        </TabList>
        <TabPanels>
          <Center>
            <TabPanel width={{ base: '100%', md: '70%' }}>
              <ProposalDetailView proposal={proposal} loading={false} />
            </TabPanel>
          </Center>
          <TabPanel>
            <VoteList proposal={proposal} />
          </TabPanel>
          <Center>
            <TabPanel width={{ base: '100%', md: '70%' }}>
              <ProposalUpdates proposal={proposal} />
            </TabPanel>
          </Center>
          <TabPanel>
            <Insights votes={proposal.votes} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProposalPage;
