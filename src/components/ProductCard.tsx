'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/api';
import { toBanglaNumber, formatUnit } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pct = Math.abs(product.change?.pct || 0);

  // Fallback slug or ID for URL routing
  const productSlug = product.slug || String(product.id);

  return (
    <Link
      href={`/product/${productSlug}`}
      className="group relative bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-xs hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top line: Emoji icon + Category badge */}
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-emerald-50 transition-all border border-gray-100">
            {product.image || product.categoryIcon || '🛒'}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
              {product.categoryNameBn || product.category}
            </span>
            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-emerald-500 text-white transition-all">
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
            </div>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
          {product.nameBn}
        </h3>

        {/* Unit Line */}
        <p className="text-xs text-gray-500 font-medium mb-4">
          {formatUnit(product.unit)}
        </p>
      </div>

      {/* Price Row: label আজকের দাম + value + change badge */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
            আজকের দাম
          </span>
          <span className="text-base sm:text-lg font-extrabold text-gray-900">
            {toBanglaNumber(product.today)} <span className="text-xs font-semibold text-gray-500">টাকা</span>
          </span>
        </div>

        {/* Change Badge */}
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            isUp
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
              : isDown
              ? 'bg-rose-50 text-rose-700 border border-rose-200/80'
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}
        >
          {isUp ? (
            <>
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>▲ {toBanglaNumber(pct)}%</span>
            </>
          ) : isDown ? (
            <>
              <TrendingDown className="w-3 h-3 text-rose-600" />
              <span>▼ {toBanglaNumber(pct)}%</span>
            </>
          ) : (
            <>
              <Minus className="w-3 h-3 text-gray-400" />
              <span>— ০.০%</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
