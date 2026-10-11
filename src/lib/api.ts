export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface MarketItem {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductChange {
  dir: 'up' | 'down' | 'flat';
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductChange;
  markets?: MarketItem[];
}

const API_BASE_URLS = [
  'https://openapi.programming-hero.com/api/bazardor',
  'https://api.api-store.workers.dev/api/bazardor',
  'https://api.abcz.workers.dev/api/bazardor',
];

async function fetchFromApi<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (const base of API_BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        return (await res.json()) as T;
      }
    } catch (err) {
      lastError = err;
    }
  }
  throw new Error(`Failed to fetch ${path}: ${String(lastError)}`);
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await fetchFromApi<Category[]>('/categories');
  } catch (e) {
    console.error('Error fetching categories:', e);
    return [];
  }
}

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const path = category && category !== 'all' ? `/products?category=${encodeURIComponent(category)}` : '/products';
    return await fetchFromApi<Product[]>(path);
  } catch (e) {
    console.error(`Error fetching products (cat=${category}):`, e);
    return [];
  }
}

export async function getProductBySlugOrId(slugOrId: string): Promise<Product | null> {
  try {
    // If it's a numeric ID, try fetching single product first
    if (/^\d+$/.test(slugOrId)) {
      try {
        const prod = await fetchFromApi<Product>(`/products/${slugOrId}`);
        if (prod && prod.id) return prod;
      } catch {
        // Fall back to searching list
      }
    }

    // Otherwise, fetch all products and find matching slug or id
    const all = await getProducts();
    const found = all.find(
      (p) => p.slug === slugOrId || String(p.id) === slugOrId
    );
    return found || null;
  } catch (e) {
    console.error(`Error finding product for ${slugOrId}:`, e);
    return null;
  }
}
