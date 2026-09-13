'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useRahmen } from '@/components/SeitenRahmen'
import { localeNames, localeShort, pathFor, seiteAusPfad, htmlLang } from '@/i18n/config'

export function Navigation() {
  const { locale, sprachen, navItems, ui } = useRahmen()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname() ?? '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    // Sofort prüfen: Lädt die Seite bereits gescrollt (Zurück-Taste, Anker, Neuladen),
    // gäbe es sonst kein Scroll-Ereignis und der Kopf bliebe durchsichtig über dem Inhalt.
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Der Umschalter führt auf dieselbe Seite in der anderen Sprache und erscheint
  // erst, wenn im Backend mindestens eine weitere Sprache freigegeben ist.
  const { key } = seiteAusPfad(pathname)
  const sprachLinks = sprachen.map((l) => ({ locale: l, href: pathFor(key ?? '', l) }))
  const zeigeSprachen = sprachLinks.length > 1

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#F0EDE8] shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={pathFor('', locale)} className="flex-shrink-0">
            <Image
              src={scrolled ? '/logo-dark.svg' : '/logo-white.svg'}
              alt="Baliv Residence"
              width={160}
              height={66}
              priority
              className="w-28 md:w-40 h-auto"
            />
          </Link>

          <div className="flex items-center gap-6">
            {zeigeSprachen && (
              <nav aria-label={ui.sprachwahl} className="flex items-center gap-1">
                {sprachLinks.map((s, i) => (
                  <React.Fragment key={s.locale}>
                    <Link
                      href={s.href}
                      hrefLang={htmlLang[s.locale]}
                      lang={htmlLang[s.locale]}
                      aria-label={localeNames[s.locale]}
                      aria-current={s.locale === locale ? 'true' : undefined}
                      className={`text-xs tracking-widest transition-colors font-raleway ${
                        s.locale === locale
                          ? 'text-[#B69252]'
                          : scrolled
                            ? 'text-[#151E39]/60 hover:text-[#151E39]'
                            : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {localeShort[s.locale]}
                    </Link>
                    {i < sprachLinks.length - 1 && (
                      <span className={`text-xs ${scrolled ? 'text-[#151E39]/20' : 'text-white/20'}`}>
                        /
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}

            <button
              onClick={() => setOpen(true)}
              className="flex flex-col gap-[5px] group"
              aria-label={ui.menueOeffnen}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block h-[1.5px] transition-all duration-300 ${
                    i === 1 ? 'w-6' : 'w-8'
                  } ${scrolled ? 'bg-[#151E39]' : 'bg-white'} group-hover:w-8`}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[#151E39] transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Image src="/logo-white.svg" alt="Baliv Residence" width={160} height={66} />
          <button
            onClick={() => setOpen(false)}
            className="text-white/60 hover:text-white transition-colors"
            aria-label={ui.menueSchliessen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-8">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white font-playfair text-3xl md:text-5xl transition-colors duration-200"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
          {zeigeSprachen && (
            <div className="mt-8 flex items-center gap-4">
              {sprachLinks.map((s) => (
                <Link
                  key={s.locale}
                  href={s.href}
                  hrefLang={htmlLang[s.locale]}
                  lang={htmlLang[s.locale]}
                  onClick={() => setOpen(false)}
                  className={`text-sm tracking-widest font-raleway transition-colors ${
                    s.locale === locale ? 'text-[#B69252]' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {localeNames[s.locale]}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </div>
    </>
  )
}
