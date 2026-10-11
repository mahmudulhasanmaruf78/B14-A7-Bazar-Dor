'use client';

import React, { useState, useMemo } from 'react';
import { Product, Category } from '@/lib/api';
import ProductCard from './ProductCard';
import SortDropdown, { SortOption } from './SortDropdown';
import { Search, Sparkles } from 'lucide-react';

interface HomeProductListProps {
  products: Product[];
  categories: Category[];
}

export default function HomeProductList({ products, categories }: HomeProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category === selectedCategory || p.slug.includes(selectedCategory)
      );
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.categoryNameBn.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    // Sort by numeric value (correctly handles Bengali or numeric values)
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.today - b.today);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortOption]);

  const allCategories = [{ id: 'all', slug: 'all', nameBn: 'সব পণ্য', icon: '🧺' }, ...categories];

  return (
    <div id="সব-পণ্য" className="scroll-mt-28 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl">🛒</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              সব পণ্য
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            বাজারের সকল নিত্যপ্রয়োজনীয় পণ্যের হালনাগাদ তালিকা ও বিস্তারিত দর
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="পণ্য বা ক্যাটাগরি খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-2xs"
            />
          </div>

          {/* Sort Dropdown (Challenge C1) */}
          <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {allCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs scale-105'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-gray-900'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl mb-4">
            🔍
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            কোনো পণ্য খুঁজে পাওয়া যায়নি
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            আপনার অনুসন্ধান বা নির্বাচিত ক্যাটাগরির সাথে মিলে এমন কোনো পণ্য মেলেনি।
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setSortOption('default');
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            সব পণ্য পুনরায় দেখুন
          </button>
        </div>
      )}
    </div>
  );
}
