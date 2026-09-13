import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'

import type { Rahmen } from '@/components/SeitenRahmen'
import { SITE_URL, mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import {
  defaultLocale,
  htmlLang,
  isLocale,
  localizeHref,
  locales,
  ogLocale,
  pathFor,
  type Locale,
  type RouteKey,
} from './config'
import { text } from './format'
import { seoStandard, uiStandard, type SeoTexte, type UiTexte } from './ui'

const fuelleMitStandard = <T extends Record<string, string>>(standard: T, cms: unknown): T =>
  Object.fromEntries(
    Object.entries(standard).map(([name, wert]) => [
      name,
      text((cms as Record<string, unknown> | null | undefined)?.[name], wert),
    ]),
  ) as T

/** Global „Website & Sprachen“ in einer Sprache, leere Felder mit deutschem Standard. */
export const getWebsite = cache(
  async (locale: Locale): Promise<{ seo: SeoTexte; ui: UiTexte; freigabe: Record<string, unknown> }> => {
    let cms: any = null
    try {
      const payload = await getPayload({ config })
      cms = await payload.findGlobal({ slug: 'website', locale, depth: 0 })
    } catch {
      // Datenbank nicht erreichbar — Standardtexte verwenden.
    }
    return {
      seo: fuelleMitStandard(seoStandard, cms?.seo),
      ui: fuelleMitStandard(uiStandard, cms?.ui),
      freigabe: cms?.sprachen ?? {},
    }
  },
)

/** Freigegebene Sprachen. Deutsch ist immer dabei. */
export const getSprachen = cache(async (): Promise<Locale[]> => {
  const { freigabe } = await getWebsite(defaultLocale)
  return locales.filter((l) => l === defaultLocale || freigabe[l] === true)
})

/**
 * Sprache einer Seite aus den Routenparametern. Nicht freigegebene Sprachen
 * zeigen die 404-Seite — so ist eine halb übersetzte Fassung nicht erreichbar.
 */
export async function seitenLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params
  if (!isLocale(locale) || !(await getSprachen()).includes(locale)) notFound()
  return locale
}

/** Titel, Beschreibung, kanonische Adresse, hreflang und OpenGraph einer Seite. */
export async function seitenMetadata({
  seite,
  locale,
  title,
  description,
}: {
  seite: RouteKey
  locale: Locale
  title: string
  description: string
}): Promise<Metadata> {
  const [sprachen, { seo }] = await Promise.all([getSprachen(), getWebsite(locale)])
  const url = `${SITE_URL}${pathFor(seite, locale)}`

  const languages: Record<string, string> = {}
  if (sprachen.length > 1) {
    for (const l of sprachen) languages[htmlLang[l]] = `${SITE_URL}${pathFor(seite, l)}`
    languages['x-default'] = `${SITE_URL}${pathFor(seite, defaultLocale)}`
  }

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, ...(sprachen.length > 1 ? { languages } : {}) },
    openGraph: ogFuer(locale, seo, { url }),
  }
}

export function ogFuer(locale: Locale, seo: SeoTexte, extra?: Metadata['openGraph']): Metadata['openGraph'] {
  return mergeOpenGraph({
    locale: ogLocale[locale],
    title: seo.ogTitel,
    description: seo.ogBeschreibung,
    images: [{ url: `${SITE_URL}/og-baliv-residence.jpg`, width: 1200, height: 630, alt: seo.ogBildAlt }],
    ...extra,
  })
}

const standardNavigation = [
  { label: 'Lage', href: '/lage' },
  { label: 'Architektur', href: '/architektur' },
  { label: 'Wohnungen', href: '/wohnungen' },
  { label: 'Investment', href: '/investment' },
  { label: 'Preise', href: '/preise' },
  { label: 'Kontakt', href: '/kontakt' },
]

const standardRechtslinks = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
]

/** Gemeinsame Daten aller Seiten einer Sprache: Navigation, Footer, allgemeine Texte. */
export const getRahmen = cache(async (locale: Locale): Promise<Rahmen> => {
  const payload = await getPayload({ config })
  const [website, sprachen, header, footer] = await Promise.all([
    getWebsite(locale),
    getSprachen(),
    payload.findGlobal({ slug: 'header', locale, depth: 0 }).catch(() => null) as Promise<any>,
    payload.findGlobal({ slug: 'footer', locale, depth: 0 }).catch(() => null) as Promise<any>,
  ])

  const links = (eintraege: any[] | undefined, standard: { label: string; href: string }[]) =>
    (eintraege?.length ? eintraege : standard).map((e: any) => ({
      label: e?.label ?? '',
      href: localizeHref(e?.href ?? '/', locale),
    }))

  return {
    locale,
    sprachen,
    ui: website.ui,
    navItems: links(header?.navItems, standardNavigation),
    footer: {
      copyright: text(footer?.copyright, '© 2026 Real Living d.o.o. · Baliv Residence, Bar, Montenegro'),
      legalLinks: links(footer?.legalLinks, standardRechtslinks),
    },
  }
})
