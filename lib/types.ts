export type ProductType = "ready_made" | "personalized" | "custom_printing" | "bulk";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  display_order: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  color_name?: string;
  color_hex?: string;
  size?: string;
  material_variant?: string;
  price_adjustment: number;
  is_active: boolean;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
  is_primary: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category_id?: string;
  category_name?: string;
  subcategory_id?: string;
  short_description?: string;
  description: string;
  regular_price: number;
  sale_price?: number | null;
  cost_price?: number;
  product_type: ProductType;
  material?: string;
  dimensions?: string;
  weight_grams?: number;
  specifications?: Record<string, string>;
  is_featured: boolean;
  is_bestseller: boolean;
  is_active: boolean;
  allow_customization: boolean;
  return_eligible: boolean;
  shipping_info?: string;
  seo_title?: string;
  seo_description?: string;
  images: ProductImage[];
  variants?: ProductVariant[];
  stock_quantity?: number;

  // Convenience aliases for flexible UI rendering
  primary_image?: string;
  selling_price?: number;
  compare_at_price?: number | null;
  is_customizable?: boolean;
  available_sizes?: string[];
  available_colors?: ProductColor[];
  occasions?: string[];
  recipients?: string[];
  tags?: string[];
}

export interface CartItem {
  id: string;
  product_id: string;
  variant_id?: string;
  product: Product;
  selected_variant?: ProductVariant;
  quantity: number;
  customization_notes?: string;

  // Convenience UI properties
  selected_size?: string;
  selected_color?: string;
  unit_price: number;
  item_total: number;
}

export interface CustomOrderRequest {
  id?: string;
  request_number?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  product_type: string;
  quantity: number;
  sizes_colors?: string;
  design_instructions: string;
  delivery_locality?: string;
  needed_by_date?: string;
  estimated_budget?: number;
  quoted_price?: number;
  status:
    | "new"
    | "in_discussion"
    | "awaiting_details"
    | "quote_pending"
    | "quote_sent"
    | "preview_pending"
    | "preview_sent"
    | "revision_requested"
    | "awaiting_approval"
    | "approved"
    | "payment_pending"
    | "confirmed"
    | "in_production"
    | "shipped"
    | "completed"
    | "cancelled";
  preview_image_url?: string;
  created_at?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  max_discount_amount?: number;
  min_order_value: number;
  expires_at: string;
  is_active: boolean;
  is_exit_intent: boolean;
}

export interface Review {
  id: string;
  product_id?: string;
  customer_name: string;
  rating: number;
  title?: string;
  comment: string;
  is_verified_buyer: boolean;
  is_verified_purchase?: boolean;
  created_at: string;
}

export interface HomepageSection {
  id: string;
  section_key: string;
  title: string;
  subtitle?: string;
  section_type: string;
  display_order: number;
  is_enabled: boolean;
  configuration?: Record<string, unknown>;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  image_url: string;
  excerpt: string;
}

export interface ChatProductItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  regular_price?: number | null;
  primary_image?: string;
  category_name?: string;
  rating?: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time?: string;
  quickActions?: string[];
  leadPrompt?: boolean;
  products?: ChatProductItem[];
}

export interface ChatLead {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  product_name?: string;
  category?: string;
  customization_notes?: string;
  notes?: string;
  budget?: string | number;
  quantity?: number;
  city?: string;
  inquiry_type: "order_request" | "inquiry" | "gift_suggestion" | "bulk_quote" | "general";
  chat_summary?: string;
  transcript?: Array<{ sender: "user" | "bot"; text: string; time?: string }>;
  conversation_transcript?: Array<{ sender: "user" | "bot"; text: string; time?: string }>;
  status: "new" | "contacted" | "in_discussion" | "quote_sent" | "converted" | "cancelled" | "closed";
  created_at: string;
  source: string;
}

