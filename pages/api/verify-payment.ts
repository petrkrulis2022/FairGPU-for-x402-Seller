import { NextApiRequest, NextApiResponse } from "next";
import { verifyBaseSepoliaTx } from "../../services/verifyBaseSepoliaTx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const { txHash } = req.query;
    if (!txHash || typeof txHash !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Missing or invalid txHash" });
    }

    const sellerAddress = process.env.NEXT_PUBLIC_SELLER_WALLET_ADDRESS;
    if (!sellerAddress) {
      return res
        .status(500)
        .json({ success: false, message: "Seller address not configured" });
    }

    // Set the minimum payment amount in ETH (adjust as needed)
    const minAmountEth = "0.001";

    const result = await verifyBaseSepoliaTx({
      txHash,
      sellerAddress,
      minAmountEth,
    });

    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(402)
        .json({
          success: false,
          message: result.message || "Payment required",
        });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
