import React, { useState } from "react";
import axios from "axios";

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    creator: string;
    category: string;
    rating: number;
    price: number;
    capabilities: string[];
  };
  isReal: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isReal }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleAction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/action", { agentId: agent.id });
      setResult(response.data.message);
    } catch {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg border ${
        isReal
          ? "border-green-500"
          : "border-gray-700 hover:border-blue-500 transition-all"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-white">{agent.rating}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-2">By: {agent.creator}</p>
        <div className="mb-3">
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
            {agent.category}
          </span>
        </div>
        <div className="space-y-2 mb-4">
          {agent.capabilities.includes("technical") && (
            <div className="flex items-center text-sm">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-gray-300">Technical Analysis</span>
            </div>
          )}
          {agent.capabilities.includes("fundamental") && (
            <div className="flex items-center text-sm">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span className="text-gray-300">Fundamental Analysis</span>
            </div>
          )}
          {agent.capabilities.includes("sentiment") && (
            <div className="flex items-center text-sm">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              <span className="text-gray-300">Sentiment Analysis</span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-white font-medium">
            {agent.price ? `${agent.price} USDC` : "Free"}
          </div>
          <button
            onClick={handleAction}
            disabled={loading}
            className={`px-4 py-2 rounded text-sm font-medium ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Loading..." : "Perform Action"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {result && (
          <div className="mt-4 p-4 bg-gray-700 rounded">
            <h4 className="text-white font-bold mb-2">Analysis Result:</h4>
            <div
              className="text-gray-300 text-sm"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </div>
        )}
        {isReal && <span className="text-green-500 font-bold">Real Agent</span>}
      </div>
    </div>
  );
};

export default AgentCard;
