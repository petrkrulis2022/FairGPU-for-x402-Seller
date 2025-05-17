import Header from "../../components/Header";
import MarketplaceGrid from "../../components/MarketplaceGrid";
import { getAgents } from "../../services/agentService";

export default async function MarketplacePage() {
  const agents = await getAgents();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Marketplace</h1>
        <MarketplaceGrid agents={agents} />
      </main>
    </div>
  );
}
