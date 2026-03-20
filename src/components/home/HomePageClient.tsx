'use client'

import { useEffect, Suspense, lazy } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Compass,
  Map,
  MessageCircle,
  PlayCircle,
  Shield,
  Sparkles,
  Swords,
  Users,
} from 'lucide-react'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { VideoFeature } from '@/components/home/VideoFeature'
import { SITE, getSiteUrl, toAbsoluteUrl } from '@/config/site'

const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse flex items-center justify-center`}>
    <div className="text-muted-foreground">Preparing content</div>
  </div>
)

const resourceCards = [
  {
    icon: Swords,
    title: 'Boss Guides',
    description: 'Track encounter mechanics, preparation notes, and phase-specific tips for major fights.',
  },
  {
    icon: BookOpen,
    title: 'Quest Walkthroughs',
    description: 'Follow main story, side quests, and objective routes with fewer dead ends.',
  },
  {
    icon: Map,
    title: 'Map & Routes',
    description: 'Find regions, landmarks, and efficient paths across the world of Pywel.',
  },
  {
    icon: Shield,
    title: 'Gear & Builds',
    description: 'Review gear priorities, upgrade paths, and combat-ready equipment notes.',
  },
  {
    icon: Compass,
    title: 'Puzzles & Secrets',
    description: 'Solve environmental puzzles faster and uncover hidden objectives or treasure paths.',
  },
  {
    icon: Users,
    title: 'Characters & Factions',
    description: 'Browse key characters, story factions, and recurring names worth tracking.',
  },
] as const

const officialLinks = [
  {
    label: 'Official Site',
    href: SITE.links.officialSite,
    description: 'Visit the main Crimson Desert destination from Pearl Abyss.',
  },
  {
    label: 'Announcements',
    href: SITE.links.announcements,
    description: 'Check the latest official notices and updates.',
  },
  {
    label: 'Media Library',
    href: SITE.links.media,
    description: 'Browse official screenshots, trailers, and promotional media.',
  },
  {
    label: 'YouTube',
    href: SITE.links.youtubeChannel,
    description: 'Watch official trailers and feature videos.',
  },
  {
    label: 'Discord',
    href: SITE.links.discord,
    description: 'Join the official community server.',
  },
  {
    label: 'Reddit',
    href: SITE.links.reddit,
    description: 'Follow community discussions and shared discoveries.',
  },
] as const

export default function HomePageClient() {
  const siteUrl = getSiteUrl()
  const heroImageUrl = toAbsoluteUrl(SITE.heroImage)

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE.name,
        description: SITE.defaultDescription,
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: SITE.name,
        alternateName: SITE.shortName,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: toAbsoluteUrl(SITE.logoImage),
        },
        image: {
          '@type': 'ImageObject',
          url: heroImageUrl,
        },
        sameAs: [
          SITE.links.officialSite,
          SITE.links.youtubeChannel,
          SITE.links.x,
          SITE.links.discord,
          SITE.links.reddit,
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: SITE.defaultTitle,
        description: SITE.defaultDescription,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: heroImageUrl,
        },
      },
    ],
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((element) => {
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative pt-12 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--nav-theme)/0.12)] to-transparent" />

        <div className="container mx-auto text-center relative z-10">
          <div className="scroll-reveal inline-flex items-center space-x-2 px-4 py-2 bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.3)] rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
            <span className="text-sm text-muted-foreground">{SITE.copy.heroBadge}</span>
          </div>

          <h1 className="scroll-reveal text-5xl md:text-7xl font-bold mb-6">{SITE.name}</h1>

          <p className="scroll-reveal text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            {SITE.copy.heroDescription}
          </p>

          <div className="scroll-reveal flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href={SITE.links.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white px-8 py-6 text-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              {SITE.ctas.heroPrimary}
            </a>
            <a
              href={SITE.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-border hover:bg-white/10 px-8 py-6 text-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {SITE.ctas.heroSecondary}
            </a>
          </div>

          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats
              stats={[...SITE.copy.stats]}
            />
          </Suspense>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId={SITE.media.youtubeVideoId}
              title={SITE.media.youtubeTitle}
              posterImage={SITE.heroImage}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{SITE.copy.gameFeatureTitle}</h2>
              <p className="text-muted-foreground max-w-2xl">{SITE.copy.gameFeatureDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="py-8">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold mb-4">
              {SITE.shortName} <span className="text-[hsl(var(--nav-theme-light))]">Resources</span>
            </h2>
            <p className="scroll-reveal text-muted-foreground text-lg">
              Quick entry points for the topics players care about most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {resourceCards.map((card) => {
              const Icon = card.icon

              return (
                <div
                  key={card.title}
                  className="scroll-reveal p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition"
                >
                  <Icon className="w-10 h-10 text-[hsl(var(--nav-theme-light))] mb-4" />
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="py-8">
        <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} />
      </div>

      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="scroll-reveal text-4xl md:text-5xl font-bold mb-4">
              Official <span className="text-[hsl(var(--nav-theme-light))]">Links</span>
            </h2>
            <p className="scroll-reveal text-muted-foreground text-lg">
              Jump straight to publisher resources, media, and community channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {officialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="scroll-reveal p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] hover:bg-white/10 transition"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold">{link.label}</h3>
                  <ArrowRight className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                </div>
                <p className="text-muted-foreground">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="py-8">
        <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />
      </div>

      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="scroll-reveal p-8 rounded-2xl bg-white/5 border border-border">
              <h2 className="text-3xl font-bold mb-4">Why This Wiki Exists</h2>
              <p className="text-muted-foreground mb-6">
                {SITE.name} is built for players who want a fast reference layer around official media,
                community channels, patch context, and gameplay-focused guides.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Focused on bosses, quests, puzzles, map routes, and gear progression.</li>
                <li>Designed to complement official announcements instead of replacing them.</li>
                <li>Keeps key links to the official site, trailer, Discord, X, and Reddit in one place.</li>
              </ul>
            </div>

            <div className="scroll-reveal p-8 rounded-2xl bg-white/5 border border-border">
              <h2 className="text-3xl font-bold mb-4">Next Stops</h2>
              <div className="space-y-4">
                <a
                  href={SITE.links.youtubeTrailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-background/60 border border-border hover:border-[hsl(var(--nav-theme)/0.5)] transition"
                >
                  <div>
                    <div className="font-semibold">Official Launch Trailer</div>
                    <div className="text-sm text-muted-foreground">Watch the current featured video on YouTube.</div>
                  </div>
                  <PlayCircle className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
                </a>
                <a
                  href={SITE.links.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-background/60 border border-border hover:border-[hsl(var(--nav-theme)/0.5)] transition"
                >
                  <div>
                    <div className="font-semibold">Official X Updates</div>
                    <div className="text-sm text-muted-foreground">Track launch timing, wishlists, and news posts.</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={SITE.copy.ctaTitle}
          description={SITE.copy.ctaDescription}
          primaryLabel={SITE.ctas.sectionPrimary}
          secondaryLabel={SITE.ctas.sectionSecondary}
        />
      </Suspense>

      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">{SITE.shortName}</h3>
              <p className="text-sm text-muted-foreground mb-4">{SITE.defaultDescription}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    About
                  </Link>
                </li>
                <li>
                  <a href={SITE.links.announcements} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    Official Announcements
                  </a>
                </li>
                <li>
                  <a href={SITE.links.media} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    Media Library
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={SITE.links.discord} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {SITE.ctas.footerSecondary}
                  </a>
                </li>
                <li>
                  <a href={SITE.links.reddit} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {SITE.ctas.footerTertiary}
                  </a>
                </li>
                <li>
                  <a href={SITE.links.officialSite} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {SITE.ctas.footerPrimary}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy-policy" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/copyright" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    Copyright
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2026 {SITE.name}. Unofficial fan site and not affiliated with Pearl Abyss.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
