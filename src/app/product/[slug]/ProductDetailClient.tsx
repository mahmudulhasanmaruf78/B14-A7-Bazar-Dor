'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { toBanglaNumber, formatUnit } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  Store,
  MapPin,
  Calendar,
  Lock,
  Layers,
  Building2,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product | null;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Protected route check
  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('পণ্যের বিস্তারিত তথ্য দেখতে অনুগ্রহ করে প্রথমে লগইন করুন', {
        id: 'auth-protect-toast',
      });
      router.replace('/signin');
    }
  }, [user, isLoading, router]);

  // Calculations for Price Summary
  const { minPrice, maxPrice, avgPrice } = useMemo(() => {
    if (!product) return { minPrice: 0, maxPrice: 0, avgPrice: 0 };
    if (product.markets && product.markets.length > 0) {
      const mins = product.markets.map((m) => m.min);
      const maxs = product.markets.map((m) => m.max);
      const min = Math.min(...mins);
      const max = Math.max(...maxs);
      const avg = Math.round(
        product.markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) /
          product.markets.length
      );
      return { minPrice: min, maxPrice: max, avgPrice: avg };
    }
    return {
      minPrice: Math.round(product.today * 0.95),
      maxPrice: Math.round(product.today * 1.08),
      avgPrice: product.today,
    };
  }, [product]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-500 font-medium">ব্যবহারকারীর তথ্য যাচাই করা হচ্ছে...</p>
      </div>
    );
  }

  // If not logged in, show protected prompt while redirecting
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl border border-amber-200">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">লগইন প্রয়োজন</h2>
        <p className="text-xs text-gray-500">
          পণ্যের বাজারভিত্তিক বিস্তারিত বিশ্লেষণ দেখার জন্য লগইন করা আবশ্যক। আপনাকে লগইন পৃষ্ঠায় নিয়ে যাওয়া হচ্ছে...
        </p>
        <Link
          href="/signin"
          className="inline-block px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs hover:bg-emerald-700"
        >
          লগইন পৃষ্ঠায় যান
        </Link>
      </div>
    );
  }

  // Not found product
  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl border border-rose-200">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-gray-900">পণ্য পাওয়া যায়নি</h2>
        <p className="text-xs text-gray-500">
          অনুরোধকৃত পণ্যটি বাজারে খুঁজে পাওয়া যায়নি।
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs hover:bg-emerald-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pct = Math.abs(product.change?.pct || 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল পণ্যে ফিরে যান</span>
        </Link>
      </div>

      {/* Top — Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            {/* Emoji */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-center text-4xl sm:text-5xl shadow-xs shrink-0">
              {product.image || product.categoryIcon || '🛒'}
            </div>

            <div className="space-y-1.5">
              {/* Category tags */}
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/70 text-emerald-800 hover:bg-emerald-200 transition-colors"
                >
                  <Layers className="w-3 h-3 text-emerald-600" />
                  <span>{product.categoryNameBn || product.category}</span>
                </Link>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                  {formatUnit(product.unit)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                {product.nameBn}
              </h1>

              {/* Subtitle / market summary line */}
              <p className="text-xs sm:text-sm text-gray-500">
                আজকের বাজার দর ও সারা দেশের প্রধান পাইকারি ও খুচরা বাজারের বিস্তারিত তুলনামূলক দর
              </p>
            </div>
          </div>

          {/* Today's Price with change badge */}
          <div className="md:text-right bg-gray-50/80 sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-0 border-gray-100">
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              আজকের সামগ্রিক বাজার দর
            </span>
            <div className="flex items-baseline md:justify-end gap-2 mb-2">
              <span className="text-3xl sm:text-4xl font-black text-gray-900">
                {toBanglaNumber(product.today)}
              </span>
              <span className="text-sm font-bold text-gray-600">টাকা / {formatUnit(product.unit).replace('প্রতি ', '')}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                  isUp
                    ? 'bg-emerald-100 text-emerald-800'
                    : isDown
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {isUp ? (
                  <>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>▲ {toBanglaNumber(pct)}% বেড়েছে</span>
                  </>
                ) : isDown ? (
                  <>
                    <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                    <span>▼ {toBanglaNumber(pct)}% কমেছে</span>
                  </>
                ) : (
                  <>
                    <Minus className="w-3.5 h-3.5 text-gray-500" />
                    <span>— অপরিবর্তিত</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* দামের সারসংক্ষেপ (Price Summary matching Figma) */}
      <div className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* সর্বনিম্ন দাম */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:border-emerald-200 transition-colors">
            <span className="text-xs text-gray-500 font-medium block mb-1">
              সর্বনিম্ন দাম
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                {toBanglaNumber(minPrice)} টাকা
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          {/* সর্বাধিক দাম */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:border-rose-200 transition-colors">
            <span className="text-xs text-gray-500 font-medium block mb-1">
              সর্বাধিক দাম
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-600">
                {toBanglaNumber(maxPrice)} টাকা
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* গড় দাম */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:border-emerald-200 transition-colors">
            <span className="text-xs text-gray-500 font-medium block mb-1">
              গড় দাম
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                {toBanglaNumber(avgPrice)} টাকা
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              {formatUnit(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Table matching Figma screenshot) */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden space-y-4 p-5 sm:p-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-semibold text-gray-600">
                <th className="py-3 px-5">বাজার</th>
                <th className="py-3 px-5">বিভাগ</th>
                <th className="py-3 px-5 text-right">সর্বনিম্ন</th>
                <th className="py-3 px-5 text-right">সর্বাধিক</th>
                <th className="py-3 px-5 text-right font-bold text-gray-800">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {product.markets && product.markets.length > 0 ? (
                product.markets.map((m, idx) => {
                  const avg = (m.min + m.max) / 2;
                  const avgFormatted =
                    avg % 1 === 0
                      ? toBanglaNumber(avg)
                      : toBanglaNumber(avg.toFixed(2));

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-emerald-50/30 transition-colors"
                    >
                      <td className="py-3.5 px-5 font-medium text-gray-800">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-5 text-gray-500">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-5 text-right text-gray-700">
                        {toBanglaNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-5 text-right text-gray-700">
                        {toBanglaNumber(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-5 text-right font-bold text-gray-900">
                        {avgFormatted} টাকা
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400 text-xs">
                    কোনো বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
