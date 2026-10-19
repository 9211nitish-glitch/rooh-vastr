-- ROOH VASTR — Production Seed Data
-- Migration 03: Initial Categories, Products, Homepage Sections, and Site Settings

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image_url, display_order, is_featured, is_active)
VALUES
('c1000000-0000-0000-0000-000000000001', 'Customized T-Shirts', 'custom-tshirts', 'Premium 100% bio-washed cotton T-shirts tailored to your expression', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', 1, true, true),
('c1000000-0000-0000-0000-000000000002', 'Polo T-Shirts & Collared', 'polo-tshirts', 'Sophisticated smart-casual customized polos for personal wear & gifting', 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80', 2, true, true),
('c1000000-0000-0000-0000-000000000003', 'Hoodies & Sweatshirts', 'hoodies-sweatshirts', 'Ultra-warm fleece and French terry hoodies with high-definition custom prints', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 3, true, true),
('c1000000-0000-0000-0000-000000000004', 'Personalized Mugs & Cups', 'personalized-mugs', 'Ceramic, magic color-changing, and matte finish drinkware personalized for memories', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', 4, true, true),
('c1000000-0000-0000-0000-000000000005', 'Custom Cushions & Pillows', 'custom-cushions', 'Soft satin & canvas photo cushions that make home cozy and full of smiles', 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80', 5, true, true),
('c1000000-0000-0000-0000-000000000006', 'Photo Frames & Acrylic Art', 'photo-frames-wall-art', 'Museum-quality wooden frames, floating acrylic glass, and bespoke canvas art', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', 6, true, true),
('c1000000-0000-0000-0000-000000000007', 'Personalized Keychains & Bottles', 'keychains-bottles', 'Engraved stainless steel bottles and laser-cut metallic & wooden keychains', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80', 7, true, true),
('c1000000-0000-0000-0000-000000000008', 'Corporate & Bulk Gifts', 'corporate-bulk-gifts', 'Brand identity merchandise, client hampers, and employee welcome kits', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80', 8, true, true)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED SAMPLE PRODUCTS
INSERT INTO public.products (
    id, name, slug, sku, category_id, short_description, description, 
    regular_price, sale_price, product_type, material, dimensions, 
    weight_grams, is_featured, is_bestseller, is_active, allow_customization, return_eligible
)
VALUES
(
    'p1000000-0000-0000-0000-000000000001',
    'Customized Pure Cotton Minimalist Graphic Tee',
    'customized-pure-cotton-graphic-tee',
    'RV-TSH-001',
    'c1000000-0000-0000-0000-000000000001',
    'Heavyweight 220 GSM combed cotton tee featuring your artwork or choice of text.',
    'Crafted from 100% combed bio-washed organic cotton, this t-shirt balances supreme softness with lasting durability. Designed for ready-wear or custom printing.',
    999.00, 749.00, 'ready_made', '100% Bio-Washed Combed Cotton', 'S to 3XL Standard Fit', 220, true, true, true, true, true
),
(
    'p1000000-0000-0000-0000-000000000002',
    'Personalized Ceramic Keepsake Coffee Mug',
    'personalized-ceramic-coffee-mug',
    'RV-MUG-001',
    'c1000000-0000-0000-0000-000000000004',
    'Glossy white 350ml microwave-safe ceramic mug with dye-sublimation print.',
    'Start every morning with love and warm nostalgia. Dishwasher and microwave safe with permanent photo-finish colors.',
    499.00, 349.00, 'ready_made', 'A-Grade Ceramic', '350ml / 11oz', 330, true, true, true, true, true
),
(
    'p1000000-0000-0000-0000-000000000003',
    'Heritage Heavyweight Fleece Custom Hoodie',
    'heritage-heavyweight-fleece-hoodie',
    'RV-HOD-001',
    'c1000000-0000-0000-0000-000000000003',
    '380 GSM brushed fleece hoodie with double-layer hood and kangaroo pocket.',
    'Warm, comfortable, and tailored for chilly evenings. Print custom initials, date, or back illustration.',
    2199.00, 1699.00, 'ready_made', 'Brushed Cotton Fleece (380 GSM)', 'Regular Unisex Fit', 650, true, true, true, true, true
),
(
    'p1000000-0000-0000-0000-000000000004',
    'Custom Satin Photo Cushion with Microfiber Insert',
    'custom-satin-photo-cushion',
    'RV-CSH-001',
    'c1000000-0000-0000-0000-000000000005',
    'Square 16x16 inch plush photo cushion with zipper and hypoallergenic filler.',
    'A soft, memorable addition to your sofa or bed. Printed with high-definition digital transfer that never fades.',
    699.00, 499.00, 'ready_made', 'Silk Satin Blend with Microfiber Filling', '16 x 16 inches', 400, true, false, true, true, true
),
(
    'p1000000-0000-0000-0000-000000000005',
    'Floating Acrylic Glass Memory Frame',
    'floating-acrylic-glass-frame',
    'RV-FRM-001',
    'c1000000-0000-0000-0000-000000000006',
    'Seamless crystal-clear acrylic block with UV back-printing for stunning 3D depth.',
    'Modernize your favorite family portraits and milestones. Polished diamond edges with sturdy stainless steel desk stand.',
    1299.00, 899.00, 'ready_made', 'Cast Optical Acrylic', '8 x 10 inches, 6mm thickness', 500, true, true, true, true, true
),
(
    'p1000000-0000-0000-0000-000000000006',
    'Insulated Vacuum Stainless Steel Personalized Flask',
    'insulated-vacuum-steel-flask',
    'RV-BTL-001',
    'c1000000-0000-0000-0000-000000000007',
    'Double-wall 750ml insulated bottle keeping beverages 24h cold / 12h hot.',
    'Laser-engraved with your recipient name or custom typography. Spill-proof bamboo cap with silicone seal.',
    1199.00, 799.00, 'ready_made', 'Food-Grade 304 Stainless Steel', '750ml Capacity', 380, true, false, true, true, true
)
ON CONFLICT (id) DO NOTHING;

-- 3. PRODUCT IMAGES
INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
VALUES
('p1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', 'Customized White Cotton T-shirt', 1, true),
('p1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', 'Personalized Ceramic Coffee Mug', 1, true),
('p1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 'Burgundy Comfort Hoodie', 1, true),
('p1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80', 'Custom Satin Photo Cushion', 1, true),
('p1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', 'Crystal Acrylic Floating Photo Block', 1, true),
('p1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80', 'Engraved Matte Black Water Bottle', 1, true)
ON CONFLICT (id) DO NOTHING;

-- 4. HOMEPAGE SECTIONS
INSERT INTO public.homepage_sections (section_key, title, subtitle, section_type, display_order, is_enabled)
VALUES
('announcement_bar', 'Free Delivery on Orders Above ₹999 | Use Code ROOHFIRST for 10% Off', NULL, 'announcement_bar', 1, true),
('hero_banner', 'Wear Your Story. Gift Your Feelings.', 'Modern Indian personalized gifts and apparel crafted to celebrate your moments.', 'hero_banner', 2, true),
('featured_categories', 'Curated Collections', 'Discover gifts made personal for every recipient and occasion.', 'featured_categories', 3, true),
('bestsellers', 'Loved by Thousands', 'Our most cherished custom-printed gifts and apparel.', 'bestsellers', 4, true),
('custom_printing_spotlight', 'Print on Demand & Bespoke Printing', 'Turn your ideas, family photos, or business logo into tangible elegance.', 'custom_printing_spotlight', 5, true),
('how_it_works', 'Simple 3-Step Customization', 'From idea to doorstep, we make gifting effortless.', 'how_it_works', 6, true),
('reviews', 'Stories from Happy Hearts', 'Real reviews from verified customers across India.', 'reviews', 7, true),
('faq', 'Frequently Asked Questions', 'Everything you need to know about our customization, shipping & previews.', 'faq', 8, true),
('newsletter', 'Join the Rooh Vastr Family', 'Receive exclusive festive offers, gifting inspiration, and new arrivals.', 'newsletter', 9, true)
ON CONFLICT (section_key) DO NOTHING;

-- 5. COUPONS (Including Exit-Intent)
INSERT INTO public.coupons (code, discount_type, discount_value, min_order_value, expires_at, is_active, is_exit_intent)
VALUES
('ROOHFIRST', 'percentage', 10.00, 499.00, NOW() + INTERVAL '1 year', true, false),
('MEMORIES100', 'fixed', 100.00, 799.00, NOW() + INTERVAL '6 months', true, false),
('STAYGIFT50', 'fixed', 50.00, 399.00, NOW() + INTERVAL '1 month', true, true)
ON CONFLICT (code) DO NOTHING;

-- 6. SITE SETTINGS
INSERT INTO public.site_settings (key, value)
VALUES
('general', '{
    "brand_name": "ROOH VASTR",
    "tagline": "Wear Your Story. Gift Your Feelings.",
    "support_email": "care@roohvastr.com",
    "support_phone": "+91 98765 43210",
    "whatsapp_number": "919876543210",
    "currency_symbol": "₹",
    "free_shipping_threshold": 999.00
}'::jsonb),
('theme', '{
    "primary_color": "#6D1835",
    "background_color": "#FAF7F2",
    "charcoal_color": "#242124",
    "accent_rose": "#C98F9F",
    "soft_beige": "#EAE0D5"
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
