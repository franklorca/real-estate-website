// luminousheaven/src/app/loading.jsx
"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-2 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="font-serif text-lg tracking-widest uppercase text-brand-dark mt-6">
          Luminous Heaven
        </p>
      </div>
    </div>
  );
}
