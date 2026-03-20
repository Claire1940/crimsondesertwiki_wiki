import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	// 支持的语言列表：英语、葡语（巴西）、西语（拉美）、日语、韩语、俄语、德语、土耳其语
	locales: ['en', 'pt', 'es', 'ja', 'ko', 'ru', 'de', 'tr'],

	// 默认语言
	defaultLocale: 'en',

	// URL 前缀策略：默认语言无前缀
	localePrefix: 'as-needed',

	// 启用自动语言检测
	localeDetection: true,
})

// 导出类型
export type Locale = (typeof routing.locales)[number]
