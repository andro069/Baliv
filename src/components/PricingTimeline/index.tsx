import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { Locale } from '@/i18n/config'

import { PricingTimelineClient, type PreisstaffelDaten, type Preisstufe } from './Client'

/**
 * Lädt die Preisstaffelung aus dem Backend und reicht sie an die animierte
 * Client-Komponente weiter. Leere Felder fallen auf die Standardwerte zurück.
 */
export async function PricingTimeline({ locale }: { locale: Locale }) {
  let daten: Partial<PreisstaffelDaten> | undefined

  try {
    const payload = await getPayload({ config })
    const cms = (await payload.findGlobal({ slug: 'preisstaffel', locale })) as any

    const stages: Preisstufe[] = (cms?.stages ?? [])
      .filter((s: any) => s?.phase && s?.price)
      .map((s: any) => ({
        phase: s.phase,
        price: s.price,
        label: s.label ?? undefined,
        description: s.description ?? undefined,
        active: Boolean(s.active),
      }))

    const text = (v: unknown) => (typeof v === 'string' && v.trim() ? v : undefined)

    daten = Object.fromEntries(
      Object.entries({
        eyebrow: text(cms?.eyebrow),
        headlineStart: text(cms?.headlineStart),
        headlineAccent: text(cms?.headlineAccent),
        headlineEnd: text(cms?.headlineEnd),
        intro: text(cms?.intro),
        stages: stages.length ? stages : undefined,
      }).filter(([, v]) => v !== undefined),
    )
  } catch {
    daten = undefined
  }

  return <PricingTimelineClient daten={daten} />
}
