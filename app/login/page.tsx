"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const success = login(email, password);
    setLoading(false);

    if (success) {
      router.push("/home");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="bg-main min-h-screen flex flex-col items-center justify-center px-4">
      

      {/* 🔥 GLASS LOGIN CARD */}
      <div className="w-full max-w-md glass-card p-6 md:p-8  shadow-2xl">
        {/* 🔥 TITLE */}
      <div className="text-center mb-6 max-w-md">
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 leading-snug">
          A controlled network where serious Channel Partners drive real project
          sales.
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          *Access is limited to verified Channel Partners
        </p>
      </div>
        {/* LOGO */}
        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="Logo"
            width={220}
            height={80}
            className="mx-auto"
          />
        </div>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/70 border border-black/40 outline-none"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/70 border border-black/40 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-3 text-sm text-gray-600"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-white bg-orange-500 hover:bg-orange-600 transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* SIGNUP */}
        <p className="text-sm mt-5 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>

      {/* 🔥 BOTTOM BUTTONS */}
      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => window.open("/channelpartner.pdf", "_blank")}
          className="px-5 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200"
        >
          Benefits for Channel Partner
        </button>

        <button
          onClick={() => window.open("/forDevelopers.pdf", "_blank")}
          className="px-5 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200"
        >
          Advantages for Developers
        </button>
      </div>
    </div>
  );
}
