import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Navigationspunkte',
      type: 'array',
      maxRows: 10,
      defaultValue: [
        { label: 'Projekt', href: '/projekt' },
        { label: 'Lage', href: '/lage' },
        { label: 'Architektur', href: '/architektur' },
        { label: 'Wohnungen', href: '/wohnungen' },
        { label: 'Investment', href: '/investment' },
        { label: 'Preise', href: '/preise' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Kontakt', href: '#kontakt' },
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
          label: 'Link (z.B. /wohnungen oder #kontakt)',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
