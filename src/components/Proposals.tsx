'use client'
import { useState } from 'react';
import { Box, Button, Center, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ProposalDetailView from '@/components/ProposalDetailView';
import ProposalList from '@/components/ProposalList';
import ProposalUpdates from '@/components/ProposalUpdates';
import { useProposals } from '@/hooks/useProposals';
import { SubGraphProposal } from '@/types';

const Proposals = () => {
  const { proposals, loading, error } = useProposals();
  const [selectedProposal, setSelectedProposal] = useState<SubGraphProposal | null>(null);

  const handleProposalClick = (proposal: SubGraphProposal) => {
    setSelectedProposal(proposal);
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
                  <Tab>Votes</Tab>
                  <Tab>Updates</Tab>
                </Center>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ProposalDetailView
                    proposal={selectedProposal}
                    loading={loading}
                  />
                </TabPanel>
                <TabPanel>
                  Votes
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
