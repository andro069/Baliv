import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

import { locales, pathFor, type RouteKey } from '@/i18n/config'

/**
 * Die Seiten lesen ihre Globals direkt über `payload.findGlobal()` und sind
 * statisch vorgerendert. `revalidateTag` greift dort nicht — die betroffenen
 * Pfade müssen explizit neu erzeugt werden, sonst erscheint eine Änderung im
 * Backend erst beim nächsten Deploy.
 *
 * Pfade werden mit dem deutschen Seitennamen angegeben (`/wohnungen`). Erneuert
 * wird beides: das interne Muster `/[locale]/wohnungen` und zusätzlich jede
 * konkrete Adresse (`/wohnungen`, `/en/apartments`, `/me/stanovi`,
 * `/tr/daireler`). Das Muster allein hat sich als unzuverlässig erwiesen.
 */
const schluessel = (path: string): RouteKey => (path === '/' ? '' : path.replace(/^\//, '')) as RouteKey

export function revalidateSeite(path: string) {
  revalidatePath(path === '/' ? '/[locale]' : `/[locale]${path}`, 'page')
  const key = schluessel(path)
  for (const locale of locales) revalidatePath(pathFor(key, locale))
}

export const revalidatePages =
  (paths: string[]): GlobalAfterChangeHook =>
  ({ doc, req: { payload, context } }) => {
    if (context.disableRevalidate) return doc

    for (const path of paths) {
      payload.logger.info(`Revalidating ${path}`)
      revalidateSeite(path)
    }

    return doc
  }

/**
 * Für Daten aus dem Layout (Navigation, Footer, allgemeine Texte, Sprachfreigabe):
 * erneuert alle Seiten in allen Sprachen.
 */
export const revalidateAlleSeiten: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (context.disableRevalidate) return doc
  payload.logger.info('Revalidating alle Seiten')
  revalidatePath('/[locale]', 'layout')
  for (const path of allPagePaths) revalidateSeite(path)
  return doc
}

/** Alle Seiten, die den gemeinsamen PageFooter einbinden, plus die Startseite. */
export const allPagePaths = [
  '/',
  '/wohnungen',
  '/preise',
  '/lage',
  '/investment',
  '/architektur',
  '/kontakt',
  '/ueber-uns',
  '/impressum',
  '/datenschutz',
]
