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
  {
    id: "sentiment-guru",
    name: "Sentiment Guru",
    creator: "MarketMinds",
    category: "Finance",
    capabilities: ["sentiment"],
    rating: 4.7,
    price: 40,
  },
  {
    id: "crypto-wizard",
    name: "Crypto Wizard",
    creator: "WizardAI",
    category: "Finance",
    capabilities: ["technical", "fundamental"],
    rating: 4.6,
    price: 45,
  },
  {
    id: "market-seer",
    name: "Market Seer",
    creator: "SeerTech",
    category: "Finance",
    capabilities: ["technical", "sentiment"],
    rating: 4.3,
    price: 38,
  },
  {
    id: "finance-genius",
    name: "Finance Genius",
    creator: "GeniusAI",
    category: "Finance",
    capabilities: ["fundamental", "sentiment"],
    rating: 4.8,
    price: 50,
  },
  {
    id: "crypto-sage",
    name: "Crypto Sage",
    creator: "SageAI",
    category: "Finance",
    capabilities: ["technical"],
    rating: 4.4,
    price: 32,
  },
  {
    id: "market-watcher",
    name: "Market Watcher",
    creator: "WatcherAI",
    category: "Finance",
    capabilities: ["sentiment"],
    rating: 4.1,
    price: 28,
  },
  {
    id: "investment-guru",
    name: "Investment Guru",
    creator: "GuruAI",
    category: "Finance",
    capabilities: ["fundamental"],
    rating: 4.5,
    price: 36,
  },
  {
    id: "crypto-analyst",
    name: "Crypto Analyst",
    creator: "AnalystHub",
    category: "Finance",
    capabilities: ["technical", "sentiment"],
    rating: 4.2,
    price: 33,
  },
  {
    id: "market-insights",
    name: "Market Insights",
    creator: "InsightsAI",
    category: "Finance",
    capabilities: ["fundamental", "sentiment"],
    rating: 4.6,
    price: 42,
  },
  {
    id: "crypto-visionary",
    name: "Crypto Visionary",
    creator: "VisionaryAI",
    category: "Finance",
    capabilities: ["technical", "fundamental"],
    rating: 4.7,
    price: 48,
  },
  {
    id: "market-predictor",
    name: "Market Predictor",
    creator: "PredictorAI",
    category: "Finance",
    capabilities: ["sentiment"],
    rating: 4.3,
    price: 37,
  },
  {
    id: "crypto-mastermind",
    name: "Crypto Mastermind",
    creator: "MastermindAI",
    category: "Finance",
    capabilities: ["technical", "fundamental", "sentiment"],
    rating: 4.9,
    price: 55,
  },
];

export async function getAgents() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(agentsData);
    }, 500);
  });
}

export async function getAgentById(id) {
  // Simulate API call
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
