import { createClient } from "@supabase/supabase-js";
import { initialCategories, initialProducts, initialReviews, initialSections } from "@/lib/data/store-data";
import { Category, Product, Review, HomepageSection } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isConfigured =
  supabaseUrl.startsWith("https://") &&
  !supabaseUrl.includes("your-project") &&
  !supabaseUrl.includes("placeholder") &&
  Boolean(supabaseServiceKey && !supabaseServiceKey.includes("placeholder"));

export const supabaseServer = isConfigured
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Server data access helpers with reliable fallback
export async function getCategories(): Promise<Category[]> {
  if (!supabaseServer) return initialCategories;
  try {
    const { data, error } = await supabaseServer
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return initialCategories;
    return data as Category[];
  } catch {
    return initialCategories;
  }
}

export async function getProducts(options?: {
  categoryId?: string;
  categorySlug?: string;
  featuredOnly?: boolean;
  bestsellerOnly?: boolean;
}): Promise<Product[]> {
  if (!supabaseServer) {
    let list = initialProducts.filter((p) => p.is_active);
    if (options?.featuredOnly) list = list.filter((p) => p.is_featured);
    if (options?.bestsellerOnly) list = list.filter((p) => p.is_bestseller);
    if (options?.categorySlug) {
      const cat = initialCategories.find((c) => c.slug === options.categorySlug);
      if (cat) list = list.filter((p) => p.category_id === cat.id);
    }
    return list;
  }

  try {
    let query = supabaseServer
      .from("products")
      .select(`
        *,
        images:product_images(*),
        variants:product_variants(*)
      `)
      .eq("is_active", true);

    if (options?.featuredOnly) query = query.eq("is_featured", true);
    if (options?.bestsellerOnly) query = query.eq("is_bestseller", true);
    if (options?.categoryId) query = query.eq("category_id", options.categoryId);

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return initialProducts;
    }
    return data as Product[];
  } catch {
    return initialProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!supabaseServer) {
    return initialProducts.find((p) => p.slug === slug) || null;
  }
  try {
    const { data, error } = await supabaseServer
      .from("products")
      .select(`
        *,
        images:product_images(*),
        variants:product_variants(*)
      `)
      .eq("slug", slug)
      .single();
    if (error || !data) return initialProducts.find((p) => p.slug === slug) || null;
    return data as Product;
  } catch {
    return initialProducts.find((p) => p.slug === slug) || null;
  }
}

export async function getReviews(): Promise<Review[]> {
  if (!supabaseServer) return initialReviews;
  try {
    const { data, error } = await supabaseServer
      .from("reviews")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return initialReviews;
    return data as Review[];
  } catch {
    return initialReviews;
  }
}

export async function getHomepageSections(): Promise<HomepageSection[]> {
  if (!supabaseServer) return initialSections;
  try {
    const { data, error } = await supabaseServer
      .from("homepage_sections")
      .select("*")
      .eq("is_enabled", true)
      .order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return initialSections;
    return data as HomepageSection[];
  } catch {
    return initialSections;
  }
}
