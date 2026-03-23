"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import SidebarFilter from "@/components/SidebarFilter";
import {
  FilterState,
  DEFAULT_FILTERS,
  MOCK_PROJECT_CARDS,
  ProjectCard,
} from "@/lib/mockData";

// ── Project Card ───────────────────────────────────────────
function ProjectCardUI({ project }: { project: ProjectCard }) {
  const badgeColors: Record<string, string> = {
    Hot: "#dc2626",
    "New Launch": "#16a34a",
    "Best Seller": "#9333ea",
    Luxury: "#b45309",
  };

  const statusColors: Record<string, { bg: string; text: string }> = {
    "Ready to Move": { bg: "rgba(22,163,74,0.1)", text: "#15803d" },
    "Under Construction": { bg: "rgba(247,147,30,0.1)", text: "#b45309" },
  };

  const sc = statusColors[project.status] ?? { bg: "#f3f4f6", text: "#6b7280" };

  return (
    <div className="card rounded-xl overflow-hidden hover:scale-[1.015] transition-transform duration-200 animate-fade-in-up">
      {/* Color bar top */}
      <div
        className="h-1.5"
        style={{ background: "var(--gradient-primary)" }}
      />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3
              className="font-bold text-base leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary-dark)",
              }}
            >
              {project.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{project.developer}</p>
          </div>
          {project.badge && (
            <span
              className="text-black text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: badgeColors[project.badge] ?? "#6b7280" }}
            >
              {project.badge}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-3">
          <svg
            className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-xs text-gray-500">{project.location}</span>
        </div>

        {/* Price */}
        <p
          className="text-lg font-bold mb-3"
          style={{
            color: "var(--color-secondary)",
            fontFamily: "var(--font-display)",
          }}
        >
          {project.price}
        </p>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { icon: "🏠", label: "Type", val: project.type },
            { icon: "📐", label: "Area", val: project.area },
            { icon: "📅", label: "Possession", val: project.possession },
            { icon: "🔑", label: "Units Left", val: `${project.units} units` },
          ].map((info) => (
            <div
              key={info.label}
              className="px-2.5 py-2 rounded-lg"
              style={{ background: "var(--color-bg)" }}
            >
              <p className="text-gray-400" style={{ fontSize: "10px" }}>
                {info.label}
              </p>
              <p className="text-xs font-semibold text-gray-700 truncate">
                {info.val}
              </p>
            </div>
          ))}
        </div>

        {/* Status + CTA */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: sc.bg, color: sc.text }}
          >
            {project.status}
          </span>
          <button
            className="text-xs font-bold px-3 py-1.5 rounded-lg text-black transition-all hover:scale-105"
            style={{ background: "var(--gradient-btn-blue)" }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Home Page ──────────────────────────────────────────────
export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  // Count active filters
  const activeFilterCount = [
    filters.projectName.length,
    filters.developer.length,
    filters.location.length,
    filters.amenities.length,
    filters.intent.length,
    filters.unitTypes.length,
    filters.developmentStatus ? 1 : 0,
    filters.bestSuited ? 1 : 0,
    filters.possessionDate ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  // Simple client-side filter
  const filteredProjects: ProjectCard[] = useMemo(() => {
    return MOCK_PROJECT_CARDS.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);

      const matchDev =
        filters.developer.length === 0 ||
        filters.developer.some((d) => p.developer.includes(d));

      const matchLoc =
        filters.location.length === 0 ||
        filters.location.some((l) => p.location.includes(l));

      const matchProject =
        filters.projectName.length === 0 ||
        filters.projectName.includes(p.name);

      const matchStatus =
        !filters.developmentStatus ||
        filters.developmentStatus === "both" ||
        (filters.developmentStatus === "under_construction" &&
          p.status === "Under Construction") ||
        (filters.developmentStatus === "ready" && p.status === "Ready to Move");

      return matchSearch && matchDev && matchLoc && matchProject && matchStatus;
    });
  }, [search, filters]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-bg)" }}
    >
      <Header variant="app" />

      {/* Sidebar */}
      <SidebarFilter
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        {/* Welcome banner */}
        <div
          className="px-4 md:px-8 py-5"
          style={{
            background: "var(--gradient-header)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <p className="text-black/70 text-xs mb-0.5">Good day,</p>
            <h2
              className="text-black font-bold text-lg md:text-xl mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {user?.name} 👋
            </h2>

            {/* Search bar */}
            <SearchBar
              value={search}
              onChange={setSearch}
              onFilterClick={() => setSidebarOpen(true)}
              activeFilterCount={activeFilterCount}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="px-4 md:px-8 py-4 border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4 flex-wrap">
              {[
                {
                  label: "Total Projects",
                  value: MOCK_PROJECT_CARDS.length,
                  color: "var(--color-primary)",
                },
                {
                  label: "Showing",
                  value: filteredProjects.length,
                  color: "var(--color-secondary)",
                },
                {
                  label: "Active Filters",
                  value: activeFilterCount,
                  color: "#9333ea",
                },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span
                    className="text-xl font-bold"
                    style={{
                      color: stat.color,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Project cards grid */}
        <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3
                className="text-lg font-bold text-gray-500 mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                No projects found
              </h3>
              <p className="text-sm text-gray-400">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setFilters(DEFAULT_FILTERS);
                  setSearch("");
                }}
                className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold text-black"
                style={{ background: "var(--gradient-btn-blue)" }}
              >
                Reset All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
              {filteredProjects.map((project) => (
                <ProjectCardUI key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
