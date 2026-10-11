"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Mail,
  ShieldCheck,
  ArrowRight,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, signOutUser } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন");
      router.replace("/signin");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-400">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      {/* Back to Home */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left border-b border-gray-100 pb-6">
          <img
            src={
              user.image ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
            }
            alt={user.name}
            className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-white shadow-md object-cover"
          />
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-gray-900">{user.name}</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                যাচাইকৃত
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">{user.email}</p>
            <p className="text-[11px] text-gray-400">
              বাজার দর প্ল্যাটফর্ম সদস্য
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            অ্যাকাউন্ট বিবরণী
          </h2>

          <div className="bg-gray-50/70 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600">
                <User className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <span className="block text-[11px] text-gray-400 font-medium">
                  নাম
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  {user.name}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600">
                <Mail className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <span className="block text-[11px] text-gray-400 font-medium">
                  ইমেইল
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Challenge C3 Update Button */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Link
            href="/profile/update"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>তথ্য আপডেট করুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => {
              signOutUser();
              router.push("/");
            }}
            className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>সাইন আউট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
