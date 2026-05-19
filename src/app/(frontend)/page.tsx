import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { HeroSlider } from '@/components/HeroSlider'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export default function HomePage() {
  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px]">
        <HeroSlider />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <div className="max-w-xl">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-6 font-raleway">
              Bar, Montenegro
            </p>
            <h1
              className="hero-headline text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Modern wohnen.
              <br />
              Ursprünglich leben.
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Am Fuße von Stari Bar entsteht ein Wohnensemble mit 39 Einheiten, zwischen
              Olivenhainen, Bergen und Meer.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#kontakt"
                className="px-8 py-4 bg-[#B69252] text-white text-sm tracking-widest uppercase hover:bg-[#a07e3e] transition-colors duration-300"
              >
                Exposé anfragen
              </a>
              <a
                href="/projekt"
                className="px-8 py-4 border border-white/50 text-white text-sm tracking-widest uppercase hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                Projekt entdecken
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#151E39]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 py-5 grid grid-cols-3 divide-x divide-white/10">
            {[
              { value: '39', label: 'Wohneinheiten' },
              { value: 'ab 2.400 €/m²', label: 'Schlüsselfertig' },
              { value: 'Dez. 2028', label: 'Fertigstellung' },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <p
                  className="text-white text-lg md:text-xl font-light"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-white/50 text-xs tracking-widest uppercase mt-1">{stat.label}</p>
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
              Zwischen Festung,
              <br />
              Meer und Olivenhain.
            </h2>
            <p className="text-[#151E39]/60 text-base leading-relaxed font-light mb-6">
              Stari Bar zu Füßen, Rumija im Rücken, die Adria in Sichtweite. Ein Ort, an dem
              sich Orient und Okzident seit Jahrhunderten begegnen — und an dem Baliv Residence
              entsteht.
            </p>
            <p className="text-[#151E39]/60 text-base leading-relaxed font-light mb-10">
              Eingebettet in über 100.000 Olivenbäume, nur 1,4 Kilometer unterhalb der
              historischen Festungsstadt. Sieben Minuten zur Bucht, zehn zum Hafen.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Stari Bar Festung', value: '1,4 km' },
                { label: 'Erster Strand', value: '10 Min' },
                { label: 'Hafen von Bar', value: '10 Min' },
                { label: 'Flughafen Podgorica', value: '45 Min' },
              ].map((item) => (
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
              Drei Typen. Ihre Wahl.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {[
              {
                type: 'Studio',
                size: '28–30 m²',
                desc: 'Kompakter Einstieg mit Terrasse und direktem Gartenzugang. Ideal als Pied-à-terre oder Renditeobjekt.',
                price: 'ab 2.400 €/m²',
                img: '/interieur-01.webp',
                tag: 'Erdgeschoss',
              },
              {
                type: 'Zweizimmer',
                size: '47–52 m²',
                desc: 'Die Wahl der meisten Käufer — mit Balkon oder Terrasse, verfügbar auf allen Stockwerken.',
                price: 'ab 2.400 €/m²',
                img: '/interieur-wohnen-01.webp',
                tag: 'Alle Etagen',
              },
              {
                type: 'Penthouse',
                size: '73–81 m²',
                desc: 'Dachterrasse 30–50 m², unverbauter Rundblick auf Meer, Berge und Stari Bar.',
                price: 'ab 3.000 €/m²',
                img: '/interieur-wohnen-02.webp',
                tag: 'Dachgeschoss',
              },
            ].map((unit) => (
              <div key={unit.type} className="group bg-[#151E39] overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={unit.img}
                    alt={unit.type}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#151E39]/40 group-hover:bg-[#151E39]/20 transition-colors duration-500" />
                  <span className="absolute top-4 left-4 bg-[#B69252] text-white text-xs tracking-widest px-3 py-1">
                    {unit.tag}
                  </span>
                </div>
                <div className="p-8">
                  <h3
                    className="text-white text-2xl mb-1"
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                  >
                    {unit.type}
                  </h3>
                  <p className="text-[#B69252] text-sm tracking-wide mb-4">{unit.size}</p>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{unit.desc}</p>
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
        </div>
      </section>

      {/* ── INVESTMENT TEASER ────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image src="/view-hafen.webp" alt="Bar Hafen" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#B69252] text-white p-8 max-w-[200px]">
              <p
                className="text-3xl mb-1"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                +20%
              </p>
              <p className="text-xs tracking-wide opacity-80">Preissteigerung 2025</p>
            </div>
          </div>
          <div>
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Investment</p>
            <h2
              className="text-[#151E39] text-4xl md:text-5xl leading-tight mb-8"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Warum Bar.
              <br />
              Warum jetzt.
            </h2>
            <p className="text-[#151E39]/60 font-light leading-relaxed mb-10">
              Montenegro ist der am schnellsten wachsende Immobilienmarkt Europas. Während
              vergleichbare Neubauten in Budva oder Kotor 2.700–5.000 €/m² kosten, starten Sie
              bei Baliv Residence ab 2.400 €/m² — schlüsselfertig, hochwertig ausgestattet.
            </p>
            <div className="grid grid-cols-3 gap-8 mb-10">
              {[
                { value: '6–8%', label: 'Bruttorendite' },
                { value: '+130%', label: 'Preis 2020–2025' },
                { value: '2028', label: 'EU-Beitritt' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-[#151E39] text-2xl md:text-3xl mb-1"
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[#151E39]/40 text-xs tracking-widest uppercase">{stat.label}</p>
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
            {[
              { icon: '€', title: 'Euro seit 2002', sub: 'Kein Währungsrisiko' },
              { icon: '★', title: 'NATO seit 2017', sub: 'Politische Stabilität' },
              { icon: '✦', title: 'EU-Beitritt 2028', sub: 'Verhandlungen laufen' },
              { icon: '§', title: 'Volleigentum', sub: 'Svojina 1/1, notariell' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <span className="text-[#B69252] text-2xl mb-3">{item.icon}</span>
                <p className="text-[#151E39] text-sm font-semibold tracking-wide">{item.title}</p>
                <p className="text-[#151E39]/40 text-xs mt-1">{item.sub}</p>
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
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-6">
            Vorverkaufsphase — frühe Käufer sichern sich die besten Einheiten
          </p>
          <h2
            className="text-white text-4xl md:text-6xl leading-tight mb-6"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Bereit für das
            <br />
            erste Gespräch?
          </h2>
          <p className="text-white/60 font-light text-lg mb-12 max-w-xl mx-auto">
            Vollständiges Exposé mit Grundrissen, Preisliste und Verfügbarkeit — direkt vom
            Bauträger, deutschsprachig, ohne Makler.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@baliv-residence.com"
              className="px-10 py-4 bg-[#B69252] text-white text-sm tracking-widest uppercase hover:bg-[#a07e3e] transition-colors duration-300"
            >
              Exposé anfragen
            </a>
            <a
              href={`https://wa.me/38268517873?text=${encodeURIComponent('Guten Tag, ich interessiere mich für Baliv Residence.')}`}
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
          <p className="text-white/30 text-xs mt-8 tracking-wide">
            Antwort in &lt; 24 Stunden · Deutschsprachige Beratung · Direkt vom Bauträger
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="bg-[#151E39] py-12">
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <Image src="/logo-white.svg" alt="Baliv Residence" width={140} height={58} />
            <p className="text-white/30 text-xs mt-4">Bjeliši BB · 85000 Bar, Montenegro</p>
            <p className="text-white/30 text-xs mt-1">
              info@baliv-residence.com · +382 68 517 873
            </p>
          </div>
          <div className="flex gap-6">
            {['Impressum', 'Datenschutz'].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="text-white/30 hover:text-white/60 text-xs tracking-wide transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 max-w-7xl mx-auto px-8">
          <p className="text-white/20 text-xs text-center">
            © 2026 Real Living d.o.o. · Baliv Residence, Bar, Montenegro
          </p>
        </div>
      </footer>
    </main>
  )
}
