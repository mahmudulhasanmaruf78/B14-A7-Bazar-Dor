import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import ToastProvider from '@/components/ToastProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCategories } from '@/lib/api';

export const metadata: Metadata = {
  title: 'বাজার দর (BazarDor) — নিত্যপ্রয়োজনীয় পণ্যের লাইভ বাজার দর ও বিশ্লেষণ',
  description: 'প্রতিদিনের চাল, ডাল, তেল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের বাজার দর জানুন সবার আগে। সঠিক দাম ও নির্ভরযোগ্য তথ্যের উন্মুক্ত প্ল্যাটফর্ম।',
  keywords: ['বাজার দর', 'BazarDor', 'নিত্যপ্রয়োজনীয় পণ্যের দাম', 'বাংলাদেশ বাজার দর', 'চাল ডাল তেল সবজি দাম'],
  authors: [{ name: 'BazarDor Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="bn" data-theme="light">
      <head>
        <link rel="icon" href="/logo-icon.png" />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
        <AuthProvider>
          <ToastProvider />
          <Navbar categories={categories} />
          <main className="grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
