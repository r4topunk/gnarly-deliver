import { Card, Text, VStack } from '@chakra-ui/react'
import { Update } from '../hooks/useUpdates'

function UpdateBody({update}: {update: Update}) {
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
        <Text fontSize={18}>{update.author}</Text>
        <Text fontSize={14}>{update.comment_body}</Text>
      </VStack>
      {update.created_at}
    </Card>
  )
}

export default UpdateBody