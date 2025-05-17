"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "../../../components/Header";
import agents from "../../../components/agents";

interface Agent {
  id: string;
  name: string;
  creator: string;
  category: string;
  rating: number;
  price: number | null;
  capabilities: string[];
  description: string;
  image: string;
}

interface AnalysisResult {
  analysis: string;
  resourceUsage: {
    cpuUnits: number;
    gpuUnits: number;
  };
}

export default function AgentDetail() {
  const params = useParams() as { id: string };
  const { id } = params;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [analysisType, setAnalysisType] = useState("all");
  const [coins, setCoins] = useState("BTC,ETH,SOL");
  const [timeframe, setTimeframe] = useState("7d");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      console.error("No ID provided in the URL.");
      setError("Invalid agent ID.");
      setLoading(false);
      return;
    }

    async function loadAgent() {
      try {
        console.log("Loading agent with ID:", id);
        const agentData = agents.find((a) => a.id === id);
        if (!agentData) {
          console.error(`Agent with ID ${id} not found.`);
          throw new Error("Agent not found");
        }
        setAgent(agentData);
      } catch (error) {
        console.error("Error loading agent:", error);
        setError("Failed to load agent details");
      } finally {
        setLoading(false);
      }
    }

    loadAgent();
  }, [id]);

  const handleRequestAnalysis = async () => {
    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      // Simulate analysis request
      const response: AnalysisResult = {
        analysis: "<p>Analysis completed successfully.</p>",
        resourceUsage: { cpuUnits: 10, gpuUnits: 5 },
      };
      setResult(response);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error requesting analysis:", error);
        setError(error.message);
      } else {
        console.error("Unknown error requesting analysis:", error);
        setError("Failed to request analysis");
      }
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Agent Not Found</h1>
            <p>The requested agent could not be found.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{agent.name}</h1>
          <div className="flex items-center mb-6">
            <span className="text-gray-400 mr-4">By: {agent.creator}</span>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{agent.rating}</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Request Analysis</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">
                  Analysis Type
                </label>
                <select
                  value={analysisType}
                  onChange={(e) => setAnalysisType(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Analysis Types</option>
                  <option value="technical">Technical Analysis Only</option>
                  <option value="fundamental">Fundamental Analysis Only</option>
                  <option value="sentiment">Sentiment Analysis Only</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Cryptocurrencies (comma-separated)
                </label>
                <input
                  type="text"
                  value={coins}
                  onChange={(e) => setCoins(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="BTC, ETH, SOL"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Timeframe</label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleRequestAnalysis}
                  disabled={processing}
                  className={`w-full py-3 rounded-lg font-medium ${
                    processing
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {processing
                    ? "Processing..."
                    : `Request Analysis (${agent.price} USDC)`}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-8">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: result.analysis }} />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h3 className="text-lg font-medium mb-2">Resource Usage</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded p-3">
                    <p className="text-gray-400 text-sm">CPU Usage</p>
                    <p className="text-xl font-medium">
                      {result.resourceUsage.cpuUnits.toFixed(2)} units
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded p-3">
                    <p className="text-gray-400 text-sm">GPU Usage</p>
                    <p className="text-xl font-medium">
                      {result.resourceUsage.gpuUnits.toFixed(2)} units
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
