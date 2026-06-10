import type { MetadataRoute } from 'next'

const SITE = 'https://zipzapcomputers.com'

// Public, indexable routes. /admin and /api are excluded by design (also blocked in robots.txt).
// Priorities reflect importance: home > hubs > primary services > sub-services.
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/',                                          priority: 1.0, changeFrequency: 'weekly' },

  // Hub pages
  { path: '/services',                                  priority: 0.9, changeFrequency: 'weekly' },
  { path: '/sell',                                      priority: 0.9, changeFrequency: 'weekly' },
  { path: '/store',                                     priority: 0.8, changeFrequency: 'weekly' },
  { path: '/gallery',                                   priority: 0.7, changeFrequency: 'weekly' },

  // Primary Salem service pages
  { path: '/iphone-repair-services-in-salem',           priority: 0.9, changeFrequency: 'weekly' },
  { path: '/samsung-phone-repair-services-in-salem',    priority: 0.9, changeFrequency: 'weekly' },
  { path: '/android-phone-repair-services-in-salem',    priority: 0.9, changeFrequency: 'weekly' },
  { path: '/cell-phone-repair-services-in-salem',       priority: 0.9, changeFrequency: 'weekly' },
  { path: '/ipad-repair-services-in-salem',             priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tablet-repair-services-in-salem',           priority: 0.9, changeFrequency: 'weekly' },
  { path: '/macbook-repair-services-in-salem',          priority: 0.9, changeFrequency: 'weekly' },
  { path: '/laptop-repair-services-in-salem',           priority: 0.9, changeFrequency: 'weekly' },
  { path: '/computer-repair-services-in-salem',         priority: 0.9, changeFrequency: 'weekly' },
  { path: '/gaming-console-repair-services-in-salem',   priority: 0.9, changeFrequency: 'weekly' },
  { path: '/xbox-repair-services-in-salem',             priority: 0.9, changeFrequency: 'weekly' },
  { path: '/playstation-repair-in-salem',               priority: 0.8, changeFrequency: 'weekly' },

  // Sub-service pages
  { path: '/iphone-screen-replacement-in-salem',        priority: 0.8, changeFrequency: 'weekly' },
  { path: '/iphone-battery-replacement-in-salem',       priority: 0.8, changeFrequency: 'weekly' },
  { path: '/iphone-water-damage-repair-in-salem',       priority: 0.8, changeFrequency: 'weekly' },
  { path: '/iphone-camera-repair-in-salem',             priority: 0.8, changeFrequency: 'weekly' },
  { path: '/macbook-screen-replacement-in-salem',       priority: 0.8, changeFrequency: 'weekly' },
  { path: '/macbook-battery-replacement-in-salem',      priority: 0.8, changeFrequency: 'weekly' },
  { path: '/ipad-screen-replacement-in-salem',          priority: 0.8, changeFrequency: 'weekly' },

  // Regional landing
  { path: '/electronics-gadgets-repair-problem-oregon', priority: 0.7, changeFrequency: 'weekly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
