import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { PageFooter } from '@/components/PageFooter'
import { mergeOpenGraph, SITE_URL } from '@/utilities/mergeOpenGraph'

function t(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function mediaUrl(field: any, fallback: string): string {
  if (!field || typeof field !== 'object') return fallback
  return field.url ?? fallback
}

type Punkt = { title: string; text?: string | null }
type Schritt = { step?: string | null; title: string; amount?: string | null; text?: string | null }

const D = {
  metaTitle: 'Über uns — Baliv Residence, Bar Montenegro',
  metaDescription:
    'Real Living d.o.o. baut Baliv Residence in Bar: inhabergeführt, deutschsprachig, direkt vom Bauträger. Die Baugenehmigung liegt vor, gekauft wird mit notariellem Hauptvertrag.',
  werWirSindPunkte: [
    { title: 'Sitz in Bar', text: 'Real Living d.o.o. · Bjeliši BB, 85000 Bar, Montenegro' },
    { title: 'Registriert in Montenegro', text: 'Centralni registar privrednih subjekata (CRPS), Podgorica · PIB 03550168' },
    { title: 'Beratung auf Deutsch', text: 'Persönlich, per E-Mail, Telefon oder WhatsApp.' },
    { title: 'Direkt vom Bauträger', text: 'Kein Makler, keine Maklerprovision.' },
  ] as Punkt[],
  wieWirBauenPunkte: [
    { title: 'Hauptprojekt in neun Fachbüchern', text: 'Die Planung ist vollständig ausgearbeitet und liegt in neun Fachbüchern vor.' },
    { title: 'Unabhängige Revision bestanden', text: 'Das Hauptprojekt wurde unabhängig geprüft und hat die Revision bestanden.' },
    { title: 'Entwurf aus Bar', text: 'Die Architektur stammt von ArchDesign Studio, Bar.' },
    { title: 'Lastenfreies Volleigentum', text: 'Sie erwerben Volleigentum (Svojina 1/1), lastenfrei und notariell beurkundet.' },
  ] as Punkt[],
  schritte: [
    {
      step: '01',
      title: 'Notarieller Kaufvertrag',
      amount: '40 %',
      text: 'Die Baugenehmigung liegt vor. Sie schließen direkt den notariellen Hauptvertrag, keinen Vorvertrag.',
    },
    { step: '02', title: 'Rohbau fertiggestellt', amount: '40 %', text: '' },
    { step: '03', title: 'Fertigstellung und Schlüsselübergabe', amount: '20 %', text: '' },
  ] as Schritt[],
}

async function lade() {
  try {
    const payload = await getPayload({ config })
    return (await payload.findGlobal({ slug: 'ueber-uns-page', depth: 1 })) as any
  } catch {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const cms = await lade()
  const title = t(cms?.meta?.title, D.metaTitle)
  const description = t(cms?.meta?.description, D.metaDescription)
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}/ueber-uns` },
    openGraph: mergeOpenGraph({ title, description, url: `${SITE_URL}/ueber-uns` }),
  }
}

export default async function UeberUnsPage() {
  const cms = await lade()

  const hero = {
    eyebrow: t(cms?.hero?.eyebrow, 'Über uns'),
    headline: t(cms?.hero?.headline, 'Wer Baliv Residence baut.'),
    description: t(
      cms?.hero?.description,
      'Real Living d.o.o. ist der Bauträger von Baliv Residence — inhabergeführt, mit Sitz in Bar und mit Beratung auf Deutsch.',
    ),
    image: mediaUrl(cms?.hero?.image, '/day-01.webp'),
  }

  const wer = {
    eyebrow: t(cms?.werWirSind?.eyebrow, 'Wer wir sind'),
    headline: t(cms?.werWirSind?.headline, 'Inhabergeführt. Deutschsprachig. Direkt.'),
    text: t(
      cms?.werWirSind?.text,
      'Hinter Baliv Residence steht Real Living d.o.o., eine in Montenegro registrierte Gesellschaft mit Sitz in Bar. Wir verkaufen selbst, ohne Makler dazwischen — Sie sprechen direkt mit dem Bauträger, und zwar auf Deutsch.',
    ),
    punkte: (cms?.werWirSind?.punkte?.length ? cms.werWirSind.punkte : D.werWirSindPunkte) as Punkt[],
  }

  const bar = {
    eyebrow: t(cms?.warumBar?.eyebrow, 'Warum Bar'),
    headline: t(cms?.warumBar?.headline, 'Ein Ort mit eigenem Alltag.'),
    text: t(
      cms?.warumBar?.text,
      'Baliv Residence entsteht am Fuß der historischen Festungsstadt Stari Bar, eingebettet in über 100.000 Olivenbäume, zwischen dem Rumija-Gebirge und der Adria. Rund einen Kilometer sind es zur Festung, etwa acht Minuten zum ersten Strand und zum Hafen mit der Fähre nach Bari. Bar ist eine gewachsene Küstenstadt — nicht nur ein Ferienort.',
    ),
    linkLabel: t(cms?.warumBar?.linkLabel, 'Mehr zur Lage'),
    linkHref: t(cms?.warumBar?.linkHref, '/lage'),
    image: mediaUrl(cms?.warumBar?.image, '/stari-bar-altstadt.webp'),
  }

  const bauen = {
    eyebrow: t(cms?.wieWirBauen?.eyebrow, 'Wie wir bauen'),
    headline: t(cms?.wieWirBauen?.headline, 'Geplant. Geprüft. Genehmigt.'),
    text: t(
      cms?.wieWirBauen?.text,
      'Die Baugenehmigung liegt vor. Grundlage ist ein vollständig ausgearbeitetes Hauptprojekt, das eine unabhängige Revision bestanden hat.',
    ),
    punkte: (cms?.wieWirBauen?.punkte?.length ? cms.wieWirBauen.punkte : D.wieWirBauenPunkte) as Punkt[],
  }

  const kauf = {
    eyebrow: t(cms?.kauf?.eyebrow, 'Kaufablauf'),
    headline: t(cms?.kauf?.headline, 'So läuft der Kauf.'),
    text: t(
      cms?.kauf?.text,
      'Drei Zahlungen, gebunden an den Baufortschritt statt an Kalenderdaten. Einen Vorvertrag oder eine Reservierungsgebühr gibt es nicht.',
    ),
    schritte: (cms?.kauf?.schritte?.length ? cms.kauf.schritte : D.schritte) as Schritt[],
    nebenkosten: t(
      cms?.kauf?.nebenkosten,
      'Nebenkosten für Notar, Anwalt, Übersetzung und Grundbuch: ca. 1,5–2,5 %. MwSt. im Kaufpreis enthalten. Keine Maklerprovision. Keine Grunderwerbsteuer — beim Kauf vom Bauträger entfällt sie.',
    ),
  }

  const cta = {
    eyebrow: t(cms?.cta?.eyebrow, 'Kontakt'),
    headline: t(cms?.cta?.headline, 'Lernen Sie uns kennen.'),
    description: t(
      cms?.cta?.description,
      'Fragen zum Projekt, zum Kaufablauf oder zu einzelnen Einheiten beantworten wir persönlich — auf Deutsch, direkt vom Bauträger.',
    ),
    buttonLabel: t(cms?.cta?.buttonLabel, 'Kontakt aufnehmen'),
    buttonLink: t(cms?.cta?.buttonLink, '/kontakt'),
    note: t(cms?.cta?.note, 'In der Regel Antwort innerhalb von 24 Stunden · Deutschsprachige Beratung'),
  }

  const serif = { fontFamily: 'var(--font-playfair), serif' }
  const gridCols: Record<number, string> = { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5' }

  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[460px]">
        <Image src={hero.image} alt="Baliv Residence in Bar" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151E39]/85 via-[#151E39]/60 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{hero.eyebrow}</p>
          <h1 className="text-white text-4xl md:text-6xl leading-tight mb-6 max-w-2xl" style={serif}>
            {hero.headline}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed">{hero.description}</p>
        </div>
      </section>

      {/* ── 1 · WER WIR SIND ─────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{wer.eyebrow}</p>
            <h2 className="text-[#151E39] text-3xl md:text-5xl leading-tight mb-6" style={serif}>
              {wer.headline}
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed">{wer.text}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#151E39]/10">
            {wer.punkte.map((p) => (
              <div key={p.title} className="bg-[#F0EDE8] p-6">
                <div className="w-6 h-px bg-[#B69252] mb-4" />
                <p className="text-[#151E39] font-medium mb-2">{p.title}</p>
                {p.text && <p className="text-[#151E39]/50 text-sm leading-relaxed">{p.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2 · WARUM BAR ────────────────────────────────────────────────── */}
      <section className="pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image src={bar.image} alt="Stari Bar" fill className="object-cover" />
          </div>
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{bar.eyebrow}</p>
            <h2 className="text-[#151E39] text-3xl md:text-5xl leading-tight mb-6" style={serif}>
              {bar.headline}
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed mb-8">{bar.text}</p>
            <Link
              href={bar.linkHref}
              className="inline-flex items-center gap-3 text-[#151E39] text-sm tracking-widest uppercase border-b border-[#B69252] pb-1 hover:text-[#B69252] transition-colors"
            >
              {bar.linkLabel}
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path d="M0 4h14M10 1l4 3-4 3" stroke="currentColor" strokeWidth="1" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3 · WIE WIR BAUEN ────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{bauen.eyebrow}</p>
            <h2 className="text-white text-3xl md:text-5xl leading-tight mb-6" style={serif}>
              {bauen.headline}
            </h2>
            <p className="text-white/60 leading-relaxed">{bauen.text}</p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols[Math.min(bauen.punkte.length, 4)] ?? 'md:grid-cols-4'} gap-px bg-white/10`}>
            {bauen.punkte.map((p, i) => (
              <div key={p.title} className="bg-[#151E39] p-8">
                <p className="text-[#B69252] text-3xl font-light mb-4" style={serif}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="text-white font-medium mb-3">{p.title}</p>
                {p.text && <p className="text-white/50 text-sm leading-relaxed">{p.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · WIE DER KAUF ABLÄUFT ─────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{kauf.eyebrow}</p>
            <h2 className="text-[#151E39] text-3xl md:text-5xl leading-tight mb-6" style={serif}>
              {kauf.headline}
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed">{kauf.text}</p>
          </div>
          <div className={`grid grid-cols-1 ${gridCols[kauf.schritte.length] ?? 'md:grid-cols-3'} gap-6`}>
            {kauf.schritte.map((s) => (
              <div key={s.title} className="bg-white border border-[#151E39]/10 rounded p-8">
                {s.step && <p className="text-[#B69252] text-xs tracking-widest uppercase mb-4">{s.step}</p>}
                <p className="text-[#151E39] font-medium mb-2">{s.title}</p>
                {s.amount && (
                  <p className="text-[#151E39] text-4xl font-light mb-4" style={serif}>
                    {s.amount}
                  </p>
                )}
                {s.text && <p className="text-[#151E39]/50 text-sm leading-relaxed">{s.text}</p>}
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white border border-[#151E39]/10 rounded p-6 flex items-start gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="9" stroke="#B69252" strokeWidth="1.2" />
              <path d="M12 8v4M12 16h.01" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <p className="text-[#151E39]/60 text-sm leading-relaxed">{kauf.nebenkosten}</p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{cta.eyebrow}</p>
          <h2 className="text-white text-3xl md:text-5xl mb-6 leading-tight" style={serif}>
            {cta.headline}
          </h2>
          <p className="text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">{cta.description}</p>
          <Link
            href={cta.buttonLink}
            className="inline-flex items-center justify-center bg-[#B69252] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors"
          >
            {cta.buttonLabel}
          </Link>
          <p className="text-white/30 text-xs mt-8 tracking-wide">{cta.note}</p>
        </div>
      </section>

      <PageFooter />
    </main>
  )
}
