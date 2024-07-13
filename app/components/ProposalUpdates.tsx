"use client";

import { todo } from "node:test";
import { createClient } from "../utils/supabase/client";
import { useState } from "react";
import { Proposal } from "../types";

interface Update {
    id: number;
    title: string;
    comment_body: string;
    author: string;
}

interface ProposalUpdatesProps {
    proposal: Proposal;
}

function ProposalUpdates({ proposal }: ProposalUpdatesProps) {
    const [updates, setupdates] = useState<Update[]>([]);
    const supabase = createClient();

    console.log(proposal);
    const handleClick = async () => {
        try {
            const { data: updates } = await supabase.from("updates").select().eq("proposal_id", proposal.proposalId);
            console.log(updates)
            setupdates(updates as Update[]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <button
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={handleClick}
            >
                Fetch
            </button>
            <ul>
                {updates && updates.length > 0
                    ? updates.map((update) => (
                        <li key={update.id}>
                            {update.author} - {update.comment_body}
                        </li>
                    ))
                    : null}
            </ul>
        </div>
    );
}

export default ProposalUpdates;