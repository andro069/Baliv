import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navigation } from '@/components/Navigation'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { KontaktForm, type FormFeld } from './KontaktForm'
import { PageFooter } from '@/components/PageFooter'
import { defaultLocale, isLocale } from '@/i18n/config'
import { seitenLocale, seitenMetadata } from '@/i18n/server'
import { text } from '@/i18n/format'

const defaultMeta = {
  title: 'Kontakt & Exposé — Baliv Residence, Bar Montenegro',
  description:
    'Exposé, Grundrisse und Preisliste kostenlos anfordern. Direktkontakt zum Bauträger Real Living d.o.o. — kein Makler, keine Provision.',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: roh } = await params
  const locale = isLocale(roh) ? roh : defaultLocale
  let title = defaultMeta.title
  let description = defaultMeta.description
  try {
    const payload = await getPayload({ config })
    const cms = (await payload.findGlobal({ slug: 'kontakt-page', locale, depth: 0 })) as any
    title = text(cms?.meta?.title, title)
    description = text(cms?.meta?.description, description)
  } catch {
    // Datenbank nicht erreichbar — Standardwerte verwenden.
  }
  return seitenMetadata({ seite: 'kontakt', locale, title, description })
}

export default async function KontaktPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await seitenLocale(params)
  const payload = await getPayload({ config })
  // depth: 2, damit das verknüpfte Formular samt seiner Felder mitgeladen wird.
  // Mit `locale` kommen auch Beschriftungen und Optionen des Formulars in der Seitensprache.
  const cms = (await payload.findGlobal({ slug: 'kontakt-page', depth: 2, locale })) as any

  const heroHeadline = text(cms?.hero?.headline, 'Sprechen wir miteinander.')
  const heroDescription = text(cms?.hero?.description, 'Wir antworten in der Regel innerhalb von 24 Stunden — auf Deutsch, Englisch, Montenegrinisch oder Türkisch, persönlich, ohne Verkaufsdruck.')
  const heroImageAlt = text(cms?.hero?.imageAlt, 'Baliv Residence — Kontakt')
  const email = text(cms?.info?.email, 'info@baliv-residence.com')
  const whatsapp = text(cms?.info?.whatsapp, '38268517873')
  const whatsappDisplay = text(cms?.info?.telefon, '+382 68 517 873')
  const adresse = text(cms?.info?.adresse, 'Real Living d.o.o.\nBar, Montenegro')
  const heroEyebrow = text(cms?.hero?.eyebrow, 'Kontakt & Exposé')

  const dk = cms?.direktkontakt ?? {}
  const dkEyebrow = text(dk.eyebrow, 'Direktkontakt')
  const dkHeadline = text(dk.headline, 'Ihr direkter Draht')
  const dkHeadline2 = text(dk.headlineZweiteZeile, 'zum Bauträger.')
  const dkDescription = text(
    dk.description,
    'Kein Makler, keine Provision — Sie sprechen direkt mit Real Living d.o.o., dem Bauträger von Baliv Residence. Alle Informationen, Grundrisse und Preislisten erhalten Sie auf Anfrage kostenlos.',
  )
  const dkLabelEmail = text(dk.labelEmail, 'E-Mail')
  const dkLabelWhatsapp = text(dk.labelWhatsapp, 'WhatsApp')
  const dkLabelAdresse = text(dk.labelAdresse, 'Adresse')

  const teaser = cms?.exposeTeaser ?? {}
  const teaserEyebrow = text(teaser.eyebrow, 'Kostenloses Exposé')
  const teaserText = text(
    teaser.text,
    'Grundrisse aller Wohntypen, vollständige Preisliste, Zahlungsplan, Lageplan und Baubeschreibung — direkt per E-Mail.',
  )

  const f = cms?.formular ?? {}

  // Das unter „Forms" gepflegte Formular. Ist keins gewählt, greift der
  // Fallback in der Komponente.
  const form = typeof f.form === 'object' && f.form !== null ? f.form : null
  const felder: FormFeld[] = (form?.fields ?? []).filter((feld: any) => feld?.blockType)

  const formContent = {
    ...(form ? { formId: form.id, submitLabel: form.submitButtonLabel } : {}),
    ...(felder.length > 0 ? { felder } : {}),
    headline: text(f.headline, 'Anfrage senden'),
    subline: text(f.subline, 'Alle Felder mit * sind Pflichtfelder.'),
    exposeCheckboxTitle: text(f.exposeCheckboxTitle, 'Kostenloses Exposé zusenden'),
    exposeCheckboxText: text(f.exposeCheckboxText, 'Grundrisse, Preisliste & Baubeschreibung — per E-Mail'),
    datenschutzText: text(
      f.datenschutzText,
      'Mit dem Absenden stimmen Sie zu, dass wir Ihre Daten zur Bearbeitung Ihrer Anfrage verwenden. Näheres in unserer Datenschutzerklärung.',
    ),
    datenschutzLinkWort: text(f.datenschutzLinkWort, 'Datenschutzerklärung'),
    fehlerText: text(
      f.fehlerText,
      'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.',
    ),
    buttonSending: text(f.buttonSending, 'Wird gesendet …'),
    buttonMitExpose: text(f.buttonMitExpose, 'Exposé & Anfrage senden'),
    buttonOhneExpose: text(f.buttonOhneExpose, 'Anfrage senden'),
    erfolgHeadline: text(f.erfolgHeadline, 'Vielen Dank!'),
    erfolgText: text(
      f.erfolgText,
      'Ihre Anfrage ist bei uns eingegangen. Wir melden uns in der Regel innerhalb von 24 Stunden persönlich bei Ihnen — auf Deutsch, Englisch, Montenegrinisch oder Türkisch, direkt vom Bauträger.',
    ),
    erfolgLinkLabel: text(f.erfolgLinkLabel, 'Zurück zur Startseite'),
  }

  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[440px]">
        <Image
          src={
            typeof cms?.hero?.image === 'object' && cms?.hero?.image?.url
              ? cms.hero.image.url
              : '/terrasse-meer.webp'
          }
          alt={heroImageAlt}
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
                  <p className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-0.5">{dkLabelWhatsapp}</p>
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
                  <p className="text-[#151E39]/40 text-xs tracking-widest uppercase mb-0.5">{dkLabelAdresse}</p>
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
