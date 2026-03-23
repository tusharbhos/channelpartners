import React from "react";

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--gradient-header)" }}
      className="w-full py-4 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-black/80 text-xs md:text-sm text-center sm:text-left">
          © 2026 Developed by{" "}
          <span className="font-bold text-black">Ramanora Global Pvt Ltd</span>
        </p>
        <a
          href="https://ramanora.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-sm font-semibold transition-colors"
          style={{ color: "var(--color-secondary-light)" }}
        >
          ramanora.com
        </a>
      </div>
    </footer>
  );
}
