import React from "react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 text-center shadow-xl space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-4xl border border-emerald-100">
          🔍
        </div>

        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-black text-emerald-600 tracking-tight">
            404
          </span>
          <h1 className="text-2xl font-black text-gray-900">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            আপনি যে ঠিকানাটি খুঁজছেন তা মুছে ফেলা হয়েছে, স্থানান্তর করা হয়েছে
            বা সাময়িকভাবে অনুপলব্ধ।
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
