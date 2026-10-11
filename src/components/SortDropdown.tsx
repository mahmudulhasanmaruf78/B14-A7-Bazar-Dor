'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowDownUp, Check } from 'lucide-react';

export type SortOption = 'default' | 'price-asc' | 'price-desc';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
}

const sortOptionsList: { id: SortOption; label: string }[] = [
  { id: 'default', label: 'ডিফল্ট' },
  { id: 'price-asc', label: 'দাম: কম থেকে বেশি' },
  { id: 'price-desc', label: 'দাম: বেশি থেকে কম' },
];

export default function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = sortOptionsList.find((opt) => opt.id === currentSort)?.label || 'ডিফল্ট';

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-500 hidden sm:inline-flex items-center gap-1">
          <ArrowDownUp className="w-3.5 h-3.5 text-gray-400" />
          সাজান:
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-2xs hover:border-emerald-300 transition-all"
        >
          <span>{selectedLabel}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-xl border border-gray-100 py-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
            ক্রম বিন্যাস
          </div>
          {sortOptionsList.map((option) => {
            const isSelected = currentSort === option.id;
            return (
              <button
                key={option.id}
                onClick={() => {
                  onSortChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-left transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
