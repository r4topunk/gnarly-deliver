import Proposals from "@/components/Proposals";
import { Container, Text } from "@chakra-ui/react";

const ProposalsPage = () => {
  return (
    <Container maxW="3xl" marginBlock={4}>
      <Text fontSize="4xl" width="full" textAlign={"center"} fontWeight="bold">
        Gnars DAO Proposals
      </Text>
      <Proposals />
    </Container>
  );
};

export default ProposalsPage;
