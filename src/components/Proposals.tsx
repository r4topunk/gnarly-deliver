'use client'
import { useState, useEffect } from 'react';
import { Box, Button, Center, Image, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ProposalDetailView from '@/components/ProposalDetailView';
import ProposalList from '@/components/ProposalList';
import ProposalUpdates from '@/components/ProposalUpdates';
import { useProposals } from '@/hooks/useProposals';
import { SubGraphProposal } from '@/types';
import VoteList from './voteList';

const Proposals = () => {
  const { proposals, loading, error } = useProposals();
  const [selectedProposal, setSelectedProposal] = useState<SubGraphProposal | null>(null);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 500); // Adjust the delay as needed
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleProposalClick = (proposal: SubGraphProposal) => {
    setSelectedProposal(proposal);
  };

  if (showLoading || loading) {
    return (
      <Center>
        <Box>
          <Image src="/sktloading.gif" alt="loading" />
        </Box>
      </Center>
    );
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

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
                  <Tab>Insights</Tab>
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
                  <VoteList proposal={selectedProposal} />
                </TabPanel>
                <TabPanel>
                  <ProposalUpdates proposal={selectedProposal} />
                </TabPanel>
                <TabPanel>
                  Insights
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
