import { SUBGRAPH_URL } from "@/constants/lib";
import { fetchGraphQLData } from "@/lib/graphQL";
import { NOUNSBUILD_PROPOSALS_QUERY } from "@/utils/query";
import moment from "moment";
import { ImageResponse } from "next/og";

type ProposalType = {
  proposalId: string;
  title: string;
  proposer: string;
  status: "Active" | "Closed";
  description: string;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  proposalNumber: number;
  quorumVotes: number;
  voteStart: number;
  voteEnd: number;
  expiresAt: number;
  snapshotBlockNumber: number;
  transactionHash: string;
  votes: any[];
};

export async function GET(
  req: Request,
  { params }: { params: { proposalNumber: string } },
) {
  try {
    if (!params.proposalNumber) {
      return new ImageResponse(<div>You must provide a Proposal Number</div>, {
        width: 1200,
        height: 630,
      });
    }

    const poposalNumber = parseInt(params.proposalNumber);

    const result = await fetchGraphQLData(
      SUBGRAPH_URL,
      NOUNSBUILD_PROPOSALS_QUERY,
      {
        where: {
          dao: "0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17",
          proposalNumber: poposalNumber,
        },
        first: 1,
      },
    );

    if (!result.proposals || result.proposals.length === 0) {
      return new ImageResponse(<div>404 - Proposal Not Found</div>, {
        width: 1200,
        height: 630,
      });
    }

    return new ImageResponse(<VoteResult proposal={result.proposals[0]} />, {
      width: 1200,
      height: 630,
    });
  } catch (err) {
    console.error(err);
    return new ImageResponse(<div>Error :(</div>, {
      width: 1200,
      height: 630,
    });
  }
}

const VoteResult = ({ proposal }: { proposal: ProposalType }) => {
  const totalVotes =
    proposal.forVotes + proposal.abstainVotes + proposal.againstVotes;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "40px", fontWeight: "bold" }}>
          {proposal.title}
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          marginTop: "20px",
          fontSize: "28px",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ display: "flex", color: "#666" }}>Proposed by:</div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            {proposal.proposer}
          </a>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", width: "100%" }}>
            <VoteStat
              label="For"
              value={proposal.forVotes}
              total={totalVotes}
              progressColor="#48BB78"
            />
            <VoteStat
              label="Against"
              value={proposal.abstainVotes}
              total={totalVotes}
              progressColor="#F56565"
            />
            <VoteStat
              label="Abstain"
              value={proposal.abstainVotes}
              total={totalVotes}
              progressColor="#718096"
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Threshold</span>
            <span style={{ display: "block", fontWeight: "bold" }}>
              {proposal.quorumVotes} votes
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Ends</span>
            <span style={{ fontWeight: "bold" }}>
              {moment(proposal.expiresAt * 1000).format("MMM D, YYYY")}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Snapshot taken at block</span>
            <span style={{ fontWeight: "bold" }}>
              {proposal.snapshotBlockNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface VoteStatProps {
  label: string;
  value: number;
  total: number;
  progressColor: string;
}

const VoteStat: React.FC<VoteStatProps> = ({
  label,
  value,
  total,
  progressColor,
}) => {
  const percentage = Math.round((100.0 * value) / total);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid lightgray",
        backgroundColor: "#f7fafc",
        padding: "12px",
        borderRadius: "4px",
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          color: progressColor,
          fontWeight: "bold",
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          color: "#2d3748",
          fontWeight: "bold",
          fontSize: "24px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "8px",
          backgroundColor: "#e2e8f0",
          borderRadius: "4px",
          marginTop: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: `${percentage}%`,
            height: "8px",
            backgroundColor: progressColor,
            borderRadius: "4px",
          }}
        ></div>
      </div>
    </div>
  );
};
