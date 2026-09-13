/**
 * Zentrale Sprach- und Adresskonfiguration.
 *
 * Intern heißen die Seiten wie ihre deutschen Ordner unter `app/(frontend)/[locale]/`.
 * Nach außen bekommt jede Sprache übersetzte Adressen; Deutsch bleibt ohne Präfix.
 * Links im Backend werden mit dem deutschen Pfad gepflegt (z. B. `/kontakt`) und
 * hier für die jeweilige Sprache übersetzt — so muss niemand Links je Sprache pflegen.
 */

export const locales = ['de', 'en', 'me', 'tr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'de'

export const isLocale = (value: string | undefined | null): value is Locale =>
  !!value && (locales as readonly string[]).includes(value)

/** Name der Sprache in der Sprache selbst — für den Umschalter. */
export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  me: 'Crnogorski',
  tr: 'Türkçe',
}

/** Kurzform im Umschalter. */
export const localeShort: Record<Locale, string> = { de: 'DE', en: 'EN', me: 'ME', tr: 'TR' }

/**
 * Sprachcode für `<html lang>` und hreflang. Montenegrinisch hat keinen
 * ISO-639-1-Code; Google erwartet einen solchen, üblich ist `sr-ME`.
 */
export const htmlLang: Record<Locale, string> = { de: 'de', en: 'en', me: 'sr-ME', tr: 'tr' }

/** OpenGraph-Locale. */
export const ogLocale: Record<Locale, string> = { de: 'de_DE', en: 'en_GB', me: 'sr_ME', tr: 'tr_TR' }

/** Interner Seitenschlüssel (= deutscher Ordnername) → Adresse je Sprache. */
export const routes = {
  '': { de: '', en: '', me: '', tr: '' },
  wohnungen: { de: 'wohnungen', en: 'apartments', me: 'stanovi', tr: 'daireler' },
  preise: { de: 'preise', en: 'prices', me: 'cijene', tr: 'fiyatlar' },
  lage: { de: 'lage', en: 'location', me: 'lokacija', tr: 'konum' },
  architektur: { de: 'architektur', en: 'architecture', me: 'arhitektura', tr: 'mimari' },
  investment: { de: 'investment', en: 'investment', me: 'investicija', tr: 'yatirim' },
  kontakt: { de: 'kontakt', en: 'contact', me: 'kontakt', tr: 'iletisim' },
  'ueber-uns': { de: 'ueber-uns', en: 'about-us', me: 'o-nama', tr: 'hakkimizda' },
  impressum: { de: 'impressum', en: 'legal-notice', me: 'impresum', tr: 'kunye' },
  datenschutz: { de: 'datenschutz', en: 'privacy', me: 'privatnost', tr: 'gizlilik' },
} as const satisfies Record<string, Record<Locale, string>>

export type RouteKey = keyof typeof routes

const isRouteKey = (value: string): value is RouteKey => value in routes

/** Adresse einer Seite in einer Sprache, z. B. ('wohnungen', 'en') → '/en/apartments'. */
export function pathFor(key: RouteKey, locale: Locale): string {
  const slug = routes[key][locale]
  if (locale === defaultLocale) return slug ? `/${slug}` : '/'
  return slug ? `/${locale}/${slug}` : `/${locale}`
}

/** Findet zu einem Slug in einer Sprache den internen Schlüssel. */
export function keyForSlug(slug: string, locale: Locale): RouteKey | null {
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][locale] === slug) return key
  }
  return null
}

/**
 * Übersetzt einen im Backend gepflegten Link in die jeweilige Sprache.
 * Externe Links, E-Mail, Telefon, WhatsApp und reine Anker bleiben unverändert.
 * Anker und Query-Strings bleiben erhalten: '/kontakt#formular' → '/en/contact#formular'.
 */
export function localizeHref(href: string | null | undefined, locale: Locale): string {
  if (!href) return pathFor('', locale)
  if (/^(https?:|mailto:|tel:|#|\/\/)/i.test(href)) return href

  const match = href.match(/^([^?#]*)(.*)$/)
  const pfad = (match?.[1] ?? '').replace(/\/+$/, '')
  const rest = match?.[2] ?? ''
  const segmente = pfad.split('/').filter(Boolean)

  // Bereits mit Sprachpräfix gepflegt? Dann den Rest als Slug dieser Sprache lesen.
  let quelleLocale: Locale = defaultLocale
  if (segmente.length && isLocale(segmente[0])) quelleLocale = segmente.shift() as Locale

  const slug = segmente.join('/')
  const key = keyForSlug(slug, quelleLocale) ?? (isRouteKey(slug) ? slug : null)
  if (key) return pathFor(key, locale) + rest

  // Unbekannter interner Pfad: nur das Sprachpräfix setzen.
  const basis = locale === defaultLocale ? `/${slug}` : `/${locale}${slug ? `/${slug}` : ''}`
  return basis + rest
}

/**
 * Liest Sprache und Seite aus einer Adresse. Versteht die öffentliche Form
 * (`/en/apartments`) und die interne (`/en/wohnungen`) — beim Vorrendern sieht
 * der Client die interne, im Browser die öffentliche.
 */
export function seiteAusPfad(pathname: string): { locale: Locale; key: RouteKey | null } {
  const segmente = pathname.split('/').filter(Boolean)
  let locale: Locale = defaultLocale
  if (segmente.length && isLocale(segmente[0])) locale = segmente.shift() as Locale
  const slug = segmente.join('/')
  return { locale, key: keyForSlug(slug, locale) ?? (isRouteKey(slug) ? slug : null) }
}

/** Alle Sprachfassungen einer Seite — für hreflang und den Sprachumschalter. */
export function alternatesFor(key: RouteKey, sprachen: readonly Locale[] = locales) {
  return Object.fromEntries(sprachen.map((l) => [l, pathFor(key, l)])) as Record<Locale, string>
}
