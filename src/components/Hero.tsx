"use client";

import React from "react";
import Image from "next/image";
import { getBanglaDate } from "@/lib/utils";

export default function Hero() {
  const banglaDate = getBanglaDate();

  const scrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("সব-পণ্য");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <section className="relative overflow-hidden rounded-3xl bg-[#F0FDF4]/70 border border-emerald-100/80 p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="md:col-span-7 space-y-4 sm:space-y-5 text-center md:text-left">
            {/* Date Pill */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-semibold">
              <span>{banglaDate}</span>
            </div>

            {/* Main Heading matching Figma */}
            <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-gray-900 tracking-tight leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle matching Figma */}
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-xl font-normal leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button matching Figma */}
            <div className="pt-2 flex justify-center md:justify-start">
              <a
                href="#সব-পণ্য"
                onClick={scrollToProducts}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm shadow-xs transition-all duration-150 cursor-pointer"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          {/* Right Image matching Figma */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-60 h-52 sm:w-72 sm:h-64 lg:w-80 lg:h-72">
              <Image
                src="/hero-basket.png"
                alt="বাজার দর গ্রোসারি বাস্কেট"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
