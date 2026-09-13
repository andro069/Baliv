import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { revalidateAlleSeiten } from '@/utilities/revalidatePages'

export const revalidateFooter: GlobalAfterChangeHook = (args) => {
  if (!args.req.context.disableRevalidate) revalidateTag('global_footer', 'max')

  // Der Footer kommt aus dem Layout und erscheint auf allen Seiten aller Sprachen.
  return revalidateAlleSeiten(args)
}
