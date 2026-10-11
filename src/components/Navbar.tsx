'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getBanglaDate } from '@/lib/utils';
import { Menu, X, User as UserIcon, LogOut, Settings, ChevronDown } from 'lucide-react';

interface NavbarProps {
  categories?: { id: string; slug: string; nameBn: string; icon: string }[];
}

const defaultCategories = [
  { id: 'all', slug: '', nameBn: 'সব পণ্য', icon: '🧺' },
  { id: 'chal', slug: 'chal', nameBn: 'চাল', icon: '🍚' },
  { id: 'dal', slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
  { id: 'tel', slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
  { id: 'sobji', slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
  { id: 'mach', slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
  { id: 'mangsho', slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
  { id: 'dim-dui', slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
  { id: 'mosla', slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
];

export default function Navbar({ categories = defaultCategories }: NavbarProps) {
  const pathname = usePathname();
  const { user, signOutUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const banglaDate = getBanglaDate();

  // Combine 'all' with fetched categories if needed
  const displayCategories = categories.some((c) => c.id === 'all')
    ? categories
    : [{ id: 'all', slug: '', nameBn: 'সব পণ্য', icon: '🧺' }, ...categories];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Bangla Date */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
              <span className="text-2xl">🛒</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-emerald-600 transition-colors">
                  বাজার দর
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                  লাইভ
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {banglaDate}
              </p>
            </div>
          </Link>

          {/* Desktop Right Auth / Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
                  aria-expanded={profileDropdownOpen}
                >
                  <img
                    src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Dropdown Menu matching Figma 'Home - User Menu Open' */}
                {profileDropdownOpen && (
                  <>
                    {/* Invisible backdrop to dismiss on click outside */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="pb-3 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900 leading-tight">{user.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{user.email}</p>
                      </div>

                      <div className="pt-2 space-y-1">
                        <Link
                          href="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-2 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-sky-500" />
                          <span>আমার প্রোফাইল</span>
                        </Link>

                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            signOutUser();
                          }}
                          className="w-full flex items-center gap-2.5 px-2 py-2 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>সাইন আউট</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/signin"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-emerald-600 hover:bg-gray-50 transition-all border border-gray-200"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs hover:shadow-md transition-all"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <Link href="/profile" className="p-1">
                <img
                  src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-emerald-500"
                />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Category Navigation Links */}
      <div className="border-t border-gray-100 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 py-2 overflow-x-auto no-scrollbar scroll-smooth">
            {displayCategories.map((cat) => {
              const href = cat.slug ? `/category/${cat.slug}` : '/';
              const isActive =
                cat.slug === ''
                  ? pathname === '/'
                  : pathname === `/category/${cat.slug}`;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-2 mb-2">
              ক্যাটাগরি
            </p>
            <div className="grid grid-cols-2 gap-2">
              {displayCategories.map((cat) => {
                const href = cat.slug ? `/category/${cat.slug}` : '/';
                const isActive =
                  cat.slug === ''
                    ? pathname === '/'
                    : pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.id}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-2 py-1">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-9 h-9 rounded-full bg-emerald-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    প্রোফাইল
                  </Link>
                  <Link
                    href="/profile/update"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    তথ্য আপডেট
                  </Link>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOutUser();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  সাইন আউট
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold text-gray-700 border border-gray-300 hover:bg-gray-50"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
