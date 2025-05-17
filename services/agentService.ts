import { Agent } from "../components/agents";

const agentsData = [
  {
    id: "crypto-oracle",
    name: "Crypto Oracle",
    creator: "FairGPU",
    category: "Finance",
    capabilities: ["technical", "fundamental", "sentiment"],
    rating: 4.9,
    price: 50,
    isReal: true,
  },
  {
    id: "tech-analyst-pro",
    name: "Tech Analyst Pro",
    creator: "AnalystAI",
    category: "Finance",
    capabilities: ["technical"],
    rating: 4.2,
    price: 30,
  },
  {
    id: "fundamental-master",
    name: "Fundamental Master",
    creator: "CryptoInsights",
    category: "Finance",
    capabilities: ["fundamental"],
    rating: 4.5,
    price: 35,
  },
  // Add more fake agents here to reach 16 total
];

export async function getAgents(): Promise<Agent[]> {
  return agentsData as Agent[];
}

export async function getAgentById(id: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const agent = agentsData.find((a) => a.id === id);
      if (agent) {
        resolve(agent);
      } else {
        reject(new Error("Agent not found"));
      }
    }, 300);
  });
}
