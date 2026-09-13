import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { PageFooter } from '@/components/PageFooter'
import type { Media } from '@/payload-types'
import { defaultLocale, isLocale, localizeHref, type Locale } from '@/i18n/config'
import { getWebsite, seitenLocale, seitenMetadata } from '@/i18n/server'
import { formatEuro, formatZahl, text } from '@/i18n/format'

const DEFAULT_META_TITLE = 'Preise — Baliv Residence, Bar Montenegro'
const DEFAULT_META_DESCRIPTION =
  'Studio ab 75.800 €, Zweizimmer ab 116.975 €, Penthouse-Ebene ab 185.800 € inkl. MwSt. Direkt vom Bauträger, ohne Makler.'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: roh } = await params
  const locale = isLocale(roh) ? roh : defaultLocale
  let cms: any = null
  try {
    const payload = await getPayload({ config })
    cms = await payload.findGlobal({ slug: 'preise-page', locale })
  } catch {
    // Datenbank nicht erreichbar — Standardtexte verwenden.
  }
  return seitenMetadata({
    seite: 'preise',
    locale,
    title: text(cms?.meta?.title, DEFAULT_META_TITLE),
    description: text(cms?.meta?.description, DEFAULT_META_DESCRIPTION),
  })
}

const DEFAULT_WHATSAPP_NACHRICHT = 'Guten Tag, ich interessiere mich für Baliv Residence.'

/**
 * WhatsApp-Link mit der Nachricht in der jeweiligen Sprache. Die Nummer kommt aus dem
 * gepflegten Link; ist dort kein wa.me-Link hinterlegt, bleibt er unverändert.
 */
function whatsappLink(url: string | null | undefined, nachricht: string): string {
  if (url && !/wa\.me\//i.test(url)) return url
  const nummer = url?.match(/wa\.me\/(\d+)/i)?.[1] ?? '38268517873'
  return `https://wa.me/${nummer}?text=${encodeURIComponent(nachricht)}`
}

function mediaUrl(field: number | string | Media | null | undefined, fallback: string): string {
  if (!field) return fallback
  if (typeof field === 'string' || typeof field === 'number') return fallback
  return field.url ?? fallback
}

// Beträge und Flächen im Zahlenformat der jeweiligen Sprache (DE: „116.975 €“, „28,08“).
const eur = (n: number, locale: Locale) => formatEuro(Math.round(n), locale)
const zahl = (n: number, locale: Locale) => formatZahl(Math.round(n), locale)
const area = (n: number, locale: Locale) =>
  formatZahl(n, locale, {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })

type PriceType = {
  nr: string
  type: string
  tag: string
  size: string
  pricePerSqm: string
  units: string
  exampleSize: number
  examplePricePerSqm: number
  examplePrice: number
  exampleExtraNote: string
  features: string[]
  highlight: boolean
  floorplan: string
}

const defaultTypes: PriceType[] = [
  {
    nr: '01',
    type: 'Studio',
    tag: 'Erdgeschoss',
    size: '28,1–29,7 m²',
    pricePerSqm: 'ab 2.700 €/m²',
    units: '2 Einheiten',
    exampleSize: 28.08,
    examplePricePerSqm: 2700,
    examplePrice: 75800,
    exampleExtraNote: '',
    features: [
      'Wohn-/Schlafbereich kombiniert',
      'Küchenbereich',
      'Badezimmer',
      'Eigener Garten, mindestens 4 m tief',
    ],
    highlight: false,
    floorplan: '/grundriss-studio.webp',
  },
  {
    nr: '02',
    type: 'Zweizimmer',
    tag: 'Erdgeschoss bis 5. OG',
    size: '46,7–48,8 m²',
    pricePerSqm: 'ab 2.500 €/m²',
    units: '34 Einheiten',
    exampleSize: 46.79,
    examplePricePerSqm: 2500,
    examplePrice: 116975,
    exampleExtraNote: '',
    features: [
      '1 Schlafzimmer',
      'Wohn-/Essbereich',
      'Küchenbereich',
      'Badezimmer',
      'Balkon oder Terrasse',
      'Im Erdgeschoss: Terrasse und eigener Gartenanteil, mindestens 4 m tief',
    ],
    highlight: true,
    floorplan: '/grundriss-apartment.webp',
  },
  {
    nr: '03',
    type: 'Penthouse-Ebene',
    tag: '6. Obergeschoss',
    size: '51,6–81,2 m²',
    pricePerSqm: 'ab 3.600 €/m²',
    units: '3 Einheiten',
    exampleSize: 51.61,
    examplePricePerSqm: 3600,
    examplePrice: 185800,
    exampleExtraNote: 'Größte Einheit: 81,20 m² × 3.600 €/m² = 292.320 €',
    features: [
      'Zwei- und Dreizimmer',
      'Wohn-/Essbereich',
      'Küchenbereich',
      'Badezimmer',
      'Dachterrassen 38,5 / 42,9 / 65,9 m² zur alleinigen Nutzung',
      'Dachterrasse nicht Bestandteil der Wohnfläche',
      'Panoramablick auf Meer, Berge und Stari Bar',
    ],
    highlight: false,
    floorplan: '/grundriss-penthouse.webp',
  },
]

const defaultPaymentSteps = [
  {
    step: '01',
    date: '',
    label: 'Notarieller Kaufvertrag',
    amount: '40 %',
    note: 'Die Baugenehmigung liegt vor. Sie schließen direkt den notariellen Hauptvertrag, keinen Vorvertrag.',
  },
  { step: '02', date: '', label: 'Rohbau fertiggestellt', amount: '40 %', note: '' },
  { step: '03', date: '', label: 'Fertigstellung und Schlüsselübergabe', amount: '20 %', note: '' },
]

const defaultIncluded = [
  { label: 'Markenarmaturen im Bad', included: true },
  { label: 'Klimaanlage vorbereitet', included: true },
  { label: 'Naturstein-Böden', included: true },
  { label: 'Holzoberflächen', included: true },
  { label: 'Eurocode 8 Erdbebenstandard', included: true },
  { label: 'Schlüsselfertige Übergabe', included: true },
  { label: 'MwSt. inklusive', included: true },
  { label: 'Einbauküche', included: false, note: 'optional' },
  { label: 'Tiefgaragenplatz', included: false, note: 'optional' },
]

const defaultNebenkosten = [
  { label: 'Nebenkosten', value: 'ca. 1,5–2,5 %', note: 'Notar, Anwalt, Übersetzung und Grundbuch' },
  { label: 'MwSt.', value: 'enthalten', note: 'Im Kaufpreis enthalten' },
  { label: 'Maklerprovision', value: 'keine', note: 'Direktkauf vom Bauträger' },
  { label: 'Grunderwerbsteuer', value: 'entfällt', note: 'Beim Kauf vom Bauträger' },
]

// Versteht „40 %“ ebenso wie die türkische Schreibweise „%40“.
function parsePct(amount: string): number | null {
  const m = /(\d+(?:[.,]\d+)?)\s*%/.exec(amount ?? '') ?? /%\s*(\d+(?:[.,]\d+)?)/.exec(amount ?? '')
  return m ? parseFloat(m[1].replace(',', '.')) : null
}

export default async function PreisePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await seitenLocale(params)
  const payload = await getPayload({ config })
  const [cms, { ui }] = await Promise.all([
    payload.findGlobal({ slug: 'preise-page', locale }),
    getWebsite(locale),
  ])

  const num = (v: unknown, fb: number): number => {
    const n = typeof v === 'string' ? parseFloat(v) : (v as number)
    return typeof n === 'number' && Number.isFinite(n) ? n : fb
  }

  const cmsTypes: any[] = (cms as any)?.types ?? []
  const types: PriceType[] = cmsTypes.length > 0
    ? cmsTypes.map((t: any, idx: number) => ({
        nr: t.nr ?? defaultTypes[idx]?.nr ?? `0${idx + 1}`,
        type: t.type ?? defaultTypes[idx]?.type ?? '',
        tag: t.tag ?? defaultTypes[idx]?.tag ?? '',
        size: t.size ?? defaultTypes[idx]?.size ?? '',
        pricePerSqm: t.pricePerSqm ?? defaultTypes[idx]?.pricePerSqm ?? '',
        units: t.units ?? defaultTypes[idx]?.units ?? '',
        exampleSize: num(t.exampleSize, defaultTypes[idx]?.exampleSize ?? 0),
        examplePricePerSqm: num(t.examplePricePerSqm, defaultTypes[idx]?.examplePricePerSqm ?? 0),
        examplePrice: num(t.examplePrice, defaultTypes[idx]?.examplePrice ?? 0),
        exampleExtraNote: t.exampleExtraNote ?? '',
        highlight: t.highlight ?? defaultTypes[idx]?.highlight ?? false,
        floorplan: mediaUrl(t.floorplan, defaultTypes[idx]?.floorplan ?? ''),
        features: (t.features ?? []).length > 0
          ? (t.features as any[]).map((f: any) => f.label ?? '')
          : defaultTypes[idx]?.features ?? [],
      }))
    : defaultTypes

  const cmsPaymentSteps: any[] = (cms as any)?.paymentSteps ?? []
  const paymentSteps = (cmsPaymentSteps.length > 0
    ? cmsPaymentSteps.map((s: any, idx: number) => ({
        step: s.step ?? `0${idx + 1}`,
        date: s.date ?? '',
        label: s.label ?? '',
        amount: s.amount ?? '',
        note: s.note ?? '',
      }))
    : defaultPaymentSteps
  ).map((s) => ({ ...s, pct: parsePct(s.amount) }))
  const hasDates = paymentSteps.some((s) => Boolean(s.date))

  const cmsIncluded: any[] = (cms as any)?.included ?? []
  const included: { label: string; included: boolean; note?: string }[] = cmsIncluded.length > 0
    ? cmsIncluded.map((i: any) => ({
        label: i.label ?? '',
        included: i.included ?? true,
        note: i.note,
      }))
    : defaultIncluded

  const cmsNebenkosten: any[] = (cms as any)?.nebenkosten ?? []
  const nebenkosten = cmsNebenkosten.length > 0
    ? cmsNebenkosten.map((n: any) => ({
        label: n.label ?? '',
        value: n.value ?? '',
        note: n.note ?? '',
      }))
    : defaultNebenkosten

  const hero = (cms as any)?.hero ?? {}
  const typesSection = (cms as any)?.typesSection ?? {}
  const includedSection = (cms as any)?.includedSection ?? {}
  const paymentSection = (cms as any)?.paymentSection ?? {}
  const beispielSection = (cms as any)?.beispielSection ?? {}
  const cta = (cms as any)?.cta ?? {}

  const statPrefix = hero.statPrefix ?? 'ab'
  const extraCostsRate = num(beispielSection.extraCostsRate, 2) / 100

  // Beispielrechnung: Kaufpreis darf gerundet sein → dann „≈".
  // Nebenkosten = Kaufpreis × Satz, auf 10 € gerundet; Gesamt = Kaufpreis + Nebenkosten.
  const calc = (t: PriceType) => {
    const exact = t.exampleSize * t.examplePricePerSqm
    const priceApprox = t.examplePricePerSqm > 0 && Math.abs(exact - t.examplePrice) > 0.01
    const extraRaw = t.examplePrice * extraCostsRate
    const extra = Math.round(extraRaw / 10) * 10
    const extraApprox = Math.abs(extraRaw - extra) > 0.01
    return {
      priceApprox,
      extra,
      extraApprox,
      total: t.examplePrice + extra,
      totalApprox: priceApprox || extraApprox,
    }
  }
  const approx = (flag: boolean) => (flag ? '≈ ' : '')

  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#151E39] pt-32 pb-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{hero.eyebrow ?? 'Preisübersicht'}</p>
          <h1
            className="text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-3xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {(hero.headline ?? 'Transparent.\nDirekt vom Bauträger.').split('\n').map((line: string, i: number) => (
              <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
            ))}
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed">
            {hero.description ??
              'Direkt vom Bauträger, ohne Maklerprovision. Die MwSt. ist im Kaufpreis enthalten, die Nebenkosten sind unten aufgeschlüsselt.'}
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { v: `${statPrefix} ${eur(types[0]?.examplePrice ?? 75800, locale)}`, l: types[0]?.type ?? 'Studio' },
              { v: `${statPrefix} ${eur(types[1]?.examplePrice ?? 116975, locale)}`, l: types[1]?.type ?? 'Zweizimmer' },
              { v: `${statPrefix} ${eur(types[2]?.examplePrice ?? 185800, locale)}`, l: types[2]?.type ?? 'Penthouse-Ebene' },
              { v: hero.extraStatValue ?? '0 €', l: hero.extraStatLabel ?? 'Maklerprovision' },
            ].map((s) => (
              <div key={s.l} className="border border-white/10 rounded p-5">
                <div className="text-[#B69252] text-xl md:text-2xl font-light mb-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {s.v}
                </div>
                <div className="text-white/40 text-xs tracking-widest uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREISKARTEN ──────────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-3">{typesSection.eyebrow ?? 'Wohnungstypen'}</p>
          <h2
            className="text-[#151E39] text-3xl md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {typesSection.headline ?? 'Drei Typen. Drei Preise.'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {types.map((t) => {
            const c = calc(t)
            return (
              <div
                key={t.nr}
                className="relative rounded overflow-hidden flex flex-col bg-[#151E39] shadow-2xl ring-1 ring-[#B69252]/20"
              >
                {t.highlight && (
                  <div className="bg-[#B69252] text-white text-xs tracking-widest uppercase text-center py-2 px-4">
                    {typesSection.highlightLabel ?? 'Größte Auswahl'} · {t.units}
                  </div>
                )}

                {/* Grundriss */}
                <div className="relative aspect-[4/3] bg-white/5">
                  <Image
                    src={t.floorplan}
                    alt={`${ui.grundriss} ${t.type}`}
                    fill
                    className="object-contain p-6"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs tracking-widest uppercase text-[#B69252]/60">
                        {typesSection.typeLabelPrefix ?? 'Typ'} {t.nr} · {t.tag}
                      </span>
                      <h3
                        className="text-xl mt-1 text-white"
                        style={{ fontFamily: 'var(--font-playfair), serif' }}
                      >
                        {t.type}
                      </h3>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/50 whitespace-nowrap">
                      {t.units}
                    </span>
                  </div>

                  <div className="text-sm mb-1 text-white/40">{t.size}</div>
                  <div className="text-2xl font-light mb-5 text-[#B69252]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    {t.pricePerSqm}
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-[3px] flex-shrink-0">
                          <path d="M2.5 7l3 3 6-6" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm text-white/60">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Example price */}
                  <div className="rounded p-4 mb-5 bg-white/5 border border-white/10">
                    <div className="text-xs tracking-widest uppercase mb-1 text-white/30">
                      {typesSection.exampleLabel ?? 'Beispiel'} · {area(t.exampleSize, locale)} m²
                    </div>
                    <div className="text-2xl font-light text-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                      {approx(c.priceApprox)}{eur(t.examplePrice, locale)}
                    </div>
                    <div className="text-xs mt-1 text-white/20">
                      {typesSection.exampleNote ?? 'inkl. MwSt.'}
                    </div>
                  </div>

                  <Link
                    href={localizeHref(typesSection.buttonLink ?? '/kontakt', locale)}
                    className="text-center text-sm tracking-widest uppercase py-3 px-4 transition-colors bg-[#B69252] text-white hover:bg-[#a07d3f]"
                  >
                    {typesSection.buttonLabel ?? 'Exposé anfragen'}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {(typesSection.areaNote ??
          'Alle Flächen sind Netto-Nutzflächen einschließlich Terrasse. Der Preis richtet sich nach Etage und Aussicht. Die vollständige Preisliste erhalten Sie mit dem Exposé.') && (
          <p className="text-[#151E39]/50 text-sm leading-relaxed mt-8 max-w-3xl">
            {typesSection.areaNote ??
              'Alle Flächen sind Netto-Nutzflächen einschließlich Terrasse. Der Preis richtet sich nach Etage und Aussicht. Die vollständige Preisliste erhalten Sie mit dem Exposé.'}
          </p>
        )}
      </section>

      {/* ── WAS ENTHALTEN ────────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{includedSection.eyebrow ?? 'Im Kaufpreis'}</p>
              <h2
                className="text-white text-3xl md:text-5xl leading-tight mb-6"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {includedSection.headline ?? 'Was der Preis'}
                <br />
                <em className="not-italic text-[#B69252]">{includedSection.headlineAccent ?? 'beinhaltet.'}</em>
              </h2>
              <p className="text-white/50 leading-relaxed">
                {includedSection.description ??
                  'Alle Wohnungen werden schlüsselfertig übergeben. Was im Kaufpreis enthalten ist — und was optional hinzugebucht werden kann.'}
              </p>
            </div>

            <div>
              <div className="space-y-2">
                {included.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between px-5 py-3.5 rounded ${
                      item.included
                        ? 'bg-white/5 border border-white/10'
                        : 'bg-transparent border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.included ? 'bg-[#B69252]/20' : 'bg-white/5'
                      }`}>
                        {item.included ? (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M3 5h4" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.3"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${item.included ? 'text-white' : 'text-white/30'}`}>
                        {item.label}
                      </span>
                    </div>
                    {item.note && (
                      <span className="text-white/25 text-xs ml-4 flex-shrink-0">{item.note}</span>
                    )}
                    {item.included && (
                      <span className="text-[#B69252] text-xs ml-4 flex-shrink-0">{includedSection.includedLabel ?? 'inklusive'}</span>
                    )}
                  </div>
                ))}
              </div>
              {(includedSection.footnote ?? 'Ausstattung nach Baubeschreibung. Marken und Modelle im Exposé.') && (
                <p className="text-white/30 text-xs mt-4">
                  {includedSection.footnote ?? 'Ausstattung nach Baubeschreibung. Marken und Modelle im Exposé.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SO LÄUFT DER KAUF ────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-3">{paymentSection.eyebrow ?? 'Zahlungsplan'}</p>
          <h2
            className="text-[#151E39] text-3xl md:text-5xl leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {paymentSection.headline ?? 'So läuft der Kauf.'}
            <br />
            <em className="not-italic text-[#B69252]">{paymentSection.headlineAccent ?? 'Zahlung nach Baufortschritt.'}</em>
          </h2>
        </div>

        <div className="space-y-3">
          {paymentSteps.map((step, idx) => (
            <div
              key={step.step}
              className={`grid gap-4 items-center rounded p-5 ${
                hasDates
                  ? 'grid-cols-[40px_1fr_auto] md:grid-cols-[40px_80px_1fr_1fr_auto]'
                  : 'grid-cols-[40px_1fr_auto] md:grid-cols-[40px_1.4fr_1fr_auto]'
              } ${
                idx === 0 ? 'bg-[#B69252]/10 border border-[#B69252]/30' : 'bg-white border border-[#151E39]/10'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                idx === 0 ? 'bg-[#B69252] text-white' : 'bg-[#F0EDE8] text-[#151E39]/40 border border-[#151E39]/10'
              }`}>
                {step.step}
              </div>
              {hasDates && (
                <div className="hidden md:block">
                  <div className="text-[#B69252] text-xs tracking-widest uppercase">{step.date}</div>
                </div>
              )}
              <div>
                <div className="text-[#151E39] font-medium">{step.label}</div>
                {step.note && <div className="text-[#151E39]/50 text-xs mt-0.5">{step.note}</div>}
                {hasDates && step.date && (
                  <div className="text-[#B69252] text-xs mt-0.5 md:hidden">{step.date}</div>
                )}
              </div>
              {step.pct !== null ? (
                <div className="hidden md:flex items-center gap-3">
                  <div className="flex-1 bg-[#151E39]/10 rounded-full h-1.5">
                    <div
                      className="bg-[#B69252] h-1.5 rounded-full"
                      style={{ width: `${Math.min(step.pct, 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="hidden md:block" />
              )}
              <div className="text-right">
                <div className="text-[#151E39] font-medium text-lg whitespace-nowrap" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {step.amount}
                </div>
                {step.pct !== null && (
                  <div className="text-[#151E39]/30 text-xs">{paymentSection.amountNote ?? 'des Kaufpreises'}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Nebenkosten */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nebenkosten.map((item) => (
            <div key={item.label} className="bg-white border border-[#151E39]/10 rounded p-5">
              <div className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-1">{item.label}</div>
              <div className="text-[#151E39] text-xl font-light mb-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                {item.value}
              </div>
              <div className="text-[#151E39]/30 text-xs">{item.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PREISBEISPIEL ────────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{beispielSection.eyebrow ?? 'Beispielrechnung'}</p>
            <h2
              className="text-white text-3xl md:text-5xl leading-tight"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {beispielSection.headline ?? 'Was kostet eine Wohnung'}{' '}
              <em className="not-italic text-[#B69252]">{beispielSection.headlineAccent ?? 'konkret?'}</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {types.map((t) => {
              const c = calc(t)
              return (
                <div key={t.nr} className="bg-white/5 border border-white/10 rounded p-7">
                  <div className="text-white/30 text-xs tracking-widest uppercase mb-1">
                    {typesSection.typeLabelPrefix ?? 'Typ'} {t.nr}
                  </div>
                  <div className="text-white text-lg mb-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    {t.type}
                  </div>
                  <div className="text-white/30 text-sm mb-6">{t.size}</div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">{beispielSection.rowArea ?? 'Fläche inkl. Terrasse'}</span>
                      <span className="text-white">{area(t.exampleSize, locale)} m²</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">{beispielSection.rowPricePerSqm ?? 'Preis/m²'}</span>
                      <span className="text-white">{zahl(t.examplePricePerSqm, locale)} {ui.proQm}</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 flex justify-between">
                      <span className="text-white/60 text-sm">{beispielSection.rowPurchase ?? 'Kaufpreis'}</span>
                      <span className="text-[#B69252] font-medium">
                        {approx(c.priceApprox)}{eur(t.examplePrice, locale)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">{beispielSection.rowExtraCosts ?? 'Nebenkosten (~2 %)'}</span>
                      <span className="text-white/60">
                        {approx(c.extraApprox)}{eur(c.extra, locale)}
                      </span>
                    </div>
                    <div className="border-t border-white/10 pt-3 flex justify-between">
                      <span className="text-white text-sm font-medium">{beispielSection.rowTotal ?? 'Gesamt'}</span>
                      <span className="text-white font-medium">
                        {approx(c.totalApprox)}{eur(c.total, locale)}
                      </span>
                    </div>
                  </div>
                  {t.exampleExtraNote && (
                    <div className="text-white/40 text-xs border-t border-white/10 pt-3">{t.exampleExtraNote}</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="kontakt" className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{cta.eyebrow ?? 'Exposé & Preisliste'}</p>
          <h2
            className="text-[#151E39] text-3xl md:text-5xl mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {cta.headline ?? 'Preisliste'}
            <br />
            <em className="not-italic text-[#B69252]">{cta.headlineAccent ?? 'anfordern.'}</em>
          </h2>
          <p className="text-[#151E39]/60 leading-relaxed mb-10 max-w-xl mx-auto">
            {cta.description ??
              'Die vollständige Preisliste mit allen Einheiten, Etagen und Aussichten erhalten Sie mit dem Exposé — direkt vom Bauträger.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={localizeHref(cta.buttonLink ?? '/kontakt', locale)}
              className="inline-flex items-center justify-center gap-2 bg-[#B69252] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors"
            >
              {cta.buttonLabel ?? 'Exposé und Preisliste anfordern'}
            </a>
            <a
              href={whatsappLink(cta.whatsappUrl, text(cta.whatsappNachricht, DEFAULT_WHATSAPP_NACHRICHT))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#151E39]/20 text-[#151E39] px-8 py-4 text-sm tracking-widest uppercase hover:border-[#151E39]/50 transition-colors"
            >
              {cta.whatsappLabel ?? 'WhatsApp'}
            </a>
          </div>
          <p className="text-[#151E39]/30 text-xs mt-6">
            {cta.note ?? 'In der Regel Antwort innerhalb von 24 Stunden · Beratung in vier Sprachen · Direkt vom Bauträger · Kein Makler'}
          </p>
        </div>
      </section>

      <PageFooter />
    </main>
  )
}
