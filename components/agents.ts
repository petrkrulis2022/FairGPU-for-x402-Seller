export interface Agent {
  id: string;
  name: string;
  creator: string;
  category: string;
  rating: number;
  price: number; // Ensuring price is always a number
  capabilities: string[];
  description?: string;
  image?: string;
}

const agents: Agent[] = [
  {
    id: "1",
    name: "x402 Market AI (Official)",
    creator: "FairGPU Team",
    category: "Market Analysis",
    rating: 4.9,
    price: 2.5,
    capabilities: ["technical", "fundamental", "sentiment"],
    description:
      "Advanced AI agent for technical, fundamental, and sentiment market analysis. Powered by FairGPU.",
    image: "/globe.svg",
  },
  {
    id: "2",
    name: "AlphaBot (Preview)",
    creator: "Alpha Labs",
    category: "Technical Analysis",
    rating: 4.2,
    price: 0, // Updated to ensure price is always a number
    capabilities: ["technical"],
    description: "Performs technical analysis on crypto markets.",
    image: "/file.svg",
  },
  {
    id: "3",
    name: "SentimentX (Preview)",
    creator: "SentimentX",
    category: "Sentiment Analysis",
    rating: 4.0,
    price: 0, // Updated to ensure price is always a number
    capabilities: ["sentiment"],
    description: "Analyzes social sentiment for trending tokens.",
    image: "/window.svg",
  },
  {
    id: "4",
    name: "FundamentalPro (Preview)",
    creator: "FundamentalPro",
    category: "Fundamental Analysis",
    rating: 4.1,
    price: 0, // Updated to ensure price is always a number
    capabilities: ["fundamental"],
    description: "Provides fundamental analysis for DeFi projects.",
    image: "/next.svg",
  },
  // Added a new agent with ID 'crypto-oracle'.
  {
    id: "crypto-oracle",
    name: "Crypto Oracle",
    creator: "Oracle AI Labs",
    category: "Comprehensive Analysis",
    rating: 4.8,
    price: 3.0,
    capabilities: ["technical", "fundamental", "sentiment"],
    description:
      "An advanced AI agent providing comprehensive market analysis with real-time insights.",
    image: "/globe.svg",
  },
];

export default agents;
