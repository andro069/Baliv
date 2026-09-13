import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { PricingTimeline } from '@/components/PricingTimeline'
import { PageFooter } from '@/components/PageFooter'
import type { Media } from '@/payload-types'
import { defaultLocale, isLocale, localizeHref, pathFor } from '@/i18n/config'
import { getWebsite, seitenLocale, seitenMetadata } from '@/i18n/server'
import { formatEuro, formatZahl, text } from '@/i18n/format'

const DEFAULT_META_TITLE = 'Die Wohnungen — Baliv Residence, Bar Montenegro'
const DEFAULT_META_DESCRIPTION =
  'Studio, Zweizimmer und Penthouse-Ebene. 39 Einheiten ab 2.500 €/m², schlüsselfertig übergeben. Übergabe Q2 2028.'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: roh } = await params
  const locale = isLocale(roh) ? roh : defaultLocale
  let cms: any = null
  try {
    const payload = await getPayload({ config })
    cms = await payload.findGlobal({ slug: 'wohnungen-page', locale })
  } catch {
    // Datenbank nicht erreichbar — Standardtexte verwenden.
  }
  return seitenMetadata({
    seite: 'wohnungen',
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

const defaultTypes = [
  {
    nr: '01',
    type: 'Studio',
    tag: 'Erdgeschoss',
    size: '28,1–29,7 m²',
    terrace: 'Eigener Garten',
    units: '2 Einheiten',
    price: 'ab 2.700 €/m²',
    layout: '1 Wohn-/Schlafraum · Küchenzeile · Bad',
    description:
      'Kompakter Einstieg mit eigenem Garten, mindestens 4 Meter tief. Geeignet als Pied-à-terre oder Ferienwohnung.',
    floorplan: '/grundriss-studio.webp',
    image: '/terrasse-meer.webp',
    example: { size: 28.08, price: 75800 },
  },
  {
    nr: '02',
    type: 'Zweizimmer­wohnung',
    tag: 'Alle Etagen',
    size: '46,7–48,8 m²',
    terrace: 'Balkon oder Terrasse',
    units: '34 Einheiten',
    price: 'ab 2.500 €/m²',
    layout: '1 Schlafzimmer · Wohn-/Essbereich · Küche · Bad',
    description:
      'Die Wahl der meisten Käufer. Mit steigender Etage wächst der Ausblick — von den Olivenhainen im Erdgeschoss bis zum Meer in den oberen Etagen. Im Erdgeschoss mit Terrasse und eigenem Gartenanteil, mindestens 4 Meter tief.',
    floorplan: '/grundriss-apartment.webp',
    image: '/interieur-wohnen-01.webp',
    example: { size: 46.79, price: 116975 },
  },
  {
    nr: '03',
    type: 'Penthouse-Ebene',
    tag: '6. Obergeschoss',
    size: '51,6–81,2 m²',
    terrace: 'Eigene Dachterrasse',
    units: '3 Einheiten',
    price: 'ab 3.600 €/m²',
    layout: 'Zwei- oder Dreizimmer · Wohn-/Essbereich · Küche · Bad',
    description:
      'Zwei- und Dreizimmer auf der obersten Etage, jeweils mit eigener Dachterrasse: 38,5 m² · 42,9 m² · 65,9 m² zur alleinigen Nutzung, nicht Bestandteil der Wohnfläche. Panoramablick über Adria, Rumija und Stari Bar.',
    floorplan: '/grundriss-penthouse.webp',
    image: '/terrasse-berge.webp',
    example: { size: 51.61, price: 185800 },
  },
]

const DEFAULT_TYPES_HINWEIS =
  'Alle Flächen sind Netto-Nutzflächen einschließlich Terrasse. Der Preis richtet sich nach Etage und Aussicht. Die vollständige Preisliste erhalten Sie mit dem Exposé.'

const DEFAULT_AUSSTATTUNG_HINWEIS = 'Ausstattung nach Baubeschreibung. Marken und Modelle im Exposé.'

const defaultAusstattung = [
  { brand: 'Markenarmaturen im Bad', label: 'Sanitärausstattung' },
  { brand: 'Klimaanlage vorbereitet', label: 'Klimatisierung' },
  { brand: 'Eurocode 8', label: 'Erdbebenstandard' },
  { brand: 'Naturstein', label: 'Böden & Fassade' },
  { brand: 'Holzoberflächen', label: 'Innenraum' },
  { brand: 'Schlüsselfertig', label: 'Übergabe komplett' },
]

// Symbol-Schlüssel des Auswahlfelds `ausstattung[].icon` → Icon.
const iconSchluessel: Record<string, string> = {
  armatur: 'sanitaer',
  klima: 'klima',
  erdbeben: 'erdbeben',
  stein: 'stein',
  holz: 'holz',
  schluessel: 'schluessel',
}

// Standard-Reihenfolge der Kacheln, falls weder Symbol gewählt noch ein Stichwort erkannt wird.
const standardIcons = ['sanitaer', 'klima', 'erdbeben', 'stein', 'holz', 'schluessel']

/**
 * Icon einer Ausstattungs-Kachel. Vorrang hat das im Backend gewählte Symbol — es ist
 * in allen Sprachen gleich. Ohne Auswahl greifen die deutschen Stichworte im Titel
 * (Bestandsdaten), in übersetzten Fassungen zuletzt die Position der Kachel.
 */
function ausstattungIcon(icon: string | null | undefined, title: string, idx: number): React.ReactNode {
  if (icon && iconSchluessel[icon]) return ausstattungIcons[iconSchluessel[icon]]
  const t = title.toLowerCase()
  if (/armatur|sanitär|bad/.test(t)) return ausstattungIcons.sanitaer
  if (/klima/.test(t)) return ausstattungIcons.klima
  if (/eurocode|erdbeben/.test(t)) return ausstattungIcons.erdbeben
  if (/stein/.test(t)) return ausstattungIcons.stein
  if (/holz|eiche/.test(t)) return ausstattungIcons.holz
  if (/schlüssel/.test(t)) return ausstattungIcons.schluessel
  const standard = standardIcons[idx]
  return standard ? ausstattungIcons[standard] : null
}

const ausstattungIcons: Record<string, React.ReactNode> = {
  sanitaer: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4v8M10 8c0 0 1.5-2 4-2s4 2 4 2" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M8 12h12v2c0 4-2.5 7-6 8-3.5-1-6-4-6-8v-2z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M11 18h6" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  klima: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="7" width="20" height="14" rx="1.5" stroke="#B69252" strokeWidth="1.2"/>
      <path d="M10 14h8M14 10v8" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="14" cy="14" r="3" stroke="#B69252" strokeWidth="1.2"/>
    </svg>
  ),
  erdbeben: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4L5 10v4c0 5.5 3.8 10.6 9 12 5.2-1.4 9-6.5 9-12v-4L14 4z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10 14l3 3 5-5" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  stein: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 20L9 8l5 5 5-7 5 14H4z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M4 20h20" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  holz: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 24V14" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M14 14c-4 0-7-3-7-7 3 0 5.5 1.5 7 4 1.5-2.5 4-4 7-4 0 4-3 7-7 7z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10 18c-2 0-4-1.5-4-4 2 0 3.5 1 4 2.5" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  schluessel: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="11" cy="12" r="5" stroke="#B69252" strokeWidth="1.2"/>
      <path d="M15 16l8 8" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M19 20l2-2M21 22l2-2" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
}

const defaultBuilding = [
  { value: '7', label: 'Geschosse' },
  { value: '39', label: 'Wohneinheiten' },
  { value: '20', label: 'Stellplätze' },
  { value: 'Q2 2028', label: 'Übergabe' },
]

const defaultPremiumPaket = [
  'Gehobene Badgestaltung mit Großformat-Fliesen',
  'Smarte Lichtsteuerung',
  'Schlüsselfertige Einbauküche',
]

const defaultInteriorImages = [
  { src: '/interieur-wohnen-02.webp', alt: 'Wohnbereich' },
  { src: '/interieur-bad-01.webp', alt: 'Badezimmer' },
  { src: '/interieur-schlafen-01.webp', alt: 'Schlafzimmer' },
]

const defaultGebaeudeFeatures = [
  { title: '20 Stellplätze', text: 'In der Tiefgarage und im Außenbereich; Tiefgaragenplatz optional.' },
  { title: 'Bepflanzte Terrassen', text: 'Lavendel, Rosmarin und mediterrane Begrünung auf mehreren Ebenen.' },
  { title: 'Fahrradabstellraum', text: 'Im Erdgeschoss, wettergeschützt und abschließbar.' },
  { title: 'Naturstein-Fassade', text: 'Bögen, Pergolen und variierende Fassadengestaltung — von allen Seiten hochwertig.' },
  { title: 'Eurocode 8', text: 'Geplant nach europäischem Erdbebenstandard.' },
]

export default async function WohnungenPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await seitenLocale(params)
  const payload = await getPayload({ config })
  const [cms, { ui }] = await Promise.all([
    payload.findGlobal({ slug: 'wohnungen-page', locale }),
    getWebsite(locale),
  ])

  const heroEyebrow = (cms as any)?.hero?.eyebrow ?? 'Die Wohnungen'
  const heroHeadline = (cms as any)?.hero?.headline ?? 'Drei Typen. Ihre Wahl.'
  const heroDescription = (cms as any)?.hero?.description ?? '39 Einheiten in sieben Geschossen — vom kompakten Studio bis zur Penthouse-Ebene mit eigener Dachterrasse.'
  const heroImage = mediaUrl((cms as any)?.hero?.image, '/building-front.webp')
  const heroImageAlt = text((cms as any)?.hero?.imageAlt, 'Baliv Residence Gebäude')

  const cmsBuilding: any[] = (cms as any)?.buildingStats ?? []
  const building = cmsBuilding.length > 0
    ? cmsBuilding.map((s: any) => ({ value: s.value ?? '', label: s.label ?? '' }))
    : defaultBuilding

  const typesSection = (cms as any)?.typesSection ?? {}
  const typesEyebrow = typesSection.eyebrow ?? 'Grundrisse & Details'
  const typesHeadline = typesSection.headline ?? 'Drei Wohnungstypen.'
  const typesHeadlineLine2 = typesSection.headlineLine2 ?? 'Sieben Geschosse.'
  const typesUnitsLabel = typesSection.unitsLabel ?? 'Einheiten'
  const typesPriceLabel = typesSection.priceLabel ?? 'Preis'
  const typesExampleNote = typesSection.exampleNote ?? 'inkl. MwSt.'
  const typesHinweis = typesSection.hinweis ?? DEFAULT_TYPES_HINWEIS
  const typesCtaLabel = typesSection.ctaLabel ?? 'Exposé anfragen'
  const typesExampleLabel = text(typesSection.exampleLabel, 'Beispiel')

  const ausstattungSection = (cms as any)?.ausstattungSection ?? {}
  const ausstattungEyebrow = ausstattungSection.eyebrow ?? 'Ausstattung'
  const ausstattungHeadline = ausstattungSection.headline ?? 'Schlüsselfertig übergeben.'
  const ausstattungHeadlineAccent = ausstattungSection.headlineAccent ?? 'Hochwertig ausgestattet.'
  const ausstattungDescription = ausstattungSection.description ?? 'Jede Wohnung wird vollständig fertiggestellt übergeben. Einbauküche und Tiefgaragenplatz sind optional.'
  const premiumTitle = ausstattungSection.premiumTitle ?? 'Premium-Paket optional'
  const ausstattungHinweis = ausstattungSection.hinweis ?? DEFAULT_AUSSTATTUNG_HINWEIS

  const cmsPremium: any[] = (cms as any)?.premiumPaket ?? []
  const premiumPaket = cmsPremium.length > 0
    ? cmsPremium.map((p: any) => p.label ?? '')
    : defaultPremiumPaket

  const cmsInterior: any[] = (cms as any)?.interiorImages ?? []
  const interiorImages = cmsInterior.length > 0
    ? cmsInterior.map((img: any, idx: number) => ({
        src: mediaUrl(img.image, defaultInteriorImages[idx]?.src ?? ''),
        alt: img.alt ?? defaultInteriorImages[idx]?.alt ?? '',
      }))
    : defaultInteriorImages

  const gebaeudeEyebrow = (cms as any)?.gebaeude?.eyebrow ?? 'Das Gebäude'
  const gebaeudeHeadline = (cms as any)?.gebaeude?.headline ?? 'Mehr als vier Wände.'
  const gebaeudeImage = mediaUrl((cms as any)?.gebaeude?.image, '/detail-terrassen.webp')
  const gebaeudeImageAlt = text((cms as any)?.gebaeude?.imageAlt, 'Terrassen und Architektur')

  const cmsGebaeudeFeatures: any[] = (cms as any)?.gebaeudeFeatures ?? []
  const gebaeudeFeatures = cmsGebaeudeFeatures.length > 0
    ? cmsGebaeudeFeatures.map((f: any) => ({ title: f.title ?? '', text: f.text ?? '' }))
    : defaultGebaeudeFeatures

  const cta = (cms as any)?.cta ?? {}
  const ctaEyebrow = cta.eyebrow ?? 'Jetzt anfragen'
  const ctaHeadline = cta.headline ?? 'Interesse an einer Einheit?'
  const ctaDescription = cta.description ?? 'Vollständiges Exposé mit allen Grundrissen, Preisliste und aktueller Verfügbarkeit — direkt vom Bauträger, Beratung in vier Sprachen, ohne Makler.'
  const ctaButtonLabel = cta.buttonLabel ?? 'Exposé anfordern'
  const ctaButtonLink = localizeHref(cta.buttonLink ?? '/kontakt', locale)
  const ctaWhatsappLabel = cta.whatsappLabel ?? 'WhatsApp'
  const ctaWhatsappUrl = whatsappLink(cta.whatsappUrl, text(cta.whatsappNachricht, DEFAULT_WHATSAPP_NACHRICHT))
  const ctaNote = cta.note ?? 'In der Regel Antwort innerhalb von 24 Stunden · Beratung in vier Sprachen · Direkt vom Bauträger'

  const cmsTypes: any[] = (cms as any)?.types ?? []
  const types = cmsTypes.length > 0
    ? cmsTypes.map((t: any, idx: number) => ({
        nr: t.nr ?? defaultTypes[idx]?.nr ?? `0${idx + 1}`,
        type: t.type ?? defaultTypes[idx]?.type ?? '',
        tag: t.tag ?? defaultTypes[idx]?.tag ?? '',
        size: t.size ?? defaultTypes[idx]?.size ?? '',
        terrace: t.terrace ?? defaultTypes[idx]?.terrace ?? '',
        units: t.units ?? defaultTypes[idx]?.units ?? '',
        price: t.price ?? defaultTypes[idx]?.price ?? '',
        layout: t.layout ?? defaultTypes[idx]?.layout ?? '',
        description: t.description ?? defaultTypes[idx]?.description ?? '',
        floorplan: mediaUrl(t.floorplan, defaultTypes[idx]?.floorplan ?? ''),
        image: mediaUrl(t.image, defaultTypes[idx]?.image ?? ''),
        example: {
          size: t.exampleSize ?? defaultTypes[idx]?.example?.size ?? 0,
          price: t.examplePrice ?? defaultTypes[idx]?.example?.price ?? 0,
        },
      }))
    : defaultTypes

  const cmsAusstattung: any[] = (cms as any)?.ausstattung ?? []
  const ausstattung = cmsAusstattung.length > 0
    ? cmsAusstattung.map((a: any) => ({ icon: (a.icon ?? null) as string | null, brand: a.brand ?? '', label: a.label ?? '' }))
    : defaultAusstattung.map((a) => ({ ...a, icon: null as string | null }))

  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151E39]/80 via-[#151E39]/50 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4 font-raleway">
            {heroEyebrow}
          </p>
          <h1
            className="text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-2xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {heroHeadline}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-md">
            {heroDescription}
          </p>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#151E39]/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 py-4 grid grid-cols-4 divide-x divide-white/10">
            {building.map((s) => (
              <div key={s.label} className="px-4 md:px-8 text-center">
                <div className="text-white text-lg md:text-2xl font-light">{s.value}</div>
                <div className="text-white/50 text-[9px] md:text-xs tracking-widest uppercase mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APARTMENT TYPES ──────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-3">{typesEyebrow}</p>
          <h2
            className="text-[#151E39] text-3xl md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {typesHeadline}
            <br />
            {typesHeadlineLine2}
          </h2>
        </div>

        <div className="space-y-32">
          {types.map((apt, idx) => (
            <div
              key={apt.nr}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Images */}
              <div className={`space-y-4 ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative aspect-[4/3] rounded overflow-hidden">
                  <Image
                    src={apt.image}
                    alt={apt.type}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#151E39]/80 backdrop-blur-sm text-white text-xs tracking-widest px-3 py-1.5 rounded">
                    {apt.tag}
                  </div>
                </div>
                <div className="relative aspect-[3/2] rounded overflow-hidden bg-white">
                  <Image
                    src={apt.floorplan}
                    alt={`${ui.grundriss} ${apt.type}`}
                    fill
                    className="object-contain p-4"
                  />
                  <div className="absolute bottom-3 right-3 text-[#151E39]/30 text-xs">{ui.grundriss}</div>
                </div>
              </div>

              {/* Content */}
              <div className={idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-[#B69252]/40 text-6xl font-light" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    {apt.nr}
                  </span>
                  <div>
                    <h3
                      className="text-[#151E39] text-2xl md:text-3xl leading-tight"
                      style={{ fontFamily: 'var(--font-playfair), serif' }}
                    >
                      {apt.type}
                    </h3>
                    <p className="text-[#151E39]/50 text-xs tracking-widest uppercase mt-1">
                      {[apt.units, apt.tag].filter(Boolean).join(' · ')}
                    </p>
                    <p className="text-[#B69252] text-sm tracking-wide mt-1">
                      {[apt.size, apt.price].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </div>

                <p className="text-[#151E39]/60 text-sm mb-6 leading-relaxed">
                  {[apt.layout, apt.terrace].filter(Boolean).join(' · ')}
                </p>
                <p className="text-[#151E39] text-base leading-relaxed mb-8">{apt.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded p-4">
                    <div className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-1">{typesUnitsLabel}</div>
                    <div className="text-[#151E39] text-lg font-light">{apt.units}</div>
                  </div>
                  <div className="bg-white rounded p-4">
                    <div className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-1">{typesPriceLabel}</div>
                    <div className="text-[#151E39] text-lg font-light">{apt.price}</div>
                  </div>
                  <div className="bg-[#151E39] rounded p-4 col-span-2">
                    <div className="text-white/40 text-xs tracking-widest uppercase mb-1">{typesExampleLabel} · {formatZahl(Number(apt.example.size), locale)} m²</div>
                    <div className="text-white text-xl font-light">
                      {formatEuro(Number(apt.example.price), locale)}
                    </div>
                    <div className="text-white/40 text-xs mt-1">{typesExampleNote}</div>
                  </div>
                </div>

                <Link
                  href={pathFor('kontakt', locale)}
                  className="inline-flex items-center gap-2 bg-[#B69252] text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors"
                >
                  {typesCtaLabel}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {typesHinweis && (
          <p className="mt-20 max-w-3xl text-[#151E39]/60 text-sm leading-relaxed border-l-2 border-[#B69252] pl-4">
            {typesHinweis}
          </p>
        )}
      </section>

      {/* ── AUSSTATTUNG ──────────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{ausstattungEyebrow}</p>
              <h2
                className="text-white text-3xl md:text-5xl mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {ausstattungHeadline}{' '}
                <em className="not-italic text-[#B69252]">{ausstattungHeadlineAccent}</em>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">{ausstattungDescription}</p>

              <div className="border border-[#B69252]/30 rounded p-6 bg-[#B69252]/5">
                <p className="text-[#B69252] text-xs tracking-widest uppercase mb-3">{premiumTitle}</p>
                <ul className="text-white/70 text-sm space-y-2">
                  {premiumPaket.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#B69252] rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {ausstattung.map((item, idx) => (
                <div key={item.brand} className="bg-white/5 border border-white/10 rounded p-5 hover:border-[#B69252]/40 transition-colors">
                  <div className="mb-3">{ausstattungIcon(item.icon, item.brand, idx)}</div>
                  <div className="text-white font-medium mb-1">{item.brand}</div>
                  <div className="text-white/40 text-xs tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {ausstattungHinweis && (
            <p className="text-white/40 text-xs mt-8 lg:text-right">{ausstattungHinweis}</p>
          )}

          {/* Interior images */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
            {interiorImages.map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-[#151E39]/20" />
                <div className="absolute bottom-3 left-3 text-white/60 text-xs tracking-wide">{img.alt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREISSTAFFELUNG ──────────────────────────────────────────────── */}
      <section className="bg-[#151E39] px-8 md:px-16 lg:px-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <PricingTimeline locale={locale} />
        </div>
      </section>

      {/* ── GEBÄUDE FEATURES ─────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded overflow-hidden">
            <Image src={gebaeudeImage} alt={gebaeudeImageAlt} fill className="object-cover" />
          </div>
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{gebaeudeEyebrow}</p>
            <h2
              className="text-[#151E39] text-3xl md:text-4xl mb-8 leading-tight"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {gebaeudeHeadline}
            </h2>
            <div className="space-y-5">
              {gebaeudeFeatures.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-1 bg-[#B69252] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-[#151E39] font-medium mb-0.5">{item.title}</div>
                    <div className="text-[#151E39]/50 text-sm leading-relaxed">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="kontakt" className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{ctaEyebrow}</p>
          <h2
            className="text-white text-3xl md:text-5xl mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {ctaHeadline}
          </h2>
          <p className="text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">{ctaDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={ctaButtonLink}
              className="inline-flex items-center justify-center gap-2 bg-[#B69252] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors"
            >
              {ctaButtonLabel}
            </a>
            <a
              href={ctaWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 text-sm tracking-widest uppercase hover:border-white/50 transition-colors"
            >
              {ctaWhatsappLabel}
            </a>
          </div>
          <p className="text-white/30 text-xs mt-6">{ctaNote}</p>
        </div>
      </section>

      <PageFooter />
    </main>
  )
}
