'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export type KontaktFormContent = {
  headline: string
  subline: string
  exposeCheckboxTitle: string
  exposeCheckboxText: string
  labelName: string
  placeholderName: string
  labelEmail: string
  placeholderEmail: string
  labelTelefon: string
  placeholderTelefon: string
  labelInteresse: string
  interesseOptionen: string[]
  labelNachricht: string
  placeholderNachricht: string
  datenschutzText: string
  fehlerText: string
  buttonSending: string
  buttonMitExpose: string
  buttonOhneExpose: string
  erfolgHeadline: string
  erfolgText: string
  erfolgLinkLabel: string
}

const defaultContent: KontaktFormContent = {
  headline: 'Anfrage senden',
  subline: 'Alle Felder mit * sind Pflichtfelder.',
  exposeCheckboxTitle: 'Kostenloses Exposé zusenden',
  exposeCheckboxText: 'Grundrisse, Preisliste & Baubeschreibung — auf Deutsch per E-Mail',
  labelName: 'Name *',
  placeholderName: 'Ihr vollständiger Name',
  labelEmail: 'E-Mail *',
  placeholderEmail: 'ihre@email.de',
  labelTelefon: 'Telefon / WhatsApp',
  placeholderTelefon: '+49 …',
  labelInteresse: 'Mich interessiert',
  interesseOptionen: [
    'Studio (ab 25 m²)',
    'Zweizimmerwohnung (ab 45 m²)',
    'Penthouse (ab 85 m²)',
    'Ich bin noch unentschlossen',
  ],
  labelNachricht: 'Nachricht',
  placeholderNachricht: 'Haben Sie konkrete Fragen zu Grundrissen, Finanzierung oder dem Kaufprozess?',
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

export function KontaktForm({ content }: { content?: Partial<KontaktFormContent> }) {
  const c: KontaktFormContent = { ...defaultContent, ...(content ?? {}) }
  const interesseOptions = c.interesseOptionen ?? defaultContent.interesseOptionen
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    interesse: '',
    nachricht: '',
    expose: true,
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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

      {/* Exposé checkbox — prominent at top */}
      <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl border-2 border-[#B69252]/30 hover:border-[#B69252]/60 transition-colors bg-[#F0EDE8]/50">
        <div className="flex-shrink-0 mt-0.5">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              form.expose ? 'bg-[#B69252] border-[#B69252]' : 'bg-white border-[#151E39]/20'
            }`}
          >
            {form.expose && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <input
            type="checkbox"
            className="sr-only"
            checked={form.expose}
            onChange={(e) => set('expose', e.target.checked)}
          />
        </div>
        <div>
          <p className="text-[#151E39] font-medium text-sm">{c.exposeCheckboxTitle}</p>
          <p className="text-[#151E39]/50 text-xs mt-0.5">{c.exposeCheckboxText}</p>
        </div>
      </label>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#151E39]/60 text-xs tracking-widest uppercase mb-2">{c.labelName}</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder={c.placeholderName}
            className="w-full bg-[#F0EDE8] border border-[#151E39]/10 rounded-lg px-4 py-3 text-sm text-[#151E39] placeholder:text-[#151E39]/30 focus:outline-none focus:border-[#B69252] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[#151E39]/60 text-xs tracking-widest uppercase mb-2">{c.labelEmail}</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder={c.placeholderEmail}
            className="w-full bg-[#F0EDE8] border border-[#151E39]/10 rounded-lg px-4 py-3 text-sm text-[#151E39] placeholder:text-[#151E39]/30 focus:outline-none focus:border-[#B69252] transition-colors"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-[#151E39]/60 text-xs tracking-widest uppercase mb-2">
          {c.labelTelefon}
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => set('phone', e.target.value)}
          placeholder={c.placeholderTelefon}
          className="w-full bg-[#F0EDE8] border border-[#151E39]/10 rounded-lg px-4 py-3 text-sm text-[#151E39] placeholder:text-[#151E39]/30 focus:outline-none focus:border-[#B69252] transition-colors"
        />
      </div>

      {/* Interesse */}
      <div>
        <label className="block text-[#151E39]/60 text-xs tracking-widest uppercase mb-2">
          {c.labelInteresse}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {interesseOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => set('interesse', opt)}
              className={`text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                form.interesse === opt
                  ? 'bg-[#151E39] text-white border-[#151E39]'
                  : 'bg-[#F0EDE8] text-[#151E39]/60 border-[#151E39]/10 hover:border-[#151E39]/30'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Nachricht */}
      <div>
        <label className="block text-[#151E39]/60 text-xs tracking-widest uppercase mb-2">{c.labelNachricht}</label>
        <textarea
          rows={4}
          value={form.nachricht}
          onChange={(e) => set('nachricht', e.target.value)}
          placeholder={c.placeholderNachricht}
          className="w-full bg-[#F0EDE8] border border-[#151E39]/10 rounded-lg px-4 py-3 text-sm text-[#151E39] placeholder:text-[#151E39]/30 focus:outline-none focus:border-[#B69252] transition-colors resize-none"
        />
      </div>

      {/* Datenschutz */}
      <p className="text-[#151E39]/30 text-xs leading-relaxed">{c.datenschutzText}</p>

      {status === 'error' && (
        <p className="text-red-500 text-sm">{c.fehlerText}</p>
      )}

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
        ) : (
          form.expose ? c.buttonMitExpose : c.buttonOhneExpose
        )}
      </button>
    </form>
  )
}
