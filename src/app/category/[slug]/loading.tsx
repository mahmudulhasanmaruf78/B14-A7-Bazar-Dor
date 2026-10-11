import React from "react";
import { ProductGridSkeleton } from "@/components/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
      <div className="h-4 w-28 bg-gray-200 rounded" />
      <div className="bg-white rounded-3xl p-8 border border-gray-100 flex items-center gap-6">
        <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
        <div className="space-y-2">
          <div className="w-32 h-6 bg-gray-200 rounded-lg" />
          <div className="w-64 h-4 bg-gray-100 rounded" />
        </div>
      </div>
      <div className="h-10 w-full bg-gray-100 rounded-2xl" />
      <ProductGridSkeleton count={8} />
    </div>
  );
}
