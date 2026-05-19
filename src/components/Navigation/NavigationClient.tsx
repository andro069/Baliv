'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const langs = ['DE', 'EN', 'ME']

type NavItem = { label: string; href: string }

export function NavigationClient({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState('DE')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#F0EDE8] shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src={scrolled ? '/logo-dark.svg' : '/logo-white.svg'}
              alt="Baliv Residence"
              width={160}
              height={66}
              priority
              className="w-28 md:w-40"
            />
          </Link>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              {langs.map((l, i) => (
                <React.Fragment key={l}>
                  <button
                    onClick={() => setLang(l)}
                    className={`text-xs tracking-widest transition-colors font-raleway ${
                      lang === l
                        ? 'text-[#B69252]'
                        : scrolled
                          ? 'text-[#151E39]/60 hover:text-[#151E39]'
                          : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {l}
                  </button>
                  {i < langs.length - 1 && (
                    <span className={`text-xs ${scrolled ? 'text-[#151E39]/20' : 'text-white/20'}`}>
                      /
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={() => setOpen(true)}
              className="flex flex-col gap-[5px] group"
              aria-label="Menü öffnen"
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
            aria-label="Menü schließen"
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
          <div className="mt-8 flex items-center gap-4">
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l)
                  setOpen(false)
                }}
                className={`text-sm tracking-widest font-raleway transition-colors ${
                  lang === l ? 'text-[#B69252]' : 'text-white/40 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}
