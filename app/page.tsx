import { Container, Text } from "@chakra-ui/react";
import Proposals from "./props/page";

const Home = () => {
  return (
    <Container maxW="3xl" marginBlock={4}>
      <Text fontSize="4xl" width="full" textAlign={"center"} fontWeight="bold">
        Gnars Dao Proposals
      </Text>
      <Proposals />
    </Container>
  );
};

export default Home;
