import type { GlobalConfig } from 'payload'

export const WohnungenPage: GlobalConfig = {
  slug: 'wohnungen-page',
  label: 'Wohnungen-Seite',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Seiten-Inhalte',
  },
  fields: [
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Drei Typen. Ihre Wahl.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            '39 Einheiten in sieben Geschossen — vom kompakten Studio bis zur großzügigen Dachgeschosswohnung mit Panoramablick.',
        },
      ],
    },
    {
      name: 'types',
      label: 'Wohnungstypen',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        { name: 'nr', label: 'Nummer', type: 'text', required: true },
        { name: 'type', label: 'Typ', type: 'text', required: true },
        { name: 'tag', label: 'Tag (z.B. Erdgeschoss)', type: 'text' },
        { name: 'size', label: 'Größe (z.B. 28–30 m²)', type: 'text' },
        { name: 'terrace', label: 'Terrasse/Balkon', type: 'text' },
        { name: 'units', label: 'Einheiten', type: 'text' },
        { name: 'price', label: 'Preis (z.B. ab 2.500 €/m²)', type: 'text' },
        { name: 'layout', label: 'Grundriss-Beschreibung', type: 'text' },
        { name: 'description', label: 'Beschreibung', type: 'textarea' },
        { name: 'exampleSize', label: 'Beispiel Größe (m²)', type: 'number' },
        { name: 'examplePrice', label: 'Beispiel Preis (€)', type: 'number' },
        {
          name: 'floorplan',
          label: 'Grundriss',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'image',
          label: 'Bild',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'ausstattung',
      label: 'Ausstattung',
      type: 'array',
      fields: [
        { name: 'brand', label: 'Marke', type: 'text', required: true },
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
      ],
    },
    {
      name: 'included',
      label: 'Standard-Ausstattung (immer dabei)',
      type: 'array',
      fields: [
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
      ],
    },
  ],
}
