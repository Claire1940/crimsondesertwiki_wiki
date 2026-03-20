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
  const path = '/privacy-policy'
  const imageUrl = toAbsoluteUrl(SITE.heroImage)

  return {
    title: `Privacy Policy | ${SITE.name}`,
    description: `Read the privacy policy for ${SITE.name}, including analytics, cookies, external links, and contact details for privacy requests.`,
    keywords: [
      'Crimson Desert Wiki privacy policy',
      'Crimson Desert privacy',
      'cookies policy',
      'analytics disclosure',
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
      title: `Privacy Policy | ${SITE.name}`,
      description: `Learn how ${SITE.name} handles analytics, cookies, and privacy requests.`,
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
      title: `Privacy Policy | ${SITE.name}`,
      description: `Learn how ${SITE.name} handles analytics, cookies, and privacy requests.`,
      images: [imageUrl],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-300 text-lg mb-2">
            How {SITE.name} collects, uses, and protects limited visitor data.
          </p>
          <p className="text-slate-400 text-sm">Last Updated: {SITE.legal.updatedAt}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <p>
              {SITE.name} is an unofficial fan-made website focused on guides and reference content for{' '}
              <strong>{SITE.shortName}</strong>. We collect minimal information needed to operate the site,
              measure traffic, and improve content quality.
            </p>

            <h2>1. Information We Collect</h2>
            <ul>
              <li>Basic device and browser information collected through analytics tools.</li>
              <li>Pages visited, session duration, and general referral information.</li>
              <li>Language and theme preferences stored in your browser for site usability.</li>
            </ul>

            <h2>2. How We Use Information</h2>
            <ul>
              <li>To understand which guides and wiki pages are most useful to visitors.</li>
              <li>To monitor site performance, fix issues, and improve navigation.</li>
              <li>To protect the site against abuse, spam, and malicious activity.</li>
            </ul>

            <h2>3. Cookies and Analytics</h2>
            <p>
              We may use cookies or similar browser storage for analytics, language settings, and theme
              preferences. Our analytics providers may process anonymized or aggregated usage data. You can
              disable cookies in your browser, but some site preferences may stop working correctly.
            </p>

            <h2>4. External Links</h2>
            <p>
              The site links to third-party services including the official {SITE.shortName} website, YouTube,
              Discord, X, Reddit, and other publisher-controlled destinations. We are not responsible for the
              privacy practices of those external services.
            </p>

            <h2>5. Data Sharing</h2>
            <p>
              We do not sell personal information. Data may be processed by infrastructure, analytics, or
              security providers strictly as needed to operate the website.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              Analytics and operational logs are retained only as long as reasonably necessary for reporting,
              security, troubleshooting, and legal compliance.
            </p>

            <h2>7. Children&apos;s Privacy</h2>
            <p>
              {SITE.name} is intended for a general audience. We do not knowingly collect personal information
              from children. If you believe a child submitted personal data to us, contact us and we will review
              the request promptly.
            </p>

            <h2>8. Policy Changes</h2>
            <p>
              We may update this policy when the website, providers, or legal requirements change. The updated
              date at the top of this page will reflect the latest revision.
            </p>

            <h2>9. Contact</h2>
            <p>
              Privacy requests or questions can be sent to{' '}
              <a href={`mailto:${SITE.legal.emails.privacy}`} className="text-[hsl(var(--nav-theme-light))] hover:underline">
                {SITE.legal.emails.privacy}
              </a>
              .
            </p>

            <p className="pt-6">
              <Link href="/about" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                Learn more about {SITE.name}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
