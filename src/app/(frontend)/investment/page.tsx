import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { PageFooter } from '@/components/PageFooter'

export const metadata: Metadata = {
  title: 'Investment — Baliv Residence, Bar Montenegro',
  description:
    'Investieren in Bar, Montenegro: Euro seit 2002, NATO seit 2017, 9 % Einkommensteuer auf Mieteinnahmen. Beispielrechnung, Steuerüberblick und Zahlungsplan.',
}

const WHATSAPP_URL =
  'https://wa.me/38268517873?text=Guten%20Tag%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Baliv%20Residence.'

const defaultHeroKennzahlen = [
  { value: 'Euro', label: 'seit 2002' },
  { value: 'NATO', label: 'seit 2017' },
  { value: '9 %', label: 'Einkommensteuer auf Mieteinnahmen' },
]

const defaultBildKennzahlen = [
  { value: 'NATO', label: 'seit 2017' },
  { value: 'Euro', label: 'seit 2002' },
  { value: 'EU', label: 'Ziel 2028, Verhandlungen laufen' },
  { value: '0 %', label: 'Vermögensteuer' },
]

const defaultTaxAdvantages = [
  {
    label: 'Grunderwerbsteuer',
    value: 'entfällt',
    note: 'Beim Kauf vom Bauträger. Der Kaufpreis enthält 21 % MwSt.; die Übertragungssteuer fällt erst beim Weiterverkauf an (gestaffelt 3–6 %).',
  },
  { label: 'Jahresgrundsteuer', value: '0,1–1 %', note: 'Je nach Lage und Größe' },
  { label: 'Einkommensteuer (Miete)', value: '9 %', note: 'Pauschal auf Mieteinnahmen' },
  { label: 'Körperschaftsteuer', value: '9 / 12 / 15 %', note: 'Gestaffelt nach Gewinnhöhe' },
  { label: 'Kapitalertragsteuer', value: '9 %', note: 'Auf Veräußerungsgewinn' },
  { label: 'Mehrwertsteuer', value: 'Inklusive', note: 'Im Kaufpreis enthalten' },
]

const defaultPaymentSteps = [
  {
    step: '01',
    label: 'Notarieller Kaufvertrag',
    amount: '40 %',
    note: 'Die Baugenehmigung liegt vor. Sie schließen direkt den notariellen Hauptvertrag, keinen Vorvertrag.',
  },
  { step: '02', label: 'Rohbau fertiggestellt', amount: '40 %', note: '' },
  { step: '03', label: 'Fertigstellung und Schlüsselübergabe', amount: '20 %', note: '' },
]

const defaultZeitleiste = [
  { year: '2026', event: 'Genehmigung und Baubeginn', note: '' },
  { year: '2027', event: 'Rohbau', note: '' },
  { year: '2028', event: 'Übergabe (Q2)', note: '' },
]

const defaultRental = {
  size: 46.79,
  pricePerSqm: 2500,
  hauptsaisonWochen: 10,
  hauptsaisonWochenpreis: 850,
  nebensaisonWochen: 15,
  nebensaisonWochenpreis: 450,
  verwaltungQuote: 20,
  betriebskosten: 900,
  steuersatz: 9,
}

const reasons = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L4 12v4c0 7 4.5 13.5 12 15 7.5-1.5 12-8 12-15v-4L16 4z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M11 16l4 4 6-7" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'NATO-Mitglied',
    text: 'Seit 2017 Mitglied des westlichen Verteidigungsbündnisses.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="#B69252" strokeWidth="1.2"/>
        <path d="M16 5c0 0-5 5-5 11s5 11 5 11M16 5c0 0 5 5 5 11s-5 11-5 11M5 16h22" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Euro-Währung',
    text: 'Seit 2002. Kein Wechselkursrisiko für Anleger aus dem Euroraum.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 20L10 8l6 6 6-9 6 15H4z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M4 20h24" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'EU-Beitrittskandidat',
    text: 'Die Beitrittsverhandlungen laufen; als Zieldatum wird 2028 genannt.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="10" width="20" height="16" rx="1.5" stroke="#B69252" strokeWidth="1.2"/>
        <path d="M10 10V8a6 6 0 0112 0v2" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="16" cy="18" r="2" stroke="#B69252" strokeWidth="1.2"/>
      </svg>
    ),
    title: 'Rechtssicherheit',
    text: 'Ausländer können Wohnungseigentum erwerben. Notariell beurkundete Eigentumsübertragung.',
  },
]

function mediaUrl(field: any, fallback: string): string {
  if (!field) return fallback
  if (typeof field === 'string' || typeof field === 'number') return fallback
  return field.url ?? fallback
}

function num(value: any, fallback: number): number {
  const n = typeof value === 'string' ? parseFloat(value) : value
  return typeof n === 'number' && Number.isFinite(n) ? n : fallback
}

const eur = (n: number) => `${Math.round(n).toLocaleString('de-DE')} €`
const dec = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 2 })

export default async function InvestmentPage() {
  const payload = await getPayload({ config })
  const cms = await payload.findGlobal({ slug: 'investment-page' })

  // ── Hero ──
  const hero = (cms as any)?.hero ?? {}
  const heroHeadline = hero.headline ?? 'Investieren, wo Europa wächst.'
  const heroDescription =
    hero.description ??
    'Montenegro: stabile Währung, niedrige Unternehmens- und Einkommensteuer — und ein Markt, der gerade erst entdeckt wird.'
  const heroImage = mediaUrl(hero.image, '/terrasse-berge.webp')
  const cmsHeroKpis: any[] = hero.kennzahlen ?? []
  const heroKennzahlen = cmsHeroKpis.length > 0
    ? cmsHeroKpis.map((k: any) => ({ value: k.value ?? '', label: k.label ?? '' }))
    : defaultHeroKennzahlen

  // ── Warum Montenegro ──
  const warum = (cms as any)?.warumMontenegro ?? {}
  const warumHeadline = warum.headline ?? 'Warum Montenegro?'
  const warumDescription =
    warum.description ??
    'Westliche Rahmenbedingungen: der Euro als Währung, die NATO-Mitgliedschaft und der Erwerb von Wohnungseigentum auch für Ausländer. Montenegro ist EU-Beitrittskandidat, die Verhandlungen laufen; als Zieldatum wird 2028 genannt.'
  const warumImage = mediaUrl(warum.image, '/building-front.webp')
  const cmsVorteile: any[] = warum.vorteile ?? []
  const vorteile = cmsVorteile.length > 0
    ? cmsVorteile.map((v: any, idx: number) => ({
        icon: reasons[idx]?.icon ?? reasons[0].icon,
        title: v.title ?? reasons[idx]?.title ?? '',
        text: v.text ?? reasons[idx]?.text ?? '',
      }))
    : reasons
  const cmsBildKpis: any[] = warum.bildKennzahlen ?? []
  const bildKennzahlen = cmsBildKpis.length > 0
    ? cmsBildKpis.map((k: any) => ({ value: k.value ?? '', label: k.label ?? '' }))
    : defaultBildKennzahlen

  // ── Marktdaten ──
  const m = (cms as any)?.marktdaten ?? {}
  const markt = {
    eyebrow: m.eyebrow ?? 'Marktdaten',
    headline: m.headline ?? 'Bar an der',
    headlineAccent: m.headlineAccent ?? 'montenegrinischen Adria.',
    description:
      m.description ??
      'Bar hat den wichtigsten Seehafen Montenegros und liegt direkt unterhalb der historischen Altstadt Stari Bar. Die Einstiegspreise bei Baliv Residence beginnen ab 2.500 €/m².',
    kennzahlWert: (m.kennzahlWert ?? '').trim(),
    kennzahlLabel: m.kennzahlLabel ?? '',
    kennzahlText: m.kennzahlText ?? '',
    quelle: (m.quelle ?? '').trim(),
    zeitleisteTitel: m.zeitleisteTitel ?? 'Entwicklungspfad',
  }
  const cmsZeitleiste: any[] = m.zeitleiste ?? []
  const zeitleiste = cmsZeitleiste.length > 0
    ? cmsZeitleiste.map((t: any) => ({ year: t.year ?? '', event: t.event ?? '', note: t.note ?? '' }))
    : defaultZeitleiste

  // ── Mietrendite (alle Beträge werden aus den Feldern berechnet) ──
  const r = (cms as any)?.mietRendite ?? {}
  const rentalHeadline = r.headline ?? 'Mietertrag an einem Beispiel.'
  const rentalDescription =
    r.description ??
    'Bar liegt nahe Stari Bar, dem Hafen und der Natur der Küste. Die Beispielrechnung zeigt, wie sich Mieteinnahmen, Kosten und Steuer bei einer Zweizimmerwohnung zusammensetzen.'
  const rentalFootnote =
    r.fussnote ??
    'Beispielrechnung auf Basis marktüblicher Wochenpreise, Stand 2026. Keine Zusicherung einer Rendite. Steuerliche Behandlung individuell.'
  const size = num(r.size, defaultRental.size)
  const pricePerSqm = num(r.pricePerSqm, defaultRental.pricePerSqm)
  const hsWochen = num(r.hauptsaisonWochen, defaultRental.hauptsaisonWochen)
  const hsPreis = num(r.hauptsaisonWochenpreis, defaultRental.hauptsaisonWochenpreis)
  const nsWochen = num(r.nebensaisonWochen, defaultRental.nebensaisonWochen)
  const nsPreis = num(r.nebensaisonWochenpreis, defaultRental.nebensaisonWochenpreis)
  const verwaltungQuote = num(r.verwaltungQuote, defaultRental.verwaltungQuote)
  const betriebskosten = num(r.betriebskosten, defaultRental.betriebskosten)
  const steuersatz = num(r.steuersatz, defaultRental.steuersatz)

  const kaufpreis = Math.round(size * pricePerSqm)
  const einnahmenHS = Math.round(hsWochen * hsPreis)
  const einnahmenNS = Math.round(nsWochen * nsPreis)
  const brutto = einnahmenHS + einnahmenNS
  const verwaltung = Math.round((brutto * verwaltungQuote) / 100)
  const betrieb = Math.round(betriebskosten)
  const vorSteuer = brutto - verwaltung - betrieb
  const steuer = Math.round((vorSteuer * steuersatz) / 100)
  const netto = vorSteuer - steuer
  const rendite = kaufpreis > 0 ? (netto / kaufpreis) * 100 : 0

  const rentalRows: { label: string; value: string; strong?: boolean }[] = [
    { label: `Kaufpreis (${dec(size)} m² × ${eur(pricePerSqm)})`, value: eur(kaufpreis) },
    { label: `Hauptsaison · ${dec(hsWochen)} Wochen × ${eur(hsPreis)}`, value: eur(einnahmenHS) },
    { label: `Nebensaison · ${dec(nsWochen)} Wochen × ${eur(nsPreis)}`, value: eur(einnahmenNS) },
    { label: 'Bruttoeinnahmen', value: eur(brutto), strong: true },
    { label: `– Verwaltung und Reinigung (${dec(verwaltungQuote)} %)`, value: `– ${eur(verwaltung)}` },
    { label: '– Betrieb und Instandhaltung', value: `– ${eur(betrieb)}` },
    { label: '= Ertrag vor Steuer', value: eur(vorSteuer), strong: true },
    { label: `– Einkommensteuer ${dec(steuersatz)} %`, value: `– ${eur(steuer)}` },
  ]

  // ── Steuern ──
  const st = (cms as any)?.steuerSektion ?? {}
  const steuerSektion = {
    headline: st.headline ?? 'Keine Vermögensteuer.',
    headlineAccent: st.headlineAccent ?? '9 % auf Mieteinnahmen.',
    description:
      st.description ??
      'Die wichtigsten Steuern beim Kauf und bei der Vermietung einer Wohnung in Montenegro im Überblick.',
    fussnote:
      st.fussnote ??
      'Allgemeine Informationen, Stand 2026. Keine Steuerberatung. Die Behandlung im Wohnsitzland richtet sich nach dem jeweiligen Doppelbesteuerungsabkommen.',
  }
  const cmsTax: any[] = (cms as any)?.steuerDaten ?? []
  const taxAdvantages = cmsTax.length > 0
    ? cmsTax.map((t: any) => ({ label: t.label ?? '', value: t.value ?? '', note: t.note ?? '' }))
    : defaultTaxAdvantages

  // ── Zahlungsplan ──
  const z = (cms as any)?.zahlungsplan ?? {}
  const zahlungsplan = {
    eyebrow: z.eyebrow ?? 'Zahlungsplan',
    headline: z.headline ?? 'So läuft der Kauf',
    nebenkosten:
      z.nebenkosten ??
      'Nebenkosten für Notar, Anwalt, Übersetzung und Grundbuch: ca. 1,5–2,5 %. MwSt. im Kaufpreis enthalten. Keine Maklerprovision. Keine Grunderwerbsteuer — beim Kauf vom Bauträger entfällt sie.',
  }
  const cmsSteps: any[] = (cms as any)?.paymentSteps ?? []
  const paymentSteps = cmsSteps.length > 0
    ? cmsSteps.map((s: any, idx: number) => ({
        step: s.step ?? `0${idx + 1}`,
        label: s.label ?? '',
        amount: s.amount ?? '',
        note: s.note ?? '',
      }))
    : defaultPaymentSteps

  // ── CTA ──
  const c = (cms as any)?.cta ?? {}
  const cta = {
    eyebrow: c.eyebrow ?? 'Investment-Exposé anfordern',
    headline: c.headline ?? 'Zahlen, Marktdaten und Verfügbarkeit,',
    headlineAccent: c.headlineAccent ?? 'direkt vom Bauträger.',
    description:
      c.description ??
      'Das Investment-Exposé enthält Grundrisse, die vollständige Preisliste sowie Angaben zu Steuern und Abgaben — kostenlos und deutschsprachig.',
    buttonLabel: c.buttonLabel ?? 'Investment-Exposé anfordern',
    tags:
      (c.tags ?? []).length > 0
        ? (c.tags as any[]).map((t: any) => t.label ?? '')
        : ['In der Regel Antwort innerhalb von 24 Stunden', 'Deutschsprachig', 'Kein Makler', 'Direkt vom Bauträger'],
  }

  const kpiCols = heroKennzahlen.length >= 4 ? 'md:grid-cols-4' : heroKennzahlen.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
  const stepCols = paymentSteps.length >= 5 ? 'md:grid-cols-5' : paymentSteps.length === 4 ? 'md:grid-cols-4' : paymentSteps.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
  const timelineCols = zeitleiste.length >= 6 ? 'md:grid-cols-6' : zeitleiste.length === 5 ? 'md:grid-cols-5' : zeitleiste.length === 4 ? 'md:grid-cols-4' : zeitleiste.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'

  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[540px]">
        <Image
          src={heroImage}
          alt="Baliv Residence Aussicht"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151E39]/85 via-[#151E39]/60 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Investment</p>
          <h1
            className="text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-2xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {heroHeadline}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed">
            {heroDescription}
          </p>
        </div>

        {/* KPI bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#151E39]/90 backdrop-blur-sm">
          <div className={`max-w-7xl mx-auto px-8 py-5 grid grid-cols-2 ${kpiCols} divide-x divide-white/10`}>
            {heroKennzahlen.map((kpi) => (
              <div key={`${kpi.value}-${kpi.label}`} className="px-4 md:px-8 text-center py-1">
                <div className="text-[#B69252] text-xl md:text-2xl font-light">{kpi.value}</div>
                <div className="text-white/40 text-[9px] md:text-xs tracking-widest uppercase mt-0.5">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WARUM MONTENEGRO ─────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Standortvorteil</p>
            <h2
              className="text-[#151E39] text-3xl md:text-5xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {warumHeadline}
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed mb-10">
              {warumDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {vorteile.map((r) => (
                <div key={r.title} className="flex gap-4">
                  <div className="flex-shrink-0 mt-0.5">{r.icon}</div>
                  <div>
                    <div className="text-[#151E39] font-medium mb-1">{r.title}</div>
                    <div className="text-[#151E39]/50 text-sm leading-relaxed">{r.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded overflow-hidden">
            <Image
              src={warumImage}
              alt="Baliv Residence"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151E39]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="grid grid-cols-2 gap-3">
                {bildKennzahlen.map((b) => (
                  <div key={`${b.value}-${b.label}`} className="bg-[#151E39]/70 backdrop-blur-sm rounded p-3 text-center">
                    <div className="text-[#B69252] text-lg font-light">{b.value}</div>
                    <div className="text-white/50 text-xs tracking-wide">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARKTDATEN ───────────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{markt.eyebrow}</p>
            <h2
              className="text-white text-3xl md:text-5xl leading-tight"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {markt.headline}
              <br />
              <em className="not-italic text-[#B69252]">{markt.headlineAccent}</em>
            </h2>
            {markt.description && (
              <p className="text-white/60 mt-6 max-w-2xl mx-auto leading-relaxed">{markt.description}</p>
            )}
          </div>

          {markt.kennzahlWert && (
            <div className="max-w-md mx-auto mb-12">
              <div className="bg-white/5 border border-white/10 rounded p-8 text-center">
                <div className="text-[#B69252] text-4xl md:text-5xl font-light mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {markt.kennzahlWert}
                  {markt.quelle && <sup className="text-base align-super ml-1">1</sup>}
                </div>
                {markt.kennzahlLabel && <div className="text-white font-medium mb-1">{markt.kennzahlLabel}</div>}
                {markt.kennzahlText && (
                  <div className="text-white/50 text-sm leading-relaxed border-t border-white/10 pt-4 mt-4">{markt.kennzahlText}</div>
                )}
              </div>
              {markt.quelle && <p className="text-white/40 text-xs mt-3 text-center">¹ {markt.quelle}</p>}
            </div>
          )}

          {/* Timeline bar */}
          <div className="bg-white/5 border border-white/10 rounded p-8">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-6">{markt.zeitleisteTitel}</p>
            <div className="relative">
              <div className="absolute top-4 left-0 right-0 h-px bg-white/10" />
              <div className={`grid grid-cols-1 ${timelineCols} gap-4 relative`}>
                {zeitleiste.map((t, i) => (
                  <div key={`${t.year}-${i}`} className="text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto mb-4 ${i === zeitleiste.length - 1 ? 'bg-[#B69252]' : 'bg-white/30'}`} />
                    <div className="text-[#B69252] text-lg font-light">{t.year}</div>
                    <div className="text-white text-sm mt-1">{t.event}</div>
                    {t.note && <div className="text-white/30 text-xs mt-0.5">{t.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MIETRENDITE ──────────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Mietrendite</p>
            <h2
              className="text-[#151E39] text-3xl md:text-5xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {rentalHeadline}
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed mb-8">
              {rentalDescription}
            </p>

            <div className="space-y-3">
              {[
                { label: 'Hauptsaison', value: `${dec(hsWochen)} Wochen · ${eur(hsPreis)}/Woche` },
                { label: 'Nebensaison', value: `${dec(nsWochen)} Wochen · ${eur(nsPreis)}/Woche` },
                { label: 'Vermietung gesamt', value: `${dec(hsWochen + nsWochen)} Wochen/Jahr` },
                { label: 'Verwaltung und Reinigung', value: `${dec(verwaltungQuote)} % der Einnahmen` },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#151E39]/10">
                  <span className="text-[#151E39]/60 text-sm">{item.label}</span>
                  <span className="text-[#151E39] font-medium text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rendite-Rechner */}
          <div className="bg-[#151E39] rounded p-8">
            <p className="text-[#B69252] text-xs tracking-widest uppercase mb-6">
              Beispielrechnung · {dec(size)} m² Zweizimmerwohnung
            </p>

            <div className="space-y-1 mb-8">
              {rentalRows.map((row) => (
                <div key={row.label} className="flex justify-between items-center gap-4 py-3 border-b border-white/10">
                  <span className={row.strong ? 'text-white text-sm' : 'text-white/50 text-sm'}>{row.label}</span>
                  <span className={`whitespace-nowrap ${row.strong ? 'text-white font-medium' : 'text-white/80'}`}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#B69252]/10 border border-[#B69252]/30 rounded p-5 mb-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[#B69252] text-xs tracking-widest uppercase mb-1">= Nettoertrag</p>
                  <p className="text-white text-3xl font-light" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    {eur(netto)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#B69252] text-xs tracking-widest uppercase mb-1">Rendite auf {eur(kaufpreis)}</p>
                  <p className="text-[#B69252] text-3xl font-light" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    {rendite.toFixed(1).replace('.', ',')} %
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white/40 text-xs leading-relaxed">{rentalFootnote}</p>
          </div>
        </div>
      </section>

      {/* ── STEUERVORTEILE ───────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Steuern</p>
              <h2
                className="text-white text-3xl md:text-5xl leading-tight mb-6"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {steuerSektion.headline}
                <br />
                <em className="not-italic text-[#B69252]">{steuerSektion.headlineAccent}</em>
              </h2>
              <p className="text-white/60 leading-relaxed">
                {steuerSektion.description}
              </p>
            </div>

            <div>
              <div className="space-y-3">
                {taxAdvantages.map((tax) => (
                  <div
                    key={tax.label}
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded px-5 py-4 hover:border-[#B69252]/30 transition-colors"
                  >
                    <div>
                      <div className="text-white text-sm">{tax.label}</div>
                      <div className="text-white/30 text-xs mt-0.5">{tax.note}</div>
                    </div>
                    <div
                      className={`text-xl font-light ml-6 flex-shrink-0 ${tax.value === '0 %' || tax.value === 'entfällt' ? 'text-[#B69252]' : 'text-white'}`}
                      style={{ fontFamily: 'var(--font-playfair), serif' }}
                    >
                      {tax.value}
                    </div>
                  </div>
                ))}
              </div>
              {steuerSektion.fussnote && (
                <p className="text-white/40 text-xs leading-relaxed mt-4">{steuerSektion.fussnote}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ZAHLUNGSPLAN ─────────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{zahlungsplan.eyebrow}</p>
          <h2
            className="text-[#151E39] text-3xl md:text-5xl leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {zahlungsplan.headline}
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-4 left-[16%] right-[16%] h-px bg-[#B69252]/20" />
          <div className={`grid grid-cols-1 ${stepCols} gap-6`}>
            {paymentSteps.map((step, idx) => (
              <div key={`${step.step}-${idx}`} className="relative text-center">
                <div className={`w-8 h-8 rounded-full mx-auto mb-4 flex items-center justify-center text-xs font-medium relative z-10 ${
                  idx === 0 ? 'bg-[#B69252] text-white' : 'bg-[#F0EDE8] border-2 border-[#B69252]/40 text-[#B69252]'
                }`}>
                  {step.step}
                </div>
                <div className="text-[#151E39] font-medium mb-1">{step.label}</div>
                <div className="text-[#151E39] text-2xl font-light mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {step.amount}
                </div>
                {step.note && <div className="text-[#151E39]/50 text-xs leading-relaxed max-w-xs mx-auto">{step.note}</div>}
              </div>
            ))}
          </div>
        </div>

        {zahlungsplan.nebenkosten && (
          <div className="mt-12 bg-white border border-[#151E39]/10 rounded p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
              <circle cx="12" cy="12" r="9" stroke="#B69252" strokeWidth="1.2"/>
              <path d="M12 8v4M12 16h.01" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <p className="text-[#151E39]/60 text-sm leading-relaxed">{zahlungsplan.nebenkosten}</p>
          </div>
        )}
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
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 bg-[#B69252] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors"
            >
              {cta.buttonLabel}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 text-sm tracking-widest uppercase hover:border-white/50 transition-colors"
            >
              WhatsApp
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {cta.tags.map((tag) => (
              <span key={tag} className="text-white/30 text-xs tracking-wide">✓ {tag}</span>
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  )
}
