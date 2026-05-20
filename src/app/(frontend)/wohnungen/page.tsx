import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { PricingTimeline } from '@/components/PricingTimeline'

export const metadata: Metadata = {
  title: 'Die Wohnungen — Baliv Residence, Bar Montenegro',
  description:
    'Studio, Zweizimmer und Penthouse. 39 Einheiten, schlüsselfertig ab 2.400 €/m². Hochwertige Ausstattung mit Hansgrohe und LG. Fertigstellung Dezember 2028.',
}

const types = [
  {
    nr: '01',
    type: 'Studio',
    tag: 'Erdgeschoss',
    size: '28–30 m²',
    terrace: 'Terrasse & Gartenzugang',
    units: '2 Einheiten',
    price: 'ab 2.400 €/m²',
    layout: '1 Wohn-/Schlafraum · Küchenzeile · Bad',
    description:
      'Direkter Zugang zum begrünten Innenhof. Kompakter Einstieg als Pied-à-terre, Ferienobjekt oder renditestarkes Investment.',
    floorplan: '/grundriss-studio.webp',
    image: '/interieur-01.webp',
    example: { size: 29, price: 69600 },
  },
  {
    nr: '02',
    type: 'Zweizimmer­wohnung',
    tag: 'Alle Etagen',
    size: '47–52 m²',
    terrace: 'Balkon oder Terrasse',
    units: '35 Einheiten',
    price: 'ab 2.400 €/m²',
    layout: '1 Schlafzimmer · Wohn-/Essbereich · Küche · Bad',
    description:
      'Der meistgewählte Typ. Mit steigender Etage wachsen die Ausblicke — von Olivenhainen im Erdgeschoss bis hin zu Meerespanoramen in den Obergeschossen.',
    floorplan: '/grundriss-apartment.webp',
    image: '/interieur-wohnen-01.webp',
    example: { size: 50, price: 120000 },
  },
  {
    nr: '03',
    type: 'Dachgeschoss Panorama',
    tag: 'Dachgeschoss',
    size: '73–81 m²',
    terrace: 'Dachterrasse 30–50 m²',
    units: '2 Einheiten',
    price: 'ab 3.000 €/m²',
    layout: '2 Schlafzimmer · Wohn-/Essbereich · Küche · Bad & Gäste-WC',
    description:
      'Unverbauter 360°-Rundblick auf Adria, Rumija und Stari Bar. Großzügige Dachterrasse — das Highlight des gesamten Ensembles.',
    floorplan: '/grundriss-penthouse.webp',
    image: '/terrasse-berge.webp',
    example: { size: 77, price: 231000 },
  },
]

const ausstattungIcons: Record<string, React.ReactNode> = {
  Hansgrohe: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4v8M10 8c0 0 1.5-2 4-2s4 2 4 2" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M8 12h12v2c0 4-2.5 7-6 8-3.5-1-6-4-6-8v-2z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M11 18h6" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  LG: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="7" width="20" height="14" rx="1.5" stroke="#B69252" strokeWidth="1.2"/>
      <path d="M10 14h8M14 10v8" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="14" cy="14" r="3" stroke="#B69252" strokeWidth="1.2"/>
    </svg>
  ),
  'Eurocode 8': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4L5 10v4c0 5.5 3.8 10.6 9 12 5.2-1.4 9-6.5 9-12v-4L14 4z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10 14l3 3 5-5" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Naturstein: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 20L9 8l5 5 5-7 5 14H4z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M4 20h20" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  'Geölte Eiche': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 24V14" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M14 14c-4 0-7-3-7-7 3 0 5.5 1.5 7 4 1.5-2.5 4-4 7-4 0 4-3 7-7 7z" stroke="#B69252" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10 18c-2 0-4-1.5-4-4 2 0 3.5 1 4 2.5" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Schlüsselfertig: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="11" cy="12" r="5" stroke="#B69252" strokeWidth="1.2"/>
      <path d="M15 16l8 8" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M19 20l2-2M21 22l2-2" stroke="#B69252" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
}

const ausstattung = [
  { brand: 'Hansgrohe', label: 'Sanitärarmaturen' },
  { brand: 'LG', label: 'Klimaanlage' },
  { brand: 'Eurocode 8', label: 'Erdbebenstandard' },
  { brand: 'Naturstein', label: 'Böden & Fassade' },
  { brand: 'Geölte Eiche', label: 'Holzoberflächen' },
  { brand: 'Schlüsselfertig', label: 'Übergabe komplett' },
]

const building = [
  { value: '7', label: 'Geschosse' },
  { value: '39', label: 'Wohneinheiten' },
  { value: '17', label: 'Tiefgaragenplätze' },
  { value: 'Dez. 2028', label: 'Fertigstellung' },
]

export default function WohnungenPage() {
  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src="/building-front.webp"
          alt="Baliv Residence Gebäude"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151E39]/80 via-[#151E39]/50 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4 font-raleway">
            Die Wohnungen
          </p>
          <h1
            className="text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-2xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Drei Typen.
            <br />
            <em className="not-italic text-[#B69252]">Ihre</em> Wahl.
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-md">
            39 Einheiten in sieben Geschossen — vom kompakten Studio bis zur großzügigen
            Dachgeschosswohnung mit Panoramablick.
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
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-3">Grundrisse & Details</p>
          <h2
            className="text-[#151E39] text-3xl md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Drei Wohnungstypen.
            <br />
            Sieben Geschosse.
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
                    alt={`Grundriss ${apt.type}`}
                    fill
                    className="object-contain p-4"
                  />
                  <div className="absolute bottom-3 right-3 text-[#151E39]/30 text-xs">Grundriss</div>
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
                    <p className="text-[#B69252] text-sm tracking-wide mt-1">{apt.size} · {apt.terrace}</p>
                  </div>
                </div>

                <p className="text-[#151E39]/60 text-sm mb-6 leading-relaxed">{apt.layout}</p>
                <p className="text-[#151E39] text-base leading-relaxed mb-8">{apt.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded p-4">
                    <div className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-1">Einheiten</div>
                    <div className="text-[#151E39] text-lg font-light">{apt.units}</div>
                  </div>
                  <div className="bg-white rounded p-4">
                    <div className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-1">Preis</div>
                    <div className="text-[#151E39] text-lg font-light">{apt.price}</div>
                  </div>
                  <div className="bg-[#151E39] rounded p-4 col-span-2">
                    <div className="text-white/40 text-xs tracking-widest uppercase mb-1">Beispiel · {apt.example.size} m²</div>
                    <div className="text-white text-xl font-light">
                      {apt.example.price.toLocaleString('de-DE')} €
                    </div>
                    <div className="text-white/40 text-xs mt-1">Frühbucher · inkl. MwSt. · ohne Makler</div>
                  </div>
                </div>

                <Link
                  href="#kontakt"
                  className="inline-flex items-center gap-2 bg-[#B69252] text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors"
                >
                  Exposé anfragen
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AUSSTATTUNG ──────────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Ausstattung</p>
              <h2
                className="text-white text-3xl md:text-5xl mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                Schlüsselfertig übergeben.{' '}
                <em className="not-italic text-[#B69252]">Hochwertig ausgestattet.</em>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Jede Wohnung wird vollständig fertiggestellt übergeben — mit geprüften
                Markenprodukten, die dem mitteleuropäischen Qualitätsstandard entsprechen.
              </p>

              <div className="border border-[#B69252]/30 rounded p-6 bg-[#B69252]/5">
                <p className="text-[#B69252] text-xs tracking-widest uppercase mb-3">Premium-Paket optional</p>
                <ul className="text-white/70 text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#B69252] rounded-full flex-shrink-0" />
                    Gehobene Badgestaltung mit Großformat-Fliesen
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#B69252] rounded-full flex-shrink-0" />
                    Smarte Lichtsteuerung
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#B69252] rounded-full flex-shrink-0" />
                    Schlüsselfertige Einbauküche
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {ausstattung.map((item) => (
                <div key={item.brand} className="bg-white/5 border border-white/10 rounded p-5 hover:border-[#B69252]/40 transition-colors">
                  <div className="mb-3">{ausstattungIcons[item.brand]}</div>
                  <div className="text-white font-medium mb-1">{item.brand}</div>
                  <div className="text-white/40 text-xs tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interior images */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
            {[
              { src: '/interieur-wohnen-02.webp', alt: 'Wohnbereich' },
              { src: '/interieur-bad-01.webp', alt: 'Badezimmer' },
              { src: '/interieur-schlafen-01.webp', alt: 'Schlafzimmer' },
            ].map((img) => (
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
          <PricingTimeline />
        </div>
      </section>

      {/* ── GEBÄUDE FEATURES ─────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded overflow-hidden">
            <Image src="/detail-terrassen.webp" alt="Terrassen und Architektur" fill className="object-cover" />
          </div>
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Das Gebäude</p>
            <h2
              className="text-[#151E39] text-3xl md:text-4xl mb-8 leading-tight"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Mehr als vier Wände.
            </h2>
            <div className="space-y-5">
              {[
                { title: '17 Tiefgaragenplätze', text: 'Separat erwerbbar; direkter Zugang ins Gebäude.' },
                { title: 'Bepflanzte Terrassen', text: 'Lavendel, Rosmarin und mediterrane Begrünung auf mehreren Ebenen.' },
                { title: 'Fahrradabstellraum', text: 'Im Erdgeschoss, wettergeschützt und abschließbar.' },
                { title: 'Naturstein-Fassade', text: 'Bögen, Pergolen und variierende Fassadengestaltung — von allen Seiten hochwertig.' },
                { title: 'Eurocode 8', text: 'Erbaut nach europäischem Erdbebenstandard — maximale Sicherheit.' },
              ].map((item) => (
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
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Jetzt anfragen</p>
          <h2
            className="text-white text-3xl md:text-5xl mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Interesse an einer Einheit?
          </h2>
          <p className="text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Vollständiges Exposé mit allen Grundrissen, Preisliste und aktueller Verfügbarkeit —
            direkt vom Bauträger, deutschsprachig, ohne Makler.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@baliv-residence.com"
              className="inline-flex items-center justify-center gap-2 bg-[#B69252] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors"
            >
              Exposé anfordern
            </a>
            <a
              href="https://wa.me/38268517873?text=Guten%20Tag%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Wohnung%20bei%20Baliv%20Residence."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 text-sm tracking-widest uppercase hover:border-white/50 transition-colors"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-white/30 text-xs mt-6">
            Antwort in &lt; 24 Stunden · Deutschsprachige Beratung · Direkt vom Bauträger
          </p>
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
          <div className="flex gap-4">
            {['Impressum', 'Datenschutz'].map((l) => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="text-white/20 hover:text-white/50 text-xs transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
