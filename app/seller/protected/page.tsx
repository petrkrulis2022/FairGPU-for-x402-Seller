"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const router = useRouter();

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWallet(accounts[0]);
    } else {
      alert("Please install MetaMask or another Ethereum wallet.");
    }
  };

  // Send payment
  const payNow = async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      const { ethers } = await import("ethers");
      const sellerAddress = "0x6ef27E391c7eac228c26300aA92187382cc7fF8a";
      const priceInEth = "0.001";
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: sellerAddress,
        value: ethers.parseEther(priceInEth),
      });
      setTxHash(tx.hash);
      await tx.wait();
      // Call backend to verify payment
      const res = await fetch(`/api/verify-payment?txHash=${tx.hash}`);
      const result = await res.json();
      setPaymentVerified(result.success);
      if (result.success) {
        // Redirect to mocked paid content page
        router.push("/seller/protected/mocked-content");
      }
    } catch (err) {
      alert("Payment failed: " + (err as any).message);
    }
    setLoading(false);
  };

  if (!wallet) {
    return (
      <div className="container mx-auto text-center py-10">
        <h1 className="text-4xl font-bold mb-4">Connect Wallet</h1>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  if (!paymentVerified) {
    return (
      <div className="container mx-auto text-center py-10">
        <h1 className="text-4xl font-bold mb-4">Pay to Access</h1>
        <p className="mb-4">Send 0.001 ETH to access this content.</p>
        <button
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={payNow}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {txHash && <p className="mt-4">Transaction Hash: {txHash}</p>}
      </div>
    );
  }

  // This should not be reached, as redirect happens on paymentVerified
  return null;
}
