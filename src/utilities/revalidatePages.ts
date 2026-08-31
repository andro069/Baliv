import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * Die Seiten lesen ihre Globals direkt über `payload.findGlobal()` und sind
 * statisch vorgerendert. `revalidateTag` greift dort nicht — die betroffenen
 * Pfade müssen explizit neu erzeugt werden, sonst erscheint eine Änderung im
 * Backend erst beim nächsten Deploy.
 */
export const revalidatePages =
  (paths: string[]): GlobalAfterChangeHook =>
  ({ doc, req: { payload, context } }) => {
    if (context.disableRevalidate) return doc

    for (const path of paths) {
      payload.logger.info(`Revalidating ${path}`)
      revalidatePath(path)
    }

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
  '/impressum',
  '/datenschutz',
]
