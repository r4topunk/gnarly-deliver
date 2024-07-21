export type Proposal = {
    proposalId: string;
    title: string;
    proposer: string;
    status: string;
    description: string;
    forVotes: number;
    againstVotes: number;
    proposalNumber: number;
    abstainVotes: number;
    quorumVotes: number;
    expiresAt: number;
    snapshotBlockNumber: number;
    transactionHash: string;
};

export interface Update {
    id: number;
    author: string;
    comment_body: string;
    created_at: string;
    likes: number;
    proposal_id: string;
  }