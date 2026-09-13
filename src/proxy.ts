import { NextResponse, type NextRequest } from 'next/server'

import {
  defaultLocale,
  isLocale,
  keyForSlug,
  pathFor,
  routes,
  type Locale,
  type RouteKey,
} from '@/i18n/config'

/**
 * Sprach-Routing mit übersetzten Adressen.
 *
 * Nach außen:  /wohnungen · /en/apartments · /me/stanovi · /tr/daireler
 * Intern:      /de/wohnungen · /en/wohnungen · /me/wohnungen · /tr/wohnungen
 *
 * Die Seiten liegen unter `app/(frontend)/[locale]/<deutscher Ordnername>`.
 * Ob eine Sprache freigegeben ist, prüft das Layout — der Proxy macht keine
 * Datenbankabfragen.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const segmente = pathname.split('/').filter(Boolean)

  // /de/... ist nicht die kanonische Adresse → dauerhaft auf die Fassung ohne Präfix.
  if (segmente[0] === defaultLocale) {
    const ziel = request.nextUrl.clone()
    ziel.pathname = '/' + segmente.slice(1).join('/')
    return NextResponse.redirect(ziel, 308)
  }

  let locale: Locale = defaultLocale
  let rest = segmente
  if (segmente.length && isLocale(segmente[0])) {
    locale = segmente[0] as Locale
    rest = segmente.slice(1)
  }
  const slug = rest.join('/')
  const key = keyForSlug(slug, locale)

  if (key === null) {
    // Deutscher Seitenname unter einer anderen Sprache, z. B. /en/wohnungen → /en/apartments
    if (locale !== defaultLocale && slug in routes) {
      const ziel = request.nextUrl.clone()
      ziel.pathname = pathFor(slug as RouteKey, locale)
      return NextResponse.redirect(ziel, 308)
    }
    // Unbekannte Adresse: in die Sprache umschreiben, dort zeigt die 404-Seite.
    return NextResponse.rewrite(new URL(`/${locale}/${slug}${search}`, request.url))
  }

  const intern = key ? `/${locale}/${key}` : `/${locale}`
  return NextResponse.rewrite(new URL(`${intern}${search}`, request.url))
}

export const config = {
  // Admin, API, Next-Interna, Payload-Vorschau-Routen und Dateien mit Endung
  // (Bilder, sitemap.xml, robots.txt …) laufen nicht durch das Sprach-Routing.
  matcher: ['/((?!api|admin|_next|next|.*\\..*).*)'],
}
