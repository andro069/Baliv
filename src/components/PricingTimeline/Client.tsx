'use client'

import React, { useEffect, useRef, useState } from 'react'

import { useRahmen } from '@/components/SeitenRahmen'

export type Preisstufe = {
  phase: string
  label?: string
  price: string
  description?: string
  active?: boolean
}

export type PreisstaffelDaten = {
  eyebrow: string
  headlineStart: string
  headlineAccent: string
  headlineEnd: string
  intro: string
  stages: Preisstufe[]
}

export const defaultPreisstaffel: PreisstaffelDaten = {
  eyebrow: 'Preisstaffelung',
  headlineStart: 'Früh einsteigen.',
  headlineAccent: 'Preisvorteil',
  headlineEnd: 'sichern.',
  intro:
    'Die Preise für Baliv Residence steigen mit dem Baufortschritt. Der Quadratmeterpreis ist heute am niedrigsten.',
  stages: [
    {
      phase: 'Jetzt · Baugenehmigung erteilt',
      label: 'Baubeginn · Oktober 2026',
      price: '2.500',
      description:
        'Baugenehmigung liegt vor. Beste Auswahl, attraktivster Einstiegspreis direkt vom Bauträger.',
      active: true,
    },
    {
      phase: 'Ab Rohbauabschluss · Q2 2027',
      label: 'Bauphase fortgeschritten',
      price: '2.700',
      description: 'Sichtbare Struktur, klare Visualisierung, und entsprechend höhere Marktpreise.',
    },
    {
      phase: 'Ab Fertigstellung · Q2 2028',
      label: 'Bezugsfertig',
      price: '2.900',
      description: 'Schlüsselübergabe, Marktpreis bei vollständiger Wertschöpfung.',
    },
  ],
}

// Feste Klassennamen, damit Tailwind sie beim Build findet.
const GRID_COLS: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

const BuildingIcon = ({ level, aktiv, hinweis }: { level: number; aktiv: boolean; hinweis: string }) => {
  if (level === 0)
    return (
      <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="opacity-60">
        <line x1="4" y1="32" x2="44" y2="32" stroke="#B69252" strokeWidth="1.5" />
        <line x1="12" y1="32" x2="12" y2="24" stroke="#B69252" strokeWidth="1.5" />
        <line x1="36" y1="32" x2="36" y2="24" stroke="#B69252" strokeWidth="1.5" />
        <line x1="12" y1="24" x2="36" y2="24" stroke="#B69252" strokeWidth="1.5" />
        <circle cx="24" cy="36" r="2" fill="#B69252" />
        <line x1="24" y1="34" x2="24" y2="30" stroke="#B69252" strokeWidth="1" strokeDasharray="2 2" />
        {aktiv && (
          <text x="18" y="22" fontSize="6" fill="#B69252" fontFamily="sans-serif">
            {hinweis}
          </text>
        )}
      </svg>
    )
  if (level === 1)
    return (
      <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="opacity-50">
        <line x1="4" y1="36" x2="44" y2="36" stroke="white" strokeWidth="1.5" />
        <rect x="14" y="24" width="20" height="12" stroke="white" strokeWidth="1.5" />
        <line x1="14" y1="30" x2="34" y2="30" stroke="white" strokeWidth="1" />
      </svg>
    )
  if (level === 2)
    return (
      <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="opacity-50">
        <line x1="4" y1="36" x2="44" y2="36" stroke="white" strokeWidth="1.5" />
        <rect x="14" y="12" width="20" height="24" stroke="white" strokeWidth="1.5" />
        <line x1="14" y1="20" x2="34" y2="20" stroke="white" strokeWidth="1" />
        <line x1="14" y1="28" x2="34" y2="28" stroke="white" strokeWidth="1" />
      </svg>
    )
  return (
    <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="opacity-50">
      <line x1="4" y1="36" x2="44" y2="36" stroke="white" strokeWidth="1.5" />
      <rect x="12" y="4" width="24" height="32" stroke="white" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="36" y2="12" stroke="white" strokeWidth="1" />
      <line x1="12" y1="20" x2="36" y2="20" stroke="white" strokeWidth="1" />
      <line x1="12" y1="28" x2="36" y2="28" stroke="white" strokeWidth="1" />
      <rect x="17" y="6" width="4" height="4" stroke="white" strokeWidth="1" />
      <rect x="27" y="6" width="4" height="4" stroke="white" strokeWidth="1" />
    </svg>
  )
}

export function PricingTimelineClient({ daten }: { daten?: Partial<PreisstaffelDaten> }) {
  const { ui } = useRahmen()
  const d: PreisstaffelDaten = { ...defaultPreisstaffel, ...(daten ?? {}) }
  const stages = d.stages?.length ? d.stages : defaultPreisstaffel.stages
  const aktivIndex = Math.max(0, stages.findIndex((s) => s.active))

  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    const reduziert = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!el || reduziert || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Auch einblenden, wenn beim schnellen Scrollen schon vorbeigescrollt wurde.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)

    // Sicherheitsnetz: Der Inhalt wird spätestens nach vier Sekunden sichtbar,
    // auch wenn der Observer nicht auslöst.
    const timer = window.setTimeout(() => setVisible(true), 4000)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  const fortschritt = ((aktivIndex + 0.5) / stages.length) * 100

  return (
    <div ref={ref} className="border-t border-white/10 pt-20 pb-4">
      <div
        className={`max-w-3xl mb-16 transition-all duration-700 motion-reduce:transition-none ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-5">{d.eyebrow}</p>
        <h2
          className="text-white text-4xl md:text-5xl leading-tight mb-6"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          {d.headlineStart}{' '}
          <span className="italic text-[#B69252]">{d.headlineAccent}</span> {d.headlineEnd}
        </h2>
        <p className="text-white/50 text-base leading-relaxed max-w-xl">{d.intro}</p>
      </div>

      <div className="relative mb-8 hidden md:block">
        <div className="absolute top-5 left-0 right-0 h-px bg-white/10" />
        <div
          className="absolute top-5 left-0 h-px bg-[#B69252]/60 transition-all duration-1000 delay-300 motion-reduce:transition-none"
          style={{ width: visible ? `${fortschritt}%` : '0%' }}
        />
      </div>

      <div className={`grid grid-cols-1 ${GRID_COLS[stages.length] ?? 'md:grid-cols-3'} gap-px bg-white/5`}>
        {stages.map((stage, i) => (
          <div
            key={i}
            className={`relative p-6 transition-all duration-700 motion-reduce:transition-none ${
              stage.active ? 'bg-white/5' : 'bg-transparent'
            } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${i * 150 + 200}ms` }}
          >
            <div className="mb-6 h-10 flex items-end gap-3">
              <BuildingIcon level={Math.min(i, 3)} aktiv={Boolean(stage.active)} hinweis={ui.sieSindHier} />
              {stage.active && i > 0 && (
                <span className="text-[#B69252] text-[10px] tracking-wide">{ui.sieSindHier}</span>
              )}
            </div>

            <div
              className={`hidden md:block absolute -top-8 left-6 w-2.5 h-2.5 rounded-full border ${
                stage.active ? 'bg-[#B69252] border-[#B69252]' : 'bg-transparent border-white/30'
              }`}
            />

            <p
              className={`text-xs tracking-[0.15em] uppercase mb-2 font-raleway ${
                stage.active ? 'text-[#B69252]' : 'text-white/30'
              }`}
            >
              {stage.phase}
            </p>

            {stage.label && (
              <p
                className={`text-sm italic mb-4 ${stage.active ? 'text-white/60' : 'text-white/25'}`}
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {stage.label}
              </p>
            )}

            <p className={`mb-4 ${stage.active ? 'text-white' : 'text-white/30'}`}>
              <span className="text-sm">{ui.ab} </span>
              <span
                className={`text-3xl font-light ${stage.active ? 'text-white' : ''}`}
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {stage.price}
              </span>
              <span className="text-sm"> {ui.proQm}</span>
            </p>

            <div className={`w-6 h-px mb-4 ${stage.active ? 'bg-[#B69252]' : 'bg-white/20'}`} />

            {stage.description && (
              <p className={`text-sm leading-relaxed ${stage.active ? 'text-white/60' : 'text-white/25'}`}>
                {stage.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
