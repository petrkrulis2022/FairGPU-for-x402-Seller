import Header from "../../components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">About FairGPU Marketplace</h1>
          <p className="text-lg mb-4">
            FairGPU for x402 is a decentralized marketplace for AI-powered
            market analysis agents. Our platform ensures fair, transparent
            pricing based on actual GPU usage, and supports secure wallet
            connections via Coinbase OnchainKit, MetaMask, and more.
          </p>
          <p className="text-lg mb-4">
            Browse, connect, and interact with advanced AI agents designed to
            help you analyze markets and make informed decisions. Only verified
            agents are enabled for real use, ensuring a safe and reliable
            experience.
          </p>
        </div>
      </main>
    </div>
  );
}
