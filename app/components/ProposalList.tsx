'use client'
import React from "react";
import ProposalItem from "./ProposalItem";
import { Proposal } from "../types";

type ProposalListProps = {
    proposals: Proposal[];
    onProposalClick: (proposal: Proposal) => void;
};

const ProposalList: React.FC<ProposalListProps> = ({ proposals, onProposalClick }) => {
    return (
        <ul style={{ listStyleType: "none", padding: 0 }}>
            {proposals.map((proposal) => (
                <ProposalItem
                    key={proposal.proposalId}
                    proposal={proposal}
                    onClick={() => onProposalClick(proposal)}
                />
            ))}
        </ul>
    );
};

export default ProposalList;
