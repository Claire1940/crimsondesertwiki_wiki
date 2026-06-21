import type { Metadata } from 'next'
import { getMessages, setRequestLocale } from 'next-intl/server'
import {
  ArrowRight,
  Axe,
  Bug,
  CheckCircle2,
  ChefHat,
  Clapperboard,
  Compass,
  ExternalLink,
  Flag,
  Footprints,
  Map,
  MonitorCog,
  Package,
  ScrollText,
  Skull,
  Sparkles,
  Swords,
  Tent,
  Users,
  WifiOff,
  type LucideIcon,
} from 'lucide-react'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { routing, type Locale } from '@/i18n/routing'
import { SITE, buildTitle, getSiteUrl, toAbsoluteUrl } from '@/config/site'

interface PageProps {
  params: Promise<{ locale: string }>
}

type HeroStat = {
  value: string
  label: string
}

type ModuleCard = {
  title: string
  value: string
  detail: string
}

type ModulePanel = {
  title: string
  subtitle?: string
  details: string[]
}

type ModuleItem = {
  title: string
  detail: string
  meta?: string
  tag?: string
}

type ModuleLayout =
  | 'facts'
  | 'timeline'
  | 'steps'
  | 'story'
  | 'profiles'
  | 'regions'
  | 'guide'
  | 'weapons'
  | 'bosses'
  | 'qa'
  | 'specs'
  | 'patches'
  | 'comparison'
  | 'editions'

type IconName =
  | 'Flag'
  | 'Clapperboard'
  | 'Footprints'
  | 'ScrollText'
  | 'Users'
  | 'Map'
  | 'Swords'
  | 'Axe'
  | 'Skull'
  | 'WifiOff'
  | 'MonitorCog'
  | 'Package'
  | 'ChefHat'
  | 'Tent'
  | 'Compass'
  | 'Bug'

type HomepageModule = {
  id: string
  icon: IconName
  layout: ModuleLayout
  title: string
  summary: string
  cards?: ModuleCard[]
  panels?: ModulePanel[]
  items?: ModuleItem[]
  note: string
  ctaLabel: string
  ctaHref: string
}

type HomepageMessages = {
  hero: {
    badge: string
    title: string
    description: string
    helper: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
    stats: HeroStat[]
    highlights: string[]
  }
  video: {
    eyebrow: string
    title: string
    description: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
  }
  moduleNav: {
    title: string
    subtitle: string
  }
  modules: HomepageModule[]
  faq: {
    title: string
    subtitle: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  resources: {
    title: string
    subtitle: string
    items: Array<{
      label: string
      description: string
      href: string
    }>
  }
  cta: {
    title: string
    description: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
  }
}

type RootMessages = {
  homepage: HomepageMessages
}

const moduleIcons: Record<IconName, LucideIcon> = {
  Flag,
  Clapperboard,
  Footprints,
  ScrollText,
  Users,
  Map,
  Swords,
  Axe,
  Skull,
  WifiOff,
  MonitorCog,
  Package,
  ChefHat,
  Tent,
  Compass,
  Bug,
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const siteUrl = getSiteUrl()
  const canonical = locale === routing.defaultLocale ? '/' : `/${locale}`
  const imageUrl = toAbsoluteUrl(SITE.heroImage)

  return {
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    keywords: [...SITE.defaultKeywords],
    alternates: buildLanguageAlternates(canonical, locale as Locale, siteUrl),
    openGraph: {
      type: 'website',
      locale,
      url: locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
      siteName: SITE.name,
      title: buildTitle(SITE.shortName),
      description: SITE.defaultDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: buildTitle(SITE.shortName),
      description: SITE.defaultDescription,
      images: [imageUrl],
      creator: SITE.social.xHandle,
    },
  }
}

function renderTimelineItems(items: ModuleItem[], numbered = false) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={`${item.title}-${index + 1}`}
          className="rounded-2xl border border-[hsl(var(--nav-theme)/0.18)] bg-background/90 p-5 shadow-[0_24px_60px_-40px_hsl(var(--nav-theme)/0.45)]"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--nav-theme)/0.28)] bg-[hsl(var(--nav-theme)/0.12)] text-sm font-semibold text-[hsl(var(--nav-theme-light))]">
              {numbered ? index + 1 : item.meta || index + 1}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                {item.meta && !numbered ? (
                  <span className="rounded-full border border-[hsl(var(--nav-theme)/0.22)] px-2.5 py-1 text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                    {item.meta}
                  </span>
                ) : null}
              </div>
              <p className="text-sm leading-7 text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function renderCardGrid(cards: ModuleCard[], compact = false) {
  return (
    <div className={`grid gap-4 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 xl:grid-cols-4'}`}>
      {cards.map((card) => (
        <div
          key={`${card.title}-${card.value}`}
          className="rounded-2xl border border-[hsl(var(--nav-theme)/0.18)] bg-background/90 p-5 shadow-[0_24px_60px_-40px_hsl(var(--nav-theme)/0.45)]"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--nav-theme-light))]">
            {card.title}
          </div>
          <div className="mt-3 text-2xl font-semibold text-foreground">{card.value}</div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.detail}</p>
        </div>
      ))}
    </div>
  )
}

function renderFeatureItems(items: ModuleItem[]) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div
          key={`${item.title}-${item.tag ?? item.detail}`}
          className="rounded-2xl border border-[hsl(var(--nav-theme)/0.18)] bg-background/90 p-5 shadow-[0_24px_60px_-40px_hsl(var(--nav-theme)/0.45)]"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            {item.tag ? (
              <span className="rounded-full border border-[hsl(var(--nav-theme)/0.22)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[hsl(var(--nav-theme-light))]">
                {item.tag}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}

function renderPanelCards(panels: ModulePanel[], emphasize = false) {
  return (
    <div className={`grid gap-4 ${emphasize ? 'lg:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-4'}`}>
      {panels.map((panel) => (
        <article
          key={`${panel.title}-${panel.subtitle ?? 'panel'}`}
          className="rounded-2xl border border-[hsl(var(--nav-theme)/0.18)] bg-background/90 p-5 shadow-[0_24px_60px_-40px_hsl(var(--nav-theme)/0.45)]"
        >
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">{panel.title}</h3>
              {panel.subtitle ? (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--nav-theme-light))]">
                  {panel.subtitle}
                </p>
              ) : null}
            </div>
            <ul className="space-y-2">
              {panel.details.map((detail, index) => (
                <li key={`${panel.title}-${index + 1}`} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--nav-theme-light))]" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  )
}

function renderPillItems(items: ModuleItem[]) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-full border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.08)] px-4 py-3"
        >
          <div className="text-sm font-medium text-foreground">{item.title}</div>
          <div className="text-xs text-muted-foreground">{item.detail}</div>
        </div>
      ))}
    </div>
  )
}

function renderSectionBody(module: HomepageModule) {
  switch (module.layout) {
    case 'facts':
      return (
        <div className="space-y-6">
          {module.cards ? renderCardGrid(module.cards) : null}
          {module.items ? renderPillItems(module.items) : null}
        </div>
      )
    case 'timeline':
    case 'story':
    case 'patches':
      return (
        <div className="space-y-6">
          {module.items ? renderTimelineItems(module.items) : null}
          {module.cards ? renderCardGrid(module.cards, true) : null}
        </div>
      )
    case 'steps':
      return module.items ? renderTimelineItems(module.items, true) : null
    case 'qa':
      return (
        <div className="space-y-6">
          {module.cards ? renderCardGrid(module.cards) : null}
          {module.panels ? renderPanelCards(module.panels) : null}
        </div>
      )
    case 'specs':
      return (
        <div className="space-y-6">
          {module.cards ? renderCardGrid(module.cards) : null}
          {module.panels ? renderPanelCards(module.panels, true) : null}
          {module.items ? renderPillItems(module.items) : null}
        </div>
      )
    case 'comparison':
      return (
        <div className="space-y-6">
          {module.cards ? renderCardGrid(module.cards) : null}
          {module.panels ? renderPanelCards(module.panels, true) : null}
        </div>
      )
    case 'editions':
      return (
        <div className="space-y-6">
          {module.cards ? renderCardGrid(module.cards, true) : null}
          {module.panels ? renderPanelCards(module.panels, true) : null}
        </div>
      )
    case 'profiles':
    case 'regions':
    case 'guide':
    case 'weapons':
    case 'bosses':
      return (
        <div className="space-y-6">
          {module.cards ? renderCardGrid(module.cards, true) : null}
          {module.panels ? renderPanelCards(module.panels, true) : null}
          {module.items ? renderFeatureItems(module.items) : null}
        </div>
      )
    default:
      return null
  }
}

function renderModuleSection(module: HomepageModule, index: number) {
  const Icon = moduleIcons[module.icon]

  return (
    <section id={module.id} key={module.id} className="scroll-mt-28">
      <div className="rounded-[28px] border border-[hsl(var(--nav-theme)/0.18)] bg-[linear-gradient(180deg,hsl(var(--nav-theme)/0.12),transparent_32%),linear-gradient(135deg,hsl(var(--nav-theme-light)/0.08),transparent_55%)] p-6 md:p-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.75fr)]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.24)] bg-[hsl(var(--nav-theme)/0.14)]">
                <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--nav-theme-light))]">
                  Module {String(index + 1).padStart(2, '0')}
                </div>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {module.title}
                </h2>
              </div>
            </div>

            <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
              {module.summary}
            </p>

            {renderSectionBody(module)}
          </div>

          <aside className="rounded-[24px] border border-[hsl(var(--nav-theme)/0.18)] bg-background/85 p-6 shadow-[0_30px_80px_-50px_hsl(var(--nav-theme)/0.6)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
              <CheckCircle2 className="h-4 w-4" />
              Homepage Focus
            </div>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">{module.note}</p>

            <a
              href={module.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[hsl(var(--nav-theme))] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[hsl(var(--nav-theme)/0.92)]"
            >
              {module.ctaLabel}
              <ExternalLink className="h-4 w-4" />
            </a>

            <div className="mt-6 rounded-2xl border border-[hsl(var(--nav-theme)/0.16)] bg-[hsl(var(--nav-theme)/0.06)] p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                SEO Naming
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Every module headline keeps the full <span className="font-medium text-foreground">Crimson Desert</span>{' '}
                prefix so the page stays semantically consistent and easier to scan.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = (await getMessages()) as unknown as RootMessages
  const homepage = messages.homepage
  const siteUrl = getSiteUrl()
  const heroImageUrl = toAbsoluteUrl(SITE.heroImage)
  const moduleGroups = homepage.modules.reduce<HomepageModule[][]>((groups, module, index) => {
    if (index % 4 === 0) {
      groups.push([])
    }
    groups[groups.length - 1].push(module)
    return groups
  }, [])
  const moduleSectionAds = [
    {
      type: 'banner-320x50' as const,
      adKey: process.env.NEXT_PUBLIC_AD_MOBILE_320X50,
    },
    {
      type: 'banner-468x60' as const,
      adKey: process.env.NEXT_PUBLIC_AD_BANNER_468X60,
    },
    {
      type: 'banner-300x250' as const,
      adKey: process.env.NEXT_PUBLIC_AD_BANNER_300X250,
    },
  ]

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
      {
        '@type': 'VideoObject',
        '@id': `${siteUrl}/#launch-trailer`,
        name: SITE.media.youtubeTitle,
        embedUrl: `https://www.youtube.com/embed/${SITE.media.youtubeVideoId}`,
        contentUrl: SITE.links.youtubeTrailer,
        thumbnailUrl: heroImageUrl,
        description: homepage.video.description,
        uploadDate: SITE.media.youtubeUploadDate,
        duration: SITE.media.youtubeDuration,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden border-b border-[hsl(var(--nav-theme)/0.14)]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, hsl(var(--background) / 0.28) 0%, hsl(var(--background) / 0.88) 62%, hsl(var(--background)) 100%), linear-gradient(135deg, hsl(var(--nav-theme) / 0.34), transparent 50%), url(${SITE.heroImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--nav-theme-light)/0.16),_transparent_42%)]" />

        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:items-end">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.24)] bg-[hsl(var(--nav-theme)/0.12)] px-4 py-2 text-sm font-medium text-foreground backdrop-blur">
                <Sparkles className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                {homepage.hero.badge}
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
                  {homepage.hero.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-foreground/86 md:text-xl">
                  {homepage.hero.description}
                </p>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                  {homepage.hero.helper}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={homepage.hero.primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[hsl(var(--nav-theme))] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[hsl(var(--nav-theme)/0.92)]"
                >
                  {homepage.hero.primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={homepage.hero.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[hsl(var(--nav-theme)/0.24)] bg-background/70 px-6 py-4 text-sm font-semibold text-foreground transition hover:border-[hsl(var(--nav-theme)/0.34)] hover:bg-[hsl(var(--nav-theme)/0.08)]"
                >
                  {homepage.hero.secondaryLabel}
                  <ExternalLink className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                {homepage.hero.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-full border border-[hsl(var(--nav-theme)/0.2)] bg-background/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[hsl(var(--nav-theme)/0.18)] bg-background/78 p-6 shadow-[0_40px_120px_-60px_hsl(var(--nav-theme)/0.65)] backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--nav-theme-light))]">
                Launch Snapshot
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {homepage.hero.stats.map((stat) => (
                  <div
                    key={`${stat.label}-${stat.value}`}
                    className="rounded-2xl border border-[hsl(var(--nav-theme)/0.18)] bg-[hsl(var(--nav-theme)/0.06)] p-4"
                  >
                    <div className="text-xl font-semibold text-foreground">{stat.value}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[hsl(var(--nav-theme)/0.16)] bg-background/80 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                  Homepage Structure
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  The trailer sits above a jump navigation so visitors can watch first, then move directly into
                  release info, story, combat, regions, bosses, and patch tracking without leaving the page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      <section className="px-4 py-14 md:py-20">
        <div className="container mx-auto">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)] xl:items-stretch">
            <div className="overflow-hidden rounded-[30px] border border-[hsl(var(--nav-theme)/0.18)] bg-background shadow-[0_45px_120px_-70px_hsl(var(--nav-theme)/0.7)]">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${SITE.media.youtubeVideoId}`}
                  title={SITE.media.youtubeTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="rounded-[30px] border border-[hsl(var(--nav-theme)/0.18)] bg-[linear-gradient(180deg,hsl(var(--nav-theme)/0.12),transparent_36%)] p-6 md:p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--nav-theme-light))]">
                {homepage.video.eyebrow}
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {homepage.video.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                {homepage.video.description}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={homepage.video.primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between rounded-2xl border border-[hsl(var(--nav-theme)/0.2)] bg-background/80 px-5 py-4 text-sm font-semibold text-foreground transition hover:border-[hsl(var(--nav-theme)/0.34)]"
                >
                  <span>{homepage.video.primaryLabel}</span>
                  <ExternalLink className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                </a>
                <a
                  href={homepage.video.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between rounded-2xl border border-[hsl(var(--nav-theme)/0.2)] bg-background/80 px-5 py-4 text-sm font-semibold text-foreground transition hover:border-[hsl(var(--nav-theme)/0.34)]"
                >
                  <span>{homepage.video.secondaryLabel}</span>
                  <ExternalLink className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-[hsl(var(--nav-theme)/0.16)] bg-[hsl(var(--nav-theme)/0.06)] p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))]">
                  Why This Order Works
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  The trailer gives visitors immediate context. The jump navigation beneath it then converts that
                  curiosity into deeper reading across the rest of the homepage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="container mx-auto">
          <div className="rounded-[30px] border border-[hsl(var(--nav-theme)/0.18)] bg-[linear-gradient(180deg,hsl(var(--nav-theme)/0.12),transparent_40%)] p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--nav-theme-light))]">
                  Jump Navigation
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {homepage.moduleNav.title}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                {homepage.moduleNav.subtitle}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {homepage.modules.map((module) => {
                const Icon = moduleIcons[module.icon]

                return (
                  <a
                    key={module.id}
                    href={`#${module.id}`}
                    className="group rounded-2xl border border-[hsl(var(--nav-theme)/0.18)] bg-background/88 p-4 transition hover:border-[hsl(var(--nav-theme)/0.34)] hover:bg-[hsl(var(--nav-theme)/0.07)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[hsl(var(--nav-theme)/0.22)] bg-[hsl(var(--nav-theme)/0.1)]">
                        <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-[hsl(var(--nav-theme-light))] transition group-hover:translate-x-0.5" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold leading-6 text-foreground">{module.title}</h3>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {moduleGroups.map((group, groupIndex) => {
        const adSlot = moduleSectionAds[Math.min(groupIndex, moduleSectionAds.length - 1)]
        const moduleStartIndex = groupIndex * 4

        return (
          <div key={`homepage-group-${groupIndex + 1}`}>
            <div className="px-4 py-8">
              <AdBanner type={adSlot.type} adKey={adSlot.adKey} />
            </div>

            <section className="px-4 py-6">
              <div className="container mx-auto space-y-8">
                {group.map((module, moduleIndex) =>
                  renderModuleSection(module, moduleStartIndex + moduleIndex)
                )}
              </div>
            </section>
          </div>
        )
      })}

      <section className="px-4 py-16 md:py-20">
        <div className="container mx-auto">
          <div className="rounded-[30px] border border-[hsl(var(--nav-theme)/0.18)] bg-[linear-gradient(180deg,hsl(var(--nav-theme)/0.12),transparent_45%)] p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--nav-theme-light))]">
                  FAQ
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {homepage.faq.title}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                {homepage.faq.subtitle}
              </p>
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-2">
              {homepage.faq.items.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-[hsl(var(--nav-theme)/0.18)] bg-background/92 p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-foreground">
                    <span>{item.question}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[hsl(var(--nav-theme-light))] transition group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="container mx-auto">
          <div className="rounded-[30px] border border-[hsl(var(--nav-theme)/0.18)] bg-[linear-gradient(180deg,hsl(var(--nav-theme)/0.12),transparent_45%)] p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--nav-theme-light))]">
                  External Links
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {homepage.resources.title}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                {homepage.resources.subtitle}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {homepage.resources.items.map((resource) => (
                <a
                  key={resource.label}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-[hsl(var(--nav-theme)/0.18)] bg-background/92 p-5 transition hover:border-[hsl(var(--nav-theme)/0.34)] hover:bg-[hsl(var(--nav-theme)/0.07)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{resource.label}</h3>
                    <ExternalLink className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="rounded-[30px] border border-[hsl(var(--nav-theme)/0.18)] bg-[linear-gradient(135deg,hsl(var(--nav-theme)/0.16),transparent_55%),linear-gradient(180deg,hsl(var(--nav-theme-light)/0.08),transparent_65%)] p-8 md:p-10">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] xl:items-center">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(var(--nav-theme-light))]">
                  Final CTA
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {homepage.cta.title}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                  {homepage.cta.description}
                </p>
              </div>

              <div className="grid gap-3">
                <a
                  href={homepage.cta.primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between rounded-2xl bg-[hsl(var(--nav-theme))] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[hsl(var(--nav-theme)/0.92)]"
                >
                  <span>{homepage.cta.primaryLabel}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={homepage.cta.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between rounded-2xl border border-[hsl(var(--nav-theme)/0.22)] bg-background/80 px-5 py-4 text-sm font-semibold text-foreground transition hover:border-[hsl(var(--nav-theme)/0.34)] hover:bg-[hsl(var(--nav-theme)/0.08)]"
                >
                  <span>{homepage.cta.secondaryLabel}</span>
                  <ExternalLink className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
