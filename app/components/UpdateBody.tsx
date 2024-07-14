'use client'
import { Card, Text, VStack, HStack, Avatar, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
import { Update } from '../hooks/useUpdates';
import { useState } from 'react';
import useEnsDetails from '../hooks/useEnsDetails';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { MarkdownRenderers } from './MarkdownRenderers';
import { formatDistanceToNow } from 'date-fns';

const formatRelativeDate = (dateString: string) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

function UpdateBody({ update, author }: { update: Update, author: string }) {
  const { ensName, ensAvatar, isLoading } = useEnsDetails(update.author as `0x${string}`);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      key={update.id}
      w={"full"}
      p={4}
    >
      <VStack align={"left"} gap={0} w={"full"}>
        <HStack>
          <Avatar src={isLoading ? '/loading.gif' : ensAvatar || '/loading.gif'} size="sm" />
          <Text fontSize={18}>{ensName}</Text>
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
            }
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
      </VStack>
      <Text>{formatRelativeDate(update.created_at)}</Text>
    </Card>
  );
}

export default UpdateBody;
