import { paymentMiddleware } from "x402-next";

const sellerWalletAddress = process.env.NEXT_PUBLIC_SELLER_WALLET_ADDRESS;
if (!sellerWalletAddress || !/^0x[a-fA-F0-9]{40}$/.test(sellerWalletAddress)) {
  throw new Error("Invalid seller wallet address: " + sellerWalletAddress);
}

console.log("Validated seller wallet address:", sellerWalletAddress);

console.log("Middleware initialized with:", {
  sellerWalletAddress: process.env
    .NEXT_PUBLIC_SELLER_WALLET_ADDRESS as `0x${string}`,
  facilitatorUrl: "https://x402.org/facilitator",
  price: "$5.00",
  network: "base-sepolia",
});

export const middleware = paymentMiddleware(
  process.env.NEXT_PUBLIC_SELLER_WALLET_ADDRESS as `0x${string}`,
  {
    "/seller/protected": {
      price: "$1.00", // Updated the fee to 1 USDC
      network: "base-sepolia",
      config: {
        description: "Access to protected content",
      },
    },
  },
  {
    url: "https://x402.org/facilitator",
  }
);

console.log("Middleware configured for protected route.");

// Add debugging logs for requests
export const config = {
  matcher: ["/seller/protected/:path*"],
};

console.log("Request received for protected route.");

// Debugging payment details
console.log("Payment details initialized:", {
  sellerWalletAddress: process.env.NEXT_PUBLIC_SELLER_WALLET_ADDRESS,
  price: "$5.00",
  network: "base-sepolia",
});
