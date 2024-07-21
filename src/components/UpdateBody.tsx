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
  serverUpdate,
  open = false,
}: {
  serverUpdate: Update;
  open?: boolean;
}) {
  const [update, setUpdate] = useState(serverUpdate);
  const [display, setDisplay] = useState("block");

  const { ensName, ensAvatar, isLoading } = useEnsDetails(
    update.author as `0x${string}`,
  );
  const [isExpanded, setIsExpanded] = useState(open);
  const userWallet = useAccount();
  const userAddress = userWallet?.address as string;
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(update.comment_body);

  const isUserAuthor = userAddress === update.author;

  const handleDeletion = async () => {
    console.log(update.id);
    const { data, error } = await supabase
      .from("updates")
      .delete()
      .eq("id", update.id);
    setDisplay("none");
    if (error) {
      console.error(error);
    }
  };

  const handleEditContent = async () => {
    console.log(update.id);
    const { data, error } = await supabase
      .from("updates")
      .update({ comment_body: newComment })
      .eq("id", update.id);
    setUpdate(update => ({...update, comment_body: newComment}))
    setIsEditing(false);
    if (error) {
      console.error(error);
    }
  };

  const handlePencilClick = () => {
    setIsExpanded(true);
    setIsEditing((isEditing) => !isEditing);
  };
  const [displayEditButtons, setDisplayEditButtons] = useState(false);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant={open ? "unstyled" : "outline"}
      overflow="hidden"
      key={update.id}
      w={"full"}
      p={4}
      onMouseEnter={() => setDisplayEditButtons(true)}
      onMouseLeave={() => setDisplayEditButtons(false)}
      display={display}
    >
      <VStack align={"left"} gap={2} w={"full"}>
        <HStack w={"full"} justify={"space-between"}>
          <HStack>
            <Avatar
              src={isLoading ? "/loading.gif" : ensAvatar || "/loading.gif"}
              size="sm"
            />
            <Text fontSize={18}>{ensName}</Text>
            {isUserAuthor && displayEditButtons && (
              <HStack>
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
          overflow={isExpanded ? "auto" : "hidden"}
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
            <VStack align={"start"} gap={2}>
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
            </VStack>
          ) : (
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={MarkdownRenderers}
            >
              {update.comment_body}
            </ReactMarkdown>
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
