import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

const defaultLegalLinks = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
]

export async function PageFooter() {
  const payload = await getPayload({ config })
  const cms = await payload.findGlobal({ slug: 'footer' })

  const copyright =
    (cms as any)?.copyright ?? '© 2026 Real Living d.o.o. · Baliv Residence, Bar, Montenegro'

  const cmsLinks: any[] = (cms as any)?.legalLinks ?? []
  const legalLinks =
    cmsLinks.length > 0
      ? cmsLinks.map((l: any) => ({ label: l.label ?? '', href: l.href ?? '/' }))
      : defaultLegalLinks

  return (
    <footer className="bg-[#151E39] border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
          ← Zurück zur Startseite
        </Link>
        <p className="text-white/20 text-xs text-center">{copyright}</p>
        <div className="flex gap-4">
          {legalLinks.map((link) => (
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
