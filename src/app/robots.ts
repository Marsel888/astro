import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        // Next.js prefetches linked routes as RSC payloads. Googlebot follows
        // them, and because the hash changes every build it re-fetches the same
        // page dozens of times: 80% of its requests here were ?_rsc=, one
        // calculator pulled 28 times. They are flight data, never a page, so the
        // whole lot is crawl budget spent on nothing. Blocking them does not
        // affect rendering — the payloads only exist for client-side navigation.
        '/*?_rsc=',
        // JSON endpoints. Nothing to index, and they cannot carry a noindex.
        '/api/',
      ],
    },
    // The cabinet, chart and auth pages are deliberately NOT listed. They already
    // send noindex, and a page blocked here can never be fetched to read that —
    // which is how blocked URLs end up in results as bare links instead.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
