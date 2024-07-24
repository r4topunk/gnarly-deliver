import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { SubGraphProposal } from "@/types";
import useEnsDetails from "@/hooks/useEnsDetails";
import useMemoizedNnsName from "@/hooks/useNNS";
interface CustomLabelProps {
    x: number;
    y: number;
    name: string;
    value: number;
    avatar?: string;
}

const CustomLabel: React.FC<CustomLabelProps> = ({ x, y, name, value, avatar }) => {
    return (
        <g transform={`translate(${x},${y})`} textAnchor="middle">
            {avatar && (
                <image
                    href={avatar}
                    x={-15}
                    y={-40}
                    width={30}
                    height={30}
                    style={{ borderRadius: '50%' }}
                />
            )}
            <text x={0} y={0} dy={20} fontSize={12} fill="#000">
                {name}: {value}
            </text>
        </g>
    );
};
interface InsightsProps {
    votes: SubGraphProposal["votes"];
}

const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#0088FE", "#FF4444", "#AA00FF"]; // Additional colors for more voters

function Insights({ votes }: InsightsProps) {
    // Prepare data for the pie chart of voter weights
    const pieDataVoters = votes.map((vote, index) => {
        const { ensName, ensAvatar } = useEnsDetails(vote.voter as `0x${string}`);
        const voterName = ensName || useMemoizedNnsName(vote.voter as `0x${string}`);

        useEffect(() => {
            console.log(ensAvatar);
        }
            , [ensAvatar]);

        return {
            name: voterName,
            value: vote.weight,
            avatar: ensAvatar || 'https://example.com/default-avatar.png', // Provide a default avatar URL if none is available
        };
    });



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
                        label={({ x, y, name, value, payload }) => (
                            <CustomLabel
                                x={x}
                                y={y}
                                name={name}
                                value={value}
                                avatar={payload.avatar}
                            />
                        )}
                    >
                        {pieDataVoters.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
            <Legend color="black" />
        </div>
    );
}

export default Insights;
