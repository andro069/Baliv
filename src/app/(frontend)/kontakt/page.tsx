import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { KontaktForm } from './KontaktForm'

export const metadata: Metadata = {
  title: 'Kontakt & Exposé — Baliv Residence, Bar Montenegro',
  description:
    'Exposé, Grundrisse und Preisliste kostenlos anfordern. Direktkontakt zum Bauträger Real Living d.o.o. — kein Makler, keine Provision.',
}

export default function KontaktPage() {
  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[440px]">
        <Image
          src="/terrasse-meer.webp"
          alt="Baliv Residence — Kontakt"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151E39]/85 via-[#151E39]/60 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Kontakt & Exposé</p>
          <h1
            className="text-white text-4xl md:text-6xl leading-tight mb-4 max-w-xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Sprechen wir
            <br />
            <em className="not-italic text-[#B69252]">miteinander.</em>
          </h1>
          <p className="text-white/60 max-w-md leading-relaxed">
            Wir antworten innerhalb von 24 Stunden — auf Deutsch, persönlich, ohne Verkaufsdruck.
          </p>
        </div>
      </section>

      {/* ── HAUPT-CONTENT ────────────────────────────────────────────────── */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left — info */}
          <div className="lg:sticky lg:top-32">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Direktkontakt</p>
            <h2
              className="text-[#151E39] text-3xl md:text-4xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Ihr direkter Draht
              <br />
              zum Bauträger.
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed mb-10">
              Kein Makler, keine Provision — Sie sprechen direkt mit Real Living d.o.o.,
              dem Bauträger von Baliv Residence. Alle Informationen, Grundrisse und
              Preislisten erhalten Sie auf Anfrage kostenlos.
            </p>

            <div className="space-y-6 mb-12">
              <a
                href="mailto:info@baliv-residence.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 bg-[#151E39] rounded flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#B69252" strokeWidth="1.5"/>
                    <path d="M22 6l-10 7L2 6" stroke="#B69252" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-0.5">E-Mail</p>
                  <p className="text-[#151E39] group-hover:text-[#B69252] transition-colors text-sm">
                    info@baliv-residence.com
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/38269123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 bg-[#151E39] rounded flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#B69252" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-0.5">WhatsApp</p>
                  <p className="text-[#151E39] group-hover:text-[#B69252] transition-colors text-sm">
                    +382 69 123 456
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#151E39] rounded flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#B69252" strokeWidth="1.5"/>
                    <circle cx="12" cy="10" r="3" stroke="#B69252" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-0.5">Adresse</p>
                  <p className="text-[#151E39] text-sm">Real Living d.o.o.<br />Bar, Montenegro</p>
                </div>
              </div>
            </div>

            {/* Exposé teaser */}
            <div className="bg-[#151E39] rounded p-6">
              <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-3">Kostenloses Exposé</p>
              <p className="text-white text-sm leading-relaxed">
                Grundrisse aller Wohntypen, vollständige Preisliste, Zahlungsplan,
                Lageplan und Baubeschreibung — auf Deutsch, direkt per E-Mail.
              </p>
            </div>
          </div>

          {/* Right — client form */}
          <KontaktForm />
        </div>
      </section>

      <footer className="bg-[#151E39] border-t border-white/10 py-8 mt-12">
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
