import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Investment — Baliv Residence, Bar Montenegro',
  description:
    'Montenegro: 6–8% Mietrendite, 25–40% Wertsteigerung bis 2030, Einkommensteuer 9%. Investieren Sie jetzt — vor dem EU-Beitritt 2028.',
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
    text: 'Seit 2017. Politische und militärische Stabilität nach westlichem Standard.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="#B69252" strokeWidth="1.2"/>
        <path d="M16 5c0 0-5 5-5 11s5 11 5 11M16 5c0 0 5 5 5 11s-5 11-5 11M5 16h22" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Euro-Währung',
    text: 'Seit 2002. Kein Wechselkursrisiko für DACH-Investoren.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 20L10 8l6 6 6-9 6 15H4z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M4 20h24" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'EU-Beitritt 2028',
    text: 'Montenegro ist EU-Beitrittskandidat. Der Beitritt ist für 2028 geplant — zeitgleich mit der Fertigstellung.',
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
    text: 'Ausländer dürfen Immobilien uneingeschränkt kaufen. Notariell beurkundete Eigentumsübertragung.',
  },
]

const taxAdvantages = [
  { label: 'Einkommensteuer auf Mieteinnahmen', value: '9 %', note: 'einer der niedrigsten Sätze Europas' },
  { label: 'Körperschaftsteuer', value: '9 %', note: 'bei gewerblicher Vermietung' },
  { label: 'Grunderwerbsteuer', value: '3 %', note: 'einmalig beim Kauf' },
  { label: 'Vermögenssteuer', value: '0 %', note: 'keine Vermögenssteuer' },
  { label: 'Erbschaftssteuer', value: '0 %', note: 'keine Erbschaftssteuer' },
  { label: 'Kapitalertragsteuer', value: '9 %', note: 'bei Wiederverkauf' },
]

const paymentSteps = [
  { step: '01', date: 'Sofort', label: 'Reservierung', amount: '5.000 €', note: 'Einheit wird reserviert' },
  { step: '02', date: 'Okt. 2026', label: 'Baugenehmigung', amount: '40 %', note: 'nach Erhalt der Baugenehmigung' },
  { step: '03', date: 'Q2 2027', label: 'Rohbau', amount: '30 %', note: 'bei Rohbaufertigstellung' },
  { step: '04', date: 'Q4 2027', label: 'Dachschluss', amount: '20 %', note: 'bei Dachschluss' },
  { step: '05', date: 'Dez. 2028', label: 'Übergabe', amount: '10 %', note: 'bei Schlüsselübergabe' },
]

const rentalExample = {
  purchase: 120000,
  size: 50,
  pricePerSqm: 2400,
  weeklyRate: 550,
  occupancyWeeks: 20,
  annualRent: 11000,
  yield: 9.2,
  appreciationLow: 30000,
  appreciationHigh: 48000,
}

export default function InvestmentPage() {
  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[540px]">
        <Image
          src="/terrasse-berge.webp"
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
            Investieren,
            <br />
            wo Europa{' '}
            <em className="not-italic text-[#B69252]">wächst.</em>
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed">
            Montenegro vor dem EU-Beitritt: stabile Währung, niedrigste Steuern Europas,
            zweistellige Renditen — und ein Markt, der gerade erst entdeckt wird.
          </p>
        </div>

        {/* KPI bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#151E39]/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: '6–8 %', label: 'Brutto-Mietrendite' },
              { value: '+21 %', label: 'Küstenwachstum 2024' },
              { value: '25–40 %', label: 'Wertsteigerung 5 J.' },
              { value: '9 %', label: 'Einkommensteuer' },
            ].map((kpi) => (
              <div key={kpi.label} className="px-4 md:px-8 text-center py-1">
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
              Warum Montenegro?
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed mb-10">
              Montenegro kombiniert westliche Rechtssicherheit mit den Wachstumsraten eines
              Schwellenmarkts. Das Fenster vor dem EU-Beitritt — in dem die größten
              Wertsteigerungen stattfinden — schließt sich 2028.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((r) => (
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
              src="/building-front.webp"
              alt="Baliv Residence"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151E39]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: 'NATO', s: 'seit 2017' },
                  { v: 'Euro', s: 'seit 2002' },
                  { v: 'EU', s: 'Beitritt 2028' },
                  { v: '0 %', s: 'Vermögenssteuer' },
                ].map((b) => (
                  <div key={b.v} className="bg-[#151E39]/70 backdrop-blur-sm rounded p-3 text-center">
                    <div className="text-[#B69252] text-lg font-light">{b.v}</div>
                    <div className="text-white/50 text-xs tracking-wide">{b.s}</div>
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
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Marktdaten</p>
            <h2
              className="text-white text-3xl md:text-5xl leading-tight"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Die Zahlen sprechen
              <br />
              <em className="not-italic text-[#B69252]">für sich.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                value: '+21 %',
                label: 'Preiswachstum Küste',
                sub: 'Montenegro gesamt, 2024',
                detail: 'Die montenegrinische Adriaküste gehört zu den am schnellsten wachsenden Immobilienmärkten Europas.',
              },
              {
                value: '+12 %',
                label: 'Jährlich in Bar',
                sub: 'Durchschnitt letzte 3 Jahre',
                detail: 'Bar entwickelt sich stärker als Kotor oder Budva — bei einem Bruchteil der Preise.',
              },
              {
                value: '25–40 %',
                label: 'Prognose bis 2030',
                sub: 'Kumulierte Wertsteigerung',
                detail: 'Getrieben durch EU-Beitritt, Infrastrukturausbau und steigendes internationales Käuferinteresse.',
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded p-8 hover:border-[#B69252]/40 transition-colors">
                <div className="text-[#B69252] text-4xl md:text-5xl font-light mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {stat.value}
                </div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-white/30 text-xs tracking-wide mb-4">{stat.sub}</div>
                <div className="text-white/50 text-sm leading-relaxed border-t border-white/10 pt-4">{stat.detail}</div>
              </div>
            ))}
          </div>

          {/* Timeline bar */}
          <div className="bg-white/5 border border-white/10 rounded p-8">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Entwicklungspfad</p>
            <div className="relative">
              <div className="absolute top-4 left-0 right-0 h-px bg-white/10" />
              <div className="grid grid-cols-4 gap-4 relative">
                {[
                  { year: '2024', event: 'Projektstart', note: '+21% Markt' },
                  { year: '2026', event: 'Baubeginn', note: 'Baugenehmigung Okt.' },
                  { year: '2027', event: 'Rohbau', note: 'Dachschluss Q4' },
                  { year: '2028', event: 'Übergabe + EU', note: 'Dez. 2028' },
                ].map((t, i) => (
                  <div key={t.year} className="text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto mb-4 ${i === 3 ? 'bg-[#B69252]' : 'bg-white/30'}`} />
                    <div className="text-[#B69252] text-lg font-light">{t.year}</div>
                    <div className="text-white text-sm mt-1">{t.event}</div>
                    <div className="text-white/30 text-xs mt-0.5">{t.note}</div>
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
              6–8 % Rendite.
              <br />
              <em className="not-italic text-[#B69252]">Brutto. Realistisch.</em>
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed mb-8">
              Die Adriaküste verzeichnet eine wachsende Nachfrage nach Kurzzeitvermietung.
              Bar profitiert von seiner Nähe zu Stari Bar, dem Hafen und der Natur — mit
              deutlich geringeren Einstiegspreisen als Kotor oder Budva.
            </p>

            <div className="space-y-3">
              {[
                { label: 'Hauptsaison', value: '550–700 €/Woche', icon: '▲' },
                { label: 'Nebensaison', value: '300–450 €/Woche', icon: '◆' },
                { label: 'Belegung Ø', value: '18–22 Wochen/Jahr', icon: '◆' },
                { label: 'Verwaltung vor Ort', value: 'verfügbar', icon: '◆' },
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
            <p className="text-[#B69252] text-xs tracking-widest uppercase mb-6">Beispielrechnung · 50 m² Zweizimmerwohnung</p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/50 text-sm">Kaufpreis (50 m² × 2.400 €)</span>
                <span className="text-white font-medium">120.000 €</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/50 text-sm">Einnahmen Hauptsaison (10 Wo.)</span>
                <span className="text-white font-medium">5.500 €</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/50 text-sm">Einnahmen Nebensaison (10 Wo.)</span>
                <span className="text-white font-medium">3.750 €</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/50 text-sm">Steuer (9 % auf Netto)</span>
                <span className="text-white/50 text-sm">~ 830 €</span>
              </div>
            </div>

            <div className="bg-[#B69252]/10 border border-[#B69252]/30 rounded p-5 mb-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[#B69252] text-xs tracking-widest uppercase mb-1">Netto-Jahresertrag</p>
                  <p className="text-white text-3xl font-light" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    ~8.400 €
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#B69252] text-xs tracking-widest uppercase mb-1">Rendite</p>
                  <p className="text-[#B69252] text-3xl font-light" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    7,0 %
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded p-4">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Wertsteigerung 5 Jahre (Prognose)</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-white/40 text-xs mb-1">Konservativ (+25 %)</p>
                  <p className="text-white font-medium">+30.000 €</p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-xs mb-1">Optimistisch (+40 %)</p>
                  <p className="text-[#B69252] font-medium">+48.000 €</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEUERVORTEILE ───────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Steuervorteile</p>
              <h2
                className="text-white text-3xl md:text-5xl leading-tight mb-6"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                Kein Vermögen.
                <br />
                Kein Erbe.
                <br />
                <em className="not-italic text-[#B69252]">9 % auf alles andere.</em>
              </h2>
              <p className="text-white/60 leading-relaxed">
                Montenegro hat eines der investorenfreundlichsten Steuersysteme Europas.
                Im Vergleich zu Deutschland oder Österreich ergibt sich ein erheblicher
                Steuervorteil — sowohl bei laufenden Einnahmen als auch beim Verkauf.
              </p>
            </div>

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
                    className={`text-xl font-light ml-6 flex-shrink-0 ${tax.value === '0 %' ? 'text-[#B69252]' : 'text-white'}`}
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                  >
                    {tax.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ZAHLUNGSPLAN ─────────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Liquidität</p>
          <h2
            className="text-[#151E39] text-3xl md:text-5xl leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Kapital schrittweise
            <br />
            <em className="not-italic text-[#B69252]">einsetzen.</em>
          </h2>
          <p className="text-[#151E39]/50 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Der gestaffelte Zahlungsplan schont die Liquidität und reduziert das Risiko —
            der Großteil des Kapitals fließt erst, wenn der Bau nachweislich voranschreitet.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px bg-[#B69252]/20" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {paymentSteps.map((step, idx) => (
              <div key={step.step} className="relative text-center">
                <div className={`w-8 h-8 rounded-full mx-auto mb-4 flex items-center justify-center text-xs font-medium relative z-10 ${
                  idx === 0 ? 'bg-[#B69252] text-white' : 'bg-[#F0EDE8] border-2 border-[#B69252]/40 text-[#B69252]'
                }`}>
                  {step.step}
                </div>
                <div className="text-[#B69252] text-xs tracking-widest uppercase mb-1">{step.date}</div>
                <div className="text-[#151E39] font-medium mb-1">{step.label}</div>
                <div
                  className={`text-2xl font-light mb-2 ${idx === 0 ? 'text-[#151E39]' : 'text-[#151E39]'}`}
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  {step.amount}
                </div>
                <div className="text-[#151E39]/40 text-xs leading-relaxed">{step.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white border border-[#151E39]/10 rounded p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <circle cx="12" cy="12" r="9" stroke="#B69252" strokeWidth="1.2"/>
            <path d="M12 8v4M12 16h.01" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <p className="text-[#151E39]/60 text-sm leading-relaxed">
            <strong className="text-[#151E39]">Nebenkosten:</strong> Notar, Anwalt, Übersetzung und Grundbucheintrag
            belaufen sich auf ca. 1,5–2,5 % des Kaufpreises. MwSt. ist im Kaufpreis enthalten.
            Keine Maklerprovision — direkter Kauf vom Bauträger.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="kontakt" className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Jetzt sichern</p>
          <h2
            className="text-white text-3xl md:text-5xl mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Das Fenster schließt sich
            <br />
            <em className="not-italic text-[#B69252]">mit dem EU-Beitritt.</em>
          </h2>
          <p className="text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Vollständiges Investment-Exposé mit Renditeberechnungen, Marktanalyse und
            aktueller Verfügbarkeit — kostenlos, deutschsprachig, direkt vom Bauträger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@baliv-residence.com?subject=Investment%20Exposé%20Anfrage"
              className="inline-flex items-center justify-center gap-2 bg-[#B69252] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors"
            >
              Investment-Exposé anfordern
            </a>
            <a
              href="https://wa.me/38268517873?text=Guten%20Tag%2C%20ich%20interessiere%20mich%20f%C3%BCr%20das%20Investment-Expos%C3%A9%20bei%20Baliv%20Residence."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 text-sm tracking-widest uppercase hover:border-white/50 transition-colors"
            >
              WhatsApp
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {['Antwort < 24 Stunden', 'Deutschsprachig', 'Kein Makler', 'Direkt vom Bauträger'].map((tag) => (
              <span key={tag} className="text-white/30 text-xs tracking-wide">✓ {tag}</span>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#151E39] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
            ← Zurück zur Startseite
          </Link>
          <p className="text-white/20 text-xs text-center">
            © 2026 Real Living d.o.o. · Baliv Residence, Bar, Montenegro
          </p>
          <div className="flex gap-6">
            <Link href="/wohnungen" className="text-white/30 hover:text-white/50 text-xs transition-colors">
              Wohnungen
            </Link>
            <Link href="/preise" className="text-white/30 hover:text-white/50 text-xs transition-colors">
              Preise
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
