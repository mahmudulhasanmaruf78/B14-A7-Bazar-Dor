import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs animate-pulse flex flex-col justify-between h-48">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-xl" />
          <div className="w-16 h-5 bg-gray-200 rounded-full" />
        </div>
        <div className="w-3/4 h-5 bg-gray-200 rounded-md mb-2" />
        <div className="w-1/3 h-4 bg-gray-100 rounded-md" />
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="space-y-1">
          <div className="w-12 h-3 bg-gray-100 rounded" />
          <div className="w-20 h-5 bg-gray-200 rounded" />
        </div>
        <div className="w-16 h-6 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-pulse py-8 px-4">
      <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
          <div className="space-y-2">
            <div className="w-48 h-7 bg-gray-200 rounded-lg" />
            <div className="w-32 h-4 bg-gray-100 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-6">
          <div className="h-20 bg-gray-100 rounded-2xl" />
          <div className="h-20 bg-gray-100 rounded-2xl" />
          <div className="h-20 bg-gray-100 rounded-2xl" />
        </div>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-gray-100 h-64" />
    </div>
  );
}
