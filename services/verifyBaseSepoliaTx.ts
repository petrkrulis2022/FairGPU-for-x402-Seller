import { ethers } from "ethers";

const BASE_SEPOLIA_RPC = "https://sepolia.base.org";

export async function verifyBaseSepoliaTx({
  txHash,
  sellerAddress,
  minAmountEth,
}: {
  txHash: string;
  sellerAddress: string;
  minAmountEth: string;
}): Promise<{ success: boolean; message?: string }> {
  try {
    const provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC);
    const tx = await provider.getTransaction(txHash);
    if (!tx) {
      return { success: false, message: "Transaction not found" };
    }
    if (tx.to?.toLowerCase() !== sellerAddress.toLowerCase()) {
      return { success: false, message: "Transaction not sent to seller" };
    }
    const valueEth = ethers.formatEther(tx.value);
    if (parseFloat(valueEth) < parseFloat(minAmountEth)) {
      return { success: false, message: "Insufficient payment amount" };
    }
    // Optionally, check if transaction is confirmed
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt || receipt.confirmations < 1) {
      return { success: false, message: "Transaction not confirmed" };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
