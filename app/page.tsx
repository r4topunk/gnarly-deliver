"use client"

import { Container, Text, VStack } from "@chakra-ui/react";
import UpdateBody from "./components/UpdateBody";
import { useAllUpdates } from "./hooks/useUpdates";

const Home = () => {
  const { updates, setUpdates } = useAllUpdates();

  return (
    <Container maxW="3xl" marginBlock={4}>
      <Text fontSize="4xl" width="full" textAlign={"center"} fontWeight="bold">
        Gnars DAO Updates
      </Text>
      <VStack mt={4}>
        {updates && updates.length > 0
          ? updates.map((update) => <UpdateBody key={update.id} update={update} />)
          : ""}
      </VStack>
    </Container>
  );
};

export default Home;
