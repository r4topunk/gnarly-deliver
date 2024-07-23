import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Image,
  Progress,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SubGraphProposal } from "../types";
import { createClient } from "../utils/supabase/client";
import useMemoizedNnsName from "../hooks/useNNS";
import useEnsDetails from "../hooks/useEnsAvatar";

type ProposalItemProps = {
  proposal: SubGraphProposal;
  onClick: () => void;
};

const ProposalItem: React.FC<ProposalItemProps> = ({ proposal, onClick }) => {
  const supabase = createClient();
  const userWallet = useMemoizedNnsName(proposal.proposer as `0x${string}`);
  const ensAvatar = useEnsDetails(proposal.proposer as `0x${string}`);
  console.log(proposal.forVotes, proposal.againstVotes);

  const extractImageUrl = (markdown: string): string | null => {
    const imageRegex = /!\[.*?\]\((.*?)\)/;
    const match = imageRegex.exec(markdown);
    return match ? match[1] : null;
  };

  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    const imageUrl = extractImageUrl(proposal.description);
    return imageUrl || "https://gnars.com/images/logo.png";
  });

  const handleError = () => {
    setAvatarUrl("https://gnars.com/images/logo.png");
  };

  useEffect(() => {
    const imageUrl = extractImageUrl(proposal.description);
    if (imageUrl) {
      setAvatarUrl(imageUrl);
    }
  }, [proposal.description]);

  const [aiSummary, setAiSummary] = useState<string>("");

  const totalVotes = proposal.forVotes + proposal.againstVotes;
  const forVotesPercentage = totalVotes === 0 ? 0 : (proposal.forVotes / totalVotes) * 100;
  const againstVotesPercentage = totalVotes === 0 ? 0 : (proposal.againstVotes / totalVotes) * 100;

  return (
    <Card direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline" mb={4}>
      <Image
        alt="Proposal Image"
        src={avatarUrl}
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        onError={handleError}
      />

      <Stack w={"full"}>
        <CardBody display={"flex"}>
          <VStack width="full" spacing={4}>
            <Box width={"full"} marginRight={4}>
              <HStack>
                <Box ml={2}>
                  <Text fontSize="26px">{proposal.title}</Text>
                  <HStack>
                    <Avatar src={ensAvatar?.ensAvatar || "/loading.gif"} size="sm" />
                    <Text py="2">{String(userWallet) || proposal.proposer}</Text>

                    {proposal.voteStart < Date.now() / 1000 && proposal.voteEnd > Date.now() / 1000 ? (
                      <Badge colorScheme="green">Active</Badge>
                    ) : (
                      <Badge colorScheme="grey">Closed</Badge>
                    )}
                  </HStack>
                </Box>
              </HStack>
            </Box>
            <Box width="full">
              <HStack>
                <Text fontSize="sm">For Votes</Text>
                <span>{proposal.forVotes}</span>
              </HStack>
              <Progress colorScheme="green" size="sm" value={forVotesPercentage} mb={2} />
              <HStack>
                <Text fontSize="sm">Against Votes</Text>
                <span>{proposal.againstVotes}</span>
              </HStack>
              <Progress colorScheme="red" size="sm" value={againstVotesPercentage} />
            </Box>
          </VStack>
        </CardBody>
        <CardFooter justify={"right"}>
          <Button variant="solid" colorScheme="yellow" onClick={onClick}>
            View Details
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ProposalItem;
