"use client";

import { useParams } from 'next/navigation';
import { Box, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useProposal } from '@/hooks/useProposal';
import ProposalDetailView from '@/components/ProposalDetailView';
import ProposalUpdates from '@/components/ProposalUpdates';

const ProposalPage = () => {
  const params = useParams();
  const proposalNumber = params.proposalId;
  const proposal = useProposal(String(proposalNumber));

  if (!proposal) {
    return <Spinner />;
  }

  return (
    <Box p={4}>
      <Tabs w="full">
        <TabList>
          <Tab>Proposal Details</Tab>
          <Tab>Updates</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProposalDetailView proposal={proposal} loading={false} />
          </TabPanel>
          <TabPanel>
            <ProposalUpdates proposal={proposal} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProposalPage;
