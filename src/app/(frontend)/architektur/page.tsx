import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Architektur — Baliv Residence, Bar Montenegro',
  description:
    'Entworfen von Ahmed Divanović (ArchDesign Studio Bar). Natursteinfassade, Bögen, Loggias — mediterrane Architektur die sich in ihre Umgebung einfügt, nicht über sie hinwegsetzt.',
}

const designPrinciples = [
  {
    nr: '01',
    title: 'Kontinuität statt Zitat',
    text: 'Baliv Residence ahmt den Mittelmeer-Stil nicht nach — es setzt ihn fort. Jede Fassadenentscheidung, jeder Bogen, jede Materialwahl entstammt dem Kontext des Ortes, nicht einem Designtrend.',
  },
  {
    nr: '02',
    title: 'Regionaler Naturstein',
    text: 'Der lokale Baucode schreibt Naturstein vor — doch hier ist er keine Auflage, sondern Absicht. Die Steinfassade nimmt das Licht je nach Tageszeit anders auf und verbindet das Gebäude visuell mit Stari Bar.',
  },
  {
    nr: '03',
    title: 'Bögen und Halbkreise',
    text: 'Das wiederkehrende Motiv der Rundbögen greift Motive der historischen Festungsstadt auf. Sie brechen die Monotonie moderner Lochfassaden und geben dem Gebäude seine unverwechselbare Silhouette.',
  },
  {
    nr: '04',
    title: 'Lebende Fassade',
    text: 'Bepflanzte Terrassen mit Lavendel und Rosmarin sind kein Ornament — sie verändern das Gebäude mit den Jahreszeiten. Was im ersten Jahr schlicht wirkt, gewinnt Jahr für Jahr an Charakter.',
  },
]

const materials = [
  { name: 'Regionaler Naturstein', use: 'Fassade & Böden', detail: 'Lokal gebrochen, von Hand verlegt' },
  { name: 'Geölte Eiche', use: 'Innenböden & Oberflächen', detail: 'Europäische Eiche, kaltgepresst geölt' },
  { name: 'Weißputz', use: 'Innenwände', detail: 'Mineralisch, atmungsaktiv' },
  { name: 'Schmiedeeisen', use: 'Geländer & Details', detail: 'Handgeschmiedet vor Ort' },
  { name: 'Terrakotta', use: 'Außenbereiche', detail: 'Traditionelles Balkenboden-Format' },
  { name: 'Lavendel & Rosmarin', use: 'Terrassenbegrünung', detail: 'Mediterrane Wildpflanzen, pflegeleicht' },
]

export default function ArchitekturPage() {
  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[80vh] min-h-[560px]">
        <Image
          src="/architektur-hero-v2.png"
          alt="Blick vom Penthouse durch den Rundbogen über Bar und die Adria"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151E39]/80 via-[#151E39]/50 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Architektur</p>
          <h1
            className="text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-2xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Als hätte es
            <br />
            schon immer{' '}
            <em className="not-italic text-[#B69252]">hier gestanden.</em>
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed">
            Entworfen von Ahmed Divanović, ArchDesign Studio Bar. Ein Gebäude, das seinen
            Ort nicht dominiert — sondern fortsetzt.
          </p>
        </div>

        {/* Architect tag */}
        <div className="absolute bottom-8 right-8 md:right-16 lg:right-24">
          <div className="bg-[#151E39]/80 backdrop-blur-sm rounded px-4 py-3 text-right">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-0.5">Entwurf</p>
            <p className="text-white text-sm">Ahmed Divanović</p>
            <p className="text-[#B69252] text-xs">ArchDesign Studio, Bar</p>
          </div>
        </div>
      </section>

      {/* ── LEITENDES ZITAT ──────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mx-auto mb-8 opacity-30">
            <path d="M0 24V14C0 6.268 4.477 1.313 13.43 0l1.57 3C10.15 4.373 8 7.627 8 12h6v12H0zm18 0V14C18 6.268 22.477 1.313 31.43 0L33 3C28.15 4.373 26 7.627 26 12h6v12H18z" fill="#B69252"/>
          </svg>
          <blockquote
            className="text-white text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Das Gebäude soll wirken, als hätte es schon immer hier gestanden.
            Modern, aber{' '}
            <em className="not-italic text-[#B69252]">im Einklang mit dem Ort.</em>
          </blockquote>
          <p className="text-white/40 text-sm tracking-widest uppercase">
            Ahmed Divanović · Architekt, ArchDesign Studio Bar
          </p>
        </div>
      </section>

      {/* ── DESIGNPRINZIPIEN ─────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Gestaltungsprinzipien</p>
            <h2
              className="text-[#151E39] text-3xl md:text-5xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Vier Prinzipien.
              <br />
              <em className="not-italic text-[#B69252]">Ein Gebäude.</em>
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed">
              Jede Entscheidung bei Baliv Residence lässt sich auf einen von vier
              Grundsätzen zurückführen — die gemeinsam ein Gebäude ergeben, das sich
              seiner Umgebung bewusst ist.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded overflow-hidden">
            <Image
              src="/architektur-fassade.png?v=2"
              alt="Fassadendetail Baliv Residence"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {designPrinciples.map((p) => (
            <div key={p.nr} className="flex gap-6">
              <span
                className="text-[#B69252]/30 text-5xl font-light flex-shrink-0 leading-none mt-1"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {p.nr}
              </span>
              <div>
                <h3
                  className="text-[#151E39] text-xl mb-3"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  {p.title}
                </h3>
                <p className="text-[#151E39]/60 text-sm leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FASSADE DETAIL ───────────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Fassade</p>
              <h2
                className="text-white text-3xl md:text-5xl leading-tight mb-6"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                Von allen Seiten
                <br />
                <em className="not-italic text-[#B69252]">hochwertig.</em>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Die Fassade variiert in ihrer Tiefe — Loggias, Rücksprünge und vorgelagerte
                Pergolen erzeugen ein Spiel aus Licht und Schatten, das sich mit dem
                Sonnenstand verändert. Kein Geschoss sieht aus wie das andere.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Natursteinfassade', text: 'Regional gebrochen, nach lokalem Baucode — aber hier bewusste Gestaltungsentscheidung.' },
                  { title: 'Rundbogen-Motiv', text: 'Wiederkehrendes Element aus der Festungsarchitektur von Stari Bar.' },
                  { title: 'Schmiedeeisen-Geländer', text: 'Handgefertigte Details, die industriellen Standardlösungen bewusst widersprechen.' },
                  { title: 'Bepflanzte Loggias', text: 'Lavendel und Rosmarin zwischen den Etagen — die Fassade lebt und wächst.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="w-1 h-full min-h-[4px] bg-[#B69252] flex-shrink-0 mt-2" />
                    <div>
                      <p className="text-white font-medium mb-0.5">{item.title}</p>
                      <p className="text-white/40 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative aspect-[3/4] rounded overflow-hidden">
              <Image
                src="/building-front.webp"
                alt="Baliv Residence Gebäudeansicht"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151E39]/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── MATERIALIEN ──────────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded overflow-hidden">
            <Image
              src="/architektur-materialien.png"
              alt="Materialpalette Baliv Residence"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Materialpalette</p>
            <h2
              className="text-[#151E39] text-3xl md:text-5xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Natürlich.
              <br />
              <em className="not-italic text-[#B69252]">Langlebig. Ehrlich.</em>
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed mb-8">
              Keine Verbundwerkstoffe, keine Imitate. Jedes Material wurde nach
              Herkunft, Langlebigkeit und handwerklichem Verarbeitungsstandard ausgewählt.
            </p>

            <div className="space-y-3">
              {materials.map((m) => (
                <div
                  key={m.name}
                  className="grid grid-cols-[1fr_auto] gap-4 bg-white rounded p-4 border border-[#151E39]/5"
                >
                  <div>
                    <p className="text-[#151E39] font-medium text-sm">{m.name}</p>
                    <p className="text-[#151E39]/40 text-xs mt-0.5">{m.detail}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[#B69252] text-xs tracking-wide">{m.use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERIE ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-[#F0EDE8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Einblicke</p>
            <h2
              className="text-[#151E39] text-3xl md:text-5xl leading-tight"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Details, die{' '}
              <em className="not-italic text-[#B69252]">zählen.</em>
            </h2>
          </div>

          {/* Masonry via CSS columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {[
              { src: '/detail-bogen.webp', alt: 'Rundbogen-Detail Fassade', aspect: 'tall' },
              { src: '/detail-sanitaer.png', alt: 'Hansgrohe Badezimmer mit Marmor', aspect: 'tall' },
              { src: '/architektur-detail.webp', alt: 'Architekturdetail Baliv Residence', aspect: 'wide' },
              { src: '/detail-stein.png', alt: 'Naturstein-Bogenmotiv', aspect: 'square' },
              { src: '/interieur-wohnen-01.webp', alt: 'Wohnbereich Baliv Residence', aspect: 'wide' },
              { src: '/detail-terrassen.webp', alt: 'Terrassendetail', aspect: 'square' },
              { src: '/detail-boden.png', alt: 'Travertin-Steinboden Nahaufnahme', aspect: 'wide' },
              { src: '/interieur-bad-01.webp', alt: 'Badezimmer Interieur', aspect: 'tall' },
              { src: '/detail-fassade.webp', alt: 'Fassadenstruktur Naturstein', aspect: 'square' },
            ].map((img) => (
              <div
                key={img.src}
                className="break-inside-avoid mb-4 overflow-hidden rounded group"
              >
                <div
                  className={
                    img.aspect === 'tall'
                      ? 'relative aspect-[3/4]'
                      : img.aspect === 'wide'
                        ? 'relative aspect-[4/3]'
                        : 'relative aspect-square'
                  }
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#151E39]/0 group-hover:bg-[#151E39]/20 transition-colors duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GEBÄUDE-KENNZAHLEN ───────────────────────────────────────────── */}
      <section className="bg-[#151E39] py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Das Gebäude</p>
            <h2
              className="text-white text-3xl md:text-5xl"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              In Zahlen.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { v: '7', l: 'Geschosse' },
              { v: '39', l: 'Wohneinheiten' },
              { v: '17', l: 'Tiefgaragenplätze' },
              { v: 'EC 8', l: 'Erdbebenstandard' },
            ].map((s) => (
              <div key={s.l} className="bg-white/5 border border-white/10 rounded p-6 text-center">
                <div className="text-[#B69252] text-3xl md:text-4xl font-light mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {s.v}
                </div>
                <div className="text-white/40 text-xs tracking-widest uppercase">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Fahrradabstellraum', text: 'Im Erdgeschoss, wettergeschützt und abschließbar — für nachhaltigen Alltag.' },
              { title: 'Bepflanzte Gemeinschaftsterrassen', text: 'Lavendel, Rosmarin und mediterrane Begrünung auf mehreren Ebenen.' },
              { title: 'Unterirdisches Parken', text: '17 Stellplätze direkt im Gebäude — separat erwerbbar.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded p-6 hover:border-[#B69252]/30 transition-colors">
                <h3 className="text-white font-medium mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="kontakt" className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Mehr erfahren</p>
          <h2
            className="text-[#151E39] text-3xl md:text-5xl mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Architekturpläne
            <br />
            <em className="not-italic text-[#B69252]">auf Anfrage.</em>
          </h2>
          <p className="text-[#151E39]/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Vollständige Grundrisse, Schnitte und Materialspezifikationen sind
            Bestandteil des Exposés — kostenlos, deutschsprachig, direkt vom Bauträger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@baliv-residence.com?subject=Architekturpl%C3%A4ne%20%26%20Expos%C3%A9"
              className="inline-flex items-center justify-center gap-2 bg-[#B69252] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors"
            >
              Exposé & Pläne anfordern
            </a>
            <Link
              href="/wohnungen"
              className="inline-flex items-center justify-center gap-2 border border-[#151E39]/20 text-[#151E39] px-8 py-4 text-sm tracking-widest uppercase hover:border-[#151E39]/50 transition-colors"
            >
              Zu den Wohnungen
            </Link>
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
            <Link href="/lage" className="text-white/30 hover:text-white/50 text-xs transition-colors">
              Lage
            </Link>
            <Link href="/wohnungen" className="text-white/30 hover:text-white/50 text-xs transition-colors">
              Wohnungen
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
