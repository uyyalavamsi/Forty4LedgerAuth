import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setMessage("Logging in...");
    try {
      const res = await axios.post("http://localhost:8080/login", { username });
      setMessage(res.data.message);
      navigate("/dashboard", { state: { chainInfo: res.data.chainInfo, username } });
    } catch (err) {
      setMessage(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Login Form */}
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-500">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-400 tracking-wider">
            USER LOGIN
          </h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            LOGIN
          </button>

          {message && (
            <p className="mt-4 text-center text-gray-300">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
