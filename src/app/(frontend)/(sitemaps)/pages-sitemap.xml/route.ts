import { getServerSideSitemap } from 'next-sitemap'

import { htmlLang, pathFor, type RouteKey } from '@/i18n/config'
import { getSprachen } from '@/i18n/server'
import { SITE_URL } from '@/utilities/mergeOpenGraph'
import { allPagePaths } from '@/utilities/revalidatePages'

// Stündlich neu — so erscheint eine im Backend freigegebene Sprache ohne Deploy.
export const revalidate = 3600

/** Alle Seiten in allen freigegebenen Sprachen, mit hreflang-Verweisen untereinander. */
export async function GET() {
  const sprachen = await getSprachen()
  const lastmod = new Date().toISOString()

  const eintraege = allPagePaths.flatMap((pfad) => {
    const seite = pfad.replace(/^\//, '') as RouteKey
    const alternateRefs =
      sprachen.length > 1
        ? sprachen.map((l) => ({ href: `${SITE_URL}${pathFor(seite, l)}`, hreflang: htmlLang[l] }))
        : undefined
    return sprachen.map((l) => ({ loc: `${SITE_URL}${pathFor(seite, l)}`, lastmod, alternateRefs }))
  })

  return getServerSideSitemap(eintraege)
}
