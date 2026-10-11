'use client';

import React, { createContext, useContext } from 'react';
import { authClient, useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt?: string;
}

export interface Session {
  user: User;
  expires: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInSocial: (provider: 'google' | 'github') => Promise<{ success: boolean; error?: string }>;
  updateUserName: (name: string) => Promise<{ success: boolean; error?: string }>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: sessionData, isPending: isLoading } = useSession();

  const user: User | null = sessionData?.user
    ? {
        id: sessionData.user.id,
        name: sessionData.user.name,
        email: sessionData.user.email,
        image: sessionData.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(sessionData.user.email)}`,
        createdAt: sessionData.user.createdAt ? new Date(sessionData.user.createdAt).toISOString() : undefined,
      }
    : null;

  const session: Session | null = sessionData?.session
    ? {
        user: user!,
        expires: new Date(sessionData.session.expiresAt).toISOString(),
      }
    : null;

  const signInWithEmail = async (email: string, password: string) => {
    if (!email || !password) {
      toast.error('ইমেইল এবং পাসওয়ার্ড পূরণ করুন');
      return { success: false, error: 'সব ফিল্ড পূরণ করুন' };
    }

    if (password.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return { success: false, error: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' };
    }

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res.error) {
        const msg = res.error.message || 'ইমেইল বা পাসওয়ার্ড সঠিক নয়';
        toast.error(msg);
        return { success: false, error: msg };
      }

      toast.success('সফলভাবে লগইন করা হয়েছে!');
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'লগইনে সমস্যা হয়েছে';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const signUpWithEmail = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      toast.error('নাম, ইমেইল এবং পাসওয়ার্ড পূরণ করুন');
      return { success: false, error: 'সব ফিল্ড পূরণ করুন' };
    }

    if (password.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return { success: false, error: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে வேண்டும்' };
    }

    try {
      const res = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (res.error) {
        const msg = res.error.message || 'নিবন্ধনে সমস্যা হয়েছে';
        toast.error(msg);
        return { success: false, error: msg };
      }

      toast.success('নিবন্ধন সফল হয়েছে! বাজার দরে স্বাগতম।');
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'নিবন্ধনে সমস্যা হয়েছে';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const signInSocial = async (provider: 'google' | 'github') => {
    try {
      const callbackURL = typeof window !== 'undefined' ? `${window.location.origin}/` : 'http://localhost:3000/';
      // BetterAuth social OAuth call redirects window to Google or GitHub
      await authClient.signIn.social({
        provider,
        callbackURL,
      });
      return { success: true };
    } catch (err: unknown) {
      console.error('BetterAuth social login error:', err);
      toast.error('সোশ্যাল লগইন প্রক্রিয়াকরণে সমস্যা হয়েছে');
      return { success: false, error: String(err) };
    }
  };

  const updateUserName = async (newName: string) => {
    if (!newName.trim()) {
      toast.error('নাম খালি হতে পারে না');
      return { success: false, error: 'নাম খালি হতে পারে না' };
    }

    try {
      const res = await authClient.updateUser({
        name: newName.trim(),
      });

      if (res.error) {
        const msg = res.error.message || 'আপডেটে সমস্যা হয়েছে';
        toast.error(msg);
        return { success: false, error: msg };
      }

      toast.success('আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে!');
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'আপডেটে সমস্যা হয়েছে';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const signOutUser = async () => {
    try {
      await authClient.signOut();
      toast.success('সফলভাবে সাইন আউট করা হয়েছে');
    } catch (e) {
      console.error('Sign out error:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signInWithEmail,
        signUpWithEmail,
        signInSocial,
        updateUserName,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
