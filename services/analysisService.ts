import { createClient } from "@coinbase/x402-axios";

const x402Client = createClient({
  facilitator:
    process.env.NEXT_PUBLIC_X402_FACILITATOR_URL ||
    "https://x402.org/facilitator",
});

export async function requestAnalysis({
  agentId,
  analysisType,
  coins,
  timeframe,
}: {
  agentId: string;
  analysisType: string;
  coins: string[];
  timeframe: string;
}) {
  try {
    const endpoint = `/api/analysis?agentId=${agentId}&analysisType=${analysisType}&coins=${coins.join(
      ","
    )}&timeframe=${timeframe}`;

    const response = await x402Client.get(endpoint);

    return response.data;
  } catch (error: any) {
    console.error("Error requesting analysis:", error);

    if (error.response?.status === 402) {
      const paymentDetails = error.response.headers["x-payment-details"];
      throw new Error(`Payment required: ${paymentDetails}`);
    }

    throw error;
  }
}
