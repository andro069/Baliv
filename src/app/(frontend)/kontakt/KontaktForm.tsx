'use client'

import React, { useState } from 'react'
import Link from 'next/link'

/**
 * Ein Feld, wie es der Form-Builder unter „Forms" liefert. Die Blocktypen
 * entsprechen denen des Plugins (@payloadcms/plugin-form-builder).
 */
export type FormFeld = {
  blockType: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'country' | 'state' | 'message'
  name?: string
  label?: string
  width?: number
  required?: boolean
  defaultValue?: string | boolean
  options?: { label: string; value: string }[]
  message?: unknown
}

export type KontaktFormContent = {
  formId?: string | number
  felder: FormFeld[]
  submitLabel?: string
  headline: string
  subline: string
  exposeCheckboxTitle: string
  exposeCheckboxText: string
  datenschutzText: string
  fehlerText: string
  buttonSending: string
  buttonMitExpose: string
  buttonOhneExpose: string
  erfolgHeadline: string
  erfolgText: string
  erfolgLinkLabel: string
}

/** Fallback, falls unter „Forms" (noch) kein Formular ausgewählt ist. */
const defaultFelder: FormFeld[] = [
  { blockType: 'checkbox', name: 'expose', label: 'Kostenloses Exposé zusenden', width: 100, defaultValue: true },
  { blockType: 'text', name: 'name', label: 'Name', width: 50, required: true },
  { blockType: 'email', name: 'email', label: 'E-Mail', width: 50, required: true },
  { blockType: 'text', name: 'phone', label: 'Telefon / WhatsApp', width: 100 },
  {
    blockType: 'select', name: 'interesse', label: 'Mich interessiert', width: 100,
    options: [
      { label: 'Studio (ab 25 m²)', value: 'studio' },
      { label: 'Zweizimmerwohnung (ab 45 m²)', value: 'zweizimmer' },
      { label: 'Penthouse (ab 85 m²)', value: 'penthouse' },
      { label: 'Ich bin noch unentschlossen', value: 'unentschlossen' },
    ],
  },
  { blockType: 'textarea', name: 'nachricht', label: 'Nachricht', width: 100 },
]

const defaultContent: KontaktFormContent = {
  felder: defaultFelder,
  headline: 'Anfrage senden',
  subline: 'Alle Felder mit * sind Pflichtfelder.',
  exposeCheckboxTitle: 'Kostenloses Exposé zusenden',
  exposeCheckboxText: 'Grundrisse, Preisliste & Baubeschreibung — auf Deutsch per E-Mail',
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

/** Das Feld, das den PDF-Versand steuert — bleibt optisch hervorgehoben. */
const EXPOSE_KEY = 'expose'

export function KontaktForm({ content }: { content?: Partial<KontaktFormContent> }) {
  const c: KontaktFormContent = { ...defaultContent, ...(content ?? {}) }
  const alleFelder = c.felder?.length ? c.felder : defaultFelder

  const exposeFeld = alleFelder.find(
    (f) => f.blockType === 'checkbox' && f.name === EXPOSE_KEY,
  )
  const felder = alleFelder.filter((f) => f !== exposeFeld)

  const [values, setValues] = useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(
      alleFelder
        .filter((f) => f.name)
        .map((f) => [
          f.name as string,
          f.blockType === 'checkbox' ? Boolean(f.defaultValue) : String(f.defaultValue ?? ''),
        ]),
    ),
  )
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const set = (k: string, v: string | boolean) => setValues((prev) => ({ ...prev, [k]: v }))
  const expose = exposeFeld ? Boolean(values[EXPOSE_KEY]) : false

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: c.formId,
          data: values,
          // Beschriftungen mitschicken, damit die E-Mail sie verwenden kann.
          labels: Object.fromEntries(
            alleFelder.filter((f) => f.name).map((f) => [f.name as string, f.label ?? f.name]),
          ),
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

  const renderFeld = (f: FormFeld, i: number) => {
    if (f.blockType === 'message') {
      return null
    }
    if (!f.name) return null

    const key = f.name
    const label = `${f.label ?? key}${f.required ? ' *' : ''}`
    const value = values[key]

    if (f.blockType === 'checkbox') {
      return (
        <label key={key} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(value)}
            required={f.required}
            onChange={(e) => set(key, e.target.checked)}
            className="w-4 h-4 accent-[#B69252]"
          />
          <span className="text-[#151E39]/60 text-sm">{label}</span>
        </label>
      )
    }

    return (
      <div key={key}>
        <label className={labelClass}>{label}</label>

        {f.blockType === 'textarea' && (
          <textarea
            rows={4}
            required={f.required}
            value={String(value ?? '')}
            onChange={(e) => set(key, e.target.value)}
            className={`${inputClass} resize-none`}
          />
        )}

        {f.blockType === 'select' && (
          // Bis zu vier Optionen als Schaltflächen, darüber als Aufklappliste.
          (f.options ?? []).length > 0 && (f.options ?? []).length <= 4 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(f.options ?? []).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set(key, opt.value)}
                  className={`text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                    value === opt.value
                      ? 'bg-[#151E39] text-white border-[#151E39]'
                      : 'bg-[#F0EDE8] text-[#151E39]/60 border-[#151E39]/10 hover:border-[#151E39]/30'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <select
              required={f.required}
              value={String(value ?? '')}
              onChange={(e) => set(key, e.target.value)}
              className={inputClass}
            >
              <option value="">Bitte wählen …</option>
              {(f.options ?? []).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )
        )}

        {['text', 'email', 'number', 'country', 'state'].includes(f.blockType) && (
          <input
            type={f.blockType === 'number' ? 'number' : f.blockType === 'email' ? 'email' : 'text'}
            required={f.required}
            value={String(value ?? '')}
            onChange={(e) => set(key, e.target.value)}
            className={inputClass}
          />
        )}
      </div>
    )
  }

  // Felder mit halber Breite paarweise in eine Zeile legen.
  const reihen: FormFeld[][] = []
  for (const f of felder) {
    const letzte = reihen[reihen.length - 1]
    const halb = (f.width ?? 100) <= 50
    if (halb && letzte?.length === 1 && (letzte[0].width ?? 100) <= 50) {
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

      {/* Exposé-Häkchen — bewusst prominent oben, steuert den PDF-Versand */}
      {exposeFeld && (
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
              onChange={(e) => set(EXPOSE_KEY, e.target.checked)}
            />
          </div>
          <div>
            <p className="text-[#151E39] font-medium text-sm">
              {c.exposeCheckboxTitle || exposeFeld.label}
            </p>
            <p className="text-[#151E39]/50 text-xs mt-0.5">{c.exposeCheckboxText}</p>
          </div>
        </label>
      )}

      {reihen.map((reihe, i) =>
        reihe.length === 2 ? (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reihe.map(renderFeld)}
          </div>
        ) : (
          renderFeld(reihe[0], i)
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
        ) : exposeFeld ? (
          expose ? c.buttonMitExpose : c.buttonOhneExpose
        ) : (
          c.submitLabel || c.buttonOhneExpose
        )}
      </button>
    </form>
  )
}
