import React from 'react'
import Link from 'next/link'

export function PageFooter() {
  return (
    <footer className="bg-[#151E39] border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
          ← Zurück zur Startseite
        </Link>
        <p className="text-white/20 text-xs text-center">
          © 2026 Real Living d.o.o. · Baliv Residence, Bar, Montenegro
        </p>
        <div className="flex gap-4">
          <Link href="/impressum" className="text-white/20 hover:text-white/50 text-xs transition-colors">
            Impressum
          </Link>
          <Link href="/datenschutz" className="text-white/20 hover:text-white/50 text-xs transition-colors">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  )
}
