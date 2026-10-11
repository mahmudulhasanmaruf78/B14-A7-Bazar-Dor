import React from 'react';
import { getCategories, getProducts } from '@/lib/api';
import CategoryView from './CategoryView';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug || c.id === slug);

  if (!cat) {
    return {
      title: 'ক্যাটাগরি পাওয়া যায়নি | বাজার দর',
    };
  }

  return {
    title: `${cat.nameBn} - বাজার দর | লাইভ বাজার দর ও মূল্য তালিকা`,
    description: `তাজা ও মানসম্মত ${cat.nameBn} এর আজকের বাজার দর ও মূল্য তালিকা।`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug),
  ]);

  const currentCategory = categories.find((c) => c.slug === slug || c.id === slug) || null;

  return (
    <CategoryView
      category={currentCategory}
      products={products}
      allCategories={categories}
      slug={slug}
    />
  );
}
