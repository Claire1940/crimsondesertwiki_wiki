import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'
import { SITE, getSiteUrl, toAbsoluteUrl } from '@/config/site'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const path = '/about'
  const imageUrl = toAbsoluteUrl(SITE.heroImage)

  return {
    title: `About ${SITE.name}`,
    description: `Learn about ${SITE.name}, an unofficial fan-made guide and reference hub for bosses, quests, maps, puzzles, gear, and patch coverage.`,
    keywords: [
      'about Crimson Desert Wiki',
      'Crimson Desert fan site',
      'Crimson Desert guides',
      'Crimson Desert community resource',
    ],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: SITE.name,
      title: `About ${SITE.name}`,
      description: `Learn what ${SITE.name} covers and how to reach the site team.`,
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
      title: `About ${SITE.name}`,
      description: `Learn what ${SITE.name} covers and how to reach the site team.`,
      images: [imageUrl],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About {SITE.name}</h1>
          <p className="text-slate-300 text-lg mb-2">
            An unofficial fan-made resource hub for exploring {SITE.shortName}.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>What This Site Covers</h2>
            <p>
              {SITE.name} is built to help players quickly find boss guides, quest routes, puzzle solutions, map
              references, gear notes, and patch context for <strong>{SITE.shortName}</strong>.
            </p>

            <h2>Editorial Focus</h2>
            <ul>
              <li>Boss encounters, combat preparation, and progression routes.</li>
              <li>Quest walkthroughs, puzzle solutions, and exploration notes for Pywel.</li>
              <li>Reference pages for gear, systems, updates, and community resources.</li>
              <li>Fast links to official announcements, trailers, and social channels.</li>
            </ul>

            <h2>Important Disclaimer</h2>
            <p>
              {SITE.name} is unofficial and independent. We are not affiliated with or endorsed by Pearl Abyss.
              Official game materials remain the property of their respective owners.
            </p>

            <h2>Official and Community Links</h2>
            <ul>
              <li>
                Official site: <a href={SITE.links.officialSite} target="_blank" rel="noopener noreferrer">{SITE.links.officialSite}</a>
              </li>
              <li>
                Announcements: <a href={SITE.links.announcements} target="_blank" rel="noopener noreferrer">{SITE.links.announcements}</a>
              </li>
              <li>
                Discord: <a href={SITE.links.discord} target="_blank" rel="noopener noreferrer">{SITE.links.discord}</a>
              </li>
              <li>
                X: <a href={SITE.links.x} target="_blank" rel="noopener noreferrer">{SITE.links.x}</a>
              </li>
              <li>
                Reddit: <a href={SITE.links.reddit} target="_blank" rel="noopener noreferrer">{SITE.links.reddit}</a>
              </li>
            </ul>

            <h2>Contact</h2>
            <ul>
              <li>
                General: <a href={`mailto:${SITE.legal.emails.general}`}>{SITE.legal.emails.general}</a>
              </li>
              <li>
                Support: <a href={`mailto:${SITE.legal.emails.support}`}>{SITE.legal.emails.support}</a>
              </li>
              <li>
                Contributions: <a href={`mailto:${SITE.legal.emails.contribute}`}>{SITE.legal.emails.contribute}</a>
              </li>
              <li>
                Partnerships: <a href={`mailto:${SITE.legal.emails.partnerships}`}>{SITE.legal.emails.partnerships}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
