import { useState } from "react";
import Link from "next/link";

export default function AgentCard({ agent, isReal = false }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500 transition-all">
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
          <Link
            href={isReal ? `/agent/${agent.id}` : "#"}
            className={`px-4 py-2 rounded text-sm font-medium ${
              isReal
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            onClick={(e) => !isReal && e.preventDefault()}
          >
            {isReal ? "Use Agent" : "Coming Soon"}
          </Link>
        </div>
      </div>
    </div>
  );
}
