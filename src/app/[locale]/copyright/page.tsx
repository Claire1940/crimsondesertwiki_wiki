import Link from 'next/link'
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
  const path = '/copyright'
  const imageUrl = toAbsoluteUrl(SITE.heroImage)

  return {
    title: `Copyright Notice | ${SITE.name}`,
    description: `Copyright, fair use, and DMCA information for ${SITE.name}.`,
    keywords: [
      'Crimson Desert Wiki copyright',
      'DMCA policy',
      'fair use notice',
      'intellectual property',
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
      title: `Copyright Notice | ${SITE.name}`,
      description: `Copyright, fair use, and DMCA information for ${SITE.name}.`,
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
      title: `Copyright Notice | ${SITE.name}`,
      description: `Copyright, fair use, and DMCA information for ${SITE.name}.`,
      images: [imageUrl],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Copyright Notice</h1>
          <p className="text-slate-300 text-lg mb-2">
            Ownership, attribution, fair use, and takedown guidance for {SITE.name}.
          </p>
          <p className="text-slate-400 text-sm">Last Updated: {SITE.legal.updatedAt}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Site Content</h2>
            <p>
              © 2026 {SITE.name}. Original editorial text, site structure, and custom reference material are
              protected by applicable copyright law unless otherwise noted.
            </p>

            <h2>2. Game Assets and Trademarks</h2>
            <p>
              {SITE.shortName}, related logos, official screenshots, trailers, artwork, and trademarks are the
              property of Pearl Abyss and their respective owners. Their appearance on this site does not imply
              endorsement or partnership.
            </p>

            <h2>3. Fair Use Position</h2>
            <p>
              We reference limited official assets for commentary, identification, news coverage, and educational
              guide purposes. We do not claim ownership of publisher-controlled media.
            </p>

            <h2>4. Reuse of Our Content</h2>
            <ul>
              <li>Short quotations with attribution are generally acceptable.</li>
              <li>Do not republish full guides, large page sections, or copied datasets without permission.</li>
              <li>Credit should reference {SITE.name} and the original page URL.</li>
            </ul>

            <h2>5. DMCA Notices</h2>
            <p>
              If you believe material on this website infringes your copyright, send a detailed notice to{' '}
              <a href={`mailto:${SITE.legal.emails.dmca}`} className="text-[hsl(var(--nav-theme-light))] hover:underline">
                {SITE.legal.emails.dmca}
              </a>
              . Include identification of the work, the allegedly infringing material, and sufficient contact
              information for follow-up.
            </p>

            <h2>6. Counter-Notices</h2>
            <p>
              If content was removed in error, you may send a counter-notice with the relevant details and a good
              faith statement explaining why the material should be restored.
            </p>

            <h2>7. General Contact</h2>
            <p>
              Copyright and attribution questions can also be sent to{' '}
              <a href={`mailto:${SITE.legal.emails.copyright}`} className="text-[hsl(var(--nav-theme-light))] hover:underline">
                {SITE.legal.emails.copyright}
              </a>
              .
            </p>

            <p className="pt-6">
              <Link href="/terms-of-service" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                Review the terms of service
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
