import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { SubGraphProposal } from "@/types";

interface InsightsProps {
    votes: SubGraphProposal["votes"];
}

const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#0088FE", "#FF4444", "#AA00FF"]; // Additional colors for more voters

function Insights({ votes }: InsightsProps) {
    // Prepare data for the pie chart of voter weights
    const pieDataVoters = votes.map((vote, index) => ({
        name: vote.voter,
        value: vote.weight
    }));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart width={600} height={400}>
                    <Pie
                        data={pieDataVoters}
                        cx={300}
                        cy={200}
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                    >
                        {pieDataVoters.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>

        </div>
    );
}

export default Insights;
