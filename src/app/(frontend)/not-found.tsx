import Link from 'next/link'
import React from 'react'

import { Navigation } from '@/components/Navigation'
import { PageFooter } from '@/components/PageFooter'

const weiter = [
  { label: 'Zur Startseite', href: '/', primary: true },
  { label: 'Die Wohnungen', href: '/wohnungen' },
  { label: 'Kontakt', href: '/kontakt' },
]

export default function NotFound() {
  return (
    <main
      className="bg-[#151E39] min-h-screen flex flex-col"
      style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
    >
      <Navigation />

      <section className="flex-1 flex items-center pt-40 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-6">Fehler 404</p>
          <h1
            className="text-white text-4xl md:text-6xl leading-tight mb-6"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Diese Seite gibt es nicht.
          </h1>
          <p className="text-white/60 leading-relaxed mb-12 max-w-xl mx-auto">
            Die Adresse ist vermutlich falsch geschrieben oder die Seite wurde verschoben. Von hier
            aus geht es weiter:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {weiter.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.primary
                    ? 'px-8 py-4 bg-[#B69252] text-white text-sm tracking-widest uppercase hover:bg-[#a07e3e] transition-colors duration-300'
                    : 'px-8 py-4 border border-white/30 text-white text-sm tracking-widest uppercase hover:border-white hover:bg-white/10 transition-all duration-300'
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  )
}
