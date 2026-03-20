'use client'

import { Button } from '@/components/ui/button'
import { PlayCircle, Twitter } from 'lucide-react'
import { SITE } from '@/config/site'

interface CTASectionProps {
  title: string
  description: string
  primaryLabel: string
  secondaryLabel: string
}

export default function CTASection({ title, description, primaryLabel, secondaryLabel }: CTASectionProps) {
  return (
    <section className="px-4 py-20">
      <div className="scroll-reveal container mx-auto max-w-5xl">
        <div className="p-12 bg-gradient-to-br from-[hsl(var(--nav-theme)/0.2)] to-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] rounded-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white px-8 py-6 text-lg">
              <a
                href={SITE.links.youtubeTrailer}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                {primaryLabel}
              </a>
            </Button>
            <a
              href={SITE.links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-border hover:bg-white/10 px-8 py-6 text-lg transition-colors"
            >
              <Twitter className="w-5 h-5" />
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
