'use client'

import Link from 'next/link'
import React from 'react'

import { Navigation } from '@/components/Navigation'
import { PageFooter } from '@/components/PageFooter'
import { useRahmen } from '@/components/SeitenRahmen'
import { pathFor } from '@/i18n/config'

export default function NotFound() {
  const { locale, ui } = useRahmen()
  const weiter = [
    { label: ui.notFoundStartseite, href: pathFor('', locale), primary: true },
    { label: ui.notFoundWohnungen, href: pathFor('wohnungen', locale) },
    { label: ui.notFoundKontakt, href: pathFor('kontakt', locale) },
  ]

  return (
    <main
      className="bg-[#151E39] min-h-screen flex flex-col"
      style={{ fontFamily: 'var(--font-raleway), sans-serif' }}
    >
      <Navigation />

      <section className="flex-1 flex items-center pt-40 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-6">{ui.notFoundEyebrow}</p>
          <h1
            className="text-white text-4xl md:text-6xl leading-tight mb-6"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {ui.notFoundHeadline}
          </h1>
          <p className="text-white/60 leading-relaxed mb-12 max-w-xl mx-auto">{ui.notFoundText}</p>
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
