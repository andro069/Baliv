import type { Metadata } from 'next'
import { Playfair_Display, Raleway } from 'next/font/google'
import React from 'react'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${playfair.variable} ${raleway.variable}`} lang="de" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  // Standard für Seiten ohne eigenen Titel, z. B. die 404-Seite. Unterseiten setzen
  // ihren Titel vollständig selbst, daher das neutrale Template.
  title: {
    default: 'Baliv Residence — Neubau in Bar, Montenegro',
    template: '%s',
  },
  description:
    '39 Wohneinheiten am Fuße von Stari Bar, zwischen Olivenhainen, Bergen und Meer. Ab 2.500 €/m², direkt vom Bauträger, deutschsprachig, ohne Makler.',
  openGraph: mergeOpenGraph(),
}
