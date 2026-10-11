import React from 'react';
import { getProductBySlugOrId } from '@/lib/api';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugOrId(slug);

  if (!product) {
    return {
      title: 'পণ্য পাওয়া যায়নি | বাজার দর',
    };
  }

  return {
    title: `${product.nameBn} - আজকের বাজার দর ও বাজারভিত্তিক বিশ্লেষণ`,
    description: `${product.nameBn} এর আজকের বাজার দর ${product.today} টাকা। সারা দেশের বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম জানুন।`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlugOrId(slug);

  return <ProductDetailClient product={product} />;
}
