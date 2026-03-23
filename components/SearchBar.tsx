"use client";

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onFilterClick: () => void;
  activeFilterCount?: number;
}

export default function SearchBar({
  value,
  onChange,
  onFilterClick,
  activeFilterCount = 0,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 w-full max-w-3xl mx-auto">
      {/* Search input */}
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5"
            style={{ color: "var(--color-primary)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search projects, developers, locations..."
          className="input-field pl-10 pr-4 py-3 text-sm rounded-xl w-full"
          style={{ boxShadow: "var(--shadow-card)" }}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* Filter button */}
      <button
        onClick={onFilterClick}
        className="relative flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all"
        style={{
          background: activeFilterCount > 0 ? "var(--gradient-btn-orange)" : "var(--gradient-btn-blue)",
          color: "white",
          boxShadow: activeFilterCount > 0 ? "0 2px 12px rgba(247,147,30,0.35)" : "0 2px 12px rgba(13,79,139,0.3)",
          whiteSpace: "nowrap",
        }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4h18M7 9h10M10 14h4M12 19h0"
          />
        </svg>
        <span className="hidden sm:inline">Filters</span>
        {activeFilterCount > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center border-2 border-white"
            style={{ background: "var(--color-secondary-dark)", color: "white" }}
          >
            {activeFilterCount}
          </span>
        )}
      </button>
    </div>
  );
}