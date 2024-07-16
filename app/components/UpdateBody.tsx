"use client";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Avatar,
  Box,
  Card,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import useEnsDetails from "../hooks/useEnsDetails";
import { Update } from "../hooks/useUpdates";
import { MarkdownRenderers } from "./MarkdownRenderers";

const formatRelativeDate = (dateString: string) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

function UpdateBody({
  update,
  author,
  open = false,
}: {
  update: Update;
  author: string;
  open?: boolean;
}) {
  const { ensName, ensAvatar, isLoading } = useEnsDetails(
    update.author as `0x${string}`,
  );
  const [isExpanded, setIsExpanded] = useState(open);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant={open ? "unstyled" : "outline"}
      overflow="hidden"
      key={update.id}
      w={"full"}
      p={4}
    >
      <VStack align={"left"} gap={0} w={"full"}>
        <HStack w={"full"} justify={"space-between"}>
          <HStack>
            <Avatar
              src={isLoading ? "/loading.gif" : ensAvatar || "/loading.gif"}
              size="sm"
            />
            <Text fontSize={18}>{ensName}</Text>
          </HStack>
          <Link href={`/update/${update.id}`}>
            {formatRelativeDate(update.created_at)}
          </Link>
        </HStack>
        <Box
          h={isExpanded ? "100%" : "80px"}
          overflow="auto"
          position="relative"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              display: "none",
            },
          }}
        >
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={MarkdownRenderers}
          >
            {update.comment_body}
          </ReactMarkdown>
          {!isExpanded && (
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              height="50px"
              bg="linear-gradient(transparent, white)"
              pointerEvents="none"
            />
          )}
        </Box>
        {open === false && update.comment_body.length > 30 && (
          <Accordion allowToggle onChange={() => setIsExpanded(!isExpanded)}>
            <AccordionItem border="none">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {isExpanded ? "Show Less" : "Show More"}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </AccordionItem>
          </Accordion>
        )}
      </VStack>
    </Card>
  );
}

export default UpdateBody;
