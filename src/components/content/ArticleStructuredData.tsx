import type { ContentFrontmatter, ContentType } from '@/lib/content'
import { SITE, getSiteUrl, toAbsoluteUrl } from '@/config/site'

interface ArticleStructuredDataProps {
	frontmatter: ContentFrontmatter
	contentType: ContentType
	locale: string
	slug: string
}

export function ArticleStructuredData({
	frontmatter,
	contentType,
	locale,
	slug,
}: ArticleStructuredDataProps) {
	const siteUrl = getSiteUrl()
	const articleUrl =
		locale === 'en'
			? `${siteUrl}/${contentType}/${slug}`
			: `${siteUrl}/${locale}/${contentType}/${slug}`
  const imageUrl = frontmatter.image ? toAbsoluteUrl(frontmatter.image) : toAbsoluteUrl(SITE.heroImage)

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
    '@id': `${articleUrl}#article`,
    url: articleUrl,
		headline: frontmatter.title,
		description: frontmatter.description,
		image: [imageUrl],
		datePublished: frontmatter.date,
		dateModified: ('lastModified' in frontmatter && frontmatter.lastModified) || frontmatter.date,
		author: {
			'@type': 'Organization',
			name: `${SITE.shortName} Wiki Team`,
		},
		publisher: {
			'@type': 'Organization',
			name: SITE.name,
			logo: {
				'@type': 'ImageObject',
				url: toAbsoluteUrl(SITE.logoImage),
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': articleUrl,
		},
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	)
}
