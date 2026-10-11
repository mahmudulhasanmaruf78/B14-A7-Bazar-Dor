import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <p className="text-sm font-semibold text-gray-800">
              বাজার দর — <span className="font-normal text-gray-500">প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
            </p>
          </div>

          <p className="text-xs text-gray-400 italic">
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
          </p>
        </div>
      </div>
    </footer>
  );
}
