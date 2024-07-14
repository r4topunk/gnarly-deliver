import { Badge } from "@chakra-ui/react";

function ProposalStatus({ status }: { status: string }) {
  return (
    <Badge
      borderRadius={2}
      height={"fit-content"}
      colorScheme={status === "Closed" ? "red" : "green"}
    >
      {status}
    </Badge>
  );
}

export default ProposalStatus;
