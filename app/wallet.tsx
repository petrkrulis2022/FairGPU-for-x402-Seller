"use client";

// Updated to include OnchainKitProvider and additional wallet components.
import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "wagmi/chains";

export default function WalletConnect() {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          name: "FairGPU Marketplace",
          logo: "/globe.svg",
          mode: "auto",
          theme: "default",
        },
        wallet: {
          display: "modal",
          termsUrl: "https://example.com/terms",
          privacyUrl: "https://example.com/privacy",
          supportedWallets: {
            rabby: true,
            trust: true,
            frame: true,
          },
        },
      }}
    >
      <Wallet>
        <ConnectWallet disconnectedLabel="Connect Wallet">
          <WalletDropdown>
            <WalletDropdownBasename />
            {/* Custom Add Funds link to avoid nested <button> hydration error */}
            <a
              href="https://faucet.quicknode.com/base/sepolia"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-blue-600 hover:underline"
              style={{ textAlign: "left" }}
            >
              Add Funds (Base Sepolia Faucet)
            </a>
            <WalletDropdownDisconnect text="Disconnect" />
          </WalletDropdown>
        </ConnectWallet>
      </Wallet>
    </OnchainKitProvider>
  );
}
