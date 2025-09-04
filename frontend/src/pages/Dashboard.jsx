import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { state } = useLocation();
  const { chainInfo, username } = state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Welcome */}
        <h2 className="text-3xl font-extrabold text-blue-400 mb-4">
          Welcome, <span className="text-blue-300">{username}</span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 mb-4">
          Below is your current Hyperledger ledger information. Each entry represents a secure record 
          stored on the blockchain, including your registration and authentication events. This ensures 
          transparency, immutability, and the security of your data.
        </p>

        <p className="text-gray-400 mb-6">
          <strong>Note:</strong> Ledger data is read-only. Any updates to your registration or login 
          are automatically recorded in the blockchain to maintain integrity.
        </p>

        {/* Ledger Info */}
        <h3 className="text-xl font-semibold text-blue-300 mb-4">Ledger Info:</h3>
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-6 overflow-x-auto border border-blue-500">
          <pre className="font-mono text-blue-200">
            {chainInfo ? JSON.stringify(chainInfo, null, 2) : "No data available"}
          </pre>
        </div>
      </div>
    </div>
  );
}
