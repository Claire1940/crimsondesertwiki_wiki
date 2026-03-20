const DEFAULT_SITE_URL = 'https://crimsondesertwiki.wiki'

export const SITE = {
  name: 'Crimson Desert Wiki',
  shortName: 'Crimson Desert',
  domain: 'crimsondesertwiki.wiki',
  defaultTitle: 'Crimson Desert Wiki - Bosses, Map & Gear Guide',
  defaultDescription:
    "Crimson Desert Wiki with boss guides, map walkthroughs, gear tips, puzzles, quests, and patch updates for Kliff's journey across the world of Pywel.",
  defaultKeywords: [
    'Crimson Desert',
    'Crimson Desert Wiki',
    'boss guide',
    'map',
    'quests',
    'gear',
    'puzzles',
    'Kliff',
    'Pywel',
  ],
  heroImage: '/images/hero.webp',
  logoImage: '/android-chrome-512x512.png',
  social: {
    xHandle: '@CrimsonDesert_',
  },
  media: {
    youtubeVideoId: 'VWIw_f8e9Pg',
    youtubeTitle: 'CRIMSON DESERT | Official Launch Trailer',
  },
  links: {
    officialSite: 'https://crimsondesert.pearlabyss.com/en-US/Main',
    announcements: 'https://crimsondesert.pearlabyss.com/en-US/News/Notice',
    media: 'https://crimsondesert.pearlabyss.com/en-US/Media',
    youtubeChannel: 'https://www.youtube.com/channel/UCtwZImFOBRy7iNj1EQC4YXA',
    youtubeTrailer: 'https://www.youtube.com/watch?v=VWIw_f8e9Pg',
    x: 'https://x.com/CrimsonDesert_',
    discord: 'https://discord.gg/crimsondesert',
    reddit: 'https://www.reddit.com/r/CrimsonDesert/',
  },
  ctas: {
    heroPrimary: 'Visit Official Site',
    heroSecondary: 'Join Official Discord',
    sectionPrimary: 'Watch on YouTube',
    sectionSecondary: 'Follow on X',
    navPrimary: 'Official Site',
    footerPrimary: 'Official Site',
    footerSecondary: 'Official Discord',
    footerTertiary: 'Reddit Community',
  },
  copy: {
    heroBadge: 'Open-World Action Adventure',
    heroDescription:
      "Track bosses, quests, map routes, puzzle solutions, gear upgrades, and patch changes for Kliff's journey across the continent of Pywel.",
    gameFeatureTitle: 'Official Launch Trailer',
    gameFeatureDescription:
      'Watch the latest official Crimson Desert trailer and follow the current media push, community channels, and update cadence from Pearl Abyss.',
    ctaTitle: 'Keep Tracking Crimson Desert',
    ctaDescription:
      'Use the official trailer, X feed, and community channels alongside this wiki to stay current on bosses, maps, quests, and patch updates.',
    stats: [
      { value: '3M', label: 'Wishlists' },
      { value: '8', label: 'Launch Platforms' },
      { value: '14', label: 'UI Languages' },
      { value: '1.00.02', label: 'Latest Patch' },
    ],
  },
  legal: {
    updatedAt: 'March 20, 2026',
    emails: {
      general: 'contact@crimsondesertwiki.wiki',
      support: 'support@crimsondesertwiki.wiki',
      privacy: 'privacy@crimsondesertwiki.wiki',
      legal: 'legal@crimsondesertwiki.wiki',
      copyright: 'copyright@crimsondesertwiki.wiki',
      dmca: 'dmca@crimsondesertwiki.wiki',
      contribute: 'contribute@crimsondesertwiki.wiki',
      partnerships: 'partnerships@crimsondesertwiki.wiki',
    },
  },
} as const

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
}

export function toAbsoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl
  }

  const siteUrl = getSiteUrl()
  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${siteUrl}${normalizedPath}`
}

export function buildTitle(title?: string) {
  return title ? `${title} | ${SITE.name}` : SITE.defaultTitle
}
