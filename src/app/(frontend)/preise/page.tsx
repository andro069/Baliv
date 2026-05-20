import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { PageFooter } from '@/components/PageFooter'

export const metadata: Metadata = {
  title: 'Preise — Baliv Residence, Bar Montenegro',
  description:
    'Studio ab 69.600 €, Zweizimmer ab 112.800 €, Penthouse ab 219.000 €. Frühbucherpreise ab 2.400 €/m² — direkt vom Bauträger, ohne Makler.',
}

const types = [
  {
    nr: '01',
    type: 'Studio',
    tag: 'Erdgeschoss',
    size: '28–30 m²',
    pricePerSqm: 'ab 2.400 €/m²',
    units: '2 Einheiten',
    exampleSize: 29,
    examplePrice: 69600,
    features: [
      'Wohn-/Schlafbereich kombiniert',
      'Küchenzeile',
      'Badezimmer',
      'Terrasse & Gartenzugang',
    ],
    highlight: false,
    floorplan: '/grundriss-studio.webp',
  },
  {
    nr: '02',
    type: 'Zweizimmer­wohnung',
    tag: 'Alle Etagen',
    size: '47–52 m²',
    pricePerSqm: 'ab 2.400 €/m²',
    units: '35 Einheiten',
    exampleSize: 50,
    examplePrice: 120000,
    features: [
      '1 Schlafzimmer',
      'Wohn-/Essbereich',
      'Küche',
      'Badezimmer',
      'Balkon oder Terrasse',
    ],
    highlight: true,
    floorplan: '/grundriss-apartment.webp',
  },
  {
    nr: '03',
    type: 'Penthouse',
    tag: 'Dachgeschoss',
    size: '73–81 m²',
    pricePerSqm: 'ab 3.000 €/m²',
    units: '2 Einheiten',
    exampleSize: 77,
    examplePrice: 231000,
    features: [
      '2 Schlafzimmer',
      'Wohn-/Essbereich',
      'Küche',
      'Badezimmer + Gäste-WC',
      'Dachterrasse 30–50 m²',
      '360° Panoramablick',
    ],
    highlight: false,
    floorplan: '/grundriss-penthouse.webp',
  },
]

const paymentSteps = [
  { step: '01', date: 'Sofort', label: 'Reservierung', amount: '5.000 €', pct: null, note: 'Einheit wird reserviert und vom Markt genommen' },
  { step: '02', date: 'Okt. 2026', label: 'Baugenehmigung', amount: '40 %', pct: 40, note: 'Nach Erhalt der offiziellen Baugenehmigung' },
  { step: '03', date: 'Q2 2027', label: 'Rohbau', amount: '30 %', pct: 30, note: 'Bei Abschluss des Rohbaus' },
  { step: '04', date: 'Q4 2027', label: 'Dachschluss', amount: '20 %', pct: 20, note: 'Bei Dachschluss und Ausbaubeginn' },
  { step: '05', date: 'Dez. 2028', label: 'Schlüsselübergabe', amount: '10 %', pct: 10, note: 'Bei vollständiger Fertigstellung' },
]

const included = [
  { label: 'Hansgrohe Sanitärarmaturen', included: true },
  { label: 'LG Klimaanlage', included: true },
  { label: 'Naturstein-Böden', included: true },
  { label: 'Geölte Eichenoberflächen', included: true },
  { label: 'Eurocode 8 Erdbebenstandard', included: true },
  { label: 'Schlüsselfertige Übergabe', included: true },
  { label: 'MwSt. inklusive', included: true },
  { label: 'Einbauküche', included: false, note: 'optional (Premium-Paket)' },
  { label: 'Tiefgaragenplatz', included: false, note: 'separat erwerbbar' },
]

export default function PreisePage() {
  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#151E39] pt-32 pb-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Preisübersicht</p>
          <h1
            className="text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-3xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Transparent.
            <br />
            <em className="not-italic text-[#B69252]">Direkt vom Bauträger.</em>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed">
            Keine Maklergebühren, keine versteckten Kosten. MwSt. ist im Kaufpreis enthalten.
            Frühbucherpreise gelten bis zur Baugenehmigung im Oktober 2026.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { v: 'ab 69.600 €', l: 'Studio' },
              { v: 'ab 112.800 €', l: 'Zweizimmer' },
              { v: 'ab 219.000 €', l: 'Penthouse' },
              { v: '0 €', l: 'Maklergebühr' },
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
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-3">Wohnungstypen</p>
          <h2
            className="text-[#151E39] text-3xl md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Drei Typen, ein Preisniveau.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {types.map((t) => (
            <div
              key={t.nr}
              className="relative rounded overflow-hidden flex flex-col bg-[#151E39] shadow-2xl ring-1 ring-[#B69252]/20"
            >
              {t.highlight && (
                <div className="bg-[#B69252] text-white text-xs tracking-widest uppercase text-center py-2 px-4">
                  Meistgewählt · 35 Einheiten
                </div>
              )}

              {/* Grundriss */}
              <div className="relative aspect-[4/3] bg-white/5">
                <Image
                  src={t.floorplan}
                  alt={`Grundriss ${t.type}`}
                  fill
                  className="object-contain p-6"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs tracking-widest uppercase text-[#B69252]/60">
                      Typ {t.nr} · {t.tag}
                    </span>
                    <h3
                      className="text-xl mt-1 text-white"
                      style={{ fontFamily: 'var(--font-playfair), serif' }}
                    >
                      {t.type}
                    </h3>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/50">
                    {t.units}
                  </span>
                </div>

                <div className="text-sm mb-1 text-white/40">{t.size}</div>
                <div className="text-2xl font-light mb-5 text-[#B69252]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {t.pricePerSqm}
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-white/60">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Example price */}
                <div className="rounded p-4 mb-5 bg-white/5 border border-white/10">
                  <div className="text-xs tracking-widest uppercase mb-1 text-white/30">
                    Beispiel · {t.exampleSize} m²
                  </div>
                  <div className="text-2xl font-light text-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    {t.examplePrice.toLocaleString('de-DE')} €
                  </div>
                  <div className="text-xs mt-1 text-white/20">
                    Frühbucher · inkl. MwSt.
                  </div>
                </div>

                <Link
                  href="/kontakt"
                  className="text-center text-sm tracking-widest uppercase py-3 px-4 transition-colors bg-[#B69252] text-white hover:bg-[#a07d3f]"
                >
                  Exposé anfragen
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WAS ENTHALTEN ────────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Im Kaufpreis</p>
              <h2
                className="text-white text-3xl md:text-5xl leading-tight mb-6"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                Was der Preis
                <br />
                <em className="not-italic text-[#B69252]">beinhaltet.</em>
              </h2>
              <p className="text-white/50 leading-relaxed">
                Alle Wohnungen werden schlüsselfertig übergeben. Was im Kaufpreis
                enthalten ist — und was optional hinzugebucht werden kann.
              </p>
            </div>

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
                    <span className="text-[#B69252] text-xs ml-4 flex-shrink-0">inklusive</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ZAHLUNGSPLAN ─────────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-3">Zahlungsplan</p>
          <h2
            className="text-[#151E39] text-3xl md:text-5xl leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Kapital schützen.
            <br />
            <em className="not-italic text-[#B69252]">Schrittweise investieren.</em>
          </h2>
        </div>

        <div className="space-y-3">
          {paymentSteps.map((step, idx) => (
            <div
              key={step.step}
              className={`grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_80px_1fr_1fr_auto] gap-4 items-center rounded p-5 ${
                idx === 0 ? 'bg-[#B69252]/10 border border-[#B69252]/30' : 'bg-white border border-[#151E39]/10'
              }`}
            >
              {/* Step number */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                idx === 0 ? 'bg-[#B69252] text-white' : 'bg-[#F0EDE8] text-[#151E39]/40 border border-[#151E39]/10'
              }`}>
                {step.step}
              </div>

              {/* Date */}
              <div className="hidden md:block">
                <div className="text-[#B69252] text-xs tracking-widest uppercase">{step.date}</div>
              </div>

              {/* Label + note */}
              <div>
                <div className="text-[#151E39] font-medium">{step.label}</div>
                <div className="text-[#151E39]/40 text-xs mt-0.5 hidden md:block">{step.note}</div>
                <div className="text-[#B69252] text-xs mt-0.5 md:hidden">{step.date}</div>
              </div>

              {/* Progress bar (md+) */}
              {step.pct !== null ? (
                <div className="hidden md:flex items-center gap-3">
                  <div className="flex-1 bg-[#151E39]/10 rounded-full h-1.5">
                    <div
                      className="bg-[#B69252] h-1.5 rounded-full"
                      style={{ width: `${step.pct}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="hidden md:block" />
              )}

              {/* Amount */}
              <div className="text-right">
                <div className="text-[#151E39] font-medium text-lg" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {step.amount}
                </div>
                {step.pct !== null && (
                  <div className="text-[#151E39]/30 text-xs">des Kaufpreises</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Nebenkosten */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Nebenkosten gesamt', value: '1,5–2,5 %', note: 'Notar, Anwalt, Übersetzung, Grundbuch' },
            { label: 'MwSt.', value: 'inklusive', note: 'Im Kaufpreis enthalten' },
            { label: 'Maklergebühr', value: '0 €', note: 'Direktkauf vom Bauträger' },
          ].map((item) => (
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
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Beispielrechnung</p>
            <h2
              className="text-white text-3xl md:text-5xl leading-tight"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Was kostet eine{' '}
              <em className="not-italic text-[#B69252]">konkret?</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {types.map((t) => (
              <div key={t.nr} className="bg-white/5 border border-white/10 rounded p-7">
                <div className="text-white/30 text-xs tracking-widest uppercase mb-1">Typ {t.nr}</div>
                <div className="text-white text-lg mb-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {t.type}
                </div>
                <div className="text-white/30 text-sm mb-6">{t.size}</div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Wohnfläche</span>
                    <span className="text-white">{t.exampleSize} m²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Preis/m²</span>
                    <span className="text-white">{t.pricePerSqm.replace('ab ', '')}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between">
                    <span className="text-white/60 text-sm">Kaufpreis</span>
                    <span className="text-[#B69252] font-medium">
                      {t.examplePrice.toLocaleString('de-DE')} €
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Nebenkosten (~2 %)</span>
                    <span className="text-white/60">
                      ~{Math.round(t.examplePrice * 0.02).toLocaleString('de-DE')} €
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between">
                    <span className="text-white text-sm font-medium">Gesamt</span>
                    <span className="text-white font-medium">
                      ~{Math.round(t.examplePrice * 1.02).toLocaleString('de-DE')} €
                    </span>
                  </div>
                </div>

                <div className="bg-[#B69252]/10 border border-[#B69252]/20 rounded p-3 text-center">
                  <div className="text-[#B69252]/60 text-xs mb-0.5">Reservierung</div>
                  <div className="text-white text-sm">5.000 € · sofort</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="kontakt" className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Jetzt reservieren</p>
          <h2
            className="text-[#151E39] text-3xl md:text-5xl mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Frühbucherpreise
            <br />
            <em className="not-italic text-[#B69252]">bis Oktober 2026.</em>
          </h2>
          <p className="text-[#151E39]/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Nach Erteilung der Baugenehmigung im Oktober 2026 werden die Preise angepasst.
            Sichern Sie sich jetzt Ihre Einheit zum Frühbucherpreis — mit nur 5.000 € Reservierung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 bg-[#B69252] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors"
            >
              Aktuelle Preisliste anfordern
            </a>
            <a
              href="https://wa.me/38268517873?text=Guten%20Tag%2C%20ich%20m%C3%B6chte%20die%20aktuelle%20Preisliste%20und%20Verf%C3%BCgbarkeit%20von%20Baliv%20Residence%20anfragen."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#151E39]/20 text-[#151E39] px-8 py-4 text-sm tracking-widest uppercase hover:border-[#151E39]/50 transition-colors"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-[#151E39]/30 text-xs mt-6">
            Antwort in &lt; 24 Stunden · Deutschsprachig · Direkt vom Bauträger · Kein Makler
          </p>
        </div>
      </section>

      <PageFooter />
    </main>
  )
}
