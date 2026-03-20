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
  const path = '/terms-of-service'
  const imageUrl = toAbsoluteUrl(SITE.heroImage)

  return {
    title: `Terms of Service | ${SITE.name}`,
    description: `Read the terms for using ${SITE.name}, including acceptable use, intellectual property, disclaimers, and contact information.`,
    keywords: [
      'Crimson Desert Wiki terms',
      'terms of service',
      'acceptable use policy',
      'fan site disclaimer',
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
      title: `Terms of Service | ${SITE.name}`,
      description: `Terms and conditions for using ${SITE.name}.`,
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
      title: `Terms of Service | ${SITE.name}`,
      description: `Terms and conditions for using ${SITE.name}.`,
      images: [imageUrl],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300 text-lg mb-2">
            Terms and conditions for using {SITE.name}.
          </p>
          <p className="text-slate-400 text-sm">Last Updated: {SITE.legal.updatedAt}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Service Description</h2>
            <p>
              {SITE.name} is an unofficial fan-made wiki and guide site covering bosses, quests, puzzles, map
              routes, gear systems, and updates for <strong>{SITE.shortName}</strong>.
            </p>

            <h2>2. Acceptance of Terms</h2>
            <p>
              By using this website, you agree to comply with these terms and all applicable laws. If you do not
              agree, please do not use the site.
            </p>

            <h2>3. Acceptable Use</h2>
            <ul>
              <li>Do not attempt to disrupt, overload, or compromise the website.</li>
              <li>Do not scrape or republish site content at scale without permission.</li>
              <li>Do not submit unlawful, abusive, or misleading material.</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              Original text, layouts, and editorial material on {SITE.name} belong to the site unless otherwise
              stated. Game-related trademarks, logos, and assets remain the property of Pearl Abyss and their
              respective owners.
            </p>

            <h2>5. Fan Site Disclaimer</h2>
            <p>
              {SITE.name} is not affiliated with, endorsed by, or sponsored by Pearl Abyss. References to{' '}
              {SITE.shortName}, its characters, media, and related branding are used for commentary, reference,
              and informational purposes.
            </p>

            <h2>6. Accuracy and Availability</h2>
            <p>
              We aim to keep content current, but game patches, regional changes, and official announcements may
              make some information outdated. The website is provided on an &quot;as is&quot; basis without warranties.
            </p>

            <h2>7. External Services</h2>
            <p>
              The website may link to third-party destinations such as the official game website, YouTube,
              Discord, X, Reddit, and other external platforms. We are not responsible for the content or terms of
              those services.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, {SITE.name} will not be liable for indirect, incidental, or
              consequential damages arising from use of the site or reliance on its content.
            </p>

            <h2>9. Changes to These Terms</h2>
            <p>
              We may revise these terms from time to time. Continued use of the site after changes are posted means
              you accept the revised terms.
            </p>

            <h2>10. Contact</h2>
            <p>
              Legal questions can be sent to{' '}
              <a href={`mailto:${SITE.legal.emails.legal}`} className="text-[hsl(var(--nav-theme-light))] hover:underline">
                {SITE.legal.emails.legal}
              </a>
              .
            </p>

            <p className="pt-6">
              <Link href="/copyright" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                View the copyright notice
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
