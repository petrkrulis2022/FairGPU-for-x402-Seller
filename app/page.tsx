"use client";

import React from "react";
import Header from "../components/Header";
import Link from "next/link";

export default function Home() {
  const agents = [
    {
      name: "Market Analytic Pro",
      description: "Advanced market analysis and insights agent.",
      rating: 4.9,
      enabled: true,
      id: "market-analytic-pro",
    },
    {
      name: "Trend Seeker",
      description: "Finds and analyzes market trends.",
      rating: 4.7,
      enabled: true,
      id: "trend-seeker",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">FairGPU for x402</h1>
          <p className="text-xl mb-8">
            Access AI-powered market analysis with fair, transparent pricing
            based on actual GPU usage.
          </p>
          <Link
            href="/marketplace"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-lg"
          >
            Explore Marketplace
          </Link>
        </div>
        <div>
          <h1>Welcome to the Marketplace</h1>
          {agents.map((agent) => (
            <div key={agent.id}>
              <h2>{agent.name}</h2>
              <p>{agent.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
