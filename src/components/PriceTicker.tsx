'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/api';
import { toBanglaNumber, formatUnit } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate list to achieve continuous seamless loop
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-emerald-950 text-emerald-100 border-y border-emerald-900/60 overflow-hidden py-2.5 relative select-none">
      <div className="flex animate-ticker whitespace-nowrap">
        {tickerItems.map((prod, index) => {
          const isUp = prod.change?.dir === 'up';
          const isDown = prod.change?.dir === 'down';
          const pct = Math.abs(prod.change?.pct || 0);

          return (
            <Link
              key={`${prod.id}-${index}`}
              href={`/product/${prod.slug || prod.id}`}
              className="inline-flex items-center gap-2 px-5 text-xs hover:text-white transition-colors group cursor-pointer border-r border-emerald-800/40"
            >
              <span className="text-base group-hover:scale-110 transition-transform">
                {prod.image || prod.categoryIcon || '🛒'}
              </span>
              <span className="font-semibold text-emerald-50">
                {prod.nameBn}
              </span>
              <span className="text-emerald-300 font-medium">
                {toBanglaNumber(prod.today)} টাকা/{formatUnit(prod.unit).replace('প্রতি ', '')}
              </span>

              {/* Change badge */}
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  isUp
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : isDown
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                }`}
              >
                {isUp ? (
                  <>
                    <TrendingUp className="w-3 h-3 text-emerald-400" />▲ {toBanglaNumber(pct)}%
                  </>
                ) : isDown ? (
                  <>
                    <TrendingDown className="w-3 h-3 text-rose-400" />▼ {toBanglaNumber(pct)}%
                  </>
                ) : (
                  <>
                    <Minus className="w-3 h-3 text-gray-400" />— ০.০%
                  </>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
