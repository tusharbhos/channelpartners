"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  variant?: "landing" | "app";
}

export default function Header({ variant = "landing" }: HeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header
      style={{
        background: "var(--gradient-header)",
        height: "var(--header-height)",
        boxShadow: "0 2px 16px rgba(13,79,139,0.25)",
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 md:px-8"
    >
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2 flex-shrink-0">
        <div className="relative h-10 w-44 md:w-52">
          <Image
            src="/logo.png"
            alt="ChannelPartner.Network"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </Link>

      <div className="flex-1" />

      {/* Right side */}
      {variant === "landing" && (
        <nav className="flex items-center gap-2 md:gap-3">
          <Link href="/login">
            <button className="btn-outline text-sm">Login</button>
          </Link>
          <Link href="/signup">
            <button className="btn-secondary text-sm">Sign Up</button>
          </Link>
        </nav>
      )}

      {variant === "app" && user && (
        <div className="flex items-center gap-3" ref={dropRef}>
          {/* User avatar + name */}
          <button
            onClick={() => setDropOpen((p) => !p)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:bg-white/10"
            aria-label="User menu"
          >
            {/* Avatar circle */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: "var(--color-secondary)", color: "white" }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-white font-semibold text-sm hidden sm:inline max-w-[140px] truncate">
              {user.name}
            </span>
            {/* Chevron */}
            <svg
              className={`w-4 h-4 text-white/80 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {dropOpen && (
            <div
              className="absolute right-4 md:right-8 top-[68px] w-56 rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-scale-in"
              style={{ background: "white" }}
            >
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs text-gray-400 font-medium">
                  Signed in as
                </p>
                <p className="text-sm font-bold text-gray-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              {/* Menu items */}
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2"
                  onClick={() => setDropOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  My Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2"
                  onClick={() => setDropOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </button>
              </div>
              <div className="border-t border-gray-100 py-1">
                <button
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
