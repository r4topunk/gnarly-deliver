"use client";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNnsName } from "@nnsprotocol/resolver-wagmi";
import React, { useEffect, useState } from "react";
import { Proposal } from "../types";
import ProposalStatus from "./ProposalStatus";
import { createClient } from "../utils/supabase/client";
import getSummary from "../lib/getAiSummary";
type ProposalItemProps = {
  proposal: Proposal;
  onClick: () => void;
};

const ProposalItem: React.FC<ProposalItemProps> = ({ proposal, onClick }) => {
  const [user_wallet, setUserWallet] = useState<string>("");
  const supabase = createClient();

  const nns = useNnsName({
    //@ts-ignore
    address: `${proposal.proposer}`,
  });

  useEffect(() => {
    setUserWallet(String(nns.data));
  }, [nns]);
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

  const getAiSummary = async (proposalId: string, proposalDescription: string): Promise<any> => {
    try {
      const { data, error } = await supabase
        .from("updates")
        .select("AiSummary")
        .eq("proposal_id", proposalId)
        .single();

      if (error && error.code === "PGRST116") {
        // No rows found
        const aiSummary = await getSummary(proposalDescription);
        console.log("Generated AI summary:", aiSummary);

        const { data: updateData, error: updateError } = await supabase
          .from("updates")
          .update({ AiSummary: aiSummary })
          .eq("proposal_id", proposalId);

        if (updateError) throw updateError;

        console.log("Database updated with new AI summary:", updateData);
        return aiSummary;
      }

      if (error) throw error;

      if (data && data.AiSummary) {
        console.log("Database summary found:", data);
        return data.AiSummary;
      }
    } catch (err) {
      console.error("Error in getAiSummary:", err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchAiSummary = async () => {
      try {
        const summary = await getAiSummary(proposal.proposalId, proposal.description);
        setAiSummary(summary);
      } catch (error) {
        console.error("Error fetching AI summary:", error);
      }
    };

    fetchAiSummary();
  }, [proposal.proposalId, proposal.description]);



  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      mb={4}
    >
      <Image
        alt="Proposal Image"
        src={avatarUrl}
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        onError={handleError}
        aspectRatio={"1/1"}
      />

      <Stack w={"full"}>
        <CardBody display={"flex"}>
          <VStack>
            <Box width={"full"} marginRight={4}>

              <HStack>
                <Box ml={2}>
                  <Heading size="md">{proposal.title}</Heading>
                  <Text py="2">
                    Author: {String(user_wallet) || proposal.proposer}
                  </Text>
                </Box>
                {/* <Box
                  justifyContent={"flex-end"}>

                  <ProposalStatus status={proposal.status} />
                </Box> */}
              </HStack>

            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
            >
              <Text fontSize="sm" color="gray.500">
                {aiSummary}
              </Text>
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
