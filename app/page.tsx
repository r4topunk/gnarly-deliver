import React from "react";
import Proposals from "./props/page";
import { Box, Center, Text } from "@chakra-ui/react";

const Home = () => {


  return (
    <Box
      m={4}
      p={4}>
      <Center>
        <Text fontSize="2xl" fontWeight="bold">Gnars Dao Proposals</Text>
      </Center>
      <Proposals />
    </Box>
  );
};

export default Home;