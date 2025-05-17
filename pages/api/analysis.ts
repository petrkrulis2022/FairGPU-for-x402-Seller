import { paymentMiddleware } from "x402-express";
import { createFacilitatorConfig } from "@coinbase/x402";
import type { NextApiRequest, NextApiResponse } from "next";

// Mock resource calculation function
function calculateResourceUsage(
  analysisType: string,
  coins: string[],
  timeframe: string
) {
  // Base values
  let cpuUnits = 0.5;
  let gpuUnits = 1.0;

  // Adjust based on analysis type
  if (analysisType === "all") {
    cpuUnits *= 3;
    gpuUnits *= 3;
  } else if (analysisType === "technical") {
    cpuUnits *= 1.5;
    gpuUnits *= 2;
  } else if (analysisType === "fundamental") {
    cpuUnits *= 2;
    gpuUnits *= 1.5;
  } else if (analysisType === "sentiment") {
    cpuUnits *= 1.2;
    gpuUnits *= 1.8;
  }

  // Adjust based on number of coins
  const coinCount = coins.length;
  cpuUnits *= 1 + (coinCount - 1) * 0.2;
  gpuUnits *= 1 + (coinCount - 1) * 0.3;

  // Adjust based on timeframe
  if (timeframe === "30d") {
    cpuUnits *= 1.5;
    gpuUnits *= 1.5;
  } else if (timeframe === "7d") {
    cpuUnits *= 1.2;
    gpuUnits *= 1.2;
  }

  return {
    cpuUnits,
    gpuUnits,
    totalTokens: Math.floor(cpuUnits * 1000),
    reasoningSteps: Math.floor(gpuUnits * 10),
    estimatedExecutionTime: cpuUnits * 5 + gpuUnits * 10,
  };
}

// Mock analysis generation
function generateAnalysis(
  analysisType: string,
  coins: string[],
  timeframe: string
) {
  let analysis = "";

  if (analysisType === "all" || analysisType === "technical") {
    analysis += `<h3>Technical Analysis (${timeframe})</h3>`;
    coins.forEach((coin) => {
      analysis += `<h4>${coin} Technical Outlook</h4>`;
      analysis += `<p>The ${coin} price is showing ${
        Math.random() > 0.5 ? "bullish" : "bearish"
      } momentum on the ${timeframe} timeframe. Key resistance levels are at $${(
        Math.random() * 10000
      ).toFixed(2)} and $${(Math.random() * 20000).toFixed(2)}.</p>`;
    });
  }

  if (analysisType === "all" || analysisType === "fundamental") {
    analysis += `<h3>Fundamental Analysis (${timeframe})</h3>`;
    coins.forEach((coin) => {
      analysis += `<h4>${coin} Fundamentals</h4>`;
      analysis += `<p>Development activity for ${coin} has ${
        Math.random() > 0.5 ? "increased" : "decreased"
      } by ${(Math.random() * 30).toFixed(
        1
      )}% over the ${timeframe} period. On-chain metrics show ${
        Math.random() > 0.5 ? "accumulation" : "distribution"
      } patterns.</p>`;
    });
  }

  if (analysisType === "all" || analysisType === "sentiment") {
    analysis += `<h3>Sentiment Analysis (${timeframe})</h3>`;
    coins.forEach((coin) => {
      analysis += `<h4>${coin} Market Sentiment</h4>`;
      analysis += `<p>Social media sentiment for ${coin} is predominantly ${
        Math.random() > 0.5 ? "positive" : "negative"
      } with a sentiment score of ${(Math.random() * 100).toFixed(
        1
      )}. News coverage has been ${
        Math.random() > 0.7
          ? "highly positive"
          : Math.random() > 0.4
          ? "neutral"
          : "concerning"
      }.</p>`;
    });
  }

  return analysis;
}

// Configure facilitator
const facilitatorConfig = createFacilitatorConfig(
  process.env.CDP_API_KEY_ID || "your-cdp-api-key-id",
  process.env.CDP_API_KEY_SECRET || "your-cdp-api-key-secret"
);

// Add debugging logs to inspect middleware configuration and request handling
console.log("Facilitator Config:", facilitatorConfig);
console.log(
  "Seller Wallet Address:",
  process.env.NEXT_PUBLIC_SELLER_WALLET_ADDRESS
);

// Wrap the middleware and handler function with additional logging
export default paymentMiddleware(
  (process.env.NEXT_PUBLIC_SELLER_WALLET_ADDRESS as `0x${string}`) ||
    "0xYourAddress",
  {
    "/api/analysis": {
      price: async (req: NextApiRequest) => {
        console.log("Request Query:", req.query);
        const {
          analysisType = "all",
          coins = "BTC",
          timeframe = "7d",
        } = req.query as {
          analysisType?: string;
          coins?: string;
          timeframe?: string;
        };

        const coinList = typeof coins === "string" ? coins.split(",") : [];

        let basePrice = 50;
        if (analysisType !== "all") basePrice = 20;
        basePrice += (coinList.length - 1) * 5;
        if (timeframe === "30d") basePrice *= 1.2;
        else if (timeframe === "24h") basePrice *= 0.8;

        console.log("Calculated Price:", basePrice);
        return { amount: basePrice.toFixed(2), currency: "USDC" }; // Return as an object
      },
    },
  },
  facilitatorConfig
)(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("Handling Request:", req.query);
    const {
      analysisType = "all",
      coins = "BTC",
      timeframe = "7d",
    } = req.query as {
      analysisType?: string;
      coins?: string;
      timeframe?: string;
    };

    const coinList = typeof coins === "string" ? coins.split(",") : [];

    const analysis = generateAnalysis(
      analysisType as string,
      coinList,
      timeframe as string
    );

    const resourceUsage = calculateResourceUsage(
      analysisType as string,
      coinList,
      timeframe as string
    );

    console.log("Generated Analysis:", analysis);
    return res.status(200).json({
      analysis,
      metadata: {
        analysisType,
        coins: coinList,
        timeframe,
        generatedAt: new Date().toISOString(),
      },
      resourceUsage,
    });
  } catch (error) {
    console.error("Error generating analysis:", error);
    return res.status(500).json({ error: "Failed to generate analysis" });
  }
});
