"use client";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNnsName } from "@nnsprotocol/resolver-wagmi";
import React, { useEffect, useState } from "react";
import { Proposal } from "../types";
import ProposalStatus from "./ProposalStatus";

type ProposalItemProps = {
  proposal: Proposal;
  onClick: () => void;
};

const ProposalItem: React.FC<ProposalItemProps> = ({ proposal, onClick }) => {
  const [user_wallet, setUserWallet] = useState<string>("");

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

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      mb={4} // Adds some space between cards
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
          <Box width={"full"} marginRight={4}>
            <Heading size="md">{proposal.title}</Heading>
            <Text py="2">
              Author: {String(user_wallet) || proposal.proposer}
            </Text>
          </Box>
          {/* <Text>{proposal.status}</Text> */}
          <ProposalStatus status={proposal.status} />
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
