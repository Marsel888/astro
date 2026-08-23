import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/site';

/**
 * Used when someone adds the site to a phone's home screen, and by Chrome for
 * the address-bar theme. Not a full PWA — there is no service worker and the
 * calculators need the network.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — birth chart calculators`,
    short_name: SITE_NAME,
    description:
      'Free birth chart, rising sign, Moon sign and synastry calculators, computed from a real ephemeris.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0e14',
    theme_color: '#0b0e14',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
