-- ROOH VASTR — Row Level Security (RLS) Policies
-- Migration 02: Secure Data Access Controls

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tag_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_order_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_order_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Is user an admin?
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_roles.user_id = $1 AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PUBLIC READ POLICIES (Storefront)
CREATE POLICY "Public can view active categories" ON public.categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active subcategories" ON public.subcategories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active products" ON public.products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view product images" ON public.product_images
    FOR SELECT USING (true);

CREATE POLICY "Public can view active variants" ON public.product_variants
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active banners" ON public.homepage_banners
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view enabled homepage sections" ON public.homepage_sections
    FOR SELECT USING (is_enabled = true);

CREATE POLICY "Public can view approved reviews" ON public.reviews
    FOR SELECT USING (is_approved = true);

CREATE POLICY "Public can view published blog posts" ON public.blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view blog categories" ON public.blog_categories
    FOR SELECT USING (true);

-- 2. CUSTOMER PROFILES & CARTS
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage own addresses" ON public.addresses
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlist" ON public.wishlists
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlist items" ON public.wishlist_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.wishlists 
            WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
        )
    );

-- 3. CUSTOM ORDER REQUESTS
CREATE POLICY "Anyone can submit custom order request" ON public.custom_order_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Customers can view own custom orders" ON public.custom_order_requests
    FOR SELECT USING (auth.uid() = user_id);

-- 4. NEWSLETTER
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

-- 5. ADMIN FULL ACCESS (Bypass for admin role)
CREATE POLICY "Admins have full access to profiles" ON public.profiles FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to categories" ON public.categories FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to subcategories" ON public.subcategories FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to products" ON public.products FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to product_images" ON public.product_images FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to product_variants" ON public.product_variants FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to inventory" ON public.inventory FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to orders" ON public.orders FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to order_items" ON public.order_items FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to payments" ON public.payments FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to custom_orders" ON public.custom_order_requests FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to custom_attachments" ON public.custom_order_attachments FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to homepage_sections" ON public.homepage_sections FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to homepage_banners" ON public.homepage_banners FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to coupons" ON public.coupons FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to blog_posts" ON public.blog_posts FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to site_settings" ON public.site_settings FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins have full access to audit_logs" ON public.audit_logs FOR ALL USING (public.is_admin(auth.uid()));
