"use client"

import UpdateBody from "@/components/UpdateBody";
import { useAllUpdates } from "@/hooks/useUpdates";
import { Container, Text, VStack } from "@chakra-ui/react";


const Home = () => {
  const { updates, setUpdates, fetchAllUpdates } = useAllUpdates();
  return (
    <Container maxW="3xl" marginBlock={4}>
      <Text fontSize="4xl" width="full" textAlign={"center"} fontWeight="bold">
        Gnars DAO Updates
      </Text>
      <VStack mt={4}>
        {updates && updates.length > 0
          ? updates.map((update) => <UpdateBody fetchUpdates={fetchAllUpdates} key={update.id} update={update} author={update.author} />)
          : ""}
      </VStack>
    </Container>
  );
};

export default Home;
