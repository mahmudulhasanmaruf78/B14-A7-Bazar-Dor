import React from 'react';
import Hero from '@/components/Hero';
import PriceTicker from '@/components/PriceTicker';
import ProductCard from '@/components/ProductCard';
import HomeProductList from '@/components/HomeProductList';
import { getProducts, getCategories } from '@/lib/api';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  // Top 6 Risers (দাম বেড়েছে ▲)
  const risers = products
    .filter((p) => p.change?.dir === 'up')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // Top 6 Fallers (দাম কমেছে ▼)
  const fallers = products
    .filter((p) => p.change?.dir === 'down')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      {/* 1. Price Ticker marquee strip */}
      <PriceTicker products={products} />

      {/* 2. Hero Banner */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* 3. Section A: আজ দাম বেড়েছে ▲ (Top 6 Risers) */}
        {risers.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                    আজ দাম বেড়েছে <span className="text-emerald-600">▲</span>
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    গতকালের তুলনায় সর্বোচ্চ মূল্যবৃদ্ধির শীর্ষ পণ্যসমূহ
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                শীর্ষ ৬ পণ্য
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {risers.map((product) => (
                <ProductCard key={`riser-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* 4. Section B: আজ দাম কমেছে ▼ (Top 6 Fallers) */}
        {fallers.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                    আজ দাম কমেছে <span className="text-rose-600">▼</span>
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    গতকালের তুলনায় মূল্যহ্রাসের শীর্ষ পণ্যসমূহ
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                শীর্ষ ৬ পণ্য
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {fallers.map((product) => (
                <ProductCard key={`faller-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* 5. Section C: সব পণ্য (All Products with Filter & Sort) */}
        <section>
          <HomeProductList products={products} categories={categories} />
        </section>
      </div>
    </div>
  );
}
