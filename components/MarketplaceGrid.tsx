"use client";

import AgentCard from "./AgentCard";

interface Agent {
  id: string;
  name: string;
  creator: string;
  category: string;
  rating: number;
  price: number;
  capabilities: string[];
}

export default function MarketplaceGrid({ agents }: { agents: Agent[] }) {
  const realAgentIndex = agents.findIndex(
    (agent) =>
      agent.capabilities.includes("technical") &&
      agent.capabilities.includes("fundamental") &&
      agent.capabilities.includes("sentiment")
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {agents.map((agent, index) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          isReal={index === realAgentIndex}
        />
      ))}
    </div>
  );
}
