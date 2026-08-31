import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { allPagePaths } from '@/utilities/revalidatePages'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    revalidateTag('global_footer', 'max')

    // PageFooter liest das Global direkt (nicht tag-gecacht) und erscheint auf
    // allen Unterseiten — die müssen daher einzeln neu erzeugt werden.
    for (const path of allPagePaths) revalidatePath(path)
  }

  return doc
}
