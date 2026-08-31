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

export const metadata: Metadata = {
  title: 'Lage — Baliv Residence, Bar Montenegro',
  description:
    'Bar liegt am Fuß der Stari-Bar-Festung — zwischen Adria, Olivenhainen und dem Rumija-Gebirge. 50 km bis Podgorica, 35 km bis Budva.',
}

function mediaUrl(field: number | string | Media | null | undefined, fallback: string): string {
  if (!field) return fallback
  if (typeof field === 'string' || typeof field === 'number') return fallback
  return field.url ?? fallback
}

const distanceIcons: React.ReactNode[] = [
  <svg key="0" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 4C10.7 4 8 6.7 8 10c0 5.25 6 13 6 13s6-7.75 6-13c0-3.3-2.7-6-6-6z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
    <circle cx="14" cy="10" r="2" stroke="#B69252" strokeWidth="1.2"/>
  </svg>,
  <svg key="1" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M6 20c0-4 3-7 8-7s8 3 8 7" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M8 12c0 0 2-6 6-6s6 6 6 6" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M4 20h20" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>,
  <svg key="2" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="4" y="14" width="20" height="8" rx="1" stroke="#B69252" strokeWidth="1.2"/>
    <path d="M8 14V10a6 6 0 0112 0v4" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M4 18h20M10 18v4M18 18v4" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>,
  <svg key="3" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M5 20l4-10 5 5 4-7 5 12H5z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M5 20h18" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>,
  <svg key="4" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M6 18l3-3 2 2 3-5 2 3 3-6 3 9H6z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M4 21h20M14 4v4M10 5l1.5 3.5M18 5l-1.5 3.5" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>,
  <svg key="5" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M6 18l3-3 2 2 3-5 2 3 3-6 3 9H6z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M4 21h20M14 4v4M10 5l1.5 3.5M18 5l-1.5 3.5" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>,
]

const defaultDistances = [
  { place: 'Stari Bar', distance: '5 min', detail: 'zu Fuß', note: 'Mittelalterliche Festungsstadt, UNESCO-Kandidat' },
  { place: 'Strand Bar', distance: '8 min', detail: 'mit dem Auto', note: '13 km Sandstrand, flaches Wasser' },
  { place: 'Budva', distance: '35 km', detail: '30 min', note: 'Touristisches Zentrum der Riviera' },
  { place: 'Kotor', distance: '50 km', detail: '45 min', note: 'UNESCO-Welterbe, Bucht von Kotor' },
  { place: 'Flughafen Podgorica', distance: '50 km', detail: '45 min', note: 'Internationaler Flughafen, direkte Verbindungen' },
  { place: 'Flughafen Tivat', distance: '65 km', detail: '60 min', note: 'Saisonale Direktflüge aus Europa' },
]

const defaultHighlights = [
  {
    title: 'Stari Bar — Geschichte zu Fuß',
    text: 'Die mittelalterliche Festungsstadt Stari Bar liegt in Sichtweite des Projekts. Über 400 historische Gebäude, Olivenhaine die über 2.000 Jahre alt sind — ein lebendiges Kulturerbe direkt vor der Haustür.',
    image: '/detail-terrassen.webp',
  },
  {
    title: 'Adria — 13 km Strand',
    text: 'Bar verfügt über einen der längsten Sandstrände Montenegros. Flaches, warmes Wasser, kaum Tourismenmassen außerhalb der Hochsaison — ideal für Eigenbedarf und Kurzzeitvermietung.',
    image: '/terrasse-meerblick.webp',
  },
  {
    title: 'Rumija — Natur pur',
    text: 'Das Rumija-Gebirge erhebt sich direkt hinter Bar auf über 1.500 Meter. Wanderwege, Schluchten, klare Luft — ein seltener Kontrast zum Meer in unmittelbarer Nachbarschaft.',
    image: '/terrasse-berge.webp',
  },
]

const defaultMarktPreise = [
  { label: 'Bar heute', price: 'ab 2.500 €/m²', highlight: true },
  { label: 'Budva aktuell', price: '3.500–5.000 €/m²', highlight: false },
  { label: 'Kotor aktuell', price: '4.000–6.000 €/m²', highlight: false },
]

const defaultStats = [
  { v: '300+', l: 'Sonnentage/Jahr' },
  { v: '26 °C', l: 'Ø Wassertemp. Juli' },
  { v: '2.000+', l: 'Jahre Olivenhaine' },
  { v: '13 km', l: 'Sandstrand' },
]

export default async function LagePage() {
  const payload = await getPayload({ config })
  const cms = await payload.findGlobal({ slug: 'lage-page' })

  const heroHeadline = (cms as any)?.hero?.headline ?? 'Zwischen Festung, Meer und Bergen.'
  const heroSubline = (cms as any)?.hero?.subline ?? 'Die Lage'
  const heroDescription = (cms as any)?.hero?.description ?? 'Bar — am südlichen Ende der montenegrinischen Riviera. Authentisch, gewachsen, und am Beginn einer Entwicklung, die Budva und Kotor bereits hinter sich haben.'
  const heroImage = mediaUrl((cms as any)?.hero?.image, '/lage-hero.webp')
  const heroImageAlt = (cms as any)?.hero?.imageAlt ?? 'Bar, Montenegro — Luftaufnahme'
  const heroAddress = (cms as any)?.hero?.address ?? 'Bjeliši BB, 85000 Bar, Montenegro'
  const heroMapsLabel = (cms as any)?.hero?.mapsLabel ?? 'Google Maps öffnen'
  const heroMapsUrl = (cms as any)?.hero?.mapsUrl ?? 'https://maps.google.com/?q=Bjeli%C5%A1i+BB,+Bar,+Montenegro'

  const erreichbarkeitEyebrow = (cms as any)?.erreichbarkeit?.eyebrow ?? 'Erreichbarkeit'
  const erreichbarkeitHeadline = (cms as any)?.erreichbarkeit?.headline ?? 'Alles nah.'
  const erreichbarkeitHeadlineAccent = (cms as any)?.erreichbarkeit?.headlineAccent ?? 'Nichts zu weit.'
  const erreichbarkeitDescription = (cms as any)?.erreichbarkeit?.description ?? 'Bar verbindet das Beste zweier Welten: südliche Ruhe mit guter Infrastruktur. Zwei internationale Flughäfen, Fährverbindung nach Italien, direkte Bahnlinie nach Belgrad — und trotzdem kein Massentourismus.'

  const karteImage = mediaUrl((cms as any)?.karte?.image, '/map-montenegro.webp')
  const karteImageAlt = (cms as any)?.karte?.imageAlt ?? 'Karte Montenegro — Lage Bar'
  const karteBadgeTitle = (cms as any)?.karte?.badgeTitle ?? 'Baliv Residence'
  const karteBadgeSubline = (cms as any)?.karte?.badgeSubline ?? 'Bar, Montenegro'
  const karteCaption = (cms as any)?.karte?.caption ?? 'Schematische Darstellung · nicht maßstabsgetreu'

  const highlightsEyebrow = (cms as any)?.highlightsSection?.eyebrow ?? 'Umgebung'
  const highlightsHeadline = (cms as any)?.highlightsSection?.headline ?? 'Was Bar'
  const highlightsHeadlineAccent = (cms as any)?.highlightsSection?.headlineAccent ?? 'einzigartig macht.'

  const marktEyebrow = (cms as any)?.markt?.eyebrow ?? 'Warum Bar'
  const marktHeadline = (cms as any)?.markt?.headline ?? 'Was Budva und Kotor vor 15 Jahren waren.'
  const marktDescription = (cms as any)?.markt?.description ?? 'Kotor kostet heute 4.000–6.000 €/m². Budva 3.500–5.000 €/m². Bar liegt bei 2.500 €/m² — mit denselben natürlichen Vorteilen: Adriaküste, Berge, mediterranes Klima. Der Unterschied: Bar entwickelt sich gerade erst.'
  const marktNote = (cms as any)?.markt?.note ?? 'Vergleichspreise basieren auf öffentlich verfügbaren Marktdaten, Stand 2024/2025.'

  const cmsMarktPreise: any[] = (cms as any)?.marktPreise ?? []
  const marktPreise = cmsMarktPreise.length > 0
    ? cmsMarktPreise.map((r: any) => ({
        label: r.label ?? '',
        price: r.price ?? '',
        highlight: Boolean(r.highlight),
      }))
    : defaultMarktPreise

  const cmsStats: any[] = (cms as any)?.stats ?? []
  const stats = cmsStats.length > 0
    ? cmsStats.map((s: any) => ({ v: s.value ?? '', l: s.label ?? '' }))
    : defaultStats

  const cta = {
    eyebrow: (cms as any)?.cta?.eyebrow ?? 'Vor Ort überzeugen',
    headline: (cms as any)?.cta?.headline ?? 'Besichtigung',
    headlineAccent: (cms as any)?.cta?.headlineAccent ?? 'jederzeit möglich.',
    description: (cms as any)?.cta?.description ?? 'Wir organisieren Besichtigungen vor Ort — inklusive Abholung vom Flughafen Podgorica oder Tivat. Deutschsprachige Begleitung, kein Makler, kein Druck.',
    buttonLabel: (cms as any)?.cta?.buttonLabel ?? 'Besichtigung anfragen',
    buttonUrl: (cms as any)?.cta?.buttonUrl ?? '/kontakt',
    whatsappLabel: (cms as any)?.cta?.whatsappLabel ?? 'WhatsApp',
    whatsappUrl: (cms as any)?.cta?.whatsappUrl ?? 'https://wa.me/38268517873?text=Guten%20Tag%2C%20ich%20m%C3%B6chte%20eine%20Besichtigung%20bei%20Baliv%20Residence%20anfragen.',
  }

  const cmsDistances: any[] = (cms as any)?.distances ?? []
  const distances = cmsDistances.length > 0
    ? cmsDistances.map((d: any) => ({
        place: d.place ?? '',
        distance: d.distance ?? '',
        detail: d.detail ?? '',
        note: d.note ?? '',
      }))
    : defaultDistances

  const cmsHighlights: any[] = (cms as any)?.highlights ?? []
  const highlights = cmsHighlights.length > 0
    ? cmsHighlights.map((h: any, idx: number) => ({
        title: h.title ?? defaultHighlights[idx]?.title ?? '',
        text: h.text ?? defaultHighlights[idx]?.text ?? '',
        image: mediaUrl(h.image, defaultHighlights[idx]?.image ?? ''),
      }))
    : defaultHighlights

  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[540px]">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151E39]/80 via-[#151E39]/50 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{heroSubline}</p>
          <h1
            className="text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-2xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {heroHeadline}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-md leading-relaxed">
            {heroDescription}
          </p>
        </div>

        {/* Address bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#151E39]/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2C5.8 2 4 3.8 4 6c0 3.5 4 8 4 8s4-4.5 4-8c0-2.2-1.8-4-4-4z" stroke="#B69252" strokeWidth="1" strokeLinejoin="round"/>
                <circle cx="8" cy="6" r="1.2" stroke="#B69252" strokeWidth="1"/>
              </svg>
              <span className="text-white/70 text-sm">{heroAddress}</span>
            </div>
            <a
              href={heroMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B69252] text-xs tracking-widest uppercase hover:text-[#c9a96e] transition-colors flex items-center gap-1.5"
            >
              {heroMapsLabel}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── KARTE + ABSTÄNDE ─────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{erreichbarkeitEyebrow}</p>
            <h2
              className="text-[#151E39] text-3xl md:text-5xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {erreichbarkeitHeadline}
              <br />
              <em className="not-italic text-[#B69252]">{erreichbarkeitHeadlineAccent}</em>
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed mb-10">
              {erreichbarkeitDescription}
            </p>

            <div className="space-y-3">
              {distances.map((d, idx) => (
                <div
                  key={d.place}
                  className="flex items-center gap-4 bg-white rounded p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex-shrink-0">{distanceIcons[idx % distanceIcons.length]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#151E39] font-medium">{d.place}</div>
                    <div className="text-[#151E39]/40 text-xs mt-0.5 truncate">{d.note}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[#151E39] font-medium">{d.distance}</div>
                    <div className="text-[#B69252] text-xs">{d.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="sticky top-8">
            <div className="relative rounded overflow-hidden shadow-2xl">
              <Image
                src={karteImage}
                alt={karteImageAlt}
                width={1200}
                height={900}
                className="w-full"
              />
              <div className="absolute top-4 left-4 bg-[#151E39]/80 backdrop-blur-sm rounded px-3 py-2">
                <p className="text-[#B69252] text-xs tracking-widest uppercase">{karteBadgeTitle}</p>
                <p className="text-white text-xs mt-0.5">{karteBadgeSubline}</p>
              </div>
            </div>
            <p className="text-[#151E39]/30 text-xs mt-3 text-center">
              {karteCaption}
            </p>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ───────────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{highlightsEyebrow}</p>
            <h2
              className="text-white text-3xl md:text-5xl leading-tight"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {highlightsHeadline}
              <br />
              <em className="not-italic text-[#B69252]">{highlightsHeadlineAccent}</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div key={h.title} className="group">
                <div className="relative aspect-[4/3] rounded overflow-hidden mb-5">
                  <Image
                    src={h.image}
                    alt={h.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151E39]/70 to-transparent" />
                </div>
                <h3
                  className="text-white text-lg mb-3"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  {h.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BAR VS. BUDVA/KOTOR ──────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{marktEyebrow}</p>
            <h2
              className="text-[#151E39] text-3xl md:text-4xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {marktHeadline}
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed mb-8">
              {marktDescription}
            </p>

            <div className="space-y-4">
              {marktPreise.map((row) => {
                const color = row.highlight ? 'text-[#B69252]' : 'text-[#151E39]'
                const bg = row.highlight
                  ? 'bg-[#B69252]/10 border-[#B69252]/30'
                  : 'bg-white border-[#151E39]/10'
                return (
                  <div key={row.label} className={`flex justify-between items-center border rounded px-5 py-4 ${bg}`}>
                    <span className={`text-sm font-medium ${color}`}>{row.label}</span>
                    <span className={`text-sm font-medium ${color}`}>{row.price}</span>
                  </div>
                )
              })}
            </div>

            <p className="text-[#151E39]/40 text-xs mt-4 leading-relaxed">
              {marktNote}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.l} className="bg-[#151E39] rounded p-6 text-center">
                <div
                  className="text-[#B69252] text-3xl font-light mb-2"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  {stat.v}
                </div>
                <div className="text-white/50 text-xs tracking-wide leading-snug">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="kontakt" className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{cta.eyebrow}</p>
          <h2
            className="text-white text-3xl md:text-5xl mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {cta.headline}
            <br />
            <em className="not-italic text-[#B69252]">{cta.headlineAccent}</em>
          </h2>
          <p className="text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            {cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={cta.buttonUrl}
              className="inline-flex items-center justify-center gap-2 bg-[#B69252] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors"
            >
              {cta.buttonLabel}
            </a>
            <a
              href={cta.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 text-sm tracking-widest uppercase hover:border-white/50 transition-colors"
            >
              {cta.whatsappLabel}
            </a>
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  )
}
