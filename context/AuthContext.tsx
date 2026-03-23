"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  company: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user store – swap with API later
const MOCK_USERS: (User & { password: string })[] = [
  {
    name: "Rahul Sharma",
    email: "rahul@example.com",
    password: "password123",
    company: "Sharma Realty",
  },
  {
    name: "Demo User",
    email: "demo@channelpartner.network",
    password: "demo123",
    company: "Demo Corp",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser({ name: found.name, email: found.email, company: found.company });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}