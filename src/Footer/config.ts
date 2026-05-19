import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'address',
      label: 'Adresse',
      type: 'text',
      defaultValue: 'Bjeliši BB · 85000 Bar, Montenegro',
    },
    {
      name: 'copyright',
      label: 'Copyright-Text',
      type: 'text',
      defaultValue: '© 2026 Real Living d.o.o. · Baliv Residence, Bar, Montenegro',
    },
    {
      name: 'legalLinks',
      label: 'Rechtliche Links (Impressum, Datenschutz…)',
      type: 'array',
      maxRows: 4,
      defaultValue: [
        { label: 'Impressum', href: '/impressum' },
        { label: 'Datenschutz', href: '/datenschutz' },
      ],
      fields: [
        {
          name: 'label',
          label: 'Bezeichnung',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          label: 'Link',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
