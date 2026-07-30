// luminousheaven/src/app/not-found.jsx
"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <h1 className="font-serif text-6xl font-bold text-brand-dark mb-4">404</h1>
        <h2 className="font-serif text-2xl text-brand-dark mb-4">Page Not Found</h2>
        <p className="font-sans text-brand-light text-sm mb-8">
          The property, page, or luxury residence you requested could not be located.
        </p>
        <Link
          href="/"
          className="px-8 py-3.5 bg-brand-accent text-white font-sans text-xs uppercase tracking-widest rounded font-medium hover:bg-brand-dark transition-colors inline-block"
        >
          Return to Collection
        </Link>
      </div>
    </div>
  );
}
