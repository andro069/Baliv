'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'

const interesseOptions = [
  'Studio (ab 25 m²)',
  'Zweizimmerwohnung (ab 45 m²)',
  'Penthouse (ab 85 m²)',
  'Ich bin noch unentschlossen',
]

export default function KontaktPage() {
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
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[440px]">
        <Image
          src="/terrasse-meer.webp"
          alt="Baliv Residence — Kontakt"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151E39]/85 via-[#151E39]/60 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Kontakt & Exposé</p>
          <h1
            className="text-white text-4xl md:text-6xl leading-tight mb-4 max-w-xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Sprechen wir
            <br />
            <em className="not-italic text-[#B69252]">miteinander.</em>
          </h1>
          <p className="text-white/60 max-w-md leading-relaxed">
            Wir antworten innerhalb von 24 Stunden — auf Deutsch, persönlich, ohne Verkaufsdruck.
          </p>
        </div>
      </section>

      {/* ── HAUPT-CONTENT ────────────────────────────────────────────────── */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left — info */}
          <div className="lg:sticky lg:top-32">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Direktkontakt</p>
            <h2
              className="text-[#151E39] text-3xl md:text-4xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Ihr direkter Draht
              <br />
              zum Bauträger.
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed mb-10">
              Kein Makler, keine Provision — Sie sprechen direkt mit Real Living d.o.o.,
              dem Bauträger von Baliv Residence. Alle Informationen, Grundrisse und
              Preislisten erhalten Sie auf Anfrage kostenlos.
            </p>

            <div className="space-y-6 mb-12">
              <a
                href="mailto:info@baliv-residence.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 bg-[#151E39] rounded flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#B69252" strokeWidth="1.5"/>
                    <path d="M22 6l-10 7L2 6" stroke="#B69252" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-0.5">E-Mail</p>
                  <p className="text-[#151E39] group-hover:text-[#B69252] transition-colors text-sm">
                    info@baliv-residence.com
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/38269123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 bg-[#151E39] rounded flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#B69252" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-0.5">WhatsApp</p>
                  <p className="text-[#151E39] group-hover:text-[#B69252] transition-colors text-sm">
                    +382 69 123 456
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#151E39] rounded flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#B69252" strokeWidth="1.5"/>
                    <circle cx="12" cy="10" r="3" stroke="#B69252" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-0.5">Adresse</p>
                  <p className="text-[#151E39] text-sm">Real Living d.o.o.<br />Bar, Montenegro</p>
                </div>
              </div>
            </div>

            {/* Exposé teaser */}
            <div className="bg-[#151E39] rounded p-6">
              <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-3">Kostenloses Exposé</p>
              <p className="text-white text-sm leading-relaxed mb-0">
                Grundrisse aller Wohntypen, vollständige Preisliste, Zahlungsplan,
                Lageplan und Baubeschreibung — auf Deutsch, direkt per E-Mail.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'success' ? (
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
                  Vielen Dank!
                </h3>
                <p className="text-[#151E39]/60 leading-relaxed mb-8">
                  Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von
                  24 Stunden persönlich bei Ihnen — auf Deutsch, direkt vom Bauträger.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[#B69252] text-sm tracking-widest uppercase hover:text-[#a07d3f] transition-colors"
                >
                  Zurück zur Startseite
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#151E39]/5 space-y-6"
              >
                <div>
                  <p
                    className="text-[#151E39] text-xl md:text-2xl mb-1"
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                  >
                    Anfrage senden
                  </p>
                  <p className="text-[#151E39]/40 text-sm">Alle Felder mit * sind Pflichtfelder.</p>
                </div>

                {/* Expose checkbox — prominent at top */}
                <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-xl border-2 border-[#B69252]/30 hover:border-[#B69252]/60 transition-colors bg-[#F0EDE8]/50">
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
                    <p className="text-[#151E39] font-medium text-sm">Kostenloses Exposé zusenden</p>
                    <p className="text-[#151E39]/50 text-xs mt-0.5">
                      Grundrisse, Preisliste &amp; Baubeschreibung — auf Deutsch per E-Mail
                    </p>
                  </div>
                </label>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#151E39]/60 text-xs tracking-widest uppercase mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      placeholder="Ihr vollständiger Name"
                      className="w-full bg-[#F0EDE8] border border-[#151E39]/10 rounded-lg px-4 py-3 text-sm text-[#151E39] placeholder:text-[#151E39]/30 focus:outline-none focus:border-[#B69252] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#151E39]/60 text-xs tracking-widest uppercase mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="ihre@email.de"
                      className="w-full bg-[#F0EDE8] border border-[#151E39]/10 rounded-lg px-4 py-3 text-sm text-[#151E39] placeholder:text-[#151E39]/30 focus:outline-none focus:border-[#B69252] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[#151E39]/60 text-xs tracking-widest uppercase mb-2">
                    Telefon / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="+49 …"
                    className="w-full bg-[#F0EDE8] border border-[#151E39]/10 rounded-lg px-4 py-3 text-sm text-[#151E39] placeholder:text-[#151E39]/30 focus:outline-none focus:border-[#B69252] transition-colors"
                  />
                </div>

                {/* Interesse */}
                <div>
                  <label className="block text-[#151E39]/60 text-xs tracking-widest uppercase mb-2">
                    Mich interessiert
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
                  <label className="block text-[#151E39]/60 text-xs tracking-widest uppercase mb-2">
                    Nachricht
                  </label>
                  <textarea
                    rows={4}
                    value={form.nachricht}
                    onChange={(e) => set('nachricht', e.target.value)}
                    placeholder="Haben Sie konkrete Fragen zu Grundrissen, Finanzierung oder dem Kaufprozess?"
                    className="w-full bg-[#F0EDE8] border border-[#151E39]/10 rounded-lg px-4 py-3 text-sm text-[#151E39] placeholder:text-[#151E39]/30 focus:outline-none focus:border-[#B69252] transition-colors resize-none"
                  />
                </div>

                {/* Datenschutz */}
                <p className="text-[#151E39]/30 text-xs leading-relaxed">
                  Mit dem Absenden stimmen Sie zu, dass wir Ihre Daten zur Bearbeitung
                  Ihrer Anfrage verwenden. Keine Weitergabe an Dritte. Keine Werbung ohne
                  Ihre Zustimmung.
                </p>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">
                    Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder
                    kontaktieren Sie uns direkt per E-Mail.
                  </p>
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
                      Wird gesendet …
                    </>
                  ) : (
                    form.expose ? 'Exposé & Anfrage senden' : 'Anfrage senden'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#151E39] border-t border-white/10 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
            ← Zurück zur Startseite
          </Link>
          <p className="text-white/20 text-xs text-center">
            © 2026 Real Living d.o.o. · Baliv Residence, Bar, Montenegro
          </p>
          <div className="flex gap-6">
            <Link href="/lage" className="text-white/30 hover:text-white/50 text-xs transition-colors">
              Lage
            </Link>
            <Link href="/wohnungen" className="text-white/30 hover:text-white/50 text-xs transition-colors">
              Wohnungen
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
