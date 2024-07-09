import React from "react";
import Proposals from "./props/page";
import { Box, Center, Image, Text, VStack } from "@chakra-ui/react";

const Home = () => {


  return (
    <Box
      m={4}
      p={4}>
      <Center>
        <VStack>
          <Image
            src="https://gnars.com/images/logo.png"
            alt="Gnar"
            width={100}
            height={100}
          />
          <Text fontSize="2xl" fontWeight="bold">Gnars Dao Proposals</Text>
        </VStack>
      </Center>
      <Proposals />
    </Box>
  );
};

export default Home;