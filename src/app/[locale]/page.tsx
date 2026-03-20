import type { Metadata } from 'next'
import HomePageClient from '@/components/home/HomePageClient'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { routing, type Locale } from '@/i18n/routing'
import { SITE, buildTitle, getSiteUrl, toAbsoluteUrl } from '@/config/site'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
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

export default function HomePage() {
  return <HomePageClient />
}
