import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navigation } from '@/components/Navigation'
import { HeroSlider } from '@/components/HeroSlider'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { PricingTimeline } from '@/components/PricingTimeline'
import { mergeOpenGraph, SITE_URL } from '@/utilities/mergeOpenGraph'
import type { Media } from '@/payload-types'

// Resolve media URL from a Payload upload field
function mediaUrl(field: number | string | Media | null | undefined, fallback: string): string {
  if (!field) return fallback
  if (typeof field === 'string' || typeof field === 'number') return fallback
  return field.url ?? fallback
}

/** CMS-Text oder Rückfallwert — auch leere Felder fallen zurück. */
function t(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value : fallback
}

const defaultMeta = {
  title: 'Baliv Residence — Neubau in Bar, Montenegro',
  description:
    '39 Wohneinheiten am Fuße von Stari Bar, zwischen Olivenhainen, Bergen und Meer. Ab 2.500 €/m², direkt vom Bauträger, deutschsprachig, ohne Makler.',
}

export async function generateMetadata(): Promise<Metadata> {
  let title = defaultMeta.title
  let description = defaultMeta.description
  try {
    const payload = await getPayload({ config })
    const cms = (await payload.findGlobal({ slug: 'homepage', depth: 0 })) as any
    title = t(cms?.meta?.title, title)
    description = t(cms?.meta?.description, description)
  } catch {
    // Datenbank nicht erreichbar — Standardwerte verwenden.
  }
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}/` },
    openGraph: mergeOpenGraph({ url: `${SITE_URL}/` }),
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config })
  const [cmsRaw, footerCms] = await Promise.all([
    payload.findGlobal({ slug: 'homepage' }).catch(() => null),
    payload.findGlobal({ slug: 'footer' }).catch(() => null),
  ])
  const cms = cmsRaw as any

  // ── Hero ─────────────────────────────────────────────────────────────
  const heroHeadline = t(cms?.hero?.headline, 'Modern wohnen. Ursprünglich leben.')
  const heroSubline = t(cms?.hero?.subline, 'BAR · MONTENEGRO')
  const heroDescription = t(
    cms?.hero?.description,
    'Am Fuße von Stari Bar entsteht ein Wohnensemble mit 39 Einheiten, zwischen Olivenhainen, Bergen und Meer.',
  )
  const heroButtons = [
    {
      label: t(cms?.hero?.primaryButtonLabel, 'Exposé anfragen'),
      href: t(cms?.hero?.primaryButtonLink, '/kontakt'),
      primary: true,
    },
    {
      label: t(cms?.hero?.secondaryButtonLabel, 'Projekt entdecken'),
      href: t(cms?.hero?.secondaryButtonLink, '/architektur'),
      primary: false,
    },
  ]
  const heroSlides =
    cms?.hero?.slides && cms.hero.slides.length > 0
      ? (cms.hero.slides as any[])
          .map((s) => ({
            src: typeof s.image === 'object' && s.image !== null ? s.image.url ?? '' : '',
            alt: s.alt ?? '',
          }))
          .filter((s) => s.src)
      : undefined

  const heroStats: { value: string; label: string }[] = cms?.hero?.stats?.length
    ? cms.hero.stats
    : [
        { value: '39', label: 'Wohneinheiten' },
        { value: '2.500 €/m²', label: 'Ab Preis' },
        { value: 'Q2 2028', label: 'Übergabe' },
      ]

  // ── Lage ─────────────────────────────────────────────────────────────
  const lageHeadline = t(cms?.lage?.headline, 'Zwischen Festung, Meer und Olivenhain.')
  const lageText1 = t(
    cms?.lage?.text1,
    'Stari Bar zu Füßen, Rumija im Rücken, die Adria in Sichtweite. Ein Ort, an dem sich Orient und Okzident seit Jahrhunderten begegnen — und an dem Baliv Residence entsteht.',
  )
  const lageText2 = t(
    cms?.lage?.text2,
    'Eingebettet in über 100.000 Olivenbäume, nur rund einen Kilometer unterhalb der historischen Festungsstadt. Acht Minuten zum ersten Strand, acht zum Hafen.',
  )
  const lageDistances: { value: string; label: string }[] = cms?.lage?.distances?.length
    ? cms.lage.distances
    : [
        { value: 'ca. 1 km', label: 'Stari Bar Festung' },
        { value: 'ca. 2,5 km', label: 'Erster Strand' },
        { value: 'ca. 2 km', label: 'Hafen von Bar' },
        { value: '32 km', label: 'Flughafen Podgorica' },
      ]

  // ── Wohnungen ────────────────────────────────────────────────────────
  const wohnungenHeadline = t(cms?.wohnungen?.headline, 'Drei Typen. Ihre Wahl.')
  type Unit = {
    type: string
    tag?: string | null
    units?: string | null
    size?: string | null
    description?: string | null
    price?: string | null
    image?: number | Media | null
  }
  const wohnungenTypes: Unit[] = cms?.wohnungen?.types?.length
    ? cms.wohnungen.types
    : [
        {
          type: 'Studio',
          tag: 'Erdgeschoss',
          units: '2 Einheiten',
          size: '28,1–29,7 m²',
          description: 'Kompakter Einstieg mit eigenem Garten, mindestens 4 Meter tief.',
          price: 'ab 2.700 €/m²',
        },
        {
          type: 'Zweizimmer',
          tag: 'Alle Etagen',
          units: '34 Einheiten',
          size: '46,7–48,8 m²',
          description:
            'Die Wahl der meisten Käufer — mit Balkon oder Terrasse auf allen Etagen. Im Erdgeschoss mit Terrasse und eigenem Gartenanteil, mindestens 4 Meter tief.',
          price: 'ab 2.500 €/m²',
        },
        {
          type: 'Penthouse-Ebene',
          tag: '6. Obergeschoss',
          units: '3 Einheiten',
          size: '51,6–81,2 m²',
          description:
            'Eigene Dachterrasse zur alleinigen Nutzung — nicht Bestandteil der Wohnfläche. Panoramablick auf Meer, Berge und Stari Bar.',
          price: 'ab 3.600 €/m²',
        },
      ]
  const fallbackImgs = ['/terrasse-meer.webp', '/interieur-wohnen-01.webp', '/terrasse-berge.webp']
  const wohnungenHinweis = t(
    cms?.wohnungen?.hinweis,
    'Alle Flächen sind Netto-Nutzflächen einschließlich Terrasse. Der Preis richtet sich nach Etage und Aussicht. Die vollständige Preisliste erhalten Sie mit dem Exposé.',
  )

  // ── Investment ───────────────────────────────────────────────────────
  const investHeadline = t(cms?.investment?.headline, 'Warum Bar. Warum jetzt.')
  const investText = t(
    cms?.investment?.text,
    'Ein Neubau am Fuß von Stari Bar, ab 2.500 €/m² — direkt vom Bauträger, ohne Makler. Schlüsselfertig übergeben; Einbauküche und Tiefgaragenplatz optional.',
  )
  const investStats: { value: string; label: string }[] = cms?.investment?.stats?.length
    ? cms.investment.stats
    : [
        { value: '2.500 €/m²', label: 'Einstiegspreis' },
        { value: '9 %', label: 'Einkommensteuer auf Mieteinnahmen' },
        { value: 'Ziel 2028', label: 'EU-Beitritt, Verhandlungen laufen' },
      ]
  const investBadgeValue = t(cms?.investment?.badgeValue, '0 €')
  const investBadgeLabel = t(cms?.investment?.badgeLabel, 'Maklerprovision — direkt vom Bauträger')

  // ── Vertrauen ────────────────────────────────────────────────────────
  const vertrauen: { icon?: string | null; title: string; sub?: string | null }[] =
    cms?.vertrauen?.length
      ? cms.vertrauen
      : [
          { icon: '€', title: 'Euro seit 2002', sub: 'Kein Währungsrisiko' },
          { icon: '★', title: 'NATO seit 2017', sub: 'Politische Stabilität' },
          { icon: '✦', title: 'EU-Beitritt: Ziel 2028', sub: 'Verhandlungen laufen' },
          { icon: '§', title: 'Volleigentum', sub: 'Svojina 1/1, notariell' },
        ]

  // ── CTA ──────────────────────────────────────────────────────────────
  const ctaEyebrow = t(cms?.cta?.eyebrow, '39 Einheiten · Die Auswahl ist jetzt am größten')
  const ctaHeadline = t(cms?.cta?.headline, 'Bereit für das erste Gespräch?')
  const ctaDescription = t(
    cms?.cta?.description,
    'Vollständiges Exposé mit Grundrissen, Preisliste und Verfügbarkeit — direkt vom Bauträger, deutschsprachig, ohne Makler.',
  )
  const ctaNote = t(
    cms?.cta?.note,
    'In der Regel Antwort innerhalb von 24 Stunden · Deutschsprachige Beratung · Direkt vom Bauträger',
  )

  // ── Kontakt ──────────────────────────────────────────────────────────
  const email = t(cms?.kontakt?.email, 'info@baliv-residence.com')
  const telefon = t(cms?.kontakt?.whatsapp, '+382 68 517 873')
  const telefonZiffern = telefon.replace(/\D/g, '')

  // ── Footer ───────────────────────────────────────────────────────────
  const footerAddress = footerCms?.address ?? 'Bjeliši BB · 85000 Bar, Montenegro'
  const footerCopyright =
    footerCms?.copyright ?? '© 2026 Real Living d.o.o. · Baliv Residence, Bar, Montenegro'
  const footerLegalLinks: { label: string; href: string }[] =
    (footerCms?.legalLinks as { label: string; href: string }[] | null | undefined) ?? [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
    ]

  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px]">
        <HeroSlider slides={heroSlides} />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <div className="max-w-xl">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-6 font-raleway">
              {heroSubline}
            </p>
            <h1
              className="hero-headline text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {heroHeadline.split('. ').map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}
                  {i < arr.length - 1 ? '.' : ''}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-md">
              {heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              {heroButtons.map((btn) => (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className={
                    btn.primary
                      ? 'px-8 py-4 bg-[#B69252] text-white text-sm tracking-widest uppercase hover:bg-[#a07e3e] transition-colors duration-300'
                      : 'px-8 py-4 border border-white/50 text-white text-sm tracking-widest uppercase hover:border-white hover:bg-white/10 transition-all duration-300'
                  }
                >
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#151E39]/80 backdrop-blur-sm">
          {/* Rechts Platz lassen, damit der WhatsApp-Knopf auf dem Handy keine Kennzahl verdeckt. */}
          <div className="max-w-7xl mx-auto pl-2 pr-16 md:px-8 py-4 md:py-5 grid grid-cols-3 divide-x divide-white/10">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center px-1 md:px-4">
                <p
                  className="text-white text-sm md:text-xl font-light leading-tight"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-white/50 text-[9px] md:text-xs tracking-wider md:tracking-widest uppercase mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAGE ALS EMOTION ─────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Die Lage</p>
            <h2
              className="text-[#151E39] text-4xl md:text-5xl leading-tight mb-8"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {lageHeadline}
            </h2>
            <p className="text-[#151E39]/60 text-base leading-relaxed font-light mb-6">{lageText1}</p>
            <p className="text-[#151E39]/60 text-base leading-relaxed font-light mb-10">{lageText2}</p>
            <div className="grid grid-cols-2 gap-6">
              {lageDistances.map((item) => (
                <div key={item.label} className="border-l-2 border-[#B69252]/30 pl-4">
                  <p className="text-[#151E39] text-sm font-semibold">{item.value}</p>
                  <p className="text-[#151E39]/50 text-xs tracking-wide mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-[16/9] relative overflow-hidden">
              <Image src="/stari-bar-altstadt.webp" alt="Stari Bar Festung" fill className="object-cover" />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image src="/view-olivenhain.webp" alt="Olivenhaine" fill className="object-cover" />
            </div>
            <div className="aspect-square relative overflow-hidden">
              <Image src="/view-hafen.webp" alt="Hafen von Bar" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WOHNUNGSTYPEN ────────────────────────────────────────────── */}
      <section className="py-24 bg-[#151E39]">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="text-center mb-16">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Die Wohnungen</p>
            <h2
              className="text-white text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {wohnungenHeadline}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {wohnungenTypes.map((unit, i) => (
              <div key={unit.type} className="group bg-[#151E39] overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={mediaUrl(unit.image, fallbackImgs[i] ?? '/interieur-wohnen-01.webp')}
                    alt={unit.type}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#151E39]/40 group-hover:bg-[#151E39]/20 transition-colors duration-500" />
                  {unit.tag && (
                    <span className="absolute top-4 left-4 bg-[#B69252] text-white text-xs tracking-widest px-3 py-1">
                      {unit.tag}
                    </span>
                  )}
                </div>
                <div className="p-8">
                  <h3
                    className="text-white text-2xl mb-1"
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                  >
                    {unit.type}
                  </h3>
                  <p className="text-[#B69252] text-sm tracking-wide mb-4">
                    {[unit.units, unit.size].filter(Boolean).join(' · ')}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{unit.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{unit.price}</span>
                    <Link
                      href="/wohnungen"
                      className="text-[#B69252] text-xs tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2"
                    >
                      Details
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                        <path d="M0 4h14M10 1l4 3-4 3" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {wohnungenHinweis && (
            <p className="text-white/40 text-xs leading-relaxed text-center max-w-2xl mx-auto mt-8">
              {wohnungenHinweis}
            </p>
          )}
          <PricingTimeline />
        </div>
      </section>

      {/* ── INVESTMENT TEASER ────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image src="/view-hafen.webp" alt="Bar Hafen" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#B69252] text-white p-8 max-w-[220px]">
              <p className="text-3xl mb-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                {investBadgeValue}
              </p>
              <p className="text-xs tracking-wide opacity-80">{investBadgeLabel}</p>
            </div>
          </div>
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Investment</p>
            <h2
              className="text-[#151E39] text-4xl md:text-5xl leading-tight mb-8"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {investHeadline}
            </h2>
            <p className="text-[#151E39]/60 font-light leading-relaxed mb-10">{investText}</p>
            <div className="grid grid-cols-3 gap-8 mb-10">
              {investStats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-[#151E39] text-xl md:text-2xl mb-1"
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[#151E39]/40 text-xs tracking-widest uppercase leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/investment"
              className="inline-flex items-center gap-3 text-[#151E39] text-sm tracking-widest uppercase border-b border-[#B69252] pb-1 hover:text-[#B69252] transition-colors"
            >
              Vollständige Investment-Analyse
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path d="M0 4h14M10 1l4 3-4 3" stroke="currentColor" strokeWidth="1" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F0EDE8] border-t border-[#151E39]/10">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {vertrauen.map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                {item.icon && <span className="text-[#B69252] text-2xl mb-3">{item.icon}</span>}
                <p className="text-[#151E39] text-sm font-semibold tracking-wide">{item.title}</p>
                {item.sub && <p className="text-[#151E39]/40 text-xs mt-1">{item.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINALER CTA ──────────────────────────────────────────────── */}
      <section id="kontakt" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/terrasse-berge.webp" alt="Terrasse" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#151E39]/75" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-6">{ctaEyebrow}</p>
          <h2
            className="text-white text-4xl md:text-6xl leading-tight mb-6"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {ctaHeadline}
          </h2>
          <p className="text-white/60 font-light text-lg mb-12 max-w-xl mx-auto">{ctaDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="px-10 py-4 bg-[#B69252] text-white text-sm tracking-widest uppercase hover:bg-[#a07e3e] transition-colors duration-300"
            >
              Exposé anfragen
            </Link>
            <a
              href={`https://wa.me/${telefonZiffern}?text=${encodeURIComponent('Guten Tag, ich interessiere mich für Baliv Residence.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border border-white/40 text-white text-sm tracking-widest uppercase hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
          <p className="text-white/30 text-xs mt-8 tracking-wide">{ctaNote}</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="bg-[#151E39] py-12">
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <Image src="/logo-white.svg" alt="Baliv Residence" width={140} height={58} />
            <p className="text-white/30 text-xs mt-4">{footerAddress}</p>
            <p className="text-white/30 text-xs mt-1">
              <a href={`mailto:${email}`} className="hover:text-white/60 transition-colors">
                {email}
              </a>
              {' · '}
              <a href={`tel:+${telefonZiffern}`} className="hover:text-white/60 transition-colors">
                {telefon}
              </a>
            </p>
          </div>
          <div className="flex gap-6">
            {footerLegalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/30 hover:text-white/60 text-xs tracking-wide transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 max-w-7xl mx-auto px-8">
          <p className="text-white/20 text-xs text-center">{footerCopyright}</p>
        </div>
      </footer>
    </main>
  )
}
