import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * Die Seiten lesen ihre Globals direkt über `payload.findGlobal()` und sind
 * statisch vorgerendert. `revalidateTag` greift dort nicht — die betroffenen
 * Pfade müssen explizit neu erzeugt werden, sonst erscheint eine Änderung im
 * Backend erst beim nächsten Deploy.
 *
 * Pfade werden mit dem deutschen Seitennamen angegeben (`/wohnungen`). Intern
 * liegen die Seiten unter `/[locale]/wohnungen` — das Muster erneuert die Seite
 * in allen Sprachen zugleich.
 */
export function revalidateSeite(path: string) {
  revalidatePath(path === '/' ? '/[locale]' : `/[locale]${path}`, 'page')
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
