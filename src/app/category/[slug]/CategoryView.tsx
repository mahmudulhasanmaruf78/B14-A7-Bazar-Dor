'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, Category } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import SortDropdown, { SortOption } from '@/components/SortDropdown';
import { ArrowLeft, Home, PackageOpen } from 'lucide-react';

interface CategoryViewProps {
  category: Category | null;
  products: Product[];
  allCategories: Category[];
  slug: string;
}

export default function CategoryView({
  category,
  products,
  allCategories,
  slug,
}: CategoryViewProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Sorted products
  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.today - b.today);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [products, sortOption]);

  // Empty state if invalid category or no products
  if (!category || products.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-rose-50 border border-rose-100 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5 text-rose-500">
          <PackageOpen className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
          অনুরোধকৃত &quot;{slug}&quot; ক্যাটাগরিটি খুঁজে পাওয়া যায়নি অথবা বর্তমানে এতে কোনো পণ্য তালিকাভুক্ত নেই।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
        >
          <Home className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb / Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল পণ্যে ফিরে যান</span>
        </Link>

        <span className="text-xs text-gray-400 font-medium">
          মোট {products.length}টি পণ্য পাওয়া গেছে
        </span>
      </div>

      {/* Category Header */}
      <div className="bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/40 rounded-3xl p-6 sm:p-8 border border-emerald-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center text-3xl shadow-xs">
            {category.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                ক্যাটাগরি
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              {category.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              বাজারের সেরা মূল্যে তাজা ও মানসম্মত {category.nameBn} এর বর্তমান বাজার দর
            </p>
          </div>
        </div>

        {/* Sort control */}
        <div className="self-end sm:self-center">
          <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
        </div>
      </div>

      {/* Category quick switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:border-emerald-300 hover:text-gray-900 transition-colors whitespace-nowrap"
        >
          <span>🧺</span>
          <span>সব পণ্য</span>
        </Link>
        {allCategories.map((c) => {
          const isCurrent = c.slug === slug;
          return (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isCurrent
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-gray-900'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.nameBn}</span>
            </Link>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
