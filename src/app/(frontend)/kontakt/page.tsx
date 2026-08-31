import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { KontaktForm, type KontaktFeld } from './KontaktForm'
import { PageFooter } from '@/components/PageFooter'

export const metadata: Metadata = {
  title: 'Kontakt & Exposé — Baliv Residence, Bar Montenegro',
  description:
    'Exposé, Grundrisse und Preisliste kostenlos anfordern. Direktkontakt zum Bauträger Real Living d.o.o. — kein Makler, keine Provision.',
}

export default async function KontaktPage() {
  const payload = await getPayload({ config })
  const cms = await payload.findGlobal({ slug: 'kontakt-page' })

  const heroHeadline = (cms as any)?.hero?.headline ?? 'Sprechen wir miteinander.'
  const heroDescription = (cms as any)?.hero?.description ?? 'Wir antworten innerhalb von 24 Stunden — auf Deutsch, persönlich, ohne Verkaufsdruck.'
  const email = (cms as any)?.info?.email ?? 'info@baliv-residence.com'
  const whatsapp = (cms as any)?.info?.whatsapp ?? '38268517873'
  const whatsappDisplay = (cms as any)?.info?.telefon ?? '+382 68 517 873'
  const adresse = (cms as any)?.info?.adresse ?? 'Real Living d.o.o.\nBar, Montenegro'
  const heroEyebrow = (cms as any)?.hero?.eyebrow ?? 'Kontakt & Exposé'

  const dk = (cms as any)?.direktkontakt ?? {}
  const dkEyebrow = dk.eyebrow ?? 'Direktkontakt'
  const dkHeadline = dk.headline ?? 'Ihr direkter Draht'
  const dkHeadline2 = dk.headlineZweiteZeile ?? 'zum Bauträger.'
  const dkDescription =
    dk.description ??
    'Kein Makler, keine Provision — Sie sprechen direkt mit Real Living d.o.o., dem Bauträger von Baliv Residence. Alle Informationen, Grundrisse und Preislisten erhalten Sie auf Anfrage kostenlos.'
  const dkLabelEmail = dk.labelEmail ?? 'E-Mail'
  const dkLabelWhatsapp = dk.labelWhatsapp ?? 'WhatsApp'
  const dkLabelAdresse = dk.labelAdresse ?? 'Adresse'

  const teaser = (cms as any)?.exposeTeaser ?? {}
  const teaserEyebrow = teaser.eyebrow ?? 'Kostenloses Exposé'
  const teaserText =
    teaser.text ??
    'Grundrisse aller Wohntypen, vollständige Preisliste, Zahlungsplan, Lageplan und Baubeschreibung — auf Deutsch, direkt per E-Mail.'

  const f = (cms as any)?.formular ?? {}

  const felder: KontaktFeld[] = (f.felder ?? [])
    .filter((feld: any) => feld?.key && feld?.label)
    .map((feld: any) => ({
      key: feld.key,
      label: feld.label,
      typ: feld.typ ?? 'text',
      platzhalter: feld.platzhalter ?? undefined,
      pflichtfeld: Boolean(feld.pflichtfeld),
      breite: feld.breite ?? 'voll',
      optionen: (feld.optionen ?? []).map((o: any) => o?.label).filter(Boolean),
    }))

  const formContent = {
    headline: f.headline ?? 'Anfrage senden',
    subline: f.subline ?? 'Alle Felder mit * sind Pflichtfelder.',
    exposeCheckboxTitle: f.exposeCheckboxTitle ?? 'Kostenloses Exposé zusenden',
    exposeCheckboxText:
      f.exposeCheckboxText ?? 'Grundrisse, Preisliste & Baubeschreibung — auf Deutsch per E-Mail',
    ...(felder.length > 0 ? { felder } : {}),
    datenschutzText:
      f.datenschutzText ??
      'Mit dem Absenden stimmen Sie zu, dass wir Ihre Daten zur Bearbeitung Ihrer Anfrage verwenden. Keine Weitergabe an Dritte. Keine Werbung ohne Ihre Zustimmung.',
    fehlerText:
      f.fehlerText ??
      'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.',
    buttonSending: f.buttonSending ?? 'Wird gesendet …',
    buttonMitExpose: f.buttonMitExpose ?? 'Exposé & Anfrage senden',
    buttonOhneExpose: f.buttonOhneExpose ?? 'Anfrage senden',
    erfolgHeadline: f.erfolgHeadline ?? 'Vielen Dank!',
    erfolgText:
      f.erfolgText ??
      'Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen — auf Deutsch, direkt vom Bauträger.',
    erfolgLinkLabel: f.erfolgLinkLabel ?? 'Zurück zur Startseite',
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
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{heroEyebrow}</p>
          <h1
            className="text-white text-4xl md:text-6xl leading-tight mb-4 max-w-xl"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {heroHeadline}
          </h1>
          <p className="text-white/60 max-w-md leading-relaxed">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* ── HAUPT-CONTENT ────────────────────────────────────────────────── */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left — info */}
          <div className="lg:sticky lg:top-32">
            <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{dkEyebrow}</p>
            <h2
              className="text-[#151E39] text-3xl md:text-4xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {dkHeadline}
              <br />
              {dkHeadline2}
            </h2>
            <p className="text-[#151E39]/60 leading-relaxed mb-10">{dkDescription}</p>

            <div className="space-y-6 mb-12">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 bg-[#151E39] rounded flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#B69252" strokeWidth="1.5"/>
                    <path d="M22 6l-10 7L2 6" stroke="#B69252" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-0.5">{dkLabelEmail}</p>
                  <p className="text-[#151E39] group-hover:text-[#B69252] transition-colors text-sm">
                    {email}
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
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
                  <p className="text-[#151E39]/40 text-xs tracking-widests uppercase mb-0.5">{dkLabelWhatsapp}</p>
                  <p className="text-[#151E39] group-hover:text-[#B69252] transition-colors text-sm">
                    {whatsappDisplay}
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
                  <p className="text-[#151E39]/40 text-xs tracking-widests uppercase mb-0.5">{dkLabelAdresse}</p>
                  <p className="text-[#151E39] text-sm whitespace-pre-line">{adresse}</p>
                </div>
              </div>
            </div>

            {/* Exposé teaser */}
            <div className="bg-[#151E39] rounded p-6">
              <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-3">{teaserEyebrow}</p>
              <p className="text-white text-sm leading-relaxed">{teaserText}</p>
            </div>
          </div>

          {/* Right — client form */}
          <KontaktForm content={formContent} />
        </div>
      </section>

      <PageFooter />
    </main>
  )
}
