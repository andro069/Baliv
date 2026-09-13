import type { Metadata } from 'next'

/** Kanonische Adresse — die Domain ohne www leitet dauerhaft hierher weiter. */
export const SITE_URL = 'https://www.baliv-residence.com'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  locale: 'de_DE',
  siteName: 'Baliv Residence',
  title: 'Baliv Residence — Wohnen am Fuße von Stari Bar',
  description:
    '39 Einheiten zwischen Olivenhainen, Bergen und Meer. Bar, Montenegro. Ab 2.500 €/m², direkt vom Bauträger.',
  images: [
    {
      // Absolute www-Adresse: Manche Vorschau-Crawler folgen keiner Weiterleitung.
      url: `${SITE_URL}/og-baliv-residence.jpg`,
      width: 1200,
      height: 630,
      alt: 'Baliv Residence in Bar, Montenegro',
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
