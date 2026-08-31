'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export type KontaktFeld = {
  key: string
  label: string
  typ: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'auswahl' | 'dropdown' | 'checkbox'
  platzhalter?: string
  optionen?: string[]
  pflichtfeld?: boolean
  breite?: 'voll' | 'halb'
}

export type KontaktFormContent = {
  headline: string
  subline: string
  exposeCheckboxTitle: string
  exposeCheckboxText: string
  felder: KontaktFeld[]
  datenschutzText: string
  fehlerText: string
  buttonSending: string
  buttonMitExpose: string
  buttonOhneExpose: string
  erfolgHeadline: string
  erfolgText: string
  erfolgLinkLabel: string
}

const defaultFelder: KontaktFeld[] = [
  { key: 'name', label: 'Name', typ: 'text', platzhalter: 'Ihr vollständiger Name', pflichtfeld: true, breite: 'halb' },
  { key: 'email', label: 'E-Mail', typ: 'email', platzhalter: 'ihre@email.de', pflichtfeld: true, breite: 'halb' },
  { key: 'phone', label: 'Telefon / WhatsApp', typ: 'tel', platzhalter: '+49 …', breite: 'voll' },
  {
    key: 'interesse',
    label: 'Mich interessiert',
    typ: 'auswahl',
    breite: 'voll',
    optionen: [
      'Studio (ab 25 m²)',
      'Zweizimmerwohnung (ab 45 m²)',
      'Penthouse (ab 85 m²)',
      'Ich bin noch unentschlossen',
    ],
  },
  {
    key: 'nachricht',
    label: 'Nachricht',
    typ: 'textarea',
    platzhalter: 'Haben Sie konkrete Fragen zu Grundrissen, Finanzierung oder dem Kaufprozess?',
    breite: 'voll',
  },
]

const defaultContent: KontaktFormContent = {
  headline: 'Anfrage senden',
  subline: 'Alle Felder mit * sind Pflichtfelder.',
  exposeCheckboxTitle: 'Kostenloses Exposé zusenden',
  exposeCheckboxText: 'Grundrisse, Preisliste & Baubeschreibung — auf Deutsch per E-Mail',
  felder: defaultFelder,
  datenschutzText:
    'Mit dem Absenden stimmen Sie zu, dass wir Ihre Daten zur Bearbeitung Ihrer Anfrage verwenden. Keine Weitergabe an Dritte. Keine Werbung ohne Ihre Zustimmung.',
  fehlerText:
    'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.',
  buttonSending: 'Wird gesendet …',
  buttonMitExpose: 'Exposé & Anfrage senden',
  buttonOhneExpose: 'Anfrage senden',
  erfolgHeadline: 'Vielen Dank!',
  erfolgText:
    'Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen — auf Deutsch, direkt vom Bauträger.',
  erfolgLinkLabel: 'Zurück zur Startseite',
}

const inputClass =
  'w-full bg-[#F0EDE8] border border-[#151E39]/10 rounded-lg px-4 py-3 text-sm text-[#151E39] placeholder:text-[#151E39]/30 focus:outline-none focus:border-[#B69252] transition-colors'
const labelClass = 'block text-[#151E39]/60 text-xs tracking-widest uppercase mb-2'

export function KontaktForm({ content }: { content?: Partial<KontaktFormContent> }) {
  const c: KontaktFormContent = { ...defaultContent, ...(content ?? {}) }
  const felder = c.felder?.length ? c.felder : defaultFelder

  const [values, setValues] = useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(felder.map((f) => [f.key, f.typ === 'checkbox' ? false : ''])),
  )
  const [expose, setExpose] = useState(true)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const set = (k: string, v: string | boolean) => setValues((prev) => ({ ...prev, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          expose,
          // Damit die E-Mail die Beschriftungen aus dem Backend verwenden kann.
          _labels: Object.fromEntries(felder.map((f) => [f.key, f.label])),
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#151E39]/5">
        <div className="w-16 h-16 bg-[#151E39] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#B69252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3
          className="text-[#151E39] text-2xl md:text-3xl mb-4"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          {c.erfolgHeadline}
        </h3>
        <p className="text-[#151E39]/60 leading-relaxed mb-8">{c.erfolgText}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#B69252] text-sm tracking-widest uppercase hover:text-[#a07d3f] transition-colors"
        >
          {c.erfolgLinkLabel}
        </Link>
      </div>
    )
  }

  const renderFeld = (f: KontaktFeld) => {
    const label = `${f.label}${f.pflichtfeld ? ' *' : ''}`
    const value = values[f.key]

    if (f.typ === 'checkbox') {
      return (
        <label key={f.key} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(value)}
            required={f.pflichtfeld}
            onChange={(e) => set(f.key, e.target.checked)}
            className="w-4 h-4 accent-[#B69252]"
          />
          <span className="text-[#151E39]/60 text-sm">{label}</span>
        </label>
      )
    }

    return (
      <div key={f.key}>
        <label className={labelClass}>{label}</label>

        {f.typ === 'textarea' && (
          <textarea
            rows={4}
            required={f.pflichtfeld}
            value={String(value ?? '')}
            onChange={(e) => set(f.key, e.target.value)}
            placeholder={f.platzhalter}
            className={`${inputClass} resize-none`}
          />
        )}

        {f.typ === 'auswahl' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(f.optionen ?? []).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => set(f.key, opt)}
                className={`text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                  value === opt
                    ? 'bg-[#151E39] text-white border-[#151E39]'
                    : 'bg-[#F0EDE8] text-[#151E39]/60 border-[#151E39]/10 hover:border-[#151E39]/30'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {f.typ === 'dropdown' && (
          <select
            required={f.pflichtfeld}
            value={String(value ?? '')}
            onChange={(e) => set(f.key, e.target.value)}
            className={inputClass}
          >
            <option value="">{f.platzhalter || 'Bitte wählen …'}</option>
            {(f.optionen ?? []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        {['text', 'email', 'tel', 'number'].includes(f.typ) && (
          <input
            type={f.typ}
            required={f.pflichtfeld}
            value={String(value ?? '')}
            onChange={(e) => set(f.key, e.target.value)}
            placeholder={f.platzhalter}
            className={inputClass}
          />
        )}
      </div>
    )
  }

  // Aufeinanderfolgende Halbe-Breite-Felder werden zu einer Zeile zusammengefasst.
  const reihen: KontaktFeld[][] = []
  for (const f of felder) {
    const letzte = reihen[reihen.length - 1]
    if (f.breite === 'halb' && letzte?.length === 1 && letzte[0].breite === 'halb') {
      letzte.push(f)
    } else {
      reihen.push([f])
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#151E39]/5 space-y-6"
    >
      <div>
        <p
          className="text-[#151E39] text-xl md:text-2xl mb-1"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          {c.headline}
        </p>
        <p className="text-[#151E39]/40 text-sm">{c.subline}</p>
      </div>

      {/* Exposé-Häkchen — bewusst prominent oben */}
      <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl border-2 border-[#B69252]/30 hover:border-[#B69252]/60 transition-colors bg-[#F0EDE8]/50">
        <div className="flex-shrink-0 mt-0.5">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              expose ? 'bg-[#B69252] border-[#B69252]' : 'bg-white border-[#151E39]/20'
            }`}
          >
            {expose && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <input
            type="checkbox"
            className="sr-only"
            checked={expose}
            onChange={(e) => setExpose(e.target.checked)}
          />
        </div>
        <div>
          <p className="text-[#151E39] font-medium text-sm">{c.exposeCheckboxTitle}</p>
          <p className="text-[#151E39]/50 text-xs mt-0.5">{c.exposeCheckboxText}</p>
        </div>
      </label>

      {reihen.map((reihe, i) =>
        reihe.length === 2 ? (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reihe.map(renderFeld)}
          </div>
        ) : (
          renderFeld(reihe[0])
        ),
      )}

      <p className="text-[#151E39]/30 text-xs leading-relaxed">{c.datenschutzText}</p>

      {status === 'error' && <p className="text-red-500 text-sm">{c.fehlerText}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#B69252] text-white py-4 text-sm tracking-widest uppercase hover:bg-[#a07d3f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 rounded-lg"
      >
        {status === 'sending' ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            {c.buttonSending}
          </>
        ) : expose ? (
          c.buttonMitExpose
        ) : (
          c.buttonOhneExpose
        )}
      </button>
    </form>
  )
}
