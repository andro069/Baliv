'use client'

import React from 'react'
import Link from 'next/link'

import { useRahmen } from '@/components/SeitenRahmen'
import { pathFor } from '@/i18n/config'

export function PageFooter() {
  const { locale, ui, footer } = useRahmen()

  return (
    <footer className="bg-[#151E39] border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href={pathFor('', locale)} className="text-white/30 hover:text-white/60 text-xs transition-colors">
          {ui.zurueckZurStartseite}
        </Link>
        <p className="text-white/20 text-xs text-center">{footer.copyright}</p>
        <div className="flex gap-4">
          {footer.legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/20 hover:text-white/50 text-xs transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
