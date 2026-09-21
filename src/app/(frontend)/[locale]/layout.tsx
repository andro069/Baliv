import type { Metadata } from 'next'
import { Playfair_Display, Raleway } from 'next/font/google'
import { notFound } from 'next/navigation'
import React from 'react'

import { RahmenProvider } from '@/components/SeitenRahmen'
import { defaultLocale, htmlLang, isLocale, locales } from '@/i18n/config'
import { getRahmen, getWebsite, ogFuer } from '@/i18n/server'
import { Providers } from '@/providers'
import { getServerSideURL } from '@/utilities/getURL'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-raleway',
  display: 'swap',
})

/**
 * Sicherheitsnetz: Jede Seite wird spätestens 60 Sekunden nach einer Änderung neu
 * erzeugt. Die gezielte Auffrischung per `revalidatePath` nach dem Speichern im
 * Backend hat sich auf Vercel als unzuverlässig erwiesen — Änderungen blieben
 * stundenlang unsichtbar. Beide Wege greifen jetzt nebeneinander.
 */
export const revalidate = 60

/** Alle Sprachen vorrendern; nicht freigegebene zeigen über `seitenLocale` die 404-Seite. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const rahmen = await getRahmen(locale)

  // `translate="no"` schaltet die automatische Browser-Übersetzung ab: Sie erfindet
  // Typenbezeichnungen, Preise und Rechtstexte neu. Die vier Sprachfassungen stehen
  // im Umschalter bereit. Chrome und Edge halten sich daran, Safari und Firefox teils.
  return (
    <html
      className={`${playfair.variable} ${raleway.variable}`}
      lang={htmlLang[locale]}
      translate="no"
      suppressHydrationWarning
    >
      <head>
        <meta name="google" content="notranslate" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      </head>
      <body>
        <Providers>
          <RahmenProvider value={rahmen}>{children}</RahmenProvider>
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: roh } = await params
  const locale = isLocale(roh) ? roh : defaultLocale
  const { seo } = await getWebsite(locale)
  return {
    metadataBase: new URL(getServerSideURL()),
    // Standard für Seiten ohne eigenen Titel, z. B. die 404-Seite. Unterseiten setzen
    // ihren Titel vollständig selbst, daher das neutrale Template.
    title: { default: seo.titel, template: '%s' },
    description: seo.beschreibung,
    openGraph: ogFuer(locale, seo),
  }
}
