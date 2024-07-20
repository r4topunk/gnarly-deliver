import UpdateBody from "@/components/UpdateBody";
import { fetchAllUpdates } from "@/lib/supabase";
import { Container, Text, VStack } from "@chakra-ui/react";

async function HomePage() {
  const updates = await fetchAllUpdates();

  return (
    <Container maxW="3xl" marginBlock={4}>
      <Text fontSize="4xl" width="full" textAlign={"center"} fontWeight="bold">
        Gnars DAO Updates
      </Text>
      <VStack mt={4}>
        {updates && updates.length > 0
          ? updates.map((update) => (
              <UpdateBody
                key={update.id}
                serverUpdate={update}
              />
            ))
          : ""}
      </VStack>
    </Container>
  );
};

export default HomePage;
