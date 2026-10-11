'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, ArrowLeft, Check, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, isLoading, updateUserName } = useAuth();

  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('তথ্য পরিবর্তন করতে প্রথমে সাইন ইন করুন');
      router.replace('/signin');
    } else if (user) {
      setName(user.name);
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('নাম ফিল্ডটি পূরণ করুন');
      return;
    }

    setSubmitting(true);
    const res = await updateUserName(name);
    setSubmitting(false);

    if (res.success) {
      router.push('/profile');
    }
  };

  if (isLoading || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      {/* Update Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl border border-emerald-100">
            <Sparkles className="w-7 h-7 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs text-gray-500">
            আপনার অ্যাকাউন্টের প্রদর্শন নাম পরিবর্তন করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              নাম (Name)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              বর্তমান ইমেইল: {user.email} (পরিবর্তনযোগ্য নয়)
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>তথ্য আপডেট করুন</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
