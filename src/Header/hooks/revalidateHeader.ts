import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { revalidateAlleSeiten } from '@/utilities/revalidatePages'

export const revalidateHeader: GlobalAfterChangeHook = (args) => {
  if (!args.req.context.disableRevalidate) revalidateTag('global_header', 'max')

  // Die Navigation kommt aus dem Layout und erscheint auf allen Seiten aller Sprachen.
  return revalidateAlleSeiten(args)
}
