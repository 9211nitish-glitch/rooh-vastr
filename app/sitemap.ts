import { MetadataRoute } from 'next';
import { initialProducts, initialCategories } from '@/lib/data/store-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://roohvastr.com';

  // Core static pages
  const staticPages = [
    '',
    '/shop',
    '/custom-printing',
    '/bulk-orders',
    '/blog',
    '/about',
    '/contact',
    '/faq',
    '/track-order',
    '/cart',
    '/shipping-policy',
    '/returns-refunds',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/shop' || route === '/custom-printing' ? 0.9 : 0.7,
  }));

  // Dynamic product pages
  const productPages = initialProducts.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Category filter routes
  const categoryPages = initialCategories.map((category) => ({
    url: `${baseUrl}/shop?category=${category.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  // Initial blog articles
  const blogSlugs = [
    'ultimate-personalized-gift-guide-india',
    'how-to-choose-the-perfect-custom-tshirt-gsm-fabric-guide',
    'corporate-gifting-trends-that-leave-lasting-impressions',
  ];

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
