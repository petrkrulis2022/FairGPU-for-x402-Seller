import { createClient } from "@coinbase/x402-axios";

// x402 client
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
}) {
  try {
    // Construct API endpoint with query parameters
    const endpoint = `/api/analysis?agentId=${agentId}&analysisType=${analysisType}&coins=${coins.join(
      ","
    )}&timeframe=${timeframe}`;

    // Make request with x402 client (this will handle the payment flow)
    const response = await x402Client.get(endpoint);

    return response.data;
  } catch (error) {
    console.error("Error requesting analysis:", error);

    // Handle x402 payment required error
    if (error.response?.status === 402) {
      const paymentDetails = error.response.headers["x-payment-details"];
      throw new Error(`Payment required: ${paymentDetails}`);
    }

    throw error;
  }
}
