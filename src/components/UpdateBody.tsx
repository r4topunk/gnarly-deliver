"use client";

import { Update } from "@/types";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Avatar,
  Box,
  Button,
  Card,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useAccount } from "wagmi";
import useEnsDetails from "../hooks/useEnsDetails";
import { createClient } from "../utils/supabase/client";
import { MarkdownRenderers } from "./MarkdownRenderers";

const formatRelativeDate = (dateString: string) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};
const supabase = createClient();

function UpdateBody({
  fetchUpdates,
  update,
  author,
  open = false,
}: {
  fetchUpdates?: () => void;
  update: Update;
  author: string;
  open?: boolean;
}) {
  const { ensName, ensAvatar, isLoading } = useEnsDetails(
    update.author as `0x${string}`,
  );
  const [isExpanded, setIsExpanded] = useState(open);
  const userWallet = useAccount();
  const userAddress = userWallet?.address as string;
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(update.comment_body);

  const handleDeletion = async () => {
    console.log(update.id);
    const { data, error } = await supabase
      .from("updates")
      .delete()
      .eq("id", update.id);
    fetchUpdates && fetchUpdates();
    if (error) {
      console.error(error);
    }
  }

  const handleEditContent = async () => {
    console.log(update.id);
    const { data, error } = await supabase
      .from("updates")
      .update({ comment_body: newComment })
      .eq("id", update.id);
    fetchUpdates && fetchUpdates();
    setIsEditing(false);
    if (error) {
      console.error(error);
    }
  }

  const handlePencilClick = () => {
    setIsExpanded(true);
    setIsEditing(isEditing => !isEditing);
  }
  const [displayEditButtons, setDisplayEditButtons] = useState(false);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant={open ? "unstyled" : "outline"}
      overflow="hidden"
      key={update.id}
      w={"full"}
      p={4}
      onMouseEnter={() => userAddress === update.author && (setDisplayEditButtons(true))}
      onMouseLeave={() => userAddress === update.author && (setDisplayEditButtons(false))}
    >
      <VStack align={"left"} gap={0} w={"full"}>
        <HStack w={"full"} justify={"space-between"}>
          <HStack>
            <Avatar
              src={isLoading ? "/loading.gif" : ensAvatar || "/loading.gif"}
              size="sm"
            />
            <Text fontSize={18}>{ensName}</Text>
            {userAddress === update.author && (
              <HStack display={displayEditButtons ? 'flex' : 'none'}>
                <FaPencilAlt onClick={handlePencilClick} color="gray.500" />
                <FaTrashAlt onClick={handleDeletion} color="red" />
              </HStack>
            )}
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
          {isEditing ? (
            <Box>
              <Textarea
                className="w-full h-24 p-2 rounded-md border border-gray-200"
                placeholder="Add your comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={() => handleEditContent()}
              >
                Submit
              </Button>
            </Box>
          ) : (
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={MarkdownRenderers}
            >
              {update.comment_body}
            </ReactMarkdown>
          )}
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
