import { MetadataRoute } from 'next';
import { initialProducts } from '@/lib/data/store-data';
import { DEFAULT_STOREFRONT_ARTICLES } from '@/lib/data/articles-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://roohvastr.vercel.app';

  // Core indexable static pages (utility pages like /cart, /track-order excluded for SEO quality)
  const staticPages = [
    '',
    '/shop',
    '/custom-printing',
    '/bulk-orders',
    '/blog',
    '/about',
    '/contact',
    '/faq',
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

  // Dynamic blog articles from canonical storefront articles data
  const blogPages = DEFAULT_STOREFRONT_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.created_at || new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}

