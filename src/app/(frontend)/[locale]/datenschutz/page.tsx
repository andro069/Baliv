import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navigation } from '@/components/Navigation'
import { PageFooter } from '@/components/PageFooter'
import { Rechtstext, type RechtstextAbschnitt } from '@/components/Rechtstext'
import { datenschutzDefaults as D } from '@/globals/Rechtstexte/config'
import { defaultLocale, isLocale, type Locale } from '@/i18n/config'
import { seitenLocale, seitenMetadata } from '@/i18n/server'
import { text } from '@/i18n/format'

async function lade(locale: Locale) {
  try {
    const payload = await getPayload({ config })
    return (await payload.findGlobal({ slug: 'datenschutz-page', locale, depth: 0 } as any)) as any
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: roh } = await params
  const locale = isLocale(roh) ? roh : defaultLocale
  const cms = await lade(locale)
  return seitenMetadata({
    seite: 'datenschutz',
    locale,
    title: text(cms?.meta?.title, D.metaTitle),
    description: text(cms?.meta?.description, D.metaDescription),
  })
}

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await seitenLocale(params)
  const cms = await lade(locale)

  const abschnitte: RechtstextAbschnitt[] = cms?.abschnitte?.length ? cms.abschnitte : D.abschnitte

  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />

      <Rechtstext
        eyebrow={text(cms?.eyebrow, D.eyebrow)}
        headline={text(cms?.headline, D.headline)}
        stand={text(cms?.stand, D.stand ?? '')}
        abschnitte={abschnitte}
        inhaltClassName="space-y-10 text-[#151E39]/80 leading-relaxed text-sm"
      />

      <PageFooter />
    </main>
  )
}
