// luminousheaven/src/app/error.jsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Global Error Boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white p-8 rounded-lg shadow-lg border border-brand-divider">
        <h2 className="font-serif text-3xl font-bold text-brand-dark mb-4">
          Something went wrong
        </h2>
        <p className="font-sans text-brand-light text-sm mb-6">
          An error occurred while loading this page. Please try refreshing or return home.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-brand-accent text-white font-sans text-xs uppercase tracking-wider rounded font-medium hover:bg-brand-dark transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 bg-brand-dark text-white font-sans text-xs uppercase tracking-wider rounded font-medium hover:bg-brand-accent transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
