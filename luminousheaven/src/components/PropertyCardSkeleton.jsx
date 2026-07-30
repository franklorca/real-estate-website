// luminousheaven/src/components/PropertyCardSkeleton.jsx
"use client";

import React from "react";

const PropertyCardSkeleton = () => {
  return (
    <div className="bg-brand-bg rounded-lg border border-brand-divider/50 overflow-hidden">
      <div className="h-64 bg-gray-200 animate-pulse"></div>
      <div className="p-6">
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        <div className="border-t border-brand-divider/50 mt-4 pt-4">
          <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
